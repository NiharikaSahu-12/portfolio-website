import React from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 pb-2">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="p-4 pt-2">
        <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, techIndex) => (
            <span key={techIndex} className="px-2 py-1 bg-[#2d3a6d] text-gray-200 text-sm rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#2d3a6d] hover:bg-[#3a4d8a] text-white rounded-lg transition-colors duration-300"
          >
            <FaGithub className="mr-2" />
            Code
          </a>
          {index !== 0 && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
            >
              <FaExternalLinkAlt className="mr-2" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard