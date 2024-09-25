import React from "react";
import { FaCss3, FaHtml5, FaJs, FaReact, FaGitAlt, FaNpm, FaNode } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiVisualstudiocode, SiPostman } from "react-icons/si";

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { icon: FaHtml5, name: "HTML5", color: "#E34F26" },
        { icon: FaCss3, name: "CSS3", color: "#1572B6" },
        { icon: FaJs, name: "JavaScript", color: "#F7DF1E" },
        { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { icon: FaReact, name: "React", color: "#61DAFB" },
        { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { icon: SiVisualstudiocode, name: "VS Code", color: "#007ACC" },
        { icon: FaGitAlt, name: "Git", color: "#F05032" },
        { icon: FaNpm, name: "npm", color: "#CB3837" },
        { icon: FaNode, name: "Node.js", color: "#339933" },
        { icon: SiPostman, name: "Postman", color: "#FF6C37" },
      ],
    },
  ];

  return (
    <section id="Skills" className="bg-slate-900 text-white pt-24 pb-24 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Skills & Technologies</h2>
        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-slate-800 rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:bg-slate-700 hover:scale-105 hover:shadow-lg"
                  >
                    <skill.icon color={skill.color} size={32} className="mb-2 transition-all duration-300" />
                    <span className="text-xs font-medium text-center">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
