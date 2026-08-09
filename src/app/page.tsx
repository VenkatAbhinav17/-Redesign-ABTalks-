import Link from 'next/link';
import {
  Flame,
  ArrowRight,
  Terminal,
  GitBranch,
  Globe,
  CheckCircle,
  FileX,
  TrendingUp,
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Pick Track',
    desc: 'Choose a specialized path — Full-Stack AI Systems, DevOps/Cloud, or Distributed Systems.',
    tags: ['AI', 'Systems', 'DevOps'],
  },
  {
    num: '02',
    title: 'Build Daily',
    desc: 'Receive one production-grade engineering problem every 24 hours. Code, debug, ship.',
  },
  {
    num: '03',
    title: 'Submit Dual Proof',
    desc: 'Submit your GitHub commit AND post a public LinkedIn update to share your progress.',
    icons: true,
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col flex-1 pb-24 bg-[#0B0F17] text-slate-100">
      {/* Header */}
      <header className="px-5 py-4 flex justify-between items-center border-b border-white/[0.06] sticky top-0 z-30 bg-[#0B0F17]/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#0B0F17]" />
          </div>
          <span className="font-bold text-base tracking-tight text-white">ABTalks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
            Cohort 4
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 pt-8 pb-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold uppercase tracking-widest mb-6 animate-pill-glow">
          <Flame className="w-3 h-3 fill-[#10B981]" />
          60-Day Proof of Work Challenge
        </div>

        <h1 className="text-[2rem] font-extrabold leading-[1.15] tracking-tight text-white mb-4">
          Build Daily.
          <br />
          Post Publicly.
          <br />
          <span className="text-[#10B981]">Get Hired.</span>
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed max-w-[320px] mb-8">
          A 60-day public commit graph beats any resume. Built for Indian college students who
          code late at night and want recruiters to see real proof — not buzzwords.
        </p>

        <Link href="/dashboard" className="w-full">
          <button className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-emerald-400 text-[#0B0F17] font-bold text-sm py-3.5 px-6 rounded-xl shadow-[0_0_24px_rgba(16,185,129,0.25)] transition-all active:scale-[0.98] cursor-pointer">
            Enter Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </section>

      {/* Stats Bar */}
      <section className="px-5 py-4 border-y border-white/[0.06]">
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: '1,250+', label: 'Builders' },
            { value: '45,000+', label: 'Commits' },
            { value: '80+', label: 'Hired' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#121820] border border-white/[0.06] rounded-xl p-3 text-center"
            >
              <p className="text-lg font-bold text-white tracking-tight">{stat.value}</p>
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-8 space-y-5">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            How it works
          </h2>
          <p className="text-xs text-slate-500 mt-1">Three steps to your developer profile.</p>
        </div>

        <div className="space-y-3">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-[#121820] border border-white/[0.06] rounded-xl p-4 flex gap-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1a2030] border border-white/[0.06] flex items-center justify-center shrink-0 text-[#10B981] font-bold text-xs">
                {step.num}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-200">
                  {step.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                {'tags' in step && step.tags && (
                  <div className="flex gap-1.5 mt-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#0B0F17] text-slate-500 border border-white/[0.06] text-[8px] font-bold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {'icons' in step && step.icons && (
                  <div className="flex gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[9px] font-semibold text-slate-400">
                      <GitBranch className="w-3 h-3" /> GitHub
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-semibold text-slate-400">
                      <Globe className="w-3 h-3" /> LinkedIn
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value Prop */}
      <section className="px-5 pb-8">
        <div className="bg-[#121820] border border-white/[0.06] rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Why proof beats resumes
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Recruiters want to see what you built yesterday — not what you claim on paper. ABTalks
            turns 60 days of commits into a verified hiring signal.
          </p>
          <div className="border border-white/[0.06] rounded-lg overflow-hidden text-[10px]">
            <div className="grid grid-cols-2 bg-[#0B0F17] border-b border-white/[0.06] py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">
              <div>Resume</div>
              <div className="text-[#10B981] flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> ABTalks
              </div>
            </div>
            {[
              ['Static buzzwords', '60 verified projects'],
              ['Unverifiable claims', 'Active GitHub streaks'],
            ].map(([bad, good], i) => (
              <div
                key={i}
                className={`grid grid-cols-2 py-2.5 px-3 ${i === 0 ? 'border-b border-white/[0.06]' : ''} bg-[#121820] text-slate-400`}
              >
                <div className="flex items-start gap-1 pr-1">
                  <FileX className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" /> {bad}
                </div>
                <div className="flex items-start gap-1 pl-1">
                  <CheckCircle className="w-3 h-3 text-[#10B981] shrink-0 mt-0.5" /> {good}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto w-full bg-[#0B0F17]/95 backdrop-blur-md border-t border-white/[0.06] px-5 py-3.5 z-40">
        <Link href="/dashboard" className="block">
          <button className="w-full bg-[#10B981] hover:bg-emerald-400 text-[#0B0F17] font-bold text-sm py-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer transition-all active:scale-[0.98]">
            Start Challenge →
          </button>
        </Link>
      </div>
    </div>
  );
}
