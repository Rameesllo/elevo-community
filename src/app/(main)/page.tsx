import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { TeamPreviewSection } from "@/components/sections/TeamPreviewSection";
import { WhyJoinSection } from "@/components/sections/WhyJoinSection";
import { AnnouncementsPreviewSection } from "@/components/sections/AnnouncementsPreviewSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Elevo Community — Home",
  description:
    "Elevo Community is a vibrant youth-led community organization in Kerala bringing youth together through sports, education, welfare, and culture.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. About community */}
      <AboutSection />

      {/* 3. Upcoming events */}
      <EventsSection />

      {/* 4. What we do */}
      <WhatWeDoSection />

      {/* 5. Team preview */}
      <TeamPreviewSection />

      {/* 6. Why join */}
      <WhyJoinSection />

      {/* 7. Latest announcements */}
      <AnnouncementsPreviewSection />

      {/* 8. CTA */}
      <CTASection />
    </>
  );
}
