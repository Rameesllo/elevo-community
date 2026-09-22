import { prisma } from "@/lib/prisma";
import { MOCK_TEAM } from "@/lib/mockData";
import { TeamMember } from "@/types";

export async function getTeamMembersService(filters?: {
  department?: string;
  isActive?: boolean;
}): Promise<TeamMember[]> {
  try {
    const whereClause: any = {};
    if (filters?.department && filters.department !== "All") {
      whereClause.department = filters.department;
    }
    if (filters?.isActive !== undefined) {
      whereClause.isActive = filters.isActive;
    }

    const members = await prisma.teamMember.findMany({
      where: whereClause,
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    if (members.length > 0) {
      return members.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        department: m.department as any,
        bio: m.bio,
        email: m.email || undefined,
        phone: m.phone || undefined,
        initials: m.initials,
        badge: m.badge || undefined,
        image: (m as any).image || undefined,
        isActive: (m as any).isActive ?? true,
        displayOrder: (m as any).displayOrder ?? 0,
      }));
    }
  } catch (err) {
    console.warn("Database unavailable for getTeamMembers, using fallback data:", (err as Error).message);
  }

  return MOCK_TEAM.filter((m) => {
    if (filters?.department && filters.department !== "All" && m.department.toLowerCase() !== filters.department.toLowerCase()) {
      return false;
    }
    if (filters?.isActive !== undefined && (m.isActive ?? true) !== filters.isActive) {
      return false;
    }
    return true;
  });
}

export async function getTeamMemberByIdService(id: string): Promise<TeamMember | null> {
  try {
    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (member) {
      return {
        id: member.id,
        name: member.name,
        role: member.role,
        department: member.department as any,
        bio: member.bio,
        email: member.email || undefined,
        phone: member.phone || undefined,
        initials: member.initials,
        badge: member.badge || undefined,
        image: (member as any).image || undefined,
        isActive: (member as any).isActive ?? true,
        displayOrder: (member as any).displayOrder ?? 0,
      };
    }
  } catch (err) {
    console.warn("Database error in getTeamMemberById, falling back to mock:", (err as Error).message);
  }

  return MOCK_TEAM.find((m) => m.id === id) || null;
}

export async function createTeamMemberService(data: {
  name: string;
  role: string;
  department: string;
  bio: string;
  email?: string;
  phone?: string;
  initials?: string;
  badge?: string;
  image?: string;
  isActive?: boolean;
  displayOrder?: number;
}) {
  try {
    const initialsVal =
      data.initials ||
      data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 3);

    const newMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        department: data.department,
        bio: data.bio,
        email: data.email || null,
        phone: data.phone || null,
        initials: initialsVal,
        badge: data.badge || null,
        image: data.image || null,
        isActive: data.isActive ?? true,
        displayOrder: data.displayOrder ?? 0,
      } as any,
    });
    return newMember;
  } catch (err) {
    console.error("Failed to create team member in DB:", err);
    throw new Error("Could not create team member");
  }
}

export async function updateTeamMemberService(
  id: string,
  data: {
    name?: string;
    role?: string;
    department?: string;
    bio?: string;
    email?: string;
    phone?: string;
    initials?: string;
    badge?: string;
    image?: string;
    isActive?: boolean;
    displayOrder?: number;
  }
) {
  try {
    const updatePayload: any = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.role !== undefined) updatePayload.role = data.role;
    if (data.department !== undefined) updatePayload.department = data.department;
    if (data.bio !== undefined) updatePayload.bio = data.bio;
    if (data.email !== undefined) updatePayload.email = data.email || null;
    if (data.phone !== undefined) updatePayload.phone = data.phone || null;
    if (data.initials !== undefined) updatePayload.initials = data.initials;
    if (data.badge !== undefined) updatePayload.badge = data.badge || null;
    if (data.image !== undefined) updatePayload.image = data.image || null;
    if (data.isActive !== undefined) updatePayload.isActive = data.isActive;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: updatePayload,
    });
    return updatedMember;
  } catch (err) {
    console.error("Failed to update team member in DB:", err);
    throw new Error("Could not update team member");
  }
}

export async function deleteTeamMemberService(id: string) {
  try {
    return await prisma.teamMember.delete({
      where: { id },
    });
  } catch (err) {
    console.error("Failed to delete team member from DB:", err);
    throw new Error("Could not delete team member");
  }
}
