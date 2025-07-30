'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Video {
  id: string
  title: string
  description: string
  platform: 'youtube' | 'rumble'
  videoId: string
  category?: string
  language?: 'pt' | 'en'
  duration?: string
  featured?: boolean
  createdAt?: any
  isActive?: boolean
}

export function useVideos(category?: string) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError(null)

      // Criar query base
      let videosQuery = query(
        collection(db, 'videos'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )

      // Filtrar por categoria se especificada
      if (category) {
        videosQuery = query(
          collection(db, 'videos'),
          where('isActive', '==', true),
          where('category', '==', category),
          orderBy('createdAt', 'desc')
        )
      }

      const querySnapshot = await getDocs(videosQuery)
      const videosData: Video[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        videosData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          platform: data.platform,
          videoId: data.videoId,
          category: data.category,
          language: data.language,
          duration: data.duration,
          featured: data.featured,
          createdAt: data.createdAt,
          isActive: data.isActive
        })
      })

      setVideos(videosData)
    } catch (err) {
      console.error('Erro ao buscar vídeos:', err)
      setError('Erro ao carregar vídeos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [category])

  return { videos, loading, error, refetch: fetchVideos }
}

export function useVideoCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'videos'), where('isActive', '==', true))
        )
        
        const categoriesSet = new Set<string>()
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.category) {
            categoriesSet.add(data.category)
          }
        })

        setCategories(Array.from(categoriesSet).sort())
      } catch (err) {
        console.error('Erro ao buscar categorias:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}
