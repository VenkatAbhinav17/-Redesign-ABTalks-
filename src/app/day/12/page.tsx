'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStudent } from '@/hooks/useStudent';
import { MOCK_DAY_12_TASK } from '@/data/mockData';
import {
  ArrowLeft,
  GitBranch,
  Globe,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle,
  Sparkles,
  Clipboard,
  CheckCircle,
  FileCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Day12() {
  const { student, isLoaded, submitProof } = useStudent();
  const [gitUrl, setGitUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [errors, setErrors] = useState<{ git?: string; linkedin?: string }>({});
  const [copied, setCopied] = useState(false);
  const [objectivesOpen, setObjectivesOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const isCompleted = student?.completedDays.includes(12);
  const showCelebration = isCompleted || submitted;

  const validateUrls = () => {
    const newErrors: { git?: string; linkedin?: string } = {};
    const githubRegex = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+/;
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/[a-zA-Z0-9._\-/]+/;

    if (!githubRegex.test(gitUrl)) {
      newErrors.git =
        'Enter a valid GitHub URL (e.g. https://github.com/username/repo)';
    }
    if (!linkedinRegex.test(linkedinUrl)) {
      newErrors.linkedin =
        'Enter a valid LinkedIn URL (e.g. https://linkedin.com/posts/...)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyDraft = () => {
    const githubLink = gitUrl || 'https://github.com/gottam-abhinav/rate-limiter';
    const text = `Day 12/60 of the #ABTalks 60-Day Proof-of-Work Challenge completed! 🚀

Today I built a Rate-Limited API Middleware using Upstash Redis and Next.js Edge Middleware.

Check out my code: ${githubLink}

@ABTalks #BuildInPublic #NextJS #Redis #SoftwareEngineering`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUrls()) return;

    submitProof(12);
    setSubmitted(true);

    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10B981', '#34d399', '#6ee7b7'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10B981', '#34d399', '#6ee7b7'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  if (!isLoaded || !student) {
    return (
      <div className="flex flex-col flex-1 bg-[#0B0F17] p-5 space-y-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-[#121820] rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 pb-10 bg-[#0B0F17] text-slate-100">
      <header className="px-5 py-4 flex items-center border-b border-white/[0.06] sticky top-0 z-30 bg-[#0B0F17]/90 backdrop-blur-md gap-3">
        <Link
          href="/dashboard"
          className="text-slate-400 hover:text-white transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-bold text-xs uppercase tracking-widest text-slate-500">
          Day 12 Challenge
        </span>
      </header>

      <div className="px-5 py-5 space-y-5">
        {/* Task Header */}
        <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-4 space-y-2">
          <span className="px-2 py-0.5 rounded-md bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[8px] font-bold uppercase tracking-widest">
            {MOCK_DAY_12_TASK.track}
          </span>
          <h1 className="text-base font-bold text-white leading-snug">
            {MOCK_DAY_12_TASK.title}
          </h1>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {MOCK_DAY_12_TASK.description}
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-[#121820] border border-white/[0.06] rounded-xl overflow-hidden">
          <button
            onClick={() => setObjectivesOpen(!objectivesOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase text-slate-300 cursor-pointer"
          >
            <span>Learning Objectives</span>
            {objectivesOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
          {objectivesOpen && (
            <ul className="px-4 pb-4 space-y-2.5 border-t border-white/[0.06] pt-3">
              {MOCK_DAY_12_TASK.learningObjectives.map((obj, i) => (
                <li
                  key={i}
                  className="flex gap-2 items-start text-[11px] text-slate-400 leading-relaxed"
                >
                  <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Resources */}
        <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-4 space-y-3">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Starter Resources
          </h3>
          <div className="space-y-2">
            {MOCK_DAY_12_TASK.resources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] bg-[#0B0F17] hover:border-[#10B981]/30 text-[11px] font-medium text-slate-400 hover:text-white transition-all"
              >
                <span>{res.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>

        {showCelebration ? (
          <div className="bg-[#121820] border border-[#10B981]/30 rounded-xl p-6 text-center space-y-4 shadow-[0_0_24px_rgba(16,185,129,0.1)]">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-[#10B981]" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#10B981]">Verified ✓</h2>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                Proof logged. Day 12 complete — streak updated.
              </p>
            </div>
            <Link href="/dashboard" className="block">
              <button className="w-full bg-[#10B981] hover:bg-emerald-400 text-[#0B0F17] font-bold text-xs py-3 rounded-lg cursor-pointer transition-all active:scale-[0.98]">
                Return to Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#10B981]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Submit Dual Proof
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <GitBranch className="w-3 h-3" /> GitHub Repo/Commit URL
                </label>
                <input
                  type="text"
                  value={gitUrl}
                  onChange={(e) => {
                    setGitUrl(e.target.value);
                    if (errors.git) setErrors((prev) => ({ ...prev, git: undefined }));
                  }}
                  placeholder="https://github.com/username/repo"
                  className={`w-full bg-[#0B0F17] border text-xs px-3.5 py-2.5 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#10B981]/50 transition-all ${
                    errors.git ? 'border-rose-500/60' : 'border-white/[0.06]'
                  }`}
                />
                {errors.git && (
                  <p className="text-[10px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.git}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Globe className="w-3 h-3" /> LinkedIn Post URL
                </label>
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => {
                    setLinkedinUrl(e.target.value);
                    if (errors.linkedin) setErrors((prev) => ({ ...prev, linkedin: undefined }));
                  }}
                  placeholder="https://linkedin.com/posts/..."
                  className={`w-full bg-[#0B0F17] border text-xs px-3.5 py-2.5 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#10B981]/50 transition-all ${
                    errors.linkedin ? 'border-rose-500/60' : 'border-white/[0.06]'
                  }`}
                />
                {errors.linkedin && (
                  <p className="text-[10px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.linkedin}
                  </p>
                )}
              </div>
            </div>

            {/* Copy Draft */}
            <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    LinkedIn Draft
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-white transition-colors border border-white/[0.06] bg-[#0B0F17] px-2.5 py-1 rounded-lg cursor-pointer"
                >
                  <Clipboard className="w-3 h-3" />
                  {copied ? 'Copied!' : 'Copy Draft'}
                </button>
              </div>
              <div className="bg-[#0B0F17] border border-white/[0.06] rounded-lg p-3 text-[10px] text-slate-500 leading-relaxed max-h-24 overflow-y-auto">
                Day 12/60 #ABTalks — Built a Rate-Limited API Middleware with Upstash Redis &amp;
                Next.js! 🚀 {gitUrl || 'https://github.com/...'} #BuildInPublic #NextJS
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#10B981] hover:bg-emerald-400 text-[#0B0F17] font-bold text-sm py-3.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Verify &amp; Submit Proof
            </button>
          </form>
        )}

        {/* Acceptance Criteria */}
        <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-4 space-y-3">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Acceptance Criteria
          </h3>
          <ul className="space-y-2">
            {MOCK_DAY_12_TASK.acceptanceCriteria.map((crit, i) => (
              <li
                key={i}
                className="flex gap-2 items-start text-[11px] text-slate-400 leading-relaxed"
              >
                <span className="w-1 h-1 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                <span>{crit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
