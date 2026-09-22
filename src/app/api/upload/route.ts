import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return apiError("File size exceeds 5MB limit", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Generate clean unique filename
    const ext = path.extname(file.name) || ".png";
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `${cleanName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return apiSuccess({ url: publicUrl, filename }, 201);
  } catch (error: any) {
    console.error("Upload error:", error);
    return apiError("Failed to upload image", 500, error?.message || error);
  }
}
