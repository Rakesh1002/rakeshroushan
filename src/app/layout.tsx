import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO-optimized metadata for Rakesh Roushan's portfolio
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'),
  title: {
    default: "Rakesh Roushan - Entrepreneur, Product Leader & AI Innovator",
    template: "%s | Rakesh Roushan"
  },
  description: "Entrepreneur and Product Leader building the future of Audio AI and Knowledge Technology. Founder of AudioPod AI and UnQuest AI. Expert in startup strategy, digital marketing, and AI innovation.",
  keywords: [
    "Rakesh Roushan",
    "entrepreneur",
    "product leader",
    "AI innovator",
    "AudioPod AI",
    "UnQuest AI",
    "startup founder",
    "audio AI",
    "knowledge technology",
    "digital marketing",
    "business strategy",
    "product development",
    "artificial intelligence",
    "content creation tools",
    "knowledge management"
  ],
  authors: [{ name: "Rakesh Roushan" }],
  creator: "Rakesh Roushan",
  publisher: "Rakesh Roushan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com',
    siteName: 'Rakesh Roushan',
    title: 'Rakesh Roushan - Entrepreneur, Product Leader & AI Innovator',
    description: 'Entrepreneur and Product Leader building the future of Audio AI and Knowledge Technology. Founder of AudioPod AI and UnQuest AI.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rakesh Roushan - Entrepreneur and AI Innovator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakesh Roushan - Entrepreneur, Product Leader & AI Innovator',
    description: 'Building the future of Audio AI and Knowledge Technology. Founder of AudioPod AI and UnQuest AI.',
    images: ['/twitter-image.jpg'],
    creator: '@rakeshroushan',
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'}/#person`,
        "name": "Rakesh Roushan",
        "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com',
        "image": {
          "@type": "ImageObject",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'}/rakesh-roushan-profile.jpg`,
          "caption": "Rakesh Roushan - Entrepreneur and AI Innovator"
        },
        "description": "Entrepreneur and Product Leader building the future of Audio AI and Knowledge Technology. Founder of AudioPod AI and UnQuest AI.",
        "jobTitle": ["Entrepreneur", "Product Leader", "AI Innovator", "Startup Founder"],
        "worksFor": [
          {
            "@type": "Organization",
            "name": "AudioPod AI",
            "foundingDate": "2024-11",
            "description": "Mission to provide seamless and accessible audio tools for all content creators"
          },
          {
            "@type": "Organization", 
            "name": "UnQuest AI",
            "description": "Building advanced knowledge management systems for the future"
          }
        ],
        "knowsAbout": [
          "Artificial Intelligence",
          "Audio Technology", 
          "Knowledge Management",
          "Product Strategy",
          "Digital Marketing",
          "Startup Strategy",
          "Business Development"
        ],
        "sameAs": [
          "https://linkedin.com/in/rakeshroushan",
          "https://twitter.com/rakeshroushan",
          "https://github.com/rakesh1002"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'}/#website`,
        "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com',
        "name": "Rakesh Roushan - Portfolio",
        "description": "Personal portfolio of Rakesh Roushan, entrepreneur and AI innovator",
        "publisher": {
          "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'}/#person`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'}/audiopod-ai#organization`,
        "name": "AudioPod AI",
        "url": "https://audiopod.ai",
        "foundingDate": "2024-10",
        "founder": {
          "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rakeshroushan.com'}/#person`
        },
        "description": "Mission to provide seamless and accessible audio tools for all content creators",
        "industry": "Artificial Intelligence",
        "specializingIn": ["Audio AI", "Content Creation", "Audio Technology"]
      }
    ]
  };

  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full`}
      >
        {children}
      </body>
    </html>
  );
}
