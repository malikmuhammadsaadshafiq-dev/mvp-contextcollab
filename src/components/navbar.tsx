'use client'

import { useState } from 'react'

interface NavbarProps {
  onCaptureClick: () => void
}

export function Navbar({ onCaptureClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 w-full bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">ContextCollab</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Dashboard</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Workspace</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Integrations</a>
            <button 
              onClick={onCaptureClick}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white text-sm font-medium shadow-lg shadow-violet-500/25 transition-all active:scale-95"
            >
              Capture Session
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Dashboard</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Workspace</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Integrations</a>
              <button 
                onClick={() => {
                  onCaptureClick()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium"
              >
                Capture Session
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}