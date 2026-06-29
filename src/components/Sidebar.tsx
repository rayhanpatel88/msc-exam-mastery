'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Pencil,
  FileText,
  Video,
  AlertTriangle,
  Calendar,
  ClipboardList,
  Settings,
  ChevronRight,
  Database,
  BarChart2,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  {
    href: '/modules',
    label: 'Modules',
    icon: <BookOpen size={18} />,
    children: [
      { href: '/modules/database-systems', label: 'Database Systems', icon: <Database size={16} /> },
      { href: '/modules/intro-data-science', label: 'Intro to Data Science', icon: <BarChart2 size={16} /> },
    ],
  },
  { href: '/flashcards', label: 'Flashcards', icon: <CreditCard size={18} /> },
  { href: '/practice', label: 'Practice Engine', icon: <Pencil size={18} /> },
  { href: '/cheatsheets', label: 'Cheat Sheets', icon: <FileText size={18} /> },
  { href: '/videos', label: 'Video Support', icon: <Video size={18} /> },
  { href: '/error-log', label: 'Error Log', icon: <AlertTriangle size={18} /> },
  { href: '/planner', label: 'Revision Planner', icon: <Calendar size={18} /> },
  { href: '/mock-exams', label: 'Mock Exams', icon: <ClipboardList size={18} /> },
  { href: '/settings', label: 'Settings', icon: <Settings size={18} /> },
];

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive =
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  const isExactActive = pathname === item.href;

  return (
    <div>
      <Link
        href={item.href}
        className={clsx(
          'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group',
          depth === 0 ? 'mx-2' : 'mx-4',
          isActive
            ? 'bg-white/15 text-white font-semibold'
            : 'text-white/70 hover:bg-white/10 hover:text-white',
        )}
      >
        {isActive && (
          <span className="absolute left-0 w-1 h-7 bg-[#C8A951] rounded-r-full" />
        )}
        <span className={clsx('transition-colors', isActive ? 'text-[#C8A951]' : 'text-white/60 group-hover:text-white/90')}>
          {item.icon}
        </span>
        <span className="flex-1">{item.label}</span>
        {item.children && (
          <ChevronRight
            size={14}
            className={clsx(
              'transition-transform',
              isActive ? 'rotate-90 text-white/60' : 'text-white/30',
            )}
          />
        )}
      </Link>
      {item.children && isActive && (
        <div className="mt-0.5 mb-1">
          {item.children.map((child) => (
            <NavLink key={child.href} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="relative flex flex-col w-64 min-h-screen bg-[#3D0066] text-white shrink-0">
      {/* Logo area */}
      <div className="px-4 pt-5 pb-4 border-b border-white/10">
        <div className="relative w-full h-14 mb-3">
          <Image
            src="/lboro-logo.png"
            alt="Loughborough University"
            fill
            className="object-contain object-left"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>
        <p className="text-xs font-semibold text-[#C8A951] uppercase tracking-wider leading-tight">
          MSc Exam Mastery
        </p>
        <p className="text-[11px] text-white/50 leading-tight mt-0.5">
          Data Science · Loughborough
        </p>
      </div>

      {/* Student info */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-xs font-semibold text-white">Rayhan Patel</p>
        <p className="text-[11px] text-white/50">MSc Data Science</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] bg-[#C8A951]/20 text-[#C8A951] px-2 py-0.5 rounded-full font-medium">
            🎯 Target: 90%+
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="space-y-0.5 relative">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10">
        <p className="text-[10px] text-white/30 text-center">
          Personal revision dashboard
        </p>
      </div>
    </aside>
  );
}
