import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Elevo Community — Team",
  description: "Meet the dedicated volunteers, organizers, and committee members.",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return <TeamClient initialMembers={teamMembers} />;
}
