import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { markNotificationReadService } from "@/lib/services/notifications.service";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    if (!session) return apiError("Unauthorized", 401);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    if (!session) return apiError("Unauthorized", 401);

    const { id } = await params;
    if (!id) {
      return apiError("Notification ID is required", 400);
    }

    await prisma.adminNotification.delete({ where: { id } });
    return apiSuccess({ message: "Deleted" });
  } catch (error: any) {
    return apiError("Failed to delete notification", 500, error?.message || error);
  }
}

