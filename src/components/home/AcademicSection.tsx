import React from 'react';
import Link from 'next/link';
import { EducationItem } from '@/data/initialData';
import { GraduationCap, Award, BookOpen, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

interface AcademicSectionProps {
  education: EducationItem[];
}

export default function AcademicSection({ education }: AcademicSectionProps) {
  const certifications = [
    {
      title: 'CPM',
      name: 'Certified Professional Mediator',
      desc: 'Sertifikasi kompetensi mediasi dan penyelesaian sengketa alternatif di luar pengadilan yang tersertifikasi Mahkamah Agung RI.'
    },
    {
      title: 'CH',
      name: 'Certified Hypnotist',
      desc: 'Kompetensi psikologi komunikasi persuasif, relasi interpersonal, dan bimbingan konseling.'
    },
    {
      title: 'C.Ht.',
      name: 'Certified Hypnotherapist',
      desc: 'Kompetensi lanjutan terapi psikologis dan komunikasi mendalam untuk penyelesaian masalah relasi dan mediasi.'
    },
  ];

  return (
    <section id="akademik" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <span>06 · Akademik & Pendidikan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
            Ilmu sebagai Fondasi Integritas & Pengabdian
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            Menempuh tangga pendidikan dari tradisi pesantren hingga jenjang Doktoral (S3). Rekam jejak keilmuan yang terverifikasi faktual menjadi sandaran utama dalam menegakkan kepastian hukum dan tata kelola perikatan.
          </p>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {education.map((item) => {
            const isDoctor = item.degree.includes('Doktor');
            const isPendingAdmin = item.verificationStatus === 'Menunggu Konfirmasi Admin';

            return (
              <div
                key={item.id}
                className={`p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isDoctor
                    ? 'bg-navy text-white shadow-xl border-navy relative overflow-hidden'
                    : isPendingAdmin
                    ? 'bg-white text-charcoal border-amber-300/80 shadow-xs'
                    : 'bg-white text-charcoal hover:shadow-md border-navy/10'
                }`}
              >
                {isDoctor && (
                  <div className="absolute top-0 right-0 bg-burgundy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                    Doktor Teruji 2025
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                      <GraduationCap className={`w-4 h-4 ${isDoctor ? 'text-burgundy-300' : 'text-burgundy'}`} />
                      <span className={isDoctor ? 'text-burgundy-200' : 'text-burgundy'}>
                        {item.period}
                      </span>
                    </div>

                    {isPendingAdmin && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        <AlertCircle className="w-3 h-3" />
                        Verifikasi Admin
                      </span>
                    )}
                  </div>

                  <h3 className={`text-xl font-bold mb-1 ${isDoctor ? 'text-white' : 'text-navy'}`}>
                    {item.degree}
                  </h3>

                  <p className={`text-sm font-semibold mb-2 ${isDoctor ? 'text-ivory/90' : 'text-charcoal'}`}>
                    {item.institution}
                  </p>

                  <div className={`inline-flex items-center gap-1.5 text-xs mb-3 ${isDoctor ? 'text-ivory/60' : 'text-charcoal/60'}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDoctor ? 'text-ivory/80' : 'text-charcoal/70'}`}>
                    {item.description}
                  </p>

                  {item.notes && (
                    <div className="mt-3 p-2.5 rounded bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-snug">
                      ℹ️ {item.notes}
                    </div>
                  )}
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-medium ${
                  isDoctor ? 'border-white/10 text-ivory/60' : 'border-navy/10 text-charcoal/50'
                }`}>
                  <span>Bidang: {item.field}</span>
                  <CheckCircle className={`w-4 h-4 ${isDoctor ? 'text-burgundy-300' : 'text-burgundy'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications and Professional Badges */}
        <div className="bg-white p-8 lg:p-10 rounded-2xl border border-navy/10 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-burgundy" />
            <div>
              <h3 className="text-xl font-bold text-navy">
                Sertifikasi Kompetensi & Keahlian Pendukung
              </h3>
              <p className="text-xs text-charcoal/60 mt-0.5">
                Keahlian non-litigasi untuk mediasi pertanahan, perundingan perikatan, dan resolusi konflik
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div key={cert.title} className="p-5 rounded-xl bg-ivory/60 border border-navy/5 flex flex-col justify-between">
                <div>
                  <span className="text-lg font-black text-burgundy block mb-1">
                    {cert.title}
                  </span>
                  <span className="text-sm font-bold text-navy block mb-2">
                    {cert.name}
                  </span>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-navy/10 text-[10px] text-charcoal/50 font-mono">
                  Terdaftar & Tersertifikasi Resmi
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
