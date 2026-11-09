import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDatabase } from '@/lib/db';
import { MapPin, ArrowRight } from 'lucide-react';
import ProfessionalSection from '@/components/home/ProfessionalSection';
import AcademicSection from '@/components/home/AcademicSection';
import SocialSection from '@/components/home/SocialSection';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const db = getDatabase();
  return {
    title: `Profil Lengkap, Kredensial & Nilai Pengabdian | ${db.profile.shortName}`,
    description: `Biografi intelektual, kualifikasi akademik doktoral, profil jabatan Notaris & PPAT, serta pengabdian sosial Dr. Naghfir di Kabupaten Sumenep.`,
  };
}

export default function ProfilePage() {
  const db = getDatabase();
  const profile = db.profile;

  return (
    <div className="bg-[#FDFCFB]">
      {/* Top Biography Section */}
      <div className="py-12 lg:py-20 border-b border-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Title */}
          <div className="mb-12 border-b border-navy/10 pb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
              <Link href="/" className="hover:underline">Beranda</Link>
              <span>/</span>
              <span>Profil & Kredensial Lengkap</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-navy tracking-tight mb-2">
              {profile.name}
            </h1>
            <p className="text-sm sm:text-base font-bold text-burgundy mb-3 uppercase tracking-wider">
              Notaris & PPAT | Akademisi | Penggerak Sosial
            </p>
            <p className="text-xl sm:text-2xl text-navy max-w-3xl font-serif font-bold italic mb-2">
              &ldquo;Ilmu, Hukum, dan Pengabdian.&rdquo;
            </p>
            <p className="text-base text-charcoal/80 max-w-2xl font-sans">
              Membangun kepastian hukum, mengembangkan pemikiran, dan mengabdi kepada masyarakat.
            </p>
          </div>

          {/* Top Portrait & Core Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-navy/10 aspect-[4/5] bg-white">
                <Image
                  src={profile.heroImage}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4 p-4 rounded-xl bg-ivory border border-navy/10 text-xs text-charcoal/80 text-center">
                <span className="font-bold text-navy block">{profile.name}</span>
                <span>{profile.origin}</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-charcoal/90 text-base sm:text-lg leading-relaxed">
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-navy/10">
                <span className="text-xs font-bold uppercase tracking-wider text-burgundy block mb-2">
                  Pondasi Karakter Santri & Intelektual
                </span>
                <p className="text-base text-navy font-semibold leading-relaxed">
                  {profile.aboutIntro}
                </p>
              </div>

              {profile.aboutStory.map((paragraph, idx) => (
                <p key={idx} className="font-sans leading-relaxed text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}

              <div className="pt-2 flex flex-wrap gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-navy text-white text-xs font-semibold">
                  Alumni Ponpes Aqidah Usymuni
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-ivory text-navy border border-navy/15 text-xs font-semibold">
                  Doktor Ekonomi Syariah UIN Malang (2025)
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-burgundy text-white text-xs font-semibold">
                  Notaris & PPAT Kab. Sumenep (2021)
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-ivory text-navy border border-navy/15 text-xs font-semibold">
                  Pengurus LWPNU Sumenep
                </span>
                {profile.bphtbAward && (
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                    🏆 {profile.bphtbAward}
                  </span>
                )}
              </div>

              {profile.officeAddress && (
                <div className="p-4 rounded-xl bg-ivory/60 border border-navy/10 text-xs text-charcoal/80 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block">Alamat Kantor Resmi Notaris & PPAT:</span>
                    <span>{profile.officeAddress}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Full In-Depth Section 1: Profesional Notaris & PPAT */}
      <ProfessionalSection
        professional={db.professional}
        whatsappNumber={db.contact.whatsappNumber}
      />

      {/* Full In-Depth Section 2: Akademik & Pendidikan */}
      <AcademicSection education={db.education} />

      {/* Full In-Depth Section 3: Pengabdian Sosial (LWPNU & Wakaf) */}
      <SocialSection
        socialContribution={db.socialContribution}
        activities={db.activities}
      />

      {/* Bottom CTA to Journey Page */}
      <div className="py-14 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-navy text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                Ingin Menelusuri Linimasa Perjalanan Hidup?
              </h3>
              <p className="text-sm text-ivory/80">
                Lihat 8 fase utama perjalanan dari Desa Campaka, Pasongsongan hingga pengukuhan Doktor dan Notaris.
              </p>
            </div>
            <Link
              href="/perjalanan"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-sm transition-all"
            >
              <span>Buka Linimasa Perjalanan (8 Fase)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
