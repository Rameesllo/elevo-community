import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTeamMembersService, createTeamMemberService } from "@/lib/services/team.service";
import { createTeamMemberSchema, teamQuerySchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department") || undefined;
    const isActive = searchParams.get("isActive");

    const validatedQuery = teamQuerySchema.parse({ department, isActive });
    const teamMembers = await getTeamMembersService(validatedQuery);

    return apiSuccess(teamMembers);
  } catch (error: any) {
    return apiError("Failed to fetch team members", 500, error?.message || error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createTeamMemberSchema.parse(body);
    const newMember = await createTeamMemberService(validatedData as any);

    return apiSuccess(newMember, 201);
  } catch (error: any) {
    if (error?.name === "ZodError") {
      const details = error.issues ?? error.errors ?? error.message;
      return apiError("Validation error", 400, details);
    }
    return apiError("Failed to create team member", 500, error?.message || error);
  }
}
