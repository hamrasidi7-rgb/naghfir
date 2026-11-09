import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Award, Compass, Scroll } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface HeroSectionProps {
  profile: ProfileData;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#FDFCFB] border-b border-navy/10 pt-6 pb-16 lg:py-24">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-ivory opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-burgundy/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Bio & Brand Identity */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            {/* Tagline / Sub-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory border border-navy/10 text-xs font-semibold tracking-wider uppercase text-navy">
              <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
              <span>{profile.origin.split(',')[0]} · {profile.tagline}</span>
            </div>

            {/* Name & Titles */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.1]">
                DR. NAGHFIR
              </h1>
              <p className="text-sm sm:text-base font-semibold text-burgundy tracking-wide">
                {profile.degrees}
              </p>
            </div>

            {/* Main Headline */}
            <div className="border-l-4 border-burgundy pl-4 sm:pl-6 py-1">
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-serif italic text-navy leading-snug">
                &ldquo;{profile.headline}&rdquo;
              </h2>
            </div>

            {/* Factual Editorial Narrative */}
            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans max-w-2xl">
              {profile.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-burgundy hover:bg-burgundy-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>Mengenal Lebih Dekat</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/perjalanan"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ivory hover:bg-ivory-300 text-navy font-medium text-sm border border-navy/15 transition-all"
              >
                <span>Perjalanan dan Pemikiran</span>
                <ArrowDown className="w-4 h-4" />
              </Link>
            </div>

            {/* Three Pillar Metric Badges */}
            <div className="pt-6 border-t border-navy/10 grid grid-cols-3 gap-3 sm:gap-6 text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-black text-navy">Doktor</span>
                <span className="text-xs text-charcoal/70">Ekonomi Syariah (2025)</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-navy">Notaris & PPAT</span>
                <span className="text-xs text-charcoal/70">Tersumpah Sejak 2021</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-navy">LWPNU</span>
                <span className="text-xs text-charcoal/70">Advokasi Aset Wakaf</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Portrait Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-ivory/80 -rotate-2 border border-navy/10 -z-10" />
              <div className="absolute -inset-1 sm:-inset-2 rounded-3xl bg-burgundy/10 rotate-1 -z-10" />

              {/* Main Portrait Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-navy/10 aspect-[4/5]">
                <Image
                  src={profile.heroImage}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Gradient Overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-5 sm:p-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-burgundy-200">
                    Tokoh Profesional Sumenep
                  </span>
                  <p className="text-base sm:text-lg font-bold leading-tight mt-0.5">
                    Dr. Naghfir
                  </p>
                  <p className="text-xs text-ivory/80 mt-1">
                    Desa Campaka, Pasongsongan, Madura
                  </p>
                </div>
              </div>

              {/* Verified badge floating */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white py-2.5 px-4 rounded-xl shadow-lg border border-navy/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
                  <Scroll className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-navy block">
                    Integritas & Amanah
                  </span>
                  <span className="text-[11px] text-charcoal/70">
                    Notaris & PPAT Kab. Sumenep
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
