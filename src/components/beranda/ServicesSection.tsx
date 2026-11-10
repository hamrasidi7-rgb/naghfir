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
    <section id="layanan" className="scroll-mt-20 border-y border-line bg-white">
      <div className="page-container py-20 lg:py-28">
        {/* Judul */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Layanan Profesional</p>
            <h2 className="section-title mt-5">Layanan Notaris &amp; PPAT</h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            Kantor Notaris &amp; PPAT Dr. Naghfir melayani pembuatan akta autentik, peralihan hak
            atas tanah, dan pendampingan urusan pertanahan di Kabupaten Sumenep.
          </p>
        </div>

        {/* Tiga kelompok layanan */}
        <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-line md:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat.id];
            return (
              <article
                key={cat.id}
                className={`flex flex-col bg-white p-7 sm:p-8 ${
                  i > 0 ? 'border-t border-line md:border-l md:border-t-0' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-semibold text-brass">{cat.number}</span>
                  <Icon className="h-6 w-6 text-brass" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-ink">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{cat.tagline}</p>

                <ul className="mt-6 flex-1 border-t border-line">
                  {cat.services.map((srv) => (
                    <li key={srv.id} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => choose(cat.id, srv.id)}
                        className="group flex w-full items-center justify-between gap-3 py-3 text-left text-sm text-ink transition-colors hover:text-brass-deep"
                      >
                        <span>{srv.name}</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brass opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => choose(cat.id, cat.services[0].id)}
                  className="text-link mt-6 self-start"
                >
                  Konsultasikan {cat.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </article>
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
