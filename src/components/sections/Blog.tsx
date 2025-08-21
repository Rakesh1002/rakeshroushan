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
  const isInView = useInView(ref, { once: true, margin: '-100px' })
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
    <section
      className="bg-gradient-to-br from-gray-50 to-white py-32"
      ref={ref}
    >
      <div className="container mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-8 text-6xl font-bold text-gray-900">
            Blog & Writings
          </h2>
          <p className="mx-auto max-w-4xl text-2xl leading-relaxed text-gray-600">
            Thoughts on technology, leadership, and building products that
            matter. Subscribe to get my latest insights delivered to your inbox.
          </p>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24 rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-white shadow-2xl"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="rounded-2xl bg-white/20 p-4">
                <Mail className="h-10 w-10" />
              </div>
              <h3 className="text-3xl font-bold">Stay Updated</h3>
            </div>
            <p className="mb-8 text-xl leading-relaxed text-purple-100">
              Get notified when I publish new articles about technology, AI, and
              product development.
            </p>

            {!isSubscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto flex max-w-xl flex-col gap-6 sm:flex-row"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-14 flex-1 rounded-xl border-white/20 bg-white/10 px-6 text-lg text-white placeholder:text-purple-200 focus:border-white/40"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 rounded-xl bg-white px-8 text-lg font-semibold text-purple-600 hover:bg-purple-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                      Subscribing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="h-5 w-5" />
                      Subscribe
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-4 rounded-2xl bg-white/10 p-6 text-green-200"
              >
                <div className="rounded-full bg-green-500 p-2">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-semibold">
                  Thank you for subscribing!
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                className={`group cursor-pointer ${
                  post.featured
                    ? 'border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 lg:col-span-2'
                    : 'border border-gray-200 bg-white'
                } rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-2xl p-3 ${post.featured ? 'bg-purple-100' : 'bg-gray-100'}`}
                    >
                      <BookOpen
                        className={`h-6 w-6 ${post.featured ? 'text-purple-600' : 'text-gray-600'}`}
                      />
                    </div>
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        post.featured
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                  {post.featured && (
                    <span className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white">
                      Featured
                    </span>
                  )}
                </div>

                <h3
                  className={`mb-4 text-3xl font-bold transition-colors group-hover:text-purple-600 ${
                    post.featured ? 'text-gray-900' : 'text-gray-900'
                  }`}
                >
                  {post.title}
                </h3>

                <p className="mb-6 text-xl leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span className="text-base">
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                    <span className="text-lg">•</span>
                    <span className="text-base">
                      {post.readingTime} min read
                    </span>
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-3 text-lg font-semibold text-purple-600 transition-all group-hover:gap-4"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="col-span-full py-16 text-center"
            >
              <div className="rounded-3xl bg-gray-50 p-12">
                <BookOpen className="mx-auto mb-6 h-16 w-16 text-gray-400" />
                <h3 className="mb-4 text-2xl font-bold text-gray-600">
                  No Posts Yet
                </h3>
                <p className="text-lg text-gray-500">
                  Check back soon for interesting articles about technology, AI,
                  and product development!
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
          className="mt-16 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl border-2 border-purple-200 bg-white px-8 py-4 text-lg font-semibold text-purple-600 hover:border-purple-300 hover:bg-purple-50"
          >
            View All Posts
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
