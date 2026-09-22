import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getPublicMemberStatsService } from "@/lib/services/members.service";

export async function GET(request: NextRequest) {
  try {
    const stats = await getPublicMemberStatsService();
    return apiSuccess(stats);
  } catch (error: any) {
    return apiError("Failed to fetch member statistics", 500, error?.message || error);
  }
}
