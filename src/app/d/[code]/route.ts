import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

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

const getS3 = () =>
  new S3Client({
    region: process.env.S3_REGION || "us-central",
    endpoint: required("S3_ENDPOINT"),
    forcePathStyle: boolEnv("S3_FORCE_PATH_STYLE", true),
    credentials: {
      accessKeyId: required("S3_ACCESS_KEY_ID"),
      secretAccessKey: required("S3_SECRET_ACCESS_KEY"),
    },
  });

async function readJsonFromS3(key: string) {
  const s3 = getS3();
  const res = await s3.send(
    new GetObjectCommand({
      Bucket: required("S3_BUCKET"),
      Key: key,
    })
  );

  const body = await res.Body?.transformToString();
  if (!body) return null;
  return JSON.parse(body);
}

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const code = String(params.code || "").trim();
    if (!code) return NextResponse.json({ error: "Código inválido" }, { status: 400 });

    const data = await readJsonFromS3(`short/${code}.json`);
    if (!data?.url) return NextResponse.json({ error: "Link não encontrado" }, { status: 404 });

    // expiração
    if (data.expAt && Date.now() > Number(data.expAt)) {
      return NextResponse.json({ error: "Link expirado" }, { status: 410 });
    }

    // Redireciona para a presigned URL
    return NextResponse.redirect(data.url, 302);
  } catch (err: any) {
    console.error("[d/:code] ERROR:", err);
    return NextResponse.json({ error: "Erro ao abrir link" }, { status: 500 });
  }
}
