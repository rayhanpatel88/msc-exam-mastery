'use client';

import { useState } from 'react';
import { cheatsheets, Cheatsheet } from '@/data/cheatsheets';
import { FileText, Printer } from 'lucide-react';
import { clsx } from 'clsx';

export default function CheatsheetsPage() {
  const [activeId, setActiveId] = useState(cheatsheets[0]?.id ?? '');

  const active: Cheatsheet | undefined = cheatsheets.find((c) => c.id === activeId);

  const moduleLabel = (m: string) => {
    if (m === 'db') return 'Database Systems';
    if (m === 'ids') return 'IDS';
    return 'Both';
  };

  const moduleBadgeColor = (m: string) => {
    if (m === 'db') return 'bg-[#3D0066]/10 text-[#3D0066]';
    if (m === 'ids') return 'bg-amber-100 text-amber-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText size={28} className="text-[#3D0066]" />
          <div>
            <h1 className="text-2xl font-bold text-[#1A0033]">Cheat Sheets</h1>
            <p className="text-sm text-gray-500">Quick reference guides for key syntax and concepts</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all print:hidden"
        >
          <Printer size={16} />
          Print
        </button>
      </div>

      <div className="flex gap-6 items-start">
        {/* Tab sidebar */}
        <div className="shrink-0 w-52 space-y-1 print:hidden">
          {cheatsheets.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setActiveId(cs.id)}
              className={clsx(
                'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all',
                activeId === cs.id
                  ? 'bg-[#3D0066] text-white font-semibold'
                  : 'text-gray-700 hover:bg-gray-100',
              )}
            >
              <div className="font-medium">{cs.title}</div>
              <div className={clsx('text-[10px] mt-0.5 font-normal', activeId === cs.id ? 'text-white/60' : 'text-gray-400')}>
                {moduleLabel(cs.module)}
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        {active && (
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-[#1A0033]">{active.title}</h2>
              <span className={clsx('text-xs px-2 py-0.5 rounded font-medium', moduleBadgeColor(active.module))}>
                {moduleLabel(active.module)}
              </span>
            </div>

            {active.sections.map((section) => (
              <div key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-[#3D0066]/5 border-b border-gray-200">
                  <h3 className="font-bold text-[#1A0033] text-sm">{section.title}</h3>
                </div>
                <div className="p-4 space-y-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-700 shrink-0 min-w-[140px]">
                          {item.label}
                        </span>
                        {item.note && (
                          <span className="text-xs text-gray-400 italic self-center">{item.note}</span>
                        )}
                      </div>
                      <pre className="text-xs bg-[#1A0033] text-green-300 rounded-lg p-3 overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                        {item.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
