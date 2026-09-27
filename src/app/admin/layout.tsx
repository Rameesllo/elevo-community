import React from "react";
import { getAuthSession } from "@/lib/auth";
import AdminSidebarLayout from "@/components/admin/AdminSidebarLayout";


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  // Login page is handled separately - no sidebar needed there
  // The middleware-style redirect: if on any /admin page except login and no session, redirect
  // We let child pages redirect on their own for login/dashboard pages
  // But we can still wrap everyone except login here by checking pathname isn't possible server-side
  // Instead we render conditionally: if no session, just render children (login page handles its own ui)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AdminSidebarLayout user={session}>
      {children}
    </AdminSidebarLayout>
  );
}
