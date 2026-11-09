import React from 'react';
import { getDatabase } from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import BriefProfileSection from '@/components/home/BriefProfileSection';
import ThreePillarsSection from '@/components/home/ThreePillarsSection';
import ThoughtsSection from '@/components/home/ThoughtsSection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import PublicationsSection from '@/components/home/PublicationsSection';
import ContactSection from '@/components/home/ContactSection';

export const revalidate = 0; // Dynamic server rendering to reflect CMS changes immediately

export default function HomePage() {
  const db = getDatabase();

  return (
    <div className="flex flex-col">
      {/* 01. Hero dan Identitas Resmi */}
      <HeroSection profile={db.profile} />

      {/* 02. Sekilas Sosok, Bar Kredensial Faktual (4 Kotak), & CTA ke /perjalanan */}
      <BriefProfileSection profile={db.profile} />

      {/* 03. Tiga Pilar Dedikasi (Rangkuman Eksekutif Praktisi Hukum, Akademisi, Penggerak Sosial) */}
      <ThreePillarsSection />

      {/* 04. Pemikiran & Literasi Hukum (Law Review Style - 7 Kategori) */}
      <ThoughtsSection articles={db.articles} />

      {/* 05 & 06. Jejak Aktivitas & Publikasi Pers Terverifikasi */}
      <ActivitiesSection activities={db.activities} />
      <PublicationsSection publications={db.publications} />

      {/* 07. Kantor & Saluran Korespondensi Resmi */}
      <ContactSection contact={db.contact} />
    </div>
  );
}
