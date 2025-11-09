"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const ROLES = ["Developer", "Freelancer", "Engineer", "Problem Solver", "Creator"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-14 sm:py-16 lg:py-18">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid items-center gap-8 lg:gap-12 sm:grid-cols-2"
      >
        <div>
          <div className="relative inline-block pb-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <span className="whitespace-nowrap">Hi, I&apos;m Krishna Singh</span>
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="relative inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-500 text-2xl sm:text-3xl md:text-4xl font-bold"
              >
                {ROLES[roleIndex]}
                <span className="ml-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              </motion.span>
            </h1>
            <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-foreground/15" />
          </div>
          <p className="mt-4 text-base sm:text-lg text-foreground/80 max-w-prose mx-auto sm:mx-0 text-center sm:text-left">
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
        <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px] md:max-w-[450px] lg:max-w-[480px]">
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
