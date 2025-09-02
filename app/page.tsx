"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/section";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

const cards = [
  {
    title: "Web Development",
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Prisma", "PostgreSQL", "Framer Motion"],
  },
  {
    title: "ML Engineer",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-600",
    techs: ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Matplotlib"],
  },
  {
    title: "DevOps Engineer",
    gradient: "bg-gradient-to-r from-orange-500 to-red-600",
    techs: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
  },
];
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

  // Auto-advance cards every 2 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % cards.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 sm:grid-cols-2 items-center"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Hi, I&apos;m Krishna Singh
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Full-stack developer & ML data analyst. I build fast, delightful
              web experiences with Next.js, React, and modern tooling.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#projects" className="rounded-2xl px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                View Projects
              </a>
              <a href="#contact" className="rounded-2xl px-4 py-2 border border-slate-300 dark:border-slate-700">
                Contact Me
              </a>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-square rounded-2xl overflow-hidden shadow-inner"
          >
            <Image
              src="/images/KRISHNA.jpg"
              alt="My Picture"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" subtitle="A few things I have built recently">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
      </Section>

      {/* TECH STACK - FIXED */}
  <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
  <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden">

          {/* CARDS CONTAINER (measured) */}
          <div ref={containerRef} className="relative w-[550px] h-[550px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ x: 400, opacity: 0, rotateY: 90 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                exit={{ x: -400, opacity: 0, rotateY: -90 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.8 }}
                className="absolute inset-0"
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl shadow-2xl relative overflow-visible border border-slate-700">
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl" />

                  {/* Center title (absolute true center) */}
                  <motion.div
                    ref={titleRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full px-8 py-4 text-xl font-bold shadow-2xl text-white ${cards[index].gradient} border border-white/20`}
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
                            transition={{ delay: 0.25 + j * 0.06, duration: 0.8 }}
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
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.35 + j * 0.06, type: "spring", stiffness: 400, damping: 18 }}
                          whileHover={{ scale: 1.08, y: -2, boxShadow: "0 12px 40px rgba(59,130,246,0.35)" }}
                          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-700/90 text-white text-sm font-semibold px-4 py-2 shadow-xl border border-slate-500 backdrop-blur"
                          style={{ left: x, top: y }}
                        >
                          {tech}
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
        <p className="text-slate-600 dark:text-slate-300">
          Email: <a className="underline" href="mailto:0.krishna1120@gmail.com">0.krishna1120@gmail.com</a>
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          LinkedIn: <a className="underline" href="https://www.linkedin.com/in/krishna-singh-172642323/" target="_blank">krishna-singh-172642323</a>
        </p>
      </Section>
    </>
  );
}