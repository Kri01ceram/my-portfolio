import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FolderGit2, Brain } from "lucide-react";

export default function ProjectsDomainsPage() {
  return (
    <section className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-10 sm:py-12 md:py-14">
      <div className="mb-6 sm:mb-7">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Projects</h1>
        <p className="mt-1.5 text-foreground/70">Choose a domain to explore projects.</p>
      </div>
      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
        <Link href="/projects/web">
          <Card className="rounded-2xl group hover:shadow-md transition-shadow">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FolderGit2 className="h-5 w-5" /> Web Development
              </CardTitle>
              <CardDescription>Applications, backends, and UI work.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="pt-3 text-sm text-foreground/80">Valuable, practice, and scaled projects in the web domain.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/projects/ml">
          <Card className="rounded-2xl group hover:shadow-md transition-shadow">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Brain className="h-5 w-5" /> Machine Learning
              </CardTitle>
              <CardDescription>Models, pipelines, and data science.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="pt-3 text-sm text-foreground/80">Valuable, practice, and scaled projects in the ML domain.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </section>
  );
}
