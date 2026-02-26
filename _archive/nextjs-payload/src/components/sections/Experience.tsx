'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Calendar, ExternalLink, Github, MapPin } from 'lucide-react'

type ExperienceItem = {
  type: 'work' | 'project'
  title: string
  company?: string
  location?: string
  period: string
  description: string
  technologies: string[]
  current?: boolean
  website?: string
  githubUrl?: string
  stars?: number
}

const experiences: ExperienceItem[] = [
  {
    type: 'work',
    title: 'Founder',
    company: 'AudioPod AI',
    location: 'Bengaluru, India',
    period: 'Nov 2024 - Present',
    description:
      'Building AudioPod AI, an unified AI audio workstation to create, edit and publish audio content directly from the browser without needing expensive software or gear. Like Canva for Audio, enabling creators to streamline their audio production process.',
    technologies: ['AI/ML', 'Audio Processing', 'Product Strategy'],
    current: true,
    website: 'https://audiopod.ai',
  },
  {
    type: 'work',
    title: 'Founder',
    company: 'UnQuest AI',
    location: 'Bengaluru, India',
    period: 'Nov 2023 - Oct 2024',
    description:
      "Building world's best knowledge companion product. Advanced knowledge management systems using AI.",
    technologies: ['AI/ML', 'Knowledge Management', 'NLP'],
    current: true,
    website: 'https://unquest.ai',
  },
  {
    type: 'work',
    title: 'Deputy General Manager',
    company: 'Paytm',
    location: 'India',
    period: 'Jan 2023 - Nov 2023',
    description:
      'Led Business Product for Paytm Soundbox service team. Managed product roadmap, features and go-to-market strategy.',
    technologies: ['Strategy', 'Growth', 'Fintech'],
    current: false,
  },
  {
    type: 'work',
    title: 'Strategy & Growth',
    company: 'Ninjacart',
    location: 'Bengaluru, India',
    period: 'Oct 2021 - Dec 2022',
    description:
      'Led 0-1 intiatives for Ninjacart Fintech business. Built and scaled the embedded origination and collection stack.',
    technologies: ['Strategy', 'Agri-tech', 'Operations'],
    current: false,
  },
  {
    type: 'work',
    title: 'Marketing Manager',
    company: 'Bharti Airtel',
    location: 'India',
    period: 'Nov 2020 - Sept 2021',
    description:
      'Managed 500+ cr topline marketing intiatives for Airtel Karnataka. Led customer usage and retention initiatives.',
    technologies: ['Digital Marketing', 'Brand Strategy', 'Analytics'],
    current: false,
  },
  {
    type: 'work',
    title: 'Zonal Sales Manager',
    company: 'Bharti Airtel',
    location: 'India',
    period: 'Aug 2019 - Nov 2020',
    description:
      'Managed 5+ cr topline sales operations across Semi-urban Hyderabad. Achieved consistent growth targets.',
    technologies: ['Sales', 'Operations', 'Team Management'],
    current: false,
  },
  {
    type: 'work',
    title: 'Management Associate',
    company: 'Singtel',
    location: 'Singapore',
    period: 'Jun 2019 - Jul 2019',
    description:
      'Ran product marketing campaigns for prepaid services in Southeast Asian markets.',
    technologies: ['Product Marketing', 'Telecom', 'Analytics'],
    current: false,
  },
  {
    type: `work`,
    title: `Young Leader`,
    company: `Bharti Airtel`,
    location: `India`,
    period: `Jun 2018 - May 2019`,
    description: `Sales and Marketing stints across Rural and Urban Indian markets.`,
    technologies: [`Sales`, `Marketing`, `Leadership`],
  },
  {
    type: 'work',
    title: 'Summer Intern',
    company: 'iB Hubs',
    location: 'India',
    period: 'Apr 2017 - May 2017',
    description:
      'Gained experience in startup ecosystem. Worked on business development and market research initiatives.',
    technologies: [
      'Startup Ecosystem',
      'Business Development',
      'Market Research',
    ],
    current: false,
  },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const allItems = [...experiences].sort((a, b) => {
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
    <section id="experience" className="bg-gray-50 py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-5xl font-bold text-gray-900">
            Work Experience
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            A timeline of my professional journey so far.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600"></div>

            {allItems.map((item, index) => (
              <motion.div
                key={`${item.type}-${item.title}`}
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative mb-12 flex items-start"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 z-10 h-4 w-4 rounded-full border-4 border-white shadow-lg ${
                    'current' in item && item.current
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : item.type === 'work'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                  }`}
                ></div>

                {/* Content */}
                <div className="group ml-16 w-full rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        {item.type === 'work' ? (
                          <Building2 className="h-5 w-5 text-purple-600" />
                        ) : (
                          <Github className="h-5 w-5 text-green-600" />
                        )}
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                        {'current' in item && item.current && (
                          <span className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-1 text-xs font-medium text-white">
                            Current
                          </span>
                        )}
                      </div>

                      {item.type === 'work' && (
                        <div className="mb-2 flex items-center gap-4 text-gray-600">
                          <span className="font-semibold text-purple-600">
                            {item.company ?? ''}
                          </span>
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mb-3 flex items-center gap-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{item.period}</span>
                        {typeof item.stars === 'number' && (
                          <div className="ml-4 flex items-center gap-1">
                            <svg
                              className="h-4 w-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{item.stars}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2 lg:mt-0">
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-gray-800 p-2 text-white transition-colors duration-300 hover:bg-gray-700"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-purple-600 p-2 text-white transition-colors duration-300 hover:bg-purple-700"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mb-4 leading-relaxed text-gray-600">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
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
      </div>
    </section>
  )
}
