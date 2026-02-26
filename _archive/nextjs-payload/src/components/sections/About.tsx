'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, TrendingUp, Lightbulb, Target } from 'lucide-react'

const skills = [
  {
    icon: Lightbulb,
    title: 'Startup Strategy & Product Development',
    description:
      'Versatile and pragmatic leader with strong focus on outcome delivery across ventures',
  },
  {
    icon: Users,
    title: 'Sales and Distribution Management',
    description:
      'Strategic sales planning and distribution network optimization for maximized market reach and revenue growth',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing & Analytics',
    description:
      'Data-driven growth strategies and brand leadership across major Indian startups',
  },
  {
    icon: Target,
    title: 'Leadership & Growth Hacking',
    description:
      'Deep curiosity about technology and markets, committed to empowering others through innovation',
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white to-gray-50 py-32"
      ref={ref}
    >
      <div className="container mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <div className="mb-8">
            <span className="mb-4 inline-block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-lg font-semibold tracking-wider text-transparent uppercase">
              About Me
            </span>
            <h2 className="mb-8 text-6xl leading-tight font-bold text-gray-900 md:text-7xl">
              Building the Future of
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Audio & Knowledge
              </span>
            </h2>
          </div>
          <div className="mx-auto max-w-4xl space-y-8">
            <p className="text-2xl leading-relaxed font-light text-gray-600">
              With a proven track record across leading Indian startups and
              corporates, I have held strategic roles in product, marketing, and
              business growth.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="mb-2 font-semibold text-purple-600">
                  Founded October 2024
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  AudioPod AI
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Mission to provide seamless and accessible audio tools for all
                  content creators
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="mb-2 font-semibold text-blue-600">
                  Advanced Technology
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  UnQuest AI
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Building advanced knowledge management systems for the future
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Traits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-32"
        >
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-4xl font-bold text-gray-900">
              Key Traits
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              The core characteristics that drive my approach to building and
              scaling ventures
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-purple-200 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 p-3 transition-transform duration-300 group-hover:scale-110">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-3 text-xl font-bold text-gray-900">
                    Versatile and pragmatic leader
                  </h4>
                  <p className="leading-relaxed text-gray-600">
                    Adapting strategies and approaches based on real-world
                    constraints and opportunities
                  </p>
                </div>
              </div>
            </div>
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-3 transition-transform duration-300 group-hover:scale-110">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-3 text-xl font-bold text-gray-900">
                    Strong focus on outcome delivery
                  </h4>
                  <p className="leading-relaxed text-gray-600">
                    Prioritizing measurable results and tangible impact in every
                    initiative
                  </p>
                </div>
              </div>
            </div>
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-gradient-to-r from-green-500 to-green-600 p-3 transition-transform duration-300 group-hover:scale-110">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-3 text-xl font-bold text-gray-900">
                    Deep curiosity about technology and markets
                  </h4>
                  <p className="leading-relaxed text-gray-600">
                    Continuously exploring emerging trends and technologies to
                    drive innovation
                  </p>
                </div>
              </div>
            </div>
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-pink-200 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 p-3 transition-transform duration-300 group-hover:scale-110">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-3 text-xl font-bold text-gray-900">
                    Committed to empowering others
                  </h4>
                  <p className="leading-relaxed text-gray-600">
                    Building tools and platforms that democratize access to
                    advanced technologies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-32"
        >
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-4xl font-bold text-gray-900">
              Core Expertise
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              The skills and knowledge areas that power my entrepreneurial
              journey
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="group text-center"
              >
                <div className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 group-hover:border-purple-200 group-hover:shadow-xl">
                  <div className="mx-auto mb-6 w-fit rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-4 transition-transform duration-300 group-hover:scale-110">
                    <skill.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="mb-4 text-lg leading-tight font-bold text-gray-900">
                    {skill.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-12 text-white shadow-2xl">
            <div className="mx-auto max-w-3xl">
              <h3 className="mb-6 text-4xl font-bold">
                Ready to Build the Next Big Thing?
              </h3>
              <p className="mb-8 text-xl leading-relaxed text-purple-100">
                I&apos;m always looking for exciting opportunities to
                collaborate on innovative projects and scale impactful
                businesses. Let&apos;s create something that matters.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="transform rounded-full bg-white px-8 py-4 text-center font-semibold text-purple-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                >
                  Let&apos;s Collaborate
                </a>
                <a
                  href="#experience"
                  className="transform rounded-full border-2 border-white px-8 py-4 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-purple-600"
                >
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
