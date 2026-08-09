'use client';

import Link from 'next/link';
import { useStudent } from '@/hooks/useStudent';
import {
  Award,
  Flame,
  Calendar,
  BookOpen,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Zap,
  GitBranch,
} from 'lucide-react';

function Skeleton() {
  return (
    <div className="flex flex-col flex-1 bg-[#0B0F17] p-5 space-y-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-[#121820] rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { student, isLoaded, useStreakFreeze } = useStudent();

  if (!isLoaded || !student) return <Skeleton />;

  let currentActiveDay = 12;
  if (student.stateMode === 'zero') {
    currentActiveDay = 1;
  } else if (student.stateMode === 'missed') {
    currentActiveDay = 11;
  } else {
    currentActiveDay = student.completedDays.includes(12) ? 13 : 12;
  }

  const completedCount = student.completedDays.length;
  const progressDay = student.stateMode === 'zero' ? 1 : currentActiveDay;
  const progressPercent = Math.round((progressDay / 60) * 100);

  return (
    <div className="flex flex-col flex-1 pb-10 bg-[#0B0F17] text-slate-100">
      {/* Header */}
      <header className="px-5 py-4 flex items-center border-b border-white/[0.06] sticky top-0 z-30 bg-[#0B0F17]/90 backdrop-blur-md justify-between">
        <Link
          href="/"
          className="text-slate-400 hover:text-white transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-bold text-xs uppercase tracking-widest text-slate-500">Dashboard</span>
        <div className="w-7" />
      </header>

      <div className="px-5 py-5 space-y-5">
        {/* Profile */}
        <div className="flex items-center gap-3.5 bg-[#121820] border border-white/[0.06] rounded-xl p-4">
          <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center text-[#0B0F17] font-bold text-lg shrink-0">
            {student.name.charAt(0)}
          </div>
          <div className="overflow-hidden flex-1">
            <h2 className="text-sm font-bold text-white truncate">{student.name}</h2>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">{student.college}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-1.5 py-0.5 rounded bg-[#0B0F17] border border-white/[0.06] text-slate-500 text-[8px] font-bold uppercase">
                {student.track}
              </span>
              <span className="text-[9px] font-bold text-[#10B981] flex items-center gap-0.5">
                <Award className="w-3 h-3" /> Rank #{student.rank}
              </span>
            </div>
          </div>
        </div>

        {/* Edge-Case Alerts */}
        {student.stateMode === 'zero' && (
          <div className="bg-[#10B981]/10 border border-[#10B981]/25 rounded-xl p-4">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#10B981]">Welcome to Cohort 4!</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Start your streak today. Complete Day 1 and make your first public commit.
                </p>
              </div>
            </div>
          </div>
        )}

        {student.stateMode === 'missed' && (
          <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-amber-400">Streak Recovery Needed</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  You missed yesterday&apos;s deadline. Your streak is frozen — use a freeze token
                  to recover.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-[#0B0F17] rounded-lg p-2.5 px-3 border border-white/[0.06]">
              <span className="text-[10px] font-semibold text-slate-400">
                ❄️ {student.streakFreezeTokens} freeze{student.streakFreezeTokens !== 1 ? 's' : ''}{' '}
                left
              </span>
              <button
                onClick={useStreakFreeze}
                className="bg-amber-500 hover:bg-amber-400 text-[#0B0F17] font-bold text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-lg cursor-pointer transition-all active:scale-95"
              >
                Use Freeze
              </button>
            </div>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-3.5 relative overflow-hidden">
            <div className="absolute -top-1 -right-1 opacity-[0.07]">
              <Flame className="w-16 h-16 text-[#10B981] fill-[#10B981]" />
            </div>
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
              Current Streak
            </p>
            <p className="text-2xl font-extrabold text-white mt-2 animate-flame-glow">
              🔥 {student.streakCount}
              <span className="text-xs font-semibold text-slate-400 ml-1">Days</span>
            </p>
          </div>

          <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-3.5 relative overflow-hidden">
            <div className="absolute -top-1 -right-1 opacity-[0.07]">
              <Calendar className="w-16 h-16 text-slate-400" />
            </div>
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
              Overall Progress
            </p>
            <p className="text-lg font-extrabold text-white mt-2 leading-tight">
              {progressPercent}%
              <span className="text-[10px] font-medium text-slate-400 block mt-0.5">
                {progressDay} of 60 days
              </span>
            </p>
            <div className="w-full bg-[#0B0F17] rounded-full h-1 mt-2 overflow-hidden">
              <div
                className="bg-[#10B981] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Hero Action Card — Day 12 */}
        <div className="bg-[#121820] border-2 border-[#10B981]/40 rounded-xl p-4 space-y-3 shadow-[0_0_24px_rgba(16,185,129,0.12)] animate-glow-border relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="px-2 py-0.5 rounded-md bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[8px] font-bold uppercase tracking-widest">
              Full-Stack AI Systems
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-[#10B981]" /> ~45 Min
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-[#10B981] tracking-wider">
              Day {currentActiveDay === 13 ? 12 : currentActiveDay}
            </p>
            <h3 className="text-sm font-bold text-white mt-1 leading-snug">
              Build a Rate-Limited API Middleware
            </h3>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              Edge-compatible Next.js Middleware with Upstash Redis rate-limiting.
            </p>
          </div>
          <Link href="/day/12" className="block">
            <button className="w-full flex items-center justify-center gap-1 bg-[#10B981] hover:bg-emerald-400 text-[#0B0F17] font-bold text-xs py-3 rounded-lg cursor-pointer transition-all active:scale-[0.98]">
              {student.completedDays.includes(12) ? 'Review Submission' : 'Start Challenge'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* 60-Day Grid */}
        <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              60-Day Progress
            </h3>
            <div className="flex gap-1.5 text-[8px] text-slate-500 font-bold uppercase items-center">
              <span className="w-2 h-2 rounded bg-[#1a2030] border border-white/[0.06]" />
              <span className="w-2 h-2 rounded bg-[#10B981]" />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-1.5">
            {Array.from({ length: 60 }, (_, i) => {
              const dayNum = i + 1;
              const isCompleted = student.completedDays.includes(dayNum);
              const isActive = dayNum === currentActiveDay;

              return (
                <div
                  key={dayNum}
                  title={`Day ${dayNum}`}
                  className={`aspect-square rounded-[3px] transition-all relative flex items-center justify-center ${
                    isCompleted
                      ? 'bg-[#10B981]'
                      : isActive
                        ? 'bg-[#0B0F17] border-2 border-[#10B981] animate-glow-border'
                        : 'bg-[#1a2030] border border-white/[0.04]'
                  }`}
                >
                  {isActive && !isCompleted && (
                    <span className="w-1 h-1 rounded-full bg-[#10B981] animate-ping" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Carousel */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pl-0.5">
            Earned Badges
          </h3>
          <div className="overflow-x-auto flex gap-2.5 pb-1 scrollbar-none snap-x">
            {[
              {
                name: '10-Day Titan',
                icon: Flame,
                unlocked: student.streakCount >= 10,
                hint: student.streakCount >= 10 ? 'Unlocked' : 'Streak < 10',
              },
              {
                name: 'GitHub Ninja',
                icon: GitBranch,
                unlocked: completedCount > 0,
                hint: completedCount > 0 ? 'Unlocked' : 'No commits yet',
              },
              {
                name: 'Public Builder',
                icon: Zap,
                unlocked: completedCount > 0,
                hint: completedCount > 0 ? 'Unlocked' : 'No posts yet',
              },
            ].map((badge) => (
              <div
                key={badge.name}
                className={`snap-center flex items-center gap-2.5 p-3 rounded-xl border min-w-[160px] shrink-0 ${
                  badge.unlocked
                    ? 'bg-[#10B981]/10 border-[#10B981]/25'
                    : 'bg-[#121820] border-white/[0.06] opacity-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    badge.unlocked ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#1a2030] text-slate-500'
                  }`}
                >
                  <badge.icon className={`w-4 h-4 ${badge.unlocked ? 'fill-[#10B981]' : ''}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-200">
                    {badge.name}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">{badge.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
