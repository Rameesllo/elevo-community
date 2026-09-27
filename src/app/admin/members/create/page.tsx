import MemberForm from "@/components/admin/MemberForm";
import { UserPlus } from "lucide-react";

export default function AdminMemberCreatePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black text-forest flex items-center gap-2.5">
          <UserPlus className="w-5 h-5" />
          Add New Member
        </h1>
        <p className="text-xs text-dark-text/60 mt-1">Fill in the member details below.</p>
      </div>

      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm p-6">
        <MemberForm isEditing={false} />
      </div>
    </div>
  );
}
