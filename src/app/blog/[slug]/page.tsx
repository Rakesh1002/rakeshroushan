import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPublishedPosts } from '@/lib/payload'

export const revalidate = 3600

interface PayloadPost {
  id: number
  title: string
  excerpt?: string
  slug: string
  publishedAt?: string | null
  updatedAt?: string | null
  readingTime?: number | null
  category: string
  featured?: boolean | null
  content?: unknown
  author?:
    | number
    | {
        firstName?: string
        lastName?: string
      }
}

export async function generateStaticParams() {
  try {
    const postsResult = await getPublishedPosts(100)
    const docs = postsResult?.docs || []
    return docs.map((post: PayloadPost) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'
  const post: PayloadPost | null = await getPostBySlug(params.slug)
  if (!post) return {}

  const title = post.title
  const description =
    post.excerpt ||
    'Insights on AI, product strategy, and building the future of audio and knowledge technology.'
  const url = `${baseUrl}/blog/${post.slug}`
  const imageUrl = `${baseUrl}/memoji-original.png`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post: PayloadPost | null = await getPostBySlug(params.slug)
  if (!post) {
    notFound()
  }

  const publishedTime = post.publishedAt || new Date().toISOString()
  const modifiedTime =
    post.updatedAt || post.publishedAt || new Date().toISOString()
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: `${typeof post.author === 'object' ? post.author?.firstName || 'Anonymous' : 'Anonymous'} ${typeof post.author === 'object' ? post.author?.lastName || 'Author' : 'Author'}`.trim(),
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
    image: [`${baseUrl}/memoji-original.png`],
  }

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-4xl px-8 py-6">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-8 py-16">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            {post.category}
          </span>
        </div>

        <h1 className="mb-8 text-5xl leading-tight font-bold text-gray-900">
          {post.title}
        </h1>

        <div className="mb-12 flex flex-wrap items-center gap-6 border-b border-gray-200 pb-8 text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {typeof post.author === 'object'
                ? post.author?.firstName || 'Anonymous'
                : 'Anonymous'}{' '}
              {typeof post.author === 'object'
                ? post.author?.lastName || 'Author'
                : 'Author'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {new Date(publishedTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>{post.readingTime || 5} min read</span>
          </div>
        </div>

        {post.excerpt && (
          <div className="mb-12 rounded-2xl border-l-4 border-purple-600 bg-gray-50 p-6 text-xl leading-relaxed text-gray-600">
            {post.excerpt}
          </div>
        )}

        <div className="prose prose-lg prose-gray max-w-none">
          <div className="space-y-6 leading-relaxed text-gray-800">
            {typeof post.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-lg">
                Content will be rendered here once the rich text editor is
                properly configured.
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-8 text-center">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
    </article>
  )
}
