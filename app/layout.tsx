import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chandrika Guest House | Homestay in Araku Valley',
  description:
    'A peaceful homestay in Araku Valley, offering comfortable rooms, beautiful surroundings and a warm stay close to the best of Araku.',
  generator: 'v0.app',
  openGraph: {
    title: 'Chandrika Guest House | Homestay in Araku Valley',
    description:
      'A peaceful homestay in Araku Valley, offering comfortable rooms, beautiful surroundings and a warm stay close to the best of Araku.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Chandrika Guest House',
    images: [{ url: '/images/property-exterior.webp' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f1e8',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
