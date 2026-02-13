'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { askAI } from '@/lib/ai';

interface Briefing {
  id: string;
  title: string;
  description: string;
  tabs: number;
  summary: string;
  createdBy: string;
  createdAt: string;
  team: string;
  comments: number;
  status: 'draft' | 'shared' | 'archived';
  value: string;
}

interface BriefingCardProps {
  briefing: Briefing;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  onUpdate: (briefing: Briefing) => void;
  delay?: number;
}

export function BriefingCard({ briefing, onDelete, onShare, onUpdate, delay = 0 }: BriefingCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const systemPrompt = "You are an expert at synthesizing browser session context into executive summaries. Be concise and actionable.";
      const prompt = `Create a 2-sentence summary for a briefing titled "${briefing.title}" about ${briefing.description}. It contains ${briefing.tabs} browser tabs of research.`;
      
      const summary = await askAI(prompt, systemPrompt);
      onUpdate({ ...briefing, summary });
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const statusColors = {
    draft: 'bg-amber-100 text-amber-700',
    shared: 'bg-green-100 text-green-700',
    archived: 'bg-gray-100 text-gray-600'
  };

  return (
    <article 
      className="fade-in-up group relative bg-white rounded-[24px] p-6 shadow-[0_12px_24px_rgba(0,0,0,.15),inset_0_-4px_8px_rgba(0,0,0,.1),inset_0_4px_8px_rgba(255,255,255,.4)] hover:shadow-[0_20px_40px_rgba(0,0,0,.2),inset_0_-4px_8px_rgba(0,0,0,.1),inset_0_4px_8px_rgba(255,255,255,.4)] hover:-translate-y-1 transition-all duration-300"
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", statusColors[briefing.status])}>
          {briefing.status.charAt(0).toUpperCase() + briefing.status.slice(1)}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => onShare(briefing.id)}
            className="p-2 rounded-xl hover:bg-indigo-50 text-gray-500 hover:text-indigo-500 transition-all active:scale-95"
            aria-label="Share briefing"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(briefing.id)}
            className="p-2 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all active:scale-95"
            aria-label="Delete briefing"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2 tracking-tight leading-tight">{briefing.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{briefing.description}</p>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4 border border-indigo-100/50">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">AI Summary</span>
        </div>
        {isGenerating ? (
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
          </div>
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed">{briefing.summary}</p>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold shadow-md">
            {briefing.createdBy.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{briefing.createdBy}</p>
            <p className="text-xs text-gray-500">{briefing.team}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Value</p>
          <p className="text-sm font-bold text-indigo-600">{briefing.value}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {briefing.createdAt}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            {briefing.tabs} tabs
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {briefing.comments}
          </span>
        </div>
        
        <button
          onClick={handleGenerateSummary}
          disabled={isGenerating}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating...' : 'Regenerate'}
        </button>
      </div>
    </article>
  );
}