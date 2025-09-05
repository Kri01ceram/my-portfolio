"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

type Props = { className?: string };

export default function Global3DBackground({ className = "" }: Props) {
  const { resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px), (pointer: coarse)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    // Ensure client and server markup match before animating
    setMounted(true);
  }, []);

  const palette = useMemo(() => {
    return resolvedTheme === "dark"
      ? ["#06b6d4", "#8b5cf6", "#f43f5e", "#f59e0b", "#22c55e"]
      : ["#22d3ee", "#a78bfa", "#fb7185", "#f59e0b", "#4ade80"];
  }, [resolvedTheme]);

  const blobCount = reduced ? 0 : isMobile ? 3 : 6;
  const blobs = useMemo(() => {
    return new Array(blobCount).fill(0).map((_, i) => {
      const size = isMobile ? 160 + (i % 3) * 40 : 220 + (i % 3) * 60;
      const dur = 12 + (i % 3) * 3;
      const color = palette[i % palette.length];
      const startX = (i * 17) % 100;
      const startY = (i * 29) % 100;
      const delta = isMobile ? 12 : 18;
      return { size, dur, color, startX, startY, delta };
    });
  }, [blobCount, isMobile, palette]);

  return (
    <div className={className} aria-hidden>
      {/* Base gradient wash */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_10%,rgba(99,102,241,0.25),transparent),radial-gradient(120%_120%_at_50%_90%,rgba(56,189,248,0.22),transparent)] dark:bg-[radial-gradient(120%_120%_at_50%_10%,rgba(99,102,241,0.18),transparent),radial-gradient(120%_120%_at_50%_90%,rgba(6,182,212,0.18),transparent)]" />

      {/* Soft aurora bands (no rotating beam) */}
  {mounted && !reduced && (
        <>
          <motion.div
            className="absolute inset-x-0 top-[10%] h-40 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(99,102,241,0.20), rgba(56,189,248,0.14), rgba(251,113,133,0.18))",
              filter: "blur(28px)",
              opacity: 0.8,
              maskImage: "radial-gradient(70%_100%_at_50%_50%, black, transparent)",
              WebkitMaskImage: "radial-gradient(70%_100%_at_50%_50%, black, transparent)",
            }}
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-[12%] h-48 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(34,197,94,0.18), rgba(99,102,241,0.14), rgba(245,158,11,0.16))",
              filter: "blur(32px)",
              opacity: 0.75,
              maskImage: "radial-gradient(70%_100%_at_50%_50%, black, transparent)",
              WebkitMaskImage: "radial-gradient(70%_100%_at_50%_50%, black, transparent)",
            }}
            animate={{ x: ["8%", "-8%", "8%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Glow blobs */}
      {mounted && !reduced && blobs.map((b, idx) => (
        <motion.div
          key={idx}
          className="absolute -z-10 rounded-full blur-3xl"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.startX}%`,
            top: `${b.startY}%`,
            background: `radial-gradient(circle at 30% 30%, ${b.color}66, ${b.color}22, transparent)`
          }}
          animate={{
            x: [0, b.delta * 10, -b.delta * 6, 0],
            y: [0, -b.delta * 8, b.delta * 10, 0],
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 -z-10 opacity-25 dark:opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />

      {/* Vignette for focus */}
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)]" />
    </div>
  );
}
