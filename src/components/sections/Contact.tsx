'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="bg-gray-900 py-32 text-white" ref={ref}>
      <div className="container mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-8 text-6xl font-bold">Let&apos;s Build Together</h2>
          <p className="mx-auto max-w-4xl text-2xl leading-relaxed text-gray-300">
            Ready to turn your innovative ideas into successful products?
            Let&apos;s connect and explore how we can create something amazing
            together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full space-y-12 rounded-3xl border border-gray-700/50 bg-gray-800/50 p-8 backdrop-blur-sm"
          >
            <h3 className="mb-10 text-3xl font-bold">Get In Touch</h3>

            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="rounded-2xl bg-purple-600 p-4">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Business Inquiries
                  </h4>
                  <p className="text-lg text-gray-300">
                    Connect via LinkedIn for collaborations
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="rounded-2xl bg-purple-600 p-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-semibold">Location</h4>
                  <p className="text-lg text-gray-300">
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-8">
              <h4 className="mb-2 text-xl font-semibold">Connect With Me</h4>

              <a
                href="https://www.linkedin.com/in/rakeshroushan1002/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-6"
              >
                <div className="rounded-2xl bg-purple-600 p-4">
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">LinkedIn</h4>
                  <p className="text-lg text-gray-300">rakeshroushan1002</p>
                </div>
              </a>

              <a
                href="https://github.com/Rakesh1002"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-6"
              >
                <div className="rounded-2xl bg-purple-600 p-4">
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">GitHub</h4>
                  <p className="text-lg text-gray-300">Rakesh1002</p>
                </div>
              </a>

              <a
                href="https://twitter.com/rakeshroushan"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-6"
              >
                <div className="rounded-2xl bg-purple-600 p-4">
                  <Twitter className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">Twitter</h4>
                  <p className="text-lg text-gray-300">@rakeshroushan</p>
                </div>
              </a>

              <a
                href="mailto:contact@rakeshroushan.com"
                className="group flex items-center space-x-6"
              >
                <div className="rounded-2xl bg-purple-600 p-4">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">Email</h4>
                  <p className="text-lg text-gray-300">
                    contact@rakeshroushan.com
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-full rounded-3xl border border-gray-700/50 bg-gray-800/50 p-8 backdrop-blur-sm"
          >
            <h3 className="mb-8 text-3xl font-bold">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-3 block text-lg font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-600 bg-gray-800 px-6 py-4 text-lg transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block text-lg font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-600 bg-gray-800 px-6 py-4 text-lg transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-3 block text-lg font-medium"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-600 bg-gray-800 px-6 py-4 text-lg transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Project inquiry"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block text-lg font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-gray-600 bg-gray-800 px-6 py-4 text-lg transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full transform items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="h-6 w-6" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
