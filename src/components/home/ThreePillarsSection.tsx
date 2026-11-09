import React from 'react';
import Link from 'next/link';
import { Scale, GraduationCap, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ThreePillarsSection() {
  const pillars = [
    {
      code: '01',
      title: 'Praktisi Hukum',
      subtitle: 'Notaris & PPAT Kab. Sumenep',
      icon: Scale,
      summary:
        'Menjalankan wewenang jabatan akta autentik dan pertanahan dengan ketelitian serta kepatuhan penuh pada UUJN.',
      keyAspects: [
        'SK Notaris & PPAT Tersumpah (2021) + NPAK',
        'Juara 1 Mitra Pembayar BPHTB Sumenep',
        'Kantor: Griya Berkat Regency, Batuan, Sumenep',
      ],
      link: '/profil#profesional',
    },
    {
      code: '02',
      title: 'Akademisi',
      subtitle: 'Doktor Ekonomi Syariah & Hukum',
      icon: GraduationCap,
      summary:
        'Mengembangkan kajian hukum keperdataan, ekonomi syariah, dan agraria melalui riset doktoral dan pengajaran.',
      keyAspects: [
        'Doktor (S3) Ekonomi Syariah UIN Malang (2025)',
        'Magister Kenotariatan (M.Kn.) Univ. Brawijaya',
        'Sertifikasi Mediator & Konseling (CPM, CH, C.Ht.)',
      ],
      link: '/profil#akademik',
    },
    {
      code: '03',
      title: 'Penggerak Sosial',
      subtitle: 'LWPNU & Pengabdian Umat',
      icon: Users,
      summary:
        'Mengadvokasi penyelamatan aset wakaf tempat ibadah, pesantren, dan literasi hukum warga desa di Madura.',
      keyAspects: [
        'Pengurus Lembaga Wakaf (LWPNU) Sumenep',
        'Pendampingan Sertifikasi Tanah Wakaf Umat',
        'Alumni Ponpes Aqidah Usymuni & Kader PMII',
      ],
      link: '/profil#sosial',
    },
  ];

  return (
    <section className="py-14 md:py-18 bg-white border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-1.5">
              <span>03 · Tiga Pilar Dedikasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              Kredensial & Ruang Pengabdian
            </h2>
          </div>

          <Link
            href="/profil"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy hover:text-navy uppercase tracking-wider transition-colors shrink-0"
          >
            <span>Lihat Detail Kredensial & Kiprah</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Streamlined Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.code}
                className="group p-6 rounded-2xl bg-[#FBF9F5] border border-navy/10 hover:border-burgundy/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center">
                      <Icon className="w-5 h-5 text-burgundy-200" />
                    </div>
                    <span className="text-xs font-mono font-bold text-charcoal/40">
                      PILAR {pillar.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-burgundy mb-3">
                    {pillar.subtitle}
                  </p>

                  {/* 1-Sentence Core Description (max 2 lines) */}
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-4 line-clamp-2">
                    {pillar.summary}
                  </p>

                  {/* 3 Short 1-Line Highlights */}
                  <ul className="space-y-2 pt-3.5 border-t border-navy/10 mb-5">
                    {pillar.keyAspects.map((aspect, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-navy font-medium truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-burgundy shrink-0" />
                        <span className="truncate">{aspect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={pillar.link}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-burgundy group-hover:text-navy uppercase tracking-wider transition-colors"
                >
                  <span>Rincian Lengkap</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* 1-Line Subtle Ethical Disclaimer */}
        <p className="mt-6 text-center text-[11px] text-charcoal/60">
          *Laman biografi intelektual & pengabdian publik Dr. Naghfir — mematuhi penuh Kode Etik Notaris & UUJN (bukan promosi komersial).
        </p>

      </div>
    </section>
  );
}
