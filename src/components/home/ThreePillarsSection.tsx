import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, GraduationCap, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ThreePillarsSection() {
  const pillars = [
    {
      code: 'A',
      title: 'Profesional Hukum',
      subtitle: 'Notaris & PPAT Kabupaten Sumenep',
      icon: Scale,
      image: '/images/context/hukum-kenotariatan.webp',
      imageCaption: 'Kepastian Akta & Agraria',
      summary: 'Menjalankan jabatan Notaris dan Pejabat Pembuat Akta Tanah (PPAT) dengan komitmen ketelitian, netralitas, dan kepatuhan penuh terhadap kode etik serta regulasi negara.',
      keyAspects: [
        'Pejabat Pembuat Akta Autentik (SK Kemenkumham RI)',
        'Pejabat Pembuat Akta Tanah (SK Kementerian ATR/BPN)',
        'Notaris Pembuat Akta Koperasi (NPAK Kemenkop UKM)',
        'Juara 1 Mitra Pembayar BPHTB Terbesar Kab. Sumenep',
        'Literasi hukum pertanahan dan pencegahan sengketa agraria'
      ],
      link: '/#profesional',
      linkLabel: 'Pelajari Kiprah Hukum'
    },
    {
      code: 'B',
      title: 'Akademisi',
      subtitle: 'Pendidikan & Riset Doktoral',
      icon: GraduationCap,
      image: '/images/context/pendidikan-kampus.webp',
      imageCaption: 'Tradisi Keilmuan & Riset',
      summary: 'Mengembangkan diskursus hukum, ekonomi syariah, dan kebijakan agraria melalui pendekatan ilmiah, kajian komparatif fiqih-hukum positif, serta dedikasi pengajaran.',
      keyAspects: [
        'Doktor (S3) Ekonomi Syariah UIN Maliki Malang (2025)',
        'Magister Kenotariatan (M.Kn.) Universitas Brawijaya',
        'Sarjana Hukum Islam (S.HI.) UIN Malang',
        'Sarjana Hukum (S.H.) — konfirmasi administratif berkas',
        'Certified Professional Mediator (CPM) & Hipnoterapi (CH, C.Ht.)'
      ],
      link: '/#akademik',
      linkLabel: 'Lihat Jejak Akademik'
    },
    {
      code: 'C',
      title: 'Penggerak Sosial',
      subtitle: 'LWPNU & Pengabdian Masyarakat',
      icon: Users,
      image: '/images/context/sosial-wakaf.webp',
      imageCaption: 'Khidmah & Penyelamatan Aset Umat',
      summary: 'Mengabdikan keahlian hukum untuk kemaslahatan masyarakat perdesaan, advokasi legalitas tanah wakaf lembaga keagamaan, serta pembinaan organisasi sosial.',
      keyAspects: [
        'Pengurus Lembaga Wakaf dan Pertanahan NU (LWPNU) Sumenep',
        'Penyuluhan legalitas sertifikat wakaf masjid dan musholla',
        'Alumni & jejaring santri Pondok Pesantren Aqidah Usymuni',
        'Kaderisasi kepemimpinan pemuda dan aktivis kemahasiswaan',
        'Pendampingan tata kelola aset keumatan berbasis digital'
      ],
      link: '/#sosial',
      linkLabel: 'Jelajahi Pengabdian Sosial'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <span>03 · Tiga Pilar Identitas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
            Trias Dedikasi Dr. Naghfir
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            Sinergi utuh antara keteguhan hukum, kedalaman intelektual akademik, dan kepekaan sosial kemasyarakatan dalam melayani Kabupaten Sumenep dan Madura.
          </p>
        </div>

        {/* 3 Pillars Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.code}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#FBF9F5] border border-navy/10 hover:border-burgundy/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-navy/5">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                  
                  {/* Badge Kode Pilar */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white shadow-md flex items-center justify-center font-black text-navy text-sm border border-navy/10">
                    {pillar.code}
                  </div>

                  {/* Caption & Icon */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-[11px] font-medium tracking-wide text-ivory/90">
                      {pillar.imageCaption}
                    </span>
                    <div className="p-2 rounded-lg bg-burgundy/80 text-white backdrop-blur-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-1 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-burgundy mb-4">
                      {pillar.subtitle}
                    </p>
                    <p className="text-sm text-charcoal/80 leading-relaxed mb-6 font-sans">
                      {pillar.summary}
                    </p>

                    {/* Bullet Points */}
                    <div className="pt-4 border-t border-navy/10 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50 block mb-3">
                        Fokus & Keunggulan:
                      </span>
                      <ul className="space-y-2">
                        {pillar.keyAspects.map((aspect, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-charcoal/85 leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-burgundy shrink-0 mt-0.5" />
                            <span>{aspect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-4 border-t border-navy/10">
                    <Link
                      href={pillar.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-burgundy uppercase tracking-wider transition-colors group/link"
                    >
                      <span>{pillar.linkLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-burgundy group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
