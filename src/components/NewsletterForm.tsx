'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  title?: string
  description?: string
  className?: string
}

export default function NewsletterForm({ 
  title = "Junta-te ao Dino Club! 🦕", 
  description = "Recebe novidades, atividades exclusivas e surpresas especiais do Dino!",
  className = ""
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Validação básica
    if (!email || !name) {
      setError('Por favor, preenche todos os campos.')
      setIsSubmitting(false)
      return
    }

    if (!email.includes('@')) {
      setError('Por favor, insere um email válido.')
      setIsSubmitting(false)
      return
    }

    try {
      // Aqui seria feita a integração com o serviço de email (Mailchimp, Beehiiv, etc.)
      // Por agora, vamos simular um envio bem-sucedido
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      setEmail('')
      setName('')
    } catch (err) {
      setError('Ocorreu um erro. Tenta novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center ${className}`}>
        <span className="text-6xl block mb-4">🎉</span>
        <h3 className="text-2xl font-bold font-poppins text-green-800 mb-2">
          Bem-vindo ao Dino Club!
        </h3>
        <p className="text-green-700 font-nunito">
          Obrigado por te juntares à nossa família! Vais receber um email de confirmação em breve.
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
      <div className="text-center mb-6">
        <span className="text-4xl block mb-3">📧</span>
        <h3 className="text-2xl font-bold font-poppins text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 font-nunito">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da criança
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="Como te chamas?"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email dos pais
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="exemplo@email.com"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-105'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              A inscrever...
            </span>
          ) : (
            '🚀 Juntar ao Dino Club'
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Prometemos não enviar spam e podes cancelar a qualquer altura. 
        Os teus dados estão seguros connosco! 🔒
      </p>
    </div>
  )
}
