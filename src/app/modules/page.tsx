import Link from 'next/link';
import { databaseSystemsModule, introDataScienceModule } from '@/data/modules';
import { BookOpen, Database, BarChart2, ChevronRight } from 'lucide-react';

export default function ModulesPage() {
  const modules = [
    {
      module: databaseSystemsModule,
      href: '/modules/database-systems',
      icon: <Database size={28} className="text-[#3D0066]" />,
      color: 'border-[#3D0066]/30 hover:border-[#3D0066]',
      badge: 'bg-[#3D0066]/10 text-[#3D0066]',
      topics: databaseSystemsModule.weeks.flatMap((w) => w.topics),
      weekCount: databaseSystemsModule.weeks.length,
    },
    {
      module: introDataScienceModule,
      href: '/modules/intro-data-science',
      icon: <BarChart2 size={28} className="text-amber-600" />,
      color: 'border-amber-200 hover:border-amber-400',
      badge: 'bg-amber-100 text-amber-700',
      topics: introDataScienceModule.weeks.flatMap((w) => w.topics),
      weekCount: introDataScienceModule.weeks.length,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Modules</h1>
          <p className="text-sm text-gray-500">Select a module to view week-by-week topics and files</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map(({ module, href, icon, color, badge, topics, weekCount }) => {
          const tier1 = topics.filter((t) => t.tier === 1).length;
          const tier2 = topics.filter((t) => t.tier === 2).length;
          const tier3 = topics.filter((t) => t.tier === 3).length;

          return (
            <Link key={module.id} href={href}>
              <div className={`bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg cursor-pointer ${color}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
                  <div className="flex-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${badge}`}>
                      {module.code}
                    </span>
                    <h2 className="text-xl font-bold text-[#1A0033] mt-1">{module.title}</h2>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 mt-1 shrink-0" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-[#1A0033]">{weekCount}</p>
                    <p className="text-xs text-gray-500">Weeks</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-[#1A0033]">{topics.length}</p>
                    <p className="text-xs text-gray-500">Topics</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-600">{tier1}</p>
                    <p className="text-xs text-gray-500">Tier 1</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 bg-red-50 text-red-600 rounded border border-red-100">
                    {tier1} Tier 1 — Core
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-600 rounded border border-orange-100">
                    {tier2} Tier 2 — Important
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded border border-green-100">
                    {tier3} Tier 3 — Context
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Weeks</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {module.weeks.map((w) => (
                      <span key={w.week} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        Week {w.week}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
