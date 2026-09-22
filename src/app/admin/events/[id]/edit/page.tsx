import React from "react";
import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getEventByIdService } from "@/lib/services/events.service";
import AdminNav from "@/components/admin/AdminNav";
import EventForm from "@/components/admin/EventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAuthSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const event = await getEventByIdService(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-mint-fog/30 text-dark-text pb-16">
      <AdminNav user={session} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventForm initialData={event} isEdit={true} />
      </main>
    </div>
  );
}
