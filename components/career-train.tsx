"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import type { Achievement } from "@/lib/achievements";
import { achievements as data } from "@/lib/achievements";

// Simple locomotive SVG
function TrainIcon({ className = "w-14 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 48" className={className + " text-slate-800 dark:text-slate-200"} fill="currentColor">
      <rect x="4" y="14" width="50" height="20" rx="4" />
      <rect x="46" y="10" width="16" height="24" rx="4" />
      <circle cx="18" cy="38" r="6" />
      <circle cx="38" cy="38" r="6" />
      <circle cx="58" cy="38" r="6" />
      <rect x="10" y="18" width="12" height="8" rx="1.5" fill="currentColor" />
      <rect x="26" y="18" width="12" height="8" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export default function CareerTrain({ achievements = data }: { achievements?: Achievement[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });

  // Measure height for vertical travel
  const [h, setH] = useState(400);
  const [trainH, setTrainH] = useState(80);
  const trainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setH(entry.contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const tr = trainRef.current;
    if (!tr) return;
    setTrainH(tr.getBoundingClientRect().height);
  }, []);

  const yPx = useTransform(smooth, [0, 1], [0, Math.max(0, h - trainH)]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    const n = achievements.length;
    const idx = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActive(idx);
  });

  const denom = Math.max(1, achievements.length - 1);

  return (
    <div ref={targetRef} className="relative w-full">
      {/* Vertical track (short and compact) */}
      <div className="relative h-[360px] sm:h-[420px] overflow-visible">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] rounded bg-slate-400/70 dark:bg-slate-600/70" />

        {/* Stations with alternating side labels */}
        {achievements.map((a, i) => {
          const pct = (i / denom) * 100;
          const reached = i <= active;
          const isLeft = i % 2 === 0;
          return (
            <div key={a.id} className="absolute left-1/2 -translate-x-1/2" style={{ top: `${pct}%` }}>
              {/* Dot */}
              <div className={`h-3 w-3 rounded-full ring-2 ${reached ? "bg-slate-800 ring-slate-500 dark:bg-white dark:ring-slate-400" : "bg-slate-300 ring-slate-200 dark:bg-slate-700 dark:ring-slate-600"}`} />
              {/* Connector line to label */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-[2px] ${isLeft ? "right-[calc(50%+6px)] w-16" : "left-[calc(50%+6px)] w-16"} bg-slate-300/70 dark:bg-slate-600/70`}
              />
              {/* Label bubble */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "right-[calc(50%+72px)] text-right" : "left-[calc(50%+72px)]"}`}
              >
                <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 shadow-sm">
                  <div className="text-[0.8rem] font-semibold text-slate-900 dark:text-slate-100">{a.title}</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300">{a.date}</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Train moving vertically */}
        <motion.div
          ref={trainRef}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ y: yPx }}
        >
          <div className="flex flex-col items-center">
            <div className="rotate-90">
              <TrainIcon />
            </div>
            <div className="mt-1 h-4 w-2 rounded-full bg-black/10 blur-[1px] dark:bg-white/10" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
