// Tipos TypeScript para YouTube IFrame Player API
declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, config: YTPlayerConfig) => YTPlayer
      PlayerState: {
        UNSTARTED: -1
        ENDED: 0
        PLAYING: 1
        PAUSED: 2
        BUFFERING: 3
        CUED: 5
      }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YTPlayerConfig {
  height?: string | number
  width?: string | number
  videoId: string
  playerVars?: {
    enablejsapi?: number
    origin?: string
    rel?: number
    modestbranding?: number
    playsinline?: number
    autoplay?: number
    start?: number
    end?: number
  }
  events?: {
    onReady?: (event: { target: YTPlayer }) => void
    onStateChange?: (event: { target: YTPlayer; data: number }) => void
    onPlaybackQualityChange?: (event: { target: YTPlayer; data: string }) => void
    onPlaybackRateChange?: (event: { target: YTPlayer; data: number }) => void
    onError?: (event: { target: YTPlayer; data: number }) => void
    onApiChange?: (event: { target: YTPlayer }) => void
  }
}

interface YTPlayer {
  // Controles básicos
  playVideo(): void
  pauseVideo(): void
  stopVideo(): void
  seekTo(seconds: number, allowSeekAhead?: boolean): void
  
  // Estado do player
  getPlayerState(): number
  getCurrentTime(): number
  getDuration(): number
  getVideoLoadedFraction(): number
  
  // Volume
  mute(): void
  unMute(): void
  isMuted(): boolean
  setVolume(volume: number): void
  getVolume(): number
  
  // Qualidade
  getPlaybackQuality(): string
  setPlaybackQuality(suggestedQuality: string): void
  getAvailableQualityLevels(): string[]
  
  // Velocidade
  getPlaybackRate(): number
  setPlaybackRate(suggestedRate: number): void
  getAvailablePlaybackRates(): number[]
  
  // Informações do vídeo
  getVideoUrl(): string
  getVideoEmbedCode(): string
  
  // Gerenciamento
  destroy(): void
  addEventListener(event: string, listener: (event: any) => void): void
  removeEventListener(event: string, listener: (event: any) => void): void
}

export type { YTPlayer, YTPlayerConfig }
