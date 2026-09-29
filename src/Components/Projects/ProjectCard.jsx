import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

/**
 * @param {object}   project           Entry from src/data/content.js
 * @param {number}   index             Position, rendered as a mono index number.
 * @param {boolean}  [featured=false]  Spans two columns with a side-by-side layout.
 */
const ProjectCard = ({ project, index, featured = false }) => {
  const hasDemo = Boolean(project.liveLink);
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1];

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
      className={`group flex overflow-hidden rounded-panel border border-ink/10 bg-shell shadow-warm transition-[border-color,box-shadow,background-color] duration-500 ease-soft hover:border-clay/30 hover:shadow-warm-lg ${
        featured ? "flex-col md:flex-row lg:col-span-2" : "h-full flex-col"
      }`}
    >
      {/* ---------- Screenshot ---------- */}
      <div
        className={`relative overflow-hidden bg-linen ${
          featured ? "md:w-[46%] md:shrink-0" : ""
        }`}
      >
        <div className="p-4 pb-0">
          <div className="relative overflow-hidden rounded-card border border-ink/10">
            <img
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className={`w-full object-cover object-top transition-transform duration-[900ms] ease-soft group-hover:scale-[1.06] ${
                featured ? "h-56 md:h-full md:min-h-[20rem]" : "h-44"
              }`}
            />
            {/* Hover veil */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest/70 via-forest/10 to-transparent opacity-0 transition-opacity duration-500 ease-soft group-hover:opacity-100">
              <span className="m-4 inline-flex items-center gap-2 rounded-full bg-cream/95 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink">
                View project <FaExternalLinkAlt size={9} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex items-center gap-3">
          <span aria-hidden="true" className="font-mono text-xs font-medium text-clay/45">
            0{index + 1}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
          {featured && (
            <span className="rounded-full bg-gold/15 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-clayDark">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-clay">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-inkSoft">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech}>
              <span className="tag group-hover:border-clay/25">{tech}</span>
            </li>
          ))}
        </ul>

        {/* Actions pinned to the bottom */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-5">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost !px-4 !py-2 !text-[0.8rem]"
          >
            <FaGithub aria-hidden="true" size={14} /> Code
          </a>
          {hasDemo ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !px-4 !py-2 !text-[0.8rem]"
            >
              <FaExternalLinkAlt aria-hidden="true" size={12} /> Live demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-ink/20 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-inkMute">
              Source only
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
