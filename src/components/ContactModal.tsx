'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2 } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  initialMessage?: string
}

interface FormData {
  name: string
  email: string
  company: string
  message: string
  type: 'collaboration' | 'hiring' | 'consultation' | 'other'
}

export function ContactModal({
  isOpen,
  onClose,
  initialMessage = '',
}: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: initialMessage,
    type: 'other',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send to your backend/email service
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'chat_interface',
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
            type: 'other',
          })
        }, 2000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Sorry, there was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      Let&apos;s Connect!
                    </h2>
                    <button
                      onClick={onClose}
                      className="rounded-full p-1 transition-colors hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-purple-100">
                    I&apos;d love to hear from you. Let&apos;s discuss
                    opportunities!
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      What&apos;s this about? *
                    </label>
                    <select
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="other">General Inquiry</option>
                      <option value="collaboration">
                        Collaboration Opportunity
                      </option>
                      <option value="hiring">Job/Hiring Opportunity</option>
                      <option value="consultation">
                        Consultation/Advisory
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 transition-colors outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="Tell me about your project, opportunity, or how I can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-white transition-all duration-200 hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thanks for reaching out! I&apos;ll get back to you within 24
                  hours.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
