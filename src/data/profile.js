/**
 * Single source of truth for identity, contact details and the copy that used
 * to be hardcoded inside individual components.
 *
 * Anything a visitor reads on this site should be editable from here or from
 * `content.js` — never from inside a component.
 */

export const profile = {
  name: "Niharika Sahu",
  firstName: "Niharika",
  initials: "NS",
  role: "Frontend Developer",
  tagline: "Frontend Developer & UI Craftsperson",
  location: "Mumbai, India",
  email: "niharikasahu1299@gmail.com",

  /**
   * Set this to a path inside /public (e.g. "/Niharika-Sahu-Resume.pdf") to
   * reveal the "Download résumé" buttons. Left null so the site never renders a
   * link that 404s.
   */
  resumeUrl: null,

  /** First day of professional (non-intern) work — used to derive the years stat. */
  careerStart: "2023-10-01",

  /** Hero status pill. Keep it factual — this is the first claim a visitor reads. */
  status: "Frontend Developer at Allorasoft",

  /** Drives the footer clock so visitors in other regions see your working hours. */
  timezone: "Asia/Kolkata",

  /** What a first reply usually looks like. Edit to match how you actually work. */
  responsePromise: "Replies within a day, Monday to Friday.",
};

/** Cycled by the hero typewriter. */
export const roles = [
  "Frontend Developer",
  "React Developer",
  "UI Craftsperson",
];

export const socials = {
  github: "https://github.com/NiharikaSahu-12",
  linkedin: "https://linkedin.com/in/niharikasahu12",
};

export const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Work", id: "projects" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contact", label: "Contact", id: "contact" },
];

/**
 * Navbar shows every link from `md`; below that only this subset is rendered in
 * the floating bar (the drawer still lists all of them).
 */
export const primaryNavIds = ["home", "about", "projects", "contact"];

export const about = {
  paragraphs: [
    "Hello! I’m a Frontend Developer focused on creating intuitive and responsive web applications. I specialise in HTML, CSS, JavaScript and React to build interfaces that feel effortless to use.",
    "I enjoy transforming ideas into functional, visually appealing websites. With a keen eye for design and detail, I aim to make sure every project is both user-friendly and genuinely fast.",
    "When I’m not coding, I spend my time exploring the latest trends in web development and design, and I’m always open to collaborating on projects that push creative boundaries.",
  ],
  quote: {
    text: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln",
  },
};

/**
 * The standards behind the work — shown in the About section. Deliberately
 * craft-focused: these are commitments, not personality claims.
 */
export const principles = [
  {
    title: "Accessible by default",
    body: "Semantic markup, real keyboard paths and visible focus states are part of the build, not a later ticket.",
  },
  {
    title: "Performance is a feature",
    body: "Lean bundles, lazy media and measured Core Web Vitals — a slow interface reads as a broken one.",
  },
  {
    title: "Detail compounds",
    body: "Type scale, spacing rhythm and consistent motion are what make an interface feel finished.",
  },
];

/** Whole years elapsed since `careerStart`, so the stat never goes stale. */
export function yearsOfExperience(from = profile.careerStart, now = new Date()) {
  const start = new Date(from);
  let years = now.getFullYear() - start.getFullYear();
  const anniversary = new Date(now.getFullYear(), start.getMonth(), start.getDate());
  if (now < anniversary) years -= 1;
  return Math.max(0, years);
}

