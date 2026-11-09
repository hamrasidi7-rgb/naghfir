import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDatabase } from '@/lib/db';
import { Award, BookOpen, Scale, Heart, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const db = getDatabase();
  return {
    title: `Profil Lengkap & Nilai Pengabdian | ${db.profile.shortName}`,
    description: `Biografi intelektual dan pengabdian Dr. Naghfir, santri Pasongsongan Sumenep yang menempuh pendidikan doktoral dan berprofesi sebagai Notaris & PPAT.`,
  };
}

export default function ProfilePage() {
  const db = getDatabase();
  const profile = db.profile;

  return (
    <div className="py-12 lg:py-20 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-12 border-b border-navy/10 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <Link href="/" className="hover:underline">Beranda</Link>
            <span>/</span>
            <span>Profil Tokoh</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-navy tracking-tight mb-2">
            Dr. Naghfir
          </h1>
          <p className="text-sm sm:text-base font-bold text-burgundy mb-3 uppercase tracking-wider">
            Notaris & PPAT | Akademisi | Penggerak Sosial
          </p>
          <p className="text-xl sm:text-2xl text-navy max-w-3xl font-serif font-bold italic mb-2">
            &ldquo;Ilmu, Hukum, dan Pengabdian.&rdquo;
          </p>
          <p className="text-base text-charcoal/80 max-w-2xl font-sans">
            Membangun kepastian hukum, mengembangkan pemikiran, dan mengabdi kepada masyarakat.
          </p>
        </div>

        {/* Top Portrait & Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-navy/10 aspect-[4/5] bg-white">
              <Image
                src={profile.heroImage}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-4 p-4 rounded-xl bg-ivory border border-navy/10 text-xs text-charcoal/80 text-center">
              <span className="font-bold text-navy block">{profile.name}</span>
              <span>{profile.origin}</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-charcoal/90 text-base sm:text-lg leading-relaxed">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-navy/10">
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy block mb-2">
                Pondasi Karakter Santri
              </span>
              <p className="text-base text-navy font-semibold leading-relaxed">
                {profile.aboutIntro}
              </p>
            </div>

            {profile.aboutStory.map((paragraph, idx) => (
              <p key={idx} className="font-sans leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 flex flex-wrap gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-navy text-white text-xs font-semibold">
                Alumni Ponpes Aqidah Usymuni
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-ivory text-navy border border-navy/15 text-xs font-semibold">
                Doktor Ekonomi Syariah UIN Malang (2025)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-burgundy text-white text-xs font-semibold">
                Notaris & PPAT Kab. Sumenep (2021)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-ivory text-navy border border-navy/15 text-xs font-semibold">
                LWPNU Sumenep
              </span>
              {profile.bphtbAward && (
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  🏆 {profile.bphtbAward}
                </span>
              )}
            </div>

            {profile.officeAddress && (
              <div className="p-4 rounded-xl bg-ivory/60 border border-navy/10 text-xs text-charcoal/80 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">Alamat Kantor Pelayanan Hukum:</span>
                  <span>{profile.officeAddress}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Main Identities in Depth */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-burgundy block mb-2">
              Tiga Matra Pengabdian
            </span>
            <h2 className="text-3xl font-black text-navy">
              Integrasi Ilmu, Hukum, dan Masyarakat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {profile.coreIdentities.map((item, idx) => (
              <div
                key={item.number}
                className="bg-white p-8 rounded-2xl border border-navy/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-black text-burgundy block mb-4">
                    {item.number}
                  </span>
                  <h3 className="text-2xl font-bold text-navy mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold uppercase text-burgundy mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-navy/10">
                  <ul className="space-y-2 text-xs text-charcoal/80">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Journey & Contact */}
        <div className="p-8 sm:p-12 rounded-3xl bg-navy text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              Ingin Mengetahui Linimasa Perjalanan Hidup?
            </h3>
            <p className="text-sm text-ivory/80">
              Lihat 10 babak penting perjalanan dari Desa Campaka hingga pengukuhan Doktor dan Notaris.
            </p>
          </div>
          <Link
            href="/perjalanan"
            className="shrink-0 px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-sm transition-all"
          >
            Buka Linimasa Perjalanan
          </Link>
        </div>

      </div>
    </div>
  );
}
