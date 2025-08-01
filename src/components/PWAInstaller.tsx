'use client'

import { useEffect } from 'react'

export default function PWAInstaller() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('🎉 SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('❌ SW registration failed: ', registrationError);
          });
      });
    }
  }, [])

  return null // Este componente não renderiza nada
}
