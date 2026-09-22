import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import EventForm from "@/components/admin/EventForm";

export default async function CreateEventPage() {
  const session = await getAuthSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-mint-fog/30 text-dark-text pb-16">
      <AdminNav user={session} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventForm />
      </main>
    </div>
  );
}
