import { prisma } from "@/lib/prisma";

export interface MemberPublicStats {
  totalMembersCount: number;
  activeStatus: string;
}

export interface MemberAdminView {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  educationLevel?: string | null;
  institution?: string | null;
  skills?: string | null;
  image?: string | null;
  isActive: boolean;
  joinedAt: string;
  createdAt: string;
}

// Public stats only - never expose private contact info
export async function getPublicMemberStatsService(): Promise<MemberPublicStats> {
  try {
    const count = await prisma.member.count({ where: { isActive: true } });
    return {
      totalMembersCount: count > 0 ? count : 500,
      activeStatus: "Active Community",
    };
  } catch {
    return { totalMembersCount: 500, activeStatus: "Active Community" };
  }
}

// Admin only - full data
export async function getAllMembersAdminService(filters?: {
  isActive?: boolean;
  search?: string;
}): Promise<MemberAdminView[]> {
  try {
    const where: any = {};
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;
    if (filters?.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: "insensitive" } },
        { lastName: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const members = await prisma.member.findMany({
      where,
      orderBy: { joinedAt: "desc" },
    });

    return members.map((m) => ({
      id: m.id,
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      phone: m.phone,
      address: m.address,
      educationLevel: (m as any).educationLevel,
      institution: (m as any).institution,
      skills: (m as any).skills,
      image: (m as any).image,
      isActive: (m as any).isActive ?? true,
      joinedAt: m.joinedAt.toISOString().split("T")[0],
      createdAt: m.createdAt.toISOString().split("T")[0],
    }));
  } catch (err) {
    console.warn("getMembersAdmin DB error:", (err as Error).message);
    return [];
  }
}

export async function getMemberByIdAdminService(id: string): Promise<MemberAdminView | null> {
  try {
    const m = await prisma.member.findUnique({ where: { id } });
    if (!m) return null;
    return {
      id: m.id,
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      phone: m.phone,
      address: m.address,
      educationLevel: (m as any).educationLevel,
      institution: (m as any).institution,
      skills: (m as any).skills,
      image: (m as any).image,
      isActive: (m as any).isActive ?? true,
      joinedAt: m.joinedAt.toISOString().split("T")[0],
      createdAt: m.createdAt.toISOString().split("T")[0],
    };
  } catch {
    return null;
  }
}

export async function registerMemberService(data: {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  educationLevel?: string;
  institution?: string;
  skills?: string;
  image?: string;
}) {
  const member = await prisma.member.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || null,
      phone: data.phone || null,
      address: data.address || null,
      educationLevel: data.educationLevel || null,
      institution: data.institution || null,
      skills: data.skills || null,
      image: data.image || null,
      isActive: true,
    } as any,
  });
  return { id: member.id, firstName: member.firstName, joinedAt: member.joinedAt, message: "Registration successful" };
}

export async function updateMemberService(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    educationLevel?: string;
    institution?: string;
    skills?: string;
    image?: string;
    isActive?: boolean;
  }
) {
  const payload: any = {};
  if (data.firstName !== undefined) payload.firstName = data.firstName;
  if (data.lastName !== undefined) payload.lastName = data.lastName;
  if (data.email !== undefined) payload.email = data.email || null;
  if (data.phone !== undefined) payload.phone = data.phone || null;
  if (data.address !== undefined) payload.address = data.address || null;
  if (data.educationLevel !== undefined) payload.educationLevel = data.educationLevel || null;
  if (data.institution !== undefined) payload.institution = data.institution || null;
  if (data.skills !== undefined) payload.skills = data.skills || null;
  if (data.image !== undefined) payload.image = data.image || null;
  if (data.isActive !== undefined) payload.isActive = data.isActive;

  return prisma.member.update({ where: { id }, data: payload });
}

export async function deleteMemberService(id: string) {
  return prisma.member.delete({ where: { id } });
}
