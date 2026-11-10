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
      <div className="page-container py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Potret Rapi Bersih Berlatar Transparan Tanpa Sekat Kotak (Ukuran +25%) */}
          <figure className="relative mx-auto w-full max-w-[325px] sm:max-w-md lg:col-span-5 lg:max-w-none flex justify-center">
            <div className="relative w-full max-w-[325px] sm:max-w-[380px] lg:max-w-[420px]">
              <Image
                src="/images/Naghfir-Berdiri-Transparan.png"
                alt={profile.name}
                width={1049}
                height={1500}
                sizes="(max-width: 640px) 325px, (max-width: 1024px) 380px, 420px"
                className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(17,28,45,0.09)]"
                priority
              />
            </div>
          </figure>

          {/* Narasi Editorial */}
          <div className="lg:col-span-7">
            <h2 className="section-title text-center lg:text-left">Lebih dari Sekadar Profesi</h2>

            {/* Paragraf editorial tunggal (42 kata, bebas klaim absolut) */}
            <p className="mt-4 font-serif text-base sm:text-lg leading-relaxed text-ink/90">
              Berakar dari tradisi santri di Pasongsongan, Sumenep, Dr. Naghfir memadukan ketelitian hukum positif dan keilmuan syariah hingga jenjang doktoral. Nilai integritas, kecermatan, serta adab pesantren menjadi landasan moral dalam memberikan pelayanan hukum autentik, mengemban amanah jabatan publik, dan berkhidmah bagi kemaslahatan masyarakat Madura.
            </p>

            {/* Tiga Pilar Nilai — Kartu ringkas berlatar paper-card di mobile untuk keterbacaan tinggi */}
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:gap-4 border-t border-line pt-5 lg:grid-cols-3 lg:gap-6">
              {PILLARS.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="flex items-start gap-3 rounded-xl border border-line/60 bg-paper-card p-3 sm:p-4 lg:border-none lg:bg-transparent lg:p-0 lg:flex-col lg:items-start lg:gap-0"
                >
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-line/60 bg-paper-muted">
                    <Icon className="h-4 w-4 text-brass" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1 lg:mt-3">
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-ink">{title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Navigasi Profil & Linimasa */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
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
        <div className="mt-10 border-t border-line pt-6 sm:mt-14 sm:pt-8">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted">
            Tonggak Jejak &amp; Perjalanan
          </p>
          <ol className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-0">
            {MILESTONES.map((m, i) => (
              <li
                key={m.mark}
                className="relative border-l-2 border-line pl-3 py-0.5 lg:border-l-0 lg:border-t lg:border-line lg:pl-0 lg:pr-6 lg:pt-4"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-2 h-2 w-2 rounded-full border border-brass lg:-top-[5px] lg:left-0 ${
                    i === MILESTONES.length - 1 ? 'bg-brass' : 'bg-paper'
                  }`}
                />
                <span className="font-serif text-sm sm:text-base font-semibold text-ink">{m.mark}</span>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
