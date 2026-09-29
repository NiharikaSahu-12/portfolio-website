import { useId } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

import avatarImg from "../../assets/home.png";
import { profile, socials } from "../../data/profile";
import Reveal from "../ui/Reveal";
import TextChange from "../TextChange";

const MARQUEE_ITEMS = [
  "React",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "HTML5",
  "CSS3",
  "Git",
  "Node.js",
  "Vite",
  "REST APIs",
];

export default function Home() {
  const sealId = useId();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-cream pb-28 pt-32 md:pb-32 md:pt-40"
    >
      {/* ---------- Backdrop ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-ruled absolute inset-0 opacity-60" />
        <div className="animate-drift absolute -left-40 top-4 h-[30rem] w-[30rem] rounded-full bg-radial-gold blur-2xl" />
        <div className="animate-drift absolute -right-32 bottom-10 h-[34rem] w-[34rem] rounded-full bg-radial-clay blur-2xl [animation-delay:-9s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper/70" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="section-shell relative z-10 grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        {/* Text column */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <Reveal direction="none" duration={0.5}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-shell/80 py-1.5 pl-2 pr-4 shadow-warm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-sage" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-inkSoft">
                {profile.location}
              </span>
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="section-label mt-7 block">Hello, I&rsquo;m</p>
            <h1 className="text-display-lg mt-3 font-bold">
              {profile.firstName}{" "}
              <em className="text-clay">Sahu</em>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-5 flex items-center justify-center gap-3.5 lg:justify-start">
              <span aria-hidden="true" className="h-px w-10 shrink-0 bg-clay/40" />
              <p className="min-h-[1.9em] font-display text-lg italic text-forest md:text-2xl">
                <TextChange />
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mx-auto mt-7 max-w-prose text-base leading-relaxed text-inkSoft md:text-[1.075rem] lg:mx-0">
              I craft beautiful, responsive, and user-friendly web experiences
              with a keen eye for detail. Always eager to discover new
              technologies, I adapt quickly and thrive on turning ideas into
              interfaces people love.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a href="#projects" className="btn btn-primary group w-full sm:w-auto">
                View my work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
              <a href="#contact" className="btn btn-ghost w-full sm:w-auto">
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4} direction="none">
            <div className="mt-9 flex items-center justify-center gap-3 lg:justify-start">
              {[
                { href: socials.github, label: "GitHub", Icon: FaGithub },
                { href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
                { href: `mailto:${profile.email}`, label: "Email", Icon: FiMail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-shell text-inkSoft shadow-warm transition-all duration-300 ease-soft hover:-translate-y-1 hover:border-clay/40 hover:text-clay hover:shadow-warm-md"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Portrait column */}
        <Reveal
          direction="left"
          delay={0.2}
          distance={40}
          duration={0.9}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative w-full max-w-[19rem] md:max-w-[23rem]">
            {/* Offset frame */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 -rotate-3 rounded-t-[999px] rounded-b-panel border border-clay/25 bg-clay/5"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-3 rotate-2 rounded-t-[999px] rounded-b-panel border border-gold/30 bg-gold/5"
            />

            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-panel border-4 border-shell bg-paper shadow-warm-xl">
              <img
                src={avatarImg}
                alt={`${profile.name}, Frontend Developer`}
                width="500"
                height="500"
                className="aspect-square w-full object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.045]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest/25 via-transparent to-transparent"
              />
            </div>

            {/* Rotating seal */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 md:h-28 md:w-28">
              <div className="animate-spin-slow absolute inset-0">
                <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
                  <defs>
                    <path
                      id={`${sealId}-circle`}
                      d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <circle cx="50" cy="50" r="48" className="fill-forest" />
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    className="fill-none stroke-gold/40"
                    strokeWidth="1"
                  />
                  <text className="fill-cream font-mono text-[8.1px] uppercase tracking-[0.2em]">
                    <textPath href={`#${sealId}-circle`}>
                      Frontend Developer • UI Craftsperson •
                    </textPath>
                  </text>
                </svg>
              </div>
              <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-gold">
                NS
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------- Tech marquee ---------- */}
      <div className="absolute inset-x-0 bottom-0 border-y border-ink/10 bg-paper/60 py-3.5 backdrop-blur-sm">
        <div className="mask-fade-x overflow-hidden">
          <div
            className="flex w-max animate-marquee items-center gap-8 will-change-transform"
            aria-hidden="true"
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-8">
                {MARQUEE_ITEMS.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex items-center gap-8 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-inkMute"
                  >
                    {item}
                    <span className="text-clay/50">&#9670;</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Technologies: {MARQUEE_ITEMS.join(", ")}.
        </p>
      </div>
    </section>
  );
}
