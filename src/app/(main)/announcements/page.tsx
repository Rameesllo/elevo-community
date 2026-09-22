"use client";

import { useState } from "react";
import { Calendar, AlertCircle, Bell, Tag, ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { MOCK_ANNOUNCEMENTS } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const categories = ["All", "Urgent", "Event", "Meeting", "Notice", "General"] as const;

const categoryVariant: Record<string, "forest" | "default" | "outline"> = {
  Urgent: "forest",
  Event: "forest",
  Meeting: "default",
  Notice: "outline",
  General: "outline",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AnnouncementsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>("a1");

  const filtered =
    activeCategory === "All"
      ? MOCK_ANNOUNCEMENTS
      : MOCK_ANNOUNCEMENTS.filter((item) => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="section-sm bg-white border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">Official Bulletin</div>
          <h1 className="text-dark-text mb-3">
            Community <span className="text-forest">Announcements</span>
          </h1>
          <p className="text-dark-text/60 max-w-2xl text-base sm:text-lg leading-relaxed">
            Official notices, event circulars, meeting agendas, and emergency public announcements
            issued by the Elevo Community leadership.
          </p>
        </div>
      </section>

      {/* Main List Area */}
      <section className="section">
        <div className="container-main">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-border">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? MOCK_ANNOUNCEMENTS.length
                  : MOCK_ANNOUNCEMENTS.filter((a) => a.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                    activeCategory === cat
                      ? "bg-forest text-white shadow-sm"
                      : "bg-mint-fog/60 text-dark-text/70 hover:bg-mint-fog hover:text-forest"
                  )}
                >
                  {cat}
                  <span className="ml-2 text-xs opacity-75 font-normal">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Announcements list */}
          <div className="space-y-4 max-w-4xl">
            {filtered.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-muted text-sm">No announcements found in this category.</p>
              </div>
            ) : (
              filtered.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <article
                    key={item.id}
                    className={cn(
                      "card transition-all duration-300 cursor-pointer",
                      item.important && "border-forest/40 bg-mint-fog/20",
                      isExpanded && "shadow-card-hover border-forest/50"
                    )}
                    onClick={() => toggleExpand(item.id)}
                  >
                    {/* Card Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={categoryVariant[item.category] || "default"}>
                          {item.category}
                        </Badge>
                        {item.important && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            Priority Notice
                          </span>
                        )}
                        {item.badge && (
                          <span className="text-[11px] font-semibold text-forest bg-mint-fog px-2.5 py-0.5 rounded-full border border-border">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Calendar className="w-3.5 h-3.5 text-forest" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-lg sm:text-xl font-bold text-dark-text leading-snug hover:text-forest transition-colors">
                        {item.title}
                      </h2>
                      <button
                        type="button"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                        className="p-1.5 rounded-lg text-muted hover:text-forest hover:bg-mint-fog transition-colors flex-shrink-0"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-dark-text/70 mt-2 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Expandable full content */}
                    {isExpanded && (
                      <div className="mt-5 pt-4 border-t border-border animate-fade-in text-sm text-dark-text/80 leading-relaxed bg-white/70 p-4 rounded-xl">
                        <p>{item.content}</p>
                        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted">
                          <span>Official release by Elevo Executive Secretariat</span>
                          <span className="text-forest font-semibold">Ref: ELEVO-{item.id.toUpperCase()}</span>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
