import Link from "next/link";
import { getAllMembersAdminService } from "@/lib/services/members.service";
import ToggleMemberActive from "@/components/admin/ToggleMemberActive";
import DeleteMemberButton from "@/components/admin/DeleteMemberButton";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const members = await getAllMembersAdminService();

  const activeCount = members.filter((m) => m.isActive).length;
  const inactiveCount = members.length - activeCount;

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
            👥 Members Management
          </h1>
        </div>
        <Link
          href="/admin/members/create"
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
          ➕ Add Member
        </Link>
      </div>

      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Members", value: members.length, color: "#123c2a", bg: "#e8f5ef" },
            { label: "Active", value: activeCount, color: "#059669", bg: "#d1fae5" },
            { label: "Inactive", value: inactiveCount, color: "#dc2626", bg: "#fee2e2" },
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
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e8f5ef", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#123c2a" }}>All Members</h2>
            <span style={{ fontSize: "0.8125rem", color: "#6b9e7e" }}>
              ⚠️ Private data — visible to admins only
            </span>
          </div>

          {members.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#6b9e7e" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>👥</div>
              <div style={{ fontWeight: 600 }}>No members yet</div>
              <Link href="/admin/members/create" style={{ color: "#123c2a", fontWeight: 700, marginTop: "0.5rem", display: "inline-block" }}>
                + Add first member
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fdf9", borderBottom: "1px solid #e8f5ef" }}>
                    {["Member", "Contact", "Education", "Skills", "Joined", "Status", "Actions"].map((h) => (
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
                  {members.map((member, i) => {
                    const initials = `${member.firstName[0] || ""}${member.lastName[0] || ""}`.toUpperCase();
                    return (
                      <tr
                        key={member.id}
                        style={{
                          borderBottom: i < members.length - 1 ? "1px solid #f0faf5" : "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fdf9")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.firstName}
                                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid #c8e6d5" }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: "50%",
                                  background: "linear-gradient(135deg, #123c2a, #1a5c3f)",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 700,
                                  fontSize: "0.75rem",
                                }}
                              >
                                {initials}
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight: 700, color: "#1a1a1a", fontSize: "0.9rem" }}>
                                {member.firstName} {member.lastName}
                              </div>
                              {member.address && (
                                <div style={{ fontSize: "0.75rem", color: "#6b9e7e", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {member.address}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          {member.email && <div style={{ fontSize: "0.8rem", color: "#374151" }}>{member.email}</div>}
                          {member.phone && <div style={{ fontSize: "0.8rem", color: "#6b9e7e" }}>{member.phone}</div>}
                          {!member.email && !member.phone && <span style={{ color: "#ccc" }}>—</span>}
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <div style={{ fontSize: "0.8rem", color: "#374151", fontWeight: 500 }}>{member.educationLevel || "—"}</div>
                          {member.institution && (
                            <div style={{ fontSize: "0.75rem", color: "#6b9e7e" }}>{member.institution}</div>
                          )}
                        </td>
                        <td style={{ padding: "0.875rem 1rem", maxWidth: 160 }}>
                          {member.skills ? (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                              {member.skills
                                .split(",")
                                .slice(0, 3)
                                .map((s) => (
                                  <span
                                    key={s}
                                    style={{
                                      padding: "0.15rem 0.5rem",
                                      background: "#e8f5ef",
                                      color: "#123c2a",
                                      borderRadius: "999px",
                                      fontSize: "0.7rem",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {s.trim()}
                                  </span>
                                ))}
                              {member.skills.split(",").length > 3 && (
                                <span style={{ fontSize: "0.7rem", color: "#6b9e7e" }}>
                                  +{member.skills.split(",").length - 3}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <span style={{ fontSize: "0.8rem", color: "#6b9e7e", whiteSpace: "nowrap" }}>{member.joinedAt}</span>
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <ToggleMemberActive id={member.id} isActive={member.isActive} />
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <Link
                              href={`/admin/members/${member.id}/edit`}
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
    </div>
  );
}
