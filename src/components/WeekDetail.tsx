'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Module, MasteryStatus } from '@/data/modules';
import { getProgress, setProgress } from '@/lib/storage';
import { TopicCard } from './TopicCard';
import { ProgressBar } from './ProgressBar';
import { ArrowLeft, FileText, BookOpen, TestTube, FileCheck, Download, Archive } from 'lucide-react';
import { clsx } from 'clsx';

const fileRoleColors: Record<string, string> = {
  lecture: 'bg-blue-50 text-blue-700 border-blue-100',
  lab: 'bg-purple-50 text-purple-700 border-purple-100',
  solution: 'bg-green-50 text-green-700 border-green-100',
  data: 'bg-gray-50 text-gray-600 border-gray-100',
  mock: 'bg-orange-50 text-orange-700 border-orange-100',
};

const fileRoleIcons: Record<string, React.ReactNode> = {
  lecture: <BookOpen size={14} />,
  lab: <TestTube size={14} />,
  solution: <FileCheck size={14} />,
  data: <FileText size={14} />,
  mock: <FileText size={14} />,
};

interface WeekDetailProps {
  module: Module;
  weekNum: number;
  backHref: string;
  backLabel: string;
  weekBaseHref: string;
  maxWeek: number;
  headerGradient?: string;
}

export function WeekDetail({
  module,
  weekNum,
  backHref,
  backLabel,
  weekBaseHref,
  maxWeek,
  headerGradient = 'from-[#3D0066] to-[#6B0099]',
}: WeekDetailProps) {
  const week = module.weeks.find((w) => w.week === weekNum);
  const [progress, setProgressState] = useState<Record<string, MasteryStatus>>({});

  useEffect(() => {
    setProgressState(getProgress());
  }, []);

  const handleStatusChange = (topicId: string, status: MasteryStatus) => {
    setProgress(topicId, status);
    setProgressState((prev) => ({ ...prev, [topicId]: status }));
  };

  if (!week) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Week {weekNum} not found.</p>
        <Link href={backHref} className="text-[#3D0066] underline mt-2 inline-block">
          Back to module
        </Link>
      </div>
    );
  }

  const masteredCount = week.topics.filter(
    (t) => (progress[t.id] ?? t.status) === 'mastered',
  ).length;
  const pct = week.topics.length > 0 ? Math.round((masteredCount / week.topics.length) * 100) : 0;

  const prevWeek = weekNum > 1 ? weekNum - 1 : null;
  const nextWeek = weekNum < maxWeek ? weekNum + 1 : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#3D0066] transition-colors"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">Week {weekNum}</span>
      </div>

      <div className={`bg-gradient-to-r ${headerGradient} rounded-2xl p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs text-white/70 font-bold uppercase tracking-wider">
              {module.title} · Week {weekNum}
            </span>
            <h1 className="text-xl font-bold mt-1">{week.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{pct}%</p>
            <p className="text-white/60 text-xs">{masteredCount}/{week.topics.length} mastered</p>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={pct} color="gold" size="md" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-[#1A0033] mb-3">Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {week.topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              currentStatus={progress[topic.id] ?? topic.status}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-[#1A0033] mb-3">Files</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="space-y-2">
            {week.files.filter(f => f.type !== 'zip').map((file) => (
              <a
                key={file.name}
                href={`/files/${encodeURIComponent(file.path).replace(/%2F/g, '/')}`}
                download={file.name}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F8F7FF] hover:border hover:border-[#3D0066]/20 border border-transparent transition-all group cursor-pointer"
              >
                <div
                  className={clsx(
                    'flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium shrink-0',
                    fileRoleColors[file.role],
                  )}
                >
                  {fileRoleIcons[file.role]}
                  <span className="capitalize">{file.role}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#3D0066]">{file.name}</p>
                  <p className="text-xs text-gray-400 uppercase">.{file.type}</p>
                </div>
                <Download size={14} className="text-gray-300 group-hover:text-[#3D0066] shrink-0 transition-colors" />
              </a>
            ))}
            {week.files.filter(f => f.type === 'zip').map((file) => (
              <a
                key={file.name}
                href={`/files/${encodeURIComponent(file.path).replace(/%2F/g, '/')}`}
                download={file.name}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F8F7FF] hover:border hover:border-[#C8A951]/40 border border-transparent transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium shrink-0 bg-amber-50 text-amber-700 border-amber-200">
                  <Archive size={12} />
                  <span>data</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#3D0066]">{file.name}</p>
                  <p className="text-xs text-gray-400 uppercase">.zip</p>
                </div>
                <Download size={14} className="text-gray-300 group-hover:text-[#C8A951] shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        {prevWeek ? (
          <Link
            href={`${weekBaseHref}/${prevWeek}`}
            className="flex items-center gap-2 text-sm text-[#3D0066] font-semibold hover:underline"
          >
            <ArrowLeft size={16} />
            Week {prevWeek}
          </Link>
        ) : (
          <span />
        )}
        {nextWeek ? (
          <Link
            href={`${weekBaseHref}/${nextWeek}`}
            className="flex items-center gap-2 text-sm text-[#3D0066] font-semibold hover:underline"
          >
            Week {nextWeek}
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
