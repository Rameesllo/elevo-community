"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

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

const categories = ["All", "Sports", "Educational", "Cultural", "Social"] as const;

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventsClient({ initialEvents }: { initialEvents: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [eventTab, setEventTab] = useState<"upcoming" | "past">("upcoming");

  const categoryFiltered =
    selectedCategory === "All"
      ? initialEvents
      : initialEvents.filter(
          (e) => e.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const upcoming = categoryFiltered.filter((e) => e.upcoming);
  const past = categoryFiltered.filter((e) => !e.upcoming);

  const displayedEvents = eventTab === "upcoming" ? upcoming : past;

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="section-sm bg-white border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">Community Calendar</div>
          <h1 className="text-dark-text mb-3">
            Events & <span className="text-forest">Activities</span>
          </h1>
          <p className="text-dark-text/60 max-w-2xl text-base sm:text-lg leading-relaxed">
            From premier cricket and football leagues to youth leadership bootcamps and cultural
            festivals — explore what&apos;s happening in Elevo.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-main">
          {/* Controls: Upcoming/Past tabs & Category filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border">
            {/* View Tab (Upcoming vs Past) */}
            <div className="flex items-center gap-1 bg-mint-fog p-1 rounded-2xl border border-border self-start">
              <button
                onClick={() => setEventTab("upcoming")}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                  eventTab === "upcoming"
                    ? "bg-forest text-white shadow-sm"
                    : "text-dark-text/70 hover:text-forest"
                )}
              >
                Upcoming Events ({initialEvents.filter((e) => e.upcoming).length})
              </button>
              <button
                onClick={() => setEventTab("past")}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                  eventTab === "past"
                    ? "bg-forest text-white shadow-sm"
                    : "text-dark-text/70 hover:text-forest"
                )}
              >
                Past Highlights ({initialEvents.filter((e) => !e.upcoming).length})
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer",
                    selectedCategory === cat
                      ? "bg-forest text-white"
                      : "bg-white border border-border text-dark-text/70 hover:bg-mint-fog hover:text-forest"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          {displayedEvents.length === 0 ? (
            <div className="card text-center py-16 max-w-xl mx-auto">
              <p className="text-muted text-sm font-medium">
                No {eventTab} events found in category &quot;{selectedCategory}&quot;.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="btn-ghost text-xs mt-3 mx-auto"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedEvents.map((event) => (
                <article
                  key={event.id}
                  className={cn(
                    "card flex flex-col justify-between group hover:border-forest/40 transition-all duration-300",
                    !event.upcoming && "opacity-90"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <Badge variant={categoryColors[event.category] ?? "default"}>
                        {categoryLabels[event.category]}
                      </Badge>
                      {event.upcoming ? (
                        <span className="text-[11px] font-semibold text-forest bg-mint-fog px-2.5 py-0.5 rounded-full border border-border">
                          Upcoming
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-muted bg-neutral-100 px-2.5 py-0.5 rounded-full">
                          Concluded
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-dark-text leading-snug group-hover:text-forest transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-sm text-dark-text/65 mt-2.5 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <CalendarDays className="w-4 h-4 text-forest flex-shrink-0" />
                      <span className="font-medium text-dark-text/80">{formatDate(new Date(event.date))}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Clock className="w-4 h-4 text-forest flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <MapPin className="w-4 h-4 text-forest flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
