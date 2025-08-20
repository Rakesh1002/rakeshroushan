import { getPayload } from '@/lib/payload'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const payload = await getPayload()
    
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: params.slug,
        },
        _status: {
          equals: 'published',
        },
      },
      limit: 1,
    })

    if (posts.docs.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const post = posts.docs[0]

    // Transform the post data to match our frontend interface
    const transformedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      slug: post.slug,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime || 5,
      category: post.category,
      featured: post.featured,
      author: {
        firstName: post.author?.firstName || 'Anonymous',
        lastName: post.author?.lastName || 'Author',
      },
      excerpt: post.excerpt,
    }

    return NextResponse.json(transformedPost)
  } catch (error: any) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}