import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleItem } from '@/data/initialData';
import { ArrowRight } from 'lucide-react';

interface ThoughtsSectionProps {
  articles: ArticleItem[];
}

export default function ThoughtsSection({ articles }: ThoughtsSectionProps) {
  const publishedArticles = articles.filter((a) => a.status === 'published');
  const featuredArticle = publishedArticles.find((a) => a.featured) || publishedArticles[0];
  const sideArticles = publishedArticles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#252525]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header tanpa Nomor Birokratis */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-10 border-b border-[#252525]/15 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burgundy block mb-2">
              Esai & Kolom Hukum
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
              Pemikiran dan Gagasan
            </h2>
          </div>

          <Link
            href="/pemikiran"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-burgundy transition-colors shrink-0"
          >
            <span>Semua Tulisan & Gagasan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Noah Feldman Style Pure Editorial Split (No Boxy Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Sisi Kiri (6 Kolom): 1 Artikel Utama (Featured Essay) */}
          {featuredArticle && (
            <article className="lg:col-span-6 group">
              {featuredArticle.coverImage && (
                <Link href={`/pemikiran/${featuredArticle.slug}`} className="block mb-5 overflow-hidden rounded-lg bg-ivory border border-[#252525]/10">
                  <div className="relative h-60 sm:h-72 w-full">
                    <Image
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-700"
                    />
                  </div>
                </Link>
              )}

              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-burgundy mb-2.5">
                <span>{featuredArticle.category}</span>
                <span className="text-charcoal/30">·</span>
                <span className="font-normal text-charcoal/60 capitalize">{featuredArticle.date}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-navy group-hover:text-burgundy transition-colors leading-snug mb-3">
                <Link href={`/pemikiran/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans mb-5">
                {featuredArticle.summary}
              </p>

              <Link
                href={`/pemikiran/${featuredArticle.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-burgundy hover:text-navy border-b border-burgundy/40 pb-0.5 transition-colors"
              >
                <span>Baca Esai Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          )}

          {/* Sisi Kanan (6 Kolom): 3 Daftar Artikel Terbaru (Hanya Dipisahkan Garis Tipis) */}
          <div className="lg:col-span-6 lg:pl-8 lg:border-l border-[#252525]/15 divide-y divide-[#252525]/15">
            {sideArticles.map((article, idx) => (
              <article
                key={article.id}
                className={`${idx === 0 ? 'pb-7' : idx === sideArticles.length - 1 ? 'pt-7' : 'py-7'} group`}
              >
                <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-widest text-burgundy mb-2">
                  <span>{article.category}</span>
                  <span className="text-charcoal/30">·</span>
                  <span className="font-normal text-charcoal/60 capitalize">{article.date}</span>
                  <span className="text-charcoal/30">·</span>
                  <span className="font-normal text-charcoal/60 lowercase">{article.readTime}</span>
                </div>

                <h4 className="text-lg sm:text-xl font-serif font-bold text-navy group-hover:text-burgundy transition-colors leading-snug mb-2">
                  <Link href={`/pemikiran/${article.slug}`}>
                    {article.title}
                  </Link>
                </h4>

                <p className="text-xs sm:text-sm text-charcoal/75 line-clamp-2 leading-relaxed font-sans">
                  {article.summary}
                </p>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
