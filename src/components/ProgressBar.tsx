import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  showLabel?: boolean;
  color?: 'purple' | 'gold' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  value,
  className,
  showLabel = false,
  color = 'purple',
  size = 'md',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const colorMap = {
    purple: 'bg-[#3D0066]',
    gold: 'bg-[#C8A951]',
    green: 'bg-green-500',
    red: 'bg-red-500',
  };

  const sizeMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', sizeMap[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500', colorMap[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1 text-right">{clamped}%</p>
      )}
    </div>
  );
}
