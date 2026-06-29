'use client';

import { useState, useMemo } from 'react';
import { dbFlashcards, idsFlashcards, Flashcard } from '@/data/flashcards';
import { CreditCard, ChevronLeft, ChevronRight, RotateCcw, Check, X, Filter } from 'lucide-react';
import { clsx } from 'clsx';

const allCards = [...dbFlashcards, ...idsFlashcards];

export default function FlashcardsPage() {
  const [moduleFilter, setModuleFilter] = useState<'all' | 'db' | 'ids'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [unknown, setUnknown] = useState<Set<string>>(new Set());

  const filteredCards = useMemo(() => {
    return allCards.filter((c) => {
      if (moduleFilter !== 'all' && c.module !== moduleFilter) return false;
      if (difficultyFilter !== 'all' && c.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [moduleFilter, difficultyFilter]);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const goNext = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex((i) => Math.min(filteredCards.length - 1, i + 1)), 150);
  };

  const goPrev = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex((i) => Math.max(0, i - 1)), 150);
  };

  const markKnown = () => {
    if (!currentCard) return;
    setKnown((prev) => new Set([...prev, currentCard.id]));
    setUnknown((prev) => { const s = new Set(prev); s.delete(currentCard.id); return s; });
    goNext();
  };

  const markUnknown = () => {
    if (!currentCard) return;
    setUnknown((prev) => new Set([...prev, currentCard.id]));
    setKnown((prev) => { const s = new Set(prev); s.delete(currentCard.id); return s; });
    goNext();
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
  };

  const handleFilterChange = () => {
    setCurrentIndex(0);
    setFlipped(false);
  };

  const difficultyColors = {
    easy: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-amber-600 bg-amber-50 border-amber-200',
    hard: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <CreditCard size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Flashcards</h1>
          <p className="text-sm text-gray-500">Click a card to flip it. Mark as known or unknown to track progress.</p>
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
            onClick={() => { setModuleFilter(f); handleFilterChange(); }}
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
            onClick={() => { setDifficultyFilter(f); handleFilterChange(); }}
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
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-500">{filteredCards.length} cards</span>
        <span className="text-green-600 font-semibold">✓ {known.size} known</span>
        <span className="text-red-500 font-semibold">✗ {unknown.size} unknown</span>
        <span className="text-gray-400">{currentIndex + 1} / {filteredCards.length}</span>
        <button
          onClick={resetDeck}
          className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-[#3D0066] transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-[#3D0066] h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${filteredCards.length > 0 ? ((currentIndex + 1) / filteredCards.length) * 100 : 0}%` }}
        />
      </div>

      {/* Card */}
      {currentCard ? (
        <div className="space-y-4">
          <div
            className="card-flip cursor-pointer"
            style={{ height: '280px' }}
            onClick={() => setFlipped((f) => !f)}
          >
            <div className={clsx('card-flip-inner', flipped && 'flipped')}>
              {/* Front */}
              <div className="card-flip-front bg-white rounded-2xl border-2 border-[#3D0066]/20 shadow-sm flex flex-col p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    {currentCard.module === 'db' ? 'Database Systems' : 'Intro to Data Science'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={clsx('text-xs px-2 py-0.5 rounded border font-medium', difficultyColors[currentCard.difficulty])}>
                      {currentCard.difficulty}
                    </span>
                    {known.has(currentCard.id) && <span className="text-green-500 text-xs font-bold">✓ Known</span>}
                    {unknown.has(currentCard.id) && <span className="text-red-500 text-xs font-bold">✗ Unknown</span>}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center text-center">
                  <p className="text-lg font-semibold text-[#1A0033] leading-relaxed">{currentCard.front}</p>
                </div>
                <p className="text-xs text-center text-gray-400 mt-3">Click to reveal answer</p>
                <p className="text-xs text-center text-gray-300 mt-1">Topic: {currentCard.topic}</p>
              </div>

              {/* Back */}
              <div className="card-flip-back bg-[#3D0066] rounded-2xl border-2 border-[#3D0066] shadow-sm flex flex-col p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-white/60 font-medium uppercase tracking-wide">Answer</span>
                  <span className="text-xs text-[#C8A951] font-medium">{currentCard.topic}</span>
                </div>
                <div className="flex-1 flex items-center justify-center overflow-auto">
                  <pre className="text-sm text-white leading-relaxed whitespace-pre-wrap font-mono text-left max-h-48 overflow-auto">
                    {currentCard.back}
                  </pre>
                </div>
                <p className="text-xs text-center text-white/40 mt-3">Click to flip back</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={markUnknown}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-200 bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 transition-all"
              >
                <X size={16} />
                Unknown
              </button>
              <button
                onClick={markKnown}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-green-200 bg-green-50 text-sm font-semibold text-green-600 hover:bg-green-100 transition-all"
              >
                <Check size={16} />
                Known
              </button>
            </div>

            <button
              onClick={goNext}
              disabled={currentIndex === filteredCards.length - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Summary when done */}
          {currentIndex === filteredCards.length - 1 && (
            <div className="bg-[#3D0066]/10 border border-[#3D0066]/20 rounded-xl p-4 text-center">
              <p className="font-bold text-[#3D0066]">🎉 End of deck!</p>
              <p className="text-sm text-gray-600 mt-1">
                {known.size} known · {unknown.size} unknown · {filteredCards.length - known.size - unknown.size} unrated
              </p>
              {unknown.size > 0 && (
                <p className="text-xs text-red-500 mt-1">Review the {unknown.size} unknown cards again!</p>
              )}
              <button
                onClick={resetDeck}
                className="mt-3 px-4 py-2 bg-[#3D0066] text-white rounded-lg text-sm font-semibold hover:bg-[#6B0099] transition-colors"
              >
                Restart Deck
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-400 text-lg">No cards match the current filters.</p>
          <button
            onClick={() => { setModuleFilter('all'); setDifficultyFilter('all'); }}
            className="mt-3 px-4 py-2 bg-[#3D0066] text-white rounded-lg text-sm font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
