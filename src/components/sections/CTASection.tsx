import Link from "next/link";
import { ArrowRight, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function CTASection() {
  return (
    <section id="join" className="section bg-forest text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-forest-light/60 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-mint-fog/10 blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-mint-fog" />
            Join Our Youth Movement
          </div>

          <h2 className="text-white text-balance text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Ready to make a difference in <span className="text-mint-fog">Elevo?</span>
          </h2>

          <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Connect with 500+ active youth, play in seasonal sporting leagues, lead community projects,
            and build lifelong friendships.
          </p>

          {/* Quick perks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/90 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-mint-fog" /> 100% Free Membership
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-mint-fog" /> Verified Volunteer Hours
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-mint-fog" /> Tournaments & Cultural Fests
            </span>
          </div>

          <div className="mt-9 flex flex-wrap gap-3.5 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-forest font-semibold text-sm rounded-xl hover:bg-mint-fog transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore Upcoming Events
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-white font-semibold text-sm rounded-xl border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
            >
              Contact Team Leaders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
