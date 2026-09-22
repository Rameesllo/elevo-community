import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import {
  getAnnouncementByIdService,
  updateAnnouncementService,
  deleteAnnouncementService,
} from "@/lib/services/announcements.service";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const announcement = await getAnnouncementByIdService(id);
    if (!announcement) return apiError("Announcement not found", 404);
    return apiSuccess(announcement);
  } catch (error: any) {
    return apiError("Failed to fetch announcement", 500, error?.message);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateAnnouncementService(id, body);
    return apiSuccess(updated);
  } catch (error: any) {
    return apiError("Failed to update announcement", 500, error?.message);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteAnnouncementService(id);
    return apiSuccess({ message: "Announcement deleted successfully" });
  } catch (error: any) {
    return apiError("Failed to delete announcement", 500, error?.message);
  }
}
