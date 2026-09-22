import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/admin/AdminNav";
import {
  Calendar,
  Users,
  Megaphone,
  UserCheck,
  Bell,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/admin/login");
  }

  const isAdmin = session.role === "ADMIN";
  const isManager = session.role === "MANAGER";

  // Real PostgreSQL Aggregates
  let totalMembers = 0;
  let upcomingEventsCount = 0;
  let activeTeamCount = 0;
  let announcementsCount = 0;
  let unreadNotificationsCount = 0;
  let recentEvents: any[] = [];
  let recentTeamMembers: any[] = [];

  try {
    const [
      membersC,
      upcomingC,
      activeTeamC,
      announcementsC,
      unreadC,
      eventsList,
      teamList,
    ] = await Promise.all([
      prisma.member.count({ where: { isActive: true } as any }),
      prisma.event.count({ where: { upcoming: true } }),
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.announcement.count({ where: { published: true } as any }),
      prisma.adminNotification.count({ where: { read: false } }),
      prisma.event.findMany({
        take: 4,
        orderBy: { date: "asc" },
      }),
      prisma.teamMember.findMany({
        take: 4,
        orderBy: { displayOrder: "asc" },
      }),
    ]);

    totalMembers = membersC;
    upcomingEventsCount = upcomingC;
    activeTeamCount = activeTeamC;
    announcementsCount = announcementsC;
    unreadNotificationsCount = unreadC;
    recentEvents = eventsList;
    recentTeamMembers = teamList;
  } catch (err) {
    console.warn("DB Query fallback in Admin Dashboard:", err);
  }

  return (
    <div className="min-h-screen bg-mint-fog/30 text-dark-text pb-16">
      <AdminNav user={session} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Role Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-forest/10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-forest/10 text-forest flex items-center justify-center font-bold text-xl border border-forest/15">
              {session.name ? session.name.slice(0, 2).toUpperCase() : "AD"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-forest">
                  Welcome back, {session.name}
                </h1>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isAdmin ? "bg-amber-400 text-dark-text" : "bg-emerald-300 text-forest"
                  }`}
                >
                  {session.role}
                </span>
              </div>
              <p className="text-xs text-dark-text/70 mt-1">
                {isAdmin
                  ? "Full Administrator privileges active. PostgreSQL database connected live."
                  : "Community Manager privileges active. Events, Team, Announcements & Notifications access enabled."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/admin/events/create"
              className="px-4 py-2.5 bg-forest hover:bg-forest/90 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
            <Link
              href="/admin/team/create"
              className="px-4 py-2.5 bg-mint-fog hover:bg-mint-fog/80 text-forest border border-forest/20 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Team Member</span>
            </Link>
            <Link
              href="/admin/members/create"
              className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Add Member</span>
            </Link>
            <Link
              href="/admin/announcements/create"
              className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>New Announcement</span>
            </Link>
          </div>
        </div>

        {/* 5 Real PostgreSQL Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Members */}
          <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-dark-text/60 uppercase tracking-wider">
                Total Members
              </span>
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-forest">{totalMembers}</p>
            <p className="text-[11px] text-dark-text/60 mt-1">Registered in database</p>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-dark-text/60 uppercase tracking-wider">
                Upcoming Events
              </span>
              <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-forest">{upcomingEventsCount}</p>
            <p className="text-[11px] text-dark-text/60 mt-1">Scheduled community drives</p>
          </div>

          {/* Active Team */}
          <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-dark-text/60 uppercase tracking-wider">
                Active Team
              </span>
              <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-forest">{activeTeamCount}</p>
            <p className="text-[11px] text-dark-text/60 mt-1">Published coordinators</p>
          </div>

          {/* Published Announcements */}
          <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-dark-text/60 uppercase tracking-wider">
                Announcements
              </span>
              <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                <Megaphone className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-forest">{announcementsCount}</p>
            <p className="text-[11px] text-dark-text/60 mt-1">Circulars & Notices</p>
          </div>

          {/* Unread Notifications */}
          <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-dark-text/60 uppercase tracking-wider">
                Unread Alerts
              </span>
              <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                <Bell className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-forest">{unreadNotificationsCount}</p>
            <p className="text-[11px] text-dark-text/60 mt-1">Admin system alerts</p>
          </div>
        </section>

        {/* Real Data Preview Grids: Events & Team */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events Overview */}
          <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-forest/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-forest flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-forest" />
                  Community Events
                </h3>
                <p className="text-xs text-dark-text/60">Recent events from PostgreSQL</p>
              </div>
              <Link
                href="/admin/events"
                className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
              >
                Manage All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentEvents.length === 0 ? (
                <p className="text-xs text-dark-text/60 py-4 text-center">No events found in database.</p>
              ) : (
                recentEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3.5 rounded-2xl bg-mint-fog/30 border border-forest/10 flex items-center justify-between hover:bg-mint-fog/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-dark-text line-clamp-1">{evt.title}</span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            evt.status === "UPCOMING" || evt.upcoming
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {evt.status || (evt.upcoming ? "UPCOMING" : "COMPLETED")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-dark-text/60">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(evt.date).toISOString().split("T")[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {evt.location}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/admin/events/${evt.id}/edit`}
                      className="px-3 py-1.5 bg-white border border-forest/20 text-forest text-xs font-bold rounded-lg hover:bg-forest hover:text-white transition-colors cursor-pointer"
                    >
                      Edit
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Team Overview */}
          <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-forest/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-forest flex items-center gap-2">
                  <Users className="w-4 h-4 text-forest" />
                  Team Directory
                </h3>
                <p className="text-xs text-dark-text/60">Active team members from PostgreSQL</p>
              </div>
              <Link
                href="/admin/team"
                className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
              >
                Manage All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentTeamMembers.length === 0 ? (
                <p className="text-xs text-dark-text/60 py-4 text-center">No team members found.</p>
              ) : (
                recentTeamMembers.map((tm) => (
                  <div
                    key={tm.id}
                    className="p-3.5 rounded-2xl bg-mint-fog/30 border border-forest/10 flex items-center justify-between hover:bg-mint-fog/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-forest text-white font-bold text-xs flex items-center justify-center">
                        {tm.initials || tm.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-dark-text">{tm.name}</h4>
                        <p className="text-[11px] text-dark-text/60">
                          {tm.role} • <span className="text-forest font-medium">{tm.department}</span>
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/admin/team/${tm.id}/edit`}
                      className="px-3 py-1.5 bg-white border border-forest/20 text-forest text-xs font-bold rounded-lg hover:bg-forest hover:text-white transition-colors cursor-pointer"
                    >
                      Edit
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
