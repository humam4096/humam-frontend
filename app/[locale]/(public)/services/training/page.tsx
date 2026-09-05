import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import ServicesHero from '@/components/services/ServicesHero';
import TrainingPrograms from '@/components/services/TrainingPrograms';
import PatternDivider from '@/components/brand/PatternDivider';

export const metadata = {
  title: 'Training & Development | Humam Consulting',
  description: 'Specialized culinary and operational training programs for the food industry.',
};

function TrainingContent() {
  const t = useTranslations('TrainingPage');

  return (
    <>
      <ServicesHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        gradient="mustard"
      />

      <PatternDivider variant="zigzag" />
      <TrainingPrograms 
        eyebrow={t('intro.eyebrow')}
        heading={t('intro.heading')}
        description={t('intro.description')}
      />
    </>
  );
}

export default async function TrainingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <TrainingContent />
    </main>
  );
}
