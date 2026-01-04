"use client";

import Section from "@/components/section";
import { experience } from "@/lib/experience";
import { Building2, MapPin } from "lucide-react";

export default function ExperienceSection() {
  return (
    <Section id="experience" title="Work Experience" subtitle="Timeline of roles and outcomes">
      <div className="space-y-10">
        {experience.map((item) => (
          <article key={item.id} className="grid gap-4 md:grid-cols-[160px,1fr]">
            <div className="text-sm text-muted-foreground">
              <div className="sticky top-[92px]">
                <p className="tracking-tight">
                  {item.start} — {item.end}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-normal text-foreground">{item.role}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> {item.company}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {item.location}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {item.highlights.map((h) => (
                  <li key={h} className="relative pl-4">
                    <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-border" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>

              {item.links && item.links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  {item.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="text-foreground/90 underline underline-offset-4 decoration-border hover:decoration-foreground/50"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
