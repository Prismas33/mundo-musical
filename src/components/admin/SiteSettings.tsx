'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface SiteSettings {
  siteName: string
  siteDescription: string
  siteKeywords: string
  maintenanceMode: boolean
  contactEmail: string
  socialLinks: {
    youtube: string
    instagram: string
    facebook: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    ogImage: string
  }
}

export default function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Mundo Musical do Dino',
    siteDescription: 'Aventuras musicais educativas com o Dino e sua família',
    siteKeywords: 'música, educação, crianças, dino, entretenimento infantil',
    maintenanceMode: false,
    contactEmail: 'contato@mundomusical.com',
    socialLinks: {
      youtube: '',
      instagram: '',
      facebook: ''
    },
    seo: {
      metaTitle: 'Mundo Musical do Dino - Aventuras Musicais Educativas',
      metaDescription: 'Descubra o maravilhoso mundo musical do Dino e sua família. Vídeos educativos e divertidos para crianças aprenderem música de forma lúdica.',
      ogImage: '/images/dino&family/dino-hero.png'
    }
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'social' | 'maintenance'>('general')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const settingsDoc = await getDoc(doc(db, 'settings', 'site'))
      
      if (settingsDoc.exists()) {
        const data = settingsDoc.data() as SiteSettings
        setSettings({ ...settings, ...data })
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
      setErrorMessage('Erro ao carregar configurações')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setErrorMessage('')
      
      await setDoc(doc(db, 'settings', 'site'), settings, { merge: true })
      
      setSuccessMessage('Configurações salvas com sucesso!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      setErrorMessage('Erro ao salvar configurações')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parent: keyof SiteSettings, field: string, value: string) => {
    setSettings(prev => {
      const parentObj = prev[parent] as any
      return {
        ...prev,
        [parent]: {
          ...parentObj,
          [field]: value
        }
      }
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-gray-900">
            Configurações do Site
          </h1>
          <p className="text-gray-600 font-nunito">
            A carregar configurações...
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
            Configurações do Site
          </h1>
          <p className="text-gray-600 font-nunito">
            Configurações gerais, SEO e manutenção do site
          </p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              A guardar...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Guardar Configurações
            </>
          )}
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

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'general', label: 'Geral', icon: '⚙️' },
            { id: 'seo', label: 'SEO', icon: '🔍' },
            { id: 'social', label: 'Redes Sociais', icon: '📱' },
            { id: 'maintenance', label: 'Manutenção', icon: '🔧' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Configurações Gerais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Site
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de Contacto
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Site
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palavras-chave (separadas por vírgula)
              </label>
              <input
                type="text"
                value={settings.siteKeywords}
                onChange={(e) => handleInputChange('siteKeywords', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="música, educação, crianças, dino"
              />
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Configurações SEO</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título Meta (aparecer no Google)
              </label>
              <input
                type="text"
                value={settings.seo.metaTitle}
                onChange={(e) => handleNestedInputChange('seo', 'metaTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                maxLength={60}
              />
              <p className="text-xs text-gray-500 mt-1">
                {settings.seo.metaTitle.length}/60 caracteres (ideal: 50-60)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição Meta
              </label>
              <textarea
                value={settings.seo.metaDescription}
                onChange={(e) => handleNestedInputChange('seo', 'metaDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {settings.seo.metaDescription.length}/160 caracteres (ideal: 120-160)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagem Open Graph (URL)
              </label>
              <input
                type="text"
                value={settings.seo.ogImage}
                onChange={(e) => handleNestedInputChange('seo', 'ogImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="/images/og-image.jpg"
              />
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Redes Sociais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔴 Canal YouTube
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.youtube}
                  onChange={(e) => handleNestedInputChange('socialLinks', 'youtube', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://youtube.com/@seuscanal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📷 Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.instagram}
                  onChange={(e) => handleNestedInputChange('socialLinks', 'instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://instagram.com/seuperfil"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📘 Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.facebook}
                  onChange={(e) => handleNestedInputChange('socialLinks', 'facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://facebook.com/suapagina"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Modo Manutenção</h3>
            
            <div className="flex items-center space-x-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Ativar Modo Manutenção
                </span>
              </label>
            </div>

            {settings.maintenanceMode && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-yellow-700 font-medium">Atenção!</p>
                    <p className="text-yellow-600 text-sm">
                      Com o modo manutenção ativo, apenas administradores podem aceder ao site. 
                      Os visitantes verão uma página de manutenção.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-blue-700 font-medium">Informação sobre Manutenção:</p>
                  <p className="text-blue-600 text-sm mt-1">
                    Use este modo quando estiver a fazer atualizações importantes no site. 
                    Não esqueça de desativar após completar a manutenção!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
