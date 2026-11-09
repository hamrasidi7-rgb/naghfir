import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, GraduationCap, Users, ArrowRight, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';

export default function ThreePillarsSection() {
  const pillars = [
    {
      code: 'A',
      title: 'Praktisi Hukum (Notaris & PPAT)',
      subtitle: 'Pejabat Umum & Pertanahan Kab. Sumenep',
      icon: Scale,
      image: '/images/context/hukum-kenotariatan.webp',
      imageCaption: 'Kepastian Akta & Agraria',
      summary:
        'Menjalankan wewenang jabatan Notaris dan PPAT dengan prinsip kehati-hatian, ketelitian administratif, dan kepatuhan penuh pada Undang-Undang Jabatan Notaris (UUJN).',
      keyAspects: [
        'Notaris Tersumpah (SK Kemenkumham RI 2021) & PPAT (SK ATR/BPN)',
        'Notaris Pembuat Akta Koperasi (NPAK Kemenkop UKM RI)',
        'Juara 1 Mitra Pembayar BPHTB Terbesar Kab. Sumenep (Bapenda)',
        'Edukasi literasi hukum pertanahan & pencegahan sengketa agraria',
      ],
      officeNote: 'Kantor Resmi: Jl. Jokotole – Perum Griya Berkat Regency Gg. III No. 24 (Lingkar Barat), Kec. Batuan, Sumenep.',
      link: '/profil#profesional',
      linkLabel: 'Lihat Detail Kredensial & Kiprah →',
    },
    {
      code: 'B',
      title: 'Akademisi & Peneliti',
      subtitle: 'Doktor Ekonomi Syariah & Hukum Kenotariatan',
      icon: GraduationCap,
      image: '/images/context/pendidikan-kampus.webp',
      imageCaption: 'Tradisi Keilmuan & Riset',
      summary:
        'Mengembangkan pemikiran hukum keperdataan, ekonomi syariah, dan tata kelola agraria melalui riset doktoral, kajian komparatif fiqih-hukum positif, serta pengajaran akademik.',
      keyAspects: [
        'Doktor (S3) Ekonomi Syariah UIN Maliki Malang (Lulus 2025)',
        'Magister Kenotariatan (M.Kn.) Universitas Brawijaya Malang',
        'Sarjana Hukum Islam (S.HI.) UIN Malang & Sarjana Hukum (S.H.*)',
        'Sertifikasi Mediator & Konseling: CPM, CH, dan C.Ht.',
      ],
      officeNote: '*Data nama universitas penerbit S.H. dalam tahap verifikasi dokumen administratif.',
      link: '/profil#akademik',
      linkLabel: 'Lihat Detail Kredensial & Kiprah →',
    },
    {
      code: 'C',
      title: 'Penggerak Sosial (LWPNU)',
      subtitle: 'Advokasi Wakaf & Pengabdian Masyarakat',
      icon: Users,
      image: '/images/context/sosial-wakaf.webp',
      imageCaption: 'Khidmah & Penyelamatan Aset Umat',
      summary:
        'Mengabdikan keahlian kenotariatan dan agraria untuk melindungi aset wakaf tempat ibadah, lembaga pendidikan pesantren, serta pemberdayaan warga desa di Madura.',
      keyAspects: [
        'Pengurus Lembaga Wakaf & Pertanahan NU (LWPNU) Sumenep',
        'Pendampingan percepatan sertifikasi tanah wakaf masjid & musholla',
        'Alumni Pondok Pesantren Aqidah Usymuni Tarate Sumenep',
        'Kaderisasi intelektual muda melalui PMII & jejaring santri',
      ],
      officeNote: 'Fokus pengabdian: perlindungan hukum aset umat lintas daratan dan kepulauan Sumenep.',
      link: '/profil#sosial',
      linkLabel: 'Lihat Detail Kredensial & Kiprah →',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
              <span>03 · Tiga Pilar Dedikasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy tracking-tight leading-tight mb-3">
              Rangkuman Eksekutif Kiprah & Kompetensi
            </h2>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
              Integrasi utuh antara wewenang jabatan hukum publik, otoritas akademik doktoral, dan pengabdian sosial kemasyarakatan di Kabupaten Sumenep.
            </p>
          </div>

          <Link
            href="/profil"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory hover:bg-navy text-navy hover:text-white text-xs font-bold uppercase tracking-wider border border-navy/15 transition-all shrink-0"
          >
            <span>Lihat Detail Kredensial & Kiprah</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Pillars Compact Executive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.code}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#FBF9F5] border border-navy/10 hover:border-burgundy/40 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Compact Visual Header */}
                <div className="relative h-40 w-full overflow-hidden bg-navy/5">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/35 to-transparent" />

                  <div className="absolute top-3.5 left-3.5 w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-black text-navy text-xs border border-navy/10">
                    {pillar.code}
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="text-[11px] font-semibold tracking-wide text-ivory/95">
                      {pillar.imageCaption}
                    </span>
                    <div className="p-1.5 rounded-lg bg-burgundy text-white">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-1 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-burgundy mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-4 font-sans">
                      {pillar.summary}
                    </p>

                    {/* 4 Concise Bullet Points */}
                    <div className="pt-3.5 border-t border-navy/10 mb-4">
                      <ul className="space-y-2">
                        {pillar.keyAspects.map((aspect, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-charcoal/90 leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-burgundy shrink-0 mt-0.5" />
                            <span>{aspect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contextual Note (Address / Verification / Focus) */}
                    <div className="p-3 rounded-lg bg-white border border-navy/10 text-[11px] text-charcoal/75 leading-relaxed mb-4">
                      {pillar.officeNote}
                    </div>
                  </div>

                  {/* Footer Link to /profil */}
                  <div className="pt-3 border-t border-navy/10">
                    <Link
                      href={pillar.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy hover:text-navy uppercase tracking-wider transition-colors"
                    >
                      <span>{pillar.linkLabel}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact UUJN Ethical Compliance Bar */}
        <div className="p-4 sm:p-5 rounded-xl bg-ivory/75 border border-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-charcoal/80">
          <div className="flex items-start sm:items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-burgundy shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed">
              <strong className="text-navy">Kepatuhan Kode Etik Profesi (UUJN):</strong> Situs ini adalah laman biografi intelektual & pengabdian publik Dr. Naghfir, bukan media promosi komersial jasa kenotariatan.
            </p>
          </div>
          <Link
            href="/profil"
            className="text-xs font-bold text-navy hover:text-burgundy underline underline-offset-4 shrink-0"
          >
            Baca Profil Lengkap →
          </Link>
        </div>

      </div>
    </section>
  );
}
