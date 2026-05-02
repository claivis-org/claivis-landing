import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claivis — AI Teaching Infrastructure for Schools',
  description: 'When the teacher is absent, Claivis shows up. Nigeria\'s first AI teaching agent that delivers curriculum-aligned lessons, answers student questions in real time, and keeps every classroom running — every period, every day.',
  keywords: ['AI teaching', 'EdTech Nigeria', 'classroom AI', 'teacher shortage', 'WAEC', 'secondary school Nigeria'],
  openGraph: {
    title: 'Claivis — AI Teaching Infrastructure for Schools',
    description: 'The first AI teaching agent built for Nigerian secondary schools. No teacher? No problem.',
    url: 'https://claivis.org',
    siteName: 'Claivis',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claivis — AI Teaching Infrastructure for Schools',
    description: 'No teacher? No problem. Claivis shows up.',
  },
  metadataBase: new URL('https://claivis.org'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
