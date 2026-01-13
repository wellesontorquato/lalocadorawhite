import { NextResponse, type NextRequest } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ======================
// Helpers
// ======================
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

// ======================
// GET /d/[code]
// ======================
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await ctx.params;
    const cleanCode = String(code || "").trim();

    if (!cleanCode) {
      return NextResponse.redirect(new URL("/", req.url), { status: 302 });
    }

    const data = await readJsonFromS3(`short/${cleanCode}.json`);

    if (!data?.url) {
      return NextResponse.redirect(new URL("/", req.url), { status: 302 });
    }

    // Expiração
    if (data.expAt && Date.now() > Number(data.expAt)) {
      return NextResponse.redirect(new URL("/", req.url), { status: 302 });
    }

    // 🔁 Redireciona para a presigned URL real
    return NextResponse.redirect(data.url, { status: 302 });
  } catch (err) {
    console.error("[d/:code] ERROR:", err);
    return NextResponse.redirect(new URL("/", req.url), { status: 302 });
  }
}
