import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Outfit, Inter, Tajawal} from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata = {
  title: 'Humam Consulting | Expert Quality Assurance & Training',
  description: 'Humam Consulting delivers premium expertise in food safety, quality assurance, facility design, and specialized corporate training across the Middle East.',
  keywords: ['Humam Consulting', 'Food Safety', 'Quality Assurance', 'Facility Design', 'Corporate Training', 'ISO Certifications', 'Saudi Arabia Consulting'],
  icons: {
    icon: '/images/brand/Humam-Logo-Short.svg',
    shortcut: '/images/brand/Humam-Logo-Short.svg',
    apple: '/images/brand/Humam-Logo-Short.svg',
  },
  openGraph: {
    title: 'Humam Consulting | Expert Quality Assurance',
    description: 'Premium expertise in food safety, quality assurance, facility design, and specialized training.',
    url: 'https://humamconsulting.com',
    siteName: 'Humam Consulting',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Humam Consulting',
    description: 'Expert consultancy and quality assurance for the food industry.',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className={`${inter.variable} ${outfit.variable} ${tajawal.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
