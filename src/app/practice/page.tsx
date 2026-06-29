'use client';

import { useState, useMemo } from 'react';
import { practiceItems } from '@/data/practice';
import { Pencil, ChevronDown, ChevronUp, Check, Filter, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const difficultyColors = {
  easy: 'text-green-600 bg-green-50 border-green-200',
  medium: 'text-amber-600 bg-amber-50 border-amber-200',
  hard: 'text-red-600 bg-red-50 border-red-200',
};

export default function PracticePage() {
  const [moduleFilter, setModuleFilter] = useState<'all' | 'db' | 'ids'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return practiceItems.filter((p) => {
      if (moduleFilter !== 'all' && p.module !== moduleFilter) return false;
      if (difficultyFilter !== 'all' && p.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [moduleFilter, difficultyFilter]);

  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  const toggleMastered = (id: string) => {
    setMastered((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Pencil size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Practice Engine</h1>
          <p className="text-sm text-gray-500">
            Work through exam-style questions. Try to answer before revealing the model answer.
          </p>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold">How to use:</p>
          <p>Read the prompt → write your answer on paper → reveal the model answer → check common mistakes → mark as mastered only when you could do it from scratch.</p>
        </div>
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
        <div className="flex items-center gap-1.5 ml-2">
          <span className="text-xs text-gray-500 font-medium">Difficulty:</span>
        </div>
        {(['all', 'easy', 'medium', 'hard'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setDifficultyFilter(f)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize',
              difficultyFilter === f
                ? 'bg-[#3D0066] text-white border-[#3D0066]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#3D0066] hover:text-[#3D0066]',
            )}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">
          {mastered.size} / {filtered.length} mastered
        </span>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {filtered.map((item, idx) => {
          const isRevealed = revealed.has(item.id);
          const isMastered = mastered.has(item.id);

          return (
            <div
              key={item.id}
              className={clsx(
                'bg-white rounded-xl border transition-all',
                isMastered ? 'border-green-300 bg-green-50/20' : 'border-gray-200',
              )}
            >
              {/* Header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-400">Q{idx + 1}</span>
                    <span className={clsx('text-xs px-2 py-0.5 rounded border font-medium capitalize', difficultyColors[item.difficulty])}>
                      {item.difficulty}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded border bg-gray-50 text-gray-600 border-gray-100">
                      {item.module === 'db' ? 'Database Systems' : 'IDS'}
                    </span>
                    <span className="text-xs text-gray-400">{item.topic}</span>
                  </div>
                  <button
                    onClick={() => toggleMastered(item.id)}
                    className={clsx(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0',
                      isMastered
                        ? 'bg-green-100 text-green-700 border-green-300'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-200',
                    )}
                  >
                    <Check size={12} />
                    {isMastered ? 'Mastered' : 'Mark mastered'}
                  </button>
                </div>

                {/* Prompt */}
                <div className="mt-4 p-4 bg-[#3D0066]/5 rounded-xl border border-[#3D0066]/10">
                  <p className="text-sm font-semibold text-[#1A0033] leading-relaxed">{item.prompt}</p>
                </div>

                {/* Reveal button */}
                <button
                  onClick={() => toggleReveal(item.id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-[#3D0066]/30 text-sm font-medium text-[#3D0066] hover:bg-[#3D0066]/5 transition-all"
                >
                  {isRevealed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  {isRevealed ? 'Hide Answer' : 'Reveal Model Answer'}
                </button>
              </div>

              {/* Answer */}
              {isRevealed && (
                <div className="border-t border-gray-100 p-5 space-y-4">
                  {/* Model answer */}
                  <div>
                    <h4 className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Model Answer</h4>
                    <pre className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap bg-green-50 rounded-lg p-4 border border-green-100 font-mono overflow-x-auto">
                      {item.modelAnswer}
                    </pre>
                  </div>

                  {/* Common mistakes */}
                  {item.commonMistakes.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Common Mistakes</h4>
                      <ul className="space-y-1.5">
                        {item.commonMistakes.map((mistake, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-red-400 shrink-0 font-bold">✗</span>
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-400">No practice items match the current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
