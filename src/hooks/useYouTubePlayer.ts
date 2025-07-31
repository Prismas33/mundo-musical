'use client'

import { useEffect, useRef, useState } from 'react'

interface YouTubePlayerConfig {
  videoId: string
  containerId: string
  onPlay?: (videoId: string) => void
  onPause?: (videoId: string) => void
}

interface YouTubePlayerManager {
  initializePlayer: (config: YouTubePlayerConfig) => void
  pauseAllExcept: (videoId: string) => void
  pauseAll: () => void
  isApiReady: boolean
  cleanup: () => void
}

// Referência global para controlar todos os players
const playersRef: { [key: string]: any } = {}
const playerVideoMap: { [containerId: string]: string } = {} // Mapear containerId -> videoId
let currentPlayingVideo: string | null = null

export const useYouTubePlayer = (): YouTubePlayerManager => {
  const [isApiReady, setIsApiReady] = useState(false)
  const callbacksRef = useRef<{ [videoId: string]: { onPlay?: Function; onPause?: Function } }>({})

  // Carregar YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Verificar se a API já foi carregada
    if ((window as any).YT && (window as any).YT.Player) {
      setIsApiReady(true)
      return
    }

    // Evitar carregar múltiplas vezes
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      return
    }

    // Carregar o script da API do YouTube
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    document.head.appendChild(script)

    // Callback quando a API estiver pronta
    ;(window as any).onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API ready')
      setIsApiReady(true)
    }

    return () => {
      // Cleanup será feito pelo método cleanup()
    }
  }, [])

  // Função para pausar todos os players exceto um específico
  const pauseAllExcept = (exceptVideoId: string) => {
    console.log(`🎵 Pausing all videos except: ${exceptVideoId}`)
    
    Object.entries(playersRef).forEach(([playerId, player]) => {
      // Usar o mapeamento interno para obter o videoId
      const playerVideoId = playerVideoMap[playerId]
      
      if (player && playerVideoId && playerVideoId !== exceptVideoId) {
        try {
          const playerState = player.getPlayerState()
          // 1 = YT.PlayerState.PLAYING
          if (playerState === 1) {
            player.pauseVideo()
            console.log(`🔇 Paused video: ${playerVideoId} (player: ${playerId})`)
            
            // Chamar callback de pause se existir
            const callbacks = callbacksRef.current[playerVideoId]
            if (callbacks?.onPause) {
              callbacks.onPause(playerVideoId)
            }
          }
        } catch (error) {
          console.error('Error pausing player:', error)
        }
      }
    })
  }

  // Função para pausar todos os players
  const pauseAll = () => {
    Object.entries(playersRef).forEach(([playerId, player]) => {
      if (player) {
        try {
          const playerState = player.getPlayerState()
          if (playerState === 1) {
            player.pauseVideo()
          }
        } catch (error) {
          console.error('Error pausing player:', error)
        }
      }
    })
    currentPlayingVideo = null
  }

  // Função para inicializar um player
  const initializePlayer = ({ videoId, containerId, onPlay, onPause }: YouTubePlayerConfig) => {
    if (!isApiReady || typeof window === 'undefined' || !(window as any).YT?.Player) {
      console.warn('YouTube API not ready yet')
      return
    }

    // Evitar criar players duplicados
    if (playersRef[containerId]) {
      console.log(`Player ${containerId} already exists`)
      return
    }

    // Verificar se o elemento DOM existe
    const element = document.getElementById(containerId)
    if (!element) {
      console.warn(`Element ${containerId} not found`)
      return
    }

    // Armazenar callbacks
    if (onPlay || onPause) {
      callbacksRef.current[videoId] = { onPlay, onPause }
    }

    try {
      const player = new (window as any).YT.Player(containerId, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          enablejsapi: 1,
          origin: window.location.origin,
          rel: 0, // Não mostrar vídeos relacionados
          modestbranding: 1, // Branding mínimo
          playsinline: 1,
        },
        events: {
          onStateChange: (event: any) => {
            const state = event.data
            const player = event.target
            
            // 1 = YT.PlayerState.PLAYING
            if (state === 1) {
              console.log(`🎵 Video state changed to PLAYING: ${videoId}`)
              
              // Só pausar outros se este não for o vídeo que já estava tocando
              if (currentPlayingVideo !== videoId) {
                console.log(`🎵 New video started, pausing others...`)
                pauseAllExcept(videoId)
                currentPlayingVideo = videoId
                
                // Chamar callback de play
                if (onPlay) {
                  onPlay(videoId)
                }
              }
            }
            // 2 = YT.PlayerState.PAUSED
            else if (state === 2) {
              console.log(`⏸️ Video state changed to PAUSED: ${videoId}`)
              
              if (currentPlayingVideo === videoId) {
                currentPlayingVideo = null
              }
              
              // Chamar callback de pause
              if (onPause) {
                onPause(videoId)
              }
            }
            // 0 = YT.PlayerState.ENDED
            else if (state === 0) {
              console.log(`🏁 Video ended: ${videoId}`)
              
              if (currentPlayingVideo === videoId) {
                currentPlayingVideo = null
              }
            }
          },
          onReady: (event: any) => {
            console.log(`Player ready: ${containerId}`)
          },
          onError: (event: any) => {
            console.error(`Player error: ${containerId}`, event.data)
          }
        },
      })

      playersRef[containerId] = player
      playerVideoMap[containerId] = videoId // Armazenar mapeamento
      console.log(`Player initialized: ${containerId} -> ${videoId}`)
    } catch (error) {
      console.error('Error initializing YouTube player:', error)
    }
  }

  // Função de limpeza
  const cleanup = () => {
    Object.entries(playersRef).forEach(([playerId, player]) => {
      if (player) {
        try {
          player.destroy()
          delete playersRef[playerId]
          delete playerVideoMap[playerId] // Limpar mapeamento também
        } catch (error) {
          console.error('Error destroying player:', error)
        }
      }
    })
    callbacksRef.current = {}
    currentPlayingVideo = null
  }

  return {
    initializePlayer,
    pauseAllExcept,
    pauseAll,
    isApiReady,
    cleanup
  }
}
