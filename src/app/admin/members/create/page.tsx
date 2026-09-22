import Link from "next/link";
import MemberForm from "@/components/admin/MemberForm";

export default function AdminMemberCreatePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0faf5", fontFamily: "system-ui, sans-serif" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #123c2a 0%, #1a5c3f 100%)",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Link href="/admin/members" style={{ color: "#a7d7b8", textDecoration: "none", fontSize: "0.875rem" }}>
          ← Members
        </Link>
        <span style={{ color: "#a7d7b8" }}>|</span>
        <h1 style={{ margin: 0, color: "white", fontSize: "1.375rem", fontWeight: 700 }}>
          ➕ Add New Member
        </h1>
      </div>

      <div style={{ padding: "2rem", maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            border: "1px solid #c8e6d5",
            boxShadow: "0 2px 12px rgba(18,60,42,0.06)",
          }}
        >
          <MemberForm isEditing={false} />
        </div>
      </div>
    </div>
  );
}
