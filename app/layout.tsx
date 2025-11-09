import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CODESKYTZ-MD',
  description: 'A multidevice whatsapp bot',
  generator: 'codeskytz.site',
  icons: {
    icon: [
      {
        url: 'https://i.ibb.co/ymNQnJDz/Whats-App-Image-2025-11-08-at-19-29-06.jpg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'https://i.ibb.co/ymNQnJDz/Whats-App-Image-2025-11-08-at-19-29-06.jpg',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
