'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CreateBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; team: string }) => void;
  isLoading: boolean;
}

export function CreateBriefingModal({ isOpen, onClose, onSubmit, isLoading }: CreateBriefingModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!team) newErrors.team = 'Team is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, description, team });
      setTitle('');
      setDescription('');
      setTeam('');
      setErrors({});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm fade-in-up">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
          <h2 className="text-xl font-bold text-gray-800">Create New Briefing</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Briefing Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Q3 Product Roadmap Analysis"
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 bg-gray-50 focus:bg-white transition-all outline-none",
                errors.title 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-gray-200 focus:border-indigo-400 hover:border-indigo-300"
              )}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Comprehensive review of competitor features and market positioning"
              rows={3}
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 bg-gray-50 focus:bg-white transition-all outline-none resize-none",
                errors.description 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-gray-200 focus:border-indigo-400 hover:border-indigo-300"
              )}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="team" className="block text-sm font-semibold text-gray-700 mb-2">
              Team
            </label>
            <select
              id="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 bg-gray-50 focus:bg-white transition-all outline-none appearance-none",
                errors.team 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-gray-200 focus:border-indigo-400 hover:border-indigo-300"
              )}
            >
              <option value="">Select a team...</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Strategy">Strategy</option>
            </select>
            {errors.team && (
              <p className="mt-1 text-sm text-red-500">{errors.team}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-indigo-400 text-white font-semibold px-4 py-3 rounded-2xl shadow-[0_8px_16px_rgba(99,102,241,.4),inset_0_2px_4px_rgba(255,255,255,.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Briefing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}