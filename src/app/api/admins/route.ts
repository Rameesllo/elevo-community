import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getAdminsService, createAdminService } from "@/lib/services/admin.service";
import { getAuthSession, hashPassword } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session || session.role !== "ADMIN") {
      return apiError("Unauthorized", 403);
    }
    const admins = await getAdminsService();
    return apiSuccess(admins);
  } catch (error: any) {
    return apiError("Failed to fetch admins", 500, error?.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session || session.role !== "ADMIN") {
      return apiError("Unauthorized", 403);
    }
    const body = await request.json();
    if (!body.email || !body.name || !body.password || !body.role) {
      return apiError("Missing required fields", 400);
    }
    const passwordHash = await hashPassword(body.password);
    const result = await createAdminService({
      email: body.email,
      name: body.name,
      passwordHash,
      role: body.role,
    });
    return apiSuccess(result, 201);
  } catch (error: any) {
    return apiError("Failed to create admin", 500, error?.message);
  }
}
