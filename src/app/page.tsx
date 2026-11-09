import React from 'react';
import { getDatabase } from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import BriefProfileSection from '@/components/home/BriefProfileSection';
import ThreePillarsSection from '@/components/home/ThreePillarsSection';
import ThoughtsSection from '@/components/home/ThoughtsSection';
import HighlightsSection from '@/components/home/HighlightsSection';
import ContactSection from '@/components/home/ContactSection';

export const revalidate = 0; // Dynamic server rendering to reflect CMS changes immediately

export default function HomePage() {
  const db = getDatabase();

  return (
    <div className="flex flex-col">
      {/* 01. Hero dan Identitas Resmi */}
      <HeroSection profile={db.profile} />

      {/* 02. Sekilas Sosok (Murni Narasi & Foto Liputan Pers) */}
      <BriefProfileSection profile={db.profile} />

      {/* 03. Tiga Pilar Dedikasi (3 Kartu Kredensial Padat) */}
      <ThreePillarsSection />

      {/* 04. Pemikiran & Literasi Hukum (Law Review Style) */}
      <ThoughtsSection articles={db.articles} />

      {/* 05. Jejak Kiprah & Sorotan Media (Split Kiri: Aktivitas | Kanan: Publikasi Pers) */}
      <HighlightsSection activities={db.activities} publications={db.publications} />

      {/* 06. Kantor & Saluran Korespondensi Resmi */}
      <ContactSection contact={db.contact} />
    </div>
  );
}
