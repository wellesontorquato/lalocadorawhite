import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
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

const sanitize = (s: string) =>
  (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

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

    const nome = sanitize(String(form.get("nome") || ""));
    const carro = sanitize(String(form.get("carro") || ""));

    const ext = extFromType(file.type);
    const id = crypto.randomUUID();
    const date = new Date().toISOString().slice(0, 10);

    const safeDoc = docTypeRaw === "cpf" || docTypeRaw === "cnh" ? docTypeRaw : "doc";

    const key =
      `reservas/${date}/` +
      `${safeDoc}-${id}` +
      (nome ? `__${nome}` : "") +
      (carro ? `__${carro}` : "") +
      `.${ext}`;

    const s3 = getS3();
    const buffer = Buffer.from(await file.arrayBuffer());

    // 1) Upload privado
    await s3.send(
      new PutObjectCommand({
        Bucket: required("S3_BUCKET"),
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ContentDisposition: "inline",
      })
    );

    // 2) Presigned URL (GET) — expira em X segundos
    const expiresIn = Number(process.env.S3_PRESIGN_EXPIRES || 60 * 60 * 24 * 7); // padrão: 7 dias

    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: required("S3_BUCKET"),
        Key: key,
        ResponseContentDisposition: "inline",
        ResponseContentType: file.type,
      }),
      { expiresIn }
    );

    return NextResponse.json({
      key,
      url: signedUrl, // ✅ este é o link que vai pro WhatsApp
      expiresIn,
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
