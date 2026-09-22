import Link from "next/link";
import { Zap, Smile, TrendingUp, Award, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { WHY_JOIN } from "@/lib/mockData";

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Smile,
  TrendingUp,
  Award,
  CheckCircle2,
  ShieldCheck,
};

export function WhyJoinSection() {
  return (
    <section className="section bg-mint-fog/50 border-b border-border">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag mb-4">Membership Benefits</div>
          <h2 className="text-dark-text">
            Why Join <span className="text-forest">Elevo?</span>
          </h2>
          <p className="mt-3 text-dark-text/60 leading-relaxed">
            Becoming an active member gives you a platform to play, lead, learn, and directly shape
            the future of our village.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_JOIN.map((item) => {
            const Icon = iconMap[item.iconName] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover hover:border-forest/40 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-4">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-dark-text mb-2">{item.title}</h3>
                <p className="text-sm text-dark-text/60 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner callout */}
        <div className="mt-12 bg-white rounded-2xl border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-dark-text">Ready to be part of something bigger?</h4>
            <p className="text-sm text-dark-text/60 mt-1">
              Membership is 100% free and open to all youth aged 15–35.
            </p>
          </div>
          <Link href="/#join" className="btn-primary gap-2 flex-shrink-0">
            Join Elevo Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
