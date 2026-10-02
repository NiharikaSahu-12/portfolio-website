import { FaGithub, FaLinkedinIn, FaReact } from "react-icons/fa";
import { LuArrowDown, LuArrowUpRight } from "react-icons/lu";

import avatarImg from "../../assets/home.png";
import { skillCategories, stats } from "../../data/content";
import {
  profile,
  roles,
  socials,
  yearsOfExperience,
} from "../../data/profile";
import { useGithubProjects } from "../../hooks/useGithubProjects";
import Marquee from "../ui/Marquee";
import Reveal from "../ui/Reveal";
import TextChange from "../TextChange";

/**
 * The ticker reads straight from the skills data, so adding a skill in
 * `content.js` updates the hero too — nothing to keep in sync by hand.
 */
const MARQUEE_ITEMS = skillCategories.flatMap((category) =>
  category.skills.map((skill) => skill.name)
);

export default function Home() {
  const years = yearsOfExperience();
  const { projects } = useGithubProjects();

  const quickStats = [
    { value: `${years}+`, label: "Years experience" },
    { value: projects.length, label: "Selected projects" },
    { value: stats.skillCount, label: "Technologies" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-cream pb-20 pt-28 md:pb-24 md:pt-32"
    >
      {/* ---------- Backdrop ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-ruled absolute inset-0 opacity-60" />
        <div className="animate-drift absolute -left-40 top-4 h-[30rem] w-[30rem] rounded-full bg-radial-gold blur-2xl" />
        <div className="animate-drift absolute -right-32 bottom-10 h-[34rem] w-[34rem] rounded-full bg-radial-clay blur-2xl [animation-delay:-9s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper/70" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="section-shell relative z-10 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        {/* ---------- Masthead column ---------- */}
        <div className="order-1 text-center lg:order-1 lg:text-left">
          <Reveal direction="none" duration={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 lg:justify-start">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-shell/80 py-1.5 pl-2 pr-4 shadow-warm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-sage" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
                </span>
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-inkSoft">
                  {profile.status}
                </span>
              </span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-inkMute">
                {profile.location}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="section-label mt-8 block">Hello, I&rsquo;m</p>
            <h1 className="text-display-xl mt-3 font-bold">
              {profile.firstName} <em className="text-clay">Sahu</em>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-6 flex items-center justify-center gap-3.5 lg:justify-start">
              <span aria-hidden="true" className="h-px w-10 shrink-0 bg-clay/40" />
              <p className="min-h-[1.9em] font-display text-lg italic text-forest md:text-2xl">
                <TextChange roles={roles} />
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mx-auto mt-7 max-w-prose text-base leading-relaxed text-inkSoft md:text-[1.05rem] lg:mx-0">
              I build beautiful, responsive and genuinely fast web experiences —
              and sweat the details most people scroll past. I care about
              accessible markup, sensible performance budgets and interfaces
              that feel considered from the first paint.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3 lg:justify-start">
              <a
                href="#projects"
                className="btn btn-primary group shrink-0 gap-1.5 px-2.5 py-2 text-[0.68rem] sm:gap-2.5 sm:px-5 sm:py-3 sm:text-sm"
              >
                View my work
                <LuArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="btn btn-ghost shrink-0 px-2.5 py-2 text-[0.68rem] sm:px-5 sm:py-3 sm:text-sm"
              >
                Get in touch
              </a>
              {[
                { href: socials.github, label: "GitHub", Icon: FaGithub },
                { href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="icon-btn h-8 w-8 shrink-0 sm:h-11 sm:w-11"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4} direction="none">
            <ul className="mx-auto mt-8 grid max-w-sm grid-cols-3 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 lg:mx-0">
              {quickStats.map((stat) => (
                <li key={stat.label} className="bg-cream/85 px-3 py-3.5">
                  <span className="block font-display text-xl font-bold leading-none text-ink md:text-2xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block font-mono text-[0.53rem] uppercase leading-tight tracking-[0.14em] text-inkMute">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------- Profile portrait ---------- */}
        <Reveal
          direction="left"
          delay={0.18}
          distance={32}
          duration={0.8}
          className="order-2 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative w-full max-w-[18rem] sm:max-w-[21rem] lg:max-w-[27rem]">
            <div
              aria-hidden="true"
              className="absolute -inset-5 bg-gradient-to-br from-gold/35 via-transparent to-clay/20 blur-2xl"
              style={{
                clipPath:
                  "polygon(19% 0, 83% 3%, 100% 24%, 94% 77%, 73% 100%, 17% 94%, 0 68%, 6% 21%)",
              }}
            />
            <div
              className="group relative isolate aspect-[4/5] overflow-hidden bg-gradient-to-br from-shell via-paper to-linen shadow-warm-xl"
              style={{
                clipPath:
                  "polygon(19% 0, 83% 3%, 100% 24%, 94% 77%, 73% 100%, 17% 94%, 0 68%, 6% 21%)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-55"
                style={{
                  backgroundImage:
                    "radial-gradient(rgb(43 38 32 / 0.12) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-clay/15 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute inset-[5%] border border-cream/75"
                style={{
                  clipPath:
                    "polygon(17% 0, 83% 4%, 100% 23%, 93% 76%, 74% 100%, 17% 94%, 0 68%, 6% 22%)",
                }}
              />

              <img
                src={avatarImg}
                alt={`Illustrated portrait of ${profile.name}, ${profile.role}`}
                width="500"
                height="500"
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain object-bottom px-3 pb-2 pt-5 transition-transform duration-700 ease-soft group-hover:scale-[1.025] sm:px-5 sm:pb-3 sm:pt-7"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/20 to-transparent"
              />

              <div
                className="absolute left-[12%] top-[11%] inline-flex -rotate-3 items-center gap-2 border border-cream/70 bg-shell/90 px-3 py-2 shadow-warm backdrop-blur-md"
                style={{
                  clipPath: "polygon(0 0, 100% 8%, 96% 100%, 4% 92%)",
                }}
              >
                <FaReact className="text-clay" size={15} aria-hidden="true" />
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-inkSoft">
                  Building with React
                </span>
              </div>

              <div
                className="absolute bottom-[13%] left-[12%] right-[12%] flex items-end justify-between gap-3 border-l-2 border-gold bg-forest/90 px-4 py-3 text-cream shadow-warm-lg backdrop-blur-md sm:px-5 sm:py-4"
                style={{
                  clipPath: "polygon(0 0, 100% 7%, 96% 100%, 0 92%)",
                }}
              >
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight sm:text-xl">
                    {profile.name}
                  </p>
                  <p className="mt-1 truncate font-mono text-[0.58rem] uppercase tracking-[0.14em] text-cream/70">
                    {profile.role} · {profile.location}
                  </p>
                </div>
                <span
                  aria-label={profile.status}
                  className="mb-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-sage ring-4 ring-sage/20"
                />
              </div>
            </div>

            <span
              className="absolute -right-3 top-[38%] hidden rotate-6 items-center justify-center bg-clay px-3 py-2 font-display text-lg font-semibold text-cream shadow-warm sm:flex"
              style={{
                clipPath: "polygon(14% 0, 100% 12%, 86% 100%, 0 88%)",
              }}
            >
              {profile.initials}
            </span>
          </div>
        </Reveal>
      </div>

      {/* ---------- Scroll cue ---------- */}
      <div
        aria-hidden="true"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 lg:flex"
      >
        <span className="font-mono text-[0.53rem] uppercase tracking-[0.3em] text-inkMute">
          Scroll
        </span>
        <span className="h-9 w-px bg-gradient-to-b from-ink/25 to-transparent" />
        <LuArrowDown size={12} className="animate-bob text-clay" />
      </div>

      {/* ---------- Tech ticker ---------- */}
      <div className="absolute inset-x-0 bottom-0 border-y border-ink/10 bg-paper/60 py-3.5 backdrop-blur-sm">
        <Marquee items={MARQUEE_ITEMS} />
      </div>
    </section>
  );
}
