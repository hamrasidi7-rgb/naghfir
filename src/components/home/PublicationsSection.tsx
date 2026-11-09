import React from 'react';
import Link from 'next/link';
import { PublicationItem } from '@/data/initialData';
import { Newspaper, ExternalLink, BookCheck, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

interface PublicationsSectionProps {
  publications: PublicationItem[];
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
              <span>Arsip Tulisan & Media</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
              Publikasi dan Media
            </h2>
            <p className="text-base text-charcoal/80 leading-relaxed font-sans">
              Dokumentasi liputan media arus utama, hasil riset ilmiah, serta karya telaah hukum yang merekam pemikiran dan perjalanan Dr. Naghfir.
            </p>
          </div>

          <Link
            href="/publikasi"
            className="inline-flex items-center gap-2 text-sm font-bold text-burgundy hover:text-navy transition-colors group"
          >
            <span>Semua Publikasi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Publications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publications.map((item) => {
            const isMediaArticle = item.source.includes('Mata Madura');

            return (
              <div
                key={item.id}
                className="bg-[#FAF7F2] p-8 rounded-2xl border border-navy/10 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white text-burgundy border border-navy/10">
                      {item.type}
                    </span>
                    <span className="text-xs text-charcoal/60 font-medium">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-xs font-semibold text-charcoal/70 mb-4 space-y-0.5">
                    <p>Media / Penerbit: <span className="text-navy">{item.source}</span></p>
                    <p>Penulis: <span className="text-navy font-bold">{item.author}</span></p>
                  </div>

                  <p className="text-xs leading-relaxed text-charcoal/80 mb-6">
                    {item.excerpt}
                  </p>

                  {/* Editorial Attribution Warning for external profile */}
                  {item.notes && (
                    <div className="p-3 rounded-lg bg-ivory text-[11px] text-charcoal/70 border border-navy/5 mb-6">
                      <span className="font-semibold block text-navy">Catatan Sumber:</span>
                      {item.notes}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-navy/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-charcoal/50">
                    {item.isExternalVerified ? '✓ Terverifikasi' : 'Arsip Internal'}
                  </span>

                  {item.url && item.url !== '#' ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy hover:text-navy transition-colors"
                    >
                      <span>Buka Tautan</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-charcoal/40 italic">
                      Arsip Fisik / Perpustakaan
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
