import React from 'react';
import Link from 'next/link';
import { ProfessionalItem } from '@/data/initialData';
import { Scale, FileText, CheckCircle2, ShieldCheck, ArrowRight, Building } from 'lucide-react';

interface ProfessionalSectionProps {
  professional: ProfessionalItem[];
}

export default function ProfessionalSection({ professional }: ProfessionalSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <span>Kiprah & Integritas Hukum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
            Hukum, Legalitas, dan Kepastian
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            Menegakkan kepastian hukum dengan kejujuran, ketelitian, dan kehati-hatian. Pelayanan akta autentik dan hukum pertanahan berakar pada prinsip keadilan bagi semua pihak.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {professional.map((item, idx) => {
            const isMiddle = idx === 1;

            return (
              <div
                key={item.id}
                className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isMiddle
                    ? 'bg-navy text-white shadow-xl border-navy'
                    : 'bg-[#FAF7F2] text-charcoal hover:bg-white hover:shadow-lg border-navy/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isMiddle
                          ? 'bg-burgundy text-white'
                          : 'bg-white text-burgundy border border-navy/10'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <Scale
                      className={`w-5 h-5 ${
                        isMiddle ? 'text-burgundy-300' : 'text-navy'
                      }`}
                    />
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-1.5 ${
                      isMiddle ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                      isMiddle ? 'text-burgundy-200' : 'text-burgundy'
                    }`}
                  >
                    {item.role}
                  </p>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isMiddle ? 'text-ivory/80' : 'text-charcoal/70'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className={`pt-6 border-t ${
                    isMiddle ? 'border-white/10' : 'border-navy/10'
                  }`}
                >
                  <h4
                    className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                      isMiddle ? 'text-ivory/60' : 'text-charcoal/50'
                    }`}
                  >
                    Ruang Lingkup Praktik
                  </h4>
                  <ul className="space-y-2">
                    {item.services.map((srv, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isMiddle ? 'text-burgundy-300' : 'text-burgundy'
                          }`}
                        />
                        <span className={isMiddle ? 'text-ivory/90' : 'text-charcoal/80'}>
                          {srv}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Disclaimer Notice */}
        <div className="p-6 rounded-xl bg-ivory/70 border border-navy/10 flex items-start gap-4 text-xs text-charcoal/80">
          <ShieldCheck className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-navy block">Catatan Etika Profesi Kenotariatan:</span>
            <p className="leading-relaxed">
              Website ini merupakan laman profil personal intelektual dan pengabdian Dr. Naghfir, bukan media promosi komersial jasa notaris. Seluruh pelaksanaan wewenang jabatan Notaris dan PPAT dijalankan secara independen berpedoman penuh pada Undang-Undang Jabatan Notaris (UUJN) dan Kode Etik Ikatan Notaris Indonesia (I.N.I).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
