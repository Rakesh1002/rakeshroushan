'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { BookOpen, Mail, Calendar, ArrowRight, Check, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  readingTime: number
  category: string
  featured: boolean
  author: {
    firstName: string
    lastName: string
  }
}

interface BlogProps {
  posts: BlogPost[]
}

export function Blog({ posts }: BlogProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubscribed) return

    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubscribed(true)
        setEmail('')
      } else {
        setError(result.error || 'Subscription failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white" ref={ref}>
      <div className="container mx-auto px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold text-gray-900 mb-8">Blog & Writings</h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Thoughts on technology, leadership, and building products that matter. 
            Subscribe to get my latest insights delivered to your inbox.
          </p>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 mb-24 text-white shadow-2xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Mail className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-purple-100 mb-8 text-xl leading-relaxed">
              Get notified when I publish new articles about technology, AI, and product development.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white/40 h-14 text-lg px-6 rounded-xl"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-white text-purple-600 hover:bg-purple-50 font-semibold px-8 h-14 rounded-xl text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-5 h-5" />
                      Subscribe
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-4 text-green-200 bg-white/10 rounded-2xl p-6"
              >
                <div className="bg-green-500 p-2 rounded-full">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold">Thank you for subscribing!</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {posts && posts.length > 0 ? posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
              className={`group cursor-pointer ${
                post.featured 
                  ? 'lg:col-span-2 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200' 
                  : 'bg-white border border-gray-200'
              } rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${post.featured ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <BookOpen className={`w-6 h-6 ${post.featured ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    post.featured 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post.category}
                  </span>
                </div>
                {post.featured && (
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>

              <h3 className={`text-3xl font-bold mb-4 group-hover:text-purple-600 transition-colors ${
                post.featured ? 'text-gray-900' : 'text-gray-900'
              }`}>
                {post.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6 text-xl">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-base">{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <span className="text-lg">•</span>
                  <span className="text-base">{post.readingTime} min read</span>
                </div>

                <a 
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-3 text-purple-600 font-semibold group-hover:gap-4 transition-all text-lg"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          )) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="col-span-full text-center py-16"
            >
              <div className="bg-gray-50 rounded-3xl p-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-4">No Posts Yet</h3>
                <p className="text-gray-500 text-lg">
                  Check back soon for interesting articles about technology, AI, and product development!
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* View All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 px-8 py-4 text-lg font-semibold rounded-2xl"
          >
            View All Posts
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}