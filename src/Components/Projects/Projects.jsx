import React from 'react'
import ProjectCard from './ProjectCard'; 
import portfolioImage from "../../assets/Projects Images/portfolio.png"


const projects = [
  {
    title: "Portfolio Website",
    description: "A web app built with React and TailwindCSS that allows users to manage tasks effectively.",
    techStack: ["React", "TailwindCSS", "Node.js"],
    imageUrl: portfolioImage,
    githubLink: "https://github.com/username/project-one",
  },
  {
    title: "E-commerce Platform",
    description: "An online store that provides a seamless shopping experience for users.",
    techStack: ["Next.js", "TailwindCSS", "MongoDB"],
    imageUrl: "/placeholder.svg?height=250&width=400",
    liveLink: "https://example.com",
    githubLink: "https://github.com/username/project-two",
  },
  {
    title: "Weather App",
    description: "A real-time weather application with location-based forecasts.",
    techStack: ["React Native", "Redux", "OpenWeatherMap API"],
    imageUrl: "/placeholder.svg?height=250&width=400",
    liveLink: "https://example.com",
    githubLink: "https://github.com/username/project-three",
  }
]


const Projects = () => {
  return (
    <section id="Projects" className="py-20 px-20 bg-slate-800 min-h-screen" >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
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