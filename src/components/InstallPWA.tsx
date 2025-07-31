'use client'

import { useState, useEffect } from 'react'

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has previously dismissed the banner
    const dismissed = localStorage.getItem('pwa-banner-dismissed')
    const dismissedTime = localStorage.getItem('pwa-banner-dismissed-time')
    
    if (dismissed === 'true' && dismissedTime) {
      const dismissedTimestamp = parseInt(dismissedTime)
      const now = Date.now()
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000 // 7 dias em milissegundos
      
      // Se passou mais de 7 dias, permitir mostrar o banner novamente
      if (now - dismissedTimestamp > sevenDaysInMs) {
        localStorage.removeItem('pwa-banner-dismissed')
        localStorage.removeItem('pwa-banner-dismissed-time')
        setIsDismissed(false)
      } else {
        setIsDismissed(true)
        return
      }
    } else if (dismissed === 'true') {
      setIsDismissed(true)
      return
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Save the event so it can be triggered later
      setDeferredPrompt(e)
      // Show the install button only if not dismissed
      if (!isDismissed) {
        setShowInstallButton(true)
      }
    }

    const handleAppInstalled = () => {
      console.log('🎉 PWA foi instalada!')
      setShowInstallButton(false)
      setDeferredPrompt(null)
      // Mark as dismissed since app is now installed
      localStorage.setItem('pwa-banner-dismissed', 'true')
      setIsDismissed(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [isDismissed])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('👍 User accepted the install prompt')
    } else {
      console.log('👎 User dismissed the install prompt')
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  const handleDismiss = () => {
    // Save dismissal to localStorage with timestamp
    localStorage.setItem('pwa-banner-dismissed', 'true')
    localStorage.setItem('pwa-banner-dismissed-time', Date.now().toString())
    setIsDismissed(true)
    setShowInstallButton(false)
  }

  // Don't show if dismissed or if no install prompt available
  if (isDismissed || !showInstallButton) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gradient-to-r from-orange-500 to-blue-500 text-white p-4 rounded-xl shadow-lg max-w-sm animate-bounce">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">📱</div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Instalar App Dino!</h3>
            <p className="text-xs opacity-90">Acesso rápido e offline</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white text-xs px-2 py-1 transition-colors"
              title="Fechar"
            >
              ✕
            </button>
            <button
              onClick={handleInstallClick}
              className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded font-medium transition-colors"
            >
              Instalar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
