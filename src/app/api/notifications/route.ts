import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getAdminNotificationsService, createAdminNotificationService } from "@/lib/services/notifications.service";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminId = searchParams.get("adminId") || undefined;

    const notifications = await getAdminNotificationsService(adminId);
    return apiSuccess(notifications);
  } catch (error: any) {
    return apiError("Failed to fetch notifications", 500, error?.message || error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return apiError("Unauthorized", 401);

    const body = await request.json();
    if (!body.adminId || !body.message) return apiError("Missing adminId or message", 400);

    const notification = await createAdminNotificationService(body.adminId, body.message);
    return apiSuccess(notification, 201);
  } catch (error: any) {
    return apiError("Failed to create notification", 500, error?.message);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return apiError("Unauthorized", 401);

    const body = await request.json();
    if (body.action === "markAllRead") {
      const { searchParams } = new URL(request.url);
      const adminId = searchParams.get("adminId");
      if (!adminId) return apiError("Missing adminId", 400);
      
      await prisma.adminNotification.updateMany({
        where: { adminId, read: false },
        data: { read: true },
      });
      return apiSuccess({ message: "All marked as read" });
    }
    return apiError("Invalid action", 400);
  } catch (error: any) {
    return apiError("Failed to update notifications", 500, error?.message);
  }
}

