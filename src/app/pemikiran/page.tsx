import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDatabase } from '@/lib/db';
import { Calendar, Clock, ArrowRight, ArrowUpRight, BookOpen, Search, Camera } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const db = getDatabase();
  return {
    title: `Pemikiran dan Gagasan | ${db.profile.shortName}`,
    description: `Koleksi tulisan, esai, telaah hukum pertanahan, ekonomi syariah, dan catatan pengabdian Dr. Naghfir.`,
  };
}

export default function ThoughtsPage({
  searchParams,
}: {
  searchParams: { kategori?: string; q?: string };
}) {
  const db = getDatabase();
  const selectedCategory = searchParams.kategori;
  const searchQuery = searchParams.q?.toLowerCase();

  const categories = [
    'Semua',
    'Hukum dan Masyarakat',
    'Hukum Agraria dan Pertanahan',
    'Ekonomi Syariah',
    'Pesantren dan Pendidikan',
    'Wakaf dan Aset Umat',
    'Kepemudaan',
    'Pembangunan Sumenep',
  ];

  let filtered = db.articles.filter((a) => a.status === 'published');

  if (selectedCategory && selectedCategory !== 'Semua') {
    filtered = filtered.filter((a) => a.category === selectedCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery) ||
        a.summary.toLowerCase().includes(searchQuery) ||
        a.category.toLowerCase().includes(searchQuery)
    );
  }

  return (
    <div className="py-12 lg:py-20 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-navy/10 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <Link href="/" className="hover:underline">Beranda</Link>
            <span>/</span>
            <span>Ruang Pemikiran</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-navy tracking-tight mb-4">
            Pemikiran dan Gagasan
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans">
            Gagasan intelektual, analisis regulasi, dan telaah kritis mengenai hukum kenotariatan, hak tanah agraria, ekonomi syariah, serta kemaslahatan masyarakat Sumenep.
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
                href={cat === 'Semua' ? '/pemikiran' : `/pemikiran?kategori=${encodeURIComponent(cat)}`}
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

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-navy/10">
            <BookOpen className="w-12 h-12 text-charcoal/30 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy">Belum ada tulisan di kategori ini</h3>
            <p className="text-sm text-charcoal/60 mt-1">
              Silakan pilih kategori lain atau kembali ke seluruh pemikiran.
            </p>
            <Link
              href="/pemikiran"
              className="inline-block mt-4 text-xs font-bold uppercase text-burgundy hover:underline"
            >
              Tampilkan Semua Tulisan
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-navy/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {article.coverImage && (
                  <div className="relative h-48 w-full bg-navy/10 overflow-hidden">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 font-bold uppercase tracking-wider text-burgundy text-[11px] bg-white/95 px-3 py-1 rounded-full shadow-sm">
                      {article.category}
                    </span>
                    {article.coverCredit && (
                      <span className="absolute bottom-2 right-3 text-[10px] text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <Camera className="w-2.5 h-2.5" />
                        <span>{article.coverCredit}</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {!article.coverImage && (
                      <div className="flex items-center justify-between text-xs text-charcoal/60 mb-3">
                        <span className="font-bold uppercase tracking-wider text-burgundy text-[11px]">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                    )}

                    <h2 className="text-xl font-bold text-navy group-hover:text-burgundy transition-colors leading-snug mb-3">
                      <Link href={`/pemikiran/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed line-clamp-3 mb-6">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-navy/10 flex items-center justify-between text-xs">
                    <span className="text-charcoal/60 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <Link
                      href={`/pemikiran/${article.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-burgundy group-hover:text-navy transition-colors"
                    >
                      <span>Baca Artikel</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
