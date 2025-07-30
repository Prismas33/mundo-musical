import Layout from '@/components/Layout'
import Card from '@/components/Card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Em Breve - Mundo Musical',
  description: 'Descobre todas as novidades que estão a chegar! Livros para colorir, aplicação móvel, jogos e muito mais.',
}

export default function EmBreve() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-6xl block mb-6">🚀</span>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-4">
              Novidades a Caminho!
            </h1>
            <p className="text-xl text-gray-600 font-nunito max-w-3xl mx-auto">
              O mundo do Dino está sempre a crescer! Descobre todas as coisas incríveis que estamos a preparar para ti.
            </p>
          </div>

          {/* Produtos em Desenvolvimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card
              emoji="🎨"
              title="Livros para Colorir Digitais"
              description="Livros interativos para colorir no tablet ou computador, com o Dino e todos os seus amigos! Inclui modos de pintura mágica e efeitos especiais."
              status="coming-soon"
              action="Em Breve"
            />
            
            <Card
              emoji="📱"
              title="App Dino TV"
              description="A aplicação oficial do Dino! Vídeos, jogos educativos, karaoke e atividades interativas. Disponível para Android e iOS."
              status="in-development"
              action="A Caminho"
            />
            
            <Card
              emoji="🧸"
              title="Peluche do Dino"
              description="O Dino ganha vida! Peluche super macio e fofo para abraçar. Vai ter sons e música incorporados para brincar."
              status="coming-soon"
              action="Em Breve"
            />
            
            <Card
              emoji="🎮"
              title="Jogos Educativos Online"
              description="Portal de jogos online gratuitos com o Dino. Quebra-cabeças, memória, pintura e muito mais para aprender brincando."
              status="in-development"
              action="A Caminho"
            />
            
            <Card
              emoji="📚"
              title="Livros Físicos para Colorir"
              description="Livros impressos de alta qualidade para colorir em casa. Perfeitos para momentos offline e atividades em família."
              status="coming-soon"
              action="Em Breve"
            />
            
            <Card
              emoji="🎵"
              title="Álbum Musical do Dino"
              description="Todas as músicas favoritas do Dino num álbum completo! Disponível em Spotify, Apple Music e outras plataformas."
              status="in-development"
              action="A Caminho"
            />
            
            <Card
              emoji="🎪"
              title="Espetáculo ao Vivo"
              description="O Dino vai sair do ecrã! Espetáculos ao vivo com música, dança e muita interação com o público."
              status="coming-soon"
              action="Em Planeamento"
            />
            
            <Card
              emoji="🎂"
              title="Festas de Aniversário Temáticas"
              description="Packs completos para festas de aniversário com tema do Dino. Decorações, atividades e surpresas!"
              status="coming-soon"
              action="Em Breve"
            />
            
            <Card
              emoji="👕"
              title="Roupa e Acessórios"
              description="T-shirts, gorros, mochilas e outros acessórios com o Dino. Para os pequenos fãs mostrarem o seu amor pelo Dino!"
              status="coming-soon"
              action="Em Breve"
            />
          </div>

          {/* Cronograma */}
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-8 text-center">
              📅 Cronograma das Novidades
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Q1 2025
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">App Dino TV (Beta)</h3>
                  <p className="text-gray-600 font-nunito text-sm">Lançamento da versão beta da aplicação</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Q2 2025
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Livros para Colorir</h3>
                  <p className="text-gray-600 font-nunito text-sm">Lançamento dos primeiros livros digitais e físicos</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Q3 2025
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Merchandise</h3>
                  <p className="text-gray-600 font-nunito text-sm">Peluches, roupa e acessórios do Dino</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Q4 2025
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Álbum Musical</h3>
                  <p className="text-gray-600 font-nunito text-sm">Álbum completo em todas as plataformas de música</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-orange-100 to-blue-100 rounded-3xl p-8 md:p-12 text-center">
            <span className="text-5xl block mb-6">📧</span>
            <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-4">
              Quer ser o primeiro a saber?
            </h2>
            <p className="text-xl text-gray-600 font-nunito mb-8 max-w-2xl mx-auto">
              Junta-te ao Dino Club e recebe todas as novidades em primeira mão! 
              Serás o primeiro a saber quando chegarem estas novidades incríveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contacto"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎉 Juntar ao Dino Club
              </a>
              <a
                href="/videos"
                className="bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎬 Ver Vídeos Atuais
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-8 text-center">
              ❓ Perguntas Frequentes
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-bold text-gray-800 mb-2">Quando chegam as novidades?</h3>
                <p className="text-gray-600 font-nunito">
                  Estamos a trabalhar constantemente em novos produtos! O cronograma acima mostra as datas previstas, 
                  mas podes seguir-nos para atualizações em tempo real.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-bold text-gray-800 mb-2">Os produtos serão gratuitos?</h3>
                <p className="text-gray-600 font-nunito">
                  Alguns produtos (como jogos online) serão gratuitos, enquanto outros (como peluches e livros) 
                  terão um custo para cobrir a produção. Haverá sempre opções gratuitas disponíveis!
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-gray-800 mb-2">Como posso ajudar ou dar sugestões?</h3>
                <p className="text-gray-600 font-nunito">
                  Adoramos ouvir a vossa opinião! Enviem as vossas ideias e sugestões através da página de contacto. 
                  A vossa feedback é muito importante para nós!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
