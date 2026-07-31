import type { Metadata } from 'next';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals-v2.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ankit Bhatia — Staff Frontend Engineer',
  description: 'Staff Frontend Engineer specializing in scalable web applications, performance optimization, and team leadership.',
  openGraph: {
    title: 'Ankit Bhatia — Staff Frontend Engineer',
    description: 'Staff Frontend Engineer specializing in scalable web applications, performance optimization, and team leadership.',
    url: 'https://ankitbhatia.com',
    siteName: 'Ankit Bhatia',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ankit Bhatia — Staff Frontend Engineer',
    description: 'Staff Frontend Engineer specializing in scalable web applications.',
  },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Background Effects */}
        <div className="bg-glow" />
        <div className="grain" />
        
        {children}
      </body>
    </html>
  );
}
