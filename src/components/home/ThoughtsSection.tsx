import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleItem } from '@/data/initialData';
import { Calendar, Clock, ArrowRight, ArrowUpRight, BookOpen, Camera } from 'lucide-react';

interface ThoughtsSectionProps {
  articles: ArticleItem[];
}

export default function ThoughtsSection({ articles }: ThoughtsSectionProps) {
  const publishedArticles = articles.filter((a) => a.status === 'published');
  const featuredArticle = publishedArticles.find((a) => a.featured) || publishedArticles[0];
  const sideArticles = publishedArticles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
              <span>07 · Pemikiran & Gagasan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
              Pemikiran dan Gagasan
            </h2>
            <p className="text-base text-charcoal/80 leading-relaxed font-sans">
              Diskursus seputar hukum kenotariatan, regulasi agraria, ekonomi syariah, dan masa depan pembangunan masyarakat Madura.
            </p>
          </div>

          <Link
            href="/pemikiran"
            className="inline-flex items-center gap-2 text-sm font-bold text-burgundy hover:text-navy transition-colors group"
          >
            <span>Semua Tulisan & Artikel</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Magazine Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Featured Editorial Story with Image */}
          {featuredArticle && (
            <article className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-[#FAF7F2] border border-navy/10 hover:shadow-lg transition-all group overflow-hidden">
              {featuredArticle.coverImage && (
                <div className="relative h-64 sm:h-72 w-full bg-navy/10 overflow-hidden">
                  <Image
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-burgundy text-white font-semibold uppercase tracking-wider text-[11px] shadow-sm">
                    {featuredArticle.category}
                  </span>
                  {featuredArticle.coverCredit && (
                    <span className="absolute bottom-2 right-3 text-[10px] text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1">
                      <Camera className="w-2.5 h-2.5" />
                      <span>{featuredArticle.coverCredit}</span>
                    </span>
                  )}
                </div>
              )}

              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-medium text-charcoal/60 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticle.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy group-hover:text-burgundy transition-colors leading-tight mb-4">
                    <Link href={`/pemikiran/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h3>

                  <p className="text-base text-charcoal/80 leading-relaxed font-sans mb-6">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-navy/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal/70">
                    Penulis: {featuredArticle.author}
                  </span>
                  <Link
                    href={`/pemikiran/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-burgundy group-hover:text-navy transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Side Editorial Stories List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {sideArticles.map((article) => (
              <article
                key={article.id}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-navy/10 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs text-charcoal/60 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy">
                      {article.category}
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-navy group-hover:text-burgundy transition-colors leading-snug mb-2">
                    <Link href={`/pemikiran/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>

                  <p className="text-xs sm:text-sm text-charcoal/70 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-navy/5 flex items-center justify-end">
                  <Link
                    href={`/pemikiran/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-navy group-hover:text-burgundy transition-colors"
                  >
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
