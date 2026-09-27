import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { updateAdminService, deleteAdminService, getAdminsService } from "@/lib/services/admin.service";
import { getAuthSession } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAuthSession();
    if (!session || session.role !== "ADMIN") {
      return apiError("Unauthorized", 403);
    }
    const { id } = await params;
    const body = await request.json();
    
    // Users cannot change their own role
    if (session.id === id && body.role && body.role !== session.role) {
      return apiError("You cannot change your own role", 403);
    }

    const updated = await updateAdminService(id, body);
    return apiSuccess(updated);
  } catch (error: any) {
    return apiError("Failed to update admin", 500, error?.message);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAuthSession();
    if (!session || session.role !== "ADMIN") {
      return apiError("Unauthorized", 403);
    }
    const { id } = await params;
    
    // Prevent removing the final ADMIN account
    const admins = await getAdminsService();
    const adminAccounts = admins.filter(a => a.role === "ADMIN");
    if (adminAccounts.length <= 1 && adminAccounts.some(a => a.id === id)) {
      return apiError("Cannot delete the final ADMIN account", 403);
    }

    await deleteAdminService(id);
    return apiSuccess({ message: "Admin deleted successfully" });
  } catch (error: any) {
    return apiError("Failed to delete admin", 500, error?.message);
  }
}
