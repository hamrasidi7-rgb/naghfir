'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  BookOpen,
  Newspaper,
  ChevronDown,
} from 'lucide-react';
import { ArticleItem, PublicationItem } from '@/data/initialData';

interface ThoughtsSectionProps {
  articles: ArticleItem[];
  publications: PublicationItem[];
}

export default function ThoughtsSection({
  articles,
  publications,
}: ThoughtsSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const publishedArticles = articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  const topThreeArticles = publishedArticles.slice(0, 3);

  return (
    <section
      id="pemikiran"
      className="py-6 lg:py-8 lg:pl-8 flex flex-col justify-between"
    >
      {/* Kartu Horizontal Pemikiran Sesuai Mockup */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative w-full sm:w-44 h-40 sm:h-36 rounded-2xl overflow-hidden border border-[#E5DEC9] shadow-xs shrink-0 bg-[#EFE8D8]">
          <Image
            src="/images/context/buku-hukum.jpg"
            alt="Pemikiran Hukum, Agraria, dan Ekonomi Syariah Dr. Naghfir"
            fill
            sizes="(max-width: 640px) 100vw, 180px"
            className="object-cover object-center"
          />
        </div>

        <div className="flex-1 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6526] block">
            PEMIKIRAN
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142134] leading-snug">
            Gagasan untuk Masyarakat yang Lebih Adil
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
            Artikel, opini, dan pemikiran seputar hukum, agraria, ekonomi syariah, dan kemaslahatan umat.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B6526] hover:text-[#142134] border-b-2 border-[#C5A059] pb-0.5 transition-colors"
            >
              <span>{expanded ? 'Tutup Artikel' : 'Baca Artikel'}</span>
              {expanded ? (
                <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Panel Ekspansi: 3 Artikel Unggulan + Karya Ilmiah & Liputan Media */}
      {expanded && (
        <div className="mt-6 p-5 rounded-2xl bg-white border border-[#D8CEBE] shadow-md space-y-6">
          {/* 3 Artikel & Opini Unggulan */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#E6DFCE] pb-2">
              <h3 className="font-serif font-bold text-base text-[#142134]">
                Artikel &amp; Opini Unggulan
              </h3>
              <Link
                href="/pemikiran"
                className="text-xs font-bold text-[#8B6526] hover:text-[#142134] inline-flex items-center gap-1"
              >
                <span>Semua Artikel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {topThreeArticles.map((art) => (
                <article
                  key={art.id}
                  className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E6DFCE] hover:border-[#C5A059] transition-colors"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B6526]">
                    {art.category} · {art.date} · {art.readTime}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#142134] mt-0.5">
                    <Link
                      href={`/pemikiran/${art.slug}`}
                      className="hover:text-[#8B6526] transition-colors"
                    >
                      {art.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-[#374151] mt-1 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                  <Link
                    href={`/pemikiran/${art.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B6526] hover:text-[#142134] mt-2"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Karya Ilmiah & Liputan Media Terverifikasi */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-[#142134] border-b border-[#E6DFCE] pb-2">
              Karya Ilmiah &amp; Publikasi Media
            </h3>
            <div className="space-y-2.5">
              {publications.map((pub) => {
                const isAcademic =
                  pub.type === 'Jurnal Ilmiah' || pub.type === 'Buku / Modul';
                return (
                  <div
                    key={pub.id}
                    className="p-3 rounded-xl border border-[#E6DFCE] bg-white space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8B6526]">
                      <span className="inline-flex items-center gap-1">
                        {isAcademic ? (
                          <BookOpen className="w-3 h-3" />
                        ) : (
                          <Newspaper className="w-3 h-3" />
                        )}
                        {pub.type} · {pub.source}
                      </span>
                      <span className="text-[#4B5563] font-normal">{pub.date}</span>
                    </div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#142134]">
                      &ldquo;{pub.title}&rdquo;
                    </h4>
                    <p className="text-xs text-[#4B5563] line-clamp-2">
                      {pub.excerpt}
                    </p>
                    {pub.url && pub.url !== '#' && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B6526] hover:text-[#142134] pt-1"
                      >
                        <span>Baca Sumber Asli</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
