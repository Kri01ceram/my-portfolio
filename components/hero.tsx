"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const ROLES = ["Developer", "Freelancer", "Engineer", "Problem Solver", "Creator"];

export default function Hero() {
  // Typewriter state
  const [displayText, setDisplayText] = useState(ROLES[0]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"erase"|"type"|"pause">("pause");
  const eraseSpeed = 50;
  const typeSpeed = 60;
  const pauseDuration = 1500;
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const run = () => {
      if (phase === "pause") {
        timeoutRef.current = window.setTimeout(() => setPhase("erase"), pauseDuration);
        return;
      }
      if (phase === "erase") {
        if (displayText.length === 0) {
          setPhase("type");
          setRoleIndex((i) => (i + 1) % ROLES.length);
          return;
        }
        timeoutRef.current = window.setTimeout(() => {
          setDisplayText((t) => t.slice(0, -1));
        }, eraseSpeed);
        return;
      }
      if (phase === "type") {
        const next = ROLES[roleIndex];
        if (displayText === next) {
          setPhase("pause");
          return;
        }
        timeoutRef.current = window.setTimeout(() => {
          setDisplayText(next.slice(0, displayText.length + 1));
        }, typeSpeed);
      }
    };
    run();
    return () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); };
  }, [phase, displayText, roleIndex]);

  // Initialize pause phase after mount
  useEffect(() => { setPhase("erase"); }, []);
  return (
  <section className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-14 sm:py-16 lg:py-18">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid items-center gap-8 lg:gap-12 sm:grid-cols-2"
        style={{
          gridTemplateColumns: 'minmax(0,1fr) minmax(320px,480px)'
        }}
      >
        <div>
          <div className="relative inline-block pb-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground text-left space-y-1">
              <span className="block">Hi,</span>
              <span className="block">I&apos;m Krishna Singh</span>
            </h1>
            <div className="mt-3 h-8 flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-500 font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight">
                {displayText}
                <span className="ml-1 inline-block w-4 h-6 align-middle bg-gradient-to-b from-cyan-400 to-fuchsia-500 animate-pulse rounded-sm" />
              </span>
            </div>
            <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-foreground/10" />
          </div>
          <p className="mt-4 text-base sm:text-lg text-foreground/80 max-w-prose mx-0 text-left">
            Full-stack developer & ML data analyst. I build fast, delightful web experiences with Next.js, React, and modern tooling.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-3.5 justify-center sm:justify-start">
            <a href="#projects" className="rounded-xl px-5 py-2.5 bg-primary text-primary-foreground shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
              View Projects
            </a>
            <a href="#contact" className="rounded-xl px-5 py-2.5 border border-input hover:bg-secondary/30 transition">
              Contact Me
            </a>
          </div>
        </div>
  <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px] md:max-w-[450px] lg:max-w-[480px] order-first sm:order-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative aspect-square select-none"
          >
            <div className="absolute inset-0 rounded-full border-2 border-foreground/70" />
            <div className="relative h-full w-full rounded-full overflow-hidden shadow-md">
              <Image
                src="/images/KRISHNA.png"
                alt="Portrait of Krishna Singh"
                width={600}
                height={600}
                className="object-cover w-full h-full select-none"
                draggable={false}
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
