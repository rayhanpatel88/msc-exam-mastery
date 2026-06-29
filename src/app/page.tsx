'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { databaseSystemsModule, introDataScienceModule, MasteryStatus, Topic } from '@/data/modules';
import { studyPlan } from '@/data/planner';
import { getProgress } from '@/lib/storage';
import { ProgressBar } from '@/components/ProgressBar';
import {
  BookOpen,
  CreditCard,
  Pencil,
  FileText,
  Video,
  AlertTriangle,
  Calendar,
  ClipboardList,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

function getAllTopics(module: typeof databaseSystemsModule): Topic[] {
  return module.weeks.flatMap((w) => w.topics);
}

function calcProgress(topics: Topic[], progress: Record<string, MasteryStatus>) {
  const total = topics.length;
  if (total === 0) return 0;
  const mastered = topics.filter(
    (t) => (progress[t.id] ?? t.status) === 'mastered',
  ).length;
  return Math.round((mastered / total) * 100);
}

function getTodayBlock() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const block of studyPlan) {
    const weekStart = new Date(block.weekStart);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    if (today >= weekStart && today <= weekEnd) {
      // find the daily block for today
      const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
      const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0=Mon...
      return {
        week: block.week,
        daily: block.dailyBlocks[Math.min(dayIndex, block.dailyBlocks.length - 1)],
        goals: block.weeklyGoals,
      };
    }
  }
  return null;
}

export default function Dashboard() {
  const [progress, setProgress] = useState<Record<string, MasteryStatus>>({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const dbTopics = getAllTopics(databaseSystemsModule);
  const idsTopics = getAllTopics(introDataScienceModule);
  const dbProgress = calcProgress(dbTopics, progress);
  const idsProgress = calcProgress(idsTopics, progress);
  const overallProgress = Math.round((dbProgress + idsProgress) / 2);

  const allTopics = [...dbTopics, ...idsTopics];
  const tier1Topics = allTopics.filter((t) => t.tier === 1);
  const unmasteredTier1 = tier1Topics.filter(
    (t) => (progress[t.id] ?? t.status) !== 'mastered',
  );
  const weakestTopics = unmasteredTier1.slice(0, 5);

  const todayBlock = getTodayBlock();

  const quickLinks = [
    { href: '/flashcards', label: 'Flashcards', icon: <CreditCard size={20} />, desc: '40 cards across both modules', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
    { href: '/practice', label: 'Practice Engine', icon: <Pencil size={20} />, desc: '20 worked exam questions', color: 'bg-amber-50 border-amber-200 hover:bg-amber-100' },
    { href: '/cheatsheets', label: 'Cheat Sheets', icon: <FileText size={20} />, desc: 'SQL, R, ggplot2 quick refs', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
    { href: '/videos', label: 'Video Support', icon: <Video size={20} />, desc: '20 curated video topics', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
    { href: '/error-log', label: 'Error Log', icon: <AlertTriangle size={20} />, desc: 'Track & fix mistakes', color: 'bg-red-50 border-red-200 hover:bg-red-100' },
    { href: '/planner', label: 'Revision Planner', icon: <Calendar size={20} />, desc: '8-week study plan', color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100' },
    { href: '/mock-exams', label: 'Mock Exams', icon: <ClipboardList size={20} />, desc: 'Track your mock scores', color: 'bg-pink-50 border-pink-200 hover:bg-pink-100' },
    { href: '/modules', label: 'All Modules', icon: <BookOpen size={20} />, desc: 'Week-by-week topic tracker', color: 'bg-teal-50 border-teal-200 hover:bg-teal-100' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3D0066] to-[#6B0099] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-14 shrink-0">
              <Image src="/lboro-logo.png" alt="Loughborough University" fill className="object-contain object-left" style={{ mixBlendMode: 'screen' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Rayhan Patel</h1>
              <p className="text-white/70 text-sm">MSc Data Science · Loughborough University</p>
              <div className="flex items-center gap-2 mt-1">
                <Target size={14} className="text-[#C8A951]" />
                <span className="text-[#C8A951] text-sm font-semibold">Goal: 90%+ Exam Mastery</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-[#C8A951]">{overallProgress}%</p>
            <p className="text-white/60 text-xs mt-1">Overall Readiness</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-white/80">Database Systems</span>
              <span className="text-sm font-bold text-[#C8A951]">{dbProgress}%</span>
            </div>
            <ProgressBar value={dbProgress} color="gold" size="md" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-white/80">Intro to Data Science</span>
              <span className="text-sm font-bold text-[#C8A951]">{idsProgress}%</span>
            </div>
            <ProgressBar value={idsProgress} color="gold" size="md" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-[#1A0033] flex items-center gap-2">
            <BookOpen size={20} className="text-[#3D0066]" />
            Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DB Systems */}
            <Link href="/modules/database-systems" className="block">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-[#3D0066]/30 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D0066] bg-[#3D0066]/10 px-2 py-0.5 rounded">
                      {databaseSystemsModule.code}
                    </span>
                    <h3 className="font-bold text-[#1A0033] mt-1.5 group-hover:text-[#3D0066] transition-colors">
                      {databaseSystemsModule.title}
                    </h3>
                  </div>
                  <span className="text-2xl font-bold text-[#3D0066]">{dbProgress}%</span>
                </div>
                <ProgressBar value={dbProgress} color="purple" size="sm" />
                <p className="text-xs text-gray-500 mt-2">
                  {dbTopics.filter((t) => (progress[t.id] ?? t.status) === 'mastered').length} / {dbTopics.length} topics mastered
                </p>
                <p className="text-xs text-gray-400 mt-1">11 weeks · SQL, RA, Normalisation, Transactions</p>
              </div>
            </Link>

            {/* IDS */}
            <Link href="/modules/intro-data-science" className="block">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-[#C8A951]/50 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {introDataScienceModule.code}
                    </span>
                    <h3 className="font-bold text-[#1A0033] mt-1.5 group-hover:text-amber-700 transition-colors">
                      {introDataScienceModule.title}
                    </h3>
                  </div>
                  <span className="text-2xl font-bold text-amber-600">{idsProgress}%</span>
                </div>
                <ProgressBar value={idsProgress} color="gold" size="sm" />
                <p className="text-xs text-gray-500 mt-2">
                  {idsTopics.filter((t) => (progress[t.id] ?? t.status) === 'mastered').length} / {idsTopics.length} topics mastered
                </p>
                <p className="text-xs text-gray-400 mt-1">10 weeks · R, dplyr, ggplot2, Statistics</p>
              </div>
            </Link>
          </div>

          {/* Today's tasks */}
          {todayBlock && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-[#1A0033] flex items-center gap-2 mb-3">
                <Zap size={18} className="text-[#C8A951]" />
                Today&apos;s Revision — {todayBlock.week}
              </h3>
              {todayBlock.daily && (
                <div className="space-y-2">
                  {[
                    { label: 'Block 1 — DB Systems', content: todayBlock.daily.block1 },
                    { label: 'Block 2 — IDS', content: todayBlock.daily.block2 },
                    { label: 'Block 3 — Active Recall', content: todayBlock.daily.block3 },
                    { label: 'Block 4 — Error Log / Review', content: todayBlock.daily.block4 },
                  ].map((b) => (
                    <div key={b.label} className="flex items-start gap-2 text-sm">
                      <span className="text-[10px] font-bold text-[#3D0066] bg-[#3D0066]/10 px-1.5 py-0.5 rounded mt-0.5 shrink-0 whitespace-nowrap">
                        {b.label.split(' — ')[0]}
                      </span>
                      <span className="text-gray-600">{b.content}</span>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/planner" className="inline-flex items-center gap-1 text-xs text-[#3D0066] font-semibold mt-3 hover:underline">
                View full planner →
              </Link>
            </div>
          )}

          {/* Quick links */}
          <div>
            <h2 className="text-lg font-bold text-[#1A0033] flex items-center gap-2 mb-3">
              <TrendingUp size={20} className="text-[#3D0066]" />
              Quick Access
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className={`border rounded-xl p-3 transition-all cursor-pointer ${link.color}`}>
                    <div className="text-[#3D0066] mb-1.5">{link.icon}</div>
                    <p className="font-semibold text-xs text-[#1A0033]">{link.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Exam readiness */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-[#1A0033] mb-4 flex items-center gap-2">
              <Target size={18} className="text-[#3D0066]" />
              Exam Readiness
            </h3>
            <div className="flex items-center justify-center">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={overallProgress >= 90 ? '#22c55e' : overallProgress >= 60 ? '#C8A951' : '#3D0066'}
                    strokeWidth="10"
                    strokeDasharray={`${overallProgress * 2.51327} ${251.327 - overallProgress * 2.51327}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[#1A0033]">{overallProgress}%</span>
                  <span className="text-[10px] text-gray-400">ready</span>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Mastered topics</span>
                <span className="font-semibold text-[#1A0033]">
                  {allTopics.filter((t) => (progress[t.id] ?? t.status) === 'mastered').length} / {allTopics.length}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Tier 1 remaining</span>
                <span className={`font-semibold ${unmasteredTier1.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {unmasteredTier1.length}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Target</span>
                <span className="font-bold text-[#3D0066]">90%+</span>
              </div>
            </div>
          </div>

          {/* Weakest Tier 1 topics */}
          {weakestTopics.length > 0 && (
            <div className="bg-white rounded-xl border border-red-100 p-5">
              <h3 className="font-bold text-[#1A0033] mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-500" />
                Priority Topics
              </h3>
              <p className="text-xs text-gray-500 mb-3">Tier 1 topics not yet mastered</p>
              <div className="space-y-2">
                {weakestTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    <span className="text-xs text-gray-700 line-clamp-1">{topic.title}</span>
                  </div>
                ))}
              </div>
              {unmasteredTier1.length > 5 && (
                <p className="text-xs text-gray-400 mt-2">+{unmasteredTier1.length - 5} more…</p>
              )}
            </div>
          )}

          {/* Weekly goals */}
          {todayBlock && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-[#1A0033] mb-3">This Week&apos;s Goals</h3>
              <ul className="space-y-2">
                {todayBlock.goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="w-4 h-4 rounded-full border-2 border-[#3D0066] shrink-0 mt-0.5" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
        Personal revision dashboard based on module materials · Rayhan Patel · MSc Data Science · Loughborough University
      </footer>
    </div>
  );
}
