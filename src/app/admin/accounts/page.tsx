import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getAdminsService } from "@/lib/services/admin.service";
import AdminListClient from "./AdminListClient";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAccountsPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/admin/login");
  }

  if (session.role !== "ADMIN") {
    redirect("/admin/dashboard");
  }

  const admins = await getAdminsService();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-forest flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6" />
          Admin Accounts
        </h1>
        <p className="text-xs text-dark-text/60 mt-1">Manage administrator and manager accounts.</p>
      </div>

      <AdminListClient initialAdmins={admins} currentAdminId={session.id} />
    </div>
  );
}
