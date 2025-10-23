"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import type { Achievement } from "@/lib/achievements";
import { achievements as data } from "@/lib/achievements";

// Simple locomotive SVG
function TrainIcon({ className = "w-14 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 48" className={className} fill="none">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect x="4" y="14" width="50" height="20" rx="4" fill="url(#g)" opacity="0.9" />
      <rect x="46" y="10" width="16" height="24" rx="4" fill="url(#g)" />
      <circle cx="18" cy="38" r="6" fill="#0ea5e9" />
      <circle cx="38" cy="38" r="6" fill="#0ea5e9" />
      <circle cx="58" cy="38" r="6" fill="#0ea5e9" />
      <rect x="10" y="18" width="12" height="8" rx="1.5" fill="white" opacity="0.85" />
      <rect x="26" y="18" width="12" height="8" rx="1.5" fill="white" opacity="0.85" />
    </svg>
  );
}

export default function CareerTrain({ achievements = data }: { achievements?: Achievement[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });

  const [w, setW] = useState(800);
  const [trainW, setTrainW] = useState(80);
  const trainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setW(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const tr = trainRef.current;
    if (!tr) return;
    setTrainW(tr.getBoundingClientRect().width);
  }, []);

  const xPx = useTransform(smooth, [0, 1], [0, Math.max(0, w - trainW)]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    const n = achievements.length;
    const idx = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActive(idx);
  });

  return (
    <div ref={targetRef} className="relative w-full">
      {/* Track */}
      <div className="relative h-[220px] sm:h-[260px] lg:h-[300px] overflow-visible">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded bg-gradient-to-r from-sky-400/70 via-blue-500/70 to-indigo-500/70" />

        {/* Stations */}
        {achievements.map((a, i) => {
          const pct = (i / (achievements.length - 1)) * 100;
          const reached = i <= active;
          return (
            <div key={a.id} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${pct}%` }}>
              <div className="-translate-x-1/2 flex flex-col items-center gap-2">
                <div className={`h-3 w-3 rounded-full ring-2 ${reached ? "bg-blue-500 ring-blue-300" : "bg-slate-300 ring-slate-200 dark:bg-slate-700 dark:ring-slate-600"}`} />
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  {a.date}
                </div>
              </div>
            </div>
          );
        })}

        {/* Train */}
        <motion.div
          ref={trainRef}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ x: xPx }}
        >
          <div className="flex flex-col items-center">
            <TrainIcon />
            <div className="mt-1 h-1.5 w-16 rounded-full bg-black/15 blur-[2px] dark:bg-white/10" />
          </div>
        </motion.div>

        {/* Active achievement card */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={achievements[active]?.id}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="absolute left-1/2 top-[10%] -translate-x-1/2 sm:top-[12%]"
          >
            <div className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-xl px-4 py-3 sm:px-5 sm:py-4 max-w-[88vw] sm:max-w-[620px]">
              <div className="flex items-start gap-3">
                <div className="text-2xl leading-none">
                  {achievements[active]?.icon ?? "🎯"}
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">{achievements[active]?.title}</div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{achievements[active]?.date}</div>
                  <div className="mt-1.5 text-sm sm:text-base text-slate-700/90 dark:text-slate-300/90">
                    {achievements[active]?.description}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
