import Link from "next/link";
import { CalendarDays, MapPin, Clock, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { prisma } from "@/lib/prisma";

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

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export async function EventsSection() {
  // Show recent conducted events (archive with posters)
  const conductedEvents = await prisma.event.findMany({
    where: { OR: [{ status: "COMPLETED" }, { upcoming: false }] },
    orderBy: { date: "desc" },
    take: 3,
  });

  if (conductedEvents.length === 0) return null;

  return (
    <section className="section bg-white border-b border-border">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-tag mb-4">Conducted Events</div>
            <h2 className="text-dark-text">
              Recently <span className="text-forest">Conducted</span>
            </h2>
            <p className="mt-2 text-dark-text/60 max-w-lg">
              Highlights from our recently conducted programs — posters and stories from the ground.
            </p>
          </div>
          <Link href="/events" className="btn-secondary gap-2 flex-shrink-0 self-start sm:self-auto">
            View All Conducted Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {conductedEvents.map((event) => (
            <article key={event.id} className="card flex flex-col overflow-hidden p-0 group">
              {/* Poster */}
              <div className="relative bg-mint-fog/30 border-b border-border overflow-hidden">
                {event.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={event.image} alt={`${event.title} poster`} className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                ) : (
                  <div className="w-full h-48 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-mint-fog to-white">
                    <ImageIcon className="w-7 h-7 text-forest/20" />
                    <span className="text-xs font-medium text-forest/40">Poster pending</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge variant={categoryColors[event.category] ?? "default"}>
                    {categoryLabels[event.category] || event.category}
                  </Badge>
                </div>
                <span className="absolute top-3 right-3 text-[11px] font-semibold bg-white/95 px-2.5 py-1 rounded-full border border-border text-forest">
                  Conducted
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold text-dark-text leading-snug group-hover:text-forest transition-colors line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-sm text-dark-text/60 mt-2.5 leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                <div className="mt-4 pt-3 border-t border-border space-y-1.5">
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
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
