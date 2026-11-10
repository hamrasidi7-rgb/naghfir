import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ArticleItem, SocialContributionItem } from '@/data/initialData';

interface DevotionThoughtsSectionProps {
  socialContribution: SocialContributionItem[];
  articles: ArticleItem[];
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
};

export default function DevotionThoughtsSection({ socialContribution, articles }: DevotionThoughtsSectionProps) {
  const devotions = [...socialContribution].sort((a, b) => a.order - b.order).slice(0, 3);
  const thoughts = articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section id="pengabdian" className="scroll-mt-20 border-y border-line bg-white">
      <div className="page-container py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Pengabdian &amp; Pemikiran</p>
          <h2 className="section-title mt-5">Ilmu yang Diabdikan untuk Masyarakat</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-line">
          {/* Pengabdian */}
          <div className="lg:pr-14">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-4">
              <h3 className="font-serif text-2xl font-semibold text-ink">Pengabdian</h3>
              <Link href="/aktivitas" className="text-link shrink-0 text-xs">
                Catatan aktivitas <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <ol>
              {devotions.map((item, i) => (
                <li key={item.id} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-line py-6">
                  <span className="font-serif text-sm font-semibold text-brass">0{i + 1}</span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-deep">
                      {item.focusArea}
                    </p>
                    <h4 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted">{item.role}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Pemikiran */}
          <div id="pemikiran" className="scroll-mt-20 lg:pl-14">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-4">
              <h3 className="font-serif text-2xl font-semibold text-ink">Pemikiran</h3>
              <Link href="/pemikiran" className="text-link shrink-0 text-xs">
                Semua tulisan <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <ol>
              {thoughts.map((article) => (
                <li key={article.id} className="border-b border-line">
                  <Link href={`/pemikiran/${article.slug}`} className="group block py-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-deep">
                      {article.category}
                      <span className="mx-2 text-line">|</span>
                      <span className="font-medium normal-case tracking-normal text-muted">
                        {formatDate(article.date)}
                      </span>
                    </p>
                    <h4 className="mt-2 flex items-start justify-between gap-4 font-serif text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-brass-deep">
                      <span>{article.title}</span>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-brass opacity-0 transition-opacity group-hover:opacity-100" />
                    </h4>
                    <p className="mt-1 text-sm text-muted">
                      {/baca/i.test(article.readTime) ? article.readTime : `${article.readTime} baca`}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
