"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/projects";

type DomainFilter = "web" | "ml";

const DOMAIN_OPTIONS: { value: DomainFilter; label: string }[] = [
  { value: "web", label: "Web" },
  { value: "ml", label: "AI / ML" },
];

const CATEGORY_LOOKUP: Record<string, { label: string; accent: string }> = {
  valuable: { label: "High Impact", accent: "from-cyan-400 to-teal-500" },
  practice: { label: "Practice", accent: "from-fuchsia-400 to-pink-500" },
  scaled: { label: "Scaled", accent: "from-amber-400 to-orange-500" },
};

export default function ProjectsOverview() {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>(DOMAIN_OPTIONS[0].value);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    const subset = projects.filter((project) => project.domain === domainFilter);
    return subset.length ? subset : projects;
  }, [domainFilter]);

  useEffect(() => {
    setSpotlightIndex(0);
  }, [domainFilter]);

  const spotlightProject = filteredProjects[spotlightIndex] ?? projects[0];
  const supportingProjects = filteredProjects.filter((_, index) => index !== spotlightIndex).slice(0, 4);

  return (
    <Section id="projects" title="Projects" subtitle="Dive into recent work without leaving the page">
      <div className="flex flex-wrap gap-2">
        {DOMAIN_OPTIONS.map((option) => {
          const isActive = domainFilter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setDomainFilter(option.value)}
              className={`relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                isActive
                  ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_25px_rgba(0,255,255,0.35)]"
                  : "border border-white/10 text-foreground/55 hover:text-foreground"
              }`}
            >
              <span className="text-[10px]">●</span>
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.9fr,1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/90 p-6 shadow-[0_30px_80px_rgba(5,8,12,0.55)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.2),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(255,0,255,0.16),transparent_55%)] opacity-70" />
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {spotlightProject && (
                <motion.div
                  key={spotlightProject.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-foreground/50">Spotlight</p>
                      <h3 className="mt-3 text-3xl font-semibold text-foreground">{spotlightProject.title}</h3>
                    </div>
                    {spotlightProject.category && (
                      <span
                        className={`inline-flex items-center rounded-full bg-gradient-to-r ${
                          CATEGORY_LOOKUP[spotlightProject.category]?.accent ?? "from-slate-500 to-slate-600"
                        } px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-black/80`}
                      >
                        {CATEGORY_LOOKUP[spotlightProject.category]?.label ?? spotlightProject.category}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-base text-foreground/75 max-w-2xl">{spotlightProject.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {spotlightProject.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-white/15 bg-white/5 text-xs text-foreground/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {spotlightProject.link && (
                      <a
                        href={spotlightProject.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40"
                      >
                        <ExternalLink className="h-4 w-4" /> Demo
                      </a>
                    )}
                    {spotlightProject.repo && (
                      <a
                        href={spotlightProject.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40"
                      >
                        <Github className="h-4 w-4" /> Repo
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-card/70 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-foreground/50">Choose another</p>
          <div className="flex flex-col gap-3">
            {supportingProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setSpotlightIndex(filteredProjects.findIndex((p) => p.title === project.title))}
                className="group text-left rounded-2xl border border-white/5 bg-white/5 p-3 transition hover:border-primary/30" 
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base font-semibold text-foreground">{project.title}</h4>
                  <span className="text-xs uppercase tracking-[0.3em] text-foreground/50">{project.domain}</span>
                </div>
                <p className="mt-1 text-sm text-foreground/65 line-clamp-2">{project.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.4em] text-foreground/45">Quick browse</p>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {filteredProjects.map((project, index) => (
            <motion.button
              key={project.title}
              type="button"
              onClick={() => setSpotlightIndex(index)}
              className={`min-w-[220px] rounded-2xl border px-4 py-3 text-left transition ${
                spotlightProject?.title === project.title
                  ? "border-primary/50 bg-primary/10"
                  : "border-white/10 bg-card/60 hover:border-primary/30"
              }`}
              whileHover={{ y: -2 }}
            >
              <p className="text-sm font-semibold text-foreground">{project.title}</p>
              <p className="text-xs text-foreground/55">{project.tags?.slice(0, 2).join(" · ")}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </Section>
  );
}
