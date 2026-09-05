import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceDetailSection from '@/components/services/ServiceDetailSection';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata = {
  title: 'Consultancy & Business Development | Humam Consulting',
  description: 'Strategic planning, menu design, operational excellence, and end-to-end food business consultancy.',
};

const offeringKeys = ['office', 'field', 'menu', 'project', 'operational', 'sustainability', 'cost', 'calorie'] as const;

function ConsultancyContent() {
  const t = useTranslations('ConsultancyPage');

  const detailItems = offeringKeys.map((key) => ({
    title: t(`offerings.${key}.title`),
    desc: t(`offerings.${key}.desc`),
    included: t(`offerings.${key}.included`),
  }));

  return (
    <>
      <ServicesHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        gradient="burgundy"
      />
      {/* <PatternDivider variant="zigzag" /> */}
      <ServiceDetailSection
        eyebrow={t('intro.eyebrow')}
        heading={t('intro.heading')}
        description={t('intro.description')}
        items={detailItems}
        accent="var(--color-brand-red)"
      />
      <FinalCTA />
    </>
  );
}

export default async function ConsultancyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ConsultancyContent />
    </main>
  );
}
