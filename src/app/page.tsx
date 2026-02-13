'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BriefingCard } from '@/components/BriefingCard';
import { CreateBriefingModal } from '@/components/CreateBriefingModal';
import { EmptyState } from '@/components/EmptyState';
import { Toast } from '@/components/Toast';
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

export default function Home() {
  const [briefings, setBriefings] = useState<Briefing[]>([
    {
      id: "1",
      title: "Q3 Engineering Roadmap Review",
      description: "Comprehensive analysis of upcoming feature releases and technical debt priorities",
      tabs: 12,
      summary: "Key focus areas include API v2 migration, mobile optimization, and security enhancements. Team velocity increased 23% following the new sprint structure implementation.",
      createdBy: "Sarah Chen",
      createdAt: "2024-03-15",
      team: "Engineering",
      comments: 8,
      status: "shared",
      value: "$2,400"
    },
    {
      id: "2",
      title: "Customer Feedback Synthesis",
      description: "Aggregated user research from 47 interviews conducted last month",
      tabs: 24,
      summary: "Primary pain points identified in onboarding flow and dashboard customization. Users requested advanced filtering capabilities and export functionality.",
      createdBy: "Marcus Johnson",
      createdAt: "2024-03-14",
      team: "Product",
      comments: 15,
      status: "shared",
      value: "$1,800"
    },
    {
      id: "3",
      title: "Competitor Analysis: Dashboard Tools",
      description: "Feature comparison across 8 major players in the analytics space",
      tabs: 18,
      summary: "Notion and Linear integration patterns show strong user adoption. Our differentiation lies in real-time collaboration features and AI-powered insights.",
      createdBy: "Emily Rodriguez",
      createdAt: "2024-03-12",
      team: "Strategy",
      comments: 6,
      status: "draft",
      value: "$3,200"
    },
    {
      id: "4",
      title: "Security Audit Documentation",
      description: "SOC 2 compliance review and penetration testing results",
      tabs: 9,
      summary: "All critical vulnerabilities addressed. Minor updates needed for access controls and session management policies.",
      createdBy: "David Park",
      createdAt: "2024-03-10",
      team: "Security",
      comments: 3,
      status: "shared",
      value: "$4,500"
    },
    {
      id: "5",
      title: "Design System v3.0 Updates",
      description: "New component library with accessibility improvements and dark mode support",
      tabs: 31,
      summary: "56 new components added. Migration guide prepared for legacy implementations. WCAG 2.1 AA compliance achieved across all interactive elements.",
      createdBy: "Lisa Thompson",
      createdAt: "2024-03-08",
      team: "Design",
      comments: 22,
      status: "shared",
      value: "$1,200"
    },
    {
      id: "6",
      title: "API Integration Patterns",
      description: "Best practices for third-party service connections and webhook handling",
      tabs: 15,
      summary: "Rate limiting strategies and error retry mechanisms documented. GraphQL vs REST decision matrix included for future architecture choices.",
      createdBy: "James Wilson",
      createdAt: "2024-03-05",
      team: "Engineering",
      comments: 11,
      status: "draft",
      value: "$1,600"
    },
    {
      id: "7",
      title: "Marketing Campaign Assets",
      description: "Q2 launch materials and brand guideline compliance check",
      tabs: 42,
      summary: "All assets approved. Social media kit ready for distribution. Video content requires final review before publishing.",
      createdBy: "Anna Kim",
      createdAt: "2024-03-01",
      team: "Marketing",
      comments: 7,
      status: "archived",
      value: "$2,100"
    },
    {
      id: "8",
      title: "Mobile App Beta Feedback",
      description: "User testing results from TestFlight beta program (n=150)",
      tabs: 28,
      summary: "Crash reports reduced by 85%. Push notification preferences need refinement. Battery optimization praised by power users.",
      createdBy: "Michael Brown",
      createdAt: "2024-02-28",
      team: "Mobile",
      comments: 19,
      status: "shared",
      value: "$2,800"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleDelete = (id: string) => {
    setBriefings(prev => prev.filter(b => b.id !== id));
    setToast({ message: 'Briefing deleted successfully', type: 'success' });
  };

  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`https://contextcollab.app/b/${id}`);
    setToast({ message: 'Link copied to clipboard', type: 'success' });
  };

  const handleUpdate = (updatedBriefing: Briefing) => {
    setBriefings(prev => prev.map(b => b.id === updatedBriefing.id ? updatedBriefing : b));
  };

  const handleCreate = async (data: { title: string; description: string; team: string }) => {
    setLoading(true);
    try {
      const systemPrompt = "You are an expert at creating concise context summaries for team briefings.";
      const prompt = `Create a one-sentence summary for a briefing titled "${data.title}" about ${data.description}.`;
      
      let summary = "Context captured and ready for review.";
      try {
        summary = await askAI(prompt, systemPrompt);
      } catch (e) {
        console.error('AI generation failed, using fallback');
      }

      const newBriefing: Briefing = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        tabs: Math.floor(Math.random() * 20) + 5,
        summary,
        createdBy: "You",
        createdAt: new Date().toISOString().split('T')[0],
        team: data.team,
        comments: 0,
        status: 'draft',
        value: `$${(Math.floor(Math.random() * 50) + 10) * 100}`
      };

      setBriefings(prev => [newBriefing, ...prev]);
      setModalOpen(false);
      setToast({ message: 'Briefing created successfully', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to create briefing', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleArchiveAll = () => {
    setBriefings(prev => prev.map(b => b.status === 'shared' ? { ...b, status: 'archived' } : b));
    setToast({ message: 'All shared briefings archived', type: 'info' });
  };

  const handleExportData = () => {
    const data = JSON.stringify(briefings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'briefings.json';
    a.click();
    setToast({ message: 'Data exported successfully', type: 'success' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 fade-in-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Team Briefings
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Capture context, generate insights, and share knowledge with your team asynchronously.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportData}
              className="px-4 py-3 rounded-2xl border-2 border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 transition-all active:scale-95"
            >
              Export
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-400 text-white font-semibold px-6 py-3 rounded-2xl shadow-[0_8px_16px_rgba(99,102,241,.4),inset_0_2px_4px_rgba(255,255,255,.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Briefing
            </button>
          </div>
        </div>

        {briefings.length === 0 ? (
          <EmptyState onCreate={() => setModalOpen(true)} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 fade-in-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
              <p className="text-sm text-gray-600 font-medium">
                Showing {briefings.length} briefing{briefings.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={handleArchiveAll}
                className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors"
              >
                Archive all shared
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {briefings.map((briefing, index) => (
                <BriefingCard
                  key={briefing.id}
                  briefing={briefing}
                  onDelete={handleDelete}
                  onShare={handleShare}
                  onUpdate={handleUpdate}
                  delay={300 + index * 100}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CreateBriefingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        isLoading={loading}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}