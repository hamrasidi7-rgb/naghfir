import React from 'react';
import { getDatabase } from '@/lib/db';
import HeroSection from '@/components/beranda/HeroSection';
import ServicesSection from '@/components/beranda/ServicesSection';
import AboutSection from '@/components/beranda/AboutSection';
import DevotionThoughtsSection from '@/components/beranda/DevotionThoughtsSection';
import ContactFooterSection from '@/components/beranda/ContactFooterSection';

export const revalidate = 0; // Render dinamis agar perubahan CMS langsung tampil

/**
 * Beranda — prototipe desain "Premium Minimalist Legal & Personal Branding".
 * Lima section utama:
 * 1. Hero  2. Layanan Notaris & PPAT (+ simulasi konsultasi)  3. Tentang Saya
 * 4. Pengabdian & Pemikiran  5. Kontak & Footer
 */
export default function HomePage() {
  const db = getDatabase();
  const whatsappNumber = db.contact?.whatsappNumber || '';

  return (
    <div className="flex flex-col bg-paper">
      <HeroSection profile={db.profile} />
      <ServicesSection whatsappNumber={whatsappNumber} />
      <AboutSection profile={db.profile} />
      <DevotionThoughtsSection socialContribution={db.socialContribution} articles={db.articles} />
      <ContactFooterSection contact={db.contact} fullName={db.profile.name} />
    </div>
  );
}
