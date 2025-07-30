'use client'

import { useState, useEffect } from 'react'
import { useRequireAuth } from '@/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import VideosManagement from '@/components/admin/VideosManagement'
import CategoriesManagement from '@/components/admin/CategoriesManagement'
import SiteSettings from '@/components/admin/SiteSettings'
import Analytics from '@/components/admin/Analytics'
import Help from '@/components/admin/Help'

// Tipos de páginas do admin
type AdminPage = 'dashboard' | 'videos' | 'categories' | 'settings' | 'analytics' | 'help'

interface MenuItem {
  id: AdminPage
  label: string
  icon: string
  description: string
}

export default function AdminDashboard() {
  const { user, loading, authenticated } = useRequireAuth()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard')

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Visão geral do sistema'
    },
    {
      id: 'videos',
      label: 'Gerir Vídeos',
      icon: '🎬',
      description: 'YouTube e Rumble'
    },
    {
      id: 'categories',
      label: 'Categorias',
      icon: '🏷️',
      description: 'Organizar conteúdo'
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: '⚙️',
      description: 'Configurações gerais'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      description: 'Estatísticas e métricas'
    },
    {
      id: 'help',
      label: 'Ajuda',
      icon: '💡',
      description: 'Guias e suporte'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  // Componente do Dashboard Home
  const DashboardHome = () => {
    const [dashboardStats, setDashboardStats] = useState({
      totalVideos: 0,
      categorias: 0,
      publicados: 0,
      loading: true
    })

    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          // Buscar vídeos
          const videosQuery = query(collection(db, 'videos'), orderBy('createdAt', 'desc'))
          const videosSnapshot = await getDocs(videosQuery)
          
          const videos = videosSnapshot.docs.map((doc: any) => doc.data())
          const totalVideos = videos.length
          const publicados = videos.filter((v: any) => v.isActive !== false).length
          
          // Contar categorias únicas
          const categories = new Set(videos.map((v: any) => v.category).filter(Boolean))
          const categorias = categories.size

          setDashboardStats({
            totalVideos,
            categorias,
            publicados,
            loading: false
          })
        } catch (error) {
          console.error('Erro ao carregar estatísticas:', error)
          setDashboardStats(prev => ({ ...prev, loading: false }))
        }
      }

      fetchDashboardData()
    }, [])

    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold font-poppins mb-2">
            Bem-vindo ao Dashboard! 🎉
          </h2>
          <p className="text-orange-100 font-nunito">
            Gere o conteúdo do Mundo Musical de forma simples e eficaz.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">🎥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vídeos</p>
                {dashboardStats.loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalVideos}</p>
                )}
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
                {dashboardStats.loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.categorias}</p>
                )}
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
                {dashboardStats.loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.publicados}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold font-poppins text-gray-900 mb-4">
            Atividade Recente
          </h3>
          <div className="space-y-3">
            <div className="flex items-center py-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Dashboard com dados reais implementado</p>
                <p className="text-xs text-gray-500">Sistema conectado ao Firebase</p>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 text-sm">📊</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Analytics implementado</p>
                <p className="text-xs text-gray-500">Estatísticas reais do Firebase</p>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-orange-600 text-sm">🏷️</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Gestão de categorias ativa</p>
                <p className="text-xs text-gray-500">Categorias extraídas automaticamente</p>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-600 text-sm">⚙️</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Configurações do site funcionais</p>
                <p className="text-xs text-gray-500">SEO, redes sociais e manutenção</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Função para renderizar o conteúdo baseado na página atual
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />
      case 'videos':
        return <VideosManagement />
      case 'categories':
        return <CategoriesManagement />
      case 'settings':
        return <SiteSettings />
      case 'analytics':
        return <Analytics />
      case 'help':
        return <Help />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 flex items-center justify-center">
              <Image
                src="/images/dino&family/Dino.png"
                alt="Dino"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold font-poppins text-gray-900">
                Mundo Musical
              </h1>
              <p className="text-xs text-gray-500">Dashboard Admin</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-orange-100 text-orange-700 border-r-4 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Admin
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-bold font-poppins text-gray-900">
              {menuItems.find(item => item.id === currentPage)?.label}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
              </svg>
            </button>
            
            <a 
              href="/" 
              target="_blank"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              title="Ver Site"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
