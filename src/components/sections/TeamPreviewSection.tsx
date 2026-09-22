import Link from "next/link";
import { ArrowRight, ShieldCheck, Mail, Users } from "lucide-react";
import { MOCK_TEAM } from "@/lib/mockData";

export function TeamPreviewSection() {
  // Show key office bearers and coordinators on home preview
  const previewMembers = MOCK_TEAM.slice(0, 4);

  return (
    <section className="section bg-white border-b border-border">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="section-tag mb-4">Leadership & Vision</div>
            <h2 className="text-dark-text">
              Meet Our <span className="text-forest">Team</span>
            </h2>
            <p className="mt-2 text-dark-text/60 max-w-lg">
              Dedicated young leaders volunteering their time to guide, organize, and support the Elevo Community.
            </p>
          </div>
          <Link href="/team" className="btn-secondary gap-2 flex-shrink-0 self-start sm:self-auto">
            Meet The Full Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewMembers.map((member) => (
            <div
              key={member.id}
              className="card group flex flex-col justify-between text-center hover:border-forest/40 transition-all duration-300"
            >
              <div>
                {/* Avatar with Initials & Badge */}
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <div className="w-full h-full rounded-2xl bg-mint-fog flex items-center justify-center text-forest font-bold text-xl border-2 border-border group-hover:border-forest/50 transition-colors">
                    {member.initials}
                  </div>
                  {member.badge && (
                    <span className="absolute -bottom-2 -right-1 bg-forest text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                      {member.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-dark-text mb-1 group-hover:text-forest transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-forest uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-dark-text/60 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border flex items-center justify-center gap-1 text-[11px] text-muted font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                <span>{member.department}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
