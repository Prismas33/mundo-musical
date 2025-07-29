'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAdminAuth() {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user
  }
}

export function useRequireAuth() {
  const { user, loading } = useAdminAuth()
  
  // Show loading while checking auth
  if (loading) {
    return {
      user: null,
      loading: true,
      authenticated: false
    }
  }

  // Return user if authenticated
  if (user) {
    return {
      user,
      loading: false,
      authenticated: true
    }
  }

  // Will redirect via useAdminAuth hook
  return {
    user: null,
    loading: false,
    authenticated: false
  }
}
