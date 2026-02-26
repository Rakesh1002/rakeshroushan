import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Export a function to get payload instance for other use cases
export async function getPayloadInstance() {
  return await getPayload({
    config: configPromise,
  })
}

// Helper functions for common operations
export async function getPublishedPosts(limit = 10) {
  const payload = await getPayload({
    config: configPromise,
  })

  return await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit,
    sort: '-publishedAt',
  })
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getFeaturedPosts() {
  const payload = await getPayload({
    config: configPromise,
  })

  return await payload.find({
    collection: 'posts',
    where: {
      featured: {
        equals: true,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 3,
    sort: '-publishedAt',
  })
}

export async function subscribeToNewsletter(
  email: string,
  firstName?: string,
  source: 'blog' | 'contact' | 'other' | 'popup' | 'social' = 'blog'
) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const result = await payload.create({
      collection: 'subscribers',
      data: {
        email,
        firstName,
        source,
        status: 'active',
      },
    })
    return { success: true, data: result }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    if (errorMessage.includes('duplicate key')) {
      return { success: false, error: 'Email already subscribed' }
    }
    return { success: false, error: errorMessage }
  }
}
