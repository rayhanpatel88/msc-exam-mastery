'use client';

import { useEffect, useState } from 'react';
import {
  getErrorLog,
  addErrorEntry,
  updateErrorEntry,
  deleteErrorEntry,
  ErrorEntry,
} from '@/lib/storage';
import { AlertTriangle, Plus, Check, Trash2, Filter, X } from 'lucide-react';
import { clsx } from 'clsx';

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  module: 'db',
  topic: '',
  question: '',
  mistake: '',
  correctRule: '',
  redoDate: '',
  fixed: false,
};

export default function ErrorLogPage() {
  const [entries, setEntries] = useState<ErrorEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [moduleFilter, setModuleFilter] = useState<'all' | 'db' | 'ids'>('all');
  const [fixedFilter, setFixedFilter] = useState<'all' | 'unfixed' | 'fixed'>('all');

  useEffect(() => {
    setEntries(getErrorLog());
  }, []);

  const refreshEntries = () => setEntries(getErrorLog());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addErrorEntry(form);
    setForm(emptyForm);
    setShowForm(false);
    refreshEntries();
  };

  const handleFix = (id: string) => {
    updateErrorEntry(id, { fixed: true });
    refreshEntries();
  };

  const handleUnfix = (id: string) => {
    updateErrorEntry(id, { fixed: false });
    refreshEntries();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this error log entry?')) {
      deleteErrorEntry(id);
      refreshEntries();
    }
  };

  const filtered = entries.filter((e) => {
    if (moduleFilter !== 'all' && e.module !== moduleFilter) return false;
    if (fixedFilter === 'fixed' && !e.fixed) return false;
    if (fixedFilter === 'unfixed' && e.fixed) return false;
    return true;
  });

  const unfixedCount = entries.filter((e) => !e.fixed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle size={28} className="text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-[#1A0033]">Error Log</h1>
            <p className="text-sm text-gray-500">Track mistakes and review them systematically</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm((f) => !f)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#3D0066] text-white rounded-xl text-sm font-semibold hover:bg-[#6B0099] transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'Add Error'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-[#1A0033]">{entries.length}</p>
          <p className="text-xs text-gray-500">Total entries</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-100 p-4 text-center">
          <p className="text-3xl font-bold text-red-600">{unfixedCount}</p>
          <p className="text-xs text-gray-500">Unfixed</p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-100 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{entries.length - unfixedCount}</p>
          <p className="text-xs text-gray-500">Fixed</p>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[#3D0066]/20 p-6">
          <h3 className="font-bold text-[#1A0033] mb-4">Add New Error Entry</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="block text-xs font-semibold text-gray-600 mb-1">Topic</label>
                <input
                  type="text"
                  value={form.topic}
                  onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                  placeholder="e.g. BCNF, GROUP BY..."
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Question / Task</label>
              <textarea
                value={form.question}
                onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                rows={2}
                placeholder="What was the question or task you got wrong?"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Your Mistake</label>
                <textarea
                  value={form.mistake}
                  onChange={(e) => setForm((f) => ({ ...f, mistake: e.target.value }))}
                  rows={2}
                  placeholder="What did you get wrong or forget?"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Correct Rule / Answer</label>
                <textarea
                  value={form.correctRule}
                  onChange={(e) => setForm((f) => ({ ...f, correctRule: e.target.value }))}
                  rows={2}
                  placeholder="What is the correct rule, formula, or answer?"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                />
              </div>
            </div>

            <div className="md:w-1/3">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Redo Date</label>
              <input
                type="date"
                value={form.redoDate}
                onChange={(e) => setForm((f) => ({ ...f, redoDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#3D0066] text-white rounded-xl text-sm font-semibold hover:bg-[#6B0099] transition-colors"
              >
                Add to Log
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
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#3D0066]',
            )}
          >
            {f === 'all' ? 'All' : f === 'db' ? 'DB Systems' : 'IDS'}
          </button>
        ))}
        <span className="ml-2 text-xs text-gray-500 font-medium">Status:</span>
        {(['all', 'unfixed', 'fixed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFixedFilter(f)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize',
              fixedFilter === f
                ? 'bg-[#3D0066] text-white border-[#3D0066]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#3D0066]',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          {entries.length === 0 ? (
            <>
              <AlertTriangle size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No errors logged yet.</p>
              <p className="text-sm text-gray-300 mt-1">Add your first error entry when you get something wrong in practice.</p>
            </>
          ) : (
            <p className="text-gray-400">No entries match the current filters.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className={clsx(
                'bg-white rounded-xl border p-4 transition-all',
                entry.fixed ? 'border-green-200 bg-green-50/20' : 'border-red-100',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-xs text-gray-400">{entry.date}</span>
                    <span className={clsx(
                      'text-[10px] font-bold uppercase px-2 py-0.5 rounded',
                      entry.module === 'db' ? 'bg-[#3D0066]/10 text-[#3D0066]' : 'bg-amber-100 text-amber-700',
                    )}>
                      {entry.module === 'db' ? 'DB Systems' : 'IDS'}
                    </span>
                    <span className="text-xs font-semibold text-gray-700">{entry.topic}</span>
                    {entry.fixed && (
                      <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded">✓ Fixed</span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Q: </span>
                      <span className="text-gray-600">{entry.question}</span>
                    </div>
                    <div className="bg-red-50 rounded-lg p-2.5">
                      <span className="font-semibold text-red-700 text-xs">Mistake: </span>
                      <span className="text-red-600 text-xs">{entry.mistake}</span>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2.5">
                      <span className="font-semibold text-green-700 text-xs">Correct: </span>
                      <span className="text-green-700 text-xs">{entry.correctRule}</span>
                    </div>
                    {entry.redoDate && (
                      <p className="text-xs text-gray-400">Redo by: {entry.redoDate}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!entry.fixed ? (
                    <button
                      onClick={() => handleFix(entry.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-600 border border-green-200 text-xs font-semibold hover:bg-green-100 transition-colors"
                    >
                      <Check size={12} />
                      Mark Fixed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnfix(entry.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-500 border border-gray-200 text-xs hover:bg-gray-100 transition-colors"
                    >
                      Undo
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
