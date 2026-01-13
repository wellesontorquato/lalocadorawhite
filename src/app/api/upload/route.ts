import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const required = (name: string) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
};

const boolEnv = (name: string, fallback = false) => {
  const v = process.env[name];
  if (v === undefined) return fallback;
  return v === "true" || v === "1" || v === "yes";
};

// Mantém só caracteres seguros e limita tamanho
const sanitize = (s: string) =>
  (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

// Igual ao sanitize, mas garante padrão em MAIÚSCULO
const sanitizeUpper = (s: string) => sanitize(s).toUpperCase();

const extFromType = (type: string) => {
  if (type === "image/png") return "png";
  if (type === "image/jpeg") return "jpg";
  if (type === "application/pdf") return "pdf";
  return "bin";
};

const getS3 = () => {
  return new S3Client({
    region: process.env.S3_REGION || "us-central",
    endpoint: required("S3_ENDPOINT"),
    forcePathStyle: boolEnv("S3_FORCE_PATH_STYLE", true),
    credentials: {
      accessKeyId: required("S3_ACCESS_KEY_ID"),
      secretAccessKey: required("S3_SECRET_ACCESS_KEY"),
    },
  });
};

const randomCode = (len = 8) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
};

const siteBase = () => {
  const custom = process.env.PUBLIC_SITE_URL; // opcional (se tiver domínio próprio)
  const netlifyUrl = process.env.URL; // Netlify define em produção
  return (custom || netlifyUrl || "").replace(/\/$/, "");
};

async function shortCodeExists(s3: S3Client, bucket: string, code: string) {
  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: `short/${code}.json`,
      })
    );
    return true;
  } catch (err: any) {
    const name = err?.name || "";
    const codeName = err?.Code || "";
    const status = err?.$metadata?.httpStatusCode;
    if (status === 404 || name === "NotFound" || codeName === "NotFound") return false;
    throw err;
  }
}

async function generateUniqueCode(s3: S3Client, bucket: string, len = 8, tries = 6) {
  for (let i = 0; i < tries; i++) {
    const code = randomCode(len);
    const exists = await shortCodeExists(s3, bucket, code);
    if (!exists) return code;
  }
  for (let i = 0; i < tries; i++) {
    const code = randomCode(Math.max(len + 2, 10));
    const exists = await shortCodeExists(s3, bucket, code);
    if (!exists) return code;
  }
  throw new Error("Falha ao gerar código curto (colisão). Tente novamente.");
}

// Monta um filename amigável: CPF-WELLESON-BEZERRA-TORQUATO-2026-01-13.png
function buildDownloadFilename(opts: {
  safeDoc: "cpf" | "cnh" | "doc";
  nome: string;
  date: string; // YYYY-MM-DD
  ext: string;
}) {
  const doc = opts.safeDoc.toUpperCase(); // CPF/CNH/DOC
  const person = sanitizeUpper(opts.nome) || "CLIENTE";
  // limite adicional para evitar nome gigante
  const personCut = person.slice(0, 60);
  return `${doc}-${personCut}-${opts.date}.${opts.ext}`;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const docTypeRaw = String(form.get("docType") || "doc").toLowerCase();

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Arquivo ausente." }, { status: 400 });
    }

    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato inválido. Use PNG, JPG/JPEG ou PDF." },
        { status: 400 }
      );
    }

    const maxMB = Number(process.env.UPLOAD_MAX_MB || 8);
    if (file.size > maxMB * 1024 * 1024) {
      return NextResponse.json(
        { error: `Arquivo muito grande (máx. ${maxMB}MB).` },
        { status: 400 }
      );
    }

    const nomeRaw = String(form.get("nome") || "");
    const carroRaw = String(form.get("carro") || "");

    const nome = sanitize(nomeRaw);
    const carro = sanitize(carroRaw);

    const ext = extFromType(file.type);
    const id = crypto.randomUUID();
    const date = new Date().toISOString().slice(0, 10);

    const safeDoc: "cpf" | "cnh" | "doc" =
      docTypeRaw === "cpf" || docTypeRaw === "cnh" ? (docTypeRaw as any) : "doc";

    const key =
      `reservas/${date}/` +
      `${safeDoc}-${id}` +
      (nome ? `__${nome}` : "") +
      (carro ? `__${carro}` : "") +
      `.${ext}`;

    const s3 = getS3();
    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = required("S3_BUCKET");

    // 1) Upload privado
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        // pode deixar inline aqui; o download será forçado no GET via presign
        ContentDisposition: "inline",
      })
    );

    // 2) Presigned URL (GET) com download forçado e filename amigável
    const expiresIn = Number(process.env.S3_PRESIGN_EXPIRES || 60 * 60 * 24 * 7);

    const downloadName = buildDownloadFilename({
      safeDoc,
      nome: nomeRaw,
      date,
      ext,
    });

    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        ResponseContentDisposition: `attachment; filename="${downloadName}"`,
        ResponseContentType: file.type,
      }),
      { expiresIn }
    );

    // 3) Link curto
    const code = await generateUniqueCode(s3, bucket, Number(process.env.SHORT_CODE_LEN || 8));
    const shortKey = `short/${code}.json`;
    const expAt = Date.now() + expiresIn * 1000;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: shortKey,
        Body: Buffer.from(JSON.stringify({ url: signedUrl, expAt, key }), "utf-8"),
        ContentType: "application/json",
        CacheControl: "no-store",
      })
    );

    const base = siteBase();
    const shortUrl = base ? `${base}/d/${code}` : null;

    return NextResponse.json({
      key,
      url: signedUrl,
      shortUrl,
      code,
      expiresIn,
      expAt,
      downloadName, // só para debug/visualização
    });
  } catch (err: any) {
    console.error("[api/upload] ERROR:", err);
    const status = err?.$metadata?.httpStatusCode || 500;
    const code = err?.name || err?.Code || undefined;

    return NextResponse.json(
      {
        error: err?.message || "Erro interno no upload.",
        code,
        status,
      },
      { status: 500 }
    );
  }
}
