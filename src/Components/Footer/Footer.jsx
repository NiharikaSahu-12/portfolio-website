import { FaGithub, FaLinkedinIn, FaArrowUp } from "react-icons/fa";

import { navLinks, profile, socials } from "../../data/profile";

const SOCIAL_LINKS = [
  { label: "GitHub", href: socials.github, Icon: FaGithub },
  { label: "LinkedIn", href: socials.linkedin, Icon: FaLinkedinIn },
  { label: "Email", href: `mailto:${profile.email}`, Icon: null },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forestDeep text-cream">
      <div
        aria-hidden="true"
        className="bg-grid-forest pointer-events-none absolute inset-0 opacity-50"
      />

      <div className="section-shell relative py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          {/* ---------- Identity ---------- */}
          <div>
            <a
              href="#home"
              className="group inline-flex items-baseline gap-0.5 font-display text-2xl font-bold tracking-tight text-cream"
            >
              {profile.firstName}
              <span className="text-clay transition-transform duration-500 ease-spring group-hover:scale-150 group-hover:text-gold">
                .
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              {profile.role} crafting warm, editorial-style web experiences with
              React and Tailwind CSS.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-gold transition-colors duration-300 hover:text-cream"
            >
              {profile.email}
            </a>
          </div>

          {/* ---------- Navigate ---------- */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.63rem] uppercase tracking-[0.2em] text-cream/40">
              Navigate
            </h2>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gold transition-all duration-300 ease-soft group-hover:w-4"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Elsewhere ---------- */}
          <div>
            <h2 className="font-mono text-[0.63rem] uppercase tracking-[0.2em] text-cream/40">
              Elsewhere
            </h2>
            <ul className="mt-5 space-y-2.5">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/15 transition-all duration-300 ease-soft group-hover:border-gold/50 group-hover:bg-gold/10">
                      {Icon ? (
                        <Icon size={12} aria-hidden="true" />
                      ) : (
                        <span aria-hidden="true" className="text-[0.7rem]">
                          @
                        </span>
                      )}
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 sm:flex-row">
          <p className="text-center text-xs text-cream/45 sm:text-left">
            &copy; {year} {profile.name}. Designed &amp; built with care.
          </p>

          <a
            href="#home"
            className="group inline-flex items-center gap-2.5 rounded-full border border-cream/15 px-4 py-2 font-mono text-[0.63rem] uppercase tracking-[0.16em] text-cream/65 transition-all duration-300 ease-soft hover:border-gold/50 hover:text-gold"
          >
            Back to top
            <FaArrowUp
              size={11}
              aria-hidden="true"
              className="transition-transform duration-300 ease-soft group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
