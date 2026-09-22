import { prisma } from "@/lib/prisma";
import { MOCK_ANNOUNCEMENTS } from "@/lib/mockData";
import { Announcement } from "@/types";

// Public view — only published announcements
export async function getAnnouncementsService(filters?: {
  category?: string;
  important?: boolean;
}): Promise<Announcement[]> {
  try {
    const where: any = { published: true };
    if (filters?.category && filters.category !== "All") where.category = filters.category;
    if (filters?.important !== undefined) where.important = filters.important;

    const rows = await prisma.announcement.findMany({
      where,
      orderBy: { date: "desc" },
    });

    if (rows.length > 0) {
      return rows.map((a) => ({
        id: a.id,
        title: a.title,
        date: a.date.toISOString().split("T")[0],
        summary: a.summary,
        content: a.content,
        category: a.category as any,
        important: a.important,
        badge: a.badge || undefined,
      }));
    }
  } catch (err) {
    console.warn("getAnnouncements fallback:", (err as Error).message);
  }

  // Fallback to mock data (all treated as published for public site)
  return MOCK_ANNOUNCEMENTS.filter((a) => {
    if (filters?.category && filters.category !== "All" && a.category !== filters.category) return false;
    if (filters?.important !== undefined && a.important !== filters.important) return false;
    return true;
  });
}

// Admin view — all announcements regardless of published status
export async function getAllAnnouncementsAdminService() {
  try {
    return await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("getAllAnnouncementsAdmin error:", (err as Error).message);
    return [];
  }
}

export async function getAnnouncementByIdService(id: string) {
  try {
    return await prisma.announcement.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function createAnnouncementService(data: {
  title: string;
  content: string;
  summary: string;
  category: string;
  badge?: string;
  important?: boolean;
  published?: boolean;
  date?: string;
}) {
  const now = new Date();
  const isPublished = data.published ?? false;
  return prisma.announcement.create({
    data: {
      title: data.title,
      content: data.content,
      summary: data.summary,
      category: data.category,
      badge: data.badge || null,
      important: data.important ?? false,
      published: isPublished,
      publishedAt: isPublished ? now : null,
      date: data.date ? new Date(data.date) : now,
    } as any,
  });
}

export async function updateAnnouncementService(
  id: string,
  data: {
    title?: string;
    content?: string;
    summary?: string;
    category?: string;
    badge?: string;
    important?: boolean;
    published?: boolean;
    date?: string;
  }
) {
  const payload: any = {};
  if (data.title !== undefined) payload.title = data.title;
  if (data.content !== undefined) payload.content = data.content;
  if (data.summary !== undefined) payload.summary = data.summary;
  if (data.category !== undefined) payload.category = data.category;
  if (data.badge !== undefined) payload.badge = data.badge || null;
  if (data.important !== undefined) payload.important = data.important;
  if (data.date !== undefined) payload.date = new Date(data.date);
  if (data.published !== undefined) {
    payload.published = data.published;
    if (data.published) {
      payload.publishedAt = new Date();
    } else {
      payload.publishedAt = null;
    }
  }

  return prisma.announcement.update({ where: { id }, data: payload });
}

export async function deleteAnnouncementService(id: string) {
  return prisma.announcement.delete({ where: { id } });
}
