import {setRequestLocale} from 'next-intl/server';
import TrainingCenterHero from '@/components/sections/TrainingCenterHero';

export default async function TrainingCenterPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <TrainingCenterHero />
    </main>
  );
}
