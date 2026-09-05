import {setRequestLocale} from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import AboutSnapshot from '@/components/sections/AboutSnapshot';
import ServicesBento from '@/components/sections/ServicesBento';
import Industries from '@/components/sections/Industries';
import Challenges from '@/components/sections/Challenges';
import Experts from '@/components/sections/Experts';
import FinalCTA from '@/components/sections/FinalCTA';
import PatternDivider from '@/components/brand/PatternDivider';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <TrustBar />
      <AboutSnapshot />
      <ServicesBento />
      <Industries />
      <Challenges />
      <PatternDivider variant="zigzag" flip />
      <Experts />
      <FinalCTA />
    </main>
  );
}
