import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'My Next Thrift — Discover your thrift identity',
  description:
    'Discover the rare pieces your eye naturally notices. 8 thrift identities. 30-second quiz.',
  openGraph: {
    title: 'Your closet should feel discovered, not bought.',
    description: 'Find the rare pieces your aesthetic keeps searching for.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your closet should feel discovered, not bought.',
    description: 'Find the rare pieces your aesthetic keeps searching for.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#080808',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
