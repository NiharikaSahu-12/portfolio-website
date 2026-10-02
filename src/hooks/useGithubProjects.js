import { useCallback, useEffect, useState } from "react";

import { fallbackProjects } from "../data/content";
import { fetchPublicProjects } from "../lib/github";

/**
 * Drives the work section from live GitHub data.
 *
 * `status` is "loading" while the API call is in flight, then "live" on
 * success or "fallback" when the network/rate limit gets in the way — in
 * which case the last verified public list is shown instead of an empty
 * section.
 */
export function useGithubProjects() {
  const [state, setState] = useState({
    status: "loading",
    projects: fallbackProjects,
    fetchedAt: null,
    cached: false,
  });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let alive = true;
    setState((prev) => ({ ...prev, status: "loading" }));

    fetchPublicProjects({ force: nonce > 0 })
      .then(({ projects, fetchedAt, cached }) => {
        if (alive) setState({ status: "live", projects, fetchedAt, cached });
      })
      .catch(() => {
        if (alive)
          setState((prev) => ({
            status: "fallback",
            projects: prev.projects.length ? prev.projects : fallbackProjects,
            fetchedAt: prev.fetchedAt,
            cached: prev.cached,
          }));
      });

    return () => {
      alive = false;
    };
  }, [nonce]);

  const refresh = useCallback(() => setNonce((n) => n + 1), []);

  return { ...state, refresh };
}
