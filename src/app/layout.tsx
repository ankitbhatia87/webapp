import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./features/Header";
import Footer from "./features/Footer";
import AuthProvider from "./components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ankit Bhatia - Frontend Engineer",
  description: "Portfolio website of Ankit Bhatia - Frontend Engineer with 15+ years of experience",
  openGraph: {
    title: "Ankit Bhatia Profile",
    description: "15 years work-ex | ReactJS | Javascript | Tech Lead",
    url: "https://www.ankitbhatia.com",
    images: [
      {
        url: "https://i.postimg.cc/j5YDx7hf/whatsapp-link-preview.jpg",
        alt: "Ankit Bhatia Profile",
      },
    ],
    type: "website",
  },
};

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
          <div className="w-full grid">
            <Header />
            <main id="pages" className="pt-10">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
