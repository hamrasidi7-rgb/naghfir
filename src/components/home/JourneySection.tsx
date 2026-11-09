'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { TimelineItem } from '@/data/initialData';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Flag, Award, GraduationCap, Briefcase } from 'lucide-react';

interface JourneySectionProps {
  timeline: TimelineItem[];
}

export default function JourneySection({ timeline }: JourneySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pesantren':
      case 'Pendidikan':
        return GraduationCap;
      case 'Profesi':
        return Briefcase;
      case 'Organisasi':
        return Flag;
      default:
        return Award;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-navy/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
              <span>Linimasa Kehidupan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
              Perjalanan yang Membentuk Pengabdian
            </h2>
            <p className="text-base text-charcoal/80 leading-relaxed">
              Jejak langkah nyata dari bumi kelahiran Desa Campaka, kawah candradimuka pesantren, rute panjang keilmuan akademik, hingga pengabdian profesional kenotariatan.
            </p>
          </div>

          {/* Desktop Carousel Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-white transition-all shadow-sm"
              aria-label="Geser ke kiri"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-white transition-all shadow-sm"
              aria-label="Geser ke kanan"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Horizontal Scrollable Timeline */}
        <div
          ref={scrollContainerRef}
          className="hidden md:flex space-x-6 overflow-x-auto pb-8 pt-4 scroll-smooth no-scrollbar scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {timeline.map((item, index) => {
            const Icon = getCategoryIcon(item.category);
            const isMilestoneHighlight = item.order === 7 || item.order === 9; // 2021 Notaris & 2025 Doktor

            return (
              <div
                key={item.id}
                className={`shrink-0 w-80 lg:w-96 p-7 rounded-2xl flex flex-col justify-between border transition-all duration-300 relative ${
                  isMilestoneHighlight
                    ? 'bg-navy text-white shadow-xl border-navy'
                    : 'bg-[#FAF7F2] text-charcoal hover:bg-white hover:shadow-lg border-navy/10'
                }`}
              >
                {/* Step indicator */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                        isMilestoneHighlight
                          ? 'bg-burgundy text-white'
                          : 'bg-white text-navy border border-navy/10'
                      }`}
                    >
                      {item.year}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 ${
                        isMilestoneHighlight ? 'text-burgundy-200' : 'text-burgundy'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.category}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold mb-1.5 leading-snug ${
                      isMilestoneHighlight ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-xs font-medium mb-4 ${
                      isMilestoneHighlight ? 'text-ivory/70' : 'text-charcoal/60'
                    }`}
                  >
                    {item.subtitle}
                  </p>

                  <p
                    className={`text-sm leading-relaxed ${
                      isMilestoneHighlight ? 'text-ivory/90' : 'text-charcoal/80'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                    isMilestoneHighlight
                      ? 'border-white/10 text-ivory/60'
                      : 'border-navy/10 text-charcoal/50'
                  }`}
                >
                  <span>Langkah #{item.order}</span>
                  <span className="font-mono">Faktual Terverifikasi</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-navy/15">
          {timeline.map((item) => {
            const Icon = getCategoryIcon(item.category);
            const isMilestoneHighlight = item.order === 7 || item.order === 9;

            return (
              <div key={item.id} className="relative pl-12">
                {/* Bullet */}
                <div
                  className={`absolute left-3 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#FDFCFB] shadow-sm ${
                    isMilestoneHighlight ? 'bg-burgundy text-white' : 'bg-navy text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                </div>

                <div
                  className={`p-6 rounded-xl border ${
                    isMilestoneHighlight
                      ? 'bg-navy text-white shadow-md border-navy'
                      : 'bg-[#FAF7F2] text-charcoal border-navy/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isMilestoneHighlight
                          ? 'bg-burgundy text-white'
                          : 'bg-white text-navy border border-navy/10'
                      }`}
                    >
                      {item.year}
                    </span>
                    <span
                      className={`text-[11px] font-semibold uppercase ${
                        isMilestoneHighlight ? 'text-burgundy-200' : 'text-burgundy'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-bold mb-1 ${
                      isMilestoneHighlight ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs mb-3 font-medium ${
                      isMilestoneHighlight ? 'text-ivory/70' : 'text-charcoal/60'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${
                      isMilestoneHighlight ? 'text-ivory/90' : 'text-charcoal/80'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Journey Page */}
        <div className="mt-12 text-center">
          <Link
            href="/perjalanan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy hover:bg-burgundy text-white font-medium text-sm transition-all shadow-sm"
          >
            <span>Telusuri Rincian Perjalanan Hidup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
