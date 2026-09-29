/**
 * Single source of truth for identity + contact details.
 * Previously these values were hardcoded separately in Home, Contact and the
 * footer, so updating a link meant editing three files.
 */

export const profile = {
  name: "Niharika Sahu",
  firstName: "Niharika",
  role: "Frontend Developer",
  tagline: "Frontend Developer & UI Craftsperson",
  location: "Mumbai, India",
  email: "niharikasahu1299@gmail.com",

  /**
   * Set this to a path inside /public (e.g. "/Niharika-Sahu-Resume.pdf") to
   * reveal the "Download résumé" button. Left null so the site never renders a
   * link that 404s.
   */
  resumeUrl: null,

  /** First day of professional (non-intern) work — used to derive the years stat. */
  careerStart: "2023-10-01",
};

export const socials = {
  github: "https://github.com/NiharikaSahu-12",
  linkedin: "https://linkedin.com/in/niharikasahu12",
};

export const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#projects", label: "Work", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" },
];

/** Whole years elapsed since `careerStart`, so the stat never goes stale. */
export function yearsOfExperience(from = profile.careerStart, now = new Date()) {
  const start = new Date(from);
  let years = now.getFullYear() - start.getFullYear();
  const anniversary = new Date(now.getFullYear(), start.getMonth(), start.getDate());
  if (now < anniversary) years -= 1;
  return Math.max(0, years);
}
