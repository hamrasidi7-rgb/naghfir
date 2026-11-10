import React from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface HeroSectionProps {
  profile: ProfileData;
}

const FACTS = [
  { label: 'Notaris & PPAT', value: 'Sejak 2021' },
  { label: 'Doktor', value: 'Ekonomi Syariah' },
  { label: 'Wilayah Kerja', value: 'Kab. Sumenep' },
];

export default function HeroSection({ profile }: HeroSectionProps) {
  const heroImage =
    profile.heroImage && profile.heroImage !== '/images/naghfir.webp'
      ? profile.heroImage
      : '/images/Naghfir-Notaris.png';

  return (
    <section id="beranda" className="relative scroll-mt-20 overflow-hidden bg-paper">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-1/4 h-[420px] w-[420px] rounded-full bg-brass-light/15 blur-3xl"
      />

      <div className="page-container relative grid grid-cols-1 items-center gap-10 pt-6 pb-14 sm:pt-12 sm:pb-20 lg:grid-cols-12 lg:gap-12 lg:py-20 xl:py-24">
        {/* Kolom Teks: 7 kolom di desktop agar komposisi napas teks optimal */}
        <div className="lg:col-span-7">
          {/* Eyebrow identitas resmi */}
          <p className="eyebrow">
            Kantor Notaris &amp; PPAT · Sumenep<span className="hidden sm:inline">, Madura</span>
          </p>

          {/* Fokus Utama: Nama Tokoh */}
          <h1 className="mt-3.5 font-serif text-[38px] font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[50px] lg:text-[56px] xl:text-[62px]">
            {profile.shortName || 'Dr. Naghfir'}
          </h1>

          {/* Gelar Akademik & Profesional yang terikat langsung */}
          <p className="mt-2 text-xs sm:text-sm font-medium tracking-[0.02em] text-muted sm:text-base">
            {profile.degrees}
          </p>

          {/* Kutipan Filosofis: Aksen bermartabat, bukan headline bersaing */}
          <div className="mt-5 border-l-2 border-brass/70 pl-3.5 sm:pl-4">
            <p className="font-serif text-lg sm:text-xl italic text-ink/90 leading-snug">
              &ldquo;{profile.headline || 'Ilmu, Hukum, dan Pengabdian.'}&rdquo;
            </p>
          </div>

          {/* Deskripsi ringkas profesi & pengabdian */}
          <p className="mt-3.5 max-w-lg text-[14px] sm:text-[15px] leading-relaxed text-muted">
            Notaris &amp; PPAT, akademisi, dan penggerak sosial. Menghadirkan layanan akta yang
            cermat, sah, dan berintegritas bagi masyarakat Sumenep dan Madura.
          </p>

          {/* Tombol Aksi (CTA) */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#konsultasi" className="btn btn-gold text-xs sm:text-sm">
              <span>Mulai Konsultasi</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#tentang-saya" className="btn btn-outline text-xs sm:text-sm">
              <span>Mengenal Dr. Naghfir</span>
            </a>
          </div>

          {/* Ringkasan Kredensial: 3 kolom ringkas di HP, sejajar horizontal di tablet/desktop */}
          <dl className="mt-8 sm:mt-10 border-t border-line pt-4 sm:pt-6 grid grid-cols-3 gap-2 text-center sm:text-left sm:flex sm:gap-0">
            {FACTS.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex flex-col justify-center sm:block ${
                  i > 0 ? 'border-l border-line sm:ml-6 sm:pl-6' : ''
                }`}
              >
                <dt className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                  {fact.label}
                </dt>
                <dd className="font-serif text-xs sm:text-base font-semibold text-ink mt-0.5 sm:mt-1 leading-tight sm:whitespace-nowrap">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Kolom Foto Resmi & Plakat Kantor: 5 kolom proporsional */}
        <div className="lg:col-span-5">
          <figure className="relative mx-auto max-w-md lg:max-w-none">
            {/* Bingkai aksen emas editorial */}
            <div
              aria-hidden="true"
              className="absolute -right-2.5 -top-2.5 hidden h-full w-full rounded-2xl border border-brass/35 sm:block"
            />

            <div className="relative overflow-hidden rounded-2xl bg-ink shadow-[0_20px_50px_-20px_rgba(17,28,45,0.4)]">
              {/* Wadah foto */}
              <div className="relative aspect-[16/11] sm:aspect-[4/3] bg-paper-muted">
                <Image
                  src={heroImage}
                  alt={`${profile.name} di Kantor Notaris & PPAT`}
                  fill
                  priority
                  sizes="(max-width: 768px) 92vw, (max-width: 1024px) 448px, 420px"
                  className="object-cover object-center"
                />
              </div>

              {/* Plakat identitas kantor resmi */}
              <figcaption className="flex items-center justify-between gap-3 border-t border-brass/30 px-4 py-3.5 sm:px-5 sm:py-4 text-text-on-dark">
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
        </div>
      </div>
    </section>
  );
}
