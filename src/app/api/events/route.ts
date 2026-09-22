import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getEventsService, createEventService } from "@/lib/services/events.service";
import { createEventSchema, eventQuerySchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") || undefined;
    const upcoming = searchParams.get("upcoming");
    const featured = searchParams.get("featured");

    const validatedQuery = eventQuerySchema.parse({ category, status, upcoming, featured });
    const events = await getEventsService(validatedQuery);
    
    return apiSuccess(events);
  } catch (error: any) {
    return apiError("Failed to fetch events", 500, error?.message || error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createEventSchema.parse(body);
    const newEvent = await createEventService(validatedData as any);
    
    return apiSuccess(newEvent, 201);
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return apiError("Validation failed", 400, error.errors);
    }
    return apiError("Failed to create event", 500, error?.message || error);
  }
}
