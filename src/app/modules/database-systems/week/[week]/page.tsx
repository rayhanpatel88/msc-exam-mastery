import { WeekDetail } from '@/components/WeekDetail';
import { databaseSystemsModule } from '@/data/modules';

export function generateStaticParams() {
  return Array.from({ length: 11 }, (_, i) => ({ week: String(i + 1) }));
}

interface PageProps {
  params: Promise<{ week: string }>;
}

export default async function DBWeekPage({ params }: PageProps) {
  const { week } = await params;
  const weekNum = parseInt(week, 10);

  return (
    <WeekDetail
      module={databaseSystemsModule}
      weekNum={weekNum}
      backHref="/modules/database-systems"
      backLabel="Database Systems"
      weekBaseHref="/modules/database-systems/week"
      maxWeek={11}
      headerGradient="from-[#3D0066] to-[#6B0099]"
    />
  );
}
