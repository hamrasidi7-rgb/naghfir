import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ActivityItem, PublicationItem } from '@/data/initialData';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface HighlightsSectionProps {
  activities: ActivityItem[];
  publications: PublicationItem[];
}

export default function HighlightsSection({ activities, publications }: HighlightsSectionProps) {
  const topActivities = [...activities].sort((a, b) => a.order - b.order).slice(0, 3);
  const topPublications = publications.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#252525]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Single Calm Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-10 border-b border-[#252525]/15 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burgundy block mb-2">
              Dokumentasi & Sorotan Pers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
              Jejak Aktivitas dan Publikasi
            </h2>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <Link
              href="/aktivitas"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-navy hover:text-burgundy transition-colors"
            >
              <span>Arsip Aktivitas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/publikasi"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-burgundy hover:text-navy transition-colors"
            >
              <span>Semua Publikasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bagian Atas: 3 Foto Dokumentasi Bersih (Gaya Galeri Anies Baswedan) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topActivities.map((act) => (
            <figure key={act.id} className="group">
              {act.image && (
                <div className="relative h-52 w-full overflow-hidden rounded-lg bg-ivory border border-[#252525]/10 mb-3.5">
                  <Image
                    src={act.image}
                    alt={act.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
              )}
              <figcaption>
                <div className="text-[11px] font-bold uppercase tracking-widest text-burgundy mb-1">
                  {act.category} <span className="text-charcoal/40 font-normal">· {act.date}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-navy leading-snug mb-1.5">
                  {act.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 line-clamp-2 leading-relaxed font-sans">
                  {act.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bagian Bawah: Baris Kutipan & Sorotan Publikasi Pers (Dipisahkan Garis Tipis) */}
        <div className="mt-14 pt-10 border-t border-[#252525]/15">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/50">
              Liputan Media & Publikasi Ilmiah Terverifikasi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#252525]/15">
            {topPublications.map((pub, idx) => (
              <div
                key={pub.id}
                className={`py-5 md:py-1 flex flex-col justify-between ${
                  idx === 0
                    ? 'md:pr-8'
                    : idx === 1
                    ? 'md:px-8'
                    : 'md:pl-8'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-burgundy mb-1.5">
                    <span>{pub.source}</span>
                    <span className="text-charcoal/30">·</span>
                    <span className="font-mono font-normal text-charcoal/60">{pub.date}</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-navy leading-snug mb-2">
                    &ldquo;{pub.title}&rdquo;
                  </h4>
                  <p className="text-xs text-charcoal/75 line-clamp-2 leading-relaxed mb-3">
                    {pub.excerpt}
                  </p>
                </div>

                <div>
                  {pub.url && pub.url !== '#' ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-navy hover:text-burgundy transition-colors"
                    >
                      <span>Baca Sumber Asli</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href="/publikasi"
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-charcoal/60 hover:text-navy transition-colors"
                    >
                      <span>Lihat Keterangan Arsip</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
