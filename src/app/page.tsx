import React from 'react';
import { getDatabase } from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import BriefProfileSection from '@/components/home/BriefProfileSection';
import ProfessionalSection from '@/components/home/ProfessionalSection';
import SocialSection from '@/components/home/SocialSection';
import ThoughtsSection from '@/components/home/ThoughtsSection';
import ContactSection from '@/components/home/ContactSection';

export const revalidate = 0; // Dynamic server rendering to reflect CMS changes immediately

export default function HomePage() {
  const db = getDatabase();
  const whatsappNumber = db.contact?.whatsappNumber || '';

  return (
    <div className="flex flex-col bg-[#FAF7F0]">
      {/* 1. HERO: Identitas, Gelar, Foto Resmi, Tagline, CTA Konsultasi Notaris & PPAT + Mengenal Saya */}
      <HeroSection profile={db.profile} whatsappNumber={whatsappNumber} />

      {/* 2. LAYANAN NOTARIS & PPAT: Dua Kartu Utama Sesuai Desain + Rincian Layanan & Persyaratan */}
      <ProfessionalSection
        professional={db.professional}
        whatsappNumber={whatsappNumber}
      />

      {/* 3. TENTANG SAYA: Lebih dari Sekadar Profesi + 3 Identitas Kredensial + Detail Biografi/Pendidikan/Perjalanan/Organisasi */}
      <BriefProfileSection
        profile={db.profile}
        education={db.education}
        timeline={db.timeline}
      />

      {/* 4 & 5. PENGABDIAN (Kiri) & PEMIKIRAN (Kanan): Split 2 Kolom Sesuai Desain */}
      <div className="bg-[#FAF7F0] border-b border-[#E5DEC9] py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#DFD6C5]">
            <SocialSection
              socialContribution={db.socialContribution}
              activities={db.activities}
            />
            <ThoughtsSection
              articles={db.articles}
              publications={db.publications}
            />
          </div>
        </div>
      </div>

      {/* 6. BANNER KONSULTASI WHATSAPP & FOOTER BAWAH */}
      <ContactSection contact={db.contact} includeFooter={true} />
    </div>
  );
}
