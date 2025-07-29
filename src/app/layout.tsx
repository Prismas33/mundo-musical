import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Mundo Musical - Vídeos educativos e diversão para os mais pequenos',
    template: '%s | Mundo Musical'
  },
  description: 'Descobre o mundo musical do Dino! Vídeos educativos, atividades e diversão para crianças. Junta-te ao Dino Club!',
  keywords: ['dino', 'musical', 'crianças', 'vídeos educativos', 'diversão', 'família', 'música', 'aprendizagem', 'infantil'],
  authors: [{ name: 'Prismas33' }],
  creator: 'Prismas33',
  publisher: 'Mundo Musical',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mundomusical.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mundo Musical - Vídeos educativos e diversão para os mais pequenos',
    description: 'Descobre o mundo musical do Dino! Vídeos educativos, atividades e diversão para crianças. Junta-te ao Dino Club!',
    url: 'https://mundomusical.com',
    siteName: 'Mundo Musical',
    images: [
      {
        url: '/images/dino&family/dino_cp.png',
        width: 1200,
        height: 630,
        alt: 'Mundo Musical - Dino',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mundo Musical - Vídeos educativos e diversão para os mais pequenos',
    description: 'Descobre o mundo musical do Dino! Vídeos educativos, atividades e diversão para crianças.',
    images: ['/images/dino&family/dino_cp.png'],
    creator: '@mundomusical',
  },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-icon.png',
    },
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
