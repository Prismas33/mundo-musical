import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-100 via-blue-50 to-green-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Imagem do Dino */}
          <div className="mb-8">
            <Image
              src="/images/dino&family/dino_cp.png"
              alt="Mundo Musical"
              width={200}
              height={200}
              className="mx-auto animate-bounce"
              priority
            />
          </div>
          
          {/* Título Principal */}
          <h1 className="text-4xl md:text-6xl font-bold font-poppins text-gray-800 mb-6">
            O Dino está a conquistar os{' '}
            <span className="text-orange-500">miúdos</span>
            ... e os{' '}
            <span className="text-blue-500">pais</span>{' '}
            também!
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-nunito">
            Descobre um mundo mágico de música, aprendizagem e diversão. 
            Vídeos educativos que inspiram e entretêm toda a família!
          </p>
          
          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/videos" 
              className="bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎬 Ver Vídeos
            </Link>
            <Link 
              href="/em-breve" 
              className="bg-green-400 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎨 Colorir com o Dino (em breve)
            </Link>
          </div>
          
          {/* Call to Action Newsletter */}
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 font-poppins">
              📱 App Dino TV a caminho!
            </h3>
            <p className="text-gray-600 mb-4 font-nunito">
              Fica a saber quando chegarem as novidades
            </p>
            <Link 
              href="/contacto" 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors inline-block"
            >
              Juntar ao Dino Club
            </Link>
          </div>
        </div>
      </div>
      
      {/* Elementos Decorativos */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">🎵</div>
      <div className="absolute top-20 right-10 text-3xl animate-pulse">⭐</div>
      <div className="absolute bottom-10 left-20 text-3xl animate-bounce delay-1000">🎶</div>
      <div className="absolute bottom-20 right-20 text-4xl animate-pulse delay-500">🌟</div>
    </section>
  )
}
