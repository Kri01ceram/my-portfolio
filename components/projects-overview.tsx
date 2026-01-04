"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/projects";

export default function ProjectsOverview() {
  return (
    <Section id="projects" title="Projects & Contributions" subtitle="Selected work with concise context and links">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[11px] tracking-[0.22em] text-muted-foreground">
                  CONTRIBUTION
                </span>
                <h3 className="mt-4 text-lg sm:text-xl font-normal text-foreground">{project.title}</h3>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-muted-foreground underline underline-offset-4 decoration-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <Link
                href={project.domain ? `/projects/${project.domain}` : "/projects"}
                className="inline-flex items-center gap-2 text-foreground/90 underline underline-offset-4 decoration-border hover:decoration-foreground/50"
              >
                View more <ArrowRight className="h-4 w-4" />
              </Link>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-foreground/90 underline underline-offset-4 decoration-border hover:decoration-foreground/50"
                >
                  View live URL <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
