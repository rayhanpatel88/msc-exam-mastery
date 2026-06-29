'use client';

import { useState } from 'react';
import { videoResources } from '@/data/videos';
import { Video, ExternalLink, Filter, Search } from 'lucide-react';
import { clsx } from 'clsx';

export default function VideosPage() {
  const [moduleFilter, setModuleFilter] = useState<'all' | 'db' | 'ids'>('all');

  const filtered = videoResources.filter((v) => {
    if (moduleFilter !== 'all' && v.module !== moduleFilter) return false;
    return true;
  });

  const handleYouTube = (searchTerm: string) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Video size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Video Support</h1>
          <p className="text-sm text-gray-500">
            Curated YouTube search terms for each topic. Find the best video, then do the practical.
          </p>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold">How to use:</p>
        <p>Click &quot;Search YouTube&quot; to open YouTube with the recommended search term. Pick a video with good reviews. Watch it, then immediately do the university practical listed.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-gray-400" />
          <span className="text-xs text-gray-500 font-medium">Module:</span>
        </div>
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
            {f === 'all' ? 'All' : f === 'db' ? 'Database Systems' : 'Intro to Data Science'}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">{filtered.length} topics</span>
      </div>

      {/* Video list */}
      <div className="space-y-4">
        {filtered.map((video) => (
          <div key={video.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={clsx(
                    'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded',
                    video.module === 'db' ? 'bg-[#3D0066]/10 text-[#3D0066]' : 'bg-amber-100 text-amber-700',
                  )}>
                    {video.module === 'db' ? 'Database Systems' : 'IDS'}
                  </span>
                  <h3 className="font-bold text-[#1A0033] text-sm">{video.topic}</h3>
                </div>

                <div className="space-y-2 mt-3">
                  <div className="flex items-start gap-2">
                    <Search size={14} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">Search term</span>
                      <p className="text-sm font-bold text-[#3D0066]">&quot;{video.searchTerm}&quot;</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Suggested type</p>
                      <p className="text-xs text-gray-700">{video.suggestedType}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">When to watch</p>
                      <p className="text-xs text-blue-700">{video.whenToUse}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-[10px] font-bold text-green-500 uppercase mb-1">After watching</p>
                      <p className="text-xs text-green-700">{video.afterVideo}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleYouTube(video.searchTerm)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shrink-0 self-start"
              >
                <ExternalLink size={14} />
                Search YouTube
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
