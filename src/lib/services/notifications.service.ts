import { prisma } from "@/lib/prisma";

export async function getAdminNotificationsService(adminId?: string) {
  try {
    const notifications = await prisma.adminNotification.findMany({
      where: adminId ? { adminId } : undefined,
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return notifications;
  } catch (err) {
    console.warn("Notifications service DB error, returning empty list:", (err as Error).message);
    return [];
  }
}

export async function createAdminNotificationService(adminId: string, message: string) {
  try {
    return await prisma.adminNotification.create({
      data: {
        adminId,
        message,
      },
    });
  } catch (err) {
    console.error("Failed to create admin notification:", err);
    throw new Error("Could not create notification");
  }
}

export async function markNotificationReadService(id: string) {
  try {
    return await prisma.adminNotification.update({
      where: { id },
      data: { read: true },
    });
  } catch (err) {
    console.error("Failed to mark notification as read:", err);
    throw new Error("Could not update notification");
  }
}
