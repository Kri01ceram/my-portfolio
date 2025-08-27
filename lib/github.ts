// lib/github.ts
export async function getProjects(username: string) {
  const res = await fetch(`https://api.github.com/users/${Kri01ceram}/repos`);
  const repos = await res.json();

  // filter out forks / irrelevant repos
  return repos
    .filter((repo: any) => !repo.fork)
    .map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      lastUpdated: repo.pushed_at,
    }));
}
