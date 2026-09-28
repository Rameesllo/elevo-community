import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Elevo Community — Conducted Events",
  description: "Archive of conducted community events — posters and detailed highlights from Elevo.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  // Vision: archive of conducted events only (poster + details)
  const events = await prisma.event.findMany({
    where: {
      OR: [{ status: "COMPLETED" }, { upcoming: false }],
    },
    orderBy: { date: "desc" },
  });

  return <EventsClient initialEvents={events} />;
}
