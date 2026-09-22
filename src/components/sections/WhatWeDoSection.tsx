import { Users, Trophy, Heart, Compass, Sparkles, Leaf, CheckCircle2 } from "lucide-react";
import { WHAT_WE_DO } from "@/lib/mockData";

const iconMap: Record<string, React.ElementType> = {
  Users,
  Trophy,
  Heart,
  Compass,
  Sparkles,
  Leaf,
};

export function WhatWeDoSection() {
  return (
    <section className="section bg-mint-fog/40 border-b border-border">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag mb-4">Core Initiatives</div>
          <h2 className="text-dark-text">
            What We <span className="text-forest">Do</span>
          </h2>
          <p className="mt-3 text-dark-text/60 leading-relaxed">
            From sports tournaments and environmental drives to career mentorship and cultural celebrations,
            we create programs that uplift every corner of Elevo.
          </p>
        </div>

        {/* Grid of Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_WE_DO.map((item) => {
            const Icon = iconMap[item.iconName] || Users;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    {item.stats && (
                      <span className="text-[11px] font-semibold text-forest bg-mint-fog px-2.5 py-1 rounded-full border border-border/80">
                        {item.stats}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-dark-text mb-2.5">{item.title}</h3>
                  <p className="text-sm text-dark-text/60 leading-relaxed mb-5">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <ul className="space-y-1.5">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-xs text-dark-text/75 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
