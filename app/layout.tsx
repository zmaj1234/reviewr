import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reviewr — Reply to every Google review in one tap',
  description: 'Connect your Google Business Profile, get AI-drafted replies to every review, approve in one tap. Never post without your OK.',
  openGraph: {
    title: 'Reviewr',
    description: 'AI-powered Google review management for serious business owners.',
    type: 'website',
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
