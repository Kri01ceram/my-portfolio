"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import type { Achievement } from "@/lib/achievements";
import { achievements as data } from "@/lib/achievements";
import { cn } from "@/lib/utils";

const clampProgress = (value: number) => Math.min(Math.max(value, 0), 1);

export default function CareerTrain({ achievements = data }: { achievements?: Achievement[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSegments = Math.max(achievements.length - 1, 1);

  const backgroundLayers = useMemo(
    () => [
      "radial-gradient(circle at 12% 18%, rgba(0,255,255,0.18), transparent 55%)",
      "radial-gradient(circle at 82% 16%, rgba(255,0,255,0.16), transparent 55%)",
      "radial-gradient(circle at 48% 88%, rgba(151,71,255,0.18), transparent 55%)",
    ],
    []
  );

  const floatVariants = useMemo(
    () => [
      {
        animate: { y: [-6, 6, -6], rotate: [-1, 1, -1] },
        transition: { duration: 10, repeat: Infinity, ease: [0.6, 0, 0.4, 1] as const },
      },
      {
        animate: { y: [-4, 4, -4], rotate: [0.5, -0.5, 0.5] },
        transition: { duration: 12, repeat: Infinity, ease: [0.6, 0, 0.4, 1] as const },
      },
      {
        animate: { y: [-8, 5, -8], rotate: [-0.8, 0.8, -0.8] },
        transition: { duration: 9, repeat: Infinity, ease: [0.6, 0, 0.4, 1] as const },
      },
    ],
    []
  );

  const progressSpring = useSpring(0, { stiffness: 140, damping: 26, mass: 0.6 });

  useEffect(() => {
    const target = clampProgress(activeIndex / totalSegments);
    progressSpring.set(target);
  }, [activeIndex, totalSegments, progressSpring]);

  const trackProgress = useTransform(progressSpring, (value) => `${clampProgress(value) * 100}%`);
  const trainPosition = useTransform(progressSpring, (value) => `${clampProgress(value) * 100}%`);

  const handleInView = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? prev : index));
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 backdrop-blur-2xl">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ backgroundImage: backgroundLayers.join(",") }}
        aria-hidden
      />

      <div className="relative">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Career Journey</p>
          <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Milestones On Track</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60 sm:text-base">
            Follow the highlights of my professional path as the train glides smoothly from one milestone to the next.
          </p>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-10">
            <div className="absolute left-5 top-4 bottom-4 w-[2px] rounded-full bg-white/12" />
            <motion.div
              className="absolute left-5 top-4 w-[2px] rounded-full bg-gradient-to-b from-cyan-300 via-cyan-200 to-fuchsia-400 shadow-[0_0_18px_rgba(0,255,255,0.45)]"
              style={{ height: trackProgress }}
            />
            <motion.div
              className="absolute left-5 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80 bg-cyan-300/85 shadow-[0_0_20px_rgba(0,255,255,0.6)]"
              style={{ top: trainPosition }}
            />

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={achievement.id} className="relative">
                  <span
                    className={cn(
                      "absolute left-5 top-5 h-3 w-3 -translate-x-1/2 rounded-full border border-white/20 transition-colors duration-300",
                      index <= activeIndex
                        ? "border-cyan-200/80 bg-cyan-300 shadow-[0_0_12px_rgba(0,255,255,0.7)]"
                        : "bg-white/12"
                    )}
                  />
                  <MilestoneCard
                    achievement={achievement}
                    index={index}
                    variant="vertical"
                    isActive={index === activeIndex}
                    onInView={handleInView}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative px-6">
            <div className="relative flex items-start justify-between gap-6">
              {achievements.map((achievement, index) => {
                const animation = floatVariants[index % floatVariants.length];
                return (
                  <motion.div
                    key={achievement.id}
                    className="relative flex min-w-[240px] flex-1 flex-col items-center gap-6"
                    animate={animation.animate}
                    transition={animation.transition}
                  >
                    <MilestoneCard
                      achievement={achievement}
                      index={index}
                      variant="horizontal"
                      isActive={index === activeIndex}
                      onInView={handleInView}
                    />
                    <div className="h-10 w-px rounded-full bg-white/12" />
                  </motion.div>
                );
              })}
            </div>

            <div className="relative mt-6 h-16">
              <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/12" />
              <motion.div
                className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-fuchsia-400 shadow-[0_0_18px_rgba(0,255,255,0.45)]"
                style={{ width: trackProgress }}
              />
              {achievements.map((_, index) => (
                <div key={index} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(index / totalSegments) * 100}%` }}>
                  <span
                    className={cn(
                      "relative block h-3 w-3 -translate-x-1/2 rounded-full border border-white/20 transition-colors duration-300",
                      index <= activeIndex
                        ? "border-cyan-200/80 bg-cyan-300 shadow-[0_0_12px_rgba(0,255,255,0.7)]"
                        : "bg-white/12"
                    )}
                  >
                    <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-cyan-300/25 blur-md" />
                  </span>
                </div>
              ))}
              <motion.div
                className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80 bg-cyan-300/85 shadow-[0_0_20px_rgba(0,255,255,0.6)]"
                style={{ left: trainPosition }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MilestoneCardProps = {
  achievement: Achievement;
  index: number;
  variant: "horizontal" | "vertical";
  isActive: boolean;
  onInView: (index: number) => void;
};

function MilestoneCard({ achievement, index, variant, isActive, onInView }: MilestoneCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    amount: 0.45,
    margin: variant === "horizontal" ? "-20% 0px -35% 0px" : "-25% 0px -25% 0px",
  });

  useEffect(() => {
    if (isInView) onInView(index);
  }, [isInView, index, onInView]);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group/card relative w-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-4 backdrop-blur-xl transition-all duration-300",
        isActive
          ? "border-cyan-300/70 shadow-[0_32px_60px_-32px_rgba(0,255,255,0.55)]"
          : "shadow-[0_24px_50px_-40px_rgba(0,0,0,0.75)]",
        variant === "vertical" ? "ml-4" : "max-w-[320px]"
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(0,255,255,0.2),transparent_60%),radial-gradient(circle_at_80%_120%,rgba(255,0,255,0.18),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-80" />
      <div className="relative z-10">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/50">
          <span>{achievement.date}</span>
          <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/45">Milestone</span>
        </div>
        <h4 className="mt-3 text-lg font-semibold text-white sm:text-xl">{achievement.title}</h4>
        {achievement.description && (
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {achievement.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
