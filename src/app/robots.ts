import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/_next/', '/private/'],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/rss.xml`],
    host: baseUrl,
  }
}
