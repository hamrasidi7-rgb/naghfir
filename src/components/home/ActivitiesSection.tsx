import React from 'react';
import Link from 'next/link';
import { ActivityItem } from '@/data/initialData';
import { Calendar, MapPin, Tag, ArrowRight, Camera } from 'lucide-react';

interface ActivitiesSectionProps {
  activities: ActivityItem[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  // Asymmetrical presentation: 1 large card, 2 medium cards, 2 compact cards
  const sorted = [...activities].sort((a, b) => a.order - b.order);
  const primaryActivity = sorted[0];
  const secondaryActivities = sorted.slice(1, 3);
  const otherActivities = sorted.slice(3, 5);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
              <span>Dokumentasi Kerja Nyata</span>
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
          
          {/* Main Primary Activity (Large Card) */}
          {primaryActivity && (
            <div className="lg:col-span-7 bg-navy text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-burgundy text-white text-xs font-semibold uppercase tracking-wider">
                    {primaryActivity.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ivory/70">
                    <Calendar className="w-3.5 h-3.5" />
                    {primaryActivity.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ivory/70">
                    <MapPin className="w-3.5 h-3.5" />
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

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-xs text-ivory/60">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-burgundy-300" />
                  Dokumentasi Lapangan
                </span>
                <span className="font-mono text-ivory/40">Faktual & Terarsip</span>
              </div>
            </div>
          )}

          {/* Secondary Activities (Stacked) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {secondaryActivities.map((item) => (
              <div
                key={item.id}
                className="bg-white p-7 rounded-2xl border border-navy/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal/60 mb-3">
                    <span className="font-bold uppercase tracking-wider text-burgundy text-[11px]">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-navy mb-2 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-charcoal/70 line-clamp-3 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-navy/5 flex items-center gap-1.5 text-xs text-charcoal/60">
                  <MapPin className="w-3.5 h-3.5 text-burgundy" />
                  <span>{item.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
