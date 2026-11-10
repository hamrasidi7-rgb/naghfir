import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDatabase } from '@/lib/db';
import { Calendar, MapPin, Tag, ArrowRight, Camera } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const db = getDatabase();
  return {
    title: `Catatan Aktivitas & Dokumentasi | ${db.profile.shortName}`,
    description: `Dokumentasi kegiatan akademik, pelayanan notaris & PPAT, konsolidasi organisasi LWPNU, dan diskusi publik di Sumenep.`,
  };
}

export default function ActivitiesPage({
  searchParams,
}: {
  searchParams: { kategori?: string };
}) {
  const db = getDatabase();
  const selectedCategory = searchParams.kategori;

  const categories = ['Semua', 'Akademik', 'Profesi', 'Organisasi', 'Diskusi Publik', 'Sosial'];

  let activities = [...db.activities].sort((a, b) => a.order - b.order);
  if (selectedCategory && selectedCategory !== 'Semua') {
    activities = activities.filter((a) => a.category === selectedCategory);
  }

  return (
    <div className="py-12 lg:py-20 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-line pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brass mb-3">
            <Link href="/" className="hover:underline">Beranda</Link>
            <span>/</span>
            <span>Aktivitas</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-ink tracking-tight mb-4">
            Catatan Aktivitas & Dokumentasi
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-3xl font-sans">
            Dokumentasi keterlibatan langsung di tengah masyarakat: kegiatan akademik, penandatanganan akta hukum, koordinasi perlindungan aset wakaf, dan seminar hukum.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive =
              (!selectedCategory && cat === 'Semua') || selectedCategory === cat;

            return (
              <Link
                key={cat}
                href={cat === 'Semua' ? '/aktivitas' : `/aktivitas?kategori=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-burgundy text-white shadow-sm'
                    : 'bg-ivory text-navy hover:bg-navy hover:text-white border border-navy/10'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Activities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-navy/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {item.image && (
                <div className="relative h-48 w-full bg-navy/10 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-burgundy bg-white/95 px-3 py-1 rounded-full shadow-sm">
                    {item.category}
                  </span>
                  {item.imageCredit && (
                    <span className="absolute bottom-2 right-3 text-[10px] text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1">
                      <Camera className="w-2.5 h-2.5" />
                      <span>{item.imageCredit}</span>
                    </span>
                  )}
                </div>
              )}

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  {!item.image && (
                    <div className="flex items-center justify-between text-xs text-charcoal/60 mb-3">
                      <span className="font-bold uppercase tracking-wider text-burgundy text-[11px] px-2.5 py-0.5 rounded-full bg-burgundy/10">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>
                  )}

                  <h2 className="text-xl font-bold text-navy mb-3 leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-navy/10 flex items-center justify-between text-xs text-charcoal/70">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-burgundy" />
                    {item.location}
                  </span>
                  <span className="font-mono text-[11px] text-charcoal/40">
                    Terverifikasi
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
