import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import ActivityDetailHero from '@/components/activities/ActivityDetailHero';
import ActivityGallery from '@/components/activities/ActivityGallery';
import ActivityInfo from '@/components/activities/ActivityInfo';
import RelatedActivities from '@/components/activities/RelatedActivities';
import FinalCTA from '@/components/sections/FinalCTA';

// Sample activities data - replace with actual data source
const activities = {
  'hajj-catering': {
    id: 'hajj-catering',
    title: 'Large-Scale Hajj Catering Operations',
    category: 'Operations & Catering',
    description: 'High-volume catering operations for the Hajj season with exceptional quality and safety standards. Managing thousands of meals daily with precision logistics and food safety compliance.',
    year: '2024',
    client: 'Hajj Services Provider',
    location: 'Makkah, Saudi Arabia',
    gallery: [
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj1.webp', alt: 'Hajj catering facility overview', layout: 'full' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj2.webp', alt: 'Kitchen operations', layout: 'split-left' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj3.webp', alt: 'Food preparation', layout: 'split-right' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj4.webp', alt: 'Quality control', layout: 'full' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj5.webp', alt: 'Service area', layout: 'split-left' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj6.webp', alt: 'Team coordination', layout: 'split-right' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj7.webp', alt: 'Storage facilities', layout: 'full' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj8.webp', alt: 'Distribution setup', layout: 'split-left' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj9.webp', alt: 'Meal packaging', layout: 'split-right' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj10.webp', alt: 'Final inspection', layout: 'full' as const },
      { type: 'image' as const, src: '/images/activities/hajj-humam/activity-hajj11.webp', alt: 'Delivery operations', layout: 'full' as const },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(activities).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const activity = activities[slug as keyof typeof activities];
  
  if (!activity) {
    return {
      title: 'Activity Not Found | Humam Consulting',
    };
  }

  return {
    title: `${activity.title} | Humam Consulting`,
    description: activity.description,
  };
}

export default async function ActivityDetailPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const activity = activities[slug as keyof typeof activities];

  if (!activity) {
    notFound();
  }

  return (
    <main>
      <ActivityDetailHero activity={activity} />
      <ActivityInfo activity={activity} />
      <ActivityGallery gallery={activity.gallery} />
      <RelatedActivities currentId={activity.id} />
      <FinalCTA />
    </main>
  );
}
