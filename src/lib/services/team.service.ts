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

    return members.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      department: m.department as any,
      bio: (m as any).bio || undefined,
      email: m.email || undefined,
      phone: m.phone || undefined,
      initials: m.initials,
      badge: m.badge || undefined,
      image: (m as any).image || undefined,
      linkedin: (m as any).linkedin || undefined,
      instagram: (m as any).instagram || undefined,
      isActive: (m as any).isActive ?? true,
      displayOrder: (m as any).displayOrder ?? 0,
    }));
  } catch (err) {
    console.error("Database error in getTeamMembers:", (err as Error).message);
    return [];
  }
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
        bio: (member as any).bio || undefined,
        email: member.email || undefined,
        phone: member.phone || undefined,
        initials: member.initials,
        badge: member.badge || undefined,
        image: (member as any).image || undefined,
        linkedin: (member as any).linkedin || undefined,
        instagram: (member as any).instagram || undefined,
        isActive: (member as any).isActive ?? true,
        displayOrder: (member as any).displayOrder ?? 0,
      };
    }
    return null;
  } catch (err) {
    console.error("Database error in getTeamMemberById:", (err as Error).message);
    return null;
  }
}

export async function createTeamMemberService(data: {
  name: string;
  role: string;
  department: string;
  bio?: string;
  email?: string;
  phone?: string;
  initials?: string;
  badge?: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
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
        bio: data.bio || null,
        email: data.email || null,
        phone: data.phone || null,
        initials: initialsVal,
        badge: data.badge || null,
        image: data.image || null,
        linkedin: data.linkedin || null,
        instagram: data.instagram || null,
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
    linkedin?: string;
    instagram?: string;
    isActive?: boolean;
    displayOrder?: number;
  }
) {
  try {
    const updatePayload: any = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.role !== undefined) updatePayload.role = data.role;
    if (data.department !== undefined) updatePayload.department = data.department;
    if (data.bio !== undefined) updatePayload.bio = data.bio || null;
    if (data.email !== undefined) updatePayload.email = data.email || null;
    if (data.phone !== undefined) updatePayload.phone = data.phone || null;
    if (data.initials !== undefined) updatePayload.initials = data.initials;
    if (data.badge !== undefined) updatePayload.badge = data.badge || null;
    if (data.image !== undefined) updatePayload.image = data.image || null;
    if (data.linkedin !== undefined) updatePayload.linkedin = data.linkedin || null;
    if (data.instagram !== undefined) updatePayload.instagram = data.instagram || null;
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
