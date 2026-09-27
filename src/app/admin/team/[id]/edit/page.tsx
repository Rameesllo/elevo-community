import React from "react";
import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getTeamMemberByIdService } from "@/lib/services/team.service";
import TeamMemberForm from "@/components/admin/TeamMemberForm";
import { UserCog } from "lucide-react";

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
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black text-forest flex items-center gap-2.5">
          <UserCog className="w-5 h-5" />
          Edit Team Member
        </h1>
        <p className="text-xs text-dark-text/60 mt-1">{member.name}</p>
      </div>

      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm p-6">
        <TeamMemberForm initialData={member} isEdit={true} />
      </div>
    </div>
  );
}
