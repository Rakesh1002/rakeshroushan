'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface BlogPost {
  id: string
  title: string
  content: any
  slug: string
  publishedAt: string
  readingTime: number
  category: string
  featured: boolean
  author: {
    firstName: string
    lastName: string
  }
  excerpt: string
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.slug}`)
        if (response.ok) {
          const data = await response.json()
          setPost(data)
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-8 py-6 max-w-4xl">
          <Link href="/#blog">
            <Button variant="outline" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-8 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">
                {post.author.firstName} {post.author.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl text-gray-600 leading-relaxed mb-12 p-6 bg-gray-50 rounded-2xl border-l-4 border-purple-600">
              {post.excerpt}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            {/* For now, we'll render the content as plain text/HTML */}
            {/* In a real implementation, you'd render the rich text content properly */}
            <div className="text-gray-800 leading-relaxed space-y-6">
              {typeof post.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p className="text-lg">
                  Content will be rendered here once the rich text editor is properly configured.
                  For now, this is a placeholder for the blog post content.
                </p>
              )}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <Link href="/#blog">
              <Button variant="outline" className="gap-2 px-8 py-3">
                <ArrowLeft className="w-4 h-4" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  )
}