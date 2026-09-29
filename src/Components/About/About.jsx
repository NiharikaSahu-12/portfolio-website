import { IoArrowForward } from "react-icons/io5";
import { HiOutlineMapPin } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa";

import AboutImg from "../../assets/about.png";
import { profile, yearsOfExperience } from "../../data/profile";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const QUICK_FACTS = [
  {
    Icon: FaRegClock,
    label: "Experience",
    value: `${yearsOfExperience()}+ years`,
  },
  { Icon: HiOutlineMapPin, label: "Based in", value: profile.location },
  { label: "Focus", value: "React & Tailwind", Icon: null },
];

const About = () => {
  const years = yearsOfExperience();

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
        <SectionHeading eyebrow="Get to know me" title="About" accent="Me" />

        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------- Portrait ---------- */}
          <Reveal direction="right" distance={40} className="relative mx-auto w-full max-w-sm lg:mx-0">
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

          {/* ---------- Copy ---------- */}
          <div className="space-y-6">
            <Reveal delay={0.05}>
              <p className="text-lg leading-relaxed text-inkSoft">
                Hello! I&rsquo;m a Frontend Developer focused on creating
                intuitive and responsive web applications. With {years}+ years of
                experience in web development, I specialize in HTML, CSS,
                JavaScript, and React to build seamless user experiences.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-lg leading-relaxed text-inkSoft">
                I enjoy transforming ideas into functional, visually appealing
                websites. With a keen eye for design and detail, I aim to ensure
                every project is both user-friendly and high-performance.
              </p>
            </Reveal>

            <Reveal delay={0.19}>
              <p className="text-lg leading-relaxed text-inkSoft">
                When I&rsquo;m not coding, I spend my time exploring the latest
                trends in web development and design, and I&rsquo;m always open
                to collaborating on projects that push creative boundaries.
              </p>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.26}>
              <figure className="relative my-8 rounded-r-card border-l-[3px] border-clay bg-cream/60 py-5 pl-6 pr-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-4 left-4 font-display text-5xl leading-none text-clay/25"
                >
                  &ldquo;
                </span>
                <blockquote className="font-display text-lg italic leading-snug text-forest">
                  The best way to predict the future is to create it.
                </blockquote>
                <figcaption className="mt-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-inkMute">
                  Abraham Lincoln
                </figcaption>
              </figure>
            </Reveal>

            {/* Quick facts */}
            <Reveal delay={0.32}>
              <dl className="grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-3">
                {QUICK_FACTS.map(({ Icon, label, value }) => (
                  <div key={label} className="bg-cream/70 px-5 py-4">
                    <dt className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-inkMute">
                      {Icon && <Icon size={13} className="text-clay" aria-hidden="true" />}
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.38}>
              <a href="#contact" className="btn btn-primary mt-2">
                Let&rsquo;s connect
                <IoArrowForward aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
