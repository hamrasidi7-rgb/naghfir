'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';
import { SocialContributionItem, ActivityItem } from '@/data/initialData';

interface SocialSectionProps {
  socialContribution: SocialContributionItem[];
  activities?: ActivityItem[];
}

export default function SocialSection({
  socialContribution,
  activities = [],
}: SocialSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const sortedSocial = [...socialContribution].sort((a, b) => a.order - b.order);
  const sortedActivities = [...activities].sort((a, b) => a.order - b.order);

  return (
    <section
      id="pengabdian"
      className="py-6 lg:py-8 lg:pr-8 flex flex-col justify-between"
    >
      {/* Kartu Horizontal Pengabdian Sesuai Mockup */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative w-full sm:w-44 h-40 sm:h-36 rounded-2xl overflow-hidden border border-[#E5DEC9] shadow-xs shrink-0 bg-[#EFE8D8]">
          <Image
            src="/images/Naghfir-Berdiri.png"
            alt="Pengabdian Masyarakat Dr. Naghfir di Sumenep"
            fill
            sizes="(max-width: 640px) 100vw, 180px"
            className="object-cover object-top"
          />
        </div>

        <div className="flex-1 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6526] block">
            PENGABDIAN
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142134] leading-snug">
            Mengabdi di Tengah Masyarakat
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
            Kegiatan sosial, pendidikan, perlindungan aset wakaf, dan pemberdayaan masyarakat di Sumenep.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B6526] hover:text-[#142134] border-b-2 border-[#C5A059] pb-0.5 transition-colors"
            >
              <span>{expanded ? 'Tutup Kegiatan' : 'Lihat Kegiatan'}</span>
              {expanded ? (
                <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Panel Ekspansi: LWPNU, Wakaf, Pesantren, Sosial, & Dokumentasi Kegiatan */}
      {expanded && (
        <div className="mt-6 p-5 rounded-2xl bg-white border border-[#D8CEBE] shadow-md space-y-6">
          {/* 3 Pilar Pengabdian */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-[#142134] border-b border-[#E6DFCE] pb-2">
              Fokus Pengabdian: LWPNU, Wakaf, &amp; Pesantren
            </h3>
            <div className="space-y-3">
              {sortedSocial.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E6DFCE]"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6526] block">
                    {item.organization}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#142134]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#374151] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {item.highlights.slice(0, 2).map((pt, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] text-[#4B5563]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6526] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Dokumentasi Kegiatan */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-[#142134] border-b border-[#E6DFCE] pb-2">
              Dokumentasi Aktivitas &amp; Organisasi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sortedActivities.map((act) => (
                <article
                  key={act.id}
                  onClick={() => setSelectedActivity(act)}
                  className="cursor-pointer p-3 rounded-xl border border-[#E6DFCE] hover:border-[#C5A059] bg-white transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6526]">
                    {act.category} · {act.date}
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#142134] mt-0.5 line-clamp-2">
                    {act.title}
                  </h4>
                  <span className="text-[11px] text-[#8B6526] font-semibold mt-1.5 inline-block">
                    Lihat Dokumentasi →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Dokumentasi */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 bg-[#142134]/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full border border-[#C5A059] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedActivity.image && (
              <div className="relative h-52 w-full bg-[#142134]">
                <Image
                  src={selectedActivity.image}
                  alt={selectedActivity.title}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-[#142134]/85 text-white"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B6526]">
                <span>{selectedActivity.category}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 font-normal text-[#4B5563]">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedActivity.date}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#142134]">
                {selectedActivity.title}
              </h3>
              <p className="text-xs text-[#4B5563] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8B6526] shrink-0" />
                <span>{selectedActivity.location}</span>
              </p>
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed pt-2 border-t border-[#E6DFCE]">
                {selectedActivity.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
