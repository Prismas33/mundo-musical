'use client'

import { Video } from '@/hooks/useVideos'

interface VideoGridProps {
  videos: Video[]
  category?: string
  loading?: boolean
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

export default function VideoGrid({ videos, category, loading }: VideoGridProps) {
  // Filtrar apenas vídeos do YouTube
  const youtubeVideos = videos.filter(video => video.platform === 'youtube')
  const filteredVideos = category 
    ? youtubeVideos.filter(video => video.category === category)
    : youtubeVideos

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-300"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredVideos.map((video) => {
        // Limpar videoId para YouTube
        let cleanedVideoId = cleanVideoId(video.videoId)
        
        console.log('🎬 Video debug:', {
          id: video.id,
          title: video.title,
          originalVideoId: video.videoId,
          cleanedVideoId,
          platform: video.platform
        })
        
        return (
          <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {/* Video Embed - Apenas YouTube */}
            <div className="aspect-video">
            <iframe
              // Usando parâmetros básicos que funcionam tanto para vídeos normais quanto Shorts
              src={`https://www.youtube.com/embed/${cleanedVideoId}?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          
          {/* Video Info */}
          <div className="p-6">
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
            
            <h3 className="text-lg font-bold font-poppins text-gray-800 mb-2 line-clamp-2">
              {video.title}
            </h3>
            
            <p className="text-gray-600 font-nunito text-sm line-clamp-3 mb-3">
              {video.description}
            </p>
            
            {/* Tags de Categoria e Data */}
            <div className="flex items-center justify-between">
              {video.category && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
                  🏷️ {video.category}
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
          </div>
        </div>
        )
      })}
    </div>
  )
}
