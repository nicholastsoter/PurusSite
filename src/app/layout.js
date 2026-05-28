import { Inter, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata = {
  title: 'Purus — A Browser You Can Trust',
  description:
    'Purus is a free iOS browser that automatically blocks explicit content, ads, and unsafe searches across four filtering layers. No setup. No account. No subscription.',
  metadataBase: new URL('https://www.purusai.com'),
  openGraph: {
    title: 'Purus — A Browser You Can Trust',
    description:
      'A cleaner web, on by default. Purus blocks virtually every explicit domain, ad, and unsafe search before it loads.',
    url: 'https://www.purusai.com',
    siteName: 'Purus',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Purus — A Browser You Can Trust',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purus — A Browser You Can Trust',
    description:
      'A cleaner web, on by default. Purus blocks virtually every explicit domain, ad, and unsafe search before it loads.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
