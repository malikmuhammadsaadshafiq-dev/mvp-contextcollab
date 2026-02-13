'use client';

export function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="fade-in-up flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">No briefings yet</h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        Capture your browser sessions and create AI-powered context briefings to share with your team for seamless async collaboration.
      </p>
      <button
        onClick={onCreate}
        className="bg-indigo-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-[0_8px_16px_rgba(99,102,241,.4),inset_0_2px_4px_rgba(255,255,255,.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add your first briefing
      </button>
    </div>
  );
}