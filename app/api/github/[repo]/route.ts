import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { repo: string } }
) {
  const { repo } = params;

  const username = process.env.GITHUB_USERNAME; // change this
  const token = process.env.GITHUB_TOKEN;  // set in .env.local

  try {
    // --- Repo details (stars, forks, url, pushed_at) ---
    const repoRes = await fetch(
      `https://api.github.com/repos/${username}/${repo}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!repoRes.ok) {
      return NextResponse.json({ error: "Repo not found" }, { status: 404 });
    }

    const repoData = await repoRes.json();

    // --- Commits (latest 100 only for demo) ---
    const commitsRes = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=100`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    const commits = await commitsRes.json();

    return NextResponse.json({
      commits: Array.isArray(commits) ? commits.length : 0,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      pushed_at: repoData.pushed_at,
      html_url: repoData.html_url,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
