'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Category {
  id: string
  name: string
  emoji: string
  description?: string
  language: 'pt' | 'en'
  videoCount?: number
  createdAt?: any
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    description: '',
    language: 'pt' as 'pt' | 'en'
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      
      // Buscar categorias criadas explicitamente no Firebase
      const categoriesQuery = query(collection(db, 'categories'), orderBy('createdAt', 'desc'))
      const categoriesSnapshot = await getDocs(categoriesQuery)
      
      const explicitCategories: Category[] = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        videoCount: 0 // Will be updated below
      } as Category))

      // Buscar categorias únicas dos vídeos agrupadas por idioma
      const videosQuery = query(collection(db, 'videos'))
      const videosSnapshot = await getDocs(videosQuery)
      
      const categoryMap = new Map<string, { count: number; language: 'pt' | 'en' }>()
      
      videosSnapshot.docs.forEach(doc => {
        const video = doc.data()
        if (video.category) {
          const key = `${video.category}_${video.language || 'pt'}`
          const existing = categoryMap.get(key) || { count: 0, language: video.language || 'pt' }
          categoryMap.set(key, { count: existing.count + 1, language: video.language || 'pt' })
        }
      })

      // Converter categorias dos vídeos para array
      const videoCategories: Category[] = Array.from(categoryMap.entries()).map(([key, data], index) => {
        const categoryName = key.replace(/_pt$|_en$/, '')
        return {
          id: `video_cat_${index}`,
          name: categoryName,
          emoji: getCategoryEmoji(categoryName),
          description: `Categoria extraída dos vídeos (${data.count} vídeo${data.count === 1 ? '' : 's'})`,
          language: data.language,
          videoCount: data.count,
          createdAt: new Date()
        }
      })

      // Atualizar contagens dos vídeos nas categorias explícitas
      explicitCategories.forEach(category => {
        const key = `${category.name}_${category.language}`
        const videoData = categoryMap.get(key)
        if (videoData) {
          category.videoCount = videoData.count
          category.description = `${category.description} (${videoData.count} vídeo${videoData.count === 1 ? '' : 's'})`
        }
      })

      // Combinar e remover duplicatas (priorizar categorias explícitas)
      const allCategories = [...explicitCategories]
      
      videoCategories.forEach(videoCategory => {
        const exists = explicitCategories.some(explicit => 
          explicit.name.toLowerCase() === videoCategory.name.toLowerCase() && 
          explicit.language === videoCategory.language
        )
        if (!exists) {
          allCategories.push(videoCategory)
        }
      })

      // Ordenar por data de criação (mais recentes primeiro)
      allCategories.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })

      setCategories(allCategories)
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
      setErrorMessage('Erro ao carregar categorias')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryEmoji = (categoryName: string): string => {
    const emojiMap: { [key: string]: string } = {
      'musical': '🎵',
      'musica': '🎵',
      'música': '🎵',
      'song': '🎵',
      'music': '🎵',
      'educacional': '📚',
      'educational': '📚',
      'ensino': '📚',
      'aprender': '📚',
      'learn': '📚',
      'entretenimento': '🎬',
      'entertainment': '🎬',
      'diversão': '🎉',
      'fun': '🎉',
      'infantil': '👶',
      'criança': '👶',
      'child': '👶',
      'kids': '👶',
      'tutorial': '🎓',
      'aventura': '🚀',
      'adventure': '🚀',
      'família': '👨‍👩‍👧‍👦',
      'family': '👨‍👩‍👧‍👦',
      'aprendizagem': '🧠',
      'learning': '🧠',
      'criatividade': '🎨',
      'creativity': '🎨',
      'arte': '🎨',
      'art': '🎨',
      'completo': '🎵',
      'complete': '🎵',
      'default': '🏷️'
    }

    const lowerName = categoryName.toLowerCase()
    for (const [key, emoji] of Object.entries(emojiMap)) {
      if (lowerName.includes(key)) {
        return emoji
      }
    }
    return emojiMap.default
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setErrorMessage('Nome da categoria é obrigatório')
      return
    }

    // Check for duplicates in the same language
    const existingInLanguage = categories.filter(cat => cat.language === formData.language)
    if (existingInLanguage.some(cat => 
      cat.name.toLowerCase() === formData.name.toLowerCase()
    )) {
      setErrorMessage(`❌ Categoria "${formData.name}" já existe para ${formData.language === 'pt' ? 'Português' : 'English'}`)
      return
    }

    try {
      setErrorMessage('')
      
      // Criar categoria no Firebase
      const categoryData = {
        name: formData.name.trim(),
        emoji: formData.emoji.trim() || getCategoryEmoji(formData.name),
        description: formData.description || `Categoria ${formData.name}`,
        language: formData.language,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      }

      const docRef = await addDoc(collection(db, 'categories'), categoryData)
      console.log('Categoria criada com ID:', docRef.id)

      setSuccessMessage(`🎉 Categoria "${formData.name}" criada com sucesso para ${formData.language === 'pt' ? '🇵🇹 Português' : '🇬🇧 English'}!`)
      
      // Recarregar categorias para mostrar a nova
      await fetchCategories()
      resetForm()
      
      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 4000)
      
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error)
      setErrorMessage('❌ Erro ao salvar categoria no Firebase. Tente novamente.')
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', emoji: '', description: '', language: 'pt' })
    setShowAddForm(false)
    setEditingCategory(null)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      emoji: category.emoji,
      description: category.description || '',
      language: category.language
    })
    setShowAddForm(true)
  }

  const handleDelete = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Tem a certeza que quer eliminar a categoria "${categoryName}"?\n\nNota: Os vídeos não serão eliminados, apenas a categoria.`)) {
      return
    }

    try {
      await deleteDoc(doc(db, 'categories', categoryId))
      setSuccessMessage(`🗑️ Categoria "${categoryName}" eliminada com sucesso!`)
      
      // Recarregar categorias
      await fetchCategories()
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
      
    } catch (error) {
      console.error('Erro ao eliminar categoria:', error)
      setErrorMessage('❌ Erro ao eliminar categoria. Tente novamente.')
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingCategory || !formData.name.trim()) {
      setErrorMessage('Nome da categoria é obrigatório')
      return
    }

    try {
      setErrorMessage('')
      
      const categoryData = {
        name: formData.name.trim(),
        emoji: formData.emoji.trim() || getCategoryEmoji(formData.name),
        description: formData.description || `Categoria ${formData.name}`,
        language: formData.language,
        updatedAt: new Date()
      }

      await updateDoc(doc(db, 'categories', editingCategory.id), categoryData)
      console.log('Categoria atualizada:', editingCategory.id)

      setSuccessMessage(`✅ Categoria "${formData.name}" atualizada com sucesso!`)
      
      // Recarregar categorias para mostrar as alterações
      await fetchCategories()
      resetForm()
      
      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 4000)
      
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error)
      setErrorMessage('❌ Erro ao atualizar categoria no Firebase. Tente novamente.')
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-gray-900">
            Gestão de Categorias
          </h1>
          <p className="text-gray-600 font-nunito">
            A carregar categorias...
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-gray-900">
            Gestão de Categorias
          </h1>
          <p className="text-gray-600 font-nunito">
            Organizar e gerir as categorias dos vídeos ({categories.length} categorias ativas)
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova Categoria
        </button>
      </div>

      {/* Mensagens */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Formulário para Nova Categoria */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={editingCategory ? handleUpdate : handleAddCategory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ex: Musical, Educacional..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emoji
                </label>
                <input
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="🎵"
                  maxLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Idioma *
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value as 'pt' | 'en'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="pt">🇵🇹 Português</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
                placeholder="Descrição da categoria..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingCategory ? 'Atualizar' : 'Adicionar'} Categoria
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Categorias */}
      {categories.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Categorias Existentes
            </h3>
            <p className="text-sm text-gray-600">
              Estas categorias são extraídas automaticamente dos vídeos existentes
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {categories.map((category) => (
              <div key={category.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">{category.emoji}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        {category.name}
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {category.language === 'pt' ? '🇵🇹 PT' : '🇬🇧 EN'}
                        </span>
                      </h4>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {category.videoCount} vídeo{category.videoCount === 1 ? '' : 's'}
                    </span>
                    
                    {/* Só mostrar botões de edição/eliminação para categorias criadas explicitamente */}
                    {!category.id.startsWith('video_cat_') && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Editar categoria"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                          title="Eliminar categoria"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏷️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma categoria encontrada
          </h3>
          <p className="text-gray-600 mb-4">
            As categorias são criadas automaticamente quando adiciona vídeos com categorias especificadas.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Planear Nova Categoria
          </button>
        </div>
      )}

      {/* Info sobre como funcionam as categorias */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-blue-700 font-medium">Como funcionam as categorias:</p>
            <p className="text-blue-600 text-sm mt-1">
              As categorias são extraídas automaticamente dos vídeos que adiciona. Quando adiciona um vídeo com uma categoria, 
              ela aparece automaticamente aqui. Para criar uma nova categoria, simplesmente adicione um vídeo com essa categoria na gestão de vídeos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
