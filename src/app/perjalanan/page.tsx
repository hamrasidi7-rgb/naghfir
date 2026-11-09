import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDatabase } from '@/lib/db';
import { Calendar, Flag, GraduationCap, Briefcase, Award, CheckCircle2, Camera } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const db = getDatabase();
  return {
    title: `Perjalanan Hidup & Linimasa | ${db.profile.shortName}`,
    description: `Linimasa lengkap perjalanan Dr. Naghfir dari Desa Campaka, Pasongsongan, Pesantren Aqidah Usymuni, hingga pengangkatan Notaris 2021 dan pengukuhan Doktor 2025.`,
  };
}

export default function JourneyPage() {
  const db = getDatabase();
  const timeline = [...db.timeline].sort((a, b) => a.order - b.order);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pesantren':
      case 'Pendidikan':
        return GraduationCap;
      case 'Profesi':
        return Briefcase;
      case 'Organisasi':
        return Flag;
      default:
        return Award;
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-[#FDFCFB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <Link href="/" className="hover:underline">Beranda</Link>
            <span>/</span>
            <span>Linimasa Perjalanan</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-navy tracking-tight mb-4">
            Perjalanan yang Membentuk Pengabdian
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            Setiap etape kehidupan adalah kepingan nilai yang membentuk karakter: dari kesahajaan pedesaan Pasongsongan, tempaan adab pesantren, pergulatan intelektual di kampus, hingga integritas di meja akta dan ladang pengabdian masyarakat.
          </p>
        </div>

        {/* Chronological Timeline Stream */}
        <div className="relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-navy/15">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = getCategoryIcon(item.category);
            const isMilestone = item.order === 5 || item.order === 7; // Notaris 2021 & Doktor 2025

            return (
              <div
                key={item.id}
                className={`relative mb-12 flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Badge Dot */}
                <div
                  className={`absolute left-6 md:left-1/2 -translate-x-1/2 top-4 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#FDFCFB] shadow-md z-10 ${
                    isMilestone ? 'bg-burgundy text-white' : 'bg-navy text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Box */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isMilestone
                        ? 'bg-navy text-white shadow-xl border-navy'
                        : 'bg-white text-charcoal hover:shadow-lg border-navy/10'
                    }`}
                  >
                    {item.image && (
                      <div className="relative h-44 w-full bg-navy/10 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="400px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span
                          className={`absolute top-3 left-3 text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm ${
                            isMilestone ? 'bg-burgundy text-white' : 'bg-white text-navy'
                          }`}
                        >
                          {item.year}
                        </span>
                        {item.imageCredit && (
                          <span className="absolute bottom-2 right-2 text-[10px] text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1">
                            <Camera className="w-2.5 h-2.5" />
                            <span>{item.imageCredit}</span>
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-7">
                      {!item.image && (
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                              isMilestone ? 'bg-burgundy text-white' : 'bg-ivory text-navy border border-navy/10'
                            }`}
                          >
                            {item.year}
                          </span>
                          <span
                            className={`text-xs font-semibold uppercase tracking-wider ${
                              isMilestone ? 'text-burgundy-200' : 'text-burgundy'
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                      )}

                      <h2
                        className={`text-2xl font-bold mb-1 ${
                          isMilestone ? 'text-white' : 'text-navy'
                        }`}
                      >
                        {item.title}
                      </h2>

                      <p
                        className={`text-xs font-semibold mb-3 ${
                          isMilestone ? 'text-ivory/70' : 'text-charcoal/60'
                        }`}
                      >
                        {item.subtitle}
                      </p>

                      <p
                        className={`text-sm leading-relaxed ${
                          isMilestone ? 'text-ivory/90' : 'text-charcoal/80'
                        }`}
                      >
                        {item.description}
                      </p>

                      <div
                        className={`mt-4 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
                          isMilestone ? 'border-white/10 text-ivory/60' : 'border-navy/10 text-charcoal/50'
                        }`}
                      >
                        <span>Tahap #{item.order}</span>
                        <span>✓ Catatan Faktual</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Note */}
        <div className="mt-16 p-6 rounded-2xl bg-[#FAF7F2] border border-navy/10 text-center max-w-2xl mx-auto text-xs text-charcoal/70">
          <p className="font-semibold text-navy mb-1">
            Prinsip Verifikasi Informasi:
          </p>
          <p>
            Seluruh data tahun, tahapan akademik, dan pengangkatan jabatan hukum pada linimasa ini disusun berpedoman pada verifikasi dokumen resmi dan riwayat aktual Dr. Naghfir.
          </p>
        </div>

      </div>
    </div>
  );
}
