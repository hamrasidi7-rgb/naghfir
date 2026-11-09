import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface BriefProfileSectionProps {
  profile: ProfileData;
}

export default function BriefProfileSection({ profile }: BriefProfileSectionProps) {
  return (
    <section className="py-14 md:py-20 bg-[#FBF9F5] border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Kolom Kiri: Visual Liputan Media Mata Madura News */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-navy/10 bg-white">
              <div className="relative h-72 sm:h-80 lg:h-[360px] w-full">
                <Image
                  src="/images/naghfir-matamaduranews.jpg"
                  alt="Dr. Naghfir - Dari Pesantren ke Meja Akta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
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

          {/* Kolom Kanan: Murni Narasi Cerita 2 Paragraf & Link Perjalanan */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
                <span>02 · Sekilas Sosok</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy tracking-tight leading-snug">
                Berakar dari Tradisi Santri, Mengabdi Melalui Kepastian Hukum
              </h2>
            </div>

            <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-sans">
              Lahir dan tumbuh di <strong>Desa Campaka, Kecamatan Pasongsongan, Kabupaten Sumenep</strong>, karakter Dr. Naghfir ditempa dalam tradisi keilmuan Pondok Pesantren Aqidah Usymuni Tarate Sumenep dan kaderisasi organisasi mahasiswa. Nilai kesahajaan santri, ketekunan belajar, serta keberpihakan pada kemaslahatan warga menjadi kompas utama perjalanan hidupnya.
            </p>

            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
              Berangkat dari nilai-nilai pesantren tersebut, beliau meniti jalan pengabdian intelektual dan profesional di tanah kelahirannya—menjembatani kepastian hukum negara dengan kearifan sosiologis masyarakat Madura agar setiap warga dan lembaga umat memperoleh perlindungan hak yang adil.
            </p>

            {/* Kutipan Ringkas */}
            <div className="p-4 rounded-xl bg-ivory/80 border-l-4 border-burgundy border border-navy/10 relative">
              <Quote className="w-6 h-6 text-burgundy/20 absolute top-3 right-3" />
              <p className="text-xs sm:text-sm font-serif italic text-navy leading-relaxed relative z-10">
                &ldquo;Ilmu hukum bukan sekadar instrumen prosedural formalitas, melainkan amanah moral untuk menghadirkan ketenteraman batin dan keadilan nyata bagi masyarakat.&rdquo;
              </p>
            </div>

            {/* Single Clean CTA Link */}
            <div className="pt-1">
              <Link
                href="/perjalanan"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy hover:bg-burgundy text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Baca Biografi & Perjalanan Hidup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
