'use client'

import { useRequireAuth } from '@/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user, loading, authenticated } = useRequireAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect via useRequireAuth
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🦕</span>
              <h1 className="text-xl font-bold font-poppins text-gray-900">
                Dashboard Admin - Mundo Musical
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold font-poppins mb-2">
            Bem-vindo ao Dashboard! 🎉
          </h2>
          <p className="text-orange-100 font-nunito">
            Gere o conteúdo do Mundo Musical de forma simples e eficaz.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">🎥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vídeos</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categorias</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <span className="text-2xl">👁️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Publicados</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Videos */}
          <Link href="/admin/videos" className="group">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent group-hover:border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <span className="text-2xl">🎬</span>
                </div>
                <div className="text-orange-500 group-hover:text-orange-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">
                Gerir Vídeos
              </h3>
              <p className="text-gray-600 font-nunito text-sm">
                Adicionar, editar e organizar os vídeos do YouTube e Rumble
              </p>
            </div>
          </Link>

          {/* Manage Categories */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-blue-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">🏷️</span>
              </div>
              <div className="text-blue-500 group-hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">
              Categorias
            </h3>
            <p className="text-gray-600 font-nunito text-sm">
              Gerir categorias e organização do conteúdo
            </p>
          </div>

          {/* Site Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-green-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">⚙️</span>
              </div>
              <div className="text-green-500 group-hover:text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">
              Configurações
            </h3>
            <p className="text-gray-600 font-nunito text-sm">
              Configurações gerais do site e manutenção
            </p>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-purple-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">📈</span>
              </div>
              <div className="text-purple-500 group-hover:text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">
              Analytics
            </h3>
            <p className="text-gray-600 font-nunito text-sm">
              Estatísticas de visualizações e engagement
            </p>
          </div>

          {/* View Site */}
          <Link href="/" target="_blank" className="group">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent group-hover:border-indigo-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <span className="text-2xl">🌐</span>
                </div>
                <div className="text-indigo-500 group-hover:text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">
                Ver Site
              </h3>
              <p className="text-gray-600 font-nunito text-sm">
                Abrir o site público numa nova janela
              </p>
            </div>
          </Link>

          {/* Help & Support */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-yellow-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                <span className="text-2xl">💡</span>
              </div>
              <div className="text-yellow-500 group-hover:text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">
              Ajuda
            </h3>
            <p className="text-gray-600 font-nunito text-sm">
              Guias e suporte para usar o dashboard
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold font-poppins text-gray-900 mb-4">
            Atividade Recente
          </h3>
          <div className="space-y-3">
            <div className="flex items-center py-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sistema inicializado</p>
                <p className="text-xs text-gray-500">Dashboard admin criado com sucesso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
