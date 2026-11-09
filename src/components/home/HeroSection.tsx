import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { ProfileData } from '@/data/initialData';
import { getWhatsAppUrl } from '@/config/whatsapp';

interface HeroSectionProps {
  profile: ProfileData;
  whatsappNumber?: string;
}

export default function HeroSection({ profile, whatsappNumber }: HeroSectionProps) {
  const whatsappHref = getWhatsAppUrl('hero', whatsappNumber);

  return (
    <section
      id="beranda"
      className="relative bg-gradient-to-br from-[#FCFBF7] via-[#F7F2E7] to-[#EDE4D3] border-b border-[#E5DEC9] py-10 sm:py-14 lg:py-16 overflow-hidden"
    >
      {/* Subtle architectural warm glow on the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-[#DFC99B]/30 via-[#F5EFE0]/20 to-transparent blur-3xl"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Kolom Kiri: Tipografi Sesuai Desain */}
          <div className="lg:col-span-7 space-y-3.5 order-2 lg:order-1">
            {/* Baris Lokasi */}
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#4A453B]">
              SUMENEP &nbsp;·&nbsp; MADURA &nbsp;·&nbsp; INDONESIA
            </p>

            {/* Nama & Gelar */}
            <div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[62px] font-bold text-[#142134] tracking-tight leading-[1.05]">
                {profile.shortName || 'Dr. Naghfir'},
              </h1>
              <p className="font-serif text-lg sm:text-2xl font-bold text-[#1E293B] mt-1.5">
                {profile.degrees || 'S.HI., S.H., M.Kn., CPM., CH., C.Ht.'}
              </p>
            </div>

            {/* Peran Profesional */}
            <p className="text-sm sm:text-base font-medium text-[#2D3748] pt-0.5">
              Notaris &amp; PPAT &nbsp;|&nbsp; Akademisi &nbsp;|&nbsp; Penggerak Sosial
            </p>

            {/* Tagline Emas Italic */}
            <h2 className="font-serif italic text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#B48634] leading-snug pt-0.5">
              Ilmu, Hukum, dan Pengabdian.
            </h2>

            {/* Deskripsi Singkat */}
            <p className="text-sm sm:text-base text-[#374151] leading-relaxed max-w-md pt-0.5">
              Menghadirkan layanan hukum yang profesional dan terpercaya, serta kontribusi nyata bagi masyarakat.
            </p>

            {/* Dua Tombol CTA: Konsultasi Notaris & PPAT + Mengenal Saya */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-b from-[#CCA24E] via-[#B48834] to-[#986E21] hover:from-[#D4AA56] hover:to-[#A47826] text-white font-semibold text-xs sm:text-sm transition-all shadow-md border border-[#8E651C]/40"
              >
                <MessageCircle className="w-4 h-4 text-white shrink-0" />
                <span>Konsultasi Notaris &amp; PPAT</span>
              </a>

              <a
                href="#tentang-saya"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white/85 hover:bg-white text-[#142134] font-semibold text-xs sm:text-sm border border-[#142134]/75 transition-all shadow-xs"
              >
                <span>Mengenal Saya</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Foto Resmi Asli Dr. Naghfir */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <figure className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl bg-[#EFE8D8] aspect-[4/3.6] sm:aspect-[4/3.5] border border-[#D8CEBE] shadow-lg">
                <Image
                  src={
                    profile.heroImage && profile.heroImage !== '/images/naghfir.webp'
                      ? profile.heroImage
                      : '/images/Naghfir-Notaris.png'
                  }
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 42vw"
                  className="object-cover object-top"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
