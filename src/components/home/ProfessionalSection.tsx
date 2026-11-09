import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProfessionalItem } from '@/data/initialData';
import { Scale, FileText, CheckCircle2, ShieldCheck, Award, MapPin, BookOpen, Lightbulb } from 'lucide-react';

interface ProfessionalSectionProps {
  professional: ProfessionalItem[];
}

export default function ProfessionalSection({ professional }: ProfessionalSectionProps) {
  return (
    <section id="profesional" className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <span>Kiprah Notaris & PPAT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
            Kepastian Hukum, Keadilan Agraria, dan Integritas Jabatan
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            Menjalankan jabatan Notaris dan Pejabat Pembuat Akta Tanah (PPAT) di Kabupaten Sumenep bukan sekadar urusan administratif legalitas, melainkan ikhtiar menghadirkan ketenteraman batin dan kepastian hak masyarakat atas kepemilikan dan perikatan keperdataan.
          </p>
        </div>

        {/* Feature Banner: Kredensial Jabatan Terverifikasi & Penghargaan BPHTB */}
        <div className="mb-14 rounded-2xl bg-navy text-white p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-burgundy/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy text-white text-[11px] font-bold uppercase tracking-widest">
                <Award className="w-3.5 h-3.5" />
                <span>Prestasi & Rekam Jejak Terverifikasi</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                Juara 1 Mitra Pembayar BPHTB Terbesar Kabupaten Sumenep
              </h3>
              <p className="text-sm sm:text-base text-ivory/85 leading-relaxed font-sans">
                Dianugerahi oleh Badan Pendapatan Daerah (Bapenda) Kabupaten Sumenep pada ajang Gebyar & Anugerah Pajak Daerah sebagai bentuk apresiasi atas kepatuhan, transparansi, dan kontribusi nyata dalam optimalisasi penerimaan bea perolehan hak atas tanah dan bangunan.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ivory/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-burgundy-300" />
                  SK Menkumham RI (Notaris Tersumpah 2021)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-burgundy-300" />
                  SK Menteri ATR/BPN (PPAT Kab. Sumenep)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-burgundy-300" />
                  SK Kemenkop UKM (Notaris NPAK Koperasi)
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-xl p-5 text-center lg:text-left space-y-3">
              <div className="flex items-center gap-2 justify-center lg:justify-start text-xs font-bold text-burgundy-200 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Alamat Kantor Resmi</span>
              </div>
              <p className="text-xs text-ivory leading-relaxed font-sans">
                Jl. Jokotole – Perum Griya Berkat Regency Gg. III No. 24 (Lingkar Barat), Kec. Batuan, Kab. Sumenep, Jawa Timur 69451
              </p>
              <div className="pt-2 text-[11px] text-ivory/60 font-mono">
                Wilayah Jabatan: Seluruh Kabupaten Sumenep
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Cards: Notaris, PPAT, NPAK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {professional.map((item, idx) => {
            const isMiddle = idx === 1;

            return (
              <div
                key={item.id}
                className={`p-7 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isMiddle
                    ? 'bg-[#FAF7F2] text-charcoal border-burgundy/30 shadow-md ring-1 ring-burgundy/10'
                    : 'bg-white text-charcoal shadow-xs hover:shadow-md border-navy/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-burgundy/10 text-burgundy border border-burgundy/20">
                      {item.badge}
                    </span>
                    <Scale className="w-5 h-5 text-burgundy" />
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-navy mb-1">
                    {item.title}
                  </h4>

                  <p className="text-xs font-bold uppercase tracking-wider text-burgundy mb-3">
                    {item.role}
                  </p>

                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-navy/10">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50 mb-3">
                    Ruang Lingkup Praktik Terverifikasi
                  </h5>
                  <ul className="space-y-2">
                    {item.services.map((srv, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs text-charcoal/85">
                        <CheckCircle2 className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pemikiran Hukum & Kontribusi Literasi Masyarakat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="p-7 rounded-2xl bg-[#FAF7F2] border border-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy">
              <Lightbulb className="w-4 h-4" />
              <span>Pemikiran Hukum & Pertanahan</span>
            </div>
            <h4 className="text-xl font-bold text-navy">
              Menjembatani Hukum Positif dan Maslahat Komunal
            </h4>
            <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
              Dalam konteks sosiologis Madura, Dr. Naghfir memandang bahwa tertib administrasi pertanahan harus dibangun dengan menghormati nilai-nilai keagamaan dan kekerabatan masyarakat. Legalitas tanah bukan sekadar kepemilikan kertas, melainkan benteng pencegah konflik antar-keluarga dan jaminan keberlangsungan wakaf tempat ibadah serta lembaga pendidikan.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#FAF7F2] border border-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy">
              <BookOpen className="w-4 h-4" />
              <span>Kontribusi Literasi Hukum Publik</span>
            </div>
            <h4 className="text-xl font-bold text-navy">
              Edukasi Hak Keperdataan Masyarakat Desa
            </h4>
            <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
              Secara aktif memberikan bimbingan teknis dan penyuluhan kepada pengurus masjid, nazhir wakaf, serta pelaku UMKM/koperasi di Madura mengenai pentingnya legalitas badan hukum, kejelasan akta pendirian, serta kepastian hak atas tanah waris dan wakaf agar terhindar dari sengketa di masa mendatang.
            </p>
          </div>
        </div>

        {/* Ethical Disclaimer Notice */}
        <div className="p-6 rounded-xl bg-ivory/80 border border-navy/10 flex items-start gap-4 text-xs text-charcoal/80">
          <ShieldCheck className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-navy block">Kepatuhan Etika Profesi Kenotariatan (UUJN):</span>
            <p className="leading-relaxed">
              Situs ini merupakan laman biografi intelektual dan dokumentasi pengabdian masyarakat Dr. Naghfir, bukan instrumen promosi atau penawaran komersial jasa hukum. Pelaksanaan kewenangan jabatan Notaris dan PPAT dilakukan secara profesional berlandaskan Undang-Undang Nomor 2 Tahun 2014 tentang Jabatan Notaris, Kode Etik Ikatan Notaris Indonesia (I.N.I), dan Ikatan Pejabat Pembuat Akta Tanah (IPPAT).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
