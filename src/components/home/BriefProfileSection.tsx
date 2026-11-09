import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Quote, ShieldCheck } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface BriefProfileSectionProps {
  profile: ProfileData;
}

export default function BriefProfileSection({ profile }: BriefProfileSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FBF9F5] border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Kolom Kiri: Visual Editorial Kontekstual */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-navy/10 bg-white">
              <div className="relative h-80 sm:h-96 lg:h-[420px] w-full">
                <Image
                  src="/images/naghfir-matamaduranews.jpg"
                  alt="Dr. Naghfir - Dari Pesantren ke Meja Akta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-burgundy-200 block mb-1">
                    Dokumentasi Liputan Media
                  </span>
                  <p className="text-sm font-semibold leading-snug">
                    Dr. Naghfir: Dari Pesantren ke Meja Akta
                  </p>
                  <p className="text-[10px] text-ivory/70 mt-1 font-mono">
                    Sumber: Mata Madura News (2021)
                  </p>
                </div>
              </div>
            </div>

            {/* Inset Sub-photo - Landscape Madura / Desa Campaka */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-44 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-navy -rotate-2">
              <Image
                src="/images/context/lanskap-sumenep.webp"
                alt="Sumenep Madura"
                fill
                sizes="176px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy/30" />
              <div className="absolute bottom-1.5 left-2 right-2 text-[10px] text-white font-medium truncate">
                Campaka · Sumenep
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Narasi Profil Singkat */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
                <span>02 · Profil Singkat</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy tracking-tight leading-snug">
                Berakar dari Tradisi Santri, Berkhidmat untuk Kepastian Hukum Masyarakat
              </h2>
            </div>

            <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
              Lahir dan tumbuh di <strong>Desa Campaka, Kecamatan Pasongsongan, Kabupaten Sumenep</strong>, perjalanan Dr. Naghfir ditempa melalui tradisi keilmuan pesantren yang menjunjung tinggi adab, kejujuran, dan kepekaan sosial.
            </p>

            <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-sans">
              Menyelesaikan pendidikan pesantren di Ponpes Aqidah Usymuni Tarate Sumenep dan mengasah ketajaman aktivisme di PMII, beliau melanjutkan tradisi intelektual hingga meraih gelar <strong>Doktor Ekonomi Syariah di UIN Maulana Malik Ibrahim Malang</strong> serta magister kenotariatan di <strong>Universitas Brawijaya</strong>. Kini, dedikasi keilmuan tersebut diwujudkan secara konkret sebagai <strong>Notaris & PPAT Kabupaten Sumenep</strong> serta penggerak pengamanan aset wakaf umat melalui LWPNU Sumenep.
            </p>

            {/* Editorial Quote Box */}
            <div className="p-5 rounded-xl bg-ivory/80 border-l-4 border-burgundy border border-navy/10 relative">
              <Quote className="w-8 h-8 text-burgundy/20 absolute top-3 right-3" />
              <p className="text-sm sm:text-base font-serif italic text-navy leading-relaxed relative z-10">
                &ldquo;Ilmu hukum bukan semata instrumen prosedural formalitas, melainkan amanah moral untuk menghadirkan ketenteraman batin, kepastian hak milik, dan keadilan nyata bagi setiap warga.&rdquo;
              </p>
              <span className="block mt-2 text-xs font-bold text-burgundy uppercase tracking-wider">
                — Dr. Naghfir, M.Kn.
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 text-sm font-bold text-burgundy hover:text-burgundy-700 underline underline-offset-4 transition-colors"
              >
                <span>Baca Biografi Lengkap & Gagasan</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
