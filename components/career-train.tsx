"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import type { Achievement } from "@/lib/achievements";
import { achievements as data } from "@/lib/achievements";

// Professional, minimal vertical timeline with progress and a compact indicator

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
  const progressH = useTransform(yPx, (v) => Math.max(0, v + trainH * 0.4));

  const [active, setActive] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    const n = achievements.length;
    const idx = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActive(idx);
  });

  const denom = Math.max(1, achievements.length - 1);

  return (
    <div ref={targetRef} className="relative w-full">
      {/* Vertical track (more compact) */}
      <div className="relative h-[260px] sm:h-[320px] overflow-visible">
        {/* Base track */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] rounded bg-slate-200" />
        {/* Progress fill */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded bg-slate-900"
          style={{ height: progressH }}
        />

        {/* Stations with alternating side labels */}
        {achievements.map((a, i) => {
          const pct = (i / denom) * 100;
          const reached = i <= active;
          const isLeft = i % 2 === 0;
          return (
            <div key={a.id} className="absolute left-1/2 -translate-x-1/2" style={{ top: `${pct}%` }}>
              {/* Dot */}
              <div className={`h-2.5 w-2.5 rounded-full ring-2 ${reached ? "bg-slate-900 ring-slate-500" : "bg-white ring-slate-300"}`} />
              {/* Connector line to label */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-px ${isLeft ? "right-[calc(50%+6px)] w-14 sm:w-16" : "left-[calc(50%+6px)] w-14 sm:w-16"} bg-slate-200`}
              />
              {/* Label bubble */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "right-[calc(50%+70px)] text-right" : "left-[calc(50%+70px)]"}`}
              >
                <div className="group rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm max-w-[240px]" title={a.description || a.title}>
                  <div className="text-[0.82rem] font-semibold text-slate-900 truncate">{a.title}</div>
                  <div className="text-[10px] text-slate-500">{a.date}</div>
                  {/* Hover-reveal summary */}
                  {(a.description || a.title) && (
                    <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-[max-height] duration-300 ease-out">
                      <div className="pt-1 text-[11px] leading-relaxed text-slate-600 translate-y-[-4px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                        {a.description || `More about ${a.title}.`}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Minimal current-position indicator */}
        <motion.div ref={trainRef} className="absolute left-1/2 -translate-x-1/2" style={{ y: yPx }}>
          <div className="relative flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-slate-900 ring-3 ring-slate-100 shadow-sm" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
