import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

import { stats } from "../../data/content";
import { yearsOfExperience } from "../../data/profile";
import { useGithubProjects } from "../../hooks/useGithubProjects";
import Reveal from "../ui/Reveal";

/**
 * Number that counts up the first time it scrolls into view.
 * Renders the final value immediately when reduced motion is requested.
 */
function CountUp({ value, duration = 1.5, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const startedRef = useRef(false);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    /* The project total can arrive after the count-up has run, once GitHub
       answers — settle on it rather than replaying the animation from zero. */
    if (startedRef.current) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    startedRef.current = true;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration, delay]);

  return <span ref={ref}>{display}</span>;
}

export default function Highlights() {
  const { projects } = useGithubProjects();

  /* Every figure below is derived from data already in this repo: the career
     start date, the selected public repositories on GitHub, the skills array and the
     metrics quoted in the Allorasoft role. Nothing here is invented. */
  const HIGHLIGHTS = [
    {
      value: yearsOfExperience(),
      suffix: "+",
      label: "Years experience",
      note: "Frontend, since Oct 2023",
    },
    {
      value: projects.length,
      suffix: "",
      label: "Selected projects",
      note: "Open on GitHub",
    },
    {
      value: stats.skillCount,
      suffix: "",
      label: "Technologies",
      note: "Tools I use in anger",
    },
    {
      value: 40,
      suffix: "%",
      label: "Faster load times",
      note: "Performance work at Allorasoft",
    },
    {
      value: 25,
      suffix: "%",
      label: "Engagement lift",
      note: "React + Tailwind rebuilds",
    },
  ];

  return (
    <section
      aria-labelledby="highlights-heading"
      className="relative overflow-hidden bg-forestDeep py-12 text-cream md:py-16"
    >
      <div
        aria-hidden="true"
        className="bg-grid-forest pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 bg-radial-gold opacity-50 blur-2xl"
      />

      <div className="section-shell relative">
        {/* ---------- Masthead ---------- */}
        <div className="mb-9 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/75">
              By the numbers
            </p>
            <h2
              id="highlights-heading"
              className="mt-3 text-display-2xs font-bold text-cream"
            >
              A quick summary
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-cream/45">
            Derived from the roles and projects listed on this page — no rounded-up
            marketing figures.
          </p>
        </div>

        {/* ---------- Metric grid ---------- */}
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-cream/10 bg-cream/10 lg:grid-cols-5">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal
              as="li"
              key={item.label}
              delay={i * 0.07}
              distance={18}
              className={`bg-forestDeep/85 backdrop-blur-sm ${
                i === HIGHLIGHTS.length - 1 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="group flex h-full flex-col items-start justify-center px-6 py-7 transition-colors duration-500 ease-soft hover:bg-cream/5">
                <span aria-hidden="true" className="mb-5 h-px w-6 bg-gold/40" />
                <p className="font-display text-4xl font-bold leading-none text-cream transition-colors duration-500 group-hover:text-gold md:text-5xl">
                  <CountUp value={item.value} delay={0.15 + i * 0.07} />
                  {item.suffix}
                </p>
                <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                  {item.label}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-cream/45">
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
