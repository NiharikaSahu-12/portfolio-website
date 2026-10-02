import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuClock, LuMail, LuMapPin } from "react-icons/lu";

import { services } from "../../data/content";
import { navLinks, profile, socials } from "../../data/profile";
import { useLocalTime } from "../../hooks/useLocalTime";
import CopyButton from "../ui/CopyButton";
import Reveal from "../ui/Reveal";

const SOCIAL_LINKS = [
  { label: "GitHub", href: socials.github, Icon: FaGithub },
  { label: "LinkedIn", href: socials.linkedin, Icon: FaLinkedinIn },
  { label: "Email", href: `mailto:${profile.email}`, Icon: LuMail },
];

/** Shared styling for the sitemap columns. */
const COLUMN_HEADING =
  "font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/40";
const COLUMN_LINK =
  "group inline-flex items-center gap-2 text-sm text-cream/70 transition-colors duration-300 hover:text-gold";

export default function Footer() {
  const year = new Date().getFullYear();
  const localTime = useLocalTime(profile.timezone);

  return (
    <footer className="relative overflow-hidden bg-forestDeep text-cream">
      <div
        aria-hidden="true"
        className="bg-grid-forest pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-radial-gold opacity-40 blur-2xl"
      />

      <div className="section-shell relative">
        {/* ---------- Closing invitation ---------- */}
        <Reveal className="border-b border-cream/10 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/75">
                One last thing
              </p>
              <h2 className="mt-4 text-display-xs font-bold text-cream">
                Let&rsquo;s build something worth shipping.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/60">
                Tell me what you&rsquo;re working on — even if the brief is still
                a paragraph long. I&rsquo;ll tell you honestly whether I&rsquo;m
                the right person for it.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={`mailto:${profile.email}`}
                className="btn btn-primary group"
              >
                <LuMail size={15} aria-hidden="true" />
                Start a conversation
              </a>
              <CopyButton
                value={profile.email}
                label="Copy email"
                copiedLabel="Copied"
                className="btn btn-light"
              />
            </div>
          </div>
        </Reveal>

        {/* ---------- Sitemap ---------- */}
        <div className="grid gap-8 py-11 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-7">
          {/* Identity */}
          <div>
            <a
              href="#home"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.7rem] bg-cream font-display text-[0.8rem] font-bold text-forest transition-transform duration-500 ease-spring group-hover:-rotate-6">
                {profile.initials}
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-cream">
                {profile.name}
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              {profile.role} crafting warm, editorial-style web experiences with
              React and Tailwind CSS.
            </p>

            <ul className="mt-6 space-y-2.5">
              <li className="flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/50">
                <LuMapPin size={12} aria-hidden="true" className="text-gold" />
                {profile.location}
              </li>
              <li className="flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/50">
                <LuClock size={12} aria-hidden="true" className="text-gold" />
                <span>
                  <span data-print="hide">{localTime}</span> local time
                </span>
              </li>
            </ul>

            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-gold transition-colors duration-300 hover:text-cream"
            >
              <LuMail size={13} aria-hidden="true" />
              {profile.email}
            </a>
          </div>

          {/* ---------- Navigate ---------- */}
          <nav aria-label="Footer">
            <h2 className={COLUMN_HEADING}>Navigate</h2>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className={COLUMN_LINK}>
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

          {/* ---------- Services ---------- */}
          <nav aria-label="Services">
            <h2 className={COLUMN_HEADING}>Services</h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((service) => (
                <li key={service.title}>
                  <a href="#services" className={COLUMN_LINK}>
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gold transition-all duration-300 ease-soft group-hover:w-4"
                    />
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Elsewhere ---------- */}
          <div>
            <h2 className={COLUMN_HEADING}>Elsewhere</h2>
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
                      <Icon size={12} aria-hidden="true" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-7 sm:flex-row">
          <p className="text-center text-xs leading-relaxed text-cream/45 sm:text-left">
            &copy; {year} {profile.name}. Designed &amp; built with React, Tailwind
            CSS and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
