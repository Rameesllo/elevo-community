import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Elevo Community — Events",
  description: "Explore upcoming and past events in the Elevo community.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });

  return <EventsClient initialEvents={events} />;
}
