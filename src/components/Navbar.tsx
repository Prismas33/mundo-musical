'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/dino&family/dino_cp.png"
                alt="Mundo Musical"
                width={40}
                height={40}
                style={{ width: 'auto', height: '40px' }}
                className="mr-3"
              />
              <span className="text-2xl font-bold font-poppins text-orange-500">
                Mundo Musical
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Início
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Sobre o Dino
            </Link>
            <Link href="/videos" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Vídeos
            </Link>
            <Link href="/em-breve" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Em Breve
            </Link>
            <Link href="/contacto" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Dino Club
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-500 focus:outline-none focus:text-orange-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Início
              </Link>
              <Link href="/sobre" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Sobre o Dino
              </Link>
              <Link href="/videos" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Vídeos
              </Link>
              <Link href="/em-breve" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Em Breve
              </Link>
              <Link href="/contacto" className="bg-orange-500 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-600">
                Dino Club
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
