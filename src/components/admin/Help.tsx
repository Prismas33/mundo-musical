export default function Help() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-poppins text-gray-900">
          Ajuda & Suporte
        </h1>
        <p className="text-gray-600 font-nunito">
          Guias, documentação e suporte para usar o dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Start Guide */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Guia de Início Rápido
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Como adicionar o primeiro vídeo
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Organizar por categorias
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Gerir vídeos em destaque
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Publicar e despublicar conteúdo
            </li>
          </ul>
        </div>

        {/* Video Integration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-xl">🎥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Integração de Vídeos
            </h3>
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong>YouTube:</strong>
              <p>Cole o link: https://youtu.be/ABC123</p>
            </div>
            <div>
              <strong>Rumble:</strong>
              <p>Cole o link: https://rumble.com/video-id</p>
            </div>
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <p className="text-green-800 text-xs">
                ✅ A monetização é 100% preservada com embeds oficiais
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-xl">🔧</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Resolução de Problemas
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Vídeo não aparece no site
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Problemas de login
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Erro ao carregar dados
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Links de vídeo inválidos
            </li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Contactar Suporte
            </h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Precisa de ajuda? Entre em contacto connosco:
            </p>
            <div className="space-y-2">
              <a 
                href="mailto:admin@mundomusical.com"
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                admin@mundomusical.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informações do Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Versão:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Última atualização:</span>
            <span className="font-medium">29/07/2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
