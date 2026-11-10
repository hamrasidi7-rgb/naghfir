import React from 'react';
import Link from 'next/link';
import { getDatabase } from '@/lib/db';
import { ExternalLink, BookCheck, ShieldAlert, FileText, Newspaper } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const db = getDatabase();
  return {
    title: `Publikasi & Media | ${db.profile.shortName}`,
    description: `Arsip liputan media, profil jurnalisme, dan publikasi karya ilmiah Dr. Naghfir.`,
  };
}

export default function PublicationsPage() {
  const db = getDatabase();
  const publications = db.publications;

  return (
    <div className="py-12 lg:py-20 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-line pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brass mb-3">
            <Link href="/" className="hover:underline">Beranda</Link>
            <span>/</span>
            <span>Publikasi</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-ink tracking-tight mb-4">
            Publikasi dan Media
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-3xl font-sans">
            Dokumentasi liputan media pers terverifikasi, publikasi ilmiah, artikel telaah, dan monograf hukum.
          </p>
        </div>

        {/* Featured Media Reference: Mata Madura News */}
        <div className="mb-12 p-8 lg:p-10 rounded-2xl bg-paper-card border border-line shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-burgundy text-white text-xs font-bold uppercase tracking-wider">
              Liputan Utama Media
            </span>
            <span className="text-xs text-charcoal/60">Arsip Pers Daerah</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-navy mb-2">
            Naghfir: Dari Pesantren ke Meja Akta
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-charcoal/70 mb-4">
            <span>Media: <strong className="text-navy">Mata Madura News</strong></span>
            <span>·</span>
            <span>Penulis Liputan: <strong className="text-navy">Hambali Rasidi</strong></span>
            <span>·</span>
            <span>Tahun Terbit: 2021</span>
          </div>

          <p className="text-sm text-charcoal/80 leading-relaxed mb-6 max-w-3xl">
            Liputan mendalam oleh jurnalis senior Hambali Rasidi yang menelusuri perjalanan hidup Dr. Naghfir dari masa tempaan di Pondok Pesantren Aqidah Usymuni Terate hingga meraih amanah sebagai Notaris dan Pejabat Pembuat Akta Tanah di Sumenep.
          </p>

          <div className="p-4 rounded-xl bg-white border border-navy/10 text-xs text-charcoal/75 mb-6 max-w-3xl">
            <span className="font-bold text-navy block mb-0.5">Catatan Hak Cipta & Integritas:</span>
            Artikel ini ditulis secara independen oleh Hambali Rasidi (Mata Madura News) sebagai karya jurnalistik profil tokoh, dan didokumentasikan di sini sebagai referensi publik yang sah.
          </div>

          <a
            href="https://matamaduranews.com/naghfir-dari-pesantren-ke-meja-akta/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy hover:bg-burgundy text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Baca Artikel Lengkap di Mata Madura News</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Other Publications Grid */}
        <h3 className="text-2xl font-bold text-navy mb-6">
          Karya Ilmiah & Modul Kajian
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publications.filter(p => !p.source.includes('Mata Madura')).map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl border border-navy/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-charcoal/60 mb-3">
                  <span className="font-bold uppercase tracking-wider text-burgundy text-[11px] px-2.5 py-0.5 rounded-full bg-burgundy/10">
                    {item.type}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h4 className="text-xl font-bold text-navy mb-2 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-charcoal/70 mb-4 font-medium">
                  Institusi / Media: <span className="text-navy font-semibold">{item.source}</span> · Penulis: <span className="text-navy">{item.author}</span>
                </p>

                <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
                  {item.excerpt}
                </p>

                {item.notes && (
                  <div className="p-3 rounded-lg bg-ivory text-xs text-charcoal/70 border border-navy/5 mb-6">
                    {item.notes}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-navy/10 flex items-center justify-between text-xs font-mono text-charcoal/50">
                <span>✓ Dokumen Ilmiah</span>
                <span>Terarsip</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
