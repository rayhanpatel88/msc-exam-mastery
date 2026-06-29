'use client';

import { clsx } from 'clsx';
import { MasteryStatus, Tier, Topic } from '@/data/modules';
import { MasteryBadge } from './MasteryBadge';

interface TopicCardProps {
  topic: Topic;
  onStatusChange?: (topicId: string, status: MasteryStatus) => void;
  currentStatus?: MasteryStatus;
}

const tierConfig: Record<Tier, { label: string; className: string }> = {
  1: { label: 'Tier 1 — Core', className: 'bg-red-100 text-red-700 border-red-200' },
  2: { label: 'Tier 2 — Important', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  3: { label: 'Tier 3 — Context', className: 'bg-green-100 text-green-700 border-green-200' },
};

const statusOptions: MasteryStatus[] = [
  'not-started',
  'read',
  'practised',
  'redone',
  'mock-tested',
  'mastered',
];

const statusLabels: Record<MasteryStatus, string> = {
  'not-started': 'Not Started',
  read: 'Read',
  practised: 'Practised',
  redone: 'Redone',
  'mock-tested': 'Mock Tested',
  mastered: 'Mastered',
};

export function TopicCard({ topic, onStatusChange, currentStatus }: TopicCardProps) {
  const status = currentStatus ?? topic.status;
  const tierInfo = tierConfig[topic.tier];
  const isMastered = status === 'mastered';

  return (
    <div
      className={clsx(
        'bg-white rounded-lg border p-4 transition-all hover:shadow-md',
        isMastered ? 'border-green-300 bg-green-50/30' : 'border-gray-200',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={clsx(
                'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
                tierInfo.className,
              )}
            >
              {tierInfo.label}
            </span>
            <MasteryBadge status={status} />
          </div>
          <h3 className="font-semibold text-[#1A0033] text-sm mt-1">{topic.title}</h3>
          {topic.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{topic.description}</p>
          )}
        </div>
      </div>

      {onStatusChange && (
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-600 mb-1">Update status:</label>
          <select
            value={status}
            onChange={(e) => onStatusChange(topic.id, e.target.value as MasteryStatus)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#3D0066] focus:border-transparent"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
