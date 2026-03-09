import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceBlock from '@/components/services/ServiceBlock';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata = {
  title: 'Services | Humam Consulting',
  description: 'Expert consultancy, quality systems, and training programs for the food industry.',
};

function ServicesContent() {
  const t = useTranslations('ServicesPage');

  const consultancyBenefits = t('consultancy.benefits').split(', ').slice(0, 3);
  const qualityBenefits = t('quality.benefits').split(', ').slice(0, 3);
  const trainingBenefits = t('training.benefits').split(', ').slice(0, 3);

  return (
    <>
      <ServicesHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        gradient="olive"
      />
      <ServiceBlock
        number={t('consultancy.number')}
        eyebrow={t('consultancy.eyebrow')}
        title={t('consultancy.title')}
        description={t('consultancy.description')}
        body={t('consultancy.body')}
        cta={t('consultancy.cta')}
        href="/services/consultancy"
        benefits={consultancyBenefits}
        imageSrc="/images/services/business_dev_img.avif"
        imageAlt={t('consultancy.title')}
        accent="green"
      />
      <ServiceBlock
        number={t('quality.number')}
        eyebrow={t('quality.eyebrow')}
        title={t('quality.title')}
        description={t('quality.description')}
        body={t('quality.body')}
        cta={t('quality.cta')}
        href="/services/quality"
        benefits={qualityBenefits}
        imageSrc="/images/services/quality.svg"
        imageAlt={t('quality.title')}
        accent="burgundy"
        reverse
      />
      <ServiceBlock
        number={t('training.number')}
        eyebrow={t('training.eyebrow')}
        title={t('training.title')}
        description={t('training.description')}
        body={t('training.body')}
        cta={t('training.cta')}
        href="/services/training"
        benefits={trainingBenefits}
        imageSrc="/images/services/training.svg"
        imageAlt={t('training.title')}
        accent="mustard"
      />
      <FinalCTA />
    </>
  );
}

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ServicesContent />
    </main>
  );
}
