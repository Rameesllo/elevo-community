import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getAdminNotificationsService, createAdminNotificationService } from "@/lib/services/notifications.service";
import { createNotificationSchema } from "@/lib/validations";

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
    const body = await request.json();
    const validatedData = createNotificationSchema.parse(body);

    const notification = await createAdminNotificationService(
      validatedData.adminId,
      validatedData.message
    );

    return apiSuccess(notification, 201);
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return apiError("Validation error", 400, error.errors);
    }
    return apiError("Failed to create notification", 500, error?.message || error);
  }
}
