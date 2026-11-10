import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, GraduationCap, HeartHandshake, Scale } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface AboutSectionProps {
  profile: ProfileData;
}

const PILLARS = [
  {
    icon: Scale,
    title: 'Praktisi Hukum',
    desc: 'Menjalankan tugas jabatan Notaris & PPAT di Sumenep berlandaskan prinsip kehati-hatian, melayani pembuatan akta autentik, perjanjian, dan kepengurusan pertanahan secara profesional.',
  },
  {
    icon: GraduationCap,
    title: 'Akademisi',
    desc: 'Doktor Ekonomi Syariah yang mendedikasikan telaah kritis regulasi, riset hukum muamalah, dan pemikiran ilmiah untuk memajukan diskursus hukum di Indonesia.',
  },
  {
    icon: HeartHandshake,
    title: 'Pengabdian Masyarakat',
    desc: 'Berkhidmah melalui advokasi sertifikasi tanah wakaf bersama Lembaga Wakaf NU, mediasi kemasyarakatan, serta edukasi kesadaran agraria bagi warga Madura.',
  },
];

// Tonggak historis utama (diverifikasi dari data sumber)
const MILESTONES = [
  { mark: 'Santri', text: 'PP Aqidah Usymuni Terate, Sumenep' },
  { mark: 'S.HI.', text: 'UIN Maulana Malik Ibrahim Malang' },
  { mark: 'M.Kn.', text: 'Universitas Brawijaya Malang' },
  { mark: '2021', text: 'Notaris & PPAT Kab. Sumenep' },
  { mark: '2025', text: 'Doktor Ekonomi Syariah UIN Malang' },
];

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="tentang-saya" className="scroll-mt-20 bg-paper">
      <div className="page-container py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Potret */}
          <figure className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl border border-brass/35"
            />
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-b from-white to-paper-muted shadow-sm sm:aspect-[4/5]">
              <Image
                src="/images/Naghfir-Berdiri.png"
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 384px, 40vw"
                className="object-cover object-top"
              />
            </div>
          </figure>

          {/* Narasi Editorial */}
          <div className="lg:col-span-7">
            <p className="eyebrow">Tentang Saya</p>
            <h2 className="section-title mt-3">Lebih dari Sekadar Profesi</h2>

            {/* Paragraf editorial tunggal (42 kata, bebas klaim absolut) */}
            <p className="mt-5 font-serif text-lg leading-relaxed text-ink/90 sm:text-xl">
              Berakar dari tradisi santri di Pasongsongan, Sumenep, Dr. Naghfir memadukan ketelitian hukum positif dan keilmuan syariah hingga jenjang doktoral. Nilai integritas, kecermatan, serta adab pesantren menjadi landasan moral dalam memberikan pelayanan hukum autentik, mengemban amanah jabatan publik, dan berkhidmah bagi kemaslahatan masyarakat Madura.
            </p>

            {/* Tiga Pilar Nilai (Responsive: 1 kolom lega pada mobile & tablet 768px, 3 kolom pada desktop) */}
            <ul className="mt-8 grid grid-cols-1 gap-5 border-t border-line pt-6 lg:grid-cols-3 lg:gap-6">
              {PILLARS.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3.5 lg:flex-col lg:items-start lg:gap-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line/60 bg-paper-muted">
                    <Icon className="h-4.5 w-4.5 text-brass" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1 lg:mt-3">
                    <h3 className="font-serif text-base font-semibold text-ink sm:text-[17px]">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Navigasi Profil & Linimasa */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/profil" className="text-link">
                Profil lengkap <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/perjalanan" className="text-link">
                Linimasa perjalanan <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tonggak Jejak & Perjalanan */}
        <div className="mt-14 border-t border-line pt-8 lg:mt-16 lg:pt-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Tonggak Jejak &amp; Perjalanan</p>
          <ol className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 lg:gap-0">
            {MILESTONES.map((m, i) => (
              <li
                key={m.mark}
                className="relative border-l-2 border-line pl-3.5 py-0.5 lg:border-l-0 lg:border-t lg:border-line lg:pl-0 lg:pr-6 lg:pt-5"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-2 h-2 w-2 rounded-full border border-brass lg:-top-[5px] lg:left-0 ${
                    i === MILESTONES.length - 1 ? 'bg-brass' : 'bg-paper'
                  }`}
                />
                <span className="font-serif text-base font-semibold text-ink lg:text-lg">{m.mark}</span>
                <p className="mt-0.5 text-xs leading-relaxed text-muted sm:text-[13px]">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
