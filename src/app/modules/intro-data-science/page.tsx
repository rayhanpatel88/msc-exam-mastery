import { ModulePage } from '@/components/ModulePage';
import { introDataScienceModule } from '@/data/modules';

export default function IntroDataSciencePage() {
  return (
    <ModulePage
      module={introDataScienceModule}
      weekBaseHref="/modules/intro-data-science/week"
    />
  );
}
