"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import type { Achievement } from "@/lib/achievements";
import { achievements as data } from "@/lib/achievements";
import { cn } from "@/lib/utils";

const BASE_SPEED_DESKTOP = 80;
const BASE_SPEED_MOBILE = 55;

export default function CareerTrain({ achievements = data }: { achievements?: Achievement[] }) {
  const effectiveList = useMemo(() => achievements.filter(Boolean), [achievements]);
  const duplicated = useMemo(() => [...effectiveList, ...effectiveList], [effectiveList]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const progressValue = useMotionValue(0);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!cycleRef.current) return;
    const update = () => {
      const rect = cycleRef.current?.getBoundingClientRect();
      if (rect) setSegmentWidth(rect.width);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(cycleRef.current);
    return () => observer.disconnect();
  }, [duplicated.length]);

  useEffect(() => {
    if (!viewportRef.current) return;
    const update = () => {
      const rect = viewportRef.current?.getBoundingClientRect();
      if (rect) setViewportWidth(rect.width);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  const trainX = useTransform(progressValue, (fraction) => fraction * viewportWidth);

  useAnimationFrame((_, delta) => {
    if (!segmentWidth || isPaused || !effectiveList.length) return;
    const speed = viewportWidth >= 1024 ? BASE_SPEED_DESKTOP : BASE_SPEED_MOBILE;
    const movement = (speed * delta) / 1000;
    let next = x.get() - movement;
    if (next <= -segmentWidth) {
      next += segmentWidth;
    }
    x.set(next);
  });

  useMotionValueEvent(x, "change", (latest) => {
    if (!segmentWidth || !effectiveList.length) return;
    const normalized = ((-latest % segmentWidth) + segmentWidth) % segmentWidth;
    const progress = normalized / segmentWidth;
    progressValue.set(progress);
    const centeredProgress = (progress + (viewportWidth / 2) / segmentWidth) % 1;
    const index = Math.round(centeredProgress * (effectiveList.length - 1)) % effectiveList.length;
    setActiveIndex(index);
  });

  const handlePause = (state: boolean) => () => setIsPaused(state);

  if (!effectiveList.length) {
    return null;
  }

  const marquee = duplicated.map((achievement, index) => ({
    achievement,
    originIndex: index % effectiveList.length,
    key: `${achievement.id}-${index}`,
  }));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-card/80 px-4 py-9 shadow-[0_34px_90px_rgba(6,10,16,0.55)] sm:px-6 sm:py-11 lg:px-8 lg:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.05),transparent_55%),radial-gradient(circle_at_78%_24%,rgba(0,255,255,0.1),transparent_60%),radial-gradient(circle_at_50%_100%,rgba(3,7,12,0.75),transparent_65%)] opacity-80"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/12 via-transparent to-transparent" aria-hidden />

      <div className="relative text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-foreground/45">Career Journey</p>
        <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">Endless Momentum</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground/65 sm:text-base">
          A continuous train of achievements gliding across the track—pause to inspect, swipe to explore, or just watch the journey unfold.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-1/2 top-0 bottom-12 w-[58vw] max-w-[360px] -translate-x-1/2 rounded-[160px] bg-gradient-to-b from-white/12 via-transparent to-transparent blur-3xl" />

        <div
          ref={viewportRef}
          className="relative mx-auto mt-6 max-w-6xl overflow-hidden"
          onMouseEnter={handlePause(true)}
          onMouseLeave={handlePause(false)}
          onTouchStart={handlePause(true)}
          onTouchEnd={handlePause(false)}
        >
          <motion.div className="flex items-stretch gap-5" style={{ x }}>
            <div ref={cycleRef} className="flex items-stretch gap-5">
              {marquee.slice(0, marquee.length / 2).map(({ achievement, originIndex, key }) => (
                <MilestoneCard
                  key={key}
                  achievement={achievement}
                  isActive={originIndex === activeIndex}
                />
              ))}
            </div>
            <div className="flex items-stretch gap-5" aria-hidden>
              {marquee.slice(0, marquee.length / 2).map(({ achievement, originIndex, key }) => (
                <MilestoneCard
                  key={`${key}-clone`}
                  achievement={achievement}
                  isActive={originIndex === activeIndex}
                />
              ))}
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background via-background/80 to-transparent" />

          <div className="pointer-events-none absolute top-0 bottom-12 left-1/2 w-[320px] -translate-x-1/2 rounded-[160px] border border-white/5 bg-card/60" />
        </div>

        <div className="relative mx-auto mt-10 h-16 max-w-6xl">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/10" />
          <motion.div
            className="absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/80 via-primary/60 to-transparent shadow-[0_0_18px_rgba(0,255,255,0.3)]"
            style={{ width: trainX }}
          />
          <motion.div
            className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-primary/75 shadow-[0_0_20px_rgba(0,255,255,0.4)]"
            style={{ x: trainX }}
          >
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/25 blur-md" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type MilestoneCardProps = {
  achievement: Achievement;
  isActive: boolean;
};

function MilestoneCard({ achievement, isActive }: MilestoneCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative flex min-w-[72vw] max-w-[320px] flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-card/85 px-5 py-5 shadow-[0_22px_60px_rgba(7,12,20,0.45)] transition-all duration-300 sm:min-w-[300px]",
        isActive
          ? "border-primary/45 shadow-[0_32px_70px_-38px_rgba(0,255,255,0.35)]"
          : "hover:border-primary/25"
      )}
      whileHover={{ scale: 1.01, y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_-10%,rgba(255,255,255,0.08),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
      <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-foreground/55">
        <span>{achievement.date}</span>
        <span className="rounded-full border border-white/10 bg-secondary/70 px-2 py-0.5 text-[10px] text-foreground/55">Milestone</span>
      </div>
      <div className="relative z-10">
        <h4 className="text-lg font-semibold text-foreground sm:text-xl">{achievement.title}</h4>
        {achievement.description && (
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">{achievement.description}</p>
        )}
      </div>
    </motion.div>
  );
}
