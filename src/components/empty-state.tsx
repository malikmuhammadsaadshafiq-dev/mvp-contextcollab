'use client'

interface EmptyStateProps {
  onAction: () => void
}

export function EmptyState({ onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center fade-in-up">
      <div className="w-24 h-24 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No briefings yet</h3>
      <p className="text-white/60 max-w-md mb-8">
        Capture your first browser session to create a shareable briefing for your team. 
        Perfect for async handoffs and context sharing.
      </p>
      <button
        onClick={onAction}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-semibold shadow-lg shadow-violet-500/25 transition-all active:scale-95 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Capture Your First Session
      </button>
    </div>
  )
}