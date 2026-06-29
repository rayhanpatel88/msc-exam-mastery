'use client';

import { useState, useEffect } from 'react';
import { Settings, Sun, Moon, Trash2, AlertCircle } from 'lucide-react';
import { clearProgress } from '@/lib/storage';
import { clsx } from 'clsx';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', String(next));
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleResetProgress = () => {
    if (confirmReset) {
      clearProgress();
      localStorage.removeItem('exam_mastery_errors');
      localStorage.removeItem('exam_mastery_mocks');
      setConfirmReset(false);
      alert('All progress, error log, and mock attempts have been reset.');
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 5000);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Settings</h1>
          <p className="text-sm text-gray-500">Personalise your revision dashboard</p>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-[#1A0033] mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={20} className="text-[#3D0066]" /> : <Sun size={20} className="text-amber-500" />}
            <div>
              <p className="text-sm font-medium text-[#1A0033]">Dark Mode</p>
              <p className="text-xs text-gray-400">Toggle between light and dark themes</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={clsx(
              'relative w-12 h-6 rounded-full transition-colors duration-200',
              darkMode ? 'bg-[#3D0066]' : 'bg-gray-200',
            )}
          >
            <span
              className={clsx(
                'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200',
                darkMode ? 'translate-x-6' : 'translate-x-0.5',
              )}
            />
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-[#1A0033] mb-4">About</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-semibold">Student:</span> Rayhan Patel</p>
          <p><span className="font-semibold">Programme:</span> MSc Data Science</p>
          <p><span className="font-semibold">Institution:</span> Loughborough University</p>
          <p><span className="font-semibold">Modules:</span> Database Systems (25COP502), Introduction to Data Science (25MAP500)</p>
          <p><span className="font-semibold">Target:</span> 90%+ exam mastery</p>
          <p><span className="font-semibold">Version:</span> 1.0.0</p>
        </div>
      </div>

      {/* Data storage info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-[#1A0033] mb-4">Data Storage</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>All data (progress, error log, mock attempts) is stored in your browser&apos;s localStorage.</p>
          <p className="text-xs text-gray-400">Data persists across sessions but is local to this browser only. It is not synced to any server.</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="text-xs px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
            🔒 Local storage only
          </div>
          <div className="text-xs px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
            🔄 Persists across sessions
          </div>
          <div className="text-xs px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
            🚫 No server sync
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <h2 className="font-bold text-red-600 mb-4 flex items-center gap-2">
          <AlertCircle size={18} />
          Danger Zone
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#1A0033]">Reset All Progress</p>
            <p className="text-xs text-gray-400">
              Clears all mastery progress, error log entries, and mock exam attempts. Cannot be undone.
            </p>
          </div>
          <button
            onClick={handleResetProgress}
            className={clsx(
              'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
              confirmReset
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
            )}
          >
            <Trash2 size={14} />
            {confirmReset ? 'Click again to confirm' : 'Reset All Data'}
          </button>
        </div>
      </div>

      {/* Strategy reminder */}
      <div className="bg-[#3D0066] rounded-xl p-6 text-white">
        <h2 className="font-bold text-[#C8A951] mb-3">90%+ Revision Strategy</h2>
        <div className="space-y-2 text-sm text-white/80">
          <p><span className="text-[#C8A951] font-bold">1. Read</span> — Read slides/chapter. Highlight key definitions.</p>
          <p><span className="text-[#C8A951] font-bold">2. Practise</span> — Complete the lab without looking at solutions first.</p>
          <p><span className="text-[#C8A951] font-bold">3. Redo</span> — Redo any questions you got wrong from scratch.</p>
          <p><span className="text-[#C8A951] font-bold">4. Mock Test</span> — Do the mock exam under timed conditions.</p>
          <p><span className="text-[#C8A951] font-bold">5. Mastered</span> — Can explain, reproduce, and apply without notes.</p>
        </div>
        <div className="mt-4 p-3 bg-white/10 rounded-lg text-xs text-white/60">
          Tier 1 topics are non-negotiable — lock them all in before touching Tier 2/3.
        </div>
      </div>
    </div>
  );
}
