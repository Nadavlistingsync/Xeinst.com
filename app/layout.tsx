import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: 'Xeinst | The Real Estate Media Company',
  description: 'Premium short-form content for top real estate agents and investors. 6M+ views generated. Content strategy, clipping, and distribution services.',
  keywords: ['real estate content', 'social media marketing', 'real estate agents', 'short-form video', 'content distribution', 'TikTok', 'Instagram Reels', 'Xeinst', 'real estate marketing', 'content clipping'],
  authors: [{ name: 'Xeinst' }],
  creator: 'Xeinst',
  publisher: 'Xeinst',
  generator: 'v0.app',
  metadataBase: new URL('https://xeinst.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Xeinst | The Real Estate Media Company',
    description: 'Premium short-form content for top real estate agents and investors. 6M+ views generated.',
    url: 'https://xeinst.com',
    siteName: 'Xeinst',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Xeinst - The Real Estate Media Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xeinst | The Real Estate Media Company',
    description: 'Premium short-form content for top real estate agents and investors. 6M+ views generated.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Xeinst",
  url: "https://xeinst.com",
  logo: "https://xeinst.com/logo.png",
  description: "The Real Estate Media Company. Premium short-form content for top real estate agents and investors. 6,000,000+ views generated.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "nadav.benedek@xeinst.com",
    contactType: "sales",
  },
  sameAs: [
    "https://www.linkedin.com/company/xeinstmedia",
    "https://www.instagram.com/xeinstmedia/",
    "https://www.youtube.com/xeinstmedia",
    "https://www.tiktok.com/@xeinstmedia",
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Real Estate Content Distribution",
  provider: {
    "@type": "Organization",
    name: "Xeinst",
  },
  description: "Short-form content strategy and distribution for real estate professionals. We transform long-form content into scroll-stopping clips distributed across social platforms.",
  serviceType: "Social Media Marketing",
  areaServed: "Worldwide",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
