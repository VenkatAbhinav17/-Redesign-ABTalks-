export interface StudentProfile {
  name: string;
  college: string;
  rank: number;
  track: string;
  completedDays: number[];
  streakCount: number;
  streakFreezeTokens: number;
  stateMode: 'normal' | 'zero' | 'missed';
}

export interface Task {
  day: number;
  title: string;
  track: string;
  estimatedTime: string;
  description: string;
  learningObjectives: string[];
  resources: { name: string; url: string }[];
  acceptanceCriteria: string[];
}

export const DEFAULT_STUDENT: StudentProfile = {
  name: "Gottam Abhinav",
  college: "Amrita Vishwa Vidyapeetham",
  rank: 42,
  track: "Full-Stack AI Systems",
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  streakCount: 11,
  streakFreezeTokens: 2,
  stateMode: 'normal'
};

export const ZERO_STATE_STUDENT: StudentProfile = {
  name: "Gottam Abhinav",
  college: "Amrita Vishwa Vidyapeetham",
  rank: 42,
  track: "Full-Stack AI Systems",
  completedDays: [],
  streakCount: 0,
  streakFreezeTokens: 2,
  stateMode: 'zero'
};

export const MISSED_DAY_STUDENT: StudentProfile = {
  name: "Gottam Abhinav",
  college: "Amrita Vishwa Vidyapeetham",
  rank: 42,
  track: "Full-Stack AI Systems",
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  streakCount: 10, // Streak was 10, but yesterday was missed. In UI we let them freeze it to restore to 11.
  streakFreezeTokens: 1,
  stateMode: 'missed'
};

export const MOCK_DAY_12_TASK: Task = {
  day: 12,
  title: "Build a Rate-Limited API Middleware",
  track: "Full-Stack AI Systems",
  estimatedTime: "~45 Mins",
  description: "Create an edge-compatible Next.js Middleware that rate-limits incoming API requests using Upstash Redis to prevent abuse and ensure high availability.",
  learningObjectives: [
    "Understand Edge Runtime constraints and middleware execution order",
    "Integrate Upstash Redis REST client in a Next.js Edge Middleware",
    "Design a sliding window or token bucket rate-limiting algorithm",
    "Implement custom HTTP response headers (X-RateLimit-Limit, X-RateLimit-Remaining)"
  ],
  resources: [
    { name: "Upstash Redis SDK", url: "https://upstash.com/docs/redis/overall/getstarted" },
    { name: "Next.js Middleware Guide", url: "https://nextjs.org/docs/app/building-your-application/routing/middleware" }
  ],
  acceptanceCriteria: [
    "Middleware intercepts requests to /api/* and counts hits based on IP address.",
    "Returns HTTP 429 Too Many Requests once the rate limit is exceeded.",
    "Includes standard rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining) in all API responses.",
    "Handles Redis connection failures gracefully without crashing the app (fallback)."
  ]
};
