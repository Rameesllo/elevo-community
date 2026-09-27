import { notFound } from "next/navigation";
import { getMemberByIdAdminService } from "@/lib/services/members.service";
import MemberForm from "@/components/admin/MemberForm";
import DeleteMemberButton from "@/components/admin/DeleteMemberButton";
import { UserCog } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminMemberEditPage({ params }: PageProps) {
  const { id } = await params;
  const member = await getMemberByIdAdminService(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-forest flex items-center gap-2.5">
            <UserCog className="w-5 h-5" />
            Edit Member
          </h1>
          <p className="text-xs text-dark-text/60 mt-1">
            {member.firstName} {member.lastName}
          </p>
        </div>
        <DeleteMemberButton id={member.id} name={`${member.firstName} ${member.lastName}`} />
      </div>

      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm p-6">
        <MemberForm initialData={member} isEditing={true} />
      </div>
    </div>
  );
}
