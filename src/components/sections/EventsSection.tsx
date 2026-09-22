import Link from "next/link";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MOCK_EVENTS } from "@/lib/mockData";

const categoryColors: Record<string, "default" | "forest" | "outline"> = {
  sports: "forest",
  cultural: "default",
  social: "outline",
  educational: "default",
  other: "outline",
};

const categoryLabels: Record<string, string> = {
  sports: "Sports",
  cultural: "Cultural",
  social: "Social",
  educational: "Educational",
  other: "Other",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function EventsSection() {
  const upcomingEvents = MOCK_EVENTS.filter((e) => e.upcoming).slice(0, 3);

  return (
    <section className="section bg-white border-b border-border">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-tag mb-4">Community Calendar</div>
            <h2 className="text-dark-text">
              Upcoming <span className="text-forest">Events</span>
            </h2>
            <p className="mt-2 text-dark-text/60 max-w-lg">
              Join in on tournaments, workshops, and volunteer drives happening in Elevo.
            </p>
          </div>
          <Link href="/events" className="btn-secondary gap-2 flex-shrink-0 self-start sm:self-auto">
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {upcomingEvents.map((event) => (
            <article key={event.id} className="card flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={categoryColors[event.category] ?? "default"}>
                    {categoryLabels[event.category]}
                  </Badge>
                  <span className="text-xs font-semibold text-forest bg-mint-fog px-2.5 py-0.5 rounded-full border border-border/60">
                    Upcoming
                  </span>
                </div>

                <h3 className="text-base font-semibold text-dark-text leading-snug group-hover:text-forest transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-dark-text/60 mt-2.5 leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CalendarDays className="w-3.5 h-3.5 flex-shrink-0 text-forest" />
                  {formatDate(event.date)}
                </div>
                {event.time && (
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0 text-forest" />
                    {event.time}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-forest" />
                  {event.location}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
