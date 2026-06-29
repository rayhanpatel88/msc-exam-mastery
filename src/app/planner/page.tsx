'use client';

import { studyPlan } from '@/data/planner';
import { Calendar, Target, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

function isCurrentWeek(weekStart: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(weekStart);
  const end = new Date(weekStart);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return today >= start && today <= end;
}

function isFutureWeek(weekStart: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(weekStart) > today;
}

const blockColors = [
  'bg-[#3D0066]/10 border-[#3D0066]/20 text-[#3D0066]',
  'bg-amber-50 border-amber-200 text-amber-800',
  'bg-green-50 border-green-200 text-green-800',
  'bg-blue-50 border-blue-200 text-blue-800',
];

const blockLabels = ['Block 1 — DB', 'Block 2 — IDS', 'Block 3 — Active Recall', 'Block 4 — Review'];

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Revision Planner</h1>
          <p className="text-sm text-gray-500">
            8-week study plan from 29 June to 21 August 2026. Each day has 4 study blocks.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#C8A951]" />
          <span className="text-gray-600">Current week</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gray-200" />
          <span className="text-gray-600">Future week</span>
        </div>
        {blockLabels.map((l, i) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className={clsx('w-3 h-3 rounded', blockColors[i].split(' ')[0])} />
            <span className="text-gray-600">{l}</span>
          </div>
        ))}
      </div>

      {/* Weeks */}
      <div className="space-y-6">
        {studyPlan.map((block) => {
          const isCurrent = isCurrentWeek(block.weekStart);
          const isFuture = isFutureWeek(block.weekStart);

          return (
            <div
              key={block.id}
              className={clsx(
                'rounded-2xl border overflow-hidden transition-all',
                isCurrent
                  ? 'border-[#C8A951] shadow-md shadow-[#C8A951]/20'
                  : 'border-gray-200',
              )}
            >
              {/* Week header */}
              <div
                className={clsx(
                  'px-5 py-4 flex items-center justify-between',
                  isCurrent ? 'bg-[#C8A951] text-white' : 'bg-gray-50 text-[#1A0033]',
                )}
              >
                <div className="flex items-center gap-3">
                  {isCurrent && (
                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full animate-pulse">
                      THIS WEEK
                    </span>
                  )}
                  <h2 className="font-bold text-lg">{block.week}</h2>
                  <span className={clsx('text-sm', isCurrent ? 'text-white/70' : 'text-gray-400')}>
                    w/c {block.weekStart}
                  </span>
                </div>
                {isFuture && (
                  <span className="text-xs text-gray-400">Upcoming</span>
                )}
              </div>

              <div className="bg-white p-5 space-y-5">
                {/* Weekly goals */}
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <Target size={12} />
                    Weekly Goals
                  </h3>
                  <ul className="space-y-1.5">
                    {block.weeklyGoals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="text-[#3D0066] shrink-0 mt-0.5" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Daily blocks */}
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                    Daily Schedule
                  </h3>
                  <div className="space-y-3">
                    {block.dailyBlocks.map((day) => (
                      <div key={day.day} className="rounded-xl border border-gray-100 overflow-hidden">
                        <div className="bg-[#3D0066]/5 px-4 py-2 border-b border-gray-100">
                          <p className="text-xs font-bold text-[#3D0066]">{day.day}</p>
                        </div>
                        <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[day.block1, day.block2, day.block3, day.block4].map((b, i) => (
                            <div
                              key={i}
                              className={clsx(
                                'rounded-lg border px-3 py-2 text-xs',
                                blockColors[i],
                              )}
                            >
                              <span className="font-bold block mb-0.5 text-[10px] uppercase opacity-70">
                                {blockLabels[i]}
                              </span>
                              {b}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
