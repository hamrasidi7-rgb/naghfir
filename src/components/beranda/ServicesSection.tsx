'use client';

import React, { useState } from 'react';
import { ArrowRight, Landmark, LandPlot, ScrollText } from 'lucide-react';
import { CategoryId, SERVICE_CATEGORIES } from '@/data/prototype/consultation';
import ConsultationSimulator, { SimulatorSelection } from './ConsultationSimulator';

const CATEGORY_ICONS: Record<CategoryId, React.ElementType> = {
  notaris: ScrollText,
  ppat: Landmark,
  pertanahan: LandPlot,
};

// Deskripsi ringkas & proporsional (15–20 kata, bebas klaim absolut, istilah yuridis tepat)
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
  // Pilihan dari kartu layanan diteruskan ke simulator (key memaksa simulator mulai ulang).
  const [selection, setSelection] = useState<SimulatorSelection>({
    categoryId: 'notaris',
    serviceId: SERVICE_CATEGORIES[0].services[0].id,
    nonce: 0,
  });

  const choose = (categoryId: CategoryId, serviceId: string) => {
    setSelection((prev) => ({ categoryId, serviceId, nonce: prev.nonce + 1 }));
    document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="layanan" className="scroll-mt-20 border-y border-line bg-paper">
      <div className="page-container py-16 sm:py-20 lg:py-24">
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

        {/* Tiga Pilar Layanan (Triptych Editorial Terpadu) */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-paper-card shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-line lg:grid-cols-3 lg:divide-y-0 lg:divide-x">
            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id];
              return (
                <article
                  key={cat.id}
                  className="flex flex-col justify-between p-6 sm:p-8 transition-colors hover:bg-paper-muted/20"
                >
                  <div>
                    {/* Header Kartu */}
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-semibold tracking-wider text-brass uppercase">
                        Bidang {cat.number}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line/60 bg-paper-muted">
                        <Icon className="h-4.5 w-4.5 text-brass" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Judul & Deskripsi Proporsional */}
                    <h3 className="mt-4 font-serif text-xl font-semibold text-ink sm:text-2xl">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                      {CATEGORY_DESCRIPTIONS[cat.id]}
                    </p>

                    {/* Cakupan Layanan Utama */}
                    <div className="mt-6 border-t border-line/70 pt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Cakupan Layanan:
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {cat.services.map((srv) => (
                          <li key={srv.id}>
                            <button
                              type="button"
                              onClick={() => choose(cat.id, srv.id)}
                              className="group flex w-full items-center justify-between py-1 text-left text-xs text-ink/80 transition-colors hover:text-brass sm:text-[13px]"
                            >
                              <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass/60 transition-colors group-hover:bg-brass" />
                                <span className="transition-transform group-hover:translate-x-0.5">
                                  {srv.name}
                                </span>
                              </span>
                              <ArrowRight className="h-3 w-3 shrink-0 text-brass opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tindakan Konsultasi */}
                  <div className="mt-6 border-t border-line/60 pt-4">
                    <button
                      type="button"
                      onClick={() => choose(cat.id, cat.services[0].id)}
                      className="text-link text-xs font-semibold sm:text-sm"
                    >
                      Konsultasikan {cat.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
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
