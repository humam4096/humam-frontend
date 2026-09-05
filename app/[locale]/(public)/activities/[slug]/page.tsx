import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import ActivityDetailHero from '@/components/activities/ActivityDetailHero';
import ActivityGallery from '@/components/activities/ActivityGallery';
import ActivityInfo from '@/components/activities/ActivityInfo';
import RelatedActivities from '@/components/activities/RelatedActivities';
import FinalCTA from '@/components/sections/FinalCTA';
import {getAllActivitySlugs, getActivityBySlug} from '@/data/activities';

export async function generateStaticParams() {
  return getAllActivitySlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const activity = getActivityBySlug(slug);
  
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

  const activity = getActivityBySlug(slug);

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
