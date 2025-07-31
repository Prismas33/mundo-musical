'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Video {
  id: string
  title: string
  description: string
  platform: 'youtube'
  videoId: string
  category?: string
  language?: 'pt' | 'en'
  duration?: string
  featured?: boolean
  createdAt?: any
  isActive?: boolean
}

interface AnalyticsData {
  totalVideos: number
  activeVideos: number
  totalCategories: number
  youtubVideos: number
  featuredVideos: number
  recentActivity: Array<{
    type: string
    message: string
    date: string
  }>
}

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalVideos: 0,
    activeVideos: 0,
    totalCategories: 0,
    youtubVideos: 0,
    featuredVideos: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)

      // Buscar todos os vídeos
      const videosQuery = query(collection(db, 'videos'), orderBy('createdAt', 'desc'))
      const videosSnapshot = await getDocs(videosQuery)
      
      const videos: Video[] = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Video))

      // Calcular estatísticas
      const totalVideos = videos.length
      const activeVideos = videos.filter(v => v.isActive !== false).length
      const youtubVideos = videos.filter(v => v.platform === 'youtube').length
      const featuredVideos = videos.filter(v => v.featured === true).length
      
      // Contar categorias únicas
      const categories = new Set(videos.map(v => v.category).filter(Boolean))
      const totalCategories = categories.size

      // Atividade recente (últimos 5 vídeos)
      const recentVideos = videos.slice(0, 5)
      const recentActivity = recentVideos.map(video => ({
        type: 'video',
        message: `Vídeo "${video.title}" adicionado`,
        date: video.createdAt?.toDate ? 
          video.createdAt.toDate().toLocaleDateString('pt-PT') : 
          'Data desconhecida'
      }))

      setAnalyticsData({
        totalVideos,
        activeVideos,
        totalCategories,
        youtubVideos,
        featuredVideos,
        recentActivity
      })

    } catch (error) {
      console.error('Erro ao carregar analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-gray-900">
            Analytics & Estatísticas
          </h1>
          <p className="text-gray-600 font-nunito">
            A carregar dados estatísticos...
          </p>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-poppins text-gray-900">
          Analytics & Estatísticas
        </h1>
        <p className="text-gray-600 font-nunito">
          Estatísticas reais baseadas nos dados do Firebase
        </p>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">🎥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Vídeos</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalVideos}</p>
              <p className="text-xs text-gray-500">{analyticsData.activeVideos} ativos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">🏷️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categorias</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCategories}</p>
              <p className="text-xs text-gray-500">únicas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Em Destaque</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.featuredVideos}</p>
              <p className="text-xs text-gray-500">vídeos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas por Plataforma */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold font-poppins text-gray-900 mb-4">
            Distribuição por Plataforma
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-red-600 text-sm">📺</span>
                </div>
                <span className="font-medium">YouTube</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-900">{analyticsData.youtubVideos}</span>
                <p className="text-xs text-gray-500">
                  {analyticsData.totalVideos > 0 ? 
                    Math.round((analyticsData.youtubVideos / analyticsData.totalVideos) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold font-poppins text-gray-900 mb-4">
            Atividade Recente
          </h3>
          <div className="space-y-3">
            {analyticsData.recentActivity.length > 0 ? (
              analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center py-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">Nenhuma atividade recente</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Indicadores de Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-bold font-poppins text-gray-900 mb-4">
          Status do Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-green-800">Firebase</p>
              <p className="text-xs text-green-600">Conectado</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-blue-800">Authentication</p>
              <p className="text-xs text-blue-600">Ativo</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-orange-50 rounded-lg">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-orange-800">Site</p>
              <p className="text-xs text-orange-600">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
