import Link from "next/link";
import { getAllAnnouncementsAdminService } from "@/lib/services/announcements.service";
import ToggleAnnouncementPublish from "@/components/admin/ToggleAnnouncementPublish";
import DeleteAnnouncementButton from "@/components/admin/DeleteAnnouncementButton";
import { Megaphone, PlusCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const announcements = await getAllAnnouncementsAdminService();

  const publishedCount = announcements.filter((a) => (a as any).published).length;
  const draftCount = announcements.length - publishedCount;
  const importantCount = announcements.filter((a) => a.important).length;

  const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
    Urgent: { bg: "bg-red-100", color: "text-red-700" },
    Event: { bg: "bg-blue-100", color: "text-blue-700" },
    Meeting: { bg: "bg-purple-100", color: "text-purple-700" },
    Notice: { bg: "bg-amber-100", color: "text-amber-700" },
    General: { bg: "bg-gray-100", color: "text-gray-700" },
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-forest/10 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-forest flex items-center gap-2.5">
            <Megaphone className="w-6 h-6 text-forest" />
            Announcements
          </h1>
          <p className="text-xs text-dark-text/70 mt-1">
            Manage community circulars, notices and important announcements.
          </p>
        </div>
        <Link
          href="/admin/announcements/create"
          className="px-4 py-2.5 bg-forest hover:bg-forest/90 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Announcement</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: announcements.length, cls: "text-forest bg-mint-fog/50 border-forest/10" },
          { label: "Published", value: publishedCount, cls: "text-emerald-700 bg-emerald-50 border-emerald-200" },
          { label: "Drafts", value: draftCount, cls: "text-amber-700 bg-amber-50 border-amber-200" },
          { label: "Important", value: importantCount, cls: "text-red-600 bg-red-50 border-red-200" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.cls} border rounded-2xl p-5`}>
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="text-xs font-semibold mt-1 opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-forest/10">
          <h2 className="text-sm font-bold text-forest">All Announcements</h2>
        </div>

        {announcements.length === 0 ? (
          <div className="p-12 text-center text-dark-text/60">
            <div className="text-5xl mb-3">📢</div>
            <div className="font-semibold text-sm">No announcements yet</div>
            <Link href="/admin/announcements/create" className="text-forest font-bold mt-2 inline-block text-xs">
              + Create first announcement
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-mint-fog/60 border-b border-forest/10 text-dark-text/70 uppercase tracking-wider font-bold">
                  {["Title", "Category", "Date", "Summary", "Status", "Actions"].map((h) => (
                    <th key={h} className="py-4 px-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10 font-medium text-dark-text">
                {announcements.map((ann) => {
                  const a = ann as any;
                  const dateStr = a.date
                    ? new Date(a.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
                    : "—";
                  const catStyle = CATEGORY_COLORS[a.category] || CATEGORY_COLORS.General;

                  return (
                    <tr key={a.id} className="hover:bg-mint-fog/20 transition-colors">
                      <td className="py-4 px-4 max-w-[240px]">
                        <div className="flex items-center gap-1.5">
                          {a.important && <span title="Important" className="text-base">🔴</span>}
                          <span className="font-bold text-dark-text truncate">{a.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${catStyle.bg} ${catStyle.color}`}>
                          {a.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-dark-text/60">{dateStr}</td>
                      <td className="py-4 px-4 max-w-[260px]">
                        <span className="text-dark-text/60 line-clamp-2">
                          {a.summary || a.content?.slice(0, 80)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <ToggleAnnouncementPublish id={a.id} published={a.published ?? false} />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 items-center">
                          <Link
                            href={`/admin/announcements/${a.id}/edit`}
                            className="px-3 py-1.5 bg-mint-fog/60 hover:bg-mint-fog text-forest border border-forest/20 rounded-xl text-xs font-bold transition-colors"
                          >
                            Edit
                          </Link>
                          <DeleteAnnouncementButton id={a.id} title={a.title} />
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
