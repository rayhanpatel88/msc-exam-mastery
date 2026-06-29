'use client';

import { useEffect, useState } from 'react';
import {
  getMockAttempts,
  addMockAttempt,
  deleteMockAttempt,
  MockAttempt,
} from '@/lib/storage';
import { ClipboardList, Plus, Trash2, FileText, X, Download } from 'lucide-react';
import { clsx } from 'clsx';

const mockExams = [
  {
    module: 'db',
    label: 'Database Systems',
    code: '25COP502',
    files: [
      { name: 'mock exam.pdf', role: 'Mock Exam', path: 'Database Systems/Mocks/mock exam.pdf' },
      { name: 'mock exam - solutions (1).docx', role: 'Solutions', path: 'Database Systems/Mocks/mock exam - solutions (1).docx' },
    ],
    tips: [
      'Allow 2 hours, exam conditions — no notes',
      'Cover: SQL (joins, subqueries, GROUP BY), RA, ER diagrams, Normalisation, Transactions',
      'Write SQL by hand — no IDE autocomplete',
      'Draw precedence graphs for concurrency questions',
    ],
  },
  {
    module: 'ids',
    label: 'Introduction to Data Science',
    code: '25MAP500',
    files: [
      { name: '25MAP500 Mock Exam.pdf', role: 'Mock Exam', path: 'Intro to Data Science/Mock Exam (only Style of Questions not supplementary to Content)/25MAP500 Mock Exam.pdf' },
      { name: '25MAP500 Mock Exam Solutions.pdf', role: 'Solutions', path: 'Intro to Data Science/Mock Exam (only Style of Questions not supplementary to Content)/25MAP500 Mock Exam Solutions.pdf' },
    ],
    tips: [
      'Allow 2 hours, exam conditions — no notes',
      'Cover: R syntax, dplyr pipelines, ggplot2, summary statistics, reshaping, visualisation critique',
      'Write R code from memory — no RStudio',
      'Interpret outputs, not just write code',
    ],
  },
];

const emptyForm = {
  module: 'db',
  date: new Date().toISOString().split('T')[0],
  score: '',
  notes: '',
};

export default function MockExamsPage() {
  const [attempts, setAttempts] = useState<MockAttempt[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setAttempts(getMockAttempts());
  }, []);

  const refresh = () => setAttempts(getMockAttempts());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMockAttempt(form);
    setForm(emptyForm);
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this attempt?')) {
      deleteMockAttempt(id);
      refresh();
    }
  };

  const getAttemptsForModule = (mod: string) =>
    attempts.filter((a) => a.module === mod).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList size={28} className="text-[#3D0066]" />
          <div>
            <h1 className="text-2xl font-bold text-[#1A0033]">Mock Exams</h1>
            <p className="text-sm text-gray-500">Track your mock exam attempts and progress</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm((f) => !f)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#3D0066] text-white rounded-xl text-sm font-semibold hover:bg-[#6B0099] transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'Log Attempt'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[#3D0066]/20 p-6">
          <h3 className="font-bold text-[#1A0033] mb-4">Log Mock Attempt</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Module</label>
                <select
                  value={form.module}
                  onChange={(e) => setForm((f) => ({ ...f, module: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                >
                  <option value="db">Database Systems</option>
                  <option value="ids">Intro to Data Science</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Score (e.g. 72% or 36/50)</label>
                <input
                  type="text"
                  value={form.score}
                  onChange={(e) => setForm((f) => ({ ...f, score: e.target.value }))}
                  placeholder="72%"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Notes (topics weak on, things to review)</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                placeholder="e.g. Lost marks on correlated subqueries and BCNF decomposition. Review precedence graphs."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#3D0066] text-white rounded-xl text-sm font-semibold hover:bg-[#6B0099]"
              >
                Save Attempt
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mock exam cards */}
      {mockExams.map((exam) => {
        const examAttempts = getAttemptsForModule(exam.module);

        return (
          <div key={exam.module} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className={clsx(
              'px-6 py-4 flex items-center gap-3',
              exam.module === 'db' ? 'bg-[#3D0066]' : 'bg-amber-600',
            )}>
              <ClipboardList size={20} className="text-white" />
              <div>
                <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">{exam.code}</span>
                <h2 className="text-lg font-bold text-white">{exam.label} — Mock Exam</h2>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Files */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <FileText size={12} />
                  Exam Files
                </h3>
                <div className="space-y-2">
                  {exam.files.map((file) => (
                    <a
                      key={file.name}
                      href={`/files/${encodeURIComponent(file.path).replace(/%2F/g, '/')}`}
                      download={file.name}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-[#F8F7FF] hover:border-[#3D0066]/20 transition-all group cursor-pointer"
                    >
                      <span className={clsx(
                        'text-[10px] font-bold uppercase px-2 py-0.5 rounded shrink-0',
                        file.role === 'Solutions' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700',
                      )}>
                        {file.role}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 group-hover:text-[#3D0066]">{file.name}</p>
                        <p className="text-xs text-gray-400 uppercase">.{file.name.split('.').pop()}</p>
                      </div>
                      <Download size={14} className="text-gray-300 group-hover:text-[#3D0066] shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Exam Tips</h3>
                <ul className="space-y-1.5">
                  {exam.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#3D0066] font-bold shrink-0">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Attempts */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Attempts ({examAttempts.length})
                </h3>
                {examAttempts.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No attempts logged yet. Take the mock exam and log your score!</p>
                ) : (
                  <div className="space-y-2">
                    {examAttempts.map((attempt, idx) => (
                      <div key={attempt.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                        <div className="w-7 h-7 rounded-full bg-[#3D0066] flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-white">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-[#1A0033]">{attempt.date}</span>
                            <span className="text-lg font-bold text-[#3D0066]">{attempt.score}</span>
                          </div>
                          {attempt.notes && (
                            <p className="text-xs text-gray-500 mt-1">{attempt.notes}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(attempt.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {examAttempts.length >= 2 && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-100 text-sm">
                        <span className="font-semibold text-green-700">Progress: </span>
                        <span className="text-green-600">
                          {examAttempts[0].score} → {examAttempts[examAttempts.length - 1].score}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
