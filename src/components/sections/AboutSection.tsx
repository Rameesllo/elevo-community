import Link from "next/link";
import { Heart, Users, Trophy, Leaf, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Community",
    description:
      "We bring Elevo's youth together, fostering bonds that last a lifetime through shared experiences.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description:
      "We support and celebrate achievement in sports, academics, arts, and every field our members pursue.",
  },
  {
    icon: Heart,
    title: "Service",
    description:
      "Giving back is at our core — from clean-up drives to local welfare initiatives, we lead with purpose.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We champion environmental awareness and build habits that protect our village for generations to come.",
  },
];

export function AboutSection() {
  return (
    <section className="section bg-mint-fog/50">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="section-tag mb-4">Who We Are</div>
          <h2 className="text-dark-text">A community built on{" "}
            <span className="text-forest">shared values</span>
          </h2>
          <p className="mt-4 text-dark-text/60 leading-relaxed">
            Founded over a decade ago, the Elevo Community has grown into a
            vibrant organization that channels the energy and passion of local youth into
            meaningful action.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="card group">
                <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-4
                                group-hover:bg-forest group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5 text-forest group-hover:text-white transition-colors duration-300" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold text-dark-text mb-2">{pillar.title}</h3>
                <p className="text-sm text-dark-text/60 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link href="/about" className="btn-secondary gap-2">
            Read Our Full Story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
