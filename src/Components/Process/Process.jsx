import { processSteps } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/**
 * "Process" — sets expectations before a first call. Deliberately short and
 * generic enough to be true for most frontend engagements.
 */
export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-paper py-section">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-4 select-none font-display text-[14rem] leading-none text-ink/[0.03] md:text-[20rem]"
      >
        P
      </span>

      <div className="section-shell relative">
        <SectionHeading
          index="06"
          eyebrow="How I work"
          title="A simple"
          accent="process"
          meta={`${processSteps.length} phases`}
          description="No surprise invoices and no silent weeks. This is roughly how a project runs from first message to shipped feature."
        />

        <ol className="grid gap-px overflow-hidden rounded-panel border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.08}
              distance={22}
              className="bg-cream/75"
            >
              <div className="group flex h-full flex-col p-6 md:p-7">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-clay">
                  Phase 0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-inkSoft">
                  {step.body}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-6 block h-px w-8 bg-clay/35 transition-all duration-500 ease-soft group-hover:w-14 group-hover:bg-clay"
                />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
