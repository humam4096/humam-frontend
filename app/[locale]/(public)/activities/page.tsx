import {setRequestLocale} from 'next-intl/server';
import ActivitiesHero from '@/components/sections/ActivitiesHero';
import ActivitiesGrid from '@/components/sections/ActivitiesGrid';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata = {
  title: 'Activities | Humam Consulting',
  description: 'Explore our portfolio of completed projects, case studies, and success stories across the food industry.',
};

export default async function ActivitiesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ActivitiesHero />
      <ActivitiesGrid />
      <FinalCTA />
    </main>
  );
}
