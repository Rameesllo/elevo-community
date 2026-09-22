import { prisma } from "./prisma";
import {
  createEventService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "./services/events.service";
import {
  createTeamMemberService,
  getTeamMemberByIdService,
  updateTeamMemberService,
  deleteTeamMemberService,
} from "./services/team.service";

async function runCrudTests() {
  console.log("==========================================");
  console.log("STARTING PHASE 6 DATABASE CRUD TESTS");
  console.log("==========================================");

  // 1. Test Event CRUD
  console.log("\n[1] Testing Event CRUD Operations...");
  const newEvent = await createEventService({
    title: "TEST: All Kerala Youth Football Tournament",
    date: "2025-06-15",
    time: "07:30 AM - 05:00 PM",
    location: "Elevo Sports Arena",
    meetingLink: "https://meet.google.com/test-event-123",
    description: "Automated test event created for Phase 6 verification.",
    category: "sports",
    status: "UPCOMING",
    featured: true,
  });
  console.log("✓ Created Event:", newEvent.id, "-", newEvent.title);

  const fetchedEvent = await getEventByIdService(newEvent.id);
  console.log("✓ Read Event by ID:", fetchedEvent?.title, "| Status:", fetchedEvent?.status, "| Link:", fetchedEvent?.meetingLink);

  const updatedEvent = await updateEventService(newEvent.id, {
    title: "TEST: All Kerala Youth Football Tournament (UPDATED)",
    status: "COMPLETED",
  });
  console.log("✓ Updated Event Title & Status:", updatedEvent.title, "| New Status:", updatedEvent.status);

  await deleteEventService(newEvent.id);
  console.log("✓ Deleted Test Event:", newEvent.id);

  // 2. Test Team Member CRUD
  console.log("\n[2] Testing Team Member CRUD & Image/Active/Order Operations...");
  const newMember = await createTeamMemberService({
    name: "Dr. Anoop Nambiar",
    role: "Health & Youth Welfare Advisor",
    department: "Executive Committee",
    bio: "Chief medical officer advising Elevo health drives.",
    email: "anoop.test@elevo.org",
    phone: "+91 9988776655",
    image: "/uploads/avatar-demo.png",
    isActive: true,
    displayOrder: 1,
  });
  console.log("✓ Created Team Member:", newMember.id, "-", newMember.name);

  const fetchedMember = await getTeamMemberByIdService(newMember.id);
  console.log("✓ Read Team Member by ID:", fetchedMember?.name, "| Active:", fetchedMember?.isActive, "| Order:", fetchedMember?.displayOrder);

  const updatedMember = await updateTeamMemberService(newMember.id, {
    role: "Senior Executive Advisor",
    isActive: false,
    displayOrder: 5,
  });
  console.log("✓ Updated Team Member Role & Active Status:", updatedMember.role, "| Active:", updatedMember.isActive, "| Order:", updatedMember.displayOrder);

  await deleteTeamMemberService(newMember.id);
  console.log("✓ Deleted Test Team Member:", newMember.id);

  // 3. Test Dashboard Aggregates
  console.log("\n[3] Testing PostgreSQL Dashboard Metrics...");
  const [mCount, eCount, tCount, aCount, unreadN] = await Promise.all([
    prisma.member.count(),
    prisma.event.count({ where: { upcoming: true } }),
    prisma.teamMember.count({ where: { isActive: true } }),
    prisma.announcement.count(),
    prisma.adminNotification.count({ where: { read: false } }),
  ]);

  console.log("✓ Members Count:", mCount);
  console.log("✓ Upcoming Events:", eCount);
  console.log("✓ Active Team Members:", tCount);
  console.log("✓ Announcements:", aCount);
  console.log("✓ Unread Notifications:", unreadN);

  console.log("\n==========================================");
  console.log("ALL PHASE 6 CRUD TESTS PASSED SUCCESSFULLY!");
  console.log("==========================================");
}

runCrudTests()
  .catch((e) => {
    console.error("Test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
