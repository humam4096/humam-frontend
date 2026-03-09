import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import ServicesHero from '@/components/services/ServicesHero';
import QualityStandards from '@/components/services/QualityStandards';
import PatternDivider from '@/components/brand/PatternDivider';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata = {
  title: 'Quality & Food Safety | Humam Consulting',
  description: 'ISO 9001, ISO 22000, HACCP, and GMP certification systems for the food industry.',
};


function QualityContent() {
  const t = useTranslations('QualityPage');

  return (
    <>
      <ServicesHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        gradient="green"
      />
      <PatternDivider variant="zigzag" />
      <QualityStandards 
        eyebrow={t('intro.eyebrow')}
        heading={t('intro.heading')}
        description={t('intro.description')}
      />
      <FinalCTA />
    </>
  );
}

export default async function QualityPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <QualityContent />
    </main>
  );
}
