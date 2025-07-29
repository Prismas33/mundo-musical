import Image from 'next/image'

interface CardProps {
  title: string
  description: string
  image?: string
  emoji?: string
  status?: 'available' | 'coming-soon' | 'in-development'
  link?: string
  action?: string
}

export default function Card({ 
  title, 
  description, 
  image, 
  emoji, 
  status = 'available', 
  link, 
  action = 'Saber Mais' 
}: CardProps) {
  const statusColors = {
    'available': 'bg-green-100 text-green-800',
    'coming-soon': 'bg-orange-100 text-orange-800',
    'in-development': 'bg-blue-100 text-blue-800'
  }

  const statusTexts = {
    'available': 'Disponível',
    'coming-soon': 'Em Breve',
    'in-development': 'Em Desenvolvimento'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Imagem ou Emoji */}
      <div className="h-48 bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : emoji ? (
          <span className="text-6xl">{emoji}</span>
        ) : (
          <Image
            src="/images/dino&family/dino_cp.png"
            alt={title}
            width={120}
            height={120}
            className="object-contain"
          />
        )}
      </div>
      
      {/* Conteúdo */}
      <div className="p-6">
        {/* Status Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
            {statusTexts[status]}
          </span>
        </div>
        
        {/* Título */}
        <h3 className="text-xl font-bold font-poppins text-gray-800 mb-3">
          {title}
        </h3>
        
        {/* Descrição */}
        <p className="text-gray-600 font-nunito mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Botão de Ação */}
        {link && (
          <a
            href={link}
            className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${
              status === 'available' 
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-gray-200 text-gray-600 cursor-not-allowed'
            }`}
            {...(status !== 'available' && { 'aria-disabled': true })}
          >
            {action}
          </a>
        )}
      </div>
    </div>
  )
}
