import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Quote, Scale, GraduationCap, Award, Landmark } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface BriefProfileSectionProps {
  profile: ProfileData;
}

export default function BriefProfileSection({ profile }: BriefProfileSectionProps) {
  const credentialFacts = [
    {
      icon: Scale,
      label: 'Jabatan Hukum Negara',
      title: 'Notaris & PPAT Kab. Sumenep',
      detail: 'Tersumpah Resmi SK 2021 & Notaris Pembuat Akta Koperasi (NPAK)',
    },
    {
      icon: GraduationCap,
      label: 'Kualifikasi Akademik',
      title: 'Doktor Ekonomi Syariah',
      detail: 'S3 UIN Maliki Malang (2025) & Magister Kenotariatan (M.Kn.) UB',
    },
    {
      icon: Award,
      label: 'Apresiasi Daerah',
      title: 'Juara 1 Mitra BPHTB Terbesar',
      detail: 'Penghargaan Resmi Bapenda Kabupaten Sumenep',
    },
    {
      icon: Landmark,
      label: 'Khidmah Keumatan',
      title: 'Pengurus LWPNU Sumenep',
      detail: 'Advokasi Legalitas & Penyelamatan Aset Wakaf Umat',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-[#FBF9F5] border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Editorial Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Kolom Kiri: Visual Liputan Media */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-navy/10 bg-white">
              <div className="relative h-72 sm:h-80 lg:h-[380px] w-full">
                <Image
                  src="/images/naghfir-matamaduranews.jpg"
                  alt="Dr. Naghfir - Dari Pesantren ke Meja Akta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-burgundy-200 block mb-0.5">
                    Arsip Liputan Pers
                  </span>
                  <p className="text-sm font-bold leading-snug">
                    &ldquo;Naghfir: Dari Pesantren ke Meja Akta&rdquo;
                  </p>
                  <p className="text-[10px] text-ivory/75 mt-1 font-mono">
                    Sumber: Mata Madura News (2021) · Desa Campaka, Pasongsongan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Narasi Singkat 2 Paragraf & Kutipan */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
                <span>02 · Sekilas Sosok & Rekam Jejak</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy tracking-tight leading-snug">
                Berakar dari Tradisi Santri, Mengabdi Melalui Kepastian Hukum
              </h2>
            </div>

            <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-sans">
              Lahir dan tumbuh di <strong>Desa Campaka, Kecamatan Pasongsongan, Kabupaten Sumenep</strong>, karakter Dr. Naghfir ditempa dalam tradisi keilmuan Pondok Pesantren Aqidah Usymuni Tarate Sumenep dan kawah kaderisasi PMII. Nilai kesahajaan santri, ketekunan intelektual, serta keberpihakan pada kemaslahatan warga menjadi kompas utama perjalanan hidupnya.
            </p>

            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
              Menyelesaikan studi <strong>Magister Kenotariatan (M.Kn.) di Universitas Brawijaya</strong> hingga meraih gelar <strong>Doktor (S3) Ekonomi Syariah di UIN Maulana Malik Ibrahim Malang (2025)</strong>, beliau mengintegrasikan kepakaran akademik dengan praktik profesional sebagai <strong>Notaris & PPAT Kabupaten Sumenep</strong> serta penggerak penyelamatan aset wakaf umat di LWPNU Sumenep.
            </p>

            {/* Editorial Quote */}
            <div className="p-4 sm:p-5 rounded-xl bg-ivory/80 border-l-4 border-burgundy border border-navy/10 relative">
              <Quote className="w-7 h-7 text-burgundy/20 absolute top-3 right-3" />
              <p className="text-xs sm:text-sm font-serif italic text-navy leading-relaxed relative z-10">
                &ldquo;Ilmu hukum bukan sekadar instrumen prosedural formalitas, melainkan amanah moral untuk menghadirkan ketenteraman batin, kepastian hak milik, dan keadilan nyata bagi masyarakat.&rdquo;
              </p>
            </div>

            {/* Action Links */}
            <div className="pt-1 flex flex-wrap items-center gap-4">
              <Link
                href="/perjalanan"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy hover:bg-burgundy text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Telusuri Perjalanan Hidup Lengkap (8 Fase)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy hover:text-navy uppercase tracking-wider transition-colors"
              >
                <span>Biografi & Kredensial Lengkap</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Credential Fact Bar (4 Kotak Fakta Ringkas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-navy/10">
          {credentialFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-xl bg-white border border-navy/10 shadow-xs hover:border-burgundy/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-burgundy">
                    {fact.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-ivory text-navy flex items-center justify-center">
                    <Icon className="w-4 h-4 text-burgundy" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-navy leading-snug mb-1">
                    {fact.title}
                  </h3>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    {fact.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
