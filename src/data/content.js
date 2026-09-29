import Allora_logo from "../assets/allora.png";
import Artronaut_logo from "../assets/atronaut.png";
import portfolioImage from "../assets/Projects Images/portfolio.png";
import noteAppImage from "../assets/Projects Images/note_app.png";
import foodiesImage from "../assets/Projects Images/foodies.png";

import {
  FaCss3,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaNpm,
  FaNode,
  FaReact,
} from "react-icons/fa";
import {
  SiPostman,
  SiTailwindcss,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";

/* --------------------------------------------------------------
   Projects — content moved here verbatim so the Highlights strip
   can derive its counts from the same array.
   -------------------------------------------------------------- */
export const projects = [
  {
    title: "Portfolio Website",
    description:
      "A sleek portfolio website built with React and TailwindCSS, showcasing my projects and skills. It features an intuitive layout and responsive design for easy navigation, allowing visitors to explore my work and connect with me seamlessly",
    techStack: ["React", "TailwindCSS"],
    imageUrl: portfolioImage,
    githubLink: "https://github.com/NiharikaSahu-12/portfolio-website",
  },
  {
    title: "Simple Note App",
    description:
      "A note-taking application that allows users to effortlessly create, edit, and categorize their notes. Designed with a clean interface for a seamless user experience.",
    techStack: ["HTML", "CSS", "JavaScript", "Quill.js", "LocalStorage"],
    imageUrl: noteAppImage,
    liveLink: "https://niharikasahu-12.github.io/notes-app/",
    githubLink: "https://github.com/NiharikaSahu-12/notes-app",
  },
  {
    title: "Foodies — Recipe App",
    description:
      "A food recipes app to show your favorite recipes according to categories, areas and recipe name. Also included dark mode.",
    techStack: ["Reactjs", "TailwindCSS", "ContextAPI", "Vite"],
    imageUrl: foodiesImage,
    liveLink: "",
    githubLink: "https://github.com/NiharikaSahu-12/foodies",
  },
];

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
    ],
  },
  {
    title: "Frameworks & Libraries",
    blurb: "How I ship interfaces quickly.",
    skills: [
      { icon: FaReact, name: "React", color: "#4FA8C9" },
      { icon: SiTailwindcss, name: "Tailwind CSS", color: "#0E9BB8" },
    ],
  },
  {
    title: "Tools & Technologies",
    blurb: "My day-to-day workflow.",
    skills: [
      { icon: SiVisualstudiocode, name: "VS Code", color: "#2C8EC7" },
      { icon: FaGitAlt, name: "Git", color: "#D4522F" },
      { icon: FaNpm, name: "npm", color: "#C4413F" },
      { icon: FaNode, name: "Node.js", color: "#4E9A51" },
      { icon: SiPostman, name: "Postman", color: "#D9632F" },
    ],
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
   -------------------------------------------------------------- */
export const stats = {
  projectCount: projects.length,
  skillCount: skillCategories.reduce((sum, c) => sum + c.skills.length, 0),
  roleCount: experience.length,
};
