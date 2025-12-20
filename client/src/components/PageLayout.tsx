import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SkipToContent from './SkipToContent';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
