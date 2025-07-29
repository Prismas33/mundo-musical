import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mundo Musical - Vídeos educativos e diversão para os mais pequenos',
  description: 'Descobre o mundo musical do Dino! Vídeos educativos, atividades e diversão para crianças. Junta-te ao Dino Club!',
  keywords: 'dino, musical, crianças, vídeos educativos, diversão, família',
  openGraph: {
    title: 'Mundo Musical - Vídeos educativos e diversão para os mais pequenos',
    description: 'Descobre o mundo musical do Dino! Vídeos educativos, atividades e diversão para crianças. Junta-te ao Dino Club!',
    type: 'website',
  },
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
