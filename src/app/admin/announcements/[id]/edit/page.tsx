import { notFound } from "next/navigation";
import { getAnnouncementByIdService } from "@/lib/services/announcements.service";
import AnnouncementForm from "@/components/admin/AnnouncementForm";
import DeleteAnnouncementButton from "@/components/admin/DeleteAnnouncementButton";
import { Megaphone } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminAnnouncementEditPage({ params }: PageProps) {
  const { id } = await params;
  const ann = await getAnnouncementByIdService(id);

  if (!ann) {
    notFound();
  }

  const a = ann as any;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-forest flex items-center gap-2.5">
            <Megaphone className="w-5 h-5" />
            Edit Announcement
          </h1>
          <p className="text-xs text-dark-text/60 mt-1 line-clamp-1">{a.title}</p>
        </div>
        <DeleteAnnouncementButton id={a.id} title={a.title} />
      </div>

      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm p-6">
        <AnnouncementForm
          initialData={{
            id: a.id,
            title: a.title,
            content: a.content,
            summary: a.summary,
            category: a.category,
            badge: a.badge || "",
            important: a.important,
            published: a.published ?? false,
            date: a.date ? new Date(a.date).toISOString().split("T")[0] : undefined,
          }}
          isEditing={true}
        />
      </div>
    </div>
  );
}
