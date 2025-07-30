'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import VideoGrid from '@/components/VideoGrid'
import { usePortugueseVideos } from '@/hooks/useVideos'
import type { Metadata } from 'next'

// Metadata para SEO (não funciona em client components, mas deixamos para referência)
// export const metadata: Metadata = {
//   title: 'Vídeos do Dino - Mundo Musical',
//   description: 'Vê todos os vídeos educativos e divertidos do Dino! Música, cores, números, letras e muito mais para aprender brincando.',
// }

export default function Videos() {
  const { videos, loading } = usePortugueseVideos() // Vídeos em português apenas
  const [filter, setFilter] = useState<'all' | 'featured' | 'youtube' | 'rumble'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar vídeos ativos apenas (já filtrados por idioma PT no hook)
  const activeVideos = videos.filter(video => video.isActive !== false)

  // Aplicar filtros
  const filteredVideos = activeVideos.filter(video => {
    // Filtro por termo de pesquisa
    const matchesSearch = searchTerm === '' || 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category?.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro por categoria
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'featured' && video.featured) ||
      (filter === 'youtube' && video.platform === 'youtube') ||
      (filter === 'rumble' && video.platform === 'rumble')

    return matchesSearch && matchesFilter
  })

  // Ordenar por: featured primeiro, depois por data
  const sortedVideos = filteredVideos.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
  })

  // Categorias únicas para filtros
  const categories = ['Todos', 'Em Destaque', 'YouTube', 'Rumble']

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-4">
              🎬 Vídeos do Dino
            </h1>
            <p className="text-xl text-gray-600 font-nunito max-w-3xl mx-auto mb-4">
              Descobre todos os vídeos educativos e divertidos do Dino! 
              Música, cores, números, letras e muito mais para aprender brincando.
            </p>
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              🇵🇹 Vídeos em Português
            </div>
          </div>

          {/* Filtros e Pesquisa */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Barra de Pesquisa */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar vídeos... 🔍"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-nunito"
                  />
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter('featured')}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    filter === 'featured'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ⭐ Destaques
                </button>
                <button
                  onClick={() => setFilter('youtube')}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    filter === 'youtube'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  YouTube
                </button>
                <button
                  onClick={() => setFilter('rumble')}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    filter === 'rumble'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rumble
                </button>
              </div>
            </div>

            {/* Resultados */}
            <div className="mt-4 text-sm text-gray-600 font-nunito">
              {loading ? (
                'A carregar vídeos...'
              ) : (
                `${sortedVideos.length} vídeo${sortedVideos.length !== 1 ? 's' : ''} encontrado${sortedVideos.length !== 1 ? 's' : ''}`
              )}
            </div>
          </div>

          {/* Vídeos em Destaque */}
          {!searchTerm && filter === 'all' && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-2">
                  ⭐ Vídeos em Destaque
                </h2>
                <p className="text-lg text-gray-600 font-nunito">
                  Os vídeos favoritos do Dino!
                </p>
              </div>
              
              <VideoGrid 
                videos={activeVideos.filter(v => v.featured).slice(0, 3)} 
                loading={loading}
              />
            </div>
          )}

          {/* Grid de Vídeos */}
          <div className="mb-12">
            {!searchTerm && filter === 'all' && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-2">
                  📺 Todos os Vídeos
                </h2>
                <p className="text-lg text-gray-600 font-nunito">
                  Navega por toda a coleção!
                </p>
              </div>
            )}
            
            <VideoGrid videos={sortedVideos} loading={loading} />
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-orange-100 to-blue-100 rounded-3xl p-8 md:p-12 text-center">
            <span className="text-5xl block mb-6">🦕</span>
            <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-4">
              Gostavas de mais vídeos como estes?
            </h2>
            <p className="text-xl text-gray-600 font-nunito mb-8 max-w-2xl mx-auto">
              Junta-te ao Dino Club e fica a par de todos os novos vídeos, atividades especiais e surpresas!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contacto"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎉 Juntar ao Dino Club
              </a>
              <a
                href="/em-breve"
                className="bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                👀 Ver Novidades
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
