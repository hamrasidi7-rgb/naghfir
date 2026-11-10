import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, GraduationCap, HeartHandshake, Scale } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface AboutSectionProps {
  profile: ProfileData;
}

const PILLARS = [
  { icon: Scale, title: 'Profesional Hukum', desc: 'Notaris & PPAT di Kabupaten Sumenep.' },
  { icon: GraduationCap, title: 'Akademisi', desc: 'Doktor Ekonomi Syariah.' },
  { icon: HeartHandshake, title: 'Pengabdian Sosial', desc: 'Wakaf, literasi hukum, dan pemberdayaan.' },
];

// Disarikan dari data profil & perjalanan yang sudah ada (bahan prototipe).
const MILESTONES = [
  { mark: 'Santri', text: 'Ponpes Aqidah Usymuni Terate, Sumenep' },
  { mark: 'S.HI.', text: 'UIN Maulana Malik Ibrahim Malang' },
  { mark: 'M.Kn.', text: 'Magister Kenotariatan, Universitas Brawijaya' },
  { mark: '2021', text: 'Notaris & PPAT, Kabupaten Sumenep' },
  { mark: '2025', text: 'Doktor Ekonomi Syariah' },
];

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="tentang-saya" className="scroll-mt-20 bg-paper">
      <div className="page-container py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Potret */}
          <figure className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 h-full w-full rounded-[22px] border border-brass/40"
            />
            <div className="relative aspect-square overflow-hidden rounded-[20px] bg-gradient-to-b from-white to-paper-deep sm:aspect-[4/5]">
              <Image
                src="/images/Naghfir-Berdiri.png"
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 384px, 40vw"
                className="object-cover object-top"
              />
            </div>
          </figure>

          {/* Narasi */}
          <div className="lg:col-span-7">
            <p className="eyebrow">Tentang Saya</p>
            <h2 className="section-title mt-5">Lebih dari Sekadar Profesi</h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
              Berakar dari tradisi pesantren di Pasongsongan, ditempa ilmu hukum dan ekonomi syariah
              hingga jenjang doktoral, lalu diabdikan melalui jabatan Notaris &amp; PPAT dan khidmah
              sosial di Sumenep.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Nilai kejujuran, kecermatan, dan tanggung jawab moral yang dipelajari di pesantren menjadi
              kompas dalam setiap akta yang dibuat dan setiap pengabdian yang dijalani.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {PILLARS.map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <Icon className="h-6 w-6 text-brass" strokeWidth={1.5} />
                  <h3 className="mt-3 font-serif text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/profil" className="text-link">
                Profil lengkap <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/perjalanan" className="text-link">
                Perjalanan hidup <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Jejak singkat */}
        <ol className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {MILESTONES.map((m, i) => (
            <li key={m.mark} className="relative border-l border-line pl-5 lg:border-l-0 lg:border-t lg:pl-0 lg:pr-6 lg:pt-6">
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-brass lg:-top-[5px] lg:left-0 ${
                  i === MILESTONES.length - 1 ? 'bg-brass' : 'bg-paper'
                }`}
              />
              <span className="font-serif text-xl font-semibold text-ink">{m.mark}</span>
              <p className="mt-1 text-sm leading-relaxed text-muted">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
