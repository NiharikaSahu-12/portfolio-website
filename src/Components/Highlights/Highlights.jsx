import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

import { stats } from "../../data/content";
import { yearsOfExperience } from "../../data/profile";
import Reveal from "../ui/Reveal";

/**
 * Number that counts up the first time it scrolls into view.
 * Renders the final value immediately when reduced motion is requested.
 */
function CountUp({ value, duration = 1.5, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

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

/* Every figure below is derived from data already in this repo:
   the career start date, the projects array, and the metrics quoted
   in the Allorasoft role. Nothing here is invented. */
const HIGHLIGHTS = [
  { value: yearsOfExperience(), suffix: "+", label: "Years experience", note: "Frontend, since 2023" },
  { value: stats.projectCount, suffix: "", label: "Featured projects", note: "Built end to end" },
  { value: 40, suffix: "%", label: "Faster load times", note: "Performance work at Allorasoft" },
  { value: 25, suffix: "%", label: "Engagement lift", note: "React + Tailwind rebuilds" },
];

export default function Highlights() {
  return (
    <section
      aria-label="Career highlights"
      className="relative overflow-hidden bg-forestDeep py-16 text-cream md:py-20"
    >
      <div aria-hidden="true" className="bg-grid-forest pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 bg-radial-gold opacity-50 blur-2xl"
      />

      <div className="section-shell relative">
        <Reveal direction="none" duration={0.5}>
          <p className="mb-10 text-center font-mono text-[0.66rem] uppercase tracking-[0.28em] text-cream/40">
            By the numbers
          </p>
        </Reveal>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-cream/10 bg-cream/10 lg:grid-cols-4">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.09}
              distance={18}
              className="bg-forestDeep/85 backdrop-blur-sm"
            >
              <div className="group flex h-full flex-col items-center justify-center px-6 py-8 text-center transition-colors duration-500 ease-soft hover:bg-cream/5">
                <dd className="order-1">
                  <span className="block font-display text-5xl font-bold leading-none text-cream transition-colors duration-500 group-hover:text-gold md:text-6xl">
                    <CountUp value={item.value} delay={0.15 + i * 0.09} />
                    {item.suffix}
                  </span>
                  <span className="mt-3 block text-xs leading-relaxed text-cream/45">
                    {item.note}
                  </span>
                </dd>
                <dt className="order-2 mt-4 font-mono text-[0.63rem] uppercase tracking-[0.18em] text-gold">
                  {item.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
