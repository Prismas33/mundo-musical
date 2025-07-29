'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import NewsletterForm from '@/components/NewsletterForm'
import type { Metadata } from 'next'

// Como estamos usando 'use client', o metadata será aplicado pelo layout pai

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Validação básica
    if (!formData.name || !formData.email || !formData.message) {
      setError('Por favor, preenche todos os campos obrigatórios.')
      setIsSubmitting(false)
      return
    }

    try {
      // Aqui seria feita a integração com o serviço de email
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError('Ocorreu um erro. Tenta novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-orange-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-6xl block mb-6">📞</span>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-4">
              Fala Connosco!
            </h1>
            <p className="text-xl text-gray-600 font-nunito max-w-3xl mx-auto">
              Tens alguma pergunta, sugestão ou só queres dizer olá? 
              O Dino e a equipa adoram ouvir-vos!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário de Contacto */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold font-poppins text-gray-800 mb-6 text-center">
                💌 Envia-nos uma Mensagem
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <span className="text-6xl block mb-4">🎉</span>
                  <h3 className="text-2xl font-bold font-poppins text-green-800 mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-green-700 font-nunito">
                    Obrigado pela tua mensagem! Vamos responder o mais rápido possível.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="O teu nome"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="exemplo@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Escolhe um assunto</option>
                      <option value="duvida">Dúvida Geral</option>
                      <option value="sugestao">Sugestão</option>
                      <option value="problema">Problema Técnico</option>
                      <option value="parcerias">Parcerias</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                      placeholder="Escreve aqui a tua mensagem..."
                      required
                    ></textarea>
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
                        A enviar...
                      </span>
                    ) : (
                      '📨 Enviar Mensagem'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Newsletter e Informações */}
            <div className="space-y-8">
              {/* Newsletter Form */}
              <NewsletterForm />

              {/* Informações de Contacto */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold font-poppins text-gray-800 mb-6 text-center">
                  📍 Outras Formas de Contacto
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <span className="text-2xl">📧</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600 font-nunito text-sm">ola@dinomusicworld.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                    <span className="text-2xl">🕒</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Horário de Resposta</h4>
                      <p className="text-gray-600 font-nunito text-sm">Segundas a Sextas, 9h-18h</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Tempo de Resposta</h4>
                      <p className="text-gray-600 font-nunito text-sm">Até 24 horas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold font-poppins text-gray-800 mb-6 text-center">
                  🌐 Segue-nos nas Redes Sociais
                </h3>
                
                <div className="flex justify-center space-x-4">
                  <a href="#" className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                </div>
                
                <p className="text-center text-gray-600 font-nunito text-sm mt-4">
                  Partilha as tuas aventuras com o Dino! 📸
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
