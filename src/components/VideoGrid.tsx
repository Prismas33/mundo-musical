'use client'

import { Video } from '@/hooks/useVideos'
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer'
import { useEffect } from 'react'

interface VideoGridProps {
  videos: Video[]
  category?: string
  loading?: boolean
  featured?: boolean // Nova prop para indicar se são vídeos em destaque
}

// Função para limpar videoId do YouTube
const cleanVideoId = (videoId: string) => {
  if (!videoId) return ''
  
  // Se o videoId já contém a URL completa, extrair apenas o ID
  if (videoId.includes('youtube.com/shorts/')) {
    return videoId.split('youtube.com/shorts/')[1]?.split('?')[0] || videoId
  }
  if (videoId.includes('youtube.com/watch?v=')) {
    return videoId.split('v=')[1]?.split('&')[0] || videoId
  }
  if (videoId.includes('youtu.be/')) {
    return videoId.split('youtu.be/')[1]?.split('?')[0] || videoId
  }
  
  return videoId
}

// Função para obter emoji da categoria
const getCategoryEmoji = (categoryName: string): string => {
  const emojiMap: { [key: string]: string } = {
    'musical': '🎵',
    'musica': '🎵',
    'música': '🎵',
    'musicais completos': '🎵',
    'song': '🎵',
    'music': '🎵',
    'educacional': '📚',
    'educational': '📚',
    'ensino': '📚',
    'aprender': '📚',
    'learn': '📚',
    'matematica': '🔢',
    'matemática': '🔢',
    'math': '🔢',
    'divertida': '🎲',
    'letras': '🔤',
    'palavras': '🔤',
    'letters': '🔤',
    'historias': '📖',
    'histórias': '📖',
    'stories': '📖',
    'curtas': '📖',
    'geral': '🌟',
    'general': '🌟',
    'entretenimento': '🎬',
    'entertainment': '🎬',
    'diversão': '🎉',
    'fun': '🎉',
    'infantil': '👶',
    'criança': '👶',
    'child': '👶',
    'kids': '👶',
    'tutorial': '🎓',
    'aventura': '🚀',
    'adventure': '🚀',
    'família': '👨‍👩‍👧‍👦',
    'family': '👨‍👩‍👧‍👦',
    'aprendizagem': '🧠',
    'learning': '🧠',
    'criatividade': '🎨',
    'creativity': '🎨',
    'arte': '🎨',
    'art': '🎨',
    'completo': '🎵',
    'complete': '🎵'
  }

  const lowerName = categoryName.toLowerCase()
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (lowerName.includes(key)) {
      return emoji
    }
  }
  return '🏷️' // emoji padrão
}

export default function VideoGrid({ videos, category, loading, featured }: VideoGridProps) {
  const { initializePlayer, isApiReady, cleanup } = useYouTubePlayer()

  // Filtrar apenas vídeos do YouTube
  const youtubeVideos = videos.filter(video => video.platform === 'youtube')
  const filteredVideos = category 
    ? youtubeVideos.filter(video => video.category === category)
    : youtubeVideos

  console.log('🎬 VideoGrid Debug:', {
    totalVideos: videos.length,
    youtubeVideos: youtubeVideos.length,
    filteredVideos: filteredVideos.length,
    category,
    isApiReady,
    loading
  })

  // Inicializar players quando a API estiver pronta
  useEffect(() => {
    if (!isApiReady || filteredVideos.length === 0) return

    const initializePlayers = () => {
      filteredVideos.forEach((video) => {
        const cleanedVideoId = cleanVideoId(video.videoId)
        const playerId = `youtube-player-${video.id}`
        
        // Verificar se o elemento existe antes de inicializar
        const element = document.getElementById(playerId)
        if (element) {
          initializePlayer({
            videoId: cleanedVideoId,
            containerId: playerId,
            onPlay: (videoId) => {
              console.log(`Video playing: ${video.title}`)
            },
            onPause: (videoId) => {
              console.log(`Video paused: ${video.title}`)
            }
          })
        }
      })
    }

    // Delay para garantir que os elementos DOM foram criados
    const timeoutId = setTimeout(initializePlayers, 300)
    
    return () => clearTimeout(timeoutId)
  }, [isApiReady, filteredVideos, initializePlayer])

  // Cleanup quando o componente for desmontado
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  if (loading) {
    return (
      <div className={
        featured 
          ? "flex flex-wrap justify-center gap-8 max-w-6xl mx-auto" 
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      }>
        {[...Array(featured ? 3 : 6)].map((_, index) => (
          <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse ${
            featured ? 'w-[500px] flex-shrink-0' : ''
          }`}>
            <div className={`bg-gray-300 ${featured ? "aspect-[16/9]" : "aspect-video"}`}></div>
            <div className={featured ? "p-3" : "p-6"}>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              {!featured && <div className="h-4 bg-gray-300 rounded"></div>}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Nenhum vídeo encontrado
        </h3>
        <p className="text-gray-600">
          {category ? `Não há vídeos na categoria "${category}"` : 'Ainda não há vídeos disponíveis'}
        </p>
      </div>
    )
  }

  return (
    <div className={
      featured 
        ? "flex flex-wrap justify-center gap-8 max-w-6xl mx-auto" 
        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    }>
      {filteredVideos.map((video) => {
        // Limpar videoId para YouTube
        const cleanedVideoId = cleanVideoId(video.videoId)
        const playerId = `youtube-player-${video.id}`
        
        return (
          <div key={video.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
            featured ? 'w-[500px] flex-shrink-0' : ''
          }`}>
            {/* Video Embed - YouTube Player API com fallback para iframe */}
            <div className={featured ? "aspect-[16/9]" : "aspect-video"}>
              {isApiReady ? (
                <div 
                  id={playerId}
                  className="w-full h-full"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${cleanedVideoId}?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          
            {/* Video Info */}
            <div className={featured ? "p-3" : "p-6"}>
              {!featured && (
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    📺 YouTube
                  </span>
                  
                  {video.featured && (
                    <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                      ⭐ Destaque
                    </span>
                  )}
                </div>
              )}
              
              <h3 className={`font-bold font-poppins mb-2 line-clamp-2 ${
                featured 
                  ? 'text-lg text-gray-800 text-center' 
                  : 'text-lg text-gray-800'
              }`}>
                {video.title}
              </h3>
              
              {/* Remover descrição apenas para vídeos em destaque */}
              {!featured && (
                <p className="text-gray-600 font-nunito text-sm line-clamp-3 mb-3">
                  {video.description}
                </p>
              )}
              
              {/* Tags de Categoria e Data */}
              {!featured && (
                <div className="flex items-center justify-between">
                  {video.category && (
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
                      {getCategoryEmoji(video.category)} {video.category}
                    </span>
                  )}
                  
                  {video.createdAt && (
                    <span className="text-xs text-gray-500">
                      {new Date(video.createdAt.seconds * 1000).toLocaleDateString('pt-PT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                  )}
                </div>
              )}
              
              {/* Para vídeos em destaque, mostrar apenas categoria centrada e compacta */}
              {featured && video.category && (
                <div className="text-center">
                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                    {getCategoryEmoji(video.category)} {video.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
