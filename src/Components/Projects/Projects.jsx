import React from 'react'
import ProjectCard from './ProjectCard'; 
import portfolioImage from "../../assets/Projects Images/portfolio.png"
import noteAppImage from "../../assets/Projects Images/note_app.png"


const projects = [
  {
    title: "Portfolio Website",
    description: "A sleek portfolio website built with React and TailwindCSS, showcasing my projects and skills. It features an intuitive layout and responsive design for easy navigation, allowing visitors to explore my work and connect with me seamlessly",
    techStack: ["React", "TailwindCSS"],
    imageUrl: portfolioImage,
    githubLink: "https://github.com/NiharikaSahu-12/portfolio-website",
  },
  {
    title: "Simple Note App",
    description: "A note-taking application that allows users to effortlessly create, edit, and categorize their notes. Designed with a clean interface for a seamless user experience.",
    techStack: ["HTML", "CSS", "JavaScript", "Quill.js", "LocalStorage"],
    imageUrl: noteAppImage,
    liveLink: "https://niharikasahu-12.github.io/notes-app/",
    githubLink: "https://github.com/NiharikaSahu-12/notes-app",
  }
]


const Projects = () => {
  return (
    <section id="Projects" className="py-24 px-20 bg-slate-800 min-h-screen" >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects