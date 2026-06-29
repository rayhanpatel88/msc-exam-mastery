'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Module, MasteryStatus, Topic } from '@/data/modules';
import { getProgress, setProgress } from '@/lib/storage';
import { TopicCard } from './TopicCard';
import { ProgressBar } from './ProgressBar';
import { ChevronRight, FileText, BookOpen, TestTube, FileCheck, Download } from 'lucide-react';
import { clsx } from 'clsx';

interface ModulePageProps {
  module: Module;
  weekBaseHref: string;
}

const fileRoleIcons: Record<string, React.ReactNode> = {
  lecture: <BookOpen size={14} />,
  lab: <TestTube size={14} />,
  solution: <FileCheck size={14} />,
  data: <FileText size={14} />,
  mock: <FileText size={14} />,
};

const fileRoleColors: Record<string, string> = {
  lecture: 'bg-blue-50 text-blue-700 border-blue-100',
  lab: 'bg-purple-50 text-purple-700 border-purple-100',
  solution: 'bg-green-50 text-green-700 border-green-100',
  data: 'bg-gray-50 text-gray-600 border-gray-100',
  mock: 'bg-orange-50 text-orange-700 border-orange-100',
};

export function ModulePage({ module, weekBaseHref }: ModulePageProps) {
  const [progress, setProgressState] = useState<Record<string, MasteryStatus>>({});
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  useEffect(() => {
    setProgressState(getProgress());
  }, []);

  const handleStatusChange = (topicId: string, status: MasteryStatus) => {
    setProgress(topicId, status);
    setProgressState((prev) => ({ ...prev, [topicId]: status }));
  };

  const allTopics: Topic[] = module.weeks.flatMap((w) => w.topics);
  const masteredCount = allTopics.filter(
    (t) => (progress[t.id] ?? t.status) === 'mastered',
  ).length;
  const totalTopics = allTopics.length;
  const progressPct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0;

  const tier1Topics = allTopics.filter((t) => t.tier === 1);
  const unmasteredTier1 = tier1Topics.filter((t) => (progress[t.id] ?? t.status) !== 'mastered');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3D0066] to-[#6B0099] rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8A951]">{module.code}</span>
            <h1 className="text-2xl font-bold mt-1">{module.title}</h1>
            <p className="text-white/60 text-sm mt-1">{module.weeks.length} weeks · {totalTopics} topics</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-[#C8A951]">{progressPct}%</p>
            <p className="text-white/60 text-xs">mastered</p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={progressPct} color="gold" size="md" />
        </div>
        <div className="mt-3 flex gap-4 text-sm">
          <span className="text-white/70">{masteredCount} / {totalTopics} topics mastered</span>
          {unmasteredTier1.length > 0 && (
            <span className="text-red-300">{unmasteredTier1.length} Tier 1 still to do</span>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Tier 1 — Core', count: tier1Topics.length, mastered: tier1Topics.filter((t) => (progress[t.id] ?? t.status) === 'mastered').length, color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
          { label: 'Tier 2 — Important', count: allTopics.filter((t) => t.tier === 2).length, mastered: allTopics.filter((t) => t.tier === 2 && (progress[t.id] ?? t.status) === 'mastered').length, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
          { label: 'Tier 3 — Context', count: allTopics.filter((t) => t.tier === 3).length, mastered: allTopics.filter((t) => t.tier === 3 && (progress[t.id] ?? t.status) === 'mastered').length, color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl border p-4 ${stat.bg}`}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.mastered}/{stat.count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Week accordion */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-[#1A0033]">Week-by-Week Topics</h2>
        {module.weeks.map((week) => {
          const weekTopics = week.topics;
          const weekMastered = weekTopics.filter(
            (t) => (progress[t.id] ?? t.status) === 'mastered',
          ).length;
          const weekPct = weekTopics.length > 0 ? Math.round((weekMastered / weekTopics.length) * 100) : 0;
          const isExpanded = expandedWeek === week.week;

          return (
            <div key={week.week} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[#3D0066]/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-[#3D0066]">{week.week}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A0033] text-sm">{week.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <ProgressBar value={weekPct} color="purple" size="sm" className="w-24" />
                    <span className="text-xs text-gray-500">{weekMastered}/{weekTopics.length}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`${weekBaseHref}/${week.week}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-[#3D0066] font-semibold hover:underline px-2 py-1 rounded hover:bg-[#3D0066]/10"
                  >
                    Detail
                  </Link>
                  <ChevronRight
                    size={16}
                    className={clsx('text-gray-400 transition-transform', isExpanded && 'rotate-90')}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {weekTopics.map((topic) => (
                      <TopicCard
                        key={topic.id}
                        topic={topic}
                        currentStatus={progress[topic.id] ?? topic.status}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>

                  {week.files.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Files</h4>
                      <div className="flex flex-wrap gap-2">
                        {week.files.map((file) => (
                          <a
                            key={file.name}
                            href={`/files/${encodeURIComponent(file.path).replace(/%2F/g, '/')}`}
                            download={file.name}
                            className={clsx(
                              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs hover:opacity-80 hover:shadow-sm transition-all cursor-pointer',
                              fileRoleColors[file.role],
                            )}
                            title={`Download ${file.name}`}
                          >
                            {fileRoleIcons[file.role]}
                            <span className="max-w-[180px] truncate">{file.name}</span>
                            <Download size={10} className="opacity-50 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
