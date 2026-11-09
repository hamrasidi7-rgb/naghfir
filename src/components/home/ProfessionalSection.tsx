'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import { ProfessionalItem } from '@/data/initialData';
import { getServiceWhatsAppUrl } from '@/config/whatsapp';

interface ProfessionalSectionProps {
  professional: ProfessionalItem[];
  whatsappNumber?: string;
}

export default function ProfessionalSection({
  professional,
  whatsappNumber,
}: ProfessionalSectionProps) {
  const [showDetails, setShowDetails] = useState(false);

  const notarisData = professional.find((p) => p.id === 'prof-1');
  const ppatData = professional.find((p) => p.id === 'prof-2');
  const syariahData = professional.find((p) => p.id === 'prof-3');

  const notarisServices = [
    ...(notarisData?.services || [
      'Pendirian Perseroan Terbatas (PT), CV, & Yayasan',
      'Notaris Pembuat Akta Koperasi (NPAK) Resmi',
      'Akta Perjanjian Bisnis, Kerjasama, & Sewa Menyewa',
      'Legalisasi & Waarmerking Dokumen Hukum',
      'Wasiat, Waris, & Kuasa Notariil Autentik',
    ]),
    ...(syariahData?.services?.slice(0, 2) || [
      'Penyusunan & Penelaahan Draf Akad Bisnis Syariah',
    ]),
  ];

  const ppatServices = [
    ...(ppatData?.services || [
      'Akta Jual Beli (AJB) Hak Atas Tanah',
      'Akta Hibah & Tukar Menukar Tanah',
      'Akta Pembagian Hak Bersama (APHB)',
      'Pemberian Hak Tanggungan & SKMHT',
      'Pengecekan Sertifikat & Pendaftaran Balik Nama',
    ]),
    'Mediasi Sengketa Pertanahan & Pendampingan Tanah Wakaf (CPM)',
  ];

  const [selectedNotarisService, setSelectedNotarisService] = useState<string>(
    notarisServices[0] || ''
  );
  const [selectedPpatService, setSelectedPpatService] = useState<string>(
    ppatServices[0] || ''
  );

  const notarisRequirements = [
    'Kartu Tanda Penduduk (KTP), Kartu Keluarga (KK), dan NPWP para penghadap / pendiri badan hukum.',
    'Data pokok badan usaha/hukum: nama PT/CV/Yayasan/Koperasi, domisili, susunan pengurus, struktur modal, dan KBLI.',
    'Dokumen perjanjian pokok atau akta pendirian sebelumnya (khusus untuk akta perubahan/perikatan lanjutan).',
  ];

  const ppatRequirements = [
    'Sertifikat Asli Hak Atas Tanah (SHM / SHGB) atau dokumen bukti kepemilikan dan riwayat tanah yang sah.',
    'KTP, Kartu Keluarga (KK), Akta Nikah, dan NPWP Pihak Pengalih (Penjual/Pemberi) serta Pihak Penerima (Pembeli/Penerima Hibah).',
    'SPPT PBB tahun berjalan beserta bukti lunas pembayaran PBB (STTS) dan verifikasi pajak daerah/negara (BPHTB & PPh).',
    'Surat Keterangan Waris yang sah (khusus untuk pengurusan Akta Pembagian Hak Bersama / APHB Waris).',
  ];

  const consultationFlow = [
    {
      step: '01',
      title: 'Konsultasi Awal',
      desc: 'Hubungi via WhatsApp atau kunjungi kantor di Batuan, Sumenep untuk menyampaikan kebutuhan akta.',
    },
    {
      step: '02',
      title: 'Pemeriksaan Berkas',
      desc: 'Verifikasi kelengkapan identitas penghadap serta pengecekan keabsahan sertifikat tanah di BPN.',
    },
    {
      step: '03',
      title: 'Penyusunan & Pajak',
      desc: 'Perancangan draf akta autentik serta fasilitasi perhitungan dan validasi pajak resmi (PPh / BPHTB).',
    },
    {
      step: '04',
      title: 'Akta & Pendaftaran',
      desc: 'Pembacaan dan penandatanganan akta di hadapan para pihak, dilanjutkan pengesahan AHU atau balik nama BPN.',
    },
  ];

  return (
    <section
      id="layanan"
      className="py-10 sm:py-12 bg-[#F4EFE4] border-b border-[#E5DEC9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B6526] leading-snug sm:border-r sm:border-[#C5A059]/50 sm:pr-6 shrink-0">
              LAYANAN
              <br className="hidden sm:inline" /> PROFESIONAL
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#142134] tracking-tight">
                Layanan Notaris &amp; PPAT
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                Pelayanan hukum yang aman, sah, dan berintegritas.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B6526] hover:text-[#142134] transition-colors self-start sm:self-center shrink-0"
          >
            <span>
              {showDetails ? 'Tutup Rincian Layanan' : 'Lihat Semua Layanan'}
            </span>
            {showDetails ? (
              <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Dua Kartu Utama: Layanan Notaris & Layanan PPAT (Sesuai Mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Layanan Notaris */}
          <div
            onClick={() => setShowDetails(!showDetails)}
            className="bg-[#FBF9F5] rounded-2xl p-6 sm:p-7 border border-[#E6DFCE] shadow-xs hover:shadow-md hover:border-[#C5A059] transition-all flex items-center justify-between gap-5 cursor-pointer"
          >
            {/* Custom Gold Document + Pen Icon */}
            <div className="shrink-0 text-[#A67C32]">
              <svg
                className="w-12 h-12 sm:w-14 sm:h-14"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="10"
                  y="8"
                  width="30"
                  height="38"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
                <line
                  x1="16"
                  y1="17"
                  x2="32"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="24"
                  x2="30"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="31"
                  x2="25"
                  y2="31"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M32 38L44 26L48 30L36 42L30 44L32 38Z"
                  fill="#F4EFE4"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142134]">
                Layanan Notaris
              </h3>
              <p className="text-xs sm:text-sm text-[#374151] mt-1 leading-relaxed">
                Pembuatan akta autentik, pendirian badan hukum, perjanjian, legalisasi, dan kuasa notariil.
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              aria-label="Detail Layanan Notaris"
              className="w-9 h-9 rounded-full bg-[#EFE8D8] hover:bg-[#E2D6BD] text-[#8B6526] flex items-center justify-center shrink-0 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Layanan PPAT */}
          <div
            onClick={() => setShowDetails(!showDetails)}
            className="bg-[#FBF9F5] rounded-2xl p-6 sm:p-7 border border-[#E6DFCE] shadow-xs hover:shadow-md hover:border-[#C5A059] transition-all flex items-center justify-between gap-5 cursor-pointer"
          >
            {/* Custom Gold Stacked Layers Icon */}
            <div className="shrink-0 text-[#A67C32]">
              <svg
                className="w-12 h-12 sm:w-14 sm:h-14"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 10L46 20L28 30L10 20L28 10Z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 28L28 38L46 28"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 36L28 46L46 36"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142134]">
                Layanan PPAT
              </h3>
              <p className="text-xs sm:text-sm text-[#374151] mt-1 leading-relaxed">
                Akta jual beli, hibah, pembagian hak bersama, hak tanggungan, dan roya.
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              aria-label="Detail Layanan PPAT"
              className="w-9 h-9 rounded-full bg-[#EFE8D8] hover:bg-[#E2D6BD] text-[#8B6526] flex items-center justify-center shrink-0 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Panel Rincian Lengkap Layanan, Kegunaan, Persyaratan Awal, & Alur Pelayanan */}
        {showDetails && (
          <div className="mt-6 rounded-2xl bg-[#FBF9F5] border border-[#D8CEBE] p-6 sm:p-8 space-y-8 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Detail Kelompok Notaris */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6526]">
                    Kelompok I · Pejabat Umum Pembuat Akta Autentik
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#142134] mt-0.5">
                    Rincian Layanan Notaris &amp; NPAK
                  </h4>
                  <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                    <strong>Kegunaan Layanan:</strong> Menjamin kekuatan pembuktian sempurna atas pendirian badan hukum (PT, CV, Yayasan, Koperasi/NPAK) dan perjanjian keperdataan agar sah di mata undang-undang.
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#142134] block mb-2">
                    Pilih Layanan (Pesan WhatsApp Otomatis Menyesuaikan):
                  </span>
                  <div className="space-y-1.5">
                    {notarisServices.map((srv, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedNotarisService(srv)}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs flex items-center gap-2 transition-colors ${
                          selectedNotarisService === srv
                            ? 'bg-[#142134] text-white border-[#142134] font-semibold'
                            : 'bg-white text-[#374151] border-[#E6DFCE] hover:border-[#C5A059]'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${
                            selectedNotarisService === srv
                              ? 'text-[#E4C77F]'
                              : 'text-[#8B6526]'
                          }`}
                        />
                        <span>{srv}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F4EFE4] border border-[#E6DFCE] text-xs space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-[#142134] block">
                    Persyaratan Awal Layanan Notaris:
                  </span>
                  {notarisRequirements.map((req, idx) => (
                    <p key={idx} className="text-[#374151]">
                      • {req}
                    </p>
                  ))}
                </div>

                <div>
                  <a
                    href={getServiceWhatsAppUrl(
                      'Notaris',
                      selectedNotarisService,
                      whatsappNumber
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#142134] hover:bg-[#1E314D] text-[#E4C77F] font-semibold text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konsultasi Notaris via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Detail Kelompok PPAT */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6526]">
                    Kelompok II · Pejabat Pembuat Akta Tanah
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#142134] mt-0.5">
                    Rincian Layanan PPAT &amp; Pertanahan
                  </h4>
                  <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                    <strong>Kegunaan Layanan:</strong> Memberikan kepastian hukum mutlak atas peralihan hak atas tanah (jual beli, hibah, waris APHB, dan hak tanggungan) sebagai syarat sah balik nama sertifikat di BPN.
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#142134] block mb-2">
                    Pilih Layanan (Pesan WhatsApp Otomatis Menyesuaikan):
                  </span>
                  <div className="space-y-1.5">
                    {ppatServices.map((srv, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPpatService(srv)}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs flex items-center gap-2 transition-colors ${
                          selectedPpatService === srv
                            ? 'bg-[#142134] text-white border-[#142134] font-semibold'
                            : 'bg-white text-[#374151] border-[#E6DFCE] hover:border-[#C5A059]'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${
                            selectedPpatService === srv
                              ? 'text-[#E4C77F]'
                              : 'text-[#8B6526]'
                          }`}
                        />
                        <span>{srv}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F4EFE4] border border-[#E6DFCE] text-xs space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-[#142134] block">
                    Persyaratan Awal Layanan PPAT:
                  </span>
                  {ppatRequirements.map((req, idx) => (
                    <p key={idx} className="text-[#374151]">
                      • {req}
                    </p>
                  ))}
                </div>

                <div>
                  <a
                    href={getServiceWhatsAppUrl(
                      'PPAT',
                      selectedPpatService,
                      whatsappNumber
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-b from-[#CCA24E] to-[#986E21] text-white font-semibold text-xs transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konsultasi PPAT via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Alur Pelayanan 4 Tahap */}
            <div className="pt-6 border-t border-[#E6DFCE]">
              <h4 className="font-serif text-lg font-bold text-[#142134] mb-4">
                Alur Pelayanan Kantor Notaris &amp; PPAT Dr. Naghfir
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {consultationFlow.map((item) => (
                  <div
                    key={item.step}
                    className="p-4 rounded-xl bg-white border border-[#E6DFCE] space-y-1"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6526]">
                      Tahap {item.step}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-[#142134]">
                      {item.title}
                    </h5>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
