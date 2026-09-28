"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Clock, Image as ImageIcon, X } from "lucide-react";
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
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Conducted events only — defensive filter in case older upcoming data exists
  const conductedEvents = initialEvents.filter((e) => !e.upcoming || e.status === "COMPLETED");

  const filtered =
    selectedCategory === "All"
      ? conductedEvents
      : conductedEvents.filter((e) => e.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="section-sm bg-white border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">Conducted Events Archive</div>
          <h1 className="text-dark-text mb-3">
            Our <span className="text-forest">Conducted</span> Events
          </h1>
          <p className="text-dark-text/60 max-w-2xl text-base sm:text-lg leading-relaxed">
            A curated archive of every program we have conducted — with posters and event details preserved for the community.
          </p>
          <p className="text-xs font-semibold text-forest/70 mt-3">
            {conductedEvents.length} {conductedEvents.length === 1 ? "event" : "events"} conducted
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-main">
          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-1.5 mb-8 pb-6 border-b border-border">
            <span className="text-xs font-bold text-dark-text/60 uppercase tracking-wider mr-2">Filter:</span>
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

          {/* Events Grid */}
          {filtered.length === 0 ? (
            <div className="card text-center py-16 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-mint-fog border border-border flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-6 h-6 text-forest/40" />
              </div>
              <p className="text-sm font-semibold text-dark-text">
                No conducted events found
                {selectedCategory !== "All" ? ` in "${selectedCategory}"` : ""}.
              </p>
              <p className="text-xs text-muted mt-2">Conducted events with posters will appear here once archived by admins.</p>
              {selectedCategory !== "All" && (
                <button onClick={() => setSelectedCategory("All")} className="btn-ghost text-xs mt-4 mx-auto">
                  Clear filter
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <article
                  key={event.id}
                  className="card flex flex-col overflow-hidden p-0 group hover:border-forest/40 transition-all duration-300"
                >
                  {/* Poster */}
                  <div className="relative bg-mint-fog/30 border-b border-border overflow-hidden">
                    {event.image ? (
                      <button
                        onClick={() => setLightboxImage({ src: event.image, title: event.title })}
                        className="block w-full cursor-zoom-in"
                        aria-label={`View poster for ${event.title}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={event.image}
                          alt={`${event.title} poster`}
                          className="w-full h-56 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          loading="lazy"
                        />
                      </button>
                    ) : (
                      <div className="w-full h-56 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-mint-fog to-white">
                        <ImageIcon className="w-8 h-8 text-forest/20" />
                        <span className="text-xs font-medium text-forest/40">No poster added</span>
                        <span className="text-[11px] text-muted">Admin can upload poster</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge variant={categoryColors[event.category] ?? "default"}>
                        {categoryLabels[event.category] || event.category}
                      </Badge>
                    </div>
                    <span className="absolute top-3 right-3 text-[11px] font-semibold bg-white/95 backdrop-blur px-2.5 py-1 rounded-full border border-border shadow-sm text-forest">
                      Conducted
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="text-base font-bold text-dark-text leading-snug group-hover:text-forest transition-colors line-clamp-2">
                      {event.title}
                    </h2>
                    <p className="text-sm text-dark-text/65 mt-2.5 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>

                    <div className="mt-5 pt-3.5 border-t border-border space-y-2">
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
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 z-10 p-2 bg-white rounded-xl shadow border border-border hover:bg-mint-fog transition-colors cursor-pointer"
              aria-label="Close poster preview"
            >
              <X className="w-4 h-4 text-dark-text" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightboxImage.src} alt={lightboxImage.title} className="w-full max-h-[80vh] object-contain bg-white" />
            <div className="px-5 py-3 border-t border-border bg-white">
              <p className="text-sm font-bold text-dark-text">{lightboxImage.title}</p>
              <p className="text-xs text-muted">Event poster — click outside to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
