import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

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

const buildPublicUrl = (key: string) => {
  const base = required("S3_PUBLIC_URL").replace(/\/$/, "");
  const bucket = required("S3_BUCKET");
  return `${base}/${bucket}/${key}`;
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const docType = String(form.get("docType") || "doc").toLowerCase();

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
    const safeDoc = docType === "cpf" || docType === "cnh" ? docType : "doc";

    const key =
      `reservas/${date}/` +
      `${safeDoc}-${id}` +
      (nome ? `__${nome}` : "") +
      (carro ? `__${carro}` : "") +
      `.${ext}`;

    const s3 = getS3();
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: required("S3_BUCKET"),
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return NextResponse.json({
      key,
      url: buildPublicUrl(key),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erro interno no upload." },
      { status: 500 }
    );
  }
}
