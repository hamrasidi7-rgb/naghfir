import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface HeroSectionProps {
  profile: ProfileData;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative bg-[#FAF8F5] border-b border-[#252525]/15 pt-8 sm:pt-12 pb-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Kolom Kiri: Tipografi Editorial Bersih */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            
            {/* Lokasi Identitas Minimalis */}
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-burgundy">
              <MapPin className="w-3.5 h-3.5" />
              <span>SUMENEP · MADURA · INDONESIA</span>
            </div>

            {/* Nama Lengkap & Gelar Resmi */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy tracking-tight leading-[1.08]">
                Dr. Naghfir
              </h1>
              <p className="text-sm sm:text-base font-semibold text-charcoal/70 tracking-wide">
                {profile.degrees}
              </p>
            </div>

            {/* Identitas Profesional */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-burgundy pt-1">
              Notaris & PPAT &nbsp;|&nbsp; Akademisi &nbsp;|&nbsp; Penggerak Sosial
            </p>

            {/* Garis Pemisah Tipis Editorial */}
            <div className="w-16 h-[2px] bg-burgundy" />

            {/* Headline Utama & Deskripsi */}
            <div className="space-y-3 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy leading-snug">
                &ldquo;Ilmu, Hukum, dan Pengabdian.&rdquo;
              </h2>
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
                Membangun kepastian hukum, mengembangkan pemikiran, dan mengabdi kepada masyarakat.
              </p>
            </div>

            {/* Navigasi Primer Bersih */}
            <div className="pt-3 flex flex-wrap items-center gap-6">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-navy hover:bg-burgundy text-white font-semibold text-xs uppercase tracking-widest transition-colors"
              >
                <span>Profil & Kredensial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/pemikiran"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-burgundy border-b border-navy/30 hover:border-burgundy pb-1 transition-colors"
              >
                <span>Baca Gagasan & Esai</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Kolom Kanan: Portrait Dokumenter Bersih (Tanpa Tumpukan Badge Melayang) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <figure className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden rounded-lg bg-ivory aspect-[4/5] border border-[#252525]/10 shadow-sm">
                <Image
                  src={profile.heroImage || '/images/naghfir.webp'}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-[11px] text-charcoal/60 border-b border-[#252525]/10 pb-2">
                <span className="font-medium text-navy">Dr. Naghfir, S.HI., S.H., M.Kn.</span>
                <span>Notaris & PPAT Kabupaten Sumenep</span>
              </figcaption>
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}
