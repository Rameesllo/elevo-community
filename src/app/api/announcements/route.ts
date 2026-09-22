import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getAllAnnouncementsAdminService, createAnnouncementService } from "@/lib/services/announcements.service";

export async function GET() {
  try {
    const announcements = await getAllAnnouncementsAdminService();
    return apiSuccess(announcements);
  } catch (error: any) {
    return apiError("Failed to fetch announcements", 500, error?.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.content) {
      return apiError("Title and content are required", 400);
    }
    if (!body.summary) {
      body.summary = (body.content as string).slice(0, 120) + "...";
    }
    const result = await createAnnouncementService(body);
    return apiSuccess(result, 201);
  } catch (error: any) {
    return apiError("Failed to create announcement", 500, error?.message);
  }
}
