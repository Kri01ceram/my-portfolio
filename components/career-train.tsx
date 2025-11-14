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
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-14 backdrop-blur-2xl">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 12% 18%, rgba(0,255,255,0.18), transparent 55%)",
            "radial-gradient(circle at 82% 16%, rgba(255,0,255,0.16), transparent 55%)",
            "radial-gradient(circle at 48% 88%, rgba(151,71,255,0.18), transparent 55%)",
          ].join(","),
        }}
        aria-hidden
      />

      <div className="relative text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Career Journey</p>
        <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Endless Momentum</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60 sm:text-base">
          A continuous train of achievements gliding across the track—pause to inspect, swipe to explore, or just watch the journey unfold.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-1/2 top-0 bottom-12 w-[58vw] max-w-[380px] -translate-x-1/2 rounded-[160px] bg-gradient-to-b from-cyan-300/12 via-cyan-200/6 to-transparent blur-3xl" />

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

          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0D1117] via-[#0D1117]/80 to-transparent" />

          <div className="pointer-events-none absolute top-0 bottom-12 left-1/2 w-[340px] -translate-x-1/2 rounded-[160px] border border-white/10 bg-white/[0.015] shadow-[0_45px_80px_-60px_rgba(0,255,255,0.45)]" />
        </div>

        <div className="relative mx-auto mt-10 h-16 max-w-6xl">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/12" />
          <motion.div
            className="absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-fuchsia-400 shadow-[0_0_18px_rgba(0,255,255,0.45)]"
            style={{ width: trainX }}
          />
          <motion.div
            className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80 bg-cyan-300/85 shadow-[0_0_22px_rgba(0,255,255,0.65)]"
            style={{ x: trainX }}
          >
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-cyan-300/30 blur-md" />
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
        "group relative flex min-w-[72vw] max-w-[320px] flex-col gap-3 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] px-5 py-5 backdrop-blur-2xl transition-all duration-300 sm:min-w-[300px]",
        isActive
          ? "border-cyan-300/70 shadow-[0_32px_70px_-32px_rgba(0,255,255,0.55)]"
          : "shadow-[0_24px_50px_-40px_rgba(0,0,0,0.75)]"
      )}
      whileHover={{ scale: 1.01, y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(0,255,255,0.2),transparent_60%),radial-gradient(circle_at_80%_120%,rgba(255,0,255,0.18),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-80" />
      <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/50">
        <span>{achievement.date}</span>
        <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/45">Milestone</span>
      </div>
      <div className="relative z-10">
        <h4 className="text-lg font-semibold text-white sm:text-xl">{achievement.title}</h4>
        {achievement.description && (
          <p className="mt-2 text-sm leading-relaxed text-white/70">{achievement.description}</p>
        )}
      </div>
    </motion.div>
  );
}
