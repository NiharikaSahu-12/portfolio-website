import { experience } from "../../data/content";
import { yearsOfExperience } from "../../data/profile";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-forest py-section text-cream"
    >
      {/* ---------- Backdrop ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-forest absolute inset-0" />
        <div className="absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-radial-gold opacity-70 blur-2xl" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-radial-clay opacity-60 blur-2xl" />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          tone="dark"
          index="03"
          eyebrow="Where I've worked"
          title="Where I've"
          accent="worked"
          meta={`${experience.length} roles · ${yearsOfExperience()}+ years`}
          description="Two teams, one continuous focus on the frontend — building interfaces that load fast and feel considered."
        />

        {/* ---------- Timeline ---------- */}
        <div className="relative mx-auto max-w-4xl">
          {/* Rail */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[7px] top-2 w-px bg-gradient-to-b from-gold/60 via-cream/20 to-transparent md:left-[9px]"
          />

          <ol className="space-y-10">
            {experience.map((job, i) => (
              <Reveal
                as="li"
                key={job.company}
                delay={i * 0.1}
                distance={30}
                className="relative pl-10 md:pl-14"
              >
                {/* Marker */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center md:h-5 md:w-5"
                >
                  {job.current && (
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-gold/70" />
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rotate-45 rounded-[2px] md:h-3 md:w-3 ${
                      job.current ? "bg-gold" : "bg-cream/45"
                    }`}
                  />
                </span>

                <article
                  className={`card card-hover border-cream/10 bg-cream/[0.045] p-5 backdrop-blur-sm md:p-7 ${
                    job.current ? "ring-1 ring-gold/25" : ""
                  }`}
                >
                  <header className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card border border-cream/10 bg-cream p-2 shadow-warm">
                        <img
                          src={job.logo}
                          alt={job.alt}
                          width="60"
                          height="60"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <div>
                        <span
                          aria-hidden="true"
                          className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-cream/35"
                        >
                          {i === 0 ? "Most recent" : `Role 0${i + 1}`}
                        </span>
                        <h3 className="mt-1.5 font-display text-xl font-semibold leading-tight text-cream md:text-2xl">
                          {job.role}
                        </h3>
                        <p className="mt-1 text-sm text-gold">{job.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <time className="rounded-full border border-cream/20 bg-forestDeep/60 px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-cream/75">
                        {job.date}
                      </time>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-gold">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          Present
                        </span>
                      )}
                    </div>
                  </header>

                  <ul className="mt-6 space-y-3 border-t border-cream/10 pt-6">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3.5 text-sm leading-relaxed text-cream/70">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-clay"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
