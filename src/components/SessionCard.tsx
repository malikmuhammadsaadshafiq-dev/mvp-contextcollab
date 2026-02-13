'use client'

import { Sparkles, Share2, Trash2, MessageSquare, ExternalLink, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SessionCardProps {
  id: string
  title: string
  author: string
  date: string
  tabCount: number
  tags: string[]
  summary: string
  shared: boolean
  comments: number
  featured?: boolean
  onDelete: (id: string) => void
  onGenerate: (id: string) => void
  onShare: (id: string) => void
  onComment: (id: string) => void
  loading?: boolean
}

export function SessionCard({
  id,
  title,
  author,
  date,
  tabCount,
  tags,
  summary,
  shared,
  comments,
  featured = false,
  onDelete,
  onGenerate,
  onShare,
  onComment,
  loading = false
}: SessionCardProps) {
  return (
    <article className={cn(
      "group bg-white/60 backdrop-blur-lg rounded-3xl border border-violet-200/50 shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col",
      featured && "lg:col-span-2"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center border border-violet-200/50">
            <FileText className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="font-bold text-violet-950 text-lg leading-tight group-hover:text-violet-700 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-violet-600/70 mt-1">
              {author} • {date}
            </p>
          </div>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="p-2 text-violet-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
          aria-label="Delete briefing"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 rounded-full bg-violet-100/50 text-violet-700 text-xs font-medium border border-violet-200/50"
          >
            {tag}
          </span>
        ))}
        <span className="px-3 py-1 rounded-full bg-fuchsia-100/50 text-fuchsia-700 text-xs font-medium border border-fuchsia-200/50 flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          {tabCount} tabs
        </span>
      </div>

      <p className="text-violet-800/80 text-sm leading-relaxed mb-6 flex-grow">
        {summary}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-violet-200/30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onGenerate(id)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-violet-700 hover:bg-violet-100 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Generating...' : 'AI Summary'}
          </button>
          <button
            onClick={() => onComment(id)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-violet-700 hover:bg-violet-100 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            {comments}
          </button>
        </div>
        
        <button
          onClick={() => onShare(id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
            shared 
              ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20" 
              : "bg-violet-100 text-violet-700 hover:bg-violet-200"
          )}
        >
          <Share2 className="w-4 h-4" />
          {shared ? 'Shared' : 'Share'}
        </button>
      </div>
    </article>
  )
}