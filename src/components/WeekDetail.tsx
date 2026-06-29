'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Module, MasteryStatus } from '@/data/modules';
import { getProgress, setProgress } from '@/lib/storage';
import { TopicCard } from './TopicCard';
import { ProgressBar } from './ProgressBar';
import { ArrowLeft, FileText, BookOpen, TestTube, FileCheck, Download, Archive, ExternalLink, PlayCircle } from 'lucide-react';
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

export interface WeekVideoResource {
  title: string;
  type: 'playlist' | 'video';
  youtubeId: string;
  note: string;
}

export const weekVideos: Record<string, Record<number, WeekVideoResource[]>> = {
  'database-systems': {
    1: [
      { title: 'Relational Algebra - Full Playlist', type: 'playlist', youtubeId: 'PLBlnK6fEyqRiXuITH4oB-wk2mjEADVHwU', note: 'Use before selection, projection and join practice.' },
    ],
    2: [
      { title: 'SQL & Database Systems - Full Playlist', type: 'playlist', youtubeId: 'PLNcg_FV9n7qZY_2eAtUzEUulNjTJREhQe', note: 'Use for SELECT/FROM/WHERE and basic joins.' },
      { title: 'Relational Algebra - Full Playlist', type: 'playlist', youtubeId: 'PLBlnK6fEyqRiXuITH4oB-wk2mjEADVHwU', note: 'Use for sigma, pi and join expressions.' },
    ],
    3: [
      { title: 'Self-Joins in SQL', type: 'video', youtubeId: 'XKUE1QFbhxs', note: 'Use before same-table pair questions.' },
      { title: 'Relational Algebra - Full Playlist', type: 'playlist', youtubeId: 'PLBlnK6fEyqRiXuITH4oB-wk2mjEADVHwU', note: 'Use for aggregation and join consolidation.' },
    ],
    4: [
      { title: 'SQL & Database Systems - Full Playlist', type: 'playlist', youtubeId: 'PLNcg_FV9n7qZY_2eAtUzEUulNjTJREhQe', note: 'Use for GROUP BY, HAVING and aggregate queries.' },
    ],
    5: [
      { title: 'SQL & Database Systems - Full Playlist', type: 'playlist', youtubeId: 'PLNcg_FV9n7qZY_2eAtUzEUulNjTJREhQe', note: 'Use for nested and correlated subqueries.' },
      { title: 'ER Diagrams & ER to Relational Mapping', type: 'video', youtubeId: 'LowjDtiNlk4', note: 'Use before ER design questions.' },
    ],
    6: [
      { title: 'SQL & Database Systems - Full Playlist', type: 'playlist', youtubeId: 'PLNcg_FV9n7qZY_2eAtUzEUulNjTJREhQe', note: 'Use for EXISTS, NOT EXISTS and subquery patterns.' },
      { title: 'Common Table Expressions', type: 'video', youtubeId: 'rIcB4zMYMas', note: 'Use when rewriting complex nested queries.' },
    ],
    7: [
      { title: 'ER Diagrams & ER to Relational Mapping', type: 'video', youtubeId: 'LowjDtiNlk4', note: 'Use before mapping ER diagrams to schemas.' },
    ],
    8: [
      { title: 'Functional Dependencies & Attribute Closure', type: 'video', youtubeId: 'AGFUfLPFJ7w', note: 'Use before candidate key and closure questions.' },
      { title: 'Window Functions', type: 'video', youtubeId: 'LJC8277LONg', note: 'Use for advanced SQL ranking tasks.' },
    ],
    9: [
      { title: '1NF, 2NF and 3NF - Worked Examples', type: 'video', youtubeId: 'GFQaEYEc8_8', note: 'Use before 2NF decomposition practice.' },
    ],
    10: [
      { title: 'BCNF - Definition & Decomposition Algorithm', type: 'video', youtubeId: 'VWnKUKH4tLg', note: 'Use before BCNF decomposition questions.' },
      { title: 'Lossless Decomposition', type: 'video', youtubeId: 'zb8ESEf36Zc', note: 'Use for lossless-join proof practice.' },
      { title: 'ACID Transactions', type: 'video', youtubeId: 'GAe5oB742dw', note: 'Use before transaction theory questions.' },
    ],
    11: [
      { title: 'Conflict Serialisability & Precedence Graphs', type: 'video', youtubeId: 's8QlJoL1G6w', note: 'Use before drawing precedence graphs.' },
      { title: 'Isolation Levels', type: 'video', youtubeId: '-gxyut1VLcs', note: 'Use for dirty, non-repeatable and phantom reads.' },
    ],
  },
  'intro-data-science': {
    1: [
      { title: 'R Foundations - Vectors, Lists, Data Frames', type: 'playlist', youtubeId: 'PLtL57Fdbwb_AWmWWrFV_pLqq2uicpUIO9', note: 'Use before RStudio and object practice.' },
      { title: 'R Markdown - Chunk Options', type: 'video', youtubeId: 'rs27coOzpHA', note: 'Use before knitting practical work.' },
    ],
    2: [
      { title: 'R Foundations - Vectors, Lists, Data Frames', type: 'playlist', youtubeId: 'PLtL57Fdbwb_AWmWWrFV_pLqq2uicpUIO9', note: 'Use for vectors, lists, matrices and data frames.' },
      { title: 'R Logical Indexing, %in% and which()', type: 'video', youtubeId: 'T6aSTrBYvCg', note: 'Use before predicting indexing outputs.' },
    ],
    3: [
      { title: 'Sampling Methods & Study Design', type: 'video', youtubeId: '9PaR1TsvnJs', note: 'Use for population, sample and bias questions.' },
    ],
    4: [
      { title: 'Data Wrangling with dplyr', type: 'playlist', youtubeId: 'PLtL57Fdbwb_C6RS0JtBojTNOMVlgpeJkS', note: 'Use before filter, select, mutate and summarise tasks.' },
    ],
    5: [
      { title: 'Summary Statistics', type: 'playlist', youtubeId: 'PLtL57Fdbwb_Chn-dNR0qBjH3esKS2MXY3', note: 'Use before mean, SD, IQR and distribution questions.' },
    ],
    6: [
      { title: 'Dates, Strings & Factors', type: 'playlist', youtubeId: 'PLtL57Fdbwb_AY2O3fqi5MuCTDJC-S6cbf', note: 'Use for lubridate, stringr and factors.' },
      { title: 'Reading & Parsing Data in R', type: 'video', youtubeId: 'c9okn6C0lkE', note: 'Use before import and parsing exercises.' },
    ],
    7: [
      { title: 'ggplot2 - Grammar of Graphics', type: 'playlist', youtubeId: 'PLtL57Fdbwb_B5v9p9vGVjdjrvWZL7peTy', note: 'Use before recreating plots from memory.' },
    ],
    8: [
      { title: 'ggplot2 Advanced & Figure Critique', type: 'playlist', youtubeId: 'PLtL57Fdbwb_D-iZXfWd2myjpYXSg_yi9G', note: 'Use for themes, scales, labels and legends.' },
    ],
    9: [
      { title: 'Tidy Data', type: 'video', youtubeId: '1L0atkGWqvc', note: 'Use before pivot_longer and pivot_wider practice.' },
    ],
    10: [
      { title: 'ggplot2 Advanced & Figure Critique', type: 'playlist', youtubeId: 'PLtL57Fdbwb_D-iZXfWd2myjpYXSg_yi9G', note: 'Use before good/bad visualisation critique.' },
    ],
  },
};

export const youtubeUrl = (video: WeekVideoResource) =>
  video.type === 'playlist'
    ? `https://www.youtube.com/playlist?list=${video.youtubeId}`
    : `https://www.youtube.com/watch?v=${video.youtubeId}`;

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
    const timer = window.setTimeout(() => setProgressState(getProgress()), 0);
    return () => window.clearTimeout(timer);
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
  const videos = weekVideos[module.id]?.[weekNum] ?? [];

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

      {videos.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-[#1A0033]">Video Support</h2>
            <Link href="/videos" className="text-xs font-semibold text-[#3D0066] hover:underline">
              Full video library
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {videos.map((video) => (
              <div key={`${video.youtubeId}-${video.title}`} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className={clsx(
                    'rounded-lg p-2',
                    module.id === 'database-systems' ? 'bg-[#3D0066]/10' : 'bg-amber-100',
                  )}>
                    <PlayCircle size={18} className={module.id === 'database-systems' ? 'text-[#3D0066]' : 'text-amber-700'} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      {video.type}
                    </div>
                    <h3 className="text-sm font-bold text-[#1A0033]">{video.title}</h3>
                    <p className="mt-1 text-xs text-gray-500">{video.note}</p>
                    <a
                      href={youtubeUrl(video)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-red-700"
                    >
                      <ExternalLink size={13} />
                      Open YouTube
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
