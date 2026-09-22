import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getMemberByIdAdminService, updateMemberService, deleteMemberService } from "@/lib/services/members.service";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const member = await getMemberByIdAdminService(id);
    if (!member) return apiError("Member not found", 404);
    return apiSuccess(member);
  } catch (error: any) {
    return apiError("Failed to fetch member", 500, error?.message);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateMemberService(id, body);
    return apiSuccess(updated);
  } catch (error: any) {
    return apiError("Failed to update member", 500, error?.message);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteMemberService(id);
    return apiSuccess({ message: "Member deleted successfully" });
  } catch (error: any) {
    return apiError("Failed to delete member", 500, error?.message);
  }
}
