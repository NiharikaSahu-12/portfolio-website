import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseLine, RiMenu3Line } from "@remixicon/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuArrowUpRight, LuMail } from "react-icons/lu";

import { navLinks, primaryNavIds, profile, socials } from "../../data/profile";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useScrollProgress, useScrollSpy, useScrolled } from "../../hooks/useScrollSpy";

/** Stable reference — `useScrollSpy` re-subscribes when this identity changes. */
const SECTION_IDS = navLinks.map((link) => link.id);

/** Links shown in the bar from `md`; the rest appear once there is room (lg). */
const COMPACT_LINKS = new Set(primaryNavIds);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(16);
  const progress = useScrollProgress();
  const activeId = useScrollSpy(SECTION_IDS);

  useLockBodyScroll(menuOpen);

  // Escape closes the mobile drawer.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);


  return (
    <header data-print="hide" className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-soft ${
          scrolled || menuOpen
            ? "border-b border-ink/10 bg-cream/85 py-2.5 shadow-warm backdrop-blur-xl"
            : "border-b border-transparent py-4"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-content items-center justify-between gap-4 px-gutter"
        >
          {/* ---------- Logo ---------- */}
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] bg-forest font-display text-[0.78rem] font-bold text-gold shadow-warm transition-transform duration-500 ease-spring group-hover:-rotate-6">
              {profile.initials}
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] font-bold tracking-tight text-ink">
                {profile.firstName}
                <span className="text-clay">.</span>
              </span>
              <span className="mt-1 hidden font-mono text-[0.52rem] uppercase tracking-[0.2em] text-inkMute sm:block">
                {profile.role}
              </span>
            </span>
          </a>

          {/* ---------- Desktop links ---------- */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              const compact = COMPACT_LINKS.has(link.id);

              return (
                <li key={link.id} className={compact ? "" : "hidden lg:block"}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                      isActive ? "text-clay" : "text-inkSoft hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-clay/10 ring-1 ring-clay/20"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ---------- Actions ---------- */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="btn btn-primary btn-sm hidden md:inline-flex"
            >
              Let&rsquo;s talk
              <LuArrowUpRight size={13} aria-hidden="true" />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="icon-btn md:hidden"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {menuOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* Reading progress — fades in with the solid bar */}
      <div
        aria-hidden="true"
        className={`h-[2px] w-full origin-left transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `scaleX(${progress})`,
          backgroundImage: "linear-gradient(90deg,#C1502E,#E3A857)",
          transition: "transform 120ms linear, opacity 400ms ease",
        }}
      />

      {/* ---------- Mobile drawer ---------- */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-5rem)] overflow-x-hidden overflow-y-auto overscroll-contain border-b border-ink/10 bg-cream/95 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-0.5 px-gutter pb-7 pt-2">
            {navLinks.map((link, i) => {
              const isActive = activeId === link.id;

              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center justify-between border-b border-ink/5 py-3 font-display text-lg ${
                      isActive ? "text-clay" : "text-ink"
                    }`}
                  >
                    {link.label}
                    <span className="font-mono text-[0.65rem] text-inkMute">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              );
            })}

            <li className="mt-5 flex items-center gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary flex-1"
              >
                <LuMail size={15} aria-hidden="true" />
                Email me
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn btn-ghost btn-icon"
              >
                <FaGithub size={16} aria-hidden="true" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn btn-ghost btn-icon"
              >
                <FaLinkedinIn size={15} aria-hidden="true" />
              </a>
            </li>

          </ul>
        </div>
      )}
    </header>
  );
}
