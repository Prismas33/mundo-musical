export default function CategoriesManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-poppins text-gray-900">
          Gestão de Categorias
        </h1>
        <p className="text-gray-600 font-nunito">
          Organizar e gerir as categorias dos vídeos
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🏷️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Categorias (Em Desenvolvimento)
        </h3>
        <p className="text-gray-600 mb-4">
          Sistema de gestão de categorias será implementado em breve.
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Próxima funcionalidade
        </div>
      </div>
    </div>
  )
}
