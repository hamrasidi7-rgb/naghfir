import React from 'react';
import { getDatabase } from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import BriefProfileSection from '@/components/home/BriefProfileSection';
import ThreePillarsSection from '@/components/home/ThreePillarsSection';
import JourneySection from '@/components/home/JourneySection';
import ProfessionalSection from '@/components/home/ProfessionalSection';
import AcademicSection from '@/components/home/AcademicSection';
import ThoughtsSection from '@/components/home/ThoughtsSection';
import SocialSection from '@/components/home/SocialSection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import PublicationsSection from '@/components/home/PublicationsSection';
import ContactSection from '@/components/home/ContactSection';

export const revalidate = 0; // Dynamic server rendering to reflect CMS changes immediately

export default function HomePage() {
  const db = getDatabase();

  return (
    <div className="flex flex-col">
      {/* 1. Hero dan Identitas Resmi */}
      <HeroSection profile={db.profile} />

      {/* 2. Profil Singkat & Asal-Usul Campaka Pasongsongan */}
      <BriefProfileSection profile={db.profile} />

      {/* 3. Tiga Pilar Identitas (A. Profesional Hukum, B. Akademisi, C. Penggerak Sosial) */}
      <ThreePillarsSection />

      {/* 4. Perjalanan Hidup (Linimasa Terverifikasi 8 Langkah Faktual) */}
      <JourneySection timeline={db.timeline} />

      {/* 5. Profesional Notaris & PPAT (Kiprah Resmi, Penghargaan BPHTB & Integritas UUJN) */}
      <ProfessionalSection professional={db.professional} />

      {/* 6. Akademik dan Pendidikan (Pendidikan Tinggi, Doktoral, Catatan Admin S.H. & Sertifikasi) */}
      <AcademicSection education={db.education} />

      {/* 7. Pemikiran dan Gagasan (Majalah Digital 7 Kategori) */}
      <ThoughtsSection articles={db.articles} />

      {/* 8. Pengabdian Sosial (LWPNU Sumenep & Advokasi Aset Wakaf) */}
      <SocialSection socialContribution={db.socialContribution} />

      {/* 9. Aktivitas dan Dokumentasi (Dokumenter Faktual) */}
      <ActivitiesSection activities={db.activities} />

      {/* 10. Publikasi Media (Liputan Terverifikasi & Karya Ilmiah) */}
      <PublicationsSection publications={db.publications} />

      {/* 11. Kontak & Saluran Dialog Resmi */}
      <ContactSection contact={db.contact} />
    </div>
  );
}
