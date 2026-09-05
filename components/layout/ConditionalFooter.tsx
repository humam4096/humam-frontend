'use client';

import { usePathname } from 'next/navigation';

import Footer from './Footer';

export default function ConditionalFooter() {

  const pathname = usePathname();

  const hiddenRoutes = ['/dashboard', '/login'];

  const hideFooter = hiddenRoutes.some((route) =>

    pathname?.includes(route)

  );

  return hideFooter ? null : <Footer />;

}