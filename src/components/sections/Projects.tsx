'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'FocusTimer',
    description: 'A minimalist, non-intrusive focus timer for macOS that helps you stay productive with the Pomodoro Technique. Built with Swift for optimal performance.',
    image: '/project1.jpg',
    technologies: ['Swift', 'macOS', 'AppKit', 'Core Graphics'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Rakesh1002/FocusTimer',
    featured: true
  },
  {
    title: 'YobiMoney',
    description: 'A modern financial management platform built with TypeScript, focusing on user experience and financial insights.',
    image: '/project2.jpg',
    technologies: ['TypeScript', 'React', 'Node.js', 'Financial APIs'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Rakesh1002/YobiMoney',
    featured: true
  },
  {
    title: 'UnQuest-AI',
    description: 'An AI-powered platform leveraging machine learning to solve complex problems with intelligent automation.',
    image: '/project3.jpg',
    technologies: ['TypeScript', 'AI/ML', 'React', 'Python'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Rakesh1002/UnQuest-AI',
    featured: false
  },
  {
    title: 'Next.js Starter Kit',
    description: 'The ultimate Next.js starter kit for building SAAS products. Batteries included with modern development practices.',
    image: '/project4.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Rakesh1002/nextjs-starter-kit',
    featured: false
  }
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of innovative products and solutions I've built, showcasing my passion for 
            creating technology that makes a real impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 bg-gradient-to-br from-purple-400 to-pink-400">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <a 
                    href={project.liveUrl}
                    className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href={project.githubUrl}
                    className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: (index + 2) * 0.2 }}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-400">
                <div className="absolute top-3 right-3 flex space-x-2">
                  <a 
                    href={project.liveUrl}
                    className="bg-white bg-opacity-20 backdrop-blur-sm p-1.5 rounded-full hover:bg-opacity-30 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                  <a 
                    href={project.githubUrl}
                    className="bg-white bg-opacity-20 backdrop-blur-sm p-1.5 rounded-full hover:bg-opacity-30 transition-all duration-300"
                  >
                    <Github className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <a 
            href="https://github.com/Rakesh1002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}