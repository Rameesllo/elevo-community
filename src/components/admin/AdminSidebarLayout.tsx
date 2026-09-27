"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  Megaphone,
  Bell,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface AdminSidebarLayoutProps {
  user: {
    id?: string;
    name: string;
    email: string;
    role: "ADMIN" | "MANAGER";
  };
  children: React.ReactNode;
}

export default function AdminSidebarLayout({
  user,
  children,
}: AdminSidebarLayoutProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = user.role === "ADMIN";

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin/dashboard",
    },
    {
      href: "/admin/events",
      label: "Events",
      icon: Calendar,
      active: pathname.startsWith("/admin/events"),
    },
    {
      href: "/admin/members",
      label: "Members",
      icon: UserCheck,
      active: pathname.startsWith("/admin/members"),
    },
    {
      href: "/admin/announcements",
      label: "Announcements",
      icon: Megaphone,
      active: pathname.startsWith("/admin/announcements"),
    },
    {
      href: "/admin/team",
      label: "Team Directory",
      icon: Users,
      active: pathname.startsWith("/admin/team"),
    },
    {
      href: "/admin/notifications",
      label: "Notifications",
      icon: Bell,
      active: pathname.startsWith("/admin/notifications"),
    },
  ];

  if (isAdmin) {
    navItems.push({
      href: "/admin/accounts",
      label: "Admin Accounts",
      icon: ShieldCheck,
      active: pathname.startsWith("/admin/accounts"),
    });
  }

  // Determine current page title for breadcrumb/header
  const currentItem = navItems.find((item) => item.active) || {
    label: pathname.split("/").filter(Boolean).pop()?.toUpperCase() || "Admin",
  };

  return (
    <div className="min-h-screen bg-[#F4F9F6] text-dark-text flex flex-col md:flex-row font-sans">
      {/* =========================================
          DESKTOP SIDEBAR (Visible on md and up)
         ========================================= */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#0d2a1d] text-white flex-col justify-between border-r border-forest/20 shrink-0 sticky top-0 h-screen z-30 shadow-xl">
        {/* Top Header & Logo */}
        <div>
          <div className="p-6 border-b border-white/10 flex items-center gap-3.5">
            <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm border border-white/20 shrink-0">
              <Image
                src="/logo.png"
                alt="Elevo Community Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div className="overflow-hidden">
              <Link
                href="/admin/dashboard"
                className="font-black text-sm tracking-tight text-white block hover:text-mint-fog transition-colors truncate"
              >
                Elevo Community
              </Link>
              <span className="text-[10px] text-mint-fog/80 block uppercase tracking-wider font-semibold">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-6 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-mint-fog/60 uppercase tracking-wider">
              Management Menus
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    item.active
                      ? "bg-white/20 text-white shadow-sm ring-1 ring-white/25 backdrop-blur-sm"
                      : "text-mint-fog/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        item.active ? "text-white" : "text-mint-fog"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.active && (
                    <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                  )}
                </Link>
              );
            })}

            {/* Quick Links Section */}
            <div className="pt-4 px-3 pb-2 text-[10px] font-bold text-mint-fog/60 uppercase tracking-wider">
              External
            </div>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-mint-fog/80 hover:text-white hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-mint-fog group-hover:scale-110 transition-transform" />
                <span>Visit Public Site</span>
              </div>
            </Link>
          </div>
        </div>

        {/* User Card & Logout at Bottom */}
        <div className="p-4 border-t border-white/10 bg-black/15">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-white/15 text-white flex items-center justify-center font-bold text-xs shrink-0 border border-white/10">
                {user.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {user.name}
                </div>
                <div className="text-[10px] text-mint-fog/70 truncate">
                  {user.email}
                </div>
              </div>
            </div>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                isAdmin
                  ? "bg-amber-400 text-dark-text"
                  : "bg-emerald-300 text-forest"
              }`}
            >
              {user.role}
            </span>
          </div>

          <div className="pt-1">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* =========================================
          MOBILE TOPBAR & DRAWER (Visible on < md)
         ========================================= */}
      <header className="md:hidden bg-[#0d2a1d] text-white sticky top-0 z-40 border-b border-white/10 shadow-md">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center p-1.5 border border-white/20">
                <Image
                  src="/logo.png"
                  alt="Elevo Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-sm text-white">Elevo Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/notifications"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-mint-fog hover:text-white"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        {mobileOpen && (
          <div className="px-4 py-4 space-y-1.5 bg-[#0a2016] border-t border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 py-1 text-[10px] font-bold text-mint-fog/60 uppercase tracking-wider">
              Menus
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    item.active
                      ? "bg-white/20 text-white font-bold ring-1 ring-white/25"
                      : "text-mint-fog/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.active && (
                    <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-2 px-2 text-[10px] font-bold text-mint-fog/60 uppercase tracking-wider">
              External
            </div>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-mint-fog/80 hover:text-white hover:bg-white/10"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Public Website</span>
            </Link>
          </div>
        )}
      </header>

      {/* =========================================
          MAIN CONTENT WRAPPER
         ========================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Topbar */}
        <header className="hidden md:flex items-center justify-between h-16 px-8 bg-white border-b border-forest/10 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-dark-text/60">
            <span>Admin</span>
            <span>/</span>
            <span className="font-bold text-forest text-sm">
              {currentItem.label}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-forest/80 hover:text-forest font-semibold px-3 py-1.5 rounded-xl bg-mint-fog/40 hover:bg-mint-fog/70 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </Link>

            <Link
              href="/admin/notifications"
              className="p-2 bg-mint-fog/40 hover:bg-mint-fog/70 text-forest rounded-xl transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </Link>

            <div className="h-6 w-px bg-forest/10" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-forest text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {user.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-dark-text leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-dark-text/50 font-medium">
                  {user.role}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Main Content */}
        <main className="flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
