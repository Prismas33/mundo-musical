interface Video {
  id: string
  title: string
  description: string
  platform: 'youtube' | 'rumble'
  embedId: string
  thumbnail?: string
  duration?: string
  category?: string
}

interface VideoGridProps {
  videos: Video[]
  category?: string
}

export default function VideoGrid({ videos, category }: VideoGridProps) {
  const filteredVideos = category 
    ? videos.filter(video => video.category === category)
    : videos

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredVideos.map((video) => (
        <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          {/* Video Embed */}
          <div className="aspect-video">
            {video.platform === 'youtube' ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.embedId}?rel=0&modestbranding=0&showinfo=1&controls=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <iframe
                src={`https://rumble.com/embed/${video.embedId}/`}
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
              {video.duration && (
                <span className="text-sm text-gray-500">{video.duration}</span>
              )}
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

// Dados de exemplo dos vídeos (substituir pelos vídeos reais)
export const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Dino aprende as Cores 🌈',
    description: 'Vem descobrir o mundo colorido com o Dino! Aprende todas as cores do arco-íris de forma divertida.',
    platform: 'youtube',
    embedId: 'dQw4w9WgXcQ', // Placeholder - substituir pelo ID real
    duration: '3:45',
    category: 'Educativo'
  },
  {
    id: '2',
    title: 'Canção dos Números com o Dino 🔢',
    description: 'Conta comigo! O Dino ensina os números de 1 a 10 com uma música super divertida.',
    platform: 'youtube',
    embedId: 'dQw4w9WgXcQ', // Placeholder - substituir pelo ID real
    duration: '4:12',
    category: 'Matemática'
  },
  {
    id: '3',
    title: 'Alfabeto Musical 🎵',
    description: 'Aprende todas as letras do alfabeto com o Dino! Uma música para cada letra.',
    platform: 'rumble',
    embedId: 'placeholder', // Placeholder - substituir pelo ID real
    duration: '5:30',
    category: 'Linguagem'
  },
  {
    id: '4',
    title: 'Dino e os Animais da Quinta 🐄',
    description: 'Conhece todos os animais da quinta com o Dino! Vacas, porcos, galinhas e muito mais.',
    platform: 'youtube',
    embedId: 'dQw4w9WgXcQ', // Placeholder - substituir pelo ID real
    duration: '3:20',
    category: 'Animais'
  },
  {
    id: '5',
    title: 'Hora de Dormir com o Dino 🌙',
    description: 'Uma canção de embalar suave para ajudar os pequenos a adormecer.',
    platform: 'rumble',
    embedId: 'placeholder', // Placeholder - substituir pelo ID real
    duration: '6:00',
    category: 'Relaxamento'
  },
  {
    id: '6',
    title: 'Dino e as Formas Geométricas ⭐',
    description: 'Círculos, quadrados, triângulos! Aprende todas as formas com o Dino.',
    platform: 'youtube',
    embedId: 'dQw4w9WgXcQ', // Placeholder - substituir pelo ID real
    duration: '4:05',
    category: 'Matemática'
  }
]
