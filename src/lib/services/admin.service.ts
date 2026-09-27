import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function getAdminsService() {
  return prisma.admin.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createAdminService(data: { email: string; name: string; passwordHash: string; role: "ADMIN" | "MANAGER" }) {
  return prisma.admin.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash,
      role: data.role,
      isActive: true,
    },
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });
}

export async function updateAdminService(
  id: string,
  data: { role?: "ADMIN" | "MANAGER"; isActive?: boolean }
) {
  return prisma.admin.update({
    where: { id },
    data,
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });
}

export async function getAdminByIdService(id: string) {
  return prisma.admin.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });
}

export async function deleteAdminService(id: string) {
  return prisma.admin.delete({ where: { id } });
}
