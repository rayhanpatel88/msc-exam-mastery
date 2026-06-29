'use client';

import { useState } from 'react';
import { Video, ExternalLink, PlayCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

interface Playlist {
  id: string;
  title: string;
  description: string;
  module: 'db' | 'ids';
  playlistId: string;
  topics: string[];
  afterWatching: string;
}

const playlists: Playlist[] = [
  {
    id: 'db-sql',
    title: 'SQL & Database Systems',
    description: 'Covers SQL SELECT, JOINs, aggregation, subqueries, ER diagrams, normalisation, and transactions.',
    module: 'db',
    playlistId: 'PLNcg_FV9n7qZY_2eAtUzEUulNjTJREhQe',
    topics: ['SQL SELECT / FROM / WHERE', 'JOINs', 'GROUP BY / HAVING', 'Nested & correlated subqueries', 'ER diagrams', 'Normalisation (1NF–BCNF)', 'Transactions & ACID'],
    afterWatching: 'Complete the corresponding lab worksheet and redo from memory without notes.',
  },
  {
    id: 'ids-r1',
    title: 'R Programming — Foundations',
    description: 'Introduction to R, RStudio, data types, vectors, lists, matrices, and data frames.',
    module: 'ids',
    playlistId: 'PLtL57Fdbwb_AWmWWrFV_pLqq2uicpUIO9',
    topics: ['R & RStudio setup', 'Variables and objects', 'Data types', 'Vectors', 'Lists', 'Matrices', 'Data frames', 'Indexing'],
    afterWatching: 'Do Practical 1 and Practical 2 in R Markdown.',
  },
  {
    id: 'ids-r2',
    title: 'R Programming — Data Wrangling',
    description: 'tidyverse, dplyr verbs, pipes, joins, and data manipulation.',
    module: 'ids',
    playlistId: 'PLtL57Fdbwb_C6RS0JtBojTNOMVlgpeJkS',
    topics: ['tidyverse & pipes (%>%)', 'filter / select / mutate', 'arrange / group_by / summarise', 'Joins (left, inner, full)', 'Practical data cleaning'],
    afterWatching: 'Do Practical 4 (dplyr) in full from memory.',
  },
  {
    id: 'ids-r3',
    title: 'R Programming — Dates, Strings & Factors',
    description: 'lubridate for dates, stringr for text, factors, tidyr pivoting, and missing values.',
    module: 'ids',
    playlistId: 'PLtL57Fdbwb_AY2O3fqi5MuCTDJC-S6cbf',
    topics: ['lubridate: ymd(), dmy(), month(), year()', 'stringr: str_detect(), str_replace()', 'Factors and levels', 'pivot_longer / pivot_wider', 'Handling NA values'],
    afterWatching: 'Do Practical 6 using the lotr_characters dataset.',
  },
  {
    id: 'ids-r4',
    title: 'Summary Statistics in R',
    description: 'Mean, median, standard deviation, distributions, and summary() in R.',
    module: 'ids',
    playlistId: 'PLtL57Fdbwb_Chn-dNR0qBjH3esKS2MXY3',
    topics: ['Mean, median, mode', 'Variance and standard deviation', 'Quartiles and IQR', 'Distribution shape: skewness', 'summary() and table()'],
    afterWatching: 'Do Practical 5 (summary statistics) and verify with the model solutions.',
  },
  {
    id: 'ids-r5',
    title: 'ggplot2 — Data Visualisation',
    description: 'Grammar of graphics, core geoms, scatter plots, bar charts, histograms, and boxplots.',
    module: 'ids',
    playlistId: 'PLtL57Fdbwb_B5v9p9vGVjdjrvWZL7peTy',
    topics: ['Grammar of graphics (data + aes + geom)', 'geom_point, geom_line, geom_bar', 'geom_histogram, geom_boxplot', 'Facets: facet_wrap / facet_grid', 'Scales, labels, and themes'],
    afterWatching: 'Do Practical 7 and recreate every plot from memory.',
  },
  {
    id: 'ids-r6',
    title: 'ggplot2 — Advanced & Figure Critique',
    description: 'Advanced ggplot2 customisation, annotations, themes, and good vs bad visualisation principles.',
    module: 'ids',
    playlistId: 'PLtL57Fdbwb_D-iZXfWd2myjpYXSg_yi9G',
    topics: ['Scales and coordinates', 'Labels and annotations', 'Custom themes', 'Legends and colour palettes', 'Good vs bad graphs', 'Figure critique checklist'],
    afterWatching: 'Review Week 10 Chapter on good vs bad graphs. Critique 3 real graphs.',
  },
];

export default function VideosPage() {
  const [moduleFilter, setModuleFilter] = useState<'all' | 'db' | 'ids'>('all');
  const [activePlaylist, setActivePlaylist] = useState<string | null>('db-sql');

  const filtered = playlists.filter((p) => moduleFilter === 'all' || p.module === moduleFilter);

  const embedUrl = (playlistId: string) =>
    `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`;

  const youtubeUrl = (playlistId: string) =>
    `https://www.youtube.com/playlist?list=${playlistId}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Video size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Video Support</h1>
          <p className="text-sm text-gray-500">
            Curated playlists for every topic. Watch to unblock a concept, then immediately do the university practical.
          </p>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
        <p className="font-semibold mb-1">How to use these playlists</p>
        <p>University materials are the source of truth. Use videos only when a concept blocks you. After each video, do the listed practical from memory — that is what builds exam performance.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {(['all', 'db', 'ids'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setModuleFilter(f)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
              moduleFilter === f
                ? 'bg-[#3D0066] text-white border-[#3D0066]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#3D0066] hover:text-[#3D0066]',
            )}
          >
            {f === 'all' ? 'All Playlists' : f === 'db' ? 'Database Systems' : 'Intro to Data Science'}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">{filtered.length} playlists</span>
      </div>

      {/* Playlist cards */}
      <div className="space-y-4">
        {filtered.map((playlist) => {
          const isOpen = activePlaylist === playlist.id;

          return (
            <div
              key={playlist.id}
              className={clsx(
                'bg-white rounded-2xl border-2 transition-all overflow-hidden',
                isOpen ? 'border-[#3D0066] shadow-lg' : 'border-gray-200 hover:border-[#3D0066]/40',
              )}
            >
              {/* Header — always visible */}
              <button
                className="w-full text-left p-5 flex items-start gap-4"
                onClick={() => setActivePlaylist(isOpen ? null : playlist.id)}
              >
                <div className={clsx(
                  'mt-0.5 p-2 rounded-lg shrink-0',
                  playlist.module === 'db' ? 'bg-[#3D0066]/10' : 'bg-amber-100',
                )}>
                  <PlayCircle size={20} className={playlist.module === 'db' ? 'text-[#3D0066]' : 'text-amber-600'} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={clsx(
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded',
                      playlist.module === 'db' ? 'bg-[#3D0066]/10 text-[#3D0066]' : 'bg-amber-100 text-amber-700',
                    )}>
                      {playlist.module === 'db' ? 'Database Systems' : 'Intro to Data Science'}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1A0033] text-base">{playlist.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{playlist.description}</p>

                  {/* Topic pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {playlist.topics.map((t) => (
                      <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 text-gray-400 mt-1">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Expanded: embed + after-watching */}
              {isOpen && (
                <div className="px-5 pb-5 space-y-4">
                  {/* YouTube embed */}
                  <div className="rounded-xl overflow-hidden border border-gray-200" style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={embedUrl(playlist.playlistId)}
                      title={playlist.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>

                  {/* After watching + open in YouTube */}
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-1">After watching →</p>
                      <p className="text-sm text-green-800">{playlist.afterWatching}</p>
                    </div>
                    <a
                      href={youtubeUrl(playlist.playlistId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shrink-0 self-start"
                    >
                      <ExternalLink size={15} />
                      Open in YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
