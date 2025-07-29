import Layout from '@/components/Layout'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre o Dino - Mundo Musical',
  description: 'Conhece a história do Mundo Musical e a nossa missão de educar e entreter crianças através da música.',
}

export default function Sobre() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-orange-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Image
              src="/images/dino&family/dino_cp.png"
              alt="Mundo Musical"
              width={160}
              height={160}
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-4">
              A História do Dino
            </h1>
            <p className="text-xl text-gray-600 font-nunito">
              Descobre como tudo começou e qual é a nossa missão
            </p>
          </div>

          {/* História */}
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-6 text-center">
              🌟 Como tudo começou
            </h2>
            <div className="prose prose-lg max-w-none font-nunito text-gray-600">
              <p className="mb-6">
                Era uma vez um dinossauro muito especial chamado Dino, que vivia num mundo colorido e cheio de música. 
                Ao contrário dos outros dinossauros que rugiam, o Dino preferia cantar e fazer música!
              </p>
              <p className="mb-6">
                O Dino descobriu que através da música podia ensinar coisas incríveis às crianças: 
                desde as cores do arco-íris até aos números, desde as letras do alfabeto até aos valores mais importantes da vida.
              </p>
              <p className="mb-6">
                Assim nasceu o <strong>Mundo Musical</strong> - um lugar mágico onde a aprendizagem e a diversão andam de mãos dadas, 
                onde cada música é uma aventura e cada vídeo é uma nova descoberta!
              </p>
            </div>
          </div>

          {/* Missão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-orange-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold font-poppins text-orange-800 mb-4 flex items-center">
                🎯 A Nossa Missão
              </h3>
              <p className="text-orange-700 font-nunito">
                Criar conteúdo educativo de qualidade que inspire, eduque e divirta crianças de todas as idades. 
                Acreditamos que aprender deve ser uma experiência alegre e colorida!
              </p>
            </div>

            <div className="bg-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold font-poppins text-blue-800 mb-4 flex items-center">
                💝 Os Nossos Valores
              </h3>
              <p className="text-blue-700 font-nunito">
                Criatividade, diversão, aprendizagem e família. Cada vídeo é criado com amor e pensado para ser 
                partilhado entre pais e filhos, criando momentos especiais em família.
              </p>
            </div>
          </div>

          {/* O que oferecemos */}
          <div className="bg-green-50 rounded-3xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-8 text-center">
              🎁 O que o Dino tem para ti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">🎬</span>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Vídeos Educativos</h4>
                  <p className="text-gray-600 font-nunito">
                    Música, cores, números, letras e muito mais!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="text-3xl">🎨</span>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Atividades Criativas</h4>
                  <p className="text-gray-600 font-nunito">
                    Livros para colorir e atividades para fazer em casa.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Momentos em Família</h4>
                  <p className="text-gray-600 font-nunito">
                    Conteúdo pensado para ser partilhado com os pais.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="text-3xl">🌟</span>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Novidades Constantes</h4>
                  <p className="text-gray-600 font-nunito">
                    Sempre há algo novo para descobrir no mundo do Dino!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold font-poppins text-gray-800 mb-4">
              Quer fazer parte da família Dino? 🦕
            </h3>
            <p className="text-gray-600 font-nunito mb-6">
              Junta-te ao Dino Club e fica a par de todas as novidades, atividades exclusivas e surpresas especiais!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/videos"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Ver os Vídeos
              </a>
              <a
                href="/contacto"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Juntar ao Dino Club
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
