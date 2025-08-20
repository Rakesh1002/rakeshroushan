import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { getPublishedPosts } from '@/lib/payload'
import { Metadata } from 'next'

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

// Enhanced metadata for the homepage
export const metadata: Metadata = {
  title: 'Rakesh Roushan - Entrepreneur, Product Leader & AI Innovator',
  description: 'Discover the portfolio of Rakesh Roushan, entrepreneur and product leader building the future of Audio AI and Knowledge Technology. Founder of AudioPod AI and UnQuest AI with expertise in startup strategy and digital marketing.',
  openGraph: {
    title: 'Rakesh Roushan - Entrepreneur, Product Leader & AI Innovator',
    description: 'Discover the portfolio of Rakesh Roushan, entrepreneur and product leader building the future of Audio AI and Knowledge Technology.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakesh Roushan - Portfolio',
    description: 'Entrepreneur building the future of Audio AI and Knowledge Technology.',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com',
  },
}

export default async function Home() {
  // Fetch published posts for the blog section
  let posts: BlogPost[] = []
  try {
    const postsResult = await getPublishedPosts(6) // Get 6 recent posts for homepage
    if (postsResult?.docs) {
      posts = postsResult.docs.map((post: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime || 5,
        category: post.category,
        featured: post.featured || false,
        author: {
          firstName: post.author?.firstName || 'Anonymous',
          lastName: post.author?.lastName || 'Author',
        }
      }))
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    // Continue with empty posts array if there's an error
    // This allows the page to render even if the database is not connected
  }

  // Structured data for the homepage sections
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Rakesh Roushan",
      "jobTitle": ["Entrepreneur", "Product Leader", "AI Innovator"],
      "description": "Entrepreneur and Product Leader building the future of Audio AI and Knowledge Technology",
      "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com',
      "foundedOrganization": [
        {
          "@type": "Organization",
          "name": "AudioPod AI",
          "foundingDate": "2024-10",
          "description": "Mission to provide seamless and accessible audio tools for all content creators"
        },
        {
          "@type": "Organization",
          "name": "UnQuest AI", 
          "description": "Building advanced knowledge management systems for the future"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData),
        }}
      />
      <main 
        className="relative w-full overflow-x-hidden"
        role="main"
        aria-label="Rakesh Roushan's Portfolio"
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#hero" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        <ScrollIndicator />
        
        {/* Hero Section - Introduction */}
        <section 
          id="hero" 
          className="w-full overflow-x-hidden"
          aria-labelledby="hero-heading"
        >
          <Hero />
        </section>
        
        {/* About Section - Personal Information */}
        <section 
          id="about" 
          className="w-full overflow-x-hidden"
          aria-labelledby="about-heading"
        >
          <About />
        </section>
        
        {/* Experience/Projects Section */}
        <section 
          id="experience" 
          className="w-full overflow-x-hidden"
          aria-labelledby="experience-heading"
        >
          <Experience />
        </section>
        
        {/* Blog Section */}
        <section 
          id="blog" 
          className="w-full overflow-x-hidden"
          aria-labelledby="blog-heading"
        >
          <Blog posts={posts} />
        </section>
        
        {/* Contact Section */}
        <section 
          id="contact" 
          className="w-full overflow-x-hidden"
          aria-labelledby="contact-heading"
        >
          <Contact />
        </section>
      </main>
    </>
  );
}
