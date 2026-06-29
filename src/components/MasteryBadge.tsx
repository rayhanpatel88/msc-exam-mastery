import { clsx } from 'clsx';
import { MasteryStatus } from '@/data/modules';

interface MasteryBadgeProps {
  status: MasteryStatus;
  className?: string;
}

const statusConfig: Record<MasteryStatus, { label: string; className: string }> = {
  'not-started': { label: 'Not Started', className: 'bg-gray-100 text-gray-600 border-gray-200' },
  read: { label: 'Read', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  practised: { label: 'Practised', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  redone: { label: 'Redone', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  'mock-tested': { label: 'Mock Tested', className: 'bg-purple-100 text-purple-700 border-purple-200' },
  mastered: { label: '✓ Mastered', className: 'bg-green-100 text-green-700 border-green-200' },
};

export function MasteryBadge({ status, className }: MasteryBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

export { statusConfig };
