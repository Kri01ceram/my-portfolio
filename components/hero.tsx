"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground text-center sm:text-left">
              Hi, I&apos;m Krishna Singh
            </h1>
            <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-foreground/20" />
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
