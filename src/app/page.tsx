'use client'

import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import Card from '@/components/Card'
import VideoGrid from '@/components/VideoGrid'
import { usePortugueseVideos } from '@/hooks/useVideos'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  // Buscar apenas os primeiros 3 vídeos para preview, filtrados por português
  const { videos, loading } = usePortugueseVideos()
  const previewVideos = videos.slice(0, 3)

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Seção de Funcionalidades */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-4">
              O que podes encontrar no mundo do Dino
            </h2>
            <p className="text-xl text-gray-600 font-nunito max-w-3xl mx-auto">
              Descobre todas as aventuras, aprendizagens e diversão que o Dino tem para ti!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              emoji="🎬"
              title="Vídeos Educativos"
              description="Explora a nossa coleção de vídeos musicais educativos. Aprende enquanto te diverte com o Dino!"
              status="available"
              link="/videos"
              action="Ver Vídeos"
            />
            
            <Card
              emoji="🎨"
              title="Livros para Colorir"
              description="Em breve terás acesso a livros para colorir digitais e para imprimir com o Dino e os seus amigos!"
              status="coming-soon"
              link="/em-breve"
              action="Ver Mais"
            />
            
            <Card
              emoji="📱"
              title="App Dino TV"
              description="A aplicação móvel está a caminho! Vai ter jogos, vídeos e atividades interativas para toda a família."
              status="in-development"
              link="/em-breve"
              action="Saber Mais"
            />
            
            <Card
              emoji="🧸"
              title="Peluches e Brinquedos"
              description="Vai poder abraçar o Dino! Peluches macios e brinquedos educativos estão a ser preparados."
              status="coming-soon"
              link="/em-breve"
              action="Ver Mais"
            />
            
            <Card
              emoji="🎵"
              title="Música e Karaoke"
              description="Canta as músicas favoritas do Dino! Sistema de karaoke interativo para crianças."
              status="in-development"
              link="/em-breve"
              action="Em Breve"
            />
            
            <Card
              emoji="👥"
              title="Dino Club"
              description="Junta-te à comunidade oficial! Recebe novidades, atividades exclusivas e surpresas especiais."
              status="available"
              link="/contacto"
              action="Juntar-me"
            />
          </div>
        </div>
      </section>
      
      {/* Seção de Introdução do Dino */}
      <section className="bg-gradient-to-r from-orange-100 to-blue-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-6">
                Conhece o nosso amigo Dino! 🦕
              </h2>
              <p className="text-lg text-gray-600 font-nunito mb-6">
                O Dino é um dinossauro muito especial que adora música, aprender coisas novas e fazer novos amigos. 
                Ele criou este mundo mágico para partilhar a sua paixão pela música e educação com todas as crianças!
              </p>
              <p className="text-lg text-gray-600 font-nunito mb-8">
                Cada vídeo é uma nova aventura repleta de cores, sons e aprendizagem. 
                O Dino acredita que aprender deve ser divertido e colorido!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/sobre"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-center"
                >
                  Saber Mais sobre o Dino
                </a>
                <a
                  href="/videos"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors text-center"
                >
                  Ver os Vídeos
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <Image
                  src="/images/dino&family/dino_cp.png"
                  alt="Olá, eu sou o Dino!"
                  width={150}
                  height={150}
                  className="mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold font-poppins text-gray-800 mb-2">
                  Olá, eu sou o Dino!
                </h3>
                <p className="text-gray-600 font-nunito">
                  Vem descobrir o meu mundo musical! 🎵
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Preview de Vídeos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-4">
              🎬 Últimos Vídeos do Dino
            </h2>
            <p className="text-xl text-gray-600 font-nunito max-w-3xl mx-auto mb-8">
              Vê os vídeos mais recentes e divertidos! Cada vídeo é uma nova aventura de aprendizagem.
            </p>
          </div>
          
          {/* Video Preview Grid */}
          <VideoGrid videos={previewVideos} loading={loading} />
          
          {/* Ver Todos os Vídeos */}
          <div className="text-center mt-12">
            <Link
              href="/videos"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Ver Todos os Vídeos 🎥
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
