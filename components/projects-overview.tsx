"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ProjectsOverview() {
  return (
    <Section id="projects" title="Projects" subtitle="Explore by domain">
      <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 items-stretch">
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
          <Card className="rounded-2xl group">
            <CardHeader className="border-b">
              <CardTitle className="text-lg text-foreground">Web Development</CardTitle>
              <CardDescription className="text-xs text-foreground/60">Applications, backends, and UI work</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/projects/web" className="inline-flex items-center gap-2 rounded-xl border border-input px-4 py-2 bg-card hover:bg-secondary/30 transition">View Web Projects →</Link>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
          <Card className="rounded-2xl group">
            <CardHeader className="border-b">
              <CardTitle className="text-lg text-foreground">Machine Learning</CardTitle>
              <CardDescription className="text-xs text-foreground/60">Models, pipelines, and data science</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/projects/ml" className="inline-flex items-center gap-2 rounded-xl border border-input px-4 py-2 bg-card hover:bg-secondary/30 transition">View ML Projects →</Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
