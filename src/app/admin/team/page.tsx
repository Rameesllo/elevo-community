import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getTeamMembersService } from "@/lib/services/team.service";
import DeleteTeamMemberButton from "@/components/admin/DeleteTeamMemberButton";
import ToggleTeamMemberActive from "@/components/admin/ToggleTeamMemberActive";
import { Users, PlusCircle, Edit, Mail, Phone } from "lucide-react";

export default async function AdminTeamPage() {
  const session = await getAuthSession();
  if (!session) redirect("/admin/login");

  const teamMembers = await getTeamMembersService();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-forest/10 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-forest flex items-center gap-2.5">
            <Users className="w-6 h-6 text-forest" />
            Team Directory Management
          </h1>
          <p className="text-xs text-dark-text/70 mt-1">
            Manage Founders (layer 1), Current Team (layer 2: Executive / Office Bearers / Coordinators / Youth Wing), and Alumni (layer 3) — with photos.
          </p>
        </div>

        <Link
          href="/admin/team/create"
          className="px-4 py-2.5 bg-forest hover:bg-forest/90 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Team Member</span>
        </Link>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm overflow-hidden">
        {teamMembers.length === 0 ? (
          <div className="p-12 text-center text-xs text-dark-text/60">
            No team members found. Click &quot;Add Team Member&quot; to populate your directory.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-mint-fog/60 border-b border-forest/10 text-dark-text/70 uppercase tracking-wider font-bold">
                  <th className="py-4 px-6">Member & Role</th>
                  <th className="py-4 px-4">Department</th>
                  <th className="py-4 px-4">Contact</th>
                  <th className="py-4 px-4 text-center">Order</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10 font-medium text-dark-text">
                {teamMembers.map((tm) => (
                  <tr key={tm.id} className="hover:bg-mint-fog/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl bg-forest text-white font-bold text-xs flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-forest/10">
                          {tm.image ? (
                            <Image src={tm.image} alt={tm.name} fill className="object-cover" />
                          ) : (
                            <span>{tm.initials || tm.name.slice(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-forest">{tm.name}</div>
                          <div className="text-[11px] text-dark-text/70">{tm.role}</div>
                          {tm.badge && (
                            <span className="inline-block mt-0.5 text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                              {tm.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-[11px] font-semibold bg-mint-fog px-2.5 py-1 rounded-md text-dark-text">
                        {tm.department}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-0.5 text-[11px] text-dark-text/70">
                        {tm.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-forest/60" />
                            <span className="truncate max-w-[150px]">{tm.email}</span>
                          </div>
                        )}
                        {tm.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-forest/60" />
                            <span>{tm.phone}</span>
                          </div>
                        )}
                        {!tm.email && !tm.phone && <span className="text-gray-400">—</span>}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center font-bold text-forest">
                      {tm.displayOrder ?? 0}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <ToggleTeamMemberActive memberId={tm.id} initialActive={tm.isActive ?? true} />
                        <span className="text-[9px] text-dark-text/50 uppercase font-bold">
                          {(tm.isActive ?? true) ? "Active" : "Hidden"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/team/${tm.id}/edit`}
                          className="p-2 bg-mint-fog/60 hover:bg-mint-fog text-forest rounded-xl transition-colors font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Link>
                        <DeleteTeamMemberButton memberId={tm.id} memberName={tm.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
