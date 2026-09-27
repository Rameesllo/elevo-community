import Link from "next/link";
import { getAllMembersAdminService } from "@/lib/services/members.service";
import ToggleMemberActive from "@/components/admin/ToggleMemberActive";
import DeleteMemberButton from "@/components/admin/DeleteMemberButton";
import { UserCheck, PlusCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const members = await getAllMembersAdminService();

  const activeCount = members.filter((m) => m.isActive).length;
  const inactiveCount = members.length - activeCount;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-forest/10 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-forest flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-forest" />
            Members Management
          </h1>
          <p className="text-xs text-dark-text/70 mt-1">
            View, activate, edit and manage all community members.
          </p>
        </div>
        <Link
          href="/admin/members/create"
          className="px-4 py-2.5 bg-forest hover:bg-forest/90 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Member</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Members", value: members.length, color: "text-forest", bg: "bg-mint-fog/50 border-forest/10" },
          { label: "Active", value: activeCount, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
          { label: "Inactive", value: inactiveCount, color: "text-red-600", bg: "bg-red-50 border-red-200" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} border rounded-2xl p-5`}>
            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
            <div className={`text-xs font-semibold mt-1 ${stat.color} opacity-80`}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-forest/10 flex items-center justify-between">
          <h2 className="text-sm font-bold text-forest">All Members</h2>
          <span className="text-xs text-dark-text/50">⚠️ Private data — admins only</span>
        </div>

        {members.length === 0 ? (
          <div className="p-12 text-center text-dark-text/60">
            <div className="text-5xl mb-3">👥</div>
            <div className="font-semibold text-sm">No members yet</div>
            <Link href="/admin/members/create" className="text-forest font-bold mt-2 inline-block text-xs">
              + Add first member
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-mint-fog/60 border-b border-forest/10 text-dark-text/70 uppercase tracking-wider font-bold">
                  {["Member", "Contact", "Education", "Skills", "Joined", "Status", "Actions"].map((h) => (
                    <th key={h} className="py-4 px-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10 font-medium text-dark-text">
                {members.map((member) => {
                  const initials = `${member.firstName[0] || ""}${member.lastName[0] || ""}`.toUpperCase();
                  return (
                    <tr key={member.id} className="hover:bg-mint-fog/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.firstName}
                              className="w-9 h-9 rounded-full object-cover border-2 border-forest/20"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#123c2a] to-[#1a5c3f] text-white flex items-center justify-center font-bold text-xs">
                              {initials}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-dark-text">
                              {member.firstName} {member.lastName}
                            </div>
                            {member.address && (
                              <div className="text-[11px] text-dark-text/50 max-w-[140px] truncate">{member.address}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {member.email && <div className="text-dark-text">{member.email}</div>}
                        {member.phone && <div className="text-dark-text/60">{member.phone}</div>}
                        {!member.email && !member.phone && <span className="text-gray-400">—</span>}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{member.educationLevel || "—"}</div>
                        {member.institution && <div className="text-dark-text/60 text-[11px]">{member.institution}</div>}
                      </td>
                      <td className="py-4 px-4 max-w-[160px]">
                        {member.skills ? (
                          <div className="flex flex-wrap gap-1">
                            {member.skills.split(",").slice(0, 3).map((s) => (
                              <span key={s} className="px-2 py-0.5 bg-mint-fog text-forest rounded-full text-[10px] font-semibold">
                                {s.trim()}
                              </span>
                            ))}
                            {member.skills.split(",").length > 3 && (
                              <span className="text-[11px] text-dark-text/50">+{member.skills.split(",").length - 3}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-dark-text/60">{member.joinedAt}</td>
                      <td className="py-4 px-4">
                        <ToggleMemberActive id={member.id} isActive={member.isActive} />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 items-center">
                          <Link
                            href={`/admin/members/${member.id}/edit`}
                            className="px-3 py-1.5 bg-mint-fog/60 hover:bg-mint-fog text-forest border border-forest/20 rounded-xl text-xs font-bold transition-colors"
                          >
                            Edit
                          </Link>
                          <DeleteMemberButton id={member.id} name={`${member.firstName} ${member.lastName}`} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
