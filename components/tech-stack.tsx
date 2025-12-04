"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { motion } from "framer-motion";
import Section from "@/components/section";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cards, techInfo } from "@/lib/tech";

export default function TechStackSection() {
  const totalCards = cards.length;
  const initialIndex = Math.floor(totalCards / 2);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const touchOriginRef = useRef<{ x: number; y: number } | null>(null);
  const touchActiveRef = useRef(false);

  const wrapIndex = useCallback(
    (value: number) => {
      if (totalCards === 0) return 0;
      const mod = ((value % totalCards) + totalCards) % totalCards;
      return mod;
    },
    [totalCards]
  );

  const handleAdvance = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((prev) => wrapIndex(prev + direction));
    },
    [wrapIndex]
  );

  const handleWheel = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      if (!event.shiftKey) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 6) return;
      handleAdvance(delta > 0 ? 1 : -1);
    },
    [handleAdvance]
  );

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleAdvance(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleAdvance(-1);
      }
    },
    [handleAdvance]
  );

  const handleTouchStart = useCallback((event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchOriginRef.current = { x: touch.clientX, y: touch.clientY };
    touchActiveRef.current = false;
  }, []);

  const handleTouchMove = useCallback(
    (event: ReactTouchEvent<HTMLDivElement>) => {
      const start = touchOriginRef.current;
      if (!start) return;
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;

      if (!touchActiveRef.current) {
        if (Math.abs(dx) <= 12 && Math.abs(dy) <= 12) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          touchOriginRef.current = null;
          return;
        }
        touchActiveRef.current = true;
      }

      event.preventDefault();
      if (Math.abs(dx) >= 36) {
        handleAdvance(dx < 0 ? 1 : -1);
        touchOriginRef.current = { x: touch.clientX, y: touch.clientY };
      }
    },
    [handleAdvance]
  );

  const handleTouchEnd = useCallback(() => {
    touchOriginRef.current = null;
    touchActiveRef.current = false;
  }, []);

  const instructionsId = "tech-stack-carousel-instructions";

  return (
    <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
      <p id={instructionsId} className="sr-only">
        Swipe, hold shift while scrolling, or use the left and right arrow keys to explore each capability.
      </p>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Technical focus areas"
        aria-describedby={instructionsId}
        tabIndex={0}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="relative mt-10 flex h-[420px] w-full items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-[460px]"
      >
        <div className="pointer-events-none absolute inset-y-16 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-16 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-10 h-20 bg-gradient-to-b from-background/70 via-background/40 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-10 h-20 bg-gradient-to-t from-background/70 via-background/40 to-transparent" aria-hidden />
        <div className="relative h-full w-full max-w-5xl">
          {cards.map((card, index) => {
            let distance = index - activeIndex;
            if (distance > totalCards / 2) distance -= totalCards;
            if (distance < -totalCards / 2) distance += totalCards;

            const absDistance = Math.abs(distance);
            const translateX = distance * 220;
            const scale = 1 - Math.min(absDistance * 0.14, 0.42);
            const opacity = absDistance === 0 ? 1 : absDistance === 1 ? 0.6 : 0.22;
            const blur = Math.max(absDistance - 1, 0) * 2.5;
            const rotateY = distance * -5;
            const isActive = absDistance === 0;

            return (
              <motion.article
                key={card.title}
                className="absolute left-1/2 top-1/2 w-[min(88%,360px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/8 bg-card/85 p-6 shadow-[0_28px_80px_rgba(8,11,18,0.35)] backdrop-blur-md sm:w-[min(80%,400px)]"
                style={{
                  pointerEvents: isActive ? "auto" : "none",
                  zIndex: totalCards - absDistance,
                  filter: `blur(${blur}px)` as string,
                }}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  rotateY,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r ${card.gradient}`}
                />
                <CardContent card={card} index={index} isActive={isActive} />
              </motion.article>
            );
          })}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => handleAdvance(-1)}
          className="rounded-full border border-white/10 bg-secondary/60 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 transition hover:border-primary/40 hover:bg-secondary/80 hover:text-foreground"
        >
          Prev
        </button>
        <span className="text-xs font-medium uppercase tracking-[0.28em] text-foreground/45">
          Swipe · Shift+Scroll · Arrows
        </span>
        <button
          type="button"
          onClick={() => handleAdvance(1)}
          className="rounded-full border border-white/10 bg-secondary/60 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 transition hover:border-primary/40 hover:bg-secondary/80 hover:text-foreground"
        >
          Next
        </button>
      </div>
    </Section>
  );
}

type TechCardProps = {
  card: (typeof cards)[number];
  index: number;
  isActive: boolean;
};

function CardContent({ card, index, isActive }: TechCardProps) {
  return (
    <>
      <header className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-foreground/45">
            Capability {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">{card.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-secondary/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.26em] text-foreground/60">
          Core
        </span>
      </header>

      <p className={`mt-4 text-sm leading-relaxed ${isActive ? "text-foreground/75" : "text-foreground/55"}`}>
        {card.description}
      </p>

      <div className="relative z-10 mt-6 flex flex-wrap gap-2" aria-hidden={!isActive}>
        {card.techs.map((tech) => (
          <Tooltip key={tech} delayDuration={0}>
            <TooltipTrigger asChild>
              <span className={`inline-flex ${isActive ? "" : "pointer-events-none"}`}>
                <Badge
                  variant="outline"
                  className={`border-white/15 px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-secondary/55 text-foreground/80 hover:border-primary/40 hover:bg-secondary/70 hover:text-foreground"
                      : "bg-secondary/40 text-foreground/45"
                  }`}
                >
                  {tech}
                </Badge>
              </span>
            </TooltipTrigger>
            <TooltipContent sideOffset={6} className="max-w-[220px] text-xs leading-relaxed">
              {techInfo[tech] ?? `About ${tech}`}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </>
  );
}
