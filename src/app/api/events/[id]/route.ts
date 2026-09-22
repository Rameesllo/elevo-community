import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import {
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "@/lib/services/events.service";
import { updateEventSchema } from "@/lib/validations";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return apiError("Event ID is required", 400);

    const event = await getEventByIdService(id);
    if (!event) return apiError("Event not found", 404);

    return apiSuccess(event);
  } catch (error: any) {
    return apiError("Failed to fetch event", 500, error?.message || error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return apiError("Event ID is required", 400);

    const body = await request.json();
    const validatedData = updateEventSchema.parse(body);

    const updatedEvent = await updateEventService(id, validatedData as any);
    return apiSuccess(updatedEvent);
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return apiError("Validation error", 400, error.errors);
    }
    return apiError("Failed to update event", 500, error?.message || error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return apiError("Event ID is required", 400);

    await deleteEventService(id);
    return apiSuccess({ message: "Event deleted successfully" });
  } catch (error: any) {
    return apiError("Failed to delete event", 500, error?.message || error);
  }
}
