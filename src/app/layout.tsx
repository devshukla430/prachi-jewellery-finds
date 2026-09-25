import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#FFF9FA',
};

export const metadata: Metadata = {
  title: 'Prachi Jewellery Finds | Handpicked Amazon Jewellery, Trends & Styling',
  description: 'Curated with love. Discover timeless and trending jewellery finds on Amazon — earrings, rings, necklaces, bracelets, and gift sets with expert styling guides.',
  keywords: 'amazon jewellery finds, gold hoop earrings, minimal rings, silver solitaire, jewellery styling guides, prachi jewellery finds, pinterest jewellery',
  openGraph: {
    title: 'Prachi Jewellery Finds - Handpicked Amazon Jewellery',
    description: 'Find It. Love It. Wear It. Explore handpicked styles and trending pieces directly via Amazon.',
    url: 'https://prachijewelleryfinds.com',
    siteName: 'Prachi Jewellery Finds',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Prachi Jewellery Finds Curated Luxury Jewellery',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  other: {
    'p:domain_verify': 'prachifinds_verified_pinterest',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#FFF9FA] text-[#2D2427] antialiased selection:bg-[#F4D3DA] selection:text-[#BA4A6E]">
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
