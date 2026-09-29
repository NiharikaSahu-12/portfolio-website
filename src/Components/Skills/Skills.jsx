import { skillCategories, stats } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-cream py-section">
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute -right-32 top-20 h-[20rem] w-[24rem] rounded-full bg-radial-gold opacity-60 blur-2xl"
      />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="What I work with"
          title="Skills &"
          accent="Technologies"
          description={`${stats.skillCount} tools I reach for daily, grouped by the job they do.`}
        />

        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal
              key={category.title}
              delay={index * 0.1}
              distance={30}
              className="h-full"
            >
              <article className="card card-hover flex h-full flex-col p-7">
                {/* Index + title */}
                <header className="mb-6 flex items-start justify-between gap-4 border-b border-ink/10 pb-5">
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight text-ink">
                      {category.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-inkMute">{category.blurb}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm font-medium text-clay/35"
                  >
                    0{index + 1}
                  </span>
                </header>

                {/* Skills */}
                <ul className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="group flex items-center gap-3 rounded-card border border-ink/10 bg-cream px-3 py-3 transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-clay/40 hover:bg-shell hover:shadow-warm-md">
                        <skill.icon
                          color={skill.color}
                          size={22}
                          aria-hidden="true"
                          className="shrink-0 transition-transform duration-300 ease-spring group-hover:scale-110"
                        />
                        <span className="text-[0.8rem] font-semibold leading-tight text-inkSoft">
                          {skill.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
