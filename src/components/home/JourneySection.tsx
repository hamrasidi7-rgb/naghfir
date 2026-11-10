'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TimelineItem } from '@/data/initialData';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Flag, Award, GraduationCap, Briefcase, Camera } from 'lucide-react';

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
    <section className="py-20 lg:py-28 bg-paper border-b border-line relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
              Jejak langkah nyata dari bumi kelahiran Desa Campaka, kawah candradimuka pesantren, rute panjang keilmuan akademik, hingga pengabdian profesional kenotariatan di Sumenep.
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
            const isMilestoneHighlight = item.order === 5 || item.order === 7; // 2021 Notaris & 2025 Doktor

            return (
              <div
                key={item.id}
                className={`shrink-0 w-80 lg:w-96 rounded-2xl flex flex-col justify-between border transition-all duration-300 relative overflow-hidden group ${
                  isMilestoneHighlight
                    ? 'bg-navy text-white shadow-xl border-navy'
                    : 'bg-[#FAF7F2] text-charcoal hover:bg-white hover:shadow-lg border-navy/10'
                }`}
              >
                {/* Visual Thumbnail */}
                {item.image && (
                  <div className="relative h-44 w-full overflow-hidden bg-navy/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="384px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm ${
                          isMilestoneHighlight
                            ? 'bg-burgundy text-white'
                            : 'bg-white text-navy border border-navy/10'
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>
                    {item.imageCredit && (
                      <div className="absolute bottom-2 right-2 text-[10px] text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <Camera className="w-2.5 h-2.5" />
                        <span className="truncate max-w-[200px]">{item.imageCredit}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {!item.image && (
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
                    )}

                    <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-burgundy mb-1">
                      <Icon className="w-3 h-3" />
                      <span>{item.category}</span>
                    </div>

                    <h3
                      className={`text-lg font-bold mb-1 leading-snug ${
                        isMilestoneHighlight ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-xs font-medium mb-3 ${
                        isMilestoneHighlight ? 'text-ivory/70' : 'text-charcoal/60'
                      }`}
                    >
                      {item.subtitle}
                    </p>

                    <p
                      className={`text-xs leading-relaxed ${
                        isMilestoneHighlight ? 'text-ivory/90' : 'text-charcoal/80'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-semibold ${
                      isMilestoneHighlight
                        ? 'border-white/10 text-ivory/60'
                        : 'border-navy/10 text-charcoal/50'
                    }`}
                  >
                    <span>Langkah #{item.order}</span>
                    <span className="font-mono">Faktual Terverifikasi</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-navy/15">
          {timeline.map((item) => {
            const Icon = getCategoryIcon(item.category);
            const isMilestoneHighlight = item.order === 5 || item.order === 7;

            return (
              <div key={item.id} className="relative pl-12">
                {/* Bullet */}
                <div
                  className={`absolute left-3 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-paper shadow-sm z-10 ${
                    isMilestoneHighlight ? 'bg-burgundy text-white' : 'bg-navy text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                </div>

                <div
                  className={`rounded-xl border overflow-hidden ${
                    isMilestoneHighlight
                      ? 'bg-navy text-white shadow-md border-navy'
                      : 'bg-[#FAF7F2] text-charcoal border-navy/10'
                  }`}
                >
                  {item.image && (
                    <div className="relative h-36 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span
                        className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isMilestoneHighlight
                            ? 'bg-burgundy text-white'
                            : 'bg-white text-navy'
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>
                  )}

                  <div className="p-5">
                    {!item.image && (
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
                    )}

                    <h3
                      className={`text-base font-bold mb-1 ${
                        isMilestoneHighlight ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs mb-2 font-medium ${
                        isMilestoneHighlight ? 'text-ivory/70' : 'text-charcoal/60'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                    <p
                      className={`text-xs leading-relaxed ${
                        isMilestoneHighlight ? 'text-ivory/90' : 'text-charcoal/80'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
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
