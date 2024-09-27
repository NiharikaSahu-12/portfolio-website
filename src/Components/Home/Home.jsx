import React from "react";
import avatarImg from "../../assets/home.png";
import TextChange from "../TextChange";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi"; 

export default function Home() {
  return (
    <div className="text-white flex flex-col md:flex-row min-h-screen justify-between items-center p-4 md:p-20 pt-24 md:pt-32">
      <div className="md:w-2/4 md:pt-10 text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-bold flex flex-col md:flex-row leading-normal tracking-tighter mb-4">
          Hey, I'm Niharika Sahu!
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold text-[#465697] mb-4">
          <TextChange />
        </h2>
        <p className="text-sm md:text-xl tracking-tight mt-4 mb-6">
          Passionate about crafting beautiful, responsive, and user-friendly web experiences.
          Always eager to discover new technologies, I quickly adapt and thrive, constantly expanding my expertise.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
          {["React", "JavaScript", "HTML5", "CSS3", "Tailwind", "Node.js"].map((skill) => (
            <span key={skill} className="bg-[#465697] text-white px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-4 justify-center md:justify-start">
          <a
            href="https://github.com/NiharikaSahu-12" 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 md:mt-10 flex items-center gap-2 text-white py-2 px-4 text-sm md:text-lg font-semibold rounded-3xl bg-[#465697] hover:bg-slate-900 transition-all duration-300 shadow-md"
          >
            View Projects <FaGithub className="text-lg" />
          </a>
          <a
            href="https://linkedin.com/in/niharikasahu12" 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 md:mt-10 flex items-center gap-2 text-white py-2 px-4 text-sm md:text-lg font-semibold rounded-3xl bg-[#465697] hover:bg-slate-900 transition-all duration-300 shadow-md"
          >
            Connect <FiExternalLink className="text-lg" />
          </a>
        </div>
      </div>
      <div className="mt-8 md:mt-0 relative">
        <img
          className="max-w-full h-auto rounded-full border-4 border-[#465697] shadow-lg transition-all duration-300 hover:shadow-2xl shadow-[#465697] glow-effect"
          src={avatarImg}
          alt="Avatar"
        />
      </div>
    </div>
  );
}