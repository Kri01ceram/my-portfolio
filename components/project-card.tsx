"use client";

import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
  domain?: "web" | "ml"; // project domain for filtering
  category?: "valuable" | "practice" | "scaled"; // grouping within a domain
};

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
      <Card className="h-full rounded-2xl">
        {/* Make entire card clickable via stretched link when p.link exists */}
        {p.link && (
          <Link
            href={p.link}
            target="_blank"
            rel="noreferrer noopener"
            className="absolute inset-0 z-[1]"
            aria-label={`${p.title} – open project`}
          />
        )}
        <CardHeader className="border-b">
          <CardTitle className="text-lg sm:text-xl text-foreground">{p.title}</CardTitle>
          <CardAction>
            <div className="flex items-center gap-2">
              {p.repo && (
                <motion.a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-[2] inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
                >
                  <Github className="h-[18px] w-[18px] text-foreground" />
                </motion.a>
              )}
              {p.link && (
                <motion.a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Live"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-[2] inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
                >
                  <ExternalLink className="h-[18px] w-[18px] text-foreground" />
                </motion.a>
              )}
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80 relative z-[2]">{p.description}</p>
        </CardContent>
        <CardFooter className="border-t">
          <div className="mt-2 flex flex-wrap gap-2.5">
            {p.tags.map((t) => (
              <motion.span key={t} whileHover={{ y: -2 }} className="relative z-[2] inline-flex items-center gap-1 rounded-full border border-input bg-card px-2.5 py-1 text-xs text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                {t}
              </motion.span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}