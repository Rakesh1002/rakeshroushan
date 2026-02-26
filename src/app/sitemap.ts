import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/payload'

interface PayloadPost {
  slug: string
  updatedAt?: string | null
  publishedAt?: string | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'

  // Get published blog posts for dynamic sitemap entries
  let posts: PayloadPost[] = []
  try {
    const postsResult = await getPublishedPosts(100) // Get up to 100 posts
    if (postsResult?.docs) {
      posts = postsResult.docs
    }
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
  }

  // Static pages
  // Avoid fragment URLs in sitemap (search engines ignore them)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ]

  // Dynamic blog post pages
  const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
