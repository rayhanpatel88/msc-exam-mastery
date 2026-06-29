import { WeekDetail } from '@/components/WeekDetail';
import { introDataScienceModule } from '@/data/modules';

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ week: String(i + 1) }));
}

interface PageProps {
  params: Promise<{ week: string }>;
}

export default async function IDSWeekPage({ params }: PageProps) {
  const { week } = await params;
  const weekNum = parseInt(week, 10);

  return (
    <WeekDetail
      module={introDataScienceModule}
      weekNum={weekNum}
      backHref="/modules/intro-data-science"
      backLabel="Intro to Data Science"
      weekBaseHref="/modules/intro-data-science/week"
      maxWeek={10}
      headerGradient="from-amber-600 to-amber-500"
    />
  );
}
