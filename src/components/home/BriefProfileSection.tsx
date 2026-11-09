'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  GraduationCap,
  Scale,
  Users,
  ChevronDown,
  Compass,
  Briefcase,
} from 'lucide-react';
import {
  ProfileData,
  EducationItem,
  TimelineItem,
} from '@/data/initialData';

interface BriefProfileSectionProps {
  profile: ProfileData;
  education: EducationItem[];
  timeline: TimelineItem[];
}

type TabKey = 'biografi' | 'pendidikan' | 'perjalanan' | 'organisasi';

export default function BriefProfileSection({
  profile,
  education,
  timeline,
}: BriefProfileSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('biografi');

  const sortedEducation = [...education].sort((a, b) => a.order - b.order);
  const sortedTimeline = [...timeline].sort((a, b) => a.order - b.order);

  const organizations = [
    {
      period: 'Masa Kini',
      role: 'Jajaran Pengurus & Advokasi Pertanahan',
      org: 'Lembaga Wakaf dan Pertanahan NU (LWPNU) PCNU Kabupaten Sumenep',
      desc: 'Mengawal pendataan, mediasi riwayat tanah, penerbitan Akta Ikrar Wakaf (AIW), dan percepatan sertifikasi tanah wakaf masjid, musholla, serta madrasah di Kabupaten Sumenep.',
    },
    {
      period: '2021 – Sekarang',
      role: 'Anggota Resmi Pejabat Umum & PPAT',
      org: 'Ikatan Notaris Indonesia (I.N.I.) & Ikatan Pejabat Pembuat Akta Tanah (IPPAT)',
      desc: 'Menjalankan kode etik profesi kenotariatan dan keagrariaan di wilayah kerja Kabupaten Sumenep, Jawa Timur.',
    },
    {
      period: 'Masa Mahasiswa',
      role: 'Kader & Aktivis Pergerakan',
      org: 'Pergerakan Mahasiswa Islam Indonesia (PMII) Malang & Jawa Timur',
      desc: 'Mengasah kepemimpinan organisasi, nalar kritis hukum dan sosial, serta advokasi hak-hak masyarakat kecil sejak bangku perkuliahan.',
    },
    {
      period: 'Sejak Pendidikan Santri',
      role: 'Keluarga Besar & Mentor Akademik Alumni',
      org: 'Ikatan Alumni Pondok Pesantren Aqidah Usymuni Terate, Pandian, Sumenep',
      desc: 'Mendorong kaderisasi intelektual santri agar melanjutkan studi ke perguruan tinggi dan berkiprah di ranah hukum serta pengabdian masyarakat.',
    },
  ];

  return (
    <section
      id="tentang-saya"
      className="py-10 sm:py-12 bg-[#FAF7F0] border-b border-[#E5DEC9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Baris Utama Tentang Saya (3 Kolom Sesuai Mockup) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
          {/* Kolom Kiri (4 Kolom): Ilustrasi Pena & Stempel Akta */}
          <div className="lg:col-span-4">
            <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-[#E5DEC9] shadow-sm bg-[#EFE8D8]">
              <Image
                src="/images/context/pena-akta.jpg"
                alt="Kepastian Hukum dan Keilmuan Dr. Naghfir"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Kolom Tengah (5 Kolom): TENTANG SAYA — Lebih dari Sekadar Profesi */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6526] block">
              TENTANG SAYA
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#142134] leading-tight">
              Lebih dari Sekadar Profesi
            </h2>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              Menjalankan amanah sebagai Notaris &amp; PPAT, mengembangkan ilmu sebagai akademisi, dan berkhidmat kepada masyarakat melalui pendidikan, wakaf, dan pemberdayaan umat.
            </p>
            <div className="pt-1.5">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B6526] hover:text-[#142134] border-b-2 border-[#C5A059] pb-1 transition-colors"
              >
                <span>
                  {expanded ? 'Tutup Profil Lengkap' : 'Baca Selengkapnya'}
                </span>
                {expanded ? (
                  <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Kolom Kanan (3 Kolom): 3 Identitas Kredensial (Akademisi, Profesional Hukum, Pengabdian Sosial) */}
          <div className="lg:col-span-3 lg:border-l lg:border-[#DFD6C5] lg:pl-6 divide-y divide-[#E6DFCE]">
            <div className="py-3 first:pt-0 flex items-start gap-3.5">
              <GraduationCap className="w-7 h-7 text-[#A67C32] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-base text-[#142134] leading-snug">
                  Akademisi
                </h3>
                <p className="text-xs text-[#4B5563]">
                  Doktor Ekonomi Syariah.
                </p>
              </div>
            </div>

            <div className="py-3 flex items-start gap-3.5">
              <Scale className="w-7 h-7 text-[#A67C32] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-base text-[#142134] leading-snug">
                  Profesional Hukum
                </h3>
                <p className="text-xs text-[#4B5563]">
                  Notaris &amp; PPAT.
                </p>
              </div>
            </div>

            <div className="py-3 last:pb-0 flex items-start gap-3.5">
              <Users className="w-7 h-7 text-[#A67C32] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-base text-[#142134] leading-snug">
                  Pengabdian Sosial
                </h3>
                <p className="text-xs text-[#4B5563]">
                  Literasi hukum, wakaf, dan pemberdayaan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Ekspansi Lengkap: Profil, Latar Pesantren, Pendidikan, Perjalanan (8 Fase), Pengalaman Profesi, & Organisasi */}
        {expanded && (
          <div className="mt-8 rounded-2xl border border-[#D8CEBE] bg-white overflow-hidden shadow-md">
            {/* Navigasi Tab */}
            <div
              role="tablist"
              className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#E6DFCE] bg-[#F4EFE4] divide-x divide-[#E6DFCE]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'biografi'}
                onClick={() => setActiveTab('biografi')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'biografi'
                    ? 'bg-[#142134] text-[#E4C77F]'
                    : 'text-[#142134] hover:bg-[#EAE2D1]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span>Profil &amp; Profesi</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'pendidikan'}
                onClick={() => setActiveTab('pendidikan')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'pendidikan'
                    ? 'bg-[#142134] text-[#E4C77F]'
                    : 'text-[#142134] hover:bg-[#EAE2D1]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>Pendidikan &amp; Pesantren</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'perjalanan'}
                onClick={() => setActiveTab('perjalanan')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'perjalanan'
                    ? 'bg-[#142134] text-[#E4C77F]'
                    : 'text-[#142134] hover:bg-[#EAE2D1]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span>Perjalanan (8 Fase)</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'organisasi'}
                onClick={() => setActiveTab('organisasi')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'organisasi'
                    ? 'bg-[#142134] text-[#E4C77F]'
                    : 'text-[#142134] hover:bg-[#EAE2D1]'
                }`}
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>Riwayat Organisasi</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* TAB 1: Profil, Latar Pesantren, & Pengalaman Profesional */}
              {activeTab === 'biografi' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4 space-y-3">
                    <div className="relative h-56 w-full rounded-xl overflow-hidden border border-[#E6DFCE]">
                      <Image
                        src="/images/Naghfir-Notaris.png"
                        alt="Dr. Naghfir - Dari Pesantren ke Meja Akta"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <p className="text-[11px] text-[#4B5563] flex justify-between">
                      <span>Arsip: &ldquo;Dari Pesantren ke Meja Akta&rdquo;</span>
                      <span className="font-semibold text-[#8B6526]">Mata Madura News</span>
                    </p>
                    <div className="p-3.5 rounded-xl bg-[#142134] text-white text-xs space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E4C77F] block">
                        Penghargaan Bapenda Sumenep
                      </span>
                      <p className="font-serif font-bold">
                        {profile.bphtbAward ||
                          'Juara 1 Mitra Pembayar BPHTB Terbesar Kabupaten Sumenep'}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-3 text-xs sm:text-sm text-[#374151] leading-relaxed">
                    <p className="font-semibold text-[#142134] text-sm sm:text-base">
                      {profile.aboutIntro}
                    </p>
                    {profile.aboutStory.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Pendidikan & Latar Belakang Pesantren */}
              {activeTab === 'pendidikan' && (
                <div className="divide-y divide-[#E6DFCE]">
                  {sortedEducation.map((edu) => (
                    <div
                      key={edu.id}
                      className="py-3.5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6"
                    >
                      <div className="md:col-span-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#8B6526] block">
                          {edu.period}
                        </span>
                        <span className="text-[11px] text-[#4B5563]">{edu.location}</span>
                      </div>
                      <div className="md:col-span-9">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#142134]">
                          {edu.degree} — {edu.field}
                        </h4>
                        <p className="text-xs font-semibold text-[#374151] mb-1">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-[#4B5563] leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: Perjalanan Intelektual (8 Fase) */}
              {activeTab === 'perjalanan' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sortedTimeline.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-[#E6DFCE] bg-[#FAF7F0]"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#8B6526] mb-1">
                        <span>
                          {item.order}. {item.year}
                        </span>
                        <span>{item.category}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#142134]">
                        {item.title}
                      </h4>
                      <p className="text-xs font-semibold text-[#4B5563] mb-1">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-[#374151] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: Riwayat Organisasi */}
              {activeTab === 'organisasi' && (
                <div className="divide-y divide-[#E6DFCE]">
                  {organizations.map((org, idx) => (
                    <div
                      key={idx}
                      className="py-3.5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6"
                    >
                      <div className="md:col-span-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#8B6526] block">
                          {org.period}
                        </span>
                        <span className="text-[11px] font-semibold text-[#142134]">
                          {org.role}
                        </span>
                      </div>
                      <div className="md:col-span-9">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#142134] mb-1">
                          {org.org}
                        </h4>
                        <p className="text-xs text-[#374151] leading-relaxed">
                          {org.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
