import { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaStar } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const updatedLabel = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
        new Date(iso)
      )
    : null;

/**
 * Cover art for repositories that have no screenshot: a warm gradient well
 * carrying the project's initials over a dot grid, so a brand-new public repo
 * still gets a considered card instead of a blank box.
 */
function GeneratedCover({ project }) {
  const words = project.title.split(/\s+/).filter((w) => /^[a-z0-9]/i.test(w));
  const initials = (
    words.length > 1
      ? words.slice(0, 2).map((w) => w[0]).join("")
      : project.title.slice(0, 2)
  ).toUpperCase();

  return (
    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-linen via-paper to-claySoft/50 md:h-full md:min-h-[20rem]">
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgb(43 38 32 / 0.10) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-clay/15 blur-2xl"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-gold/25 blur-2xl"
      />
      <span className="relative select-none font-display text-7xl font-bold text-ink/15 transition-transform duration-700 ease-soft group-hover:scale-110">
        {initials}
      </span>
      <span className="absolute bottom-3 left-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-inkMute">
        {project.repo}
      </span>
    </div>
  );
}

/**
 * @param {object}   project        Normalised entry from buildProject().
 * @param {number}   index          Position, rendered as a mono index number.
 * @param {boolean}  [flip=false]   Mirrors the row so the cover sits right and
 *                                  the copy left, giving the list a zig-zag.
 */
const ProjectCard = ({ project, index, flip = false }) => {
  const hasDemo = Boolean(project.liveLink);
  const reduceMotion = useReducedMotion();
  const updated = updatedLabel(project.updatedAt);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.55, ease: EASE } }
      }
      viewport={{ once: true, margin: "-60px" }}
      whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.3, ease: EASE } }}
      className={`group flex h-[44rem] flex-col overflow-hidden rounded-panel border border-ink/10 bg-shell shadow-warm transition-[border-color,box-shadow,background-color] duration-500 ease-soft hover:border-clay/30 hover:shadow-warm-lg md:h-[28rem] md:flex-row ${
        flip ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* ---------- Cover ---------- */}
      <div className="relative overflow-hidden bg-linen md:h-full md:w-[46%] md:shrink-0">
        <div className="p-4 pb-0 md:h-full md:p-5">
          <div className="relative h-full overflow-hidden rounded-card border border-ink/10">
            {project.imageUrl && !imageFailed ? (
              <img
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
                className="h-56 w-full bg-linen object-contain md:h-full md:min-h-[20rem]"
              />
            ) : (
              <GeneratedCover project={project} />
            )}

            {/* Language dot — straight from the repository */}
            {project.language && (
              <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-inkSoft shadow-warm backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: project.languageColor }}
                />
                {project.language}
              </span>
            )}

            {/* Hover veil — always a real link, to the demo when there is one */}
            <a
              href={hasDemo ? project.liveLink : project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                hasDemo
                  ? `Open the live ${project.title} site`
                  : `View the ${project.title} source on GitHub`
              }
              className="absolute inset-0 flex items-end bg-gradient-to-t from-forest/75 via-forest/15 to-transparent opacity-0 transition-opacity duration-500 ease-soft focus-visible:opacity-100 group-hover:opacity-100"
            >
              <span className="m-4 inline-flex items-center gap-2 rounded-full bg-cream/95 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink">
                {hasDemo ? (
                  <>
                    Open live site <FaExternalLinkAlt size={9} aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <FaGithub size={10} aria-hidden="true" /> Source on GitHub
                  </>
                )}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex min-h-0 flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex items-center gap-3">
          <span aria-hidden="true" className="font-mono text-xs font-medium text-clay/45">
            0{index + 1}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
        </div>

        <h3 className="line-clamp-2 font-display text-2xl font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-clay">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-4 flex-1 text-[0.94rem] leading-relaxed text-inkSoft md:line-clamp-3">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech}>
              <span className="tag group-hover:border-clay/25">{tech}</span>
            </li>
          ))}
        </ul>

        {/* Repository facts + actions pinned to the bottom */}
        <div className="mt-6 border-t border-ink/10 pt-5">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-inkMute">
            <span className="inline-flex items-center gap-1.5" title="Stars on GitHub">
              <FaStar aria-hidden="true" className="text-goldDeep" size={10} />
              {project.stars}
            </span>
            {updated && <span>Updated {updated}</span>}
            <span className="ml-auto truncate normal-case tracking-normal text-inkMute/80">
              {project.repo}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <FaGithub aria-hidden="true" size={14} /> Code
            </a>
            {hasDemo ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <FaExternalLinkAlt aria-hidden="true" size={12} /> Live demo
              </a>
            ) : (
              <span className="inline-flex items-center rounded-full border border-dashed border-ink/20 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-inkMute">
                Source only
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
