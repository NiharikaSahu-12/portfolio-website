import { LuCheck } from "react-icons/lu";

import { services } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/**
 * "Services" — what someone can actually hire me for. Each card lists
 * deliverables rather than adjectives, because that is what a client needs to
 * decide whether there is a fit.
 */
export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-cream py-section">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-44 top-1/3 h-[26rem] w-[26rem] rounded-full bg-radial-clay opacity-70 blur-2xl" />
        <div className="absolute -right-40 bottom-10 h-[22rem] w-[22rem] rounded-full bg-radial-gold opacity-50 blur-2xl" />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          index="02"
          eyebrow="Services"
          title="Ways I can"
          accent="help"
          meta={`${services.length} offerings`}
          description="Four ways most projects start. If yours doesn't fit one of these, say so anyway — the honest answer is usually still yes."
        />

        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.title}
              delay={i * 0.08}
              distance={26}
              className="h-full"
            >
              <article className="card card-hover group flex h-full flex-col p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-forest text-gold shadow-warm transition-transform duration-500 ease-spring group-hover:-rotate-6">
                    <service.icon size={20} aria-hidden="true" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm font-medium text-clay/35"
                  >
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold leading-tight text-ink">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-inkSoft">
                  {service.blurb}
                </p>

                <ul className="mt-6 grid flex-1 gap-2.5 border-t border-ink/10 pt-5 sm:grid-cols-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[0.82rem] leading-snug text-inkSoft"
                    >
                      <LuCheck
                        size={13}
                        aria-hidden="true"
                        className="mt-[0.2em] shrink-0 text-sage"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-sm text-inkMute">
            Not sure where to start?{" "}
            <a href="#contact" className="link-quiet">
              Tell me about the project
            </a>{" "}
            and I&rsquo;ll suggest the smallest useful first step.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
