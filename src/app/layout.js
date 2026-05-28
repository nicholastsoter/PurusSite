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
    'Purus is a native iOS browser that automatically blocks explicit content, ads, and unsafe searches. No setup. No account. No subscription.',
  openGraph: {
    title: 'Purus — A Browser You Can Trust',
    description:
      'A cleaner web, automatically. Install and it works.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
