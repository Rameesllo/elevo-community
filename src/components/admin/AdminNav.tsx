"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";
import {
  LayoutDashboard,
  Calendar,
  Users,
  ShieldCheck,
  ExternalLink,
  PlusCircle,
} from "lucide-react";

interface AdminNavProps {
  user: {
    name: string;
    email: string;
    role: "ADMIN" | "MANAGER";
  };
}

export default function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();
  const isAdmin = user.role === "ADMIN";

  const navLinks = [
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
      href: "/admin/team",
      label: "Team Directory",
      icon: Users,
      active: pathname.startsWith("/admin/team"),
    },
  ];

  return (
    <header className="bg-forest text-white border-b border-forest/20 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Left Nav */}
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center p-1.5 border border-white/20 group-hover:scale-105 transition-transform">
                <Image
                  src="/elevo-logo.png"
                  alt="Elevo Logo"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wide block text-white group-hover:text-mint-fog transition-colors">
                  Elevo Community
                </span>
                <span className="text-[10px] text-mint-fog/70 block uppercase tracking-wider font-semibold">
                  Management Console
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      link.active
                        ? "bg-white/20 text-white shadow-inner"
                        : "text-mint-fog/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center gap-1.5 text-xs text-mint-fog/80 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-mint-fog" />
              <span className="text-xs font-medium max-w-[120px] truncate">{user.name}</span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  isAdmin ? "bg-amber-400 text-dark-text" : "bg-emerald-300 text-forest"
                }`}
              >
                {user.role}
              </span>
            </div>

            <LogoutButton />
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-white/10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  link.active ? "bg-white/20 text-white font-bold" : "text-mint-fog/80"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
