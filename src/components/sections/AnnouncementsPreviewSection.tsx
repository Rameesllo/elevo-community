import Link from "next/link";
import { Bell, Calendar, ArrowRight, AlertCircle } from "lucide-react";
import { MOCK_ANNOUNCEMENTS } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";

const categoryVariant: Record<string, "forest" | "default" | "outline"> = {
  Urgent: "forest",
  Event: "forest",
  Meeting: "default",
  Notice: "outline",
  General: "outline",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function AnnouncementsPreviewSection() {
  const latestAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 3);

  return (
    <section className="section bg-white border-b border-border">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-tag mb-4">Official Bulletin</div>
            <h2 className="text-dark-text">
              Latest <span className="text-forest">Announcements</span>
            </h2>
            <p className="mt-2 text-dark-text/60 max-w-lg">
              Important updates, general body notices, and community news from Elevo.
            </p>
          </div>
          <Link href="/announcements" className="btn-secondary gap-2 flex-shrink-0 self-start sm:self-auto">
            View All Announcements
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Announcements List / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestAnnouncements.map((item) => (
            <article
              key={item.id}
              className="card flex flex-col justify-between group hover:border-forest/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <Badge variant={categoryVariant[item.category] || "default"}>
                    {item.category}
                  </Badge>
                  {item.important && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                      <AlertCircle className="w-3 h-3 text-rose-600" />
                      Priority
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-dark-text group-hover:text-forest transition-colors leading-snug mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-dark-text/60 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-forest" />
                  <span>{formatDate(item.date)}</span>
                </div>
                <Link
                  href="/announcements"
                  className="font-semibold text-forest hover:underline inline-flex items-center gap-1 text-xs"
                >
                  Read More
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
