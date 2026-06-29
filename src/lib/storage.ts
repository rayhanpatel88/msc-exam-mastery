'use client';

import { MasteryStatus } from '@/data/modules';

export interface ErrorEntry {
  id: string;
  date: string;
  module: string;
  topic: string;
  question: string;
  mistake: string;
  correctRule: string;
  redoDate: string;
  fixed: boolean;
}

export interface MockAttempt {
  id: string;
  module: string;
  date: string;
  score: string;
  notes: string;
}

const PROGRESS_KEY = 'exam_mastery_progress';
const ERROR_LOG_KEY = 'exam_mastery_errors';
const MOCK_ATTEMPTS_KEY = 'exam_mastery_mocks';

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function getProgress(): Record<string, MasteryStatus> {
  if (!isClient()) return {};
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (!stored) return {};
    return JSON.parse(stored) as Record<string, MasteryStatus>;
  } catch {
    return {};
  }
}

export function setProgress(topicId: string, status: MasteryStatus): void {
  if (!isClient()) return;
  try {
    const current = getProgress();
    current[topicId] = status;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  } catch {
    // ignore storage errors
  }
}

export function clearProgress(): void {
  if (!isClient()) return;
  localStorage.removeItem(PROGRESS_KEY);
}

export function getErrorLog(): ErrorEntry[] {
  if (!isClient()) return [];
  try {
    const stored = localStorage.getItem(ERROR_LOG_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as ErrorEntry[];
  } catch {
    return [];
  }
}

export function addErrorEntry(entry: Omit<ErrorEntry, 'id'>): void {
  if (!isClient()) return;
  try {
    const log = getErrorLog();
    const newEntry: ErrorEntry = {
      ...entry,
      id: `err-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    log.push(newEntry);
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(log));
  } catch {
    // ignore
  }
}

export function updateErrorEntry(id: string, updates: Partial<ErrorEntry>): void {
  if (!isClient()) return;
  try {
    const log = getErrorLog();
    const idx = log.findIndex((e) => e.id === id);
    if (idx !== -1) {
      log[idx] = { ...log[idx], ...updates };
      localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(log));
    }
  } catch {
    // ignore
  }
}

export function deleteErrorEntry(id: string): void {
  if (!isClient()) return;
  try {
    const log = getErrorLog().filter((e) => e.id !== id);
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(log));
  } catch {
    // ignore
  }
}

export function getMockAttempts(): MockAttempt[] {
  if (!isClient()) return [];
  try {
    const stored = localStorage.getItem(MOCK_ATTEMPTS_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as MockAttempt[];
  } catch {
    return [];
  }
}

export function addMockAttempt(attempt: Omit<MockAttempt, 'id'>): void {
  if (!isClient()) return;
  try {
    const attempts = getMockAttempts();
    const newAttempt: MockAttempt = {
      ...attempt,
      id: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    attempts.push(newAttempt);
    localStorage.setItem(MOCK_ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch {
    // ignore
  }
}

export function deleteMockAttempt(id: string): void {
  if (!isClient()) return;
  try {
    const attempts = getMockAttempts().filter((a) => a.id !== id);
    localStorage.setItem(MOCK_ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch {
    // ignore
  }
}
