import React from "react";
import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getTeamMemberByIdService } from "@/lib/services/team.service";
import AdminNav from "@/components/admin/AdminNav";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAuthSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const member = await getTeamMemberByIdService(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-mint-fog/30 text-dark-text pb-16">
      <AdminNav user={session} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TeamMemberForm initialData={member} isEdit={true} />
      </main>
    </div>
  );
}
