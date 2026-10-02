import { navLinks } from "../../data/profile";
import { useScrollSpy } from "../../hooks/useScrollSpy";

/** Stable reference — `useScrollSpy` re-subscribes when this identity changes. */
const SECTION_IDS = navLinks.map((link) => link.id);

/**
 * Fixed desktop rail that shows where you are in the page.
 *
 * Kept to xl and up: below that there simply isn't gutter space for it beside a
 * 78rem content column. Labels are revealed on hover/active so the rail stays a
 * hairline detail rather than a second navigation bar.
 */
export default function SectionRail() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <nav
      aria-label="Section progress"
      data-print="hide"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-0.5">
        {navLinks.map((link) => {
          const active = activeId === link.id;

          return (
            <li key={link.id}>
              <a
                href={link.href}
                aria-current={active ? "true" : undefined}
                className="group flex items-center justify-end gap-3 py-1.5"
              >
                <span
                  className={`rounded-full border border-ink/10 bg-cream/90 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] backdrop-blur-sm transition-all duration-300 ease-soft ${
                    active
                      ? "text-clay opacity-100"
                      : "translate-x-1 text-inkMute opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-500 ease-soft ${
                    active
                      ? "w-7 bg-clay"
                      : "w-3.5 bg-ink/25 group-hover:w-5 group-hover:bg-clay/60"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
