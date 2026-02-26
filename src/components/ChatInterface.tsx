'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getChatResponse } from '@/lib/openai'
import { ContactModal } from './ContactModal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactModalMessage, setContactModalMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const modalInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? ('user' as const) : ('assistant' as const),
        content: msg.text,
      }))

      const chatResult = await getChatResponse(trimmed, conversationHistory)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: chatResult.response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, botMessage])

      if (chatResult.shouldShowContact) {
        setTimeout(() => {
          setContactModalMessage(
            `Based on our conversation about "${trimmed}", I&apos;d love to connect with you further!`
          )
          setShowContactModal(true)
        }, 2000)
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I&apos;m experiencing some technical difficulties right now. Feel free to reach out directly through the contact form below!',
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(input)
  }

  const handleQuickQuestion = (question: string) => {
    setIsOpen(true)
    setInput(question)
    setTimeout(() => {
      void sendMessage(question)
    }, 150)
  }

  const quickQuestions = [
    'What do you do?',
    'Tell me about AudioPod AI',
    'What&apos;s your experience?',
    'What are your skills?',
    'Are you available for hire?',
  ]

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        modalInputRef.current?.focus()
      }, 150)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  return (
    <>
      {/* Trigger field that doesn't change layout */}
      <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <input
            type="text"
            readOnly
            placeholder="Ask me anything..."
            onFocus={() => setIsOpen(true)}
            onClick={() => setIsOpen(true)}
            className="w-full cursor-text rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/70 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-white/15 focus:border-transparent focus:ring-2 focus:ring-purple-400 focus:outline-none sm:px-5 sm:py-3 sm:text-base md:px-6 md:py-4"
          />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600 sm:right-2 sm:h-9 sm:w-9 md:h-10 md:w-10"
            aria-label="Open chat"
          >
            <svg
              className="h-3 w-3 text-white sm:h-4 sm:w-4 md:h-5 md:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Modal overlay for chat */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="w-[calc(100%-2rem)] overflow-hidden border-white/20 bg-white/10 p-0 backdrop-blur-xl sm:max-w-lg"
          showCloseButton={false}
        >
          <DialogHeader className="border-b border-white/20 bg-gradient-to-r from-purple-600/40 to-blue-600/40 p-4">
            <DialogTitle className="text-white">Chat with Rakesh</DialogTitle>
          </DialogHeader>

          {/* Messages */}
          <div className="h-[60vh] space-y-3 overflow-y-auto p-4 sm:h-[65vh]">
            {messages.length === 0 && (
              <div className="text-center text-sm text-white/70">
                <p className="mb-3">👋 Hi! I&apos;m Rakesh. Ask me anything!</p>
                <div className="space-y-2">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="block w-full rounded-lg bg-white/10 px-3 py-2 text-left text-xs transition-colors hover:bg-white/20"
                    >
                      {question}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setContactModalMessage(
                        'I&apos;d love to hear from you! Let&apos;s connect and discuss opportunities.'
                      )
                      setShowContactModal(true)
                    }}
                    className="block w-full rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 py-2 text-left text-xs transition-all duration-300 hover:from-purple-500/30 hover:to-blue-500/30"
                  >
                    📞 Contact Me Directly
                  </button>
                </div>
              </div>
            )}

            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-white/20 px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-white/70"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-white/70"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-white/70"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/20 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                ref={modalInputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/70 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm text-white transition-all duration-300 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
              >
                Send
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-white/70 transition-colors hover:text-white"
                aria-label="Close chat"
              >
                Close
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        initialMessage={contactModalMessage}
      />
    </>
  )
}
