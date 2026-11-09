import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ThreePillarsSection() {
  const pillars = [
    {
      label: 'Praktisi Hukum',
      title: 'Notaris & PPAT',
      description:
        'Pejabat Umum dan Pembuat Akta Tanah Kabupaten Sumenep (SK 2021) serta Notaris Pembuat Akta Koperasi (NPAK). Penerima penghargaan Juara 1 Mitra Pembayar BPHTB Terbesar dari Bapenda Kabupaten Sumenep.',
      link: '/profil#profesional',
      linkText: 'Kiprah Kenotariatan',
    },
    {
      label: 'Akademisi & Peneliti',
      title: 'Ilmu Hukum & Syariah',
      description:
        'Meraih gelar Doktor (S3) Ekonomi Syariah di UIN Maulana Malik Ibrahim Malang (2025) dan Magister Kenotariatan (M.Kn.) di Universitas Brawijaya. Aktif meneliti hukum pertanahan, ekonomi Islam, dan mediasi (CPM).',
      link: '/profil#akademik',
      linkText: 'Latar Akademik',
    },
    {
      label: 'Pengabdian Sosial',
      title: 'Wakaf & Kemasyarakatan',
      description:
        'Mengabdi sebagai Pengurus Lembaga Wakaf dan Pertanahan NU (LWPNU) Kabupaten Sumenep. Fokus mendampingi percepatan sertifikasi tanah wakaf tempat ibadah, pesantren, dan literasi hukum warga desa.',
      link: '/profil#sosial',
      linkText: 'Pengabdian Masyarakat',
    },
  ];

  return (
    <section className="pb-16 sm:pb-24 bg-white border-b border-[#252525]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Garis Pemisah Tipis Atas & Bawah, 3 Kolom Editorial Minimalis */}
        <div className="border-t border-b border-[#252525]/15 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#252525]/15">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`py-8 md:py-10 flex flex-col justify-between ${
                idx === 0
                  ? 'md:pr-8 lg:pr-10'
                  : idx === 1
                  ? 'md:px-8 lg:px-10'
                  : 'md:pl-8 lg:pl-10'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy block mb-2">
                  {pillar.label}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-charcoal/80 leading-relaxed font-sans mb-6">
                  {pillar.description}
                </p>
              </div>

              <div>
                <Link
                  href={pillar.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-navy hover:text-burgundy transition-colors group"
                >
                  <span>{pillar.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
