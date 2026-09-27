import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getAdminNotificationsService } from "@/lib/services/notifications.service";
import { getAdminsService } from "@/lib/services/admin.service";
import NotificationsClient from "./NotificationsClient";
import { Bell } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminNotificationsPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/admin/login");
  }

  const notifications = await getAdminNotificationsService(session.id);
  const admins = await getAdminsService();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-forest flex items-center gap-2.5">
          <Bell className="w-6 h-6" />
          Notifications Management
        </h1>
        <p className="text-xs text-dark-text/60 mt-1">View and manage admin system alerts and notifications.</p>
      </div>

      <NotificationsClient
        initialNotifications={notifications}
        admins={admins}
        currentAdminId={session.id}
        isAdminRole={session.role === "ADMIN"}
      />
    </div>
  );
}
