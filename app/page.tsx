"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Section from "@/components/section";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

const cards = [
  {
    title: "Web Development",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Firebase", "PostgreSQL", "Framer Motion"],
  },
  {
    title: "ML Engineer",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Matplotlib"],
  },
  {
    title: "DevOps Engineer",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
  },
];

// Single source of truth for the animated border's full rotation duration (0 -> 360deg)
const BORDER_ROTATION_S = 12; // seconds
const CARD_ADVANCE_MS = (BORDER_ROTATION_S * 1000) / 4; // 90deg step
// Generate N points around a rectangle perimeter (clockwise), padded from edges
function rectAnchors(n: number, pad = 0.12) {
  const pts: { x: number; y: number }[] = [];
  for (let k = 0; k < n; k++) {
    const s = (k / n) * 4; // 0..4
    const span = 1 - 2 * pad;
    if (s < 1) {
      const u = s;
      pts.push({ x: pad + span * u, y: pad }); // top: left -> right
    } else if (s < 2) {
      const u = s - 1;
      pts.push({ x: 1 - pad, y: pad + span * u }); // right: top -> bottom
    } else if (s < 3) {
      const u = s - 2;
      pts.push({ x: 1 - pad - span * u, y: 1 - pad }); // bottom: right -> left
    } else {
      const u = s - 3;
      pts.push({ x: pad, y: 1 - pad - span * u }); // left: bottom -> top
    }
  }
  return pts;
}

// Distribute items per side (top, right, bottom, left) with equal spacing
function rectAnchorsSides(counts: [number, number, number, number], pad = 0.12) {
  const [top, right, bottom, left] = counts;
  const pts: { x: number; y: number }[] = [];
  const span = 1 - 2 * pad;

  const placeTop = (n: number) => {
    for (let i = 0; i < n; i++) {
      const u = (i + 1) / (n + 1);
      pts.push({ x: pad + span * u, y: pad });
    }
  };
  const placeRight = (n: number) => {
    for (let i = 0; i < n; i++) {
      const u = (i + 1) / (n + 1);
      pts.push({ x: 1 - pad, y: pad + span * u });
    }
  };
  const placeBottom = (n: number) => {
    for (let i = 0; i < n; i++) {
      const u = (i + 1) / (n + 1);
      pts.push({ x: 1 - pad - span * u, y: 1 - pad });
    }
  };
  const placeLeft = (n: number) => {
    for (let i = 0; i < n; i++) {
      const u = (i + 1) / (n + 1);
      pts.push({ x: pad, y: 1 - pad - span * u });
    }
  };

  placeTop(top);
  placeRight(right);
  placeBottom(bottom);
  placeLeft(left);
  return pts;
}

// Smart split across sides for N items
function rectAnchorsSmart(n: number, pad = 0.12) {
  const base = Math.floor(n / 4);
  const rem = n % 4;
  const counts: [number, number, number, number] = [base, base, base, base];
  for (let i = 0; i < rem; i++) counts[i] += 1; // distribute remainder to top/right/bottom/left
  return rectAnchorsSides(counts, pad);
}


export default function HomePage() {
  const [index, setIndex] = useState(0);
  // 3D tilt motion values for hero avatar
  const tiltX = useMotionValue(0); // rotateX
  const tiltY = useMotionValue(0); // rotateY
  const rX = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.5 });
  const rY = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.5 });
  const MAX_TILT = 16; // degrees

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -MAX_TILT; // invert vertical for natural feel
    const ry = ((x / rect.width) - 0.5) * MAX_TILT;
    tiltX.set(rx);
    tiltY.set(ry);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }
    // Measure container and title to compute precise line endpoints
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 550, h: 550 });
  const [titleBox, setTitleBox] = useState({ w: 240, h: 56 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setBox({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setTitleBox({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [index]);

  // Auto-advance when the border completes a 90° rotation
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % cards.length);
    }, CARD_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  // Card transition variants: radial reveal wipe
  const cardVariants = {
    initial: {
      opacity: 0,
      x: 30,
      scale: 0.99,
      filter: "blur(4px)",
    clipPath: "circle(0% at 50% 50%)",
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    clipPath: "circle(120% at 50% 50%)",
  transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -30,
      scale: 0.985,
      filter: "blur(6px)",
      clipPath: "circle(0% at 50% 50%)",
  transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
    },
  } as const;

  return (
    <>
      {/* HERO */}
  <section className="mx-auto max-w-[1400px] px-3 sm:px-5 lg:px-6 py-14 sm:py-16 lg:py-18">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid items-center gap-8 lg:gap-12 sm:grid-cols-2"
        >
          <div>
            <div className="relative inline-block pb-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gradient-brand">
                Hi, I&apos;m Krishna Singh
              </h1>
              <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 opacity-80" />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 left-0 h-[3px] w-16 rounded-full bg-white/60 mix-blend-overlay"
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-prose">
              Full-stack developer & ML data analyst. I build fast, delightful
              web experiences with Next.js, React, and modern tooling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-3.5">
              <a href="#projects" className="rounded-xl px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60">
                View Projects
              </a>
              <a href="#contact" className="rounded-xl px-5 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                Contact Me
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px] md:max-w-[450px] lg:max-w-[480px]" style={{ perspective: 1400 }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetTilt}
              whileHover={{ scale: 1.035 }}
              className="group relative aspect-square select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Base shadow disc behind (farther back) */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_65%,rgba(0,0,0,0.55),transparent_70%)] blur-2xl opacity-70"
                style={{ transform: "translateZ(-90px) scale(0.94)" }}
              />
              {/* Rotating gradient ring (mid plane) */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full p-[4px] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                style={{
                  background: "conic-gradient(from 0deg, #22d3ee, #3b82f6, #6366f1, #22d3ee)",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  filter: "brightness(1) saturate(1.05)",
                  transform: "translateZ(0px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                whileHover={{ filter: "brightness(1.25) saturate(1.25)" }}
              />
              {/* Glow aura that intensifies on hover */}
              <div
                aria-hidden
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.55), rgba(99,102,241,0.25) 45%, transparent 70%)",
                  transform: "translateZ(-40px)",
                }}
              />
              {/* Parallax highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-70 transition duration-700"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)",
                  mixBlendMode: "overlay",
                  transform: "translateZ(70px) rotateZ(0.0001deg)",
                }}
              />
              {/* Image container (front plane) */}
              <motion.div
                className="relative h-full w-full rounded-full overflow-hidden shadow-xl shadow-sky-900/10 ring-1 ring-white/20 dark:ring-white/10"
                style={{
                  rotateX: rX,
                  rotateY: rY,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(55px)",
                }}
              >
                <Image
                  src="/images/KRISHNA.png"
                  alt="Portrait of Krishna Singh"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full select-none"
                  draggable={false}
                  priority
                />
                {/* Inner subtle depth ring */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0) 65%)",
                    mixBlendMode: "soft-light",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" subtitle="A few things I have built recently">
        <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 items-stretch">
          {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
      </Section>

      {/* TECH STACK - FIXED */}
      <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
        <div className="relative w-full h-[520px] md:h-[560px] lg:h-[600px] flex items-center justify-center overflow-visible">

          {/* CARDS CONTAINER (measured) */}
          <div ref={containerRef} className="relative w-[500px] h-[500px] md:w-[520px] md:h-[520px] lg:w-[560px] lg:h-[560px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 will-change-[clip-path,transform,opacity,filter]"
              >
                <div className="w-full h-full rounded-3xl shadow-xl md:shadow-2xl relative overflow-visible border border-white/30 dark:border-white/10 bg-white/50 dark:bg-slate-900/30 backdrop-blur-xl">
                  {/* Animated border */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl p-[2px]">
                    <motion.div
                      className="h-full w-full rounded-[inherit]"
                      style={{
                        background:
                          "conic-gradient(from 90deg at 50% 50%, rgba(99,102,241,0.85), rgba(56,189,248,0.85), rgba(251,113,133,0.85), rgba(99,102,241,0.85))",
                        WebkitMask:
                          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        padding: "2px",
                      }}
                      animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: BORDER_ROTATION_S, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Background gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/8 via-violet-400/8 to-rose-400/8 dark:from-sky-400/4 dark:via-violet-400/4 dark:to-rose-400/4 rounded-3xl" />

                  {/* Floating glow blob */}
                  <motion.div
                    className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-fuchsia-500/25 blur-3xl"
                    animate={{ x: [0, 25, -10, 0], y: [0, -15, 20, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Subtle grid overlay (theme-aware) */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 hidden dark:block [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 dark:hidden [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

                  {/* Center title (absolute true center) */}
                  <motion.div
                    ref={titleRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full px-8 py-4 text-xl font-bold shadow-2xl text-white ${cards[index].gradient} border border-white/50 dark:border-white/30 shadow-[inset_0_0_0_1.25px_rgba(255,255,255,0.18)]`}
                  >
                    {cards[index].title}
                  </motion.div>

                  {/* Connecting lines (from title edge to item centers) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {(() => {
                      const cx = box.w / 2;
                      const cy = box.h / 2;
                      const rx = titleBox.w / 2 + 6; // little padding
                      const ry = titleBox.h / 2 + 6;

                      const anchors = index === 0
                        ? rectAnchorsSmart(cards[index].techs.length, 0.16)
                        : rectAnchors(cards[index].techs.length, 0.13);
          return anchors.map((a, j) => {
                        const tx = a.x * box.w;
                        const ty = a.y * box.h;
                        const ang = Math.atan2(ty - cy, tx - cx);
                        const x1 = cx + rx * Math.cos(ang);
                        const y1 = cy + ry * Math.sin(ang);

                        return (
                          <motion.line
                            key={j}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.75 }}
            transition={{ delay: 0.22 + j * 0.05, duration: 0.65 }}
                            x1={x1}
                            y1={y1}
                            x2={tx}
                            y2={ty}
                            stroke="url(#techGradient)"
                            strokeWidth="2.5"
                            strokeDasharray="8,4"
                          />
                        );
                      });
                    })()}
                    <defs>
                      <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Tech items aligned to the box edges */}
                  {(() => {
                    const anchors = index === 0
                      ? rectAnchorsSmart(cards[index].techs.length, 0.16)
                      : rectAnchors(cards[index].techs.length, 0.13);
        return cards[index].techs.map((tech, j) => {
                      const x = anchors[j].x * box.w;
                      const y = anchors[j].y * box.h;
                      return (
                        <motion.div
                          key={tech}
                           initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25 + j * 0.05, type: "spring", stiffness: 130, damping: 20 }}
                          whileHover={{ scale: 1.08, y: -2, boxShadow: "0 12px 40px rgba(59,130,246,0.25)" }}
                           className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/80 dark:bg-slate-800/80 text-[0.9rem] md:text-base font-semibold px-4 py-2.5 shadow-lg md:shadow-xl border border-slate-200 dark:border-slate-600 backdrop-blur"
                          style={{ left: x, top: y }}
                        >
                           <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,_#60a5fa,_#a78bfa,_#f472b6)] dark:bg-[linear-gradient(90deg,_#93c5fd,_#c4b5fd,_#f9a8d4)]">
                             {tech}
                           </span>
                        </motion.div>
                      );
                    });
                  })()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          

          
        </div>
      </Section>


      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Let's build something together">
    <div className="relative">
          <motion.div
      className="relative rounded-3xl border border-white/30 dark:border-white/10 bg-white/50 dark:bg-slate-900/30 backdrop-blur-xl overflow-hidden shadow-2xl"
      whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            {/* Static subtle outline (no rotating beam) */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 dark:ring-white/10" />

            {/* Background gradient wash to match brand */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/8 via-violet-400/8 to-rose-400/8 dark:from-sky-400/4 dark:via-violet-400/4 dark:to-rose-400/4 rounded-3xl" />

            {/* Floating glow */}
            <motion.div
              className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl"
              animate={{ x: [0, 25, -10, 0], y: [0, -15, 20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Subtle grid (theme-aware) */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 hidden dark:block [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 dark:hidden [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative p-5 sm:p-6">
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200">
                <span className="text-gradient-brand">Email:</span> <a className="font-medium underline underline-offset-4 decoration-sky-500/70 hover:decoration-sky-500" href="mailto:0.krishna1120@gmail.com">0.krishna1120@gmail.com</a>
              </p>
              <p className="mt-2.5 text-base sm:text-lg text-slate-700 dark:text-slate-200">
                <span className="text-gradient-brand">LinkedIn:</span> <a className="font-medium underline underline-offset-4 decoration-violet-500/70 hover:decoration-violet-500" href="https://www.linkedin.com/in/krishna-singh-172642323/" target="_blank" rel="noreferrer noopener">krishna-singh-172642323</a>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="mailto:0.krishna1120@gmail.com" className="rounded-xl px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60">
                  Say Hello
                </a>
                <a href="#projects" className="rounded-xl px-5 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                  See Projects
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}