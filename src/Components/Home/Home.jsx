import React from "react";
import avatarImg from "../../assets/7358602-removebg-preview.png";
import TextChange from "../TextChange";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Home() {
  return (
    <div className="text-white flex flex-col md:flex-row w-full justify-between items-center p-4 md:p-20 pt-24 md:pt-32">
      <div className="md:w-2/4 md:pt-10 text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-bold flex flex-col md:flex-row leading-normal tracking-tighter mb-4">
          <TextChange />
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold text-[#465697] mb-4">
          Frontend Developer & UI/UX Enthusiast
        </h2>
        <p className="text-sm md:text-xl tracking-tight mt-4 mb-6">
          Passionate about crafting beautiful, responsive, and user-friendly web experiences. 
          Currently expanding my skills in the MERN stack to build full-stack applications.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
          {["React", "JavaScript", "HTML5", "CSS3", "Tailwind", "Node.js"].map((skill) => (
            <span key={skill} className="bg-[#465697] text-white px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-4 justify-center md:justify-start">
          <button className="mt-5 md:mt-10 text-white py-2 px-4 text-sm md:text-lg hover:opacity-85 duration-300 hover:scale-105 font-semibold rounded-3xl bg-[#465697]">
            View Resume
          </button>
          {/* <button className="mt-5 md:mt-10 text-[#465697] py-2 px-4 text-sm md:text-lg hover:bg-[#465697] hover:text-white duration-300 hover:scale-105 font-semibold rounded-3xl border-2 border-[#465697]">
            My Projects
          </button> */}
        </div>
        <div className="flex justify-center md:justify-start gap-8 py-10">
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-950 flex items-center justify-center rounded-2xl hover:opacity-85 duration-300 hover:scale-105">
            <FaLinkedin color="#0A66C2" size={30} />
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-950 flex items-center justify-center rounded-2xl hover:opacity-85 duration-300 hover:scale-105">
            <FaGithub color="#FFFFFF" size={30} />
          </a>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-950 flex items-center justify-center rounded-2xl hover:opacity-85 duration-300 hover:scale-105">
            <FaInstagram color="#E4405F" size={30} />
          </a>
        </div>
      </div>
      <div className="mt-8 md:mt-0 relative">
        <img className="max-w-full h-auto rounded-full border-4 border-[#465697]" src={avatarImg} alt="Avatar" />
        {/* <div className="absolute bottom-4 right-4 bg-[#465697] text-white py-2 px-4 rounded-full text-sm font-semibold">
          Open to Work
        </div> */}
      </div>
    </div>
  );
}