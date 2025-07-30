'use client'

import { Video } from '@/hooks/useVideos'

interface VideoGridProps {
  videos: Video[]
  category?: string
  loading?: boolean
}

export default function VideoGrid({ videos, category, loading }: VideoGridProps) {
  const filteredVideos = category 
    ? videos.filter(video => video.category === category)
    : videos

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
      {filteredVideos.map((video) => (
        <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          {/* Video Embed */}
          <div className="aspect-video">
            {video.platform === 'youtube' ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=0&showinfo=1&controls=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <iframe
                src={`https://rumble.com/embed/${video.videoId}/`}
                title={video.title}
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
          </div>
          
          {/* Video Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                video.platform === 'youtube' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {video.platform === 'youtube' ? 'YouTube' : 'Rumble'}
              </span>
            </div>
            
            <h3 className="text-lg font-bold font-poppins text-gray-800 mb-2">
              {video.title}
            </h3>
            
            <p className="text-gray-600 font-nunito text-sm line-clamp-3">
              {video.description}
            </p>
            
            {video.category && (
              <div className="mt-3">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {video.category}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
