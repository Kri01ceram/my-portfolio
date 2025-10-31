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
        <CardHeader className="border-b">
          <CardTitle className="text-lg sm:text-xl text-slate-900">{p.title}</CardTitle>
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-white hover:bg-slate-50 transition"
                >
                  <Github className="h-[18px] w-[18px] text-slate-700" />
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-white hover:bg-slate-50 transition"
                >
                  <ExternalLink className="h-[18px] w-[18px] text-slate-700" />
                </motion.a>
              )}
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.description}</p>
        </CardContent>
        <CardFooter className="border-t">
          <div className="mt-2 flex flex-wrap gap-2.5">
            {p.tags.map((t) => (
              <motion.span key={t} whileHover={{ y: -2 }} className="inline-flex items-center gap-1 rounded-full border border-input bg-white px-2.5 py-1 text-xs text-slate-800">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                {t}
              </motion.span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}