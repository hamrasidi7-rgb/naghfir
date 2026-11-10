'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Landmark, LandPlot, ScrollText } from 'lucide-react';
import { CategoryId, SERVICE_CATEGORIES } from '@/data/prototype/consultation';
import { getWhatsAppUrl } from '@/config/whatsapp';

const CATEGORY_ICONS: Record<CategoryId, React.ElementType> = {
  notaris: ScrollText,
  ppat: Landmark,
  pertanahan: LandPlot,
};

// Deskripsi ringkas & proporsional (15–20 kata, istilah yuridis tepat)
const CATEGORY_DESCRIPTIONS: Record<CategoryId, string> = {
  notaris:
    'Pembuatan akta autentik pendirian badan usaha, anggaran dasar koperasi, perjanjian perikatan, serta legalisasi dokumen berlandaskan ketelitian hukum.',
  ppat:
    'Pembuatan akta PPAT terkait peralihan dan pembebanan hak atas tanah melalui jual beli, hibah, pembagian hak bersama, serta hak tanggungan.',
  pertanahan:
    'Pengecekan sertifikat tanah melalui layanan pertanahan yang berwenang, permohonan balik nama, telaah riwayat kepemilikan, serta pendampingan sertifikasi tanah wakaf.',
};

interface ServicesSectionProps {
  whatsappNumber?: string;
}

export default function ServicesSection({ whatsappNumber }: ServicesSectionProps) {
  // State accordion: semua tiga bidang tertutup secara default (null)
  const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>(null);

  const toggleCategory = (id: CategoryId) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  return (
    <section id="layanan" className="scroll-mt-20 border-y border-line bg-paper">
      <div className="page-container py-10 sm:py-14 lg:py-16">
        {/* Header Seksi Ringkas & Elegan */}
        <div>
          <h2 className="section-title">Layanan Profesional</h2>
        </div>

        {/* Interactive Expandable Cards (Accordion 3 Layanan Rapat & Tanpa Ruang Kosong Berlebih) */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 items-start gap-4 sm:gap-5 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id];
            const isExpanded = expandedCategory === cat.id;
            const panelId = `services-panel-${cat.id}`;
            const buttonId = `services-button-${cat.id}`;

            return (
              <div
                key={cat.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 bg-paper-card ${
                  isExpanded
                    ? 'border-brass/70 shadow-[0_12px_32px_-12px_rgba(158,116,40,0.18)] ring-1 ring-brass/30'
                    : 'border-line shadow-2xs hover:border-line-dark hover:shadow-xs'
                }`}
              >
                {/* Header Card (Bisa diklik untuk expand/collapse) */}
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  className="w-full p-4.5 sm:p-5 text-left select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                >
                  {/* Ikon dan Judul Sejajar Rapat (Nomor Bidang Ditiadakan) */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        isExpanded
                          ? 'border-brass/40 bg-paper-muted text-brass'
                          : 'border-line/70 bg-paper-muted/60 text-muted'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink leading-snug">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Deskripsi Singkat Proporsional */}
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-muted line-clamp-2 sm:line-clamp-3">
                    {CATEGORY_DESCRIPTIONS[cat.id]}
                  </p>

                  {/* Baris Bawah Card: Jumlah Layanan & Indikator Expand */}
                  <div className="mt-3.5 flex items-center justify-between border-t border-line/70 pt-3 text-xs font-semibold">
                    <span className="inline-flex items-center rounded-full bg-paper-muted px-2.5 py-0.5 text-[11px] font-medium text-ink/80">
                      {cat.services.length} Layanan
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                        isExpanded ? 'text-brass' : 'text-muted group-hover:text-ink'
                      }`}
                    >
                      <span>{isExpanded ? 'Tutup Daftar' : 'Lihat Layanan'}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-brass' : 'text-muted'
                        }`}
                      />
                    </span>
                  </div>
                </button>

                {/* Konten Terbuka (Expandable Panel) */}
                {isExpanded && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-t border-line/70 bg-paper/40 px-4.5 pb-4.5 pt-3.5 animate-in fade-in-50 duration-200"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Pilih Layanan untuk Konsultasi:
                    </p>

                    <ul className="mt-2.5 space-y-1" role="list">
                      {cat.services.map((srv) => (
                        <li key={srv.id}>
                          <a
                            href={getWhatsAppUrl(
                              `Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, saya ingin berkonsultasi mengenai layanan ${srv.name}.`,
                              whatsappNumber
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex w-full items-start justify-between gap-3 rounded-xl border border-transparent p-2.5 text-left transition-all hover:border-line hover:bg-paper-card"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass/60 transition-colors group-hover:bg-brass" />
                              <div>
                                <span className="block text-xs sm:text-[13px] font-semibold text-ink group-hover:text-brass transition-colors">
                                  {srv.name}
                                </span>
                                <span className="mt-0.5 block text-[11px] leading-normal text-muted">
                                  {srv.summary}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-brass opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </a>
                        </li>
                      ))}
                    </ul>

                    {/* Quick Link Konsultasi */}
                    <div className="mt-3.5 border-t border-line/60 pt-3">
                      <a
                        href={getWhatsAppUrl(
                          cat.id === 'notaris' ? 'notaris' : cat.id === 'ppat' ? 'ppat' : 'pertanahan',
                          whatsappNumber
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link text-xs font-semibold sm:text-sm"
                      >
                        <span>Konsultasikan Semua Kebutuhan {cat.label}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
