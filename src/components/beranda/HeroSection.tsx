import React from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface HeroSectionProps {
  profile: ProfileData;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const heroImage =
    profile.heroImage && profile.heroImage !== '/images/naghfir.webp'
      ? profile.heroImage
      : '/images/Naghfir-Notaris.png';

  const photoCard = (
    <figure className="-mx-4 sm:mx-auto max-w-none sm:max-w-md lg:max-w-none">
      <div className="overflow-hidden rounded-none sm:rounded-2xl border-y sm:border border-line/70 bg-ink shadow-[0_20px_50px_-20px_rgba(17,28,45,0.4)]">
        {/* Wadah foto */}
        <div className="relative aspect-[16/11] sm:aspect-[4/3] bg-paper-muted">
          <Image
            src={heroImage}
            alt={`${profile.name} di Kantor Notaris & PPAT`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 448px, 420px"
            className="object-cover object-center"
          />
        </div>

        {/* Plakat identitas kantor resmi */}
        <figcaption className="flex items-center justify-between gap-3 border-t border-brass/30 px-4 py-3 sm:px-5 sm:py-3.5 text-text-on-dark">
          <div>
            <span className="block text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-brass-light">
              Kantor Resmi
            </span>
            <span className="mt-0.5 block font-serif text-sm sm:text-base font-semibold leading-snug text-white">
              Notaris &amp; PPAT Dr. Naghfir
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 text-right text-[11px] sm:text-xs text-text-on-dark/75">
            <MapPin className="h-3.5 w-3.5 text-brass-light shrink-0" />
            <span>
              Batuan<span className="hidden sm:inline">, Sumenep</span>
            </span>
          </div>
        </figcaption>
      </div>
    </figure>
  );

  return (
    <section id="beranda" className="relative scroll-mt-20 overflow-hidden bg-paper">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-1/4 h-[420px] w-[420px] rounded-full bg-brass-light/15 blur-3xl"
      />

      <div className="page-container relative grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12 pt-3 pb-8 sm:pt-6 sm:pb-14 lg:py-10 xl:py-12">
        {/* Kolom Teks: 7 kolom di desktop */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Fokus Utama: Nama Tokoh & Gelar — jarak rapat, gelar margin tengah */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="inline-flex flex-col items-center text-center">
              <h1 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] xl:text-[58px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
                {profile.shortName || 'Dr. Naghfir'}
              </h1>
              <p className="mt-1 text-center text-xs sm:text-sm font-medium tracking-[0.02em] text-muted sm:text-base">
                {profile.degrees}
              </p>
            </div>
          </div>

          {/* Di Mobile: Foto tampil di first fold langsung di bawah nama tokoh */}
          <div className="mt-4 sm:mt-5 block lg:hidden">
            {photoCard}
          </div>

          {/* Kutipan Filosofis: Aksen bermartabat, bukan headline bersaing */}
          <div className="mt-5 border-l-2 border-brass/70 pl-3.5 sm:pl-4 text-left">
            <p className="font-serif text-lg sm:text-xl italic text-ink/90 leading-snug">
              &ldquo;{profile.headline || 'Ilmu, Hukum, dan Pengabdian.'}&rdquo;
            </p>
          </div>

          {/* Deskripsi ringkas profesi & pengabdian */}
          <p className="mt-3 sm:mt-3.5 max-w-lg text-[14px] sm:text-[15px] leading-relaxed text-muted text-left">
            Notaris &amp; PPAT, akademisi, dan penggerak sosial. Menghadirkan layanan akta yang
            cermat, sah, dan berintegritas bagi masyarakat Sumenep dan Madura.
          </p>

          {/* Tombol Aksi (CTA) - Ramah jempol satu tangan */}
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3">
            <a href="#konsultasi" className="btn btn-gold text-xs sm:text-sm justify-center py-3 sm:py-2.5">
              <span>Mulai Konsultasi</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#tentang-saya" className="btn btn-outline text-xs sm:text-sm justify-center py-3 sm:py-2.5">
              <span>Mengenal Dr. Naghfir</span>
            </a>
          </div>
        </div>

        {/* Kolom Foto Resmi & Plakat Kantor Desktop */}
        <div className="hidden lg:block lg:col-span-5">
          {photoCard}
        </div>
      </div>
    </section>
  );
}
