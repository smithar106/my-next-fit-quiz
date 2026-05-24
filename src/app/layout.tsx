import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'My Next Thrift — Style Quiz',
  description:
    'Discover your personal style in 30 seconds. Personalized outfit recommendations powered by AI.',
  openGraph: {
    title: 'My Next Thrift — Style Quiz',
    description: 'Discover your style in 60 seconds.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Next Thrift — Style Quiz',
    description: 'Discover your style in 60 seconds.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0A0A0A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
