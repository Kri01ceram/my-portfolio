import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { repo: string } }) {
  const repo = params.repo;
  const username = process.env.GITHUB_USERNAME!;
  const token = process.env.GITHUB_TOKEN!;

  try {
    // Repo details
    const repoRes = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
      headers: { Authorization: `token ${token}` },
      next: { revalidate: 3600 }, // cache for 1h
    });
    const repoData = await repoRes.json();

    // Commit count (default branch)
    const commitsRes = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=1`,
      { headers: { Authorization: `token ${token}` } }
    );
    const commitCount = commitsRes.headers.get("Link")
      ? Number(commitsRes.headers.get("Link")?.match(/&page=(\d+)>; rel="last"/)?.[1] ?? 0)
      : 0;

    return NextResponse.json({
      name: repoData.name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      commits: commitCount,
      html_url: repoData.html_url,
      pushed_at: repoData.pushed_at,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch repo" }, { status: 500 });
  }
}
