import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export default function HirePage() {
  return (
    <section className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-10 sm:py-12 md:py-14">
      <div className="space-y-6">
        {/* Resume + Intro */}
        <Card className="rounded-2xl">
          <CardHeader className="border-b">
            <CardTitle className="text-foreground">Work With Me</CardTitle>
            <CardDescription>
              Full‑stack developer and ML data analyst. I build performant web apps with Next.js/React and ship production‑ready ML pipelines. Quick to iterate, strong on UX and reliability.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/resume.pdf" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-input bg-card px-4 py-2 text-sm hover:bg-secondary/30 transition">
                <FileText className="h-4 w-4" /> View Resume
              </Link>
              <Link href="/resume.pdf" target="_blank" download className="inline-flex items-center gap-2 rounded-xl border border-input bg-card px-4 py-2 text-sm hover:bg-secondary/30 transition">
                <Download className="h-4 w-4" /> Download Resume
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Inquiry Form */}
        <Card className="rounded-2xl">
          <CardHeader className="border-b">
            <CardTitle className="text-foreground">Project Inquiry</CardTitle>
            <CardDescription>Tell me about your project. I’ll get back within 1–2 business days.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="name">Name</label>
                <input id="name" name="name" required className="rounded-xl border border-input bg-card px-3 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required className="rounded-xl border border-input bg-card px-3 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60" placeholder="you@example.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="company">Company (optional)</label>
                <input id="company" name="company" className="rounded-xl border border-input bg-card px-3 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60" placeholder="Your company" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="budget">Budget</label>
                <select id="budget" name="budget" className="rounded-xl border border-input bg-card px-3 py-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
                  <option value="unspecified">Unspecified</option>
                  <option value="1-2k">$1k–$2k</option>
                  <option value="2-5k">$2k–$5k</option>
                  <option value="5-10k">$5k–$10k</option>
                  <option value="10k+">$10k+</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="message">Project details</label>
                <textarea id="message" name="message" required rows={6} className="rounded-xl border border-input bg-card px-3 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60" placeholder="Scope, timeline, goals, and any links." />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                <Button type="submit" className="rounded-xl">Submit Inquiry</Button>
                <Link href="mailto:0.krishna1120@gmail.com" className="text-sm text-foreground underline underline-offset-4">Or email me directly</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
