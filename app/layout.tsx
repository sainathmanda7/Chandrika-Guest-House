import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-manrope',
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
    images: [{ url: '/images/property-exterior.png' }],
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
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
