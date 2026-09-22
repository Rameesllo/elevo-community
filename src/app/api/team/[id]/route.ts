import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import {
  getTeamMemberByIdService,
  updateTeamMemberService,
  deleteTeamMemberService,
} from "@/lib/services/team.service";
import { updateTeamMemberSchema } from "@/lib/validations";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return apiError("Team member ID is required", 400);

    const member = await getTeamMemberByIdService(id);
    if (!member) return apiError("Team member not found", 404);

    return apiSuccess(member);
  } catch (error: any) {
    return apiError("Failed to fetch team member", 500, error?.message || error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return apiError("Team member ID is required", 400);

    const body = await request.json();
    const validatedData = updateTeamMemberSchema.parse(body);

    const updatedMember = await updateTeamMemberService(id, validatedData as any);
    return apiSuccess(updatedMember);
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return apiError("Validation error", 400, error.errors);
    }
    return apiError("Failed to update team member", 500, error?.message || error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return apiError("Team member ID is required", 400);

    await deleteTeamMemberService(id);
    return apiSuccess({ message: "Team member deleted successfully" });
  } catch (error: any) {
    return apiError("Failed to delete team member", 500, error?.message || error);
  }
}
