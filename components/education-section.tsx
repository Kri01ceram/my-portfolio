"use client";

import Section from "@/components/section";
import { achievements } from "@/lib/achievements";
import { Trophy } from "lucide-react";

export default function AchievementsSection() {
  return (
    <Section id="achievements" title="Achievements" subtitle="Selected wins, milestones, and consistent progress">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <article key={`${achievement.title}-${achievement.year}`} className="rounded-3xl border border-border bg-card p-6 sm:p-7">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.22em] text-muted-foreground">{achievement.year}</p>
                <h3 className="mt-2 text-lg sm:text-xl font-normal text-foreground">{achievement.title}</h3>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground" aria-hidden>
                <Trophy className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{achievement.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
