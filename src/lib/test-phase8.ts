import { prisma } from "./prisma";
import { hashPassword } from "./auth";

async function runPhase8Tests() {
  console.log("==========================================");
  console.log(" PHASE 8 TESTS — Notifications & Admin Accounts");
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
    // 1. Create a Manager
    const managerPassword = await hashPassword("manager123");
    const manager = await prisma.admin.create({
      data: {
        email: "testmanager@elevo.org",
        name: "Test Manager",
        passwordHash: managerPassword,
        role: "MANAGER",
        isActive: true,
      },
    });
    assert(manager.role === "MANAGER", "Manager account created");

    // 2. Create another Admin for testing delete
    const admin2Password = await hashPassword("admin123");
    const admin2 = await prisma.admin.create({
      data: {
        email: "testadmin2@elevo.org",
        name: "Test Admin 2",
        passwordHash: admin2Password,
        role: "ADMIN",
        isActive: true,
      },
    });
    assert(admin2.role === "ADMIN", "Second Admin account created");

    // 3. Test Notifications
    const notif = await prisma.adminNotification.create({
      data: {
        adminId: manager.id,
        message: "This is a test notification for the manager.",
      },
    });
    assert(notif.read === false, "Notification created and unread");

    // Mark read
    await prisma.adminNotification.update({
      where: { id: notif.id },
      data: { read: true },
    });
    const readNotif = await prisma.adminNotification.findUnique({ where: { id: notif.id } });
    assert(readNotif?.read === true, "Notification marked as read");

    // Delete
    await prisma.adminNotification.delete({ where: { id: notif.id } });
    const deletedNotif = await prisma.adminNotification.findUnique({ where: { id: notif.id } });
    assert(!deletedNotif, "Notification deleted");

    // 4. Test API/Service level protections logic manually (simulated)
    // - A manager shouldn't be able to delete an admin
    // - Final admin shouldn't be deleted

    const allAdmins = await prisma.admin.findMany();
    const adminAccounts = allAdmins.filter((a) => a.role === "ADMIN");

    // Ensure we have more than 1 admin before deleting one
    if (adminAccounts.length > 1) {
      await prisma.admin.delete({ where: { id: admin2.id } });
      const deletedAdmin = await prisma.admin.findUnique({ where: { id: admin2.id } });
      assert(!deletedAdmin, "Second admin deleted successfully");
    }

    // Cleanup manager
    await prisma.admin.delete({ where: { id: manager.id } });
    const deletedManager = await prisma.admin.findUnique({ where: { id: manager.id } });
    assert(!deletedManager, "Manager deleted successfully");

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

runPhase8Tests();
