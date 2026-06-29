'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addMockAttempt,
  deleteMockAttempt,
  getMockAttempts,
  MockAttempt,
} from '@/lib/storage';
import {
  buildExamText,
  examinerReports,
  ExamDifficulty,
  ExamModule,
  generatedMockExams,
  GeneratedExam,
} from '@/data/generatedMockExams';
import {
  ClipboardCheck,
  ClipboardList,
  Copy,
  Download,
  FileText,
  Plus,
  Printer,
  Trash2,
  X,
} from 'lucide-react';
import { clsx } from 'clsx';

const moduleLabels: Record<ExamModule | 'all', string> = {
  all: 'All modules',
  db: 'Database Systems',
  ids: 'Intro to Data Science',
};

const difficultyLabels: (ExamDifficulty | 'all')[] = [
  'all',
  'Foundation',
  'Exam Standard',
  'Distinction Challenge',
];

const officialFiles = [
  {
    module: 'db',
    label: 'Database Systems',
    code: '25COP502',
    files: [
      { name: 'mock exam.pdf', role: 'Mock Exam', path: 'Database Systems/Mocks/mock exam.pdf' },
      { name: 'mock exam - solutions (1).docx', role: 'Solutions', path: 'Database Systems/Mocks/mock exam - solutions (1).docx' },
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
  },
];

const emptyForm = {
  module: 'db',
  date: new Date().toISOString().split('T')[0],
  score: '',
  notes: '',
};

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function downloadText(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function buildDocHtml(exam: GeneratedExam, includeAnswers: boolean) {
  const escaped = buildExamText(exam, includeAnswers)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${exam.title}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.45; color: #1A0033; }
    pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
  </style>
</head>
<body><pre>${escaped}</pre></body>
</html>`;
}

export default function MockExamsPage() {
  const [attempts, setAttempts] = useState<MockAttempt[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [moduleFilter, setModuleFilter] = useState<ExamModule | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<ExamDifficulty | 'all'>('all');
  const [selectedExamId, setSelectedExamId] = useState(generatedMockExams[0].id);
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setAttempts(getMockAttempts()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredExams = useMemo(() => {
    return generatedMockExams.filter((exam) => {
      const moduleOk = moduleFilter === 'all' || exam.module === moduleFilter;
      const difficultyOk = difficultyFilter === 'all' || exam.difficulty === difficultyFilter;
      return moduleOk && difficultyOk;
    });
  }, [moduleFilter, difficultyFilter]);

  const visibleSelectedExamId = filteredExams.some((exam) => exam.id === selectedExamId)
    ? selectedExamId
    : filteredExams[0]?.id ?? generatedMockExams[0].id;
  const selectedExam = generatedMockExams.find((exam) => exam.id === visibleSelectedExamId) ?? generatedMockExams[0];
  const examText = buildExamText(selectedExam, showAnswers);

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(examText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <ClipboardList size={28} className="mt-1 text-[#3D0066]" />
          <div>
            <h1 className="text-2xl font-bold text-[#1A0033]">Mock Exams</h1>
            <p className="max-w-3xl text-sm text-gray-600">
              Generated unseen-style mock papers from the uploaded Database Systems and Introduction to Data Science material, with mark schemes, examiner notes and revision mapping.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm((f) => !f)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#3D0066] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6B0099]"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'Log Attempt'}
        </button>
      </div>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {[
          ['30', 'generated papers'],
          ['15', 'Database Systems'],
          ['15', 'Intro Data Science'],
          ['3', 'difficulty bands'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-2xl font-bold text-[#3D0066]">{value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</div>
          </div>
        ))}
      </section>

      {showForm && (
        <section className="rounded-lg border border-[#3D0066]/20 bg-white p-5">
          <h2 className="mb-4 font-bold text-[#1A0033]">Log Mock Attempt</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-600">Module</span>
                <select
                  value={form.module}
                  onChange={(e) => setForm((f) => ({ ...f, module: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                >
                  <option value="db">Database Systems</option>
                  <option value="ids">Intro to Data Science</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-600">Date</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-600">Score</span>
                <input
                  type="text"
                  value={form.score}
                  onChange={(e) => setForm((f) => ({ ...f, score: e.target.value }))}
                  placeholder="72%"
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-600">Notes</span>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                placeholder="Topics to revisit, errors made, timing issues."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D0066]"
              />
            </label>
            <button type="submit" className="rounded-lg bg-[#3D0066] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6B0099]">
              Save Attempt
            </button>
          </form>
        </section>
      )}

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">Exam Bank</h2>
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-500">Module</span>
                <select
                  value={moduleFilter}
                  onChange={(e) => setModuleFilter(e.target.value as ExamModule | 'all')}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {Object.entries(moduleLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-500">Difficulty</span>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as ExamDifficulty | 'all')}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {difficultyLabels.map((value) => (
                    <option key={value} value={value}>{value === 'all' ? 'All difficulties' : value}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-4 max-h-[540px] space-y-2 overflow-auto pr-1">
              {filteredExams.map((exam) => (
                <button
                  key={exam.id}
                  onClick={() => setSelectedExamId(exam.id)}
                  className={clsx(
                    'w-full rounded-lg border p-3 text-left transition-colors',
                    selectedExam.id === exam.id
                      ? 'border-[#3D0066] bg-[#F8F7FF]'
                      : 'border-gray-200 bg-white hover:border-[#3D0066]/40 hover:bg-gray-50',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[#1A0033]">{exam.title}</span>
                    <span className={clsx(
                      'rounded px-1.5 py-0.5 text-[10px] font-bold uppercase',
                      exam.module === 'db' ? 'bg-[#3D0066]/10 text-[#3D0066]' : 'bg-amber-100 text-amber-800',
                    )}>
                      {exam.module.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{exam.difficulty} · {exam.scenario}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500">
              <ClipboardCheck size={15} />
              Attempts
            </h2>
            {(['db', 'ids'] as const).map((mod) => {
              const moduleAttempts = getAttemptsForModule(mod);
              return (
                <div key={mod} className="mb-4 last:mb-0">
                  <div className="mb-2 text-xs font-bold text-[#1A0033]">{moduleLabels[mod]}</div>
                  {moduleAttempts.length === 0 ? (
                    <p className="text-xs text-gray-400">No attempts logged yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {moduleAttempts.map((attempt) => (
                        <div key={attempt.id} className="flex items-start gap-2 rounded-lg bg-gray-50 p-2">
                          <div className="flex-1">
                            <div className="text-xs font-bold text-[#1A0033]">{attempt.date} · {attempt.score}</div>
                            {attempt.notes && <div className="mt-0.5 text-xs text-gray-500">{attempt.notes}</div>}
                          </div>
                          <button onClick={() => handleDelete(attempt.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <main className="space-y-4">
          <section className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500">{selectedExam.code} · {selectedExam.difficulty}</div>
                <h2 className="text-xl font-bold text-[#1A0033]">{selectedExam.title}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  {selectedExam.duration} · {selectedExam.totalMarks} marks · {selectedExam.scenario}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowAnswers((value) => !value)}
                  className={clsx(
                    'rounded-lg px-3 py-2 text-sm font-semibold',
                    showAnswers ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  )}
                >
                  {showAnswers ? 'Mark Scheme On' : 'Show Mark Scheme'}
                </button>
                <button onClick={handleCopy} className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">
                  <Copy size={15} />
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={() => downloadText(`${slug(selectedExam.title)}${showAnswers ? '-mark-scheme' : ''}.txt`, examText)}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                >
                  <Download size={15} />
                  TXT
                </button>
                <button
                  onClick={() => downloadText(`${slug(selectedExam.title)}${showAnswers ? '-mark-scheme' : ''}.doc`, buildDocHtml(selectedExam, showAnswers), 'application/msword;charset=utf-8')}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                >
                  <FileText size={15} />
                  DOC
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-2 rounded-lg bg-[#3D0066] px-3 py-2 text-sm font-semibold text-white hover:bg-[#6B0099]">
                  <Printer size={15} />
                  Print/PDF
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-5">
              {selectedExam.questions.map((question, qIndex) => (
                <article key={question.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-bold text-[#1A0033]">Question {qIndex + 1}: {question.title}</h3>
                      <p className="mt-1 text-sm text-gray-700">{question.context}</p>
                    </div>
                    <span className="shrink-0 rounded bg-[#3D0066]/10 px-2 py-1 text-xs font-bold text-[#3D0066]">{question.marks} marks</span>
                  </div>
                  <div className="mt-4 space-y-4">
                    {question.subQuestions.map((part) => (
                      <div key={part.label} className="border-t border-gray-100 pt-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-[#1A0033]">({part.label}) {part.prompt}</p>
                          <span className="shrink-0 text-xs font-bold text-gray-500">{part.marks} marks</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-600">{part.topic}</span>
                          <span className="rounded bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-800">{part.learningOutcome}</span>
                        </div>
                        {showAnswers && (
                          <div className="mt-3 space-y-3 rounded-lg bg-[#F8F7FF] p-3 text-sm">
                            <div>
                              <div className="mb-1 text-xs font-bold uppercase tracking-wide text-[#3D0066]">Model Answer</div>
                              <pre className="whitespace-pre-wrap font-sans text-gray-800">{part.modelAnswer}</pre>
                            </div>
                            {part.alternativeAnswers?.length ? (
                              <p><span className="font-semibold">Alternative valid answers:</span> {part.alternativeAnswers.join(' ')}</p>
                            ) : null}
                            <p><span className="font-semibold">Common mistakes:</span> {part.commonMistakes.join(' ')}</p>
                            <p><span className="font-semibold">Examiner comment:</span> {part.examinerComment}</p>
                            {part.highDistinction && <p><span className="font-semibold">High distinction:</span> {part.highDistinction}</p>}
                          </div>
                        )}
                        <p className="mt-2 text-xs text-gray-500"><span className="font-semibold">Revision map:</span> {part.sourceMap}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {examinerReports.map((report) => (
              <div key={report.title} className="rounded-lg border border-gray-200 bg-white p-4">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#3D0066]">{report.title}</h2>
                <ul className="space-y-2">
                  {report.points.map((point) => (
                    <li key={point} className="text-sm text-gray-700">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">Official Mock References</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {officialFiles.map((exam) => (
                <div key={exam.module} className="rounded-lg border border-gray-100 p-3">
                  <div className="mb-2 text-sm font-bold text-[#1A0033]">{exam.code} · {exam.label}</div>
                  <div className="space-y-2">
                    {exam.files.map((file) => (
                      <a
                        key={file.name}
                        href={`/files/${encodeURIComponent(file.path).replace(/%2F/g, '/')}`}
                        download={file.name}
                        className="flex items-center gap-2 rounded bg-gray-50 p-2 text-sm text-gray-700 hover:bg-[#F8F7FF]"
                      >
                        <FileText size={14} />
                        <span className="flex-1 truncate">{file.role}: {file.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </section>
    </div>
  );
}
