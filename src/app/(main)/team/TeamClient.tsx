"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Sparkles, Crown, Users, GraduationCap } from "lucide-react";

function Avatar({ member, size = "md" }: { member: any; size?: "lg" | "md" | "sm" }) {
  const sizeClasses =
    size === "lg"
      ? "w-20 h-20 text-xl"
      : size === "sm"
      ? "w-14 h-14 text-sm"
      : "w-16 h-16 text-base";
  if (member.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={member.image}
        alt={member.name}
        className={`${sizeClasses} rounded-2xl object-cover border-2 border-forest/10 shadow-sm`}
      />
    );
  }
  return (
    <div
      className={`${sizeClasses} rounded-2xl bg-mint-fog flex items-center justify-center text-forest font-bold border-2 border-forest/10 shadow-sm`}
    >
      {member.initials || member.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function SocialLinks({ member }: { member: any }) {
  const hasLinkedin = !!member.linkedin;
  const hasInstagram = !!member.instagram;
  if (!hasLinkedin && !hasInstagram) return null;
  return (
    <div className="flex items-center gap-2 mt-3">
      {hasLinkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} LinkedIn`}
          className="w-7 h-7 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/20 flex items-center justify-center transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.96 0-1.74-.79-1.74-1.76s.78-1.76 1.74-1.76 1.74.79 1.74 1.76-.78 1.76-1.74 1.76zm15.5 12.27h-3v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.15 1.45-2.15 2.95v5.71h-3s.04-9.26 0-11h3v1.56c.4-.62 1.11-1.5 2.71-1.5 1.98 0 3.47 1.29 3.47 4.06v6.88z"/></svg>
        </a>
      )}
      {hasInstagram && (
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} Instagram`}
          className="w-7 h-7 rounded-xl bg-pink-500/10 hover:bg-pink-500 text-pink-600 hover:text-white border border-pink-200 flex items-center justify-center transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22a3.7 3.7 0 01-.9 1.38 3.7 3.7 0 01-1.38.9c-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.77.07-1.08.05-1.67.23-2.06.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.98-.38 2.06C2.65 8.83 2.64 9.2 2.64 12s.01 3.17.07 4.42c.05 1.08.23 1.67.38 2.06.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.98.33 2.06.38 1.25.06 1.62.07 4.77.07s3.52-.01 4.77-.07c1.08-.05 1.67-.23 2.06-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.98.38-2.06.06-1.25.07-1.62.07-4.42s-.01-3.17-.07-4.42c-.05-1.08-.23-1.67-.38-2.06a2.7 2.7 0 00-.83-1.28 2.7 2.7 0 00-1.28-.83c-.39-.15-.98-.33-2.06-.38C15.52 3.97 15.15 3.96 12 3.96zm0 3.06a5.98 5.98 0 110 11.96 5.98 5.98 0 010-11.96zm0 1.8a4.18 4.18 0 100 8.36 4.18 4.18 0 000-8.36zm6.23-2.59a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8z"/></svg>
        </a>
      )}
    </div>
  );
}

export default function TeamClient({ initialMembers }: { initialMembers: any[] }) {
  const founders = initialMembers.filter((m) => m.department === "Founders").sort((a, b) => a.displayOrder - b.displayOrder);
  const alumni = initialMembers.filter((m) => m.department === "Alumni").sort((a, b) => a.displayOrder - b.displayOrder);
  const currentTeam = initialMembers
    .filter((m) => !["Founders", "Alumni"].includes(m.department))
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="section-sm bg-white border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">Our People</div>
          <h1 className="text-dark-text mb-3">
            Meet the <span className="text-forest">Team</span>
          </h1>
          <p className="text-dark-text/60 max-w-2xl text-base sm:text-lg leading-relaxed">
            From our founders who laid the foundation, to the current team driving daily impact, to the alumni who continue to inspire.
          </p>
        </div>
      </section>

      <div className="container-main section space-y-16">
        {/* Layer 1: Founders — image + name */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-xl font-black text-dark-text">Founders</h2>
              <p className="text-xs text-muted font-medium">First layer — Visionaries who started Puliyamparambu</p>
            </div>
            <span className="ml-auto text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
              {founders.length}
            </span>
          </div>

          {founders.length === 0 ? (
            <div className="card py-10 text-center text-sm text-muted border-dashed">No founders added yet. Add via Admin → Team → Layer: Founders.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {founders.map((member) => (
                <div key={member.id} className="card text-center p-6 flex flex-col items-center hover:border-amber-200 transition-colors">
                  <Avatar member={member} size="lg" />
                  <h3 className="mt-4 text-sm font-bold text-dark-text leading-tight">{member.name}</h3>
                  <SocialLinks member={member} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Layer 2: Current Team — image + name + position + social */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-mint-fog border border-forest/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-forest" />
            </div>
            <div>
              <h2 className="text-xl font-black text-dark-text">Current Team</h2>
              <p className="text-xs text-muted font-medium">Second layer — Active members serving today</p>
            </div>
            <span className="ml-auto text-xs font-bold bg-mint-fog text-forest px-3 py-1 rounded-full border border-forest/10">
              {currentTeam.length}
            </span>
          </div>

          {currentTeam.length === 0 ? (
            <div className="card py-10 text-center text-sm text-muted border-dashed">No current team members. Add via Admin → Team → Layer: Current Team.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTeam.map((member) => (
                <div key={member.id} className="card group flex flex-col hover:border-forest/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <Avatar member={member} size="md" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-dark-text leading-tight group-hover:text-forest transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-forest uppercase tracking-wider mt-1">{member.role}</p>
                      <p className="text-[11px] text-muted font-medium mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-forest" />
                        {member.department}
                      </p>
                    </div>
                  </div>
                  <SocialLinks member={member} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Layer 3: Alumni — image + name + social */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h2 className="text-xl font-black text-dark-text">Community Alumni</h2>
              <p className="text-xs text-muted font-medium">Honoring those who served and continue to guide us</p>
            </div>
            <span className="ml-auto text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              {alumni.length}
            </span>
          </div>

          {alumni.length === 0 ? (
            <div className="card py-10 text-center text-sm text-muted border-dashed">No alumni added yet. Add via Admin → Team → Layer: Alumni.</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {alumni.map((member) => (
                <div key={member.id} className="card text-center p-4 flex flex-col items-center hover:border-blue-200 transition-colors">
                  <Avatar member={member} size="sm" />
                  <h3 className="mt-3 text-xs font-bold text-dark-text leading-tight line-clamp-2">{member.name}</h3>
                  <SocialLinks member={member} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Volunteer Callout */}
        <div className="bg-mint-fog/60 rounded-3xl border border-border p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Get Involved
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-dark-text mb-2">Want to join our organizing committee?</h3>
            <p className="text-sm text-dark-text/70 leading-relaxed">
              We are always looking for passionate youth eager to help organize events, manage social media, lead sports clinics, or coordinate welfare projects.
            </p>
          </div>
          <Link href="/#join" className="btn-primary gap-2 flex-shrink-0">
            Become a Volunteer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
