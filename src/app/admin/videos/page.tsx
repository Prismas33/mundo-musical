'use client'

import { useState, useEffect } from 'react'
import { useRequireAuth } from '@/hooks/useAuth'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import Image from 'next/image'

interface Video {
  id: string
  title: string
  description: string
  platform: 'youtube' | 'rumble'
  embedId: string
  duration?: string
  category?: string
  featured?: boolean
  published?: boolean
  createdAt?: any
  updatedAt?: any
}

export default function AdminVideos() {
  const { user, loading, authenticated } = useRequireAuth()
  const [videos, setVideos] = useState<Video[]>([])
  const [loadingVideos, setLoadingVideos] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'youtube' as 'youtube' | 'rumble',
    embedId: '',
    duration: '',
    category: '',
    featured: false,
    published: true
  })

  // Load videos from Firestore
  const loadVideos = async () => {
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
    } finally {
      setLoadingVideos(false)
    }
  }

  useEffect(() => {
    if (authenticated) {
      loadVideos()
    }
  }, [authenticated])

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
    
    try {
      const videoData = {
        ...formData,
        embedId: extractVideoId(formData.embedId),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      if (editingVideo) {
        // Update existing video
        await updateDoc(doc(db, 'videos', editingVideo.id), {
          ...videoData,
          createdAt: editingVideo.createdAt, // Keep original creation date
        })
      } else {
        // Add new video
        await addDoc(collection(db, 'videos'), videoData)
      }
      
      // Reset form and reload
      setFormData({
        title: '',
        description: '',
        platform: 'youtube',
        embedId: '',
        duration: '',
        category: '',
        featured: false,
        published: true
      })
      setShowAddForm(false)
      setEditingVideo(null)
      loadVideos()
    } catch (error) {
      console.error('Error saving video:', error)
    }
  }

  // Delete video
  const handleDelete = async (videoId: string) => {
    if (confirm('Tem a certeza que quer eliminar este vídeo?')) {
      try {
        await deleteDoc(doc(db, 'videos', videoId))
        loadVideos()
      } catch (error) {
        console.error('Error deleting video:', error)
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
      embedId: video.embedId,
      duration: video.duration || '',
      category: video.category || '',
      featured: video.featured || false,
      published: video.published !== false
    })
    setShowAddForm(true)
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="mr-4 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="w-8 h-8 mr-3 flex items-center justify-center">
                <Image
                  src="/images/dino&family/Dino.png"
                  alt="Dino"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-bold font-poppins text-gray-900">
                Gestão de Vídeos
              </h1>
            </div>
            
            <button
              onClick={() => {
                setShowAddForm(true)
                setEditingVideo(null)
                setFormData({
                  title: '',
                  description: '',
                  platform: 'youtube',
                  embedId: '',
                  duration: '',
                  category: '',
                  featured: false,
                  published: true
                })
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Adicionar Vídeo
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Video Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-bold font-poppins text-gray-900 mb-4">
              {editingVideo ? 'Editar Vídeo' : 'Adicionar Novo Vídeo'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  value={formData.embedId}
                  onChange={(e) => setFormData({...formData, embedId: e.target.value})}
                  placeholder="https://youtu.be/ABC123 ou ABC123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="3:45"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Educativo, Matemática, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Vídeo em destaque</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Publicado</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingVideo(null)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {editingVideo ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Videos List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold font-poppins text-gray-900">
              Vídeos ({videos.length})
            </h2>
          </div>
          
          {loadingVideos ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            </div>
          ) : videos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum vídeo encontrado. Adicione o primeiro vídeo!
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {videos.map((video) => (
                <div key={video.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">
                          {video.title}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          video.platform === 'youtube' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {video.platform === 'youtube' ? 'YouTube' : 'Rumble'}
                        </span>
                        {video.featured && (
                          <span className="ml-2 inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            Destaque
                          </span>
                        )}
                        {!video.published && (
                          <span className="ml-2 inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            Rascunho
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">
                        {video.description}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <span>ID: {video.embedId}</span>
                        {video.duration && <span>Duração: {video.duration}</span>}
                        {video.category && <span>Categoria: {video.category}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(video)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  )
}
