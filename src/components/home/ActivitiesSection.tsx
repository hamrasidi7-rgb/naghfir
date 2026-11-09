import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ActivityItem } from '@/data/initialData';
import { Calendar, MapPin, Tag, ArrowRight, Camera } from 'lucide-react';

interface ActivitiesSectionProps {
  activities: ActivityItem[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  const sorted = [...activities].sort((a, b) => a.order - b.order);
  const primaryActivity = sorted[0];
  const secondaryActivities = sorted.slice(1, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
              <span>09 · Aktivitas & Dokumentasi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
              Catatan Aktivitas
            </h2>
            <p className="text-base text-charcoal/80 leading-relaxed font-sans">
              Rekam jejak kegiatan di bidang akademik, pelayanan hukum kenotariatan, organisasi keumatan, dan dialog bersama masyarakat.
            </p>
          </div>

          <Link
            href="/aktivitas"
            className="inline-flex items-center gap-2 text-sm font-bold text-burgundy hover:text-navy transition-colors group"
          >
            <span>Lihat Semua Aktivitas</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Primary Activity (Large Card with Image) */}
          {primaryActivity && (
            <div className="lg:col-span-7 bg-navy text-white rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden group">
              {primaryActivity.image && (
                <div className="relative h-64 sm:h-72 w-full bg-navy-950 overflow-hidden">
                  <Image
                    src={primaryActivity.image}
                    alt={primaryActivity.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-burgundy text-white text-xs font-semibold uppercase tracking-wider shadow-md">
                    {primaryActivity.category}
                  </span>
                  {primaryActivity.imageCredit && (
                    <span className="absolute bottom-3 right-4 text-[10px] text-ivory/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded flex items-center gap-1.5">
                      <Camera className="w-3 h-3 text-burgundy-300" />
                      <span>{primaryActivity.imageCredit}</span>
                    </span>
                  )}
                </div>
              )}

              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-ivory/70 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {primaryActivity.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-burgundy-300" />
                      {primaryActivity.location}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold leading-snug mb-4">
                    {primaryActivity.title}
                  </h3>

                  <p className="text-sm sm:text-base text-ivory/80 leading-relaxed">
                    {primaryActivity.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-ivory/60">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-burgundy-300" />
                    Dokumentasi Terverifikasi
                  </span>
                  <span className="font-mono text-ivory/40">Faktual & Terarsip</span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Activities (Stacked with Image Thumbnails) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {secondaryActivities.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-navy/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {item.image && (
                  <div className="relative h-44 w-full bg-navy/5 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-burgundy bg-white/95 px-2.5 py-0.5 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-charcoal/60 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-burgundy" />
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-navy mb-2 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
