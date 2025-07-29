'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import VideoGrid, { sampleVideos } from '@/components/VideoGrid'
import type { Metadata } from 'next'

// Nota: Como estamos usando 'use client', o metadata precisa ser exportado de um componente pai
// ou movido para um layout. Por agora, vamos manter assim.

const categories = [
  { id: 'all', name: 'Todos os Vídeos', emoji: '🎬' },
  { id: 'Educativo', name: 'Educativo', emoji: '📚' },
  { id: 'Matemática', name: 'Matemática', emoji: '🔢' },
  { id: 'Linguagem', name: 'Linguagem', emoji: '🔤' },
  { id: 'Animais', name: 'Animais', emoji: '🐾' },
  { id: 'Relaxamento', name: 'Relaxamento', emoji: '😴' }
]

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <Layout>
      <div className="bg-gradient-to-br from-orange-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-6xl block mb-6">🎬</span>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-4">
              Vídeos do Dino
            </h1>
            <p className="text-xl text-gray-600 font-nunito max-w-3xl mx-auto">
              Descobre todos os vídeos educativos e divertidos do Dino! 
              Música, aprendizagem e diversão num só lugar.
            </p>
          </div>

          {/* Filtros por Categoria */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <h2 className="text-xl font-bold font-poppins text-gray-800 mb-4 text-center">
              Escolhe a tua categoria favorita
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Vídeos */}
          <div className="mb-12">
            <VideoGrid 
              videos={sampleVideos} 
              category={selectedCategory === 'all' ? undefined : selectedCategory}
            />
          </div>

          {/* Informação sobre as Plataformas */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold font-poppins text-gray-800 mb-6 text-center">
              Onde podes encontrar o Dino
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl">
                <div className="bg-red-500 text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">YouTube</h3>
                  <p className="text-gray-600 font-nunito text-sm">
                    Os nossos vídeos principais estão no YouTube para fácil acesso e partilha.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                <div className="bg-green-500 text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.043 4.576-1.143 1.147-2.718 1.874-4.576 2.043-1.858.169-3.433-.896-4.576-2.043C5.226 11.593 4.499 10.018 4.33 8.16c-.169-1.858.896-3.433 2.043-4.576C7.516 2.441 9.091 1.714 10.949 1.545c1.858-.169 3.433.896 4.576 2.043 1.147 1.143 1.874 2.718 2.043 4.576z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Rumble</h3>
                  <p className="text-gray-600 font-nunito text-sm">
                    Também estamos no Rumble como alternativa para aceder ao nosso conteúdo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center bg-gradient-to-r from-orange-100 to-blue-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold font-poppins text-gray-800 mb-4">
              Gostaste dos nossos vídeos? 🌟
            </h3>
            <p className="text-gray-600 font-nunito mb-6">
              Junta-te ao Dino Club para receberes novidades sobre novos vídeos e atividades exclusivas!
            </p>
            <a
              href="/contacto"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-orange-600 transition-colors inline-block"
            >
              Juntar ao Dino Club
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
