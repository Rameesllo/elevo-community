/**
 * Phase 7 CRUD Test Script
 * Tests: Members CRUD + activate/deactivate
 *        Announcements CRUD + publish/unpublish
 *        Public announcement filter (published-only)
 *        Private member data isolation
 */

import { prisma } from "./prisma";
import {
  registerMemberService,
  getMemberByIdAdminService,
  getAllMembersAdminService,
  updateMemberService,
  deleteMemberService,
  getPublicMemberStatsService,
} from "./services/members.service";
import {
  createAnnouncementService,
  getAnnouncementByIdService,
  getAllAnnouncementsAdminService,
  getAnnouncementsService,
  updateAnnouncementService,
  deleteAnnouncementService,
} from "./services/announcements.service";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${label}`);
    failed++;
  }
}

async function runPhase7Tests() {
  console.log("==========================================");
  console.log(" PHASE 7 CRUD TESTS — Members & Announcements");
  console.log("==========================================");

  // ─────────────────────────────────────────────
  // 1. MEMBER CRUD
  // ─────────────────────────────────────────────
  console.log("\n[1] Member CRUD Operations...");

  const newMember = await registerMemberService({
    firstName: "TEST",
    lastName: "Phase7Member",
    email: "phase7test@elevo.org",
    phone: "+91 9988001122",
    address: "Puliyamparambu, Kozhikode",
    educationLevel: "Graduate",
    institution: "Government Arts College",
    skills: "Testing, TypeScript, Prisma",
    joinedAt: "2024-01-15",
  });
  assert(!!newMember.id, "Created member with custom joinedAt");

  const fetched = await getMemberByIdAdminService(newMember.id);
  assert(fetched?.firstName === "TEST", "Read member by ID");
  assert(fetched?.educationLevel === "Graduate", "Education level persisted");
  assert(fetched?.institution === "Government Arts College", "Institution persisted");
  assert(fetched?.skills === "Testing, TypeScript, Prisma", "Skills persisted");
  assert(fetched?.joinedAt === "2024-01-15", "Custom joinedAt persisted");
  assert(fetched?.isActive === true, "Defaults to active");

  // Private contact info should be present for admin view
  assert(fetched?.email === "phase7test@elevo.org", "Admin view includes email");
  assert(fetched?.phone === "+91 9988001122", "Admin view includes phone");

  // ─────────────────────────────────────────────
  // 2. MEMBER ACTIVATE / DEACTIVATE
  // ─────────────────────────────────────────────
  console.log("\n[2] Member Activate / Deactivate...");

  await updateMemberService(newMember.id, { isActive: false });
  const deactivated = await getMemberByIdAdminService(newMember.id);
  assert(deactivated?.isActive === false, "Deactivated member");

  await updateMemberService(newMember.id, { isActive: true });
  const reactivated = await getMemberByIdAdminService(newMember.id);
  assert(reactivated?.isActive === true, "Reactivated member");

  // ─────────────────────────────────────────────
  // 3. MEMBER EDIT
  // ─────────────────────────────────────────────
  console.log("\n[3] Member Edit...");

  await updateMemberService(newMember.id, {
    firstName: "UPDATED",
    educationLevel: "Post Graduate",
    skills: "Testing, Leadership",
    joinedAt: "2023-06-01",
  });
  const updated = await getMemberByIdAdminService(newMember.id);
  assert(updated?.firstName === "UPDATED", "Name updated");
  assert(updated?.educationLevel === "Post Graduate", "Education level updated");
  assert(updated?.skills === "Testing, Leadership", "Skills updated");
  assert(updated?.joinedAt === "2023-06-01", "joinedAt updated");

  // ─────────────────────────────────────────────
  // 4. PUBLIC PRIVACY CHECK
  // ─────────────────────────────────────────────
  console.log("\n[4] Public Privacy Check...");

  const publicStats = await getPublicMemberStatsService();
  assert(typeof publicStats.totalMembersCount === "number", "Public stats returns count");
  // Ensure the public stats function does NOT return email/phone
  const statsKeys = Object.keys(publicStats);
  assert(!statsKeys.includes("email"), "Public stats does not expose email");
  assert(!statsKeys.includes("phone"), "Public stats does not expose phone");
  assert(!statsKeys.includes("address"), "Public stats does not expose address");

  // ─────────────────────────────────────────────
  // 5. MEMBER LIST FILTERS
  // ─────────────────────────────────────────────
  console.log("\n[5] Member List Filters...");

  const allMembers = await getAllMembersAdminService();
  assert(allMembers.length > 0, "Admin can list all members");

  const activeOnly = await getAllMembersAdminService({ isActive: true });
  assert(activeOnly.every((m) => m.isActive), "isActive filter works");

  const searchResults = await getAllMembersAdminService({ search: "UPDATED" });
  assert(searchResults.length >= 1, "Search by name works");

  // ─────────────────────────────────────────────
  // 6. MEMBER DELETE
  // ─────────────────────────────────────────────
  console.log("\n[6] Member Delete...");

  await deleteMemberService(newMember.id);
  const deleted = await getMemberByIdAdminService(newMember.id);
  assert(deleted === null, "Member deleted from DB");

  // ─────────────────────────────────────────────
  // 7. ANNOUNCEMENT CRUD
  // ─────────────────────────────────────────────
  console.log("\n[7] Announcement CRUD Operations...");

  const newAnn = await createAnnouncementService({
    title: "TEST: Phase 7 Announcement",
    content: "This is a test announcement created by the Phase 7 automated test suite.",
    summary: "Phase 7 test announcement summary.",
    category: "General",
    badge: "Test",
    important: false,
    published: false,
    date: "2024-09-01",
  });
  assert(!!newAnn.id, "Created announcement");
  assert(newAnn.published === false, "Created as draft (unpublished)");

  const fetchedAnn = await getAnnouncementByIdService(newAnn.id);
  assert(fetchedAnn?.title === "TEST: Phase 7 Announcement", "Read announcement by ID");
  assert(fetchedAnn?.category === "General", "Category persisted");
  assert(fetchedAnn?.badge === "Test", "Badge persisted");
  assert(fetchedAnn?.published === false, "Published=false persisted");

  // ─────────────────────────────────────────────
  // 8. ANNOUNCEMENT PUBLISH / UNPUBLISH
  // ─────────────────────────────────────────────
  console.log("\n[8] Announcement Publish / Unpublish...");

  // Draft should NOT appear on public site
  const publicBeforePublish = await getAnnouncementsService();
  const foundBeforePublish = publicBeforePublish.some((a) => a.id === newAnn.id);
  assert(!foundBeforePublish, "Draft announcement hidden from public site");

  // Publish it
  await updateAnnouncementService(newAnn.id, { published: true });
  const publishedAnn = await getAnnouncementByIdService(newAnn.id);
  assert(publishedAnn?.published === true, "Announcement published");
  assert(publishedAnn?.publishedAt !== null, "publishedAt set on publish");

  // Should now appear on public site
  const publicAfterPublish = await getAnnouncementsService();
  const foundAfterPublish = publicAfterPublish.some((a) => a.id === newAnn.id);
  assert(foundAfterPublish, "Published announcement visible on public site");

  // Unpublish
  await updateAnnouncementService(newAnn.id, { published: false });
  const unpublishedAnn = await getAnnouncementByIdService(newAnn.id);
  assert(unpublishedAnn?.published === false, "Announcement unpublished");
  assert(unpublishedAnn?.publishedAt === null, "publishedAt cleared on unpublish");

  // Should disappear from public again
  const publicAfterUnpublish = await getAnnouncementsService();
  const foundAfterUnpublish = publicAfterUnpublish.some((a) => a.id === newAnn.id);
  assert(!foundAfterUnpublish, "Unpublished announcement hidden from public site");

  // ─────────────────────────────────────────────
  // 9. ANNOUNCEMENT EDIT
  // ─────────────────────────────────────────────
  console.log("\n[9] Announcement Edit...");

  await updateAnnouncementService(newAnn.id, {
    title: "TEST: Phase 7 Announcement (UPDATED)",
    category: "Meeting",
    important: true,
  });
  const updatedAnn = await getAnnouncementByIdService(newAnn.id);
  assert(updatedAnn?.title === "TEST: Phase 7 Announcement (UPDATED)", "Title updated");
  assert(updatedAnn?.category === "Meeting", "Category updated");
  assert(updatedAnn?.important === true, "Important flag updated");

  // ─────────────────────────────────────────────
  // 10. ADMIN ANNOUNCEMENT LIST
  // ─────────────────────────────────────────────
  console.log("\n[10] Admin Announcement List (all statuses)...");

  const allAnns = await getAllAnnouncementsAdminService();
  assert(allAnns.length > 0, "Admin can list all announcements");
  const adminFoundAnn = allAnns.some((a) => a.id === newAnn.id);
  assert(adminFoundAnn, "Unpublished announcement visible to admin");

  // ─────────────────────────────────────────────
  // 11. ANNOUNCEMENT DELETE
  // ─────────────────────────────────────────────
  console.log("\n[11] Announcement Delete...");

  await deleteAnnouncementService(newAnn.id);
  const deletedAnn = await getAnnouncementByIdService(newAnn.id);
  assert(deletedAnn === null, "Announcement deleted from DB");

  // ─────────────────────────────────────────────
  // 12. DATABASE AGGREGATES
  // ─────────────────────────────────────────────
  console.log("\n[12] Database Aggregates...");

  const [memberCount, eventCount, teamCount, annCount] = await Promise.all([
    prisma.member.count(),
    prisma.event.count(),
    prisma.teamMember.count(),
    prisma.announcement.count(),
  ]);

  const publishedCount = await prisma.announcement.count({ where: { published: true } });
  const activeMembers = await prisma.member.count({ where: { isActive: true } });

  assert(typeof memberCount === "number", `Total members in DB: ${memberCount}`);
  assert(typeof eventCount === "number", `Total events in DB: ${eventCount}`);
  assert(typeof teamCount === "number", `Total team members in DB: ${teamCount}`);
  assert(typeof annCount === "number", `Total announcements in DB: ${annCount}`);
  assert(typeof publishedCount === "number", `Published announcements: ${publishedCount}`);
  assert(typeof activeMembers === "number", `Active members: ${activeMembers}`);

  // Summary
  console.log("\n==========================================");
  console.log(` RESULTS: ${passed} passed, ${failed} failed`);
  if (failed === 0) {
    console.log(" ALL PHASE 7 TESTS PASSED \u2713");
  } else {
    console.log(` ${failed} TEST(S) FAILED \u2717`);
  }
  console.log("==========================================");

  if (failed > 0) process.exit(1);
}

runPhase7Tests()
  .catch((e) => {
    console.error("Test suite crashed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
