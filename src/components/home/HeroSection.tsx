import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown, MapPin, Award, CheckCircle, Scale } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface HeroSectionProps {
  profile: ProfileData;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#FDFCFB] border-b border-navy/10 pt-4 sm:pt-8 pb-12 sm:pb-16 lg:py-20">
      {/* Editorial aesthetic ambient backdrops */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-ivory opacity-70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-burgundy/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Kolom Kiri: Identitas Resmi, Headline, Deskripsi, Lokasi */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 order-2 lg:order-1">
            
            {/* Lokasi Identitas Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-ivory border border-navy/10 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-navy shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-burgundy" />
              <span>SUMENEP · MADURA · INDONESIA</span>
            </div>

            {/* Nama Lengkap & Gelar Resmi */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-navy tracking-tight leading-[1.12]">
                Dr. Naghfir
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-bold text-burgundy tracking-wide font-sans">
                {profile.degrees}
              </p>
            </div>

            {/* Identitas Profesional */}
            <div className="inline-block py-1">
              <span className="text-xs sm:text-sm lg:text-base font-extrabold uppercase tracking-wider text-charcoal/90 bg-ivory/80 px-3 py-1.5 rounded-lg border border-navy/10">
                Notaris & PPAT | Akademisi | Penggerak Sosial
              </span>
            </div>

            {/* Headline Utama */}
            <div className="border-l-4 border-burgundy pl-4 sm:pl-5 py-0.5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-navy leading-snug">
                &ldquo;Ilmu, Hukum, dan Pengabdian.&rdquo;
              </h2>
            </div>

            {/* Deskripsi Resmi */}
            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans max-w-2xl">
              Membangun kepastian hukum, mengembangkan pemikiran, dan mengabdi kepada masyarakat.
            </p>

            {/* Tombol Aksi (CTA) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
              >
                <span>Mengenal Lebih Dekat</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/perjalanan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ivory hover:bg-ivory-300 text-navy font-semibold text-xs sm:text-sm uppercase tracking-wider border border-navy/15 transition-all"
              >
                <span>Perjalanan & Gagasan</span>
                <ArrowDown className="w-4 h-4" />
              </Link>
            </div>

            {/* Pilar Kunci Kredibilitas */}
            <div className="pt-5 border-t border-navy/10 grid grid-cols-3 gap-3 sm:gap-6 text-left">
              <div>
                <span className="block text-lg sm:text-xl font-black text-navy">Doktor S3</span>
                <span className="text-[11px] sm:text-xs text-charcoal/70">Ekonomi Syariah UIN</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-navy">Notaris & PPAT</span>
                <span className="text-[11px] sm:text-xs text-charcoal/70">Tersumpah Sejak 2021</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-navy">Khidmah Umat</span>
                <span className="text-[11px] sm:text-xs text-charcoal/70">Pengurus LWPNU Sumenep</span>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Foto Portrait Asli Dr. Naghfir */}
          <div className="lg:col-span-5 relative flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Bingkai Asimetris Editorial */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-3xl bg-ivory -rotate-1 border border-navy/10 -z-10" />
              <div className="absolute -inset-1 rounded-3xl bg-burgundy/10 rotate-1 -z-10" />

              {/* Kartu Portrait Utama */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-navy/10 aspect-[4/5] sm:aspect-[4/5] max-h-[460px] sm:max-h-[520px] lg:max-h-[580px] w-full">
                <Image
                  src={profile.heroImage || '/images/naghfir.webp'}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover object-top hover:scale-102 transition-transform duration-700"
                />
                
                {/* Overlay Informasi & Atribusi Foto */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/95 via-navy/55 to-transparent p-4 sm:p-6 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-burgundy-200 mb-0.5">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Notaris & PPAT Kabupaten Sumenep</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold leading-tight">
                    Dr. Naghfir, M.Kn.
                  </p>
                  <p className="text-xs text-ivory/80 mt-0.5">
                    Pasongsongan · Sumenep · Madura
                  </p>
                  {profile.heroImageCredit && (
                    <p className="text-[10px] text-ivory/60 mt-1.5 font-mono truncate">
                      📷 {profile.heroImageCredit}
                    </p>
                  )}
                </div>
              </div>

              {/* Floating Verified Trust Badge */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-xl shadow-lg border border-navy/10 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-navy block">
                    Integritas & Kepastian Hukum
                  </span>
                  <span className="text-[10px] text-charcoal/70">
                    SK Kemenkumham RI & ATR/BPN
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
