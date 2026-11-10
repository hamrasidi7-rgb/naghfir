import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getDatabase } from '@/lib/db';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

export async function generateMetadata(): Promise<Metadata> {
  const db = getDatabase();
  const seo = db.seo;
  const profile = db.profile;

  return {
    title: {
      default: `${profile.shortName} | ${profile.headline}`,
      template: `%s | ${profile.shortName}`,
    },
    description: seo.metaDescription,
    keywords: seo.keywords.split(',').map((s) => s.trim()),
    authors: [{ name: profile.name }],
    creator: profile.shortName,
    metadataBase: new URL('https://naghfir.id'),
    openGraph: {
      type: 'profile',
      locale: 'id_ID',
      url: 'https://naghfir.id',
      title: `${profile.shortName} - ${profile.tagline}`,
      description: seo.metaDescription,
      siteName: profile.name,
      images: [
        {
          url: profile.heroImage,
          width: 800,
          height: 1000,
          alt: profile.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.shortName} - ${profile.tagline}`,
      description: seo.metaDescription,
      images: [profile.heroImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const db = getDatabase();
  const profile = db.profile;
  const whatsappNumber = db.contact?.whatsappNumber || '';

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: ['Notaris & PPAT', 'Akademisi', 'Penggerak Sosial'],
    description: profile.subheadline,
    homeLocation: {
      '@type': 'Place',
      name: profile.origin,
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Pondok Pesantren Aqidah Usymuni Terate',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Universitas Islam Negeri Maulana Malik Ibrahim Malang',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Universitas Brawijaya',
      },
    ],
    knowsAbout: [
      'Hukum Kenotariatan',
      'Hukum Agraria dan Pertanahan',
      'Ekonomi Syariah',
      'Pengelolaan Aset Wakaf',
    ],
  };

  return (
    <html lang="id" className={`${manrope.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased selection:bg-brass-light/40 selection:text-ink">
        <Header whatsappNumber={whatsappNumber} />
        <main className="flex-grow pt-14 sm:pt-16 lg:pt-[68px]">{children}</main>
        <Footer whatsappNumber={whatsappNumber} />
        <FloatingWhatsApp whatsappNumber={whatsappNumber} />
      </body>
    </html>
  );
}
