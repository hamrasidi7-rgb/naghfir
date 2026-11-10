'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Landmark, LandPlot, ScrollText } from 'lucide-react';
import { CategoryId, SERVICE_CATEGORIES } from '@/data/prototype/consultation';
import ConsultationSimulator, { SimulatorSelection } from './ConsultationSimulator';

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
  // Pilihan dari kartu layanan diteruskan ke simulator
  const [selection, setSelection] = useState<SimulatorSelection>({
    categoryId: 'notaris',
    serviceId: SERVICE_CATEGORIES[0].services[0].id,
    nonce: 0,
  });

  // State accordion: semua tiga bidang tertutup secara default (null)
  const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>(null);

  const toggleCategory = (id: CategoryId) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  const choose = (categoryId: CategoryId, serviceId: string) => {
    setSelection((prev) => ({ categoryId, serviceId, nonce: prev.nonce + 1 }));
    document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="layanan" className="scroll-mt-20 border-y border-line bg-paper">
      <div className="page-container py-14 sm:py-18 lg:py-20">
        {/* Header Seksi */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Layanan Profesional</p>
            <h2 className="section-title mt-3">Layanan Notaris &amp; PPAT</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-[15px] lg:col-span-5 lg:justify-self-end">
            Kantor Notaris &amp; PPAT Dr. Naghfir melayani pembuatan akta autentik, peralihan hak
            atas tanah, dan pendampingan urusan pertanahan di Kabupaten Sumenep secara profesional.
          </p>
        </div>

        {/* Interactive Expandable Cards (Accordion 3 Bidang Layanan) */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-3">
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
                    : 'border-line shadow-xs hover:border-line-dark hover:shadow-sm'
                }`}
              >
                {/* Header Card (Bisa diklik untuk expand/collapse) */}
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  className="w-full p-6 sm:p-7 text-left select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                >
                  {/* Baris Atas: Nomor Bidang & Ikon */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs font-semibold tracking-wider text-brass uppercase">
                      Bidang {cat.number}
                    </span>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                        isExpanded
                          ? 'border-brass/40 bg-paper-muted text-brass'
                          : 'border-line/70 bg-paper-muted/60 text-muted'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Judul Bidang */}
                  <h3 className="mt-4 font-serif text-xl sm:text-2xl font-semibold text-ink leading-snug">
                    {cat.title}
                  </h3>

                  {/* Deskripsi Singkat Proporsional */}
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-muted line-clamp-3">
                    {CATEGORY_DESCRIPTIONS[cat.id]}
                  </p>

                  {/* Baris Bawah Card: Jumlah Layanan & Indikator Expand */}
                  <div className="mt-5 flex items-center justify-between border-t border-line/70 pt-4 text-xs font-semibold">
                    <span className="inline-flex items-center rounded-full bg-paper-muted px-2.5 py-1 text-[11px] font-medium text-ink/80">
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
                    className="border-t border-line/70 bg-paper/40 px-6 pb-6 pt-4 animate-in fade-in-50 duration-200"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Pilih Layanan untuk Konsultasi:
                    </p>

                    <ul className="mt-3 space-y-1.5" role="list">
                      {cat.services.map((srv) => (
                        <li key={srv.id}>
                          <button
                            type="button"
                            onClick={() => choose(cat.id, srv.id)}
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
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Quick Link Konsultasi */}
                    <div className="mt-4 border-t border-line/60 pt-3.5">
                      <button
                        type="button"
                        onClick={() => choose(cat.id, cat.services[0].id)}
                        className="text-link text-xs font-semibold sm:text-sm"
                      >
                        <span>Konsultasikan Semua Kebutuhan {cat.label}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Simulasi alur konsultasi */}
        <ConsultationSimulator
          key={selection.nonce}
          initial={selection}
          whatsappNumber={whatsappNumber}
        />
      </div>
    </section>
  );
}
