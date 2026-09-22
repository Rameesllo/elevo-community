import type { Metadata } from "next";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of Elevo Community events and activities.",
};

const GALLERY_CATEGORIES = ["All", "Sports", "Cultural", "Social", "Events"];

const GALLERY_ITEMS = [
  { id: "g1", title: "Sports Meet 2023", category: "Sports", year: 2023, color: "#E8F5EF" },
  { id: "g2", title: "Onam Celebrations", category: "Cultural", year: 2023, color: "#D4EAE0" },
  { id: "g3", title: "Clean Drive 2023", category: "Social", year: 2023, color: "#C5E0D4" },
  { id: "g4", title: "Cricket Tournament", category: "Sports", year: 2023, color: "#B8D8C8" },
  { id: "g5", title: "Vishu Fest", category: "Cultural", year: 2023, color: "#E8F5EF" },
  { id: "g6", title: "Annual Meet", category: "Events", year: 2022, color: "#D4EAE0" },
  { id: "g7", title: "Football League", category: "Sports", year: 2022, color: "#C5E0D4" },
  { id: "g8", title: "Independence Day", category: "Social", year: 2022, color: "#B8D8C8" },
  { id: "g9", title: "Charity Run", category: "Social", year: 2022, color: "#E8F5EF" },
];

export default function GalleryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-sm bg-white border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">Gallery</div>
          <h1 className="text-dark-text mb-2">Our <span className="text-forest">Memories</span></h1>
          <p className="text-dark-text/60 max-w-xl">
            Relive the moments that make our community shine — sports, culture, and everything in between.
          </p>
        </div>
      </section>

      {/* Category filter (static for now) */}
      <section className="py-6 bg-white border-b border-border">
        <div className="container-main">
          <div className="flex flex-wrap gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                  ${cat === "All"
                    ? "bg-forest text-white border-forest"
                    : "bg-white text-dark-text/60 border-border hover:border-forest/40 hover:text-forest"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {GALLERY_ITEMS.map((item, i) => {
              const heights = ["h-48", "h-56", "h-64", "h-52", "h-60"];
              const h = heights[i % heights.length];
              return (
                <div
                  key={item.id}
                  className={`${h} break-inside-avoid rounded-2xl overflow-hidden border border-border group relative cursor-pointer`}
                  style={{ backgroundColor: item.color }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Camera className="w-8 h-8 text-forest/30" />
                    <span className="text-xs font-medium text-forest/40">{item.title}</span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-all duration-300 rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2">
                      <p className="text-xs font-semibold text-dark-text">{item.title}</p>
                      <p className="text-[10px] text-muted">{item.category} &bull; {item.year}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-muted mt-10">
            More photos coming soon — follow us on social media for real-time updates.
          </p>
        </div>
      </section>
    </div>
  );
}
