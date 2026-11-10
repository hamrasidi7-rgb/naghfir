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
  { label: 'Wilayah kerja', value: 'Kab. Sumenep' },
];

export default function HeroSection({ profile }: HeroSectionProps) {
  const heroImage =
    profile.heroImage && profile.heroImage !== '/images/naghfir.webp'
      ? profile.heroImage
      : '/images/Naghfir-Notaris.png';

  return (
    <section id="beranda" className="relative scroll-mt-20 overflow-hidden bg-paper">
      {/* Cahaya hangat lembut */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/4 h-[520px] w-[520px] rounded-full bg-[#E9D9B4]/35 blur-3xl"
      />

      <div className="page-container relative grid grid-cols-1 items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-20">
        {/* Teks */}
        <div className="lg:col-span-6">
          <p className="eyebrow">
            Kantor Notaris &amp; PPAT · Sumenep<span className="hidden sm:inline">, Madura</span>
          </p>

          <h1 className="mt-6 font-serif text-[46px] font-semibold leading-[1.02] tracking-[-0.02em] text-ink sm:text-[60px] lg:text-[68px]">
            {profile.shortName || 'Dr. Naghfir'}
          </h1>
          <p className="mt-3 text-sm font-medium tracking-[0.04em] text-muted sm:text-base">
            {profile.degrees}
          </p>

          <p className="mt-7 font-serif text-2xl italic text-brass-deep sm:text-[28px]">
            {profile.headline || 'Ilmu, Hukum, dan Pengabdian.'}
          </p>
          <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-muted sm:text-base">
            Notaris &amp; PPAT, akademisi, dan penggerak sosial. Menghadirkan layanan akta yang
            cermat, sah, dan berintegritas bagi masyarakat Sumenep dan Madura.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#konsultasi" className="btn btn-gold">
              Mulai Konsultasi
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#tentang-saya" className="btn btn-outline">
              Mengenal Dr. Naghfir
            </a>
          </div>

          <dl className="mt-12 border-t border-line sm:flex sm:pt-6">
            {FACTS.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex items-baseline justify-between gap-4 border-b border-line py-3.5 sm:block sm:border-b-0 sm:py-0 ${
                  i > 0 ? 'sm:ml-7 sm:border-l sm:pl-7' : ''
                }`}
              >
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                  {fact.label}
                </dt>
                <dd className="font-serif text-base font-semibold text-ink sm:mt-1.5 sm:whitespace-nowrap sm:text-lg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Foto + plakat identitas kantor */}
        <div className="lg:col-span-6">
          <figure className="relative mx-auto max-w-xl lg:ml-auto lg:mr-0">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 hidden h-full w-full rounded-[22px] border border-brass/40 sm:block"
            />
            <div className="relative overflow-hidden rounded-[20px] bg-ink shadow-[0_30px_60px_-30px_rgba(20,33,52,0.5)]">
              <div className="relative aspect-[4/3] bg-paper-deep">
                <Image
                  src={heroImage}
                  alt={`${profile.name} di Kantor Notaris & PPAT`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Plakat identitas usaha */}
              <figcaption className="flex items-center justify-between gap-4 border-t border-brass/50 px-5 py-4 text-white sm:px-6">
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-brass-light">
                    Kantor Resmi
                  </span>
                  <span className="mt-1 block font-serif text-base font-semibold leading-snug sm:text-lg">
                    Notaris &amp; PPAT Dr. Naghfir
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-right text-xs text-white/65">
                  <MapPin className="h-3.5 w-3.5 text-brass-light" />
                  <span>
                    Batuan<span className="hidden sm:inline">, Sumenep</span>
                  </span>
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
