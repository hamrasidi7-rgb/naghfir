import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ActivityItem, PublicationItem } from '@/data/initialData';
import { Calendar, MapPin, ArrowRight, ExternalLink, Newspaper, Camera } from 'lucide-react';

interface HighlightsSectionProps {
  activities: ActivityItem[];
  publications: PublicationItem[];
}

export default function HighlightsSection({ activities, publications }: HighlightsSectionProps) {
  const sortedActivities = [...activities].sort((a, b) => a.order - b.order);
  const mainActivity = sortedActivities[0];
  const subActivities = sortedActivities.slice(1, 3);
  const topPublications = publications.slice(0, 3);

  return (
    <section className="py-14 md:py-20 bg-[#FAF7F2] border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Badge & Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-1.5">
            <span>05 · Jejak Kiprah & Sorotan Media</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy tracking-tight">
            Dokumentasi Aktivitas & Publikasi Pers
          </h2>
        </div>

        {/* 12-Column Split Layout: Left (7 Cols Activities) | Right (5 Cols Publications) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* KOLOM KIRI (7 Kolom): 3 Dokumentasi Aktivitas Pilihan (1 Besar + 2 Kecil) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between border-b border-navy/10 pb-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-navy">
                Dokumentasi Aktivitas Lapangan
              </h3>
              <Link
                href="/aktivitas"
                className="inline-flex items-center gap-1 text-xs font-bold text-burgundy hover:text-navy transition-colors"
              >
                <span>Arsip Aktivitas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 1 Kartu Utama Besar */}
            {mainActivity && (
              <div className="rounded-2xl bg-navy text-white overflow-hidden shadow-md group">
                <div className="grid grid-cols-1 sm:grid-cols-12">
                  {mainActivity.image && (
                    <div className="sm:col-span-5 relative h-48 sm:h-auto bg-navy-950 overflow-hidden">
                      <Image
                        src={mainActivity.image}
                        alt={mainActivity.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-burgundy text-white text-[10px] font-bold uppercase tracking-wider">
                        {mainActivity.category}
                      </span>
                    </div>
                  )}
                  <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-ivory/70 mb-2">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {mainActivity.date}
                        </span>
                        <span className="inline-flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-burgundy-300" />
                          {mainActivity.location}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold leading-snug mb-2">
                        {mainActivity.title}
                      </h4>
                      <p className="text-xs text-ivory/80 line-clamp-2 leading-relaxed">
                        {mainActivity.description}
                      </p>
                    </div>
                    {mainActivity.imageCredit && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 text-[10px] text-ivory/50 flex items-center gap-1">
                        <Camera className="w-3 h-3 text-burgundy-300" />
                        <span className="truncate">{mainActivity.imageCredit}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2 Kartu Kecil Berdampingan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-xl bg-white border border-navy/10 hover:border-burgundy/30 shadow-xs transition-all flex gap-3.5 items-start"
                >
                  {act.image && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-navy/10">
                      <Image
                        src={act.image}
                        alt={act.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-burgundy block">
                      {act.category} · {act.date}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-navy leading-snug line-clamp-2 mt-0.5">
                      {act.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN (5 Kolom): Daftar Editorial 3 Sorotan Publikasi & Liputan Pers */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between border-b border-navy/10 pb-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-navy">
                Publikasi & Sorotan Pers
              </h3>
              <Link
                href="/publikasi"
                className="inline-flex items-center gap-1 text-xs font-bold text-burgundy hover:text-navy transition-colors"
              >
                <span>Semua Publikasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-navy/10 divide-y divide-navy/10 shadow-xs">
              {topPublications.map((pub) => (
                <div key={pub.id} className="p-5 hover:bg-ivory/40 transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-ivory text-burgundy border border-navy/10">
                      {pub.type}
                    </span>
                    <span className="text-[11px] text-charcoal/50 font-mono">
                      {pub.date}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-navy leading-snug mb-1">
                    {pub.title}
                  </h4>

                  <p className="text-[11px] font-semibold text-charcoal/65 mb-2">
                    Sumber: <span className="text-navy">{pub.source}</span> · Oleh: {pub.author}
                  </p>

                  <p className="text-xs text-charcoal/75 line-clamp-2 leading-relaxed mb-2.5">
                    {pub.excerpt}
                  </p>

                  {pub.url && pub.url !== '#' ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-burgundy hover:text-navy uppercase tracking-wider"
                    >
                      <span>Baca di {pub.source}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href="/publikasi"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-navy hover:text-burgundy uppercase tracking-wider"
                    >
                      <span>Detail Publikasi</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
