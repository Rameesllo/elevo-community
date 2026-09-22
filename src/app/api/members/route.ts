import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getAllMembersAdminService, registerMemberService } from "@/lib/services/members.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActiveParam = searchParams.get("isActive");
    const search = searchParams.get("search") || undefined;
    const isActive = isActiveParam !== null ? isActiveParam === "true" : undefined;

    const members = await getAllMembersAdminService({ isActive, search });
    return apiSuccess(members);
  } catch (error: any) {
    return apiError("Failed to fetch members", 500, error?.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.firstName || !body.lastName) {
      return apiError("First name and last name are required", 400);
    }
    const result = await registerMemberService(body);
    return apiSuccess(result, 201);
  } catch (error: any) {
    return apiError("Failed to create member", 500, error?.message);
  }
}
