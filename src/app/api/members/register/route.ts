import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { registerMemberService } from "@/lib/services/members.service";
import { createMemberSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createMemberSchema.parse(body);

    const result = await registerMemberService(validatedData);

    return apiSuccess(result, 201);
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return apiError("Validation error", 400, error.errors);
    }
    return apiError("Failed to register member", 500, error?.message || error);
  }
}
