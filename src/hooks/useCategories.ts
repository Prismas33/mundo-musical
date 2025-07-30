import { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface CategoryOption {
  value: string
  label: string
  language: 'pt' | 'en'
}

export function useCategories(language?: 'pt' | 'en') {
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)

      // Buscar categorias do Firebase primeiro
      const categoriesQuery = language 
        ? query(collection(db, 'categories'), where('language', '==', language))
        : query(collection(db, 'categories'))
      
      const categoriesSnapshot = await getDocs(categoriesQuery)
      const firebaseCategories = new Set<string>()
      
      categoriesSnapshot.docs.forEach(doc => {
        const category = doc.data()
        if (category.name) {
          firebaseCategories.add(category.name)
        }
      })

      // Buscar também dos vídeos para categorias existentes
      const videosQuery = query(collection(db, 'videos'))
      const videosSnapshot = await getDocs(videosQuery)
      
      const categorySet = new Set<string>()
      
      videosSnapshot.docs.forEach(doc => {
        const video = doc.data()
        if (video.category && (!language || video.language === language)) {
          categorySet.add(video.category)
        }
      })

      // Combinar ambas as fontes
      const allCategories = new Set<string>()
      
      // Adicionar categorias do Firebase
      firebaseCategories.forEach(cat => allCategories.add(cat))
      
      // Adicionar categorias dos vídeos
      categorySet.forEach(cat => allCategories.add(cat))

      // Converter para array de opções
      const categoryOptions: CategoryOption[] = Array.from(allCategories)
        .sort()
        .map(category => ({
          value: category,
          label: category,
          language: language || 'pt'
        }))

      setCategories(categoryOptions)
    } catch (err) {
      console.error('Erro ao buscar categorias:', err)
      setError('Erro ao carregar categorias')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [language])

  return { categories, loading, error, refetch: fetchCategories }
}
