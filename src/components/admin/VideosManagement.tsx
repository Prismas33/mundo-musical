'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { useCategories } from '@/hooks/useCategories'

interface Video {
  id: string
  title: string
  description: string
  platform: 'youtube' | 'rumble'
  videoId: string
  duration?: string
  category?: string
  language?: 'pt' | 'en'
  featured?: boolean
  isActive?: boolean
  createdAt?: any
  updatedAt?: any
}

export default function VideosManagement() {
  const [user, loading, error] = useAuthState(auth)
  const [videos, setVideos] = useState<Video[]>([])
  const [loadingVideos, setLoadingVideos] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'youtube' as 'youtube' | 'rumble',
    videoId: '',
    duration: '',
    category: '',
    language: 'pt' as 'pt' | 'en',
    featured: false,
    isActive: true
  })

  // Load categories for dropdown
  const { categories, loading: categoriesLoading } = useCategories(formData.language)

  // Load videos from Firestore
  const loadVideos = async () => {
    if (!user) {
      console.log('User not authenticated, skipping video load')
      setLoadingVideos(false)
      return
    }

    try {
      const videosCollection = collection(db, 'videos')
      const videoSnapshot = await getDocs(videosCollection)
      const videoList = videoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[]
      
      setVideos(videoList.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds))
    } catch (error) {
      console.error('Error loading videos:', error)
      setErrorMessage('❌ Erro ao carregar vídeos. Verifique suas permissões.')
    } finally {
      setLoadingVideos(false)
    }
  }

  useEffect(() => {
    if (!loading && user) {
      loadVideos()
    } else if (!loading && !user) {
      setLoadingVideos(false)
    }
  }, [user, loading])

  // Extract video ID from URL
  const extractVideoId = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0]
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0]
    }
    if (url.includes('rumble.com/')) {
      const parts = url.split('/')
      return parts[parts.length - 1]?.split('-')[0]
    }
    return url // Assume it's already an ID
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setErrorMessage('❌ Utilizador não autenticado')
      return
    }
    
    // Clear previous messages
    setSuccessMessage('')
    setErrorMessage('')
    setIsSubmitting(true)
    
    try {
      const videoData = {
        ...formData,
        videoId: extractVideoId(formData.videoId),
        createdAt: editingVideo ? editingVideo.createdAt : new Date(),
        updatedAt: new Date()
      }

      if (editingVideo) {
        // Update existing video
        await updateDoc(doc(db, 'videos', editingVideo.id), videoData)
        setSuccessMessage('✅ Vídeo atualizado com sucesso!')
      } else {
        // Add new video
        await addDoc(collection(db, 'videos'), videoData)
        setSuccessMessage('🎉 Vídeo adicionado com sucesso!')
      }
      
      // Reset form and reload
      resetForm()
      await loadVideos() // Refresh the videos list
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
      
    } catch (error) {
      console.error('Error saving video:', error)
      setErrorMessage('❌ Erro ao salvar vídeo. Tente novamente.')
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form function (closes form)
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      platform: 'youtube',
      videoId: '',
      duration: '',
      category: '',
      language: 'pt',
      featured: false,
      isActive: true
    })
    setShowAddForm(false)
    setEditingVideo(null)
    setSuccessMessage('')
    setErrorMessage('')
  }

  // Reset only form data (keeps form open)
  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      platform: 'youtube',
      videoId: '',
      duration: '',
      category: '',
      language: 'pt',
      featured: false,
      isActive: true
    })
  }

  // Delete video
  const handleDelete = async (videoId: string) => {
    if (!user) {
      setErrorMessage('❌ Utilizador não autenticado')
      return
    }

    if (confirm('Tem a certeza que quer eliminar este vídeo?')) {
      try {
        setErrorMessage('')
        setSuccessMessage('')
        
        await deleteDoc(doc(db, 'videos', videoId))
        setSuccessMessage('🗑️ Vídeo eliminado com sucesso!')
        
        await loadVideos() // Refresh the videos list
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
        
      } catch (error) {
        console.error('Error deleting video:', error)
        setErrorMessage('❌ Erro ao eliminar vídeo. Tente novamente.')
        
        // Auto-hide error message after 5 seconds
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      }
    }
  }

  // Edit video
  const handleEdit = (video: Video) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      description: video.description,
      platform: video.platform,
      videoId: video.videoId,
      duration: video.duration || '',
      category: video.category || '',
      language: video.language || 'pt',
      featured: video.featured || false,
      isActive: video.isActive !== false
    })
    setShowAddForm(true)
  }

  // Loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-600">A verificar autenticação...</span>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-semibold mb-2">
          ❌ Acesso Negado
        </div>
        <p className="text-red-700">
          É necessário estar autenticado para aceder à gestão de vídeos.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-gray-900">
            Gestão de Vídeos
          </h1>
          <p className="text-gray-600 font-nunito">
            Adicionar, editar e organizar vídeos do YouTube e Rumble
          </p>
        </div>
        
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingVideo(null)
            setSuccessMessage('')
            setErrorMessage('')
            resetFormData()
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Vídeo
        </button>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg flex items-center animate-pulse">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {errorMessage}
        </div>
      )}

      {/* Add/Edit Video Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-bold font-poppins text-gray-900 mb-6">
            {editingVideo ? 'Editar Vídeo' : 'Adicionar Novo Vídeo'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Ex: Dino aprende as Cores 🌈"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plataforma *
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value as 'youtube' | 'rumble'})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="youtube">YouTube</option>
                  <option value="rumble">Rumble</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link do Vídeo ou ID *
              </label>
              <input
                type="text"
                value={formData.videoId}
                onChange={(e) => setFormData({...formData, videoId: e.target.value})}
                placeholder="https://youtu.be/ABC123 ou ABC123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Cole o link completo ou apenas o ID do vídeo
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Descrição do vídeo para aparecer no site..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duração
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="3:45"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecionar categoria...</option>
                  {categoriesLoading ? (
                    <option disabled>Carregando categorias...</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))
                  )}
                </select>
                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="Ou criar nova categoria"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idioma *
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value as 'pt' | 'en'})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="pt">🇵🇹 Português</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700">Vídeo em destaque</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700">Ativo</span>
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  resetForm()
                  setSuccessMessage('')
                  setErrorMessage('')
                }}
                disabled={isSubmitting}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingVideo ? 'A Atualizar...' : 'A Adicionar...'}
                  </>
                ) : (
                  editingVideo ? 'Atualizar' : 'Adicionar'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos List */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold font-poppins text-gray-900">
            Vídeos ({videos.length})
          </h2>
        </div>
        
        {loadingVideos ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">A carregar vídeos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎥</span>
            </div>
            <p className="text-lg font-medium mb-2">Nenhum vídeo encontrado</p>
            <p className="text-sm">Adicione o primeiro vídeo para começar!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {videos.map((video) => (
              <div key={video.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">
                        {video.title}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        video.platform === 'youtube' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {video.platform === 'youtube' ? 'YouTube' : 'Rumble'}
                      </span>
                      {video.featured && (
                        <span className="ml-2 inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          ⭐ Destaque
                        </span>
                      )}
                      {!video.isActive && (
                        <span className="ml-2 inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          � Inativo
                        </span>
                      )}
                      {video.language && (
                        <span className="ml-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {video.language === 'pt' ? '🇵🇹 PT' : '🇬🇧 EN'}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {video.description}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-6 6H2" />
                        </svg>
                        ID: {video.videoId}
                      </span>
                      {video.duration && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {video.duration}
                        </span>
                      )}
                      {video.category && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {video.category}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    <button
                      onClick={() => handleEdit(video)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
