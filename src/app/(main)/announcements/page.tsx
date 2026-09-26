import { getAnnouncementsService } from "@/lib/services/announcements.service";
import AnnouncementsClient from "./AnnouncementsClient";

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncementsService();
  return <AnnouncementsClient announcements={announcements} />;
}
