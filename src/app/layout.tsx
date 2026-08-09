import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StudentProvider } from '@/hooks/useStudent';
import EdgeCaseDrawer from '@/components/EdgeCaseDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ABTalks - Build Daily, Post Publicly, Get Hired',
  description:
    'A 60-day proof-of-work coding challenge for Indian college students. Build daily, post publicly, and get hired.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0B0F17] flex justify-center text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-400">
        <StudentProvider>
          <div className="max-w-[390px] mx-auto min-h-screen bg-[#0B0F17] border-x border-white/[0.06] relative shadow-2xl w-full flex flex-col overflow-x-hidden">
            {children}
          </div>
          <EdgeCaseDrawer />
        </StudentProvider>
      </body>
    </html>
  );
}
