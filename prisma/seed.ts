import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { MOCK_EVENTS, MOCK_TEAM, MOCK_ANNOUNCEMENTS } from "../src/lib/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with initial community data & admin accounts...");

  // 1. Seed Admin Accounts (Admin and Manager roles)
  const adminPasswordHash = await bcrypt.hash("Admin@1234", 10);
  const managerPasswordHash = await bcrypt.hash("Manager@1234", 10);

  await prisma.admin.upsert({
    where: { email: "admin@elevo.org" },
    update: {
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
    create: {
      email: "admin@elevo.org",
      name: "Main System Admin",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });
  console.log("✓ Seeded Admin account: admin@elevo.org (Role: ADMIN)");

  await prisma.admin.upsert({
    where: { email: "manager@elevo.org" },
    update: {
      passwordHash: managerPasswordHash,
      role: "MANAGER",
    },
    create: {
      email: "manager@elevo.org",
      name: "Community Manager",
      passwordHash: managerPasswordHash,
      role: "MANAGER",
    },
  });
  console.log("✓ Seeded Manager account: manager@elevo.org (Role: MANAGER)");

  // 2. Seed Events
  for (const event of MOCK_EVENTS) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        title: event.title,
        date: new Date(event.date),
        time: event.time,
        location: event.location,
        description: event.description,
        category: event.category,
        upcoming: event.upcoming,
        featured: event.featured ?? false,
        image: event.image,
      },
    });
  }
  console.log(`✓ Seeded ${MOCK_EVENTS.length} events`);

  // 3. Seed Team Members
  for (const team of MOCK_TEAM) {
    await prisma.teamMember.upsert({
      where: { id: team.id },
      update: {},
      create: {
        id: team.id,
        name: team.name,
        role: team.role,
        department: team.department,
        bio: team.bio,
        email: team.email,
        phone: team.phone,
        initials: team.initials,
        badge: team.badge,
      },
    });
  }
  console.log(`✓ Seeded ${MOCK_TEAM.length} team members`);

  // 4. Seed Announcements
  for (const announcement of MOCK_ANNOUNCEMENTS) {
    await prisma.announcement.upsert({
      where: { id: announcement.id },
      update: {},
      create: {
        id: announcement.id,
        title: announcement.title,
        date: new Date(announcement.date),
        summary: announcement.summary,
        content: announcement.content,
        category: announcement.category,
        important: announcement.important ?? false,
        badge: announcement.badge,
      },
    });
  }
  console.log(`✓ Seeded ${MOCK_ANNOUNCEMENTS.length} announcements`);

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
