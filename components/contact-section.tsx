"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/section";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { socialLinks } from "@/lib/social";
import { site } from "@/lib/site";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

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
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground/90 transition hover:bg-accent"
            >
              {site.email} <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground/90 transition hover:bg-accent"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy Email"}
            </button>
          </div>
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
