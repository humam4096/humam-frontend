// Types
export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  layout: 'full' | 'split-left' | 'split-right';
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  client: string;
  location: string;
  image?: string;
  blurDataURL?: string;
  slug: string;
  featured?: boolean;
  gallery: GalleryItem[];
}

export interface ActivityListItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  blurDataURL?: string;
  slug: string;
  featured?: boolean;
}

// Blur placeholder for images (neutral gray shimmer effect)
const DEFAULT_BLUR_DATA_URL = 
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';

// Activities Data
export const activities: Record<string, Activity> = {
  'hajj-catering': {
    id: 'hajj-catering',
    title: 'Large-Scale Hajj Catering Operations',
    category: 'Operations & Catering',
    description: 'High-volume catering operations for the Hajj season with exceptional quality and safety standards. Managing thousands of meals daily with precision logistics and food safety compliance.',
    year: '2024',
    client: 'Hajj Services Provider',
    location: 'Makkah, Saudi Arabia',
    slug: 'hajj-catering',
    image: '/images/activities/hajj-humam/activity-hajj8.webp',
    blurDataURL: DEFAULT_BLUR_DATA_URL,
    featured: true,
    gallery: [
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj1.webp', alt: 'Hajj catering facility overview', layout: 'full' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj2.webp', alt: 'Kitchen operations', layout: 'split-left' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj3.webp', alt: 'Food preparation', layout: 'split-right' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj4.webp', alt: 'Quality control', layout: 'full' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj5.webp', alt: 'Service area', layout: 'split-left' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj6.webp', alt: 'Team coordination', layout: 'split-right' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj7.webp', alt: 'Storage facilities', layout: 'full' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj8.webp', alt: 'Distribution setup', layout: 'split-left' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj9.webp', alt: 'Meal packaging', layout: 'split-right' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj10.webp', alt: 'Final inspection', layout: 'full' },
      { type: 'image', src: '/images/activities/hajj-humam/activity-hajj11.webp', alt: 'Delivery operations', layout: 'full' },
    ],
  },
  'jada-thoon': {
    id: 'jada-thoon',
    title: 'THOON Catering Services',
    category: 'Catering & Food Services',
    description: 'Specialized catering services providing high-quality meals and comprehensive food support for the Chefs of the Guests of Allah, with a strong focus on quality, food safety, operational efficiency, and reliable service.',
    year: '2024',
    client: 'THOON Catering',
    location: 'Makkah, Saudi Arabia',
    slug: 'jada-thoon',
    image: '/images/activities/jada-hakathon/jada-hakathon6.webp',
    blurDataURL: DEFAULT_BLUR_DATA_URL,
    gallery: [
      { type: 'image', src: '/images/activities/jada-hakathon/jada-hakathon6.webp', alt: 'Delivery operations', layout: 'full' },
      { type: 'image', src: '/images/activities/jada-hakathon/jada-hakathon7.webp', alt: 'Service area', layout: 'split-left' },
      { type: 'image', src: '/images/activities/jada-hakathon/jada-hakathon1.webp', alt: 'Team coordination', layout: 'split-right' },
      { type: 'image', src: '/images/activities/jada-hakathon/jada-hakathon2.webp', alt: 'Storage facilities', layout: 'full' },
      { type: 'image', src: '/images/activities/jada-hakathon/jada-hakathon3.webp', alt: 'Distribution setup', layout: 'split-left' },
      { type: 'image', src: '/images/activities/jada-hakathon/jada-hakathon4.webp', alt: 'Meal packaging', layout: 'split-right' },
      { type: 'image', src: '/images/activities/jada-hakathon/jada-hakathon5.webp', alt: 'Final inspection', layout: 'full' },
    ],
  },
};

// Helper Functions
export const getAllActivitySlugs = (): string[] => {
  return Object.keys(activities);
};

export const getActivityBySlug = (slug: string): Activity | undefined => {
  return activities[slug];
};

export const getAllActivities = (): Activity[] => {
  return Object.values(activities);
};

export const getActivityListItems = (): ActivityListItem[] => {
  return getAllActivities().map(activity => ({
    id: activity.id,
    title: activity.title,
    category: activity.category,
    description: activity.description,
    image: activity.image || activity.gallery[0]?.src || '',
    blurDataURL: activity.blurDataURL,
    slug: activity.slug,
    featured: activity.featured,
  }));
};

export const getRelatedActivities = (currentId: string, limit: number = 2): Activity[] => {
  return getAllActivities()
    .filter(activity => activity.id !== currentId)
    .slice(0, limit);
};
