import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://aslepharmaceuticals.in'),
  title: {
    default: 'ASLE Pharmaceuticals — Better Medicines. Better Lives.',
    template: '%s | ASLE Pharmaceuticals',
  },
  description:
    'ASLE Pharmaceuticals — Third Party & OEM manufacturing, drop shipping and global export of quality medicines. GMP-WHO and US-FDA aligned facilities in Jaipur, India. Innovating for a healthier tomorrow.',
  keywords: [
    'ASLE Pharmaceuticals',
    'Third Party Manufacturing',
    'OEM Manufacturing',
    'Drop Shipping',
    'Global Export',
    'GMP WHO',
    'US-FDA',
    'Pharmaceutical Manufacturer',
    'Jaipur India',
    'No MOQ',
  ],
  authors: [{ name: 'ASLE Pharmaceuticals' }],
  openGraph: {
    title: 'ASLE Pharmaceuticals — Better Medicines. Better Lives.',
    description:
      'Immersive pharmaceutical experience: Third Party & OEM manufacturing, global export and quality assurance from Jaipur, India.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ASLE Pharmaceuticals',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASLE Pharmaceuticals — Better Medicines. Better Lives.',
    description:
      'Third Party & OEM manufacturing, global export and quality assurance from Jaipur, India.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0f9b8e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
