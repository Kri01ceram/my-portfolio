"use client";
import { useEffect, useState } from "react";
import { Github, ExternalLink, GitCommit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type RepoStats = {
  commits: number;
  stars: number;
  forks: number;
  pushed_at: string;
  html_url: string;
};

export default function ProjectCard({ repo }: { repo: string }) {
  const [stats, setStats] = useState<RepoStats | null>(null);

  useEffect(() => {
    fetch(`/api/github/${repo}`)
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, [repo]);

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="group-hover:text-blue-500 transition">{repo}</span>
          <a href={stats?.html_url} target="_blank">
            <Github className="h-5 w-5 hover:text-blue-500 transition" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stats ? (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {stats.commits} commits · {stats.stars} ⭐ · {stats.forks} 🍴
            </p>
            <div className="mt-3 h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{
                  width: `${Math.min(stats.commits / 50, 100)}%`, // fake "workline" scaling
                }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Last updated {new Date(stats.pushed_at).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-400">Loading...</p>
        )}
      </CardContent>
    </Card>
  );
}

