import Allora_logo from "../assets/allora.png";
import Artronaut_logo from "../assets/atronaut.png";
import portfolioImage from "../assets/Projects Images/portfolio.png";
import noteAppImage from "../assets/Projects Images/note_app.png";
import crochetImage from "../assets/Projects Images/crochet.png";
import unwrappImage from "../assets/Projects Images/unwrapp.png";
/* Kept for the day this repo is made public again — an entry here costs
   nothing at runtime, since the browser only fetches an image a card shows. */
import foodiesImage from "../assets/Projects Images/foodies.png";

import {
  FaChrome,
  FaCodeBranch,
  FaCss3,
  FaDatabase,
  FaDrawPolygon,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLaptopCode,
  FaNpm,
  FaNode,
  FaProjectDiagram,
  FaReact,
  FaServer,
  FaUniversalAccess,
} from "react-icons/fa";
import {
  SiAxios,
  SiEslint,
  SiFramer,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiPrettier,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVisualstudiocode,
} from "react-icons/si";

/* --------------------------------------------------------------
   Projects — visibility is decided by GitHub, not by this file.

   `projectMeta` is a catalogue of copy, screenshots and links keyed by
   repository name. `fetchPublicProjects` (src/lib/github.js) asks the
   GitHub API which of these repositories are actually public and only
   those are rendered — a repo made public tomorrow shows up here with
   no code change, and a private one never leaks a 404 link.

   Repositories with no entry here still render: they fall back to the
   API's own description and a generated cover.
   -------------------------------------------------------------- */
export const projectMeta = {
  "portfolio-website": {
    title: "Portfolio Website",
    description:
      "A sleek portfolio website built with React and TailwindCSS, showcasing my projects and skills. It features an intuitive layout and responsive design for easy navigation, allowing visitors to explore my work and connect with me seamlessly",
    techStack: ["React", "TailwindCSS"],
    techTags: ["React", "Tailwind CSS"],
    imageUrl: portfolioImage,
  },
  "notes-app": {
    title: "Simple Note App",
    description:
      "A note-taking application that allows users to effortlessly create, edit, and categorize their notes. Designed with a clean interface for a seamless user experience.",
    techStack: ["HTML", "CSS", "JavaScript", "Quill.js", "LocalStorage"],
    techTags: ["HTML", "CSS", "JavaScript"],
    imageUrl: noteAppImage,
    liveLink: "https://niharikasahu-12.github.io/notes-app/",
  },
  foodies: {
    title: "Foodies — Recipe App",
    description:
      "A food recipes app to show your favorite recipes according to categories, areas and recipe name. Also included dark mode.",
    techStack: ["Reactjs", "TailwindCSS", "ContextAPI", "Vite"],
    techTags: ["React", "Tailwind CSS", "Vite"],
    imageUrl: foodiesImage,
  },
  "crochet-website": {
    title: "The Cozzy Loops",
    description:
      "A storefront for a small-batch crochet studio — pastel bouquets, desk blooms and charms, each gift-boxed by hand. Browse-by-collection front end with a Supabase-backed catalogue, cart and checkout.",
    techStack: ["React", "Vite", "TailwindCSS", "Supabase", "Framer Motion"],
    techTags: ["React", "Tailwind CSS", "Vite"],
    imageUrl: crochetImage,
    liveLink: "https://thecozzyloops.vercel.app/",
  },
  "portfolio-lucky": {
    title: "Lucky — Résumé Site",
    description:
      "A single-page professional résumé site built from scratch in vanilla HTML, CSS and JavaScript — scroll-driven sections, an interactive career timeline and a print-ready layout, with no framework in sight.",
    techStack: ["HTML", "CSS", "JavaScript"],
    techTags: ["HTML", "CSS", "JavaScript"],
    imageUrl: null,
  },
  unWrapp: {
    title: "UnWrapp",
    description:
      "An AI-powered gifting marketplace that matches a recipient to a thoughtful present. Next.js 15 front end over MongoDB, with a custom TF-IDF recommendation service doing the suggesting.",
    techStack: ["Next.js", "TypeScript", "MongoDB", "TailwindCSS"],
    techTags: ["TypeScript", "React"],
    imageUrl: unwrappImage,
    liveLink: "https://un-wrapp.vercel.app/",
  },
  "ToDo-List": {
    title: "ToDo List",
    description:
      "My very first React application — a simple task list built to learn state and rendering. Tasks live in memory only and reset on refresh, exactly as the README warns.",
    techStack: ["React", "JavaScript"],
    techTags: ["React", "JavaScript"],
    imageUrl: null,
  },
};

export const excludedProjectRepos = new Set(["portfolio-lucky"]);

/* GitHub's linguist colours, for the language dot on each card. */
export const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#6639ba",
  PLpgSQL: "#336790",
  Python: "#3572a5",
};

/** Turns `my-cool_repo` into `My Cool Repo` for repos with no curated title. */
export const prettifyRepoName = (name) =>
  name
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Merges a raw GitHub repo object (or a fallback fact row) with its curated
 * metadata into the single shape every card reads.
 *
 * @param {string} repoName  Repository name, e.g. "notes-app".
 * @param {object} facts     GitHub fields: description, html_url, homepage,
 *                           stargazers_count, language, pushed_at, topics.
 */
export function buildProject(repoName, facts = {}) {
  const meta = projectMeta[repoName] ?? {};
  const language = facts.language ?? null;

  return {
    repo: repoName,
    title: meta.title ?? prettifyRepoName(repoName),
    description:
      meta.description ??
      facts.description ??
      "A public experiment from my GitHub — source and history are open to read.",
    techStack: meta.techStack ?? (language ? [language] : []),
    techTags: meta.techTags ?? (language ? [language] : ["GitHub"]),
    imageUrl: meta.imageUrl ?? null,
    liveLink: meta.liveLink ?? facts.homepage ?? "",
    githubLink: facts.html_url ?? `https://github.com/NiharikaSahu-12/${repoName}`,
    stars: facts.stargazers_count ?? 0,
    language,
    languageColor: languageColors[language] ?? "#8a7e6e",
    updatedAt: facts.pushed_at ?? null,
    topics: facts.topics ?? [],
  };
}

/* Rendered only when the GitHub API is unreachable (offline or rate-limited).
   Keep this to verified public projects that belong in the portfolio. */
export const fallbackProjects = [
  {
    repoName: "unWrapp",
    facts: {
      description: null,
      html_url: "https://github.com/NiharikaSahu-12/unWrapp",
      homepage: "https://un-wrapp.vercel.app",
      stargazers_count: 0,
      language: "TypeScript",
      pushed_at: "2026-09-30T13:00:34Z",
      topics: [],
    },
  },
  {
    repoName: "crochet-website",
    facts: {
      description: null,
      html_url: "https://github.com/NiharikaSahu-12/crochet-website",
      homepage: "https://thecozzyloops.vercel.app/",
      stargazers_count: 0,
      language: "JavaScript",
      pushed_at: "2026-09-30T10:28:10Z",
      topics: [],
    },
  },
  {
    repoName: "portfolio-website",
    facts: {
      description:
        "My personal portfolio website built with React and TailwindCSS. It showcases my projects, skills, and experience in web development.",
      html_url: "https://github.com/NiharikaSahu-12/portfolio-website",
      homepage: "https://niharika-portfolio-website.netlify.app/",
      stargazers_count: 0,
      language: "JavaScript",
      pushed_at: "2026-09-29T05:30:32Z",
      topics: [],
    },
  },
  {
    repoName: "ToDo-List",
    facts: {
      description: null,
      html_url: "https://github.com/NiharikaSahu-12/ToDo-List",
      homepage: null,
      stargazers_count: 0,
      language: "JavaScript",
      pushed_at: "2025-01-04T13:14:54Z",
      topics: [],
    },
  },
  {
    repoName: "notes-app",
    facts: {
      description: "Created a simple note application using HTML, CSS, JavaScript.",
      html_url: "https://github.com/NiharikaSahu-12/notes-app",
      homepage: "https://niharikasahu-12.github.io/notes-app/",
      stargazers_count: 0,
      language: "JavaScript",
      pushed_at: "2024-09-28T10:50:24Z",
      topics: [],
    },
  },
].map(({ repoName, facts }) => buildProject(repoName, facts));

/* --------------------------------------------------------------
   Skills
   -------------------------------------------------------------- */
export const skillCategories = [
  {
    title: "Languages",
    blurb: "The foundations I reach for first.",
    skills: [
      { icon: FaHtml5, name: "HTML5", color: "#E34F26" },
      { icon: FaCss3, name: "CSS3", color: "#1572B6" },
      { icon: FaJs, name: "JavaScript", color: "#E8B62C" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
      { icon: FaDatabase, name: "SQL", color: "#54708C" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    blurb: "How I ship interfaces quickly.",
    skills: [
      { icon: FaReact, name: "React", color: "#4FA8C9" },
      { icon: SiReactrouter, name: "React Router", color: "#C1534B" },
      { icon: SiTailwindcss, name: "Tailwind CSS", color: "#0E9BB8" },
      { icon: FaProjectDiagram, name: "Context API", color: "#7C9885" },
      { icon: SiRedux, name: "Redux Toolkit", color: "#7A5AA8" },
      { icon: SiFramer, name: "Framer Motion", color: "#4A78B5" },
      { icon: SiAxios, name: "Axios", color: "#5F4BB6" },
    ],
  },
  {
    title: "Backend & Data",
    blurb: "Where the content comes from.",
    skills: [
      { icon: FaServer, name: "REST APIs", color: "#5E8FA6" },
      { icon: FaNode, name: "Node.js", color: "#4E9A51" },
      { icon: SiMysql, name: "MySQL", color: "#2E7FA8" },
      { icon: SiMongodb, name: "MongoDB", color: "#3F8E5F" },
      { icon: SiPostman, name: "Postman", color: "#D9632F" },
    ],
  },
  {
    title: "Tools & Workflow",
    blurb: "My day-to-day workflow.",
    skills: [
      { icon: SiVisualstudiocode, name: "VS Code", color: "#2C8EC7" },
      { icon: FaGitAlt, name: "Git", color: "#D4522F" },
      { icon: FaGithub, name: "GitHub", color: "#443E36" },
      { icon: FaNpm, name: "npm", color: "#C4413F" },
      { icon: SiVite, name: "Vite", color: "#6E63C4" },
      { icon: SiEslint, name: "ESLint", color: "#5B6AB8" },
      { icon: SiPrettier, name: "Prettier", color: "#C98A3C" },
      { icon: FaFigma, name: "Figma", color: "#D95F3C" },
      { icon: FaChrome, name: "Chrome DevTools", color: "#4A85C4" },
    ],
  },
];

/* --------------------------------------------------------------
   Currently learning — a short, honest note about what is in
   progress rather than a claim of mastery.
   -------------------------------------------------------------- */
export const learningNow = ["Next.js", "Jest", "React Testing Library", "GitHub Actions"];

/* --------------------------------------------------------------
   Services — what someone can actually hire me for. Every bullet
   maps to work described in the experience and projects below.
   -------------------------------------------------------------- */
export const services = [
  {
    icon: FaLaptopCode,
    title: "Frontend Development",
    blurb: "React interfaces built from a design, a rough sketch or a half-formed idea.",
    deliverables: [
      "React & TypeScript components",
      "Reusable component libraries",
      "Forms, validation & state",
      "REST API integration",
    ],
  },
  {
    icon: FaDrawPolygon,
    title: "Design → Code",
    blurb: "Faithful implementation of a Figma file, with the spacing and type scale left intact.",
    deliverables: [
      "Figma-to-code handoff",
      "Responsive layout systems",
      "Micro-interactions & motion",
      "Design tokens in Tailwind",
    ],
  },
  {
    icon: FaUniversalAccess,
    title: "Performance & Accessibility",
    blurb: "Auditing and fixing the things that quietly make an interface slow or unusable.",
    deliverables: [
      "Core Web Vitals tuning",
      "Keyboard & screen-reader support",
      "Semantic markup & SEO",
      "Cross-browser fixes",
    ],
  },
  {
    icon: FaCodeBranch,
    title: "Ongoing Collaboration",
    blurb: "Dropping into an existing codebase to keep features shipping and quality steady.",
    deliverables: [
      "Feature work in existing repos",
      "Code review & mentoring",
      "Component refactors",
      "Bug triage & maintenance",
    ],
  },
];

/* --------------------------------------------------------------
   Process — how a project tends to run.
   -------------------------------------------------------------- */
export const processSteps = [
  {
    title: "Discover",
    body: "Read the brief, ask the awkward questions and agree on what success looks like before a line of code exists.",
  },
  {
    title: "Design",
    body: "Settle structure and hierarchy first — wireframes or Figma reviews — while changes are still cheap.",
  },
  {
    title: "Build",
    body: "Component-first development with accessible markup, real loading/empty/error states and review checkpoints.",
  },
  {
    title: "Ship & refine",
    body: "A performance and cross-browser pass, then iterate on what real usage actually shows.",
  },
];

/* --------------------------------------------------------------
   Experience
   -------------------------------------------------------------- */
export const experience = [
  {
    company: "Allorasoft Pvt. Ltd",
    logo: Allora_logo,
    alt: "Allorasoft logo",
    role: "Frontend Developer",
    date: "Oct 2023 — Present",
    current: true,
    responsibilities: [
      "Developed and maintained responsive web applications using React.js and Tailwind CSS, resulting in a 25% increase in user engagement.",
      "Optimized application performance, improving load times by 40%",
      "Integrated RESTful APIs to fetch and display dynamic content from MongoDB and MySQL databases",
      "Actively participated in code reviews, providing constructive feedback to improve team code quality",
      "Participated in daily stand-up meetings and weekly sprint planning sessions",
    ],
  },
  {
    company: "Artronaut Creatives LLP",
    logo: Artronaut_logo,
    alt: "Artronaut logo",
    role: "Frontend Developer Intern",
    date: "Feb 2023 — April 2023",
    current: false,
    responsibilities: [
      "Assisted in developing and maintaining responsive web pages using HTML5, CSS3, and JavaScript.",
      "Collaborated with senior developers to implement new features for the company's main product",
      "Gained hands-on experience with different frameworks and executed it in projects",
    ],
  },
];

/* --------------------------------------------------------------
   Derived counts — always in sync with the arrays above.
   The project total is not here: it comes from GitHub at runtime
   (see useGithubProjects), so it can never drift from what renders.
   -------------------------------------------------------------- */
export const stats = {
  skillCount: skillCategories.reduce((sum, c) => sum + c.skills.length, 0),
  roleCount: experience.length,
  serviceCount: services.length,
};
