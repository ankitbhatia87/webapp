'use client';

import { usePathname } from 'next/navigation';
import Header from '../features/Header';
import Footer from '../features/Footer';

export default function V1Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isV2 = pathname?.startsWith('/v2');

  if (isV2) {
    // For v2 routes, render children directly without v1 header/footer
    return <>{children}</>;
  }

  // For v1 routes, render with header and footer
  return (
    <div className="w-full grid">
      <Header />
      <main id="pages" className="pt-10">{children}</main>
      <Footer />
    </div>
  );
}
