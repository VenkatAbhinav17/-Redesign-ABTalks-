'use client';

import { useState } from 'react';
import { useStudent } from '@/hooks/useStudent';
import { FlaskConical, X, AlertCircle, CheckCircle2, User } from 'lucide-react';

export default function EdgeCaseDrawer() {
  const { student, isLoaded, setEdgeCaseMode } = useStudent();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoaded || !student) return null;

  const scenarios = [
    {
      mode: 'normal' as const,
      label: 'Normal State (Day 11)',
      hint: '🔥 11 streak, Day 12 unlocked',
      icon: CheckCircle2,
    },
    {
      mode: 'zero' as const,
      label: 'First Day (0 Streak)',
      hint: '🔥 0 streak, 0 completed',
      icon: User,
    },
    {
      mode: 'missed' as const,
      label: 'Missed Day State',
      hint: '⚠️ Streak frozen',
      icon: AlertCircle,
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#121820] hover:bg-[#1a2030] border border-white/[0.08] text-[#10B981] font-semibold px-3 py-2 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
          aria-label="Test Edge Cases"
        >
          <FlaskConical className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Test Edge Cases</span>
        </button>
      ) : (
        <div className="w-[280px] bg-[#121820] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <span className="text-xs font-bold text-slate-200">Test Edge Cases</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2">
            {scenarios.map(({ mode, label, hint, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setEdgeCaseMode(mode)}
                className={`w-full flex items-center gap-2.5 text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  student.stateMode === mode
                    ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]'
                    : 'bg-[#0B0F17] border-white/[0.06] text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <div>
                  <p className="font-bold text-[11px]">{label}</p>
                  <p className="text-[9px] opacity-70 mt-0.5">{hint}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
