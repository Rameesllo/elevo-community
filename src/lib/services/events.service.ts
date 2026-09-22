import { prisma } from "@/lib/prisma";
import { MOCK_EVENTS } from "@/lib/mockData";
import { Event } from "@/types";

export async function getEventsService(filters?: {
  category?: string;
  upcoming?: boolean;
  featured?: boolean;
  status?: string;
}): Promise<Event[]> {
  try {
    const whereClause: any = {};
    if (filters?.category && filters.category !== "All") {
      whereClause.category = filters.category;
    }
    if (filters?.upcoming !== undefined) {
      whereClause.upcoming = filters.upcoming;
    }
    if (filters?.featured !== undefined) {
      whereClause.featured = filters.featured;
    }
    if (filters?.status && filters.status !== "All") {
      whereClause.status = filters.status;
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: { date: "desc" },
    });

    if (events.length > 0) {
      return events.map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date.toISOString().split("T")[0],
        time: e.time || undefined,
        location: e.location,
        meetingLink: (e as any).meetingLink || undefined,
        description: e.description,
        category: e.category as any,
        status: ((e as any).status || (e.upcoming ? "UPCOMING" : "COMPLETED")) as any,
        upcoming: e.upcoming,
        featured: e.featured,
        image: e.image || undefined,
      }));
    }
  } catch (err) {
    console.warn("Database connection unavailable for events, falling back to initial data:", (err as Error).message);
  }

  // Fallback to initial mock data filtered
  return MOCK_EVENTS.filter((e) => {
    if (filters?.category && filters.category !== "All" && e.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    if (filters?.upcoming !== undefined && e.upcoming !== filters.upcoming) {
      return false;
    }
    if (filters?.featured !== undefined && e.featured !== filters.featured) {
      return false;
    }
    return true;
  });
}

export async function getEventByIdService(id: string): Promise<Event | null> {
  try {
    const event = await prisma.event.findUnique({ where: { id } });
    if (event) {
      return {
        id: event.id,
        title: event.title,
        date: event.date.toISOString().split("T")[0],
        time: event.time || undefined,
        location: event.location,
        meetingLink: (event as any).meetingLink || undefined,
        description: event.description,
        category: event.category as any,
        status: ((event as any).status || (event.upcoming ? "UPCOMING" : "COMPLETED")) as any,
        upcoming: event.upcoming,
        featured: event.featured,
        image: event.image || undefined,
      };
    }
  } catch (err) {
    console.warn("Database error in getEventById, falling back to mock:", (err as Error).message);
  }

  return MOCK_EVENTS.find((e) => e.id === id) || null;
}

export async function createEventService(data: {
  title: string;
  date: string;
  time?: string;
  location: string;
  meetingLink?: string;
  description: string;
  category?: string;
  status?: string;
  upcoming?: boolean;
  featured?: boolean;
  image?: string;
}) {
  try {
    const statusVal = data.status || (data.upcoming !== false ? "UPCOMING" : "COMPLETED");
    const isUpcoming = statusVal === "UPCOMING";

    const newEvent = await prisma.event.create({
      data: {
        title: data.title,
        date: new Date(data.date),
        time: data.time || null,
        location: data.location,
        meetingLink: data.meetingLink || null,
        description: data.description,
        category: data.category || "other",
        status: statusVal,
        upcoming: isUpcoming,
        featured: data.featured ?? false,
        image: data.image || null,
      } as any,
    });
    return newEvent;
  } catch (err) {
    console.error("Failed to create event in DB:", err);
    throw new Error("Could not create event");
  }
}

export async function updateEventService(
  id: string,
  data: {
    title?: string;
    date?: string;
    time?: string;
    location?: string;
    meetingLink?: string;
    description?: string;
    category?: string;
    status?: string;
    upcoming?: boolean;
    featured?: boolean;
    image?: string;
  }
) {
  try {
    const updatePayload: any = {};
    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.date !== undefined) updatePayload.date = new Date(data.date);
    if (data.time !== undefined) updatePayload.time = data.time || null;
    if (data.location !== undefined) updatePayload.location = data.location;
    if (data.meetingLink !== undefined) updatePayload.meetingLink = data.meetingLink || null;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.category !== undefined) updatePayload.category = data.category;
    if (data.status !== undefined) {
      updatePayload.status = data.status;
      updatePayload.upcoming = data.status === "UPCOMING";
    } else if (data.upcoming !== undefined) {
      updatePayload.upcoming = data.upcoming;
    }
    if (data.featured !== undefined) updatePayload.featured = data.featured;
    if (data.image !== undefined) updatePayload.image = data.image || null;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updatePayload,
    });
    return updatedEvent;
  } catch (err) {
    console.error("Failed to update event in DB:", err);
    throw new Error("Could not update event");
  }
}

export async function deleteEventService(id: string) {
  try {
    return await prisma.event.delete({
      where: { id },
    });
  } catch (err) {
    console.error("Failed to delete event from DB:", err);
    throw new Error("Could not delete event");
  }
}
