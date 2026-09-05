import {ReactNode} from 'react';
import Navbar from '@/components/layout/Navbar';
import ConditionalFooter from '@/components/layout/ConditionalFooter';

export default function PublicLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
      <ConditionalFooter />
    </>
  );
}
