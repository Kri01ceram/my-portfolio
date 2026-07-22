"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Section({
  id, title, subtitle, children,
}: { id?: string; title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14 sm:py-18"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
