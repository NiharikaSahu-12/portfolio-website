import { useMemo, useState } from "react";

import { FaInfoCircle, FaSync } from "react-icons/fa";
import { LuSearch, LuX } from "react-icons/lu";
import { socials } from "../../data/profile";
import { useGithubProjects } from "../../hooks/useGithubProjects";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "./ProjectCard";

const ALL = "All";

const timeLabel = (ms) =>
  ms
    ? new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(
        new Date(ms)
      )
    : null;

function SyncPill({ status, fetchedAt, cached, onRefresh }) {
  const loading = status === "loading";
  const dot =
    status === "live" ? "bg-sage" : loading ? "bg-gold animate-pulse" : "bg-clay";
  const label =
    status === "live"
      ? cached
        ? "Synced from GitHub"
        : "Live from GitHub"
      : loading
        ? "Syncing with GitHub"
        : "GitHub unreachable";

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-shell px-3.5 py-2 shadow-warm">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-inkSoft">
        {label}
        {status === "live" && timeLabel(fetchedAt) && (
          <span className="text-inkMute"> · {timeLabel(fetchedAt)}</span>
        )}
      </span>
      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        aria-label="Refresh the project list from GitHub"
        title="Refresh from GitHub"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-inkMute transition-colors duration-300 hover:bg-clay/10 hover:text-clay disabled:opacity-50"
      >
        <FaSync aria-hidden="true" className={loading ? "animate-spin" : ""} size={10} />
      </button>
    </div>
  );
}

function SkeletonCard({ flip = false }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-[44rem] flex-col overflow-hidden rounded-panel border border-ink/10 bg-shell shadow-warm md:h-[28rem] md:flex-row ${
        flip ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="m-4 mb-0 h-56 animate-pulse rounded-card bg-linen/80 md:m-5 md:h-[24rem] md:w-[46%] md:shrink-0" />
      <div className="flex-1 space-y-3 p-6 md:p-7">
        <div className="h-2.5 w-14 animate-pulse rounded-full bg-linen" />
        <div className="h-6 w-2/3 animate-pulse rounded-full bg-linen" />
        <div className="h-3 w-full animate-pulse rounded-full bg-linen/70" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-linen/70" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-linen" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-linen" />
        </div>
      </div>
    </div>
  );
}

const Projects = () => {
  const [filter, setFilter] = useState(ALL);
  const [search, setSearch] = useState("");
  const { status, projects, fetchedAt, cached, refresh } = useGithubProjects();

  /**
   * Filter options are derived from the `techTags` in the data, so adding a
   * project automatically adds its chips — and a tag never appears with a
   * count of zero.
   */
  const techOptions = useMemo(() => {
    const counts = new Map();
    projects.forEach((project) => {
      project.techTags.forEach((tag) =>
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      );
    });

    return [
      { tag: ALL, count: projects.length },
      ...Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
        (a, b) => b.count - a.count || a.tag.localeCompare(b.tag)
      ),
    ];
  }, [projects]);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        filter === ALL || project.techTags.includes(filter);
      if (!matchesFilter || !query) return matchesFilter;

      const searchable = [
        project.title,
        project.description,
        project.repo,
        project.language,
        ...project.techStack,
        ...project.techTags,
        ...project.topics,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [filter, projects, search]);

  const searchTerm = search.trim();
  const isFiltered = filter !== ALL || searchTerm.length > 0;
  const loading = status === "loading";

  return (
    <section id="projects" className="relative overflow-hidden bg-paper py-section">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-16 select-none font-display text-[14rem] leading-none text-ink/[0.03] md:text-[22rem]"
      >
        &#9670;
      </span>

      <div className="section-shell relative">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title="Selected"
          accent="work"
          meta={`${projects.length} selected ${projects.length === 1 ? "project" : "projects"}`}
          description="A curated selection of public work, pulled live from GitHub. Each card links to its source, with a live demo where one is available. Filter by tech or search project names, tools and technologies."
        />

        {/* ---------- Filter + sync status ---------- */}
        <div className="mb-9 flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
          <div className="min-w-0 flex-1">
            <span className="mono-meta mb-2 block">Filter by technology</span>
            <div className="flex flex-wrap items-center gap-2.5">
              {techOptions.map(({ tag, count }) => {
                const active = filter === tag;

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFilter(tag)}
                    aria-pressed={active}
                    className={`chip ${active ? "chip-active" : ""}`}
                  >
                    {tag}
                    <span
                      aria-hidden="true"
                      className={`font-mono text-[0.56rem] ${
                        active ? "text-cream/70" : "text-inkMute"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-end">
            <label className="w-full sm:w-64 sm:flex-none">
              <span className="mono-meta mb-2 block">Find a project</span>
              <div className="relative">
                <LuSearch
                  aria-hidden="true"
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-inkMute"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search selected projects"
                  placeholder="Name, tool or technology"
                  className="field appearance-none py-2.5 pl-10 pr-10"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear project search"
                    className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-inkMute transition-colors hover:bg-clay/10 hover:text-clay"
                  >
                    <LuX size={15} aria-hidden="true" />
                  </button>
                )}
              </div>
            </label>
            <SyncPill
              status={status}
              fetchedAt={fetchedAt}
              cached={cached}
              onRefresh={refresh}
            />
          </div>
        </div>

        {status === "fallback" && (
          <div
            role="status"
            className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-card border border-clay/25 bg-clay/[0.06] px-4 py-3 text-sm text-inkSoft"
          >
            <FaInfoCircle aria-hidden="true" className="shrink-0 text-clay" size={14} />
            <span>
              Couldn&apos;t reach GitHub just now, so this is the last verified
              selected project list.
            </span>
            <button type="button" onClick={refresh} className="link-quiet ml-auto">
              Retry
            </button>
          </div>
        )}

        <p aria-live="polite" className="sr-only">
          {loading
            ? "Loading projects from GitHub."
            : `Showing ${visible.length} of ${projects.length} selected projects${
                filter !== ALL ? ` for ${filter}` : ""
              }${searchTerm ? ` matching ${searchTerm}` : ""}.`}
        </p>

        {loading ? (
          <div className="grid gap-6">
            <SkeletonCard />
            <SkeletonCard flip />
            <SkeletonCard />
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-panel border border-dashed border-ink/20 bg-shell/60 px-6 py-14 text-center">
            <p className="font-display text-xl text-ink">
              {searchTerm
                ? `No projects match “${searchTerm}”${
                    filter !== ALL ? ` tagged ${filter}` : ""
                  }.`
                : filter !== ALL
                  ? `Nothing tagged ${filter} yet.`
                  : "No selected projects are available."}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-inkMute">
              {isFiltered
                ? "Try another search or technology, or clear them to see every selected project."
                : "Selected public repositories will appear here when available."}
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={() => {
                  setFilter(ALL);
                  setSearch("");
                }}
                className="btn btn-ghost btn-sm mt-6"
              >
                Clear search and filters
              </button>
            )}
          </div>
        ) : (
          /* `key` remounts the grid per filter so the reveal animation replays.
             Every card is a full-width row; odd rows mirror so the cover and
             copy trade sides down the page. */
          <div key={filter} className="grid gap-6 md:gap-8">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.repo}
                project={project}
                index={index}
                flip={index % 2 === 1}
              />
            ))}
          </div>
        )}

        <p className="mt-9 text-center text-sm text-inkMute">
          Branches, issues and full history live on{" "}
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Projects;
