"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, ShieldCheck, Mail, ArrowRight, Sparkles } from "lucide-react";
import { MOCK_TEAM } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const departments = [
  "All",
  "Office Bearers",
  "Program Coordinators",
  "Youth Wing",
] as const;

export default function TeamPage() {
  const [activeDepartment, setActiveDepartment] = useState<string>("All");

  const filteredMembers =
    activeDepartment === "All"
      ? MOCK_TEAM
      : MOCK_TEAM.filter((m) => m.department === activeDepartment);

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="section-sm bg-white border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">Leadership & Committee</div>
          <h1 className="text-dark-text mb-3">
            Meet the <span className="text-forest">Team</span>
          </h1>
          <p className="text-dark-text/60 max-w-2xl text-base sm:text-lg leading-relaxed">
            The dedicated volunteers, organizers, and committee members working together to create
            enriching experiences and positive impact for Elevo.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section">
        <div className="container-main">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-border">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDepartment(dept)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                  activeDepartment === dept
                    ? "bg-forest text-white shadow-sm"
                    : "bg-mint-fog/60 text-dark-text/70 hover:bg-mint-fog hover:text-forest"
                )}
              >
                {dept}
                <span className="ml-2 text-xs opacity-75 font-normal">
                  (
                  {dept === "All"
                    ? MOCK_TEAM.length
                    : MOCK_TEAM.filter((m) => m.department === dept).length}
                  )
                </span>
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="card group flex flex-col justify-between hover:border-forest/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    {/* Monogram Avatar */}
                    <div className="w-14 h-14 rounded-2xl bg-mint-fog flex items-center justify-center text-forest font-bold text-lg border border-border group-hover:border-forest/50 transition-colors">
                      {member.initials}
                    </div>
                    {member.badge && (
                      <span className="text-[11px] font-semibold text-forest bg-mint-fog px-2.5 py-0.5 rounded-full border border-border/70">
                        {member.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-dark-text group-hover:text-forest transition-colors mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-forest uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-dark-text/65 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-border flex items-center justify-between text-xs text-muted">
                  <div className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                    <span>{member.department}</span>
                  </div>
                  <span className="text-[11px] text-forest/70 font-semibold">Elevo Committee</span>
                </div>
              </div>
            ))}
          </div>

          {/* Volunteer Callout Card */}
          <div className="mt-16 bg-mint-fog/60 rounded-3xl border border-border p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Get Involved
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-dark-text mb-2">
                Want to join our organizing committee?
              </h3>
              <p className="text-sm text-dark-text/70 leading-relaxed">
                We are always looking for passionate youth eager to help organize events, manage social
                media, lead sports clinics, or coordinate welfare projects.
              </p>
            </div>
            <Link href="/#join" className="btn-primary gap-2 flex-shrink-0">
              Become a Volunteer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
