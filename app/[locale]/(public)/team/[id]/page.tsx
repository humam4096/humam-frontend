import {getTranslations, setRequestLocale} from 'next-intl/server';
import TeamMemberDetail from '@/components/about/TeamMemberDetail';
import {routing} from '@/i18n/routing';

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export function generateStaticParams() {
  const memberIds = ['atef', 'enas', 'alaa'];
  const params: {locale: string; id: string}[] = [];

  routing.locales.forEach((locale) => {
    memberIds.forEach((id) => {
      params.push({locale, id});
    });
  });

  return params;
}

export async function generateMetadata({params}: Props) {
  const {locale, id} = await params;
  const t = await getTranslations({locale, namespace: 'AboutPage.leadership.list'});

  return {
    title: `${t(`${id}.name`)} - Humam Consulting`,
    description: t(`${id}.role`),
  };
}

export default async function TeamMemberPage({params}: Props) {
  const {locale, id} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <TeamMemberDetail id={id} />
    </main>
  );
}
