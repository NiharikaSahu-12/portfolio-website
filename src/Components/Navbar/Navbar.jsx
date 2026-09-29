import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseLine, RiMenu3Line } from "@remixicon/react";

import { navLinks, profile } from "../../data/profile";
import { useScrollProgress, useScrollSpy, useScrolled } from "../../hooks/useScrollSpy";

const SECTION_IDS = navLinks.map((l) => l.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(16);
  const progress = useScrollProgress();
  const activeId = useScrollSpy(SECTION_IDS);

  // Lock body scroll and allow Escape to close the mobile drawer.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        scrolled || menuOpen
          ? "bg-cream/85 shadow-warm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-content items-center justify-between px-gutter transition-all duration-500 ease-soft ${
          scrolled ? "py-3.5" : "py-5"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className="group flex items-baseline gap-0.5 font-display text-xl font-bold tracking-tight text-ink"
        >
          {profile.firstName}
          <span className="text-clay transition-transform duration-500 ease-spring group-hover:scale-150 group-hover:text-gold">
            .
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative block rounded-full px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
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

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-primary hidden !px-5 !py-2.5 md:inline-flex">
            Let&rsquo;s talk
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-clay hover:text-clay md:hidden"
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

      {/* Reading progress */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full origin-left bg-transparent"
        style={{
          transform: `scaleX(${progress})`,
          backgroundImage: "linear-gradient(90deg,#C1502E,#E3A857)",
          transition: "transform 120ms linear",
        }}
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-ink/10 bg-cream/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-gutter pb-7 pt-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between border-b border-ink/5 py-3 font-display text-lg ${
                      activeId === link.id ? "text-clay" : "text-ink"
                    }`}
                  >
                    {link.label}
                    <span className="font-mono text-[0.65rem] text-inkMute">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.3 }}
                className="pt-4"
              >
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Let&rsquo;s talk
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
