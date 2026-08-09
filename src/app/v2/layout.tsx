import type { Metadata } from 'next';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { head } from '@vercel/blob';
import { ThreeBackground } from './components/ThreeBackground';
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

const FALLBACK_IMAGE = 'https://ankitbhatia.com/assets/v2/brand/logo-mark.png';

export async function generateMetadata(): Promise<Metadata> {
  let imageUrl = FALLBACK_IMAGE;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      imageUrl = (await head('assets/v2/brand/logo-mark.png')).url;
    } catch {
      // Keep the absolute URL fallback when Blob is unavailable.
    }
  }

  return {
  title: 'Ankit Bhatia — Staff Frontend Engineer',
  description: 'Staff Frontend Engineer specializing in scalable web applications, performance optimization, and team leadership.',
  openGraph: {
    title: 'Ankit Bhatia — Staff Frontend Engineer',
    description: 'Staff Frontend Engineer specializing in scalable web applications, performance optimization, and team leadership.',
    url: 'https://ankitbhatia.com',
    siteName: 'Ankit Bhatia',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: imageUrl,
        width: 512,
        height: 512,
        alt: 'Ankit Bhatia Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ankit Bhatia — Staff Frontend Engineer',
    description: 'Staff Frontend Engineer specializing in scalable web applications.',
    images: [imageUrl],
  },
  };
}

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} min-h-screen`}>
      {/* Fixed Three.js Constellation Background */}
      <ThreeBackground />
      
      {/* Background Effects */}
      <div className="bg-glow" />
      <div className="grain" />
      
      {children}
    </div>
  );
}
