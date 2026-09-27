import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Users, Trophy, Leaf, Star, Award, ArrowRight, ShieldCheck } from "lucide-react";
import { STATS } from "@/lib/constants";


export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Elevo Community — our history, mission, and values.",
};

const milestones = [
  { year: "2012", event: "Elevo founded with 30 founding members" },
  { year: "2014", event: "First annual sports meet, 200+ participants" },
  { year: "2016", event: "Launched community service and welfare wing" },
  { year: "2018", event: "Cultural committee formed, first Onam mega festival" },
  { year: "2020", event: "COVID-19 food & emergency medical relief taskforce" },
  { year: "2022", event: "Crossed 500+ active youth members milestone" },
  { year: "2024", event: "Launched Elevo digital platform & career seminars" },
];

import { prisma } from "@/lib/prisma";

export default async function AboutPage() {
  const leadershipPreview = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
    take: 6,
  });
  
  const activeMembersCount = await prisma.member.count({ where: { isActive: true } });

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="section bg-white border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">About Us</div>
          <div className="max-w-3xl">
            <h1 className="text-dark-text mb-4">
              More than an organization —<br />
              <span className="text-forest">a community movement</span>
            </h1>
            <p className="text-lg text-dark-text/65 leading-relaxed">
              The Elevo Community has been the beating heart of local youth since 2012, channelling
              energy and passion into athletics, cultural preservation, youth leadership, and
              community welfare.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm bg-mint-fog/40 border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center py-4 bg-white rounded-2xl border border-border">
                <div className="text-3xl font-bold text-forest">
                  {stat.label === "Active Members" ? `${activeMembersCount}+` : stat.value}
                </div>
                <div className="text-xs text-muted mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-white border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-tag mb-4">Our Mission</div>
              <h2 className="text-dark-text mb-4">
                Empowering youth through <span className="text-forest">unity and action</span>
              </h2>
              <p className="text-dark-text/65 leading-relaxed mb-4">
                Our mission is to create an inclusive, vibrant platform where every young person in
                Elevo can discover their potential, build meaningful connections, and contribute
                actively to our village ..
              </p>
              <p className="text-dark-text/65 leading-relaxed">
                We believe that when youth are equipped with platforms to lead, communities
                prosper. Every sports meet, charity initiative, and cultural gathering strengthens our
                social fabric.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {[
                { icon: Users, label: "Community First" },
                { icon: Trophy, label: "Athletic Excellence" },
                { icon: Heart, label: "Social Welfare" },
                { icon: Leaf, label: "Green Initiatives" },
                { icon: Star, label: "Cultural Heritage" },
                { icon: Award, label: "Youth Leadership" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="card-flat flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-mint-fog flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-forest" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-semibold text-dark-text">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-mint-fog/30 border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">Our Journey</div>
          <h2 className="text-dark-text mb-10">Milestones & History</h2>
          <div className="max-w-2xl space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 relative">
                {/* Line */}
                {i < milestones.length - 1 && (
                  <div className="absolute left-[1.875rem] top-10 bottom-0 w-px bg-border" />
                )}
                {/* Dot */}
                <div className="w-15 flex-shrink-0 flex flex-col items-center gap-2 pt-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-forest ring-4 ring-mint-fog" />
                </div>
                <div className="pb-8">
                  <div className="text-sm font-bold text-forest mb-1">{m.year}</div>
                  <p className="text-sm text-dark-text/75">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership summary */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="section-tag mb-4">Governance</div>
              <h2 className="text-dark-text">Committee Leadership</h2>
              <p className="mt-2 text-dark-text/60 max-w-lg">
                Guided by elected office bearers and dedicated youth coordinators.
              </p>
            </div>
            <Link href="/team" className="btn-secondary gap-2 self-start sm:self-auto">
              View Full Team Directory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {leadershipPreview.map((member) => (
              <div key={member.id} className="card text-center py-6 hover:border-forest/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-mint-fog flex items-center justify-center mx-auto mb-3 text-forest font-bold text-base border border-border">
                  {member.initials}
                </div>
                <div className="text-sm font-bold text-dark-text leading-tight">{member.name}</div>
                <div className="text-xs text-muted mt-1 font-medium">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
