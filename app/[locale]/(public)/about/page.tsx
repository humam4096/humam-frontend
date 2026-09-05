import {setRequestLocale} from 'next-intl/server';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import VisionMission from '@/components/about/VisionMission';
import Values from '@/components/about/Values';
import Commitment from '@/components/about/Commitment';
import Leadership from '@/components/about/Leadership';
import QualityCommitment from '@/components/about/QualityCommitment';
import FinalCTA from '@/components/sections/FinalCTA';
import PatternDivider from '@/components/brand/PatternDivider';


export const metadata = {
  title: 'About Us | Humam Consulting',
  description: 'Learn about Humam — expert consultancy, quality assurance, and training for the food industry.',
};

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <AboutHero />
      <OurStory />
      {/* <PatternDivider variant="zigzag" /> */}
      <VisionMission />
      <Values />
      {/* <PatternDivider variant="clover" flip /> */}
      <Commitment />
      <Leadership />
      <PatternDivider variant="zigzag" />
      <QualityCommitment />
      <FinalCTA />
    </main>
  );
}
