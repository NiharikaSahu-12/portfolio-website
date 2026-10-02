import { buildProject, excludedProjectRepos } from "../data/content";
import { socials } from "../data/profile";

const CACHE_KEY = "github-public-repos-v2";
const CACHE_TTL_MS = 10 * 60 * 1000;

/** The request currently in flight, so simultaneous callers share it. */
let inflight = null;

/** Reads the account name from the profile so it is never duplicated here. */
export function githubUsername() {
  const match = socials.github.match(/github\.com\/([^/?#]+)/i);
  return match ? match[1] : null;
}

/* Only the fields buildProject() reads are cached, as raw GitHub facts. Copy
   and screenshots stay in content.js, so editing them there takes effect on
   the next render instead of being frozen in the session cache. */
const trimRepo = ({
  name,
  description,
  html_url,
  homepage,
  stargazers_count,
  language,
  pushed_at,
  topics,
}) => ({
  name,
  description,
  html_url,
  homepage,
  stargazers_count,
  language,
  pushed_at,
  topics,
});

const toProjects = (repos) =>
  repos
    .filter((repo) => !excludedProjectRepos.has(repo.name))
    .map((repo) => buildProject(repo.name, repo));

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(payload) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* private mode / full quota — the cache is an optimisation, not a requirement */
  }
}

/**
 * Asks GitHub which repositories on the account are public and returns them
 * as render-ready project objects, most recently pushed first.
 *
 * Private repos, forks and the profile-config repo are dropped here, so the
 * work section can never link to something a visitor cannot open.
 *
 * @param {{force?: boolean}} [options] `force` bypasses the session cache.
 */
export async function fetchPublicProjects({ force = false } = {}) {
  const username = githubUsername();
  if (!username) throw new Error("No GitHub handle configured");

  if (!force) {
    const cached = readCache();
    if (cached) {
      return {
        projects: toProjects(cached.repos),
        fetchedAt: cached.at,
        cached: true,
      };
    }
    /* Three sections mount this hook at once; without the shared promise each
       would spend its own call against the 60/hour anonymous rate limit. */
    if (inflight) return inflight;
  }

  const request = (async () => {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);

    const all = await response.json();
    const repos = all
      .filter(
        (repo) =>
          !repo.private &&
          !repo.fork &&
          repo.name.toLowerCase() !== username.toLowerCase()
      )
      .map(trimRepo);

    const at = Date.now();
    writeCache({ at, repos });

    return { projects: toProjects(repos), fetchedAt: at, cached: false };
  })();

  inflight = request;
  try {
    return await request;
  } finally {
    if (inflight === request) inflight = null;
  }
}
