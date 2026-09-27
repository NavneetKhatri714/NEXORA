import axios from "axios";
import { env } from "../config/env";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {})
  }
});

export async function analyzeGithub(username: string) {
  const [user, repos] = await Promise.all([
    github.get(`/users/${encodeURIComponent(username)}`),
    github.get(`/users/${encodeURIComponent(username)}/repos`, {
      params: { per_page: 100, sort: "updated" }
    })
  ]);

  const repoData = repos.data.map((r: any) => ({
    name: r.name,
    description: r.description,
    language: r.language,
    stars: r.stargazers_count,
    forks: r.forks_count,
    topics: r.topics || [],
    url: r.html_url
  }));

  const languages: Record<string, number> = {};
  for (const repo of repoData) {
    if (repo.language) languages[repo.language] = (languages[repo.language] || 0) + 1;
  }

  return {
    username,
    name: user.data.name,
    bio: user.data.bio,
    publicRepos: user.data.public_repos,
    followers: user.data.followers,
    profileUrl: user.data.html_url,
    languages,
    repositories: repoData
  };
}
