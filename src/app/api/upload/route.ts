import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return apiError("No file uploaded", 400);
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return apiError("Invalid file format. Only JPEG, PNG, WEBP, and GIF images are allowed.", 400);
    }

    // Keep 5MB intake limit, but will compress down to ~150-350KB storage
    if (file.size > 5 * 1024 * 1024) {
      return apiError("File size exceeds 5MB limit", 400);
    }

    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const extOriginal = path.extname(file.name) || ".png";
    const cleanName = path.basename(file.name, extOriginal).replace(/[^a-zA-Z0-9_-]/g, "") || "poster";
    let outputBuffer: Buffer;
    let outExt = extOriginal;
    const baseFilename = `${cleanName}-${Date.now()}`;

    // SVG & GIF: store as-is (no raster compression)
    if (file.type === "image/svg+xml" || file.type === "image/gif") {
      outputBuffer = inputBuffer;
      outExt = file.type === "image/svg+xml" ? ".svg" : ".gif";
    } else {
      // Compress raster images: resize inside 1280px, convert to WebP quality 70
      // Reduces typical 2-4MB phone poster to 80-250KB without visible loss
      const compressed = await sharp(inputBuffer)
        .rotate()
        .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 70, effort: 4 })
        .toBuffer();
      outputBuffer = compressed;
      outExt = ".webp";
    }

    const filename = `${baseFilename}${outExt}`;
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, outputBuffer);

    const originalKB = Math.round(inputBuffer.length / 1024);
    const compressedKB = Math.round(outputBuffer.length / 1024);
    const savedKB = originalKB - compressedKB;

    console.log(`Upload compressed: ${file.name} ${originalKB}KB -> ${compressedKB}KB (saved ${savedKB}KB)`);

    const publicUrl = `/uploads/${filename}`;
    return apiSuccess({ url: publicUrl, filename, originalKB, compressedKB, savedKB }, 201);
  } catch (error: any) {
    console.error("Upload error:", error);
    return apiError("Failed to upload image", 500, error?.message || error);
  }
}
