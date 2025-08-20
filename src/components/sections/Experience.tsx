'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Calendar, ExternalLink, Github, MapPin } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Co-Founder',
    company: 'AudioPod AI',
    location: 'Bengaluru, India',
    period: 'Oct 2024 - Present',
    description: 'Created an AI-driven audio studio making audio accessible to all; leading product and business strategy. Like Canva for Audio, enabling creators to clean, process, translate, and clone voices.',
    technologies: ['AI/ML', 'Audio Processing', 'Product Strategy'],
    current: true,
    website: 'https://audiopod.ai'
  },
  {
    type: 'work',
    title: 'Founder',
    company: 'UnQuest AI',
    location: 'Bengaluru, India',
    period: 'Nov 2023 - Present',
    description: 'Building world\'s best knowledge companion product. Advanced knowledge management systems using AI.',
    technologies: ['AI/ML', 'Knowledge Management', 'NLP'],
    current: true,
    website: 'https://unquest.ai'
  },
  {
    type: 'work',
    title: 'Deputy General Manager',
    company: 'Paytm',
    location: 'India',
    period: 'Jan 2023 - Nov 2023',
    description: 'Drove strategic growth initiatives across multiple business verticals in India\'s leading fintech platform.',
    technologies: ['Strategy', 'Growth', 'Fintech'],
    current: false
  },
  {
    type: 'work',
    title: 'Strategy & Growth',
    company: 'Ninjacart',
    location: 'Bengaluru, India',
    period: 'Oct 2021 - Jan 2023',
    description: 'Led business and corporate strategy in agri-tech. Scaled operations and drove strategic partnerships.',
    technologies: ['Strategy', 'Agri-tech', 'Operations'],
    current: false
  },
  {
    type: 'work',
    title: 'Marketing Manager',
    company: 'Bharti Airtel',
    location: 'India',
    period: 'Nov 2020 - Sept 2021',
    description: 'Brand and digital marketing leadership roles. Managed large-scale marketing campaigns.',
    technologies: ['Digital Marketing', 'Brand Strategy', 'Analytics'],
    current: false
  },
  {
    type: 'work',
    title: 'Zonal Sales Manager',
    company: 'Bharti Airtel',
    location: 'India',
    period: 'Aug 2019 - Nov 2020',
    description: 'Managed large-scale sales operations across multiple zones. Achieved consistent growth targets.',
    technologies: ['Sales', 'Operations', 'Team Management'],
    current: false
  },
  {
    type: 'work',
    title: 'Management Associate',
    company: 'Singtel',
    location: 'Singapore',
    period: 'Jun 2019 - Jul 2019',
    description: 'Ran product marketing campaigns for prepaid services in Southeast Asian markets.',
    technologies: ['Product Marketing', 'Telecom', 'Analytics'],
    current: false
  },
  {
    type: 'work',
    title: 'Summer Intern',
    company: 'iB Hubs',
    location: 'India',
    period: 'Apr 2017 - May 2017',
    description: 'Gained experience in startup ecosystem. Worked on business development and market research initiatives.',
    technologies: ['Startup Ecosystem', 'Business Development', 'Market Research'],
    current: false
  }
]

const projects = [
  {
    type: 'project',
    title: 'YobiMoney',
    period: '2024',
    description: 'Modern financial management platform built with TypeScript, focusing on user experience and financial insights.',
    technologies: ['TypeScript', 'React', 'Node.js', 'Financial APIs'],
    githubUrl: 'https://github.com/Rakesh1002/YobiMoney',
    stars: 2
  },
  {
    type: 'project',
    title: 'FocusTimer',
    period: '2024',
    description: 'A minimalist, non-intrusive focus timer for macOS that helps you stay productive with the Pomodoro Technique.',
    technologies: ['Swift', 'macOS', 'AppKit', 'Core Graphics'],
    githubUrl: 'https://github.com/Rakesh1002/FocusTimer',
    stars: 2
  },
  {
    type: 'project',
    title: 'Heya',
    period: '2023',
    description: 'AI Virtual Girlfriend.',
    technologies: ['Python', 'Text to Speech', 'Speech to Text', 'Websocket', 'APIs'],
    githubUrl: 'https://github.com/Rakesh1002/Heya'
  },
  {
    type: 'project',
    title: 'Andromeda',
    period: '2023',
    description: 'Experimental project exploring new technologies and development patterns.',
    technologies: ['JavaScript', 'Experimental'],
    githubUrl: 'https://github.com/Rakesh1002/andromeda'
  }
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const allItems = [...experiences, ...projects].sort((a, b) => {
    // Sort by current status first, then by period
    if ('current' in a && 'current' in b && a.current && !b.current) return -1
    if ('current' in a && 'current' in b && !a.current && b.current) return 1
    
    // For period sorting, extract year
    const getYear = (period: string) => {
      if (period.includes('Present')) return 9999
      const matches = period.match(/(\d{4})/g)
      return matches ? Math.max(...matches.map(Number)) : 0
    }
    
    return getYear(b.period) - getYear(a.period)
  })

  return (
    <section id="experience" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Projects Timeline</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A timeline of my professional journey and technical projects, 
            from startup ventures to innovative side projects and open-source contributions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600"></div>
            
            {allItems.map((item, index) => (
              <motion.div
                key={`${item.type}-${item.title}`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative flex items-start mb-12"
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 ${
                  'current' in item && item.current 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : item.type === 'work' 
                      ? 'bg-blue-500' 
                      : 'bg-green-500'
                }`}></div>
                
                {/* Content */}
                <div className="ml-16 bg-white rounded-xl shadow-lg p-6 w-full group hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {item.type === 'work' ? (
                          <Building2 className="w-5 h-5 text-purple-600" />
                        ) : (
                          <Github className="w-5 h-5 text-green-600" />
                        )}
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        {'current' in item && item.current && (
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      
                      {item.type === 'work' && (
                        <div className="flex items-center gap-4 text-gray-600 mb-2">
                          <span className="font-semibold text-purple-600">{'company' in item ? item.company : ''}</span>
                          {'location' in item && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{item.period}</span>
                        {'stars' in item && item.stars && (
                          <div className="flex items-center gap-1 ml-4">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{item.stars}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 lg:mt-0">
                      {'githubUrl' in item && item.githubUrl && (
                        <a 
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {'website' in item && item.website && (
                        <a 
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.type === 'work' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
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