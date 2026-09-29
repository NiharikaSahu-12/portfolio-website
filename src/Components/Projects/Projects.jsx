import { projects } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "./ProjectCard";

const Projects = () => {
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
          eyebrow="Selected work"
          title="My"
          accent="Projects"
          description="A few things I've designed and built end to end — from recipe browsers to note-taking tools."
        />

        <div className="grid gap-7 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-inkMute">
          More experiments live on{" "}
          <a
            href="https://github.com/NiharikaSahu-12"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-clay underline decoration-clay/30 underline-offset-4 transition-colors duration-300 hover:decoration-clay"
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
