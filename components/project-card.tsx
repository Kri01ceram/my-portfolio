import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow transition">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{p.title}</span>
          <span className="flex gap-2">
            {p.repo && (
              <a href={p.repo} target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            )}
            {p.link && (
              <a href={p.link} target="_blank" aria-label="Live">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-xs rounded-full px-2 py-1 bg-slate-100 dark:bg-slate-800">
              {t}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
