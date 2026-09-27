import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import EventForm from "@/components/admin/EventForm";

export default async function CreateEventPage() {
  const session = await getAuthSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      <EventForm />
    </div>
  );
}
