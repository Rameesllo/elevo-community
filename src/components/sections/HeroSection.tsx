import Link from "next/link";
import { ArrowRight, Users, CalendarDays, MapPin } from "lucide-react";
import { SITE_TAGLINE, STATS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function HeroSection() {
  const activeMembersCount = await prisma.member.count({ where: { isActive: true } });

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-mint-fog/40 blur-3xl translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-forest/5 blur-3xl -translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="container-main relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl">
          {/* Tag */}
          <div className="section-tag mb-6 animate-fade-up" style={{ animationDelay: "0ms" }}>
            <MapPin className="w-3 h-3" />
            Elevo, Kerala
          </div>

          {/* Heading */}
          <h1 className="text-balance text-dark-text animate-fade-up" style={{ animationDelay: "80ms" }}>
            Rooted in{" "}
            <span className="text-forest relative">
              Community.
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-forest/20 rounded-full" />
            </span>{" "}
            <br className="hidden sm:block" />
            Rising{" "}
            <span className="text-forest relative">
              Together.
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-forest/20 rounded-full" />
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-dark-text/60 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "160ms" }}>
            {SITE_TAGLINE} — The Elevo Community connects local youth through
            sports, culture, education, and service, building a stronger tomorrow.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "240ms" }}>
            <Link href="/events" className="btn-primary gap-2">
              Upcoming Events
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn About Us
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: "320ms" }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="card-flat text-center py-5">
              <div className="text-3xl font-bold text-forest">
                {stat.label === "Active Members" ? `${activeMembersCount}+` : stat.value}
              </div>
              <div className="text-xs text-muted mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
