import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";

const CATEGORIES: Array<{ key: "valuable" | "practice" | "scaled"; label: string; desc: string }> = [
  { key: "valuable", label: "Valuable Projects", desc: "Impactful, portfolio-worthy work." },
  { key: "practice", label: "Practice Projects", desc: "Skill-building explorations and exercises." },
  { key: "scaled", label: "Scaled Projects", desc: "Larger scope, scalability, or production concerns." },
];

export default function DomainProjectsPage({ params }: { params: { domain: string } }) {
  const domainParam = params.domain;
  const domain = domainParam === "ml" || domainParam === "web" ? (domainParam as "ml" | "web") : null;
  if (!domain) return notFound();

  const domainProjects = projects.filter((p) => p.domain === domain);

  return (
    <section className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-10 sm:py-12 md:py-14">
      <div className="mb-6 sm:mb-7">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          {domain === "web" ? "Web Development" : "Machine Learning"}
        </h1>
        <p className="mt-1.5 text-slate-600">Browse projects by category.</p>
      </div>

      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const items = domainProjects.filter((p) => p.category === cat.key);
          if (items.length === 0) return null;
          return (
            <div key={cat.key}>
              <Card className="rounded-2xl">
                <CardHeader className="border-b">
                  <CardTitle className="text-xl text-slate-900">{cat.label}</CardTitle>
                  <CardDescription>{cat.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mt-4 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                    {items.map((p) => (
                      <ProjectCard key={p.title} p={p} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}
