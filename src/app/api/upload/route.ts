import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { auth } from "@/auth";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Tentukan tipe gambar murni dari byte pertama file (magic number), bukan dari
// `file.type` yang dikirim browser — browser biasanya menebak MIME type dari
// ekstensi nama file, jadi bisa salah kalau ekstensinya tidak sesuai isi aslinya.
function detectImageType(bytes: Uint8Array): { mimeType: string; extension: string } | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mimeType: "image/jpeg", extension: "jpg" };
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { mimeType: "image/png", extension: "png" };
  }
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return { mimeType: "image/gif", extension: "gif" };
  }
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { mimeType: "image/webp", extension: "webp" };
  }
  return null;
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  // Tolak lebih awal berdasarkan Content-Length, sebelum request.formData() membaca
  // seluruh body ke memori — supaya file raksasa tidak keburu menghabiskan RAM worker.
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Ukuran file maksimal 5MB" }, { status: 413 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Ukuran file maksimal 5MB" }, { status: 400 });
    }

    const { env } = getCloudflareContext();
    const accountId = env.R2_ACCOUNT_ID;
    const accessKeyId = env.R2_ACCESS_KEY_ID;
    const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
    const bucketName = env.R2_BUCKET_NAME;
    const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
      console.error("R2 env vars missing");
      return NextResponse.json({ error: "Konfigurasi R2 belum lengkap di server" }, { status: 500 });
    }

    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });

    const bytes = new Uint8Array(await file.arrayBuffer());
    const detected = detectImageType(bytes);

    if (!detected) {
      return NextResponse.json(
        { error: "File bukan gambar yang didukung (JPG, PNG, WEBP, atau GIF)" },
        { status: 400 },
      );
    }

    // Nama file dibuat dari timestamp + random, bukan dari nama asli file, supaya
    // tidak ada celah path traversal atau karakter aneh dari input pengguna.
    const uniqueFileName = `${Date.now()}-${crypto.randomUUID()}.${detected.extension}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: bytes,
        ContentType: detected.mimeType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    return NextResponse.json({ url: `${publicUrl}/${uniqueFileName}`, success: true });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Gagal upload ke R2" }, { status: 500 });
  }
}
