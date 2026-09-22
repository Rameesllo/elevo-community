import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { markNotificationReadService } from "@/lib/services/notifications.service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return apiError("Notification ID is required", 400);
    }

    const updated = await markNotificationReadService(id);
    return apiSuccess(updated);
  } catch (error: any) {
    return apiError("Failed to update notification", 500, error?.message || error);
  }
}
