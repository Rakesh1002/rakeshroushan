import { NextResponse } from 'next/server'
import { getPublishedPosts } from '@/lib/payload'

interface PayloadPost {
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string | null
}

export const revalidate = 1800

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'
  let posts: PayloadPost[] = []
  try {
    const postsResult = await getPublishedPosts(100)
    posts = postsResult?.docs || []
  } catch (e) {
    posts = []
  }

  const feedItems = posts
    .map(post => {
      const url = `${baseUrl}/blog/${post.slug}`
      const pubDate = new Date(post.publishedAt || new Date()).toUTCString()
      const title = escapeXml(post.title)
      const description = escapeXml(post.excerpt || '')
      return `
      <item>
        <title>${title}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${pubDate}</pubDate>
        <description>${description}</description>
      </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Rakesh Roushan – Blog</title>
    <link>${baseUrl}</link>
    <description>Insights on AI, product, and building the future of audio and knowledge tech.</description>
    ${feedItems}
  </channel>
</rss>`

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, max-age=1800',
    },
  })
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
