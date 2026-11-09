import React from 'react';
import Link from 'next/link';
import { SocialContributionItem } from '@/data/initialData';
import { Heart, Landmark, Users, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SocialSectionProps {
  socialContribution: SocialContributionItem[];
}

export default function SocialSection({ socialContribution }: SocialSectionProps) {
  const icons = [Landmark, Users, Heart];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <span>Khidmah Kemasyarakatan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
            Pengabdian yang Tumbuh dari Akar Masyarakat
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            Menghidupkan nilai-nilai pesantren dalam kerja nyata kemasyarakatan di Sumenep. Melindungi aset wakaf umat dan mendampingi warga pedesaan meraih kepastian hak.
          </p>
        </div>

        {/* Highlight Focus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {socialContribution.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={item.id}
                className="bg-white p-8 rounded-2xl border border-navy/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-ivory text-burgundy flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy block mb-1">
                    {item.organization}
                  </span>

                  <h3 className="text-xl font-bold text-navy mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-4">
                    {item.role}
                  </p>

                  <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-navy/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-3">
                    Fokus Pengabdian:
                  </h4>
                  <ul className="space-y-2">
                    {item.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-charcoal/80">
                        <CheckCircle2 className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wakaf NU Spotlight Banner */}
        <div className="rounded-2xl bg-navy text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="px-3 py-1 rounded-full bg-burgundy text-white text-xs font-bold uppercase tracking-wider">
              Khidmah LWPNU Sumenep
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Menjaga Rumah Ibadah & Tanah Umat di Pelosok Madura
            </h3>
            <p className="text-sm text-ivory/80 leading-relaxed">
              &ldquo;Tanah wakaf adalah titipan ikhlas para pendahulu kita. Tugas kita hari ini adalah memastikan setiap jengkal tanah wakaf berakta resmi dan tersertifikasi agar terhindar dari gugatan sengketa di masa mendatang.&rdquo;
            </p>
            <div className="pt-2">
              <Link
                href="/pemikiran/urgensi-sertifikasi-tanah-wakaf-madura"
                className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy-200 hover:text-white transition-colors"
              >
                <span>Baca Telaah Pemikiran Wakaf Lengkap</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
