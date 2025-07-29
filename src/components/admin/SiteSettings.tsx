export default function SiteSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-poppins text-gray-900">
          Configurações do Site
        </h1>
        <p className="text-gray-600 font-nunito">
          Configurações gerais e manutenção do site
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-xl">⚙️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Configurações Gerais
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Título do site, descrição, configurações de SEO e metadata.
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm">
            Em desenvolvimento
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-xl">🔧</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Modo Manutenção
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Ativar ou desativar o modo de manutenção do site.
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm">
            Em desenvolvimento
          </div>
        </div>
      </div>
    </div>
  )
}
