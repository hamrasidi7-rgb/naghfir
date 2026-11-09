import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface BriefProfileSectionProps {
  profile: ProfileData;
}

export default function BriefProfileSection({ profile }: BriefProfileSectionProps) {
  return (
    <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Kolom Kiri: Foto Jurnalistik Mata Madura News */}
          <div className="lg:col-span-5">
            <figure>
              <div className="relative h-72 sm:h-80 lg:h-[340px] w-full overflow-hidden rounded-lg bg-ivory border border-[#252525]/10">
                <Image
                  src="/images/naghfir-matamaduranews.jpg"
                  alt="Dr. Naghfir - Dari Pesantren ke Meja Akta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-2.5 text-[11px] text-charcoal/60 flex items-center justify-between">
                <span>Arsip Liputan: &ldquo;Dari Pesantren ke Meja Akta&rdquo;</span>
                <span className="font-mono">Mata Madura News (2021)</span>
              </figcaption>
            </figure>
          </div>

          {/* Kolom Kanan: 1 Lead Quote Besar + 1 Paragraf Narasi Mengalir */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burgundy block">
              Pengantar Sosok
            </span>

            {/* Lead Paragraph / Kutipan Utama */}
            <p className="text-xl sm:text-2xl lg:text-[26px] font-serif font-normal text-navy leading-relaxed">
              &ldquo;Ilmu hukum bukan sekadar instrumen prosedural formalitas, melainkan amanah moral untuk menghadirkan ketenteraman batin, kepastian hak, dan keadilan nyata bagi masyarakat.&rdquo;
            </p>

            {/* 1 Paragraf Narasi Ringkas */}
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
              Lahir dan tumbuh di <strong>Desa Campaka, Kecamatan Pasongsongan, Kabupaten Sumenep</strong>, perjalanan intelektual Dr. Naghfir ditempa dalam tradisi Pondok Pesantren Aqidah Usymuni Tarate dan gerakan kemahasiswaan PMII. Berangkat dari akar kesahajaan santri tersebut, ia mendedikasikan keilmuan doktoral dan profesi kenotariatannya untuk menjembatani kepastian hukum negara dengan kemaslahatan warga Madura.
            </p>

            {/* 2 Tautan Navigasi Bersih */}
            <div className="pt-2 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy hover:text-navy border-b border-burgundy/40 hover:border-navy pb-1 transition-colors"
              >
                <span>Biografi & Kredensial Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/perjalanan"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-burgundy border-b border-navy/30 hover:border-burgundy pb-1 transition-colors"
              >
                <span>Linimasa Perjalanan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
