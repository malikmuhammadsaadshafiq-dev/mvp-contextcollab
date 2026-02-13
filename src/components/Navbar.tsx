'use client';

import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-indigo-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-400 rounded-xl shadow-[0_4px_12px_rgba(99,102,241,.4)] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">ContextCollab</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-500 transition-colors">Dashboard</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-500 transition-colors">Workspaces</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-500 transition-colors">Integrations</a>
            <button className="bg-indigo-400 text-white text-sm font-semibold px-4 py-2 rounded-2xl shadow-[0_8px_16px_rgba(99,102,241,.4),inset_0_2px_4px_rgba(255,255,255,.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all">
              New Briefing
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-b border-indigo-100/50 fade-in-up">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Workspaces</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Integrations</a>
          </div>
        </div>
      )}
    </nav>
  );
}