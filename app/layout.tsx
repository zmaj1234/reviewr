import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = 'https://reviewrai.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Reviewr — Reply to every Google review in one tap',
    template: '%s — Reviewr',
  },
  description: 'Connect your Google Business Profile, get AI-drafted replies to every review, approve in one tap. Never post without your OK.',
  keywords: ['google reviews', 'review management', 'reply to reviews', 'google business profile', 'AI review replies'],
  authors: [{ name: 'Reviewr' }],
  creator: 'Reviewr',
  openGraph: {
    title: 'Reviewr — Reply to every Google review in one tap',
    description: 'AI-powered Google review management. Auto-drafted replies, one-tap approval, 24/7 monitoring.',
    url: BASE_URL,
    siteName: 'Reviewr',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reviewr — Reply to every Google review in one tap',
    description: 'AI-powered Google review management. Auto-drafted replies, one-tap approval, 24/7 monitoring.',
    creator: '@reviewrapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
