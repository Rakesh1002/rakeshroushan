'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, TrendingUp, Lightbulb, Target } from 'lucide-react'

const skills = [
  {
    icon: Lightbulb,
    title: 'Startup Strategy & Product Development',
    description: 'Versatile and pragmatic leader with strong focus on outcome delivery across ventures'
  },
  {
    icon: Users,
    title: 'Sales and Distribution Management',
    description: 'Strategic sales planning and distribution network optimization for maximized market reach and revenue growth'
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing & Analytics',
    description: 'Data-driven growth strategies and brand leadership across major Indian startups'
  },
  {
    icon: Target,
    title: 'Leadership & Growth Hacking',
    description: 'Deep curiosity about technology and markets, committed to empowering others through innovation'
  }
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="container mx-auto px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-lg font-semibold uppercase tracking-wider mb-4">
              About Me
            </span>
            <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Building the Future of
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Audio & Knowledge
              </span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-2xl text-gray-600 leading-relaxed font-light">
              With a proven track record across leading Indian startups and corporates, I have held strategic roles in product, marketing, and business growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="text-purple-600 font-semibold mb-2">Founded October 2024</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AudioPod AI</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mission to provide seamless and accessible audio tools for all content creators
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="text-blue-600 font-semibold mb-2">Advanced Technology</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">UnQuest AI</h3>
                <p className="text-gray-600 leading-relaxed">
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
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Key Traits</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The core characteristics that drive my approach to building and scaling ventures
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Versatile and pragmatic leader</h4>
                  <p className="text-gray-600 leading-relaxed">Adapting strategies and approaches based on real-world constraints and opportunities</p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Strong focus on outcome delivery</h4>
                  <p className="text-gray-600 leading-relaxed">Prioritizing measurable results and tangible impact in every initiative</p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Deep curiosity about technology and markets</h4>
                  <p className="text-gray-600 leading-relaxed">Continuously exploring emerging trends and technologies to drive innovation</p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Committed to empowering others</h4>
                  <p className="text-gray-600 leading-relaxed">Building tools and platforms that democratize access to advanced technologies</p>
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
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Core Expertise</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The skills and knowledge areas that power my entrepreneurial journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:border-purple-200 transition-all duration-300 h-full">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">{skill.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{skill.description}</p>
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
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-4xl font-bold mb-6">Ready to Build the Next Big Thing?</h3>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                I'm always looking for exciting opportunities to collaborate on innovative projects and scale impactful businesses.
                Let's create something that matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Let's Collaborate
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
                  View My Work
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}