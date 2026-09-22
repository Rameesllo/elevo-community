import { notFound } from "next/navigation";
import Link from "next/link";
import { getMemberByIdAdminService } from "@/lib/services/members.service";
import MemberForm from "@/components/admin/MemberForm";
import DeleteMemberButton from "@/components/admin/DeleteMemberButton";

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
    <div style={{ minHeight: "100vh", background: "#f0faf5", fontFamily: "system-ui, sans-serif" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #123c2a 0%, #1a5c3f 100%)",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin/members" style={{ color: "#a7d7b8", textDecoration: "none", fontSize: "0.875rem" }}>
            ← Members
          </Link>
          <span style={{ color: "#a7d7b8" }}>|</span>
          <h1 style={{ margin: 0, color: "white", fontSize: "1.375rem", fontWeight: 700 }}>
            ✏️ Edit Member
          </h1>
        </div>
        <DeleteMemberButton id={member.id} name={`${member.firstName} ${member.lastName}`} />
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
          <MemberForm initialData={member} isEditing={true} />
        </div>
      </div>
    </div>
  );
}
