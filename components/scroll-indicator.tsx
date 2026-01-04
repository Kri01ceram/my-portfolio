"use client";

import { useEffect, useMemo, useState } from "react";

export type ScrollSection = {
  id: string;
  label: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollIndicator({ sections }: { sections: ScrollSection[] }) {
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const maxScroll = Math.max(1, docHeight - viewHeight);
      setProgress(clamp(scrollTop / maxScroll, 0, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0]?.target as HTMLElement | undefined;
        if (top?.id) setActiveId(top.id);
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.08, 0.15, 0.25, 0.4, 0.6],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sectionIds]);

  if (sections.length === 0) return null;

  return (
    <aside className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40" aria-label="Section progress">
      <div className="relative flex items-center">
        <div className="relative h-[220px] w-px bg-border">
          <div
            className="absolute left-0 top-0 w-px bg-foreground/70"
            style={{ height: `${Math.round(progress * 220)}px` }}
            aria-hidden
          />
        </div>

        <nav className="ml-4 flex flex-col gap-3">
          {sections.map((s) => {
            const isActive = s.id === activeId;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={
                  "group inline-flex items-center gap-2 text-xs tracking-wide transition" +
                  (isActive ? " text-foreground" : " text-muted-foreground hover:text-foreground")
                }
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full transition-colors" +
                    (isActive ? " bg-foreground" : " bg-border group-hover:bg-foreground/70")
                  }
                  aria-hidden
                />
                {s.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
