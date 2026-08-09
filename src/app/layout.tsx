import type { Metadata } from "next";
import { head } from "@vercel/blob";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import V1Chrome from "./components/V1Chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const FALLBACK_IMAGE = "https://ankitbhatia.com/assets/v2/brand/logo-mark.png";

export async function generateMetadata(): Promise<Metadata> {
  let imageUrl = FALLBACK_IMAGE;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      imageUrl = (await head("assets/v2/brand/logo-mark.png")).url;
    } catch {
      // Keep the absolute fallback when Blob is unavailable.
    }
  }

  return {
  title: "Ankit Bhatia — Staff Frontend Engineer",
  description: "Staff Frontend Engineer specializing in scalable web applications, performance optimization, and team leadership.",
  openGraph: {
    title: "Ankit Bhatia — Staff Frontend Engineer",
    description: "Staff Frontend Engineer specializing in scalable web applications, performance optimization, and team leadership.",
    url: "https://ankitbhatia.com",
    siteName: "Ankit Bhatia",
    locale: "en_US",
    images: [
      {
        url: imageUrl,
        width: 512,
        height: 512,
        alt: "Ankit Bhatia Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Bhatia — Staff Frontend Engineer",
    description: "Staff Frontend Engineer specializing in scalable web applications.",
    images: [imageUrl],
  },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <V1Chrome>{children}</V1Chrome>
        </AuthProvider>
      </body>
    </html>
  );
}
