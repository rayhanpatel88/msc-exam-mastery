import { ModulePage } from '@/components/ModulePage';
import { databaseSystemsModule } from '@/data/modules';

export default function DatabaseSystemsPage() {
  return (
    <ModulePage
      module={databaseSystemsModule}
      weekBaseHref="/modules/database-systems/week"
    />
  );
}
