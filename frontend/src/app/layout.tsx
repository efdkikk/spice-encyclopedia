import React from 'react';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Providers } from '~/providers';
import { i18n } from '~/i18n';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import '~/styles/globals.css';
import '~/styles/fonts.css';
import '~/styles/animations.css';
import '~/styles/custom-cursor.css';
import '~/styles/scrollbar.css';
import '~/styles/accessibility.css';

// Define font settings
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Set site URL based on environment
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Define metadata for the application
export const metadata: Metadata = {
  title: {
    default: 'Spice Encyclopedia | 香料百科',
    template: '%s | Spice Encyclopedia',
  },
  description: 'Explore the fascinating world of spices with detailed information, user reviews, and educational articles.',
  keywords: ['spices', 'encyclopedia', 'cooking', 'culinary', 'herbs', 'flavor', 'recipes'],
  authors: [{ name: 'Spice Encyclopedia Team', url: SITE_URL }],
  creator: 'Spice Encyclopedia Team',
  publisher: 'Spice Encyclopedia',
  alternates: {
    canonical: SITE_URL,
    languages: i18n.locales.reduce((acc, locale) => {
      acc[locale] = `${SITE_URL}/${locale}`;
      return acc;
    }, {} as Record<string, string>),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Spice Encyclopedia | 香料百科',
    description: 'Explore the fascinating world of spices with detailed information, user reviews, and educational articles.',
    url: SITE_URL,
    siteName: 'Spice Encyclopedia',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Spice Encyclopedia Cover Image',
      },
    ],
    locale: 'zh-CN',
    alternateLocales: i18n.locales.filter(locale => locale !== 'zh-CN'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spice Encyclopedia | 香料百科',
    description: 'Explore the fascinating world of spices with detailed information, user reviews, and educational articles.',
    images: [`${SITE_URL}/og-image.png`],
    site: '@SpiceEncyclopedia',
    creator: '@SpiceEncyclopedia',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${SITE_URL}/site.webmanifest`,
};

// Configure viewport settings
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e1e2e',
};

// RootLayout component for the application
const RootLayout = ({ children, params }: { children: React.ReactNode; params: { locale: string } }) => {
  // Check if the provided locale is valid
  if (!i18n.locales.includes(params.locale)) {
    notFound();
  }

  return (
    <html lang={params.locale} className={`${inter.className} scroll-smooth`}>
      <body className="bg-gradient-to-br from-[#1e1e2e] to-[#2d2d44] text-gray-100 min-h-screen flex flex-col">
        <Providers locale={params.locale}>
          <Header />
          <main className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;