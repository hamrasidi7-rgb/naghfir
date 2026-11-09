import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDatabase } from '@/lib/db';
import { Calendar, Clock, ArrowLeft, Share2, Tag, BookOpen, User, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const db = getDatabase();
  const article = db.articles.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan' };

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const db = getDatabase();
  const article = db.articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const profile = db.profile;
  const related = db.articles
    .filter((a) => a.id !== article.id && a.status === 'published')
    .slice(0, 2);

  // Article JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.date,
    publisher: {
      '@type': 'Person',
      name: profile.name,
    },
  };

  return (
    <article className="py-12 lg:py-20 bg-[#FDFCFB]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/pemikiran"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal/70 hover:text-burgundy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Seluruh Pemikiran</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 border-b border-navy/10 pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal/70 mb-4">
            <span className="px-3 py-1 rounded-full bg-burgundy text-white font-semibold uppercase tracking-wider text-[11px]">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <div className="p-4 rounded-xl bg-ivory/80 border border-navy/10 text-sm sm:text-base text-charcoal/90 italic font-serif leading-relaxed">
            {article.summary}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-charcoal/60">
            <span className="flex items-center gap-2 font-medium">
              <User className="w-4 h-4 text-burgundy" />
              Ditulis oleh: <strong className="text-navy">{article.author}</strong>
            </span>
          </div>
        </header>

        {/* Article Body Content */}
        <div className="prose prose-lg max-w-none text-charcoal leading-relaxed space-y-6 font-sans">
          {article.content.split('\n\n').map((block, idx) => {
            if (block.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-2xl font-bold text-navy mt-8 mb-4">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            if (block.startsWith('1. ') || block.startsWith('2. ') || block.startsWith('3. ')) {
              const lines = block.split('\n');
              return (
                <ol key={idx} className="list-decimal pl-6 space-y-2 text-base text-charcoal/85">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx}>
                      {line.replace(/^\d+\.\s*/, '')}
                    </li>
                  ))}
                </ol>
              );
            }
            if (block.startsWith('- ')) {
              const lines = block.split('\n');
              return (
                <ul key={idx} className="list-disc pl-6 space-y-2 text-base text-charcoal/85">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx}>
                      {line.replace(/^-\s*/, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-base sm:text-lg text-charcoal/85 leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>

        {/* Author Bio Box */}
        <div className="mt-16 p-8 rounded-2xl bg-[#FAF7F2] border border-navy/10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-burgundy">
            <Image
              src={profile.heroImage}
              alt={profile.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-1.5 text-xs sm:text-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy block">
              Tentang Penulis
            </span>
            <h4 className="text-lg font-bold text-navy">
              {profile.name}
            </h4>
            <p className="text-charcoal/70 leading-relaxed">
              Notaris dan PPAT, akademisi, serta penggiat perlindungan aset wakaf di Lembaga Wakaf dan Pertanahan NU (LWPNU) Sumenep, Madura.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-navy/10">
            <h3 className="text-xl font-bold text-navy mb-6">
              Pemikiran Terkait Lainnya
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/pemikiran/${item.slug}`}
                  className="p-6 rounded-2xl bg-white border border-navy/10 hover:shadow-md transition-all group"
                >
                  <span className="text-[11px] font-bold uppercase text-burgundy block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-navy group-hover:text-burgundy transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-charcoal/70 line-clamp-2">
                    {item.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
