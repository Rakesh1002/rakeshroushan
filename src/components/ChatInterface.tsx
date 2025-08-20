'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getChatResponse } from '@/lib/openai'
import { ContactModal } from './ContactModal'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.text
      }))

      const chatResult = await getChatResponse(trimmed, conversationHistory)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: chatResult.response,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])

      if (chatResult.shouldShowContact) {
        setTimeout(() => {
          setContactModalMessage(`Based on our conversation about "${trimmed}", I'd love to connect with you further!`)
          setShowContactModal(true)
        }, 2000)
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some technical difficulties right now. Feel free to reach out directly through the contact form below!",
        isUser: false,
        timestamp: new Date()
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
    "What do you do?",
    "Tell me about AudioPod AI",
    "What's your experience?",
    "What are your skills?",
    "Are you available for hire?"
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
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
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
            className="w-full px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 text-sm sm:text-base rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-text"
          />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
            aria-label="Open chat"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Modal overlay for chat */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white/10 backdrop-blur-xl border-white/20 p-0 overflow-hidden sm:max-w-lg w-[calc(100%-2rem)]" showCloseButton={false}>
          <DialogHeader className="p-4 border-b border-white/20 bg-gradient-to-r from-purple-600/40 to-blue-600/40">
            <DialogTitle className="text-white">Chat with Rakesh</DialogTitle>
          </DialogHeader>

          {/* Messages */}
          <div className="h-[60vh] sm:h-[65vh] overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-white/70 text-sm">
                <p className="mb-3">👋 Hi! I'm Rakesh. Ask me anything!</p>
                <div className="space-y-2">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="block w-full text-left px-3 py-2 text-xs bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setContactModalMessage("I'd love to hear from you! Let's connect and discuss opportunities.")
                      setShowContactModal(true)
                    }}
                    className="block w-full text-left px-3 py-2 text-xs bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 rounded-lg transition-all duration-300"
                  >
                    📞 Contact Me Directly
                  </button>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
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
                <div className="bg-white/20 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                ref={modalInputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white text-sm hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
              >
                Send
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-white/70 hover:text-white transition-colors"
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