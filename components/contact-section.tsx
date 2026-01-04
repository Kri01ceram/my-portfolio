"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/lib/social";

export default function ContactSection() {
  return (
    <Section id="contact" title="Let’s Connect" subtitle="Open to collaborations, full-time roles, and interesting problems.">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <motion.div
          className="rounded-3xl border border-border bg-card p-6 sm:p-7"
          whileHover={{ y: -1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            The fastest way to reach me is email. I usually respond within 1–2 business days.
          </p>
          <a
            href="mailto:0.krishna1120@gmail.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground/90 transition hover:bg-accent"
          >
            0.krishna1120@gmail.com <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {socialLinks.map((s) => (
            <motion.a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-3xl border border-border bg-card p-6 hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-foreground">{s.platform}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.username}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
