import Link from "next/link";
import { getAllAnnouncementsAdminService } from "@/lib/services/announcements.service";
import ToggleAnnouncementPublish from "@/components/admin/ToggleAnnouncementPublish";
import DeleteAnnouncementButton from "@/components/admin/DeleteAnnouncementButton";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const announcements = await getAllAnnouncementsAdminService();

  const publishedCount = announcements.filter((a) => (a as any).published).length;
  const draftCount = announcements.length - publishedCount;
  const importantCount = announcements.filter((a) => a.important).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f0faf5", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #123c2a 0%, #1a5c3f 100%)",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin/dashboard" style={{ color: "#a7d7b8", textDecoration: "none", fontSize: "0.875rem" }}>
            ← Dashboard
          </Link>
          <span style={{ color: "#a7d7b8" }}>|</span>
          <h1 style={{ margin: 0, color: "white", fontSize: "1.375rem", fontWeight: 700 }}>
            📢 Announcements
          </h1>
        </div>
        <Link
          href="/admin/announcements/create"
          style={{
            padding: "0.625rem 1.25rem",
            background: "#e8f5ef",
            color: "#123c2a",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          ➕ New Announcement
        </Link>
      </div>

      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total", value: announcements.length, color: "#123c2a", bg: "#e8f5ef" },
            { label: "Published", value: publishedCount, color: "#059669", bg: "#d1fae5" },
            { label: "Drafts", value: draftCount, color: "#d97706", bg: "#fef9c3" },
            { label: "Important", value: importantCount, color: "#dc2626", bg: "#fee2e2" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: stat.bg,
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                border: `1px solid ${stat.color}30`,
              }}
            >
              <div style={{ fontSize: "1.875rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: stat.color, opacity: 0.8 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #c8e6d5",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(18,60,42,0.06)",
          }}
        >
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e8f5ef" }}>
            <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#123c2a" }}>All Announcements</h2>
          </div>

          {announcements.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#6b9e7e" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>📢</div>
              <div style={{ fontWeight: 600 }}>No announcements yet</div>
              <Link href="/admin/announcements/create" style={{ color: "#123c2a", fontWeight: 700, marginTop: "0.5rem", display: "inline-block" }}>
                + Create first announcement
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fdf9", borderBottom: "1px solid #e8f5ef" }}>
                    {["Title", "Category", "Date", "Summary", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.75rem 1rem",
                          textAlign: "left",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#2d5a3d",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((ann, i) => {
                    const a = ann as any;
                    const dateStr = a.date
                      ? new Date(a.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
                      : "—";

                    const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
                      Urgent: { bg: "#fee2e2", color: "#dc2626" },
                      Event: { bg: "#e0f2fe", color: "#0284c7" },
                      Meeting: { bg: "#ede9fe", color: "#7c3aed" },
                      Notice: { bg: "#fef9c3", color: "#d97706" },
                      General: { bg: "#f3f4f6", color: "#374151" },
                    };
                    const catStyle = CATEGORY_COLORS[a.category] || CATEGORY_COLORS.General;

                    return (
                      <tr
                        key={a.id}
                        style={{
                          borderBottom: i < announcements.length - 1 ? "1px solid #f0faf5" : "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fdf9")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "0.875rem 1rem", maxWidth: 240 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {a.important && <span title="Important" style={{ fontSize: "0.9rem" }}>🔴</span>}
                            <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {a.title}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <span
                            style={{
                              padding: "0.2rem 0.6rem",
                              background: catStyle.bg,
                              color: catStyle.color,
                              borderRadius: "999px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {a.category}
                          </span>
                        </td>
                        <td style={{ padding: "0.875rem 1rem", whiteSpace: "nowrap" }}>
                          <span style={{ fontSize: "0.8rem", color: "#6b9e7e" }}>{dateStr}</span>
                        </td>
                        <td style={{ padding: "0.875rem 1rem", maxWidth: 260 }}>
                          <span style={{ fontSize: "0.8rem", color: "#666", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                            {a.summary || a.content?.slice(0, 80)}
                          </span>
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <ToggleAnnouncementPublish id={a.id} published={a.published ?? false} />
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <Link
                              href={`/admin/announcements/${a.id}/edit`}
                              style={{
                                padding: "0.375rem 0.75rem",
                                background: "#e8f5ef",
                                color: "#123c2a",
                                border: "1px solid #a7d7b8",
                                borderRadius: "6px",
                                fontSize: "0.8rem",
                                textDecoration: "none",
                                fontWeight: 600,
                              }}
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
    </div>
  );
}
