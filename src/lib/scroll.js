/**
 * Scrolls to a section and keeps the URL in sync *without* pushing a history
 * entry (the palette and rail are navigation helpers, not page loads).
 *
 * Smoothness comes from the global `scroll-behavior: smooth`, which the
 * reduced-motion media query disables automatically, and the fixed-navbar
 * offset from `scroll-padding-top` on <html>.
 *
 * @param {string} href  Hash target, e.g. "#projects".
 */
export function goToSection(href) {
  const id = href.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ block: "start" });
  window.history.replaceState(null, "", href);
}
