"use client";

import Section from "@/components/section";
import { certifications, primaryEducation } from "@/lib/education";
import { ArrowUpRight, FileText } from "lucide-react";

export default function EducationSection() {
  return (
    <Section id="education" title="Education & Certifications" subtitle="Formal education and continuing learning">
      <div className="grid gap-6">
        <article className="rounded-3xl border border-border bg-card p-6 sm:p-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-normal text-foreground">{primaryEducation.degree}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{primaryEducation.institution}</p>
              <p className="mt-1 text-sm text-muted-foreground">{primaryEducation.year}</p>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground" aria-hidden>
              <FileText className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">{primaryEducation.description}</p>
          {primaryEducation.href && (
            <a
              href={primaryEducation.href}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/90 underline underline-offset-4 decoration-border hover:decoration-foreground/50"
            >
              View details <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <article key={`${c.title}-${c.year}`} className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h4 className="text-base font-normal text-foreground">{c.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{c.platform}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.year}</p>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground" aria-hidden>
                  <FileText className="h-4 w-4" />
                </span>
              </div>
              {c.description && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.description}</p>}
              {c.href && (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-foreground/90 underline underline-offset-4 decoration-border hover:decoration-foreground/50"
                >
                  Document <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
