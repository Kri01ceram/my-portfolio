"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <Section id="contact" title="Get in Touch" subtitle="Let's build something together">
      <div className="relative">
        <motion.div
          className="relative rounded-3xl border border-input bg-card shadow-lg overflow-hidden"
          whileHover={{ scale: 1.003 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <div className="relative p-5 sm:p-6">
            <div className="grid gap-6 sm:grid-cols-2 items-start">
              {/* Left: CTAs */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-foreground/80 text-center sm:text-left">
                  Prefer email for fastest response. I’m also available on LinkedIn and GitHub.
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <a href="mailto:0.krishna1120@gmail.com" className="rounded-xl px-5 py-2.5 bg-primary text-primary-foreground shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
                    Say Hello
                  </a>
                  <Link href="/hire" className="rounded-xl px-5 py-2.5 border border-input hover:bg-secondary/30 transition">
                    Hire Me
                  </Link>
                  <a href="#projects" className="rounded-xl px-5 py-2.5 border border-input hover:bg-secondary/30 transition">
                    See Projects
                  </a>
                </div>
              </div>

              {/* Right: (details list intentionally omitted for clean layout) */}
            </div>
          </div>
        </motion.div>
        {/* Icons row below the contact box */}
  <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6">
          <a
            href="mailto:0.krishna1120@gmail.com"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
            aria-label="Email"
            title="Email"
          >
            <Mail className="h-5 w-5 text-foreground" />
          </a>
          <a
            href="https://www.linkedin.com/in/krishna-singh-172642323/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-foreground" />
          </a>
          <a
            href="https://github.com/Kri01ceram"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github className="h-5 w-5 text-foreground" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
            aria-label="Instagram"
            title="Instagram"
          >
            <Instagram className="h-5 w-5 text-foreground" />
          </a>
        </div>
      </div>
    </Section>
  );
}
