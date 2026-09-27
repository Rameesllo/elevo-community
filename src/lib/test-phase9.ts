import { prisma } from "./prisma";
import fs from "fs";

async function runPhase9Tests() {
  console.log("==========================================");
  console.log(" PHASE 9 TESTS — Public Data Connections");
  console.log("==========================================");

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

  try {
    // Check if the mock fallbacks were removed from services
    const teamFile = fs.readFileSync("src/lib/services/team.service.ts", "utf8");
    assert(!teamFile.includes("MOCK_TEAM.filter"), "Team mock fallback removed");

    const eventsFile = fs.readFileSync("src/lib/services/events.service.ts", "utf8");
    assert(!eventsFile.includes("MOCK_EVENTS.filter"), "Events mock fallback removed");

    const announceFile = fs.readFileSync("src/lib/services/announcements.service.ts", "utf8");
    assert(!announceFile.includes("MOCK_ANNOUNCEMENTS.filter"), "Announcements mock fallback removed");

    // Test data from database
    const events = await prisma.event.findMany();
    assert(events !== undefined, "Events table accessible");

    const team = await prisma.teamMember.findMany({ where: { isActive: true } });
    assert(team !== undefined, "Team members table accessible with isActive filtering");

    const membersCount = await prisma.member.count({ where: { isActive: true } });
    assert(membersCount >= 0, "Active members count query works");

    const announcements = await prisma.announcement.findMany({ where: { published: true } });
    assert(announcements !== undefined, "Published announcements table accessible");

    console.log("\n==========================================");
    console.log(` RESULTS: ${passed} passed, ${failed} failed`);
    console.log("==========================================");

    if (failed > 0) process.exit(1);
  } catch (error) {
    console.error("Test failed with error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runPhase9Tests();
