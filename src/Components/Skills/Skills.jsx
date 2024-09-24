import React from "react";
import { FaCss3, FaFigma, FaHtml5, FaJs, FaReact, FaGitAlt, FaNpm, FaNode } from "react-icons/fa";
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
        { icon: FaNode, name: "Node.js", color: "#339933" },
      ],
    },
    {
      title: "Tools",
      skills: [
        { icon: SiVisualstudiocode, name: "VS Code", color: "#007ACC" },
        { icon: FaGitAlt, name: "Git", color: "#F05032" },
        { icon: FaNpm, name: "npm", color: "#CB3837" },
        { icon: SiPostman, name: "Postman", color: "#FF6C37" },
      ],
    },
    // {
    //   title: "Design",
    //   skills: [
    //     { icon: FaFigma, name: "Figma", color: "#F24E1E" },
    //     { icon: SiAdobexd, name: "Adobe XD", color: "#FF61F6" },
    //   ],
    // },
  ];

  return (
    <div id="Skills" className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
        {skillCategories.map((category, index) => (
          <div key={index} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">{category.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1"
                >
                  <skill.icon color={skill.color} size={48} className="mb-2" />
                  <span className="text-sm font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
