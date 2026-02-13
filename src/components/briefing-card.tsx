'use client'

import { useState } from 'react'

interface Briefing {
  id: string
  title: string
  author: string
  date: string
  tabCount: number
  status: 'draft' | 'shared' | 'archived'
  summary?: string
}

interface BriefingCardProps {
  briefing: Briefing
  onDelete: (id: string) => void
  onShare: (id: string) => void
  onGenerateSummary: (id: string) => void
  onArchive: (id: string) => void
  isGenerating: boolean
}

export function BriefingCard({ briefing, onDelete, onShare, onGenerateSummary, onArchive, isGenerating }: BriefingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(briefing.id)
    }, 300)
  }

  const statusColors = {
    draft: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    shared: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    archived: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  }

  return (
    <div 
      className={`group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 ${isDeleting ? 'opacity-0 -translate-x-full' : 'opacity-100'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">{briefing.title}</h3>
          <p className="text-white/60 text-sm">by {briefing.author}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[briefing.status]}`}>
          {briefing.status.charAt(0).toUpperCase() + briefing.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center gap-4 text-white/50 text-sm mb-4">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{briefing.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{briefing.tabCount} tabs</span>
        </div>
      </div>

      {briefing.summary && (
        <div className="mb-4 p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
          <p className="text-white/80 text-sm line-clamp-3">{briefing.summary}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onShare(briefing.id)}
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
        
        <button
          onClick={() => onGenerateSummary(briefing.id)}
          disabled={isGenerating}
          className="flex-1 px-3 py-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 text-violet-200 text-sm font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <div className="w-4 h-4 border-2 border-violet-300 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          {briefing.summary ? 'Regenerate' : 'Summarize'}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
        >
          <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 flex gap-2 fade-in-up">
          <button
            onClick={() => onArchive(briefing.id)}
            className="flex-1 px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium transition-all active:scale-95"
          >
            Archive
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-medium transition-all active:scale-95"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}