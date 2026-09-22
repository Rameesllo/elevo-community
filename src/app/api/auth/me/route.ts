import { NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) {
    return apiError("Unauthorized", 401);
  }

  return apiSuccess({ user: session });
}
