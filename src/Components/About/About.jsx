import { FaRegClock } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import { LuArrowUpRight, LuCode } from "react-icons/lu";

import AboutImg from "../../assets/about.png";
import { stats } from "../../data/content";
import { about, principles, profile, yearsOfExperience } from "../../data/profile";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const About = () => {
  const years = yearsOfExperience();

  const quickFacts = [
    { label: "Experience", value: `${years}+ years`, Icon: FaRegClock },
    { label: "Based in", value: profile.location, Icon: HiOutlineMapPin },
    { label: "Focus", value: "React & Tailwind CSS", Icon: LuCode },
    { label: "Currently", value: profile.status, Icon: null },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-paper py-section">
      {/* Oversized display letter — quiet editorial flourish */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-10 select-none font-display text-[16rem] leading-none text-ink/[0.035] md:text-[26rem]"
      >
        A
      </span>

      <div className="section-shell relative">
        <SectionHeading
          index="01"
          eyebrow="Get to know me"
          title="About"
          accent="me"
          meta={`${profile.location} · ${stats.skillCount} tools in the kit`}
          description="A frontend developer who cares as much about how a page loads and behaves as about how it looks."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          {/* ---------- Portrait + spec sheet ---------- */}
          <div>
            <Reveal
              direction="right"
              distance={40}
              className="relative mx-auto w-full max-w-sm lg:mx-0"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-3 -rotate-2 rounded-blob border border-clay/25 bg-cream/50"
              />
              <div className="relative overflow-hidden rounded-blob border-4 border-cream bg-cream shadow-warm-lg">
                <img
                  src={AboutImg}
                  alt={`${profile.name} working on a web project`}
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover transition-transform duration-[1.2s] ease-soft hover:scale-105"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-3 rounded-card border border-ink/10 bg-shell px-5 py-3.5 shadow-warm-md sm:-right-6">
                <p className="font-display text-3xl font-bold leading-none text-clay">
                  {years}+
                </p>
                <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-inkMute">
                  Years coding
                </p>
              </div>
            </Reveal>

            {/* Spec sheet — the facts a recruiter looks for first */}
            <Reveal delay={0.15} direction="none">
              <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {quickFacts.map(({ label, value, Icon }) => (
                  <li
                    key={label}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <span className="flex shrink-0 items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-inkMute">
                      {Icon && (
                        <Icon size={11} aria-hidden="true" className="text-clay" />
                      )}
                      {label}
                    </span>
                    <span className="text-right text-sm font-semibold text-ink">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---------- Copy ---------- */}
          <div>
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.05 + i * 0.07}>
                <p
                  className={
                    i === 0
                      ? "text-[1.08rem] leading-relaxed text-ink md:text-[1.15rem]"
                      : "mt-5 text-[1.02rem] leading-relaxed text-inkSoft"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            {/* Pull quote */}
            <Reveal delay={0.28}>
              <figure className="relative my-9 rounded-r-card border-l-[3px] border-clay bg-cream/60 py-5 pl-6 pr-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-4 left-4 font-display text-5xl leading-none text-clay/25"
                >
                  &ldquo;
                </span>
                <blockquote className="font-display text-lg italic leading-snug text-forest">
                  {about.quote.text}
                </blockquote>
                <figcaption className="mt-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-inkMute">
                  {about.quote.author}
                </figcaption>
              </figure>
            </Reveal>

            {/* Principles — what I hold myself to on every build */}
            <Reveal delay={0.34}>
              <h3 className="mono-meta">How I build</h3>
            </Reveal>

            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {principles.map((principle, i) => (
                <Reveal
                  as="li"
                  key={principle.title}
                  delay={0.38 + i * 0.06}
                  distance={18}
                >
                  <div className="flex h-full flex-col rounded-card border border-ink/10 bg-shell/70 p-4 transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-clay/30 hover:shadow-warm-md">
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-clay">
                      0{i + 1}
                    </span>
                    <h4 className="mt-2.5 font-display text-[0.98rem] font-semibold leading-tight text-ink">
                      {principle.title}
                    </h4>
                    <p className="mt-2 text-[0.78rem] leading-relaxed text-inkSoft">
                      {principle.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.56} direction="none">
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn btn-primary">
                  Let&rsquo;s connect
                  <LuArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a href="#projects" className="btn btn-ghost">
                  See the work
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
