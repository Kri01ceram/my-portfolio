"use client";

import Section from "@/components/section";
import AchievementsBelt from "@/components/achievements-belt";
import { achievements } from "@/lib/achievements";

export default function AchievementsSection() {
  return (
    <Section id="achievements" title="Achievements" subtitle="Hover to pause and see details">
      <div className="mt-4 md:mt-6">
        <AchievementsBelt items={achievements} />
      </div>
    </Section>
  );
}
