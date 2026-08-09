# ABTalks Redesign — Authenticity Log & Route Map

## Project Overview

**Problem Statement 1:** ABTalks Redesign — elite mobile-first dark-mode UI for a 60-day proof-of-work coding challenge targeting Indian college students.

**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v4, Lucide React, canvas-confetti, localStorage state.

**Design System:** `#0B0F17` base background, `#10B981` emerald accents, `#121820` card surfaces, subtle `white/6%` borders, Inter typography.

---

## Route Map

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Landing — glowing pill badge, stats bar, 3 step cards, sticky CTA |
| `/dashboard` | `src/app/dashboard/page.tsx` | Dashboard — profile, metrics, Day 12 hero, heatmap, badges |
| `/day/12` | `src/app/day/12/page.tsx` | Challenge — objectives, resources, dual proof form, confetti |

### Supporting Files

| Path | Purpose |
|------|---------|
| `src/data/mockData.ts` | `StudentProfile`, `Task` interfaces + mock data |
| `src/hooks/useStudent.ts` | localStorage hook (`abtalks_student_state`) |
| `src/components/EdgeCaseDrawer.tsx` | Evaluator edge-case toggle |
| `src/app/layout.tsx` | 390px mobile container, Inter font |
| `src/app/globals.css` | Design tokens, glow animations |

---

## Prompt Iterations

### Iteration 1 — Foundation
- Scaffolded Next.js App Router project with TypeScript and Tailwind.
- Created mock data layer with three student edge-case profiles and Day 12 task.

### Iteration 2 — State & Routes
- Built `useStudent` hook with `submitProof()` and `setEdgeCaseMode()`.
- Implemented all three routes with localStorage persistence.

### Iteration 3 — TypeScript Fixes
- Removed invalid `Github`/`Linkedin` lucide imports → `GitBranch`, `Globe`, `Share2`.
- Fixed JSX-in-`.ts` error using `React.createElement` in `useStudent.ts`.

### Iteration 4 — Elite UI Polish
- Applied `#0B0F17` dark background and `#10B981` emerald accent system.
- Simplified cards: clean borders, high contrast, zero clutter.
- Added glowing pill badge, flame streak glow, emerald hero card border.
- Dashboard progress: "20% / 12 of 60 days" format.
- Renamed "Copy Draft" button on Day 12 form.

---

## AI Workflow Tools

| Tool | Usage |
|------|-------|
| **Cursor Agent** | Full implementation, UI polish, build verification |
| **Structured Prompts** | Numbered spec sections for data, hooks, routes, constraints |
| **Iterative Build Loop** | `npm run build` → fix errors → re-build until clean |

---

## Edge Cases

1. **Normal (Day 11)** — 11-day streak, Day 12 active, 20% progress
2. **First Day (0 Streak)** — Welcome banner, empty heatmap
3. **Missed Day** — Streak recovery alert with freeze token

Toggle via **Test Edge Cases** button (bottom-right).

---

## Verification

- [x] `npm run build` — zero errors
- [x] Routes: `/`, `/dashboard`, `/day/12`
- [x] No `Github` / `Linkedin` lucide imports
- [x] 390px mobile container with `#0B0F17` background
- [x] Dual proof validation + confetti on submit
