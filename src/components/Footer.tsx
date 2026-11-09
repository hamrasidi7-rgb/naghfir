'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Mail, ArrowUpRight, Shield, BookOpen, Scale, Heart } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  return (
    <footer className="bg-navy text-ivory pt-16 pb-12 border-t border-navy/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="font-sans text-2xl lg:text-3xl font-black tracking-widest text-white uppercase">
                NAGHFIR
              </span>
              <p className="text-sm font-medium text-ivory/70">
                Dr. Naghfir, S.HI., S.H., M.Kn., CPM., CH., C.Ht.
              </p>
            </div>
            <p className="text-base text-ivory/90 italic font-serif leading-relaxed max-w-md">
              &ldquo;Ilmu, profesi, dan pengabdian untuk masyarakat.&rdquo;
            </p>
            <p className="text-sm text-ivory/70 leading-relaxed max-w-md">
              Membangun kepastian hukum, merawat nilai-nilai pesantren, dan berkhidmat untuk kemaslahatan masyarakat di tanah kelahiran, Sumenep, Madura.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-ivory/60">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-burgundy-300" />
                Sumenep, Madura, Jawa Timur
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-white transition-colors">
                  Profil & Nilai
                </Link>
              </li>
              <li>
                <Link href="/perjalanan" className="hover:text-white transition-colors">
                  Perjalanan Hidup
                </Link>
              </li>
              <li>
                <Link href="/pemikiran" className="hover:text-white transition-colors">
                  Pemikiran & Gagasan
                </Link>
              </li>
              <li>
                <Link href="/aktivitas" className="hover:text-white transition-colors">
                  Catatan Aktivitas
                </Link>
              </li>
              <li>
                <Link href="/publikasi" className="hover:text-white transition-colors">
                  Publikasi & Media
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">
                  Ruang Diskusi & Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Professional Values */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
              Pilar Pengabdian
            </h4>
            <div className="space-y-3 text-sm text-ivory/80">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-burgundy-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Tradisi Pesantren & Akademik</span>
                  <span className="text-xs text-ivory/60">
                    Fondasi moralitas, adab keilmuan, dan analisis regulasi syariah.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-burgundy-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Kepastian Hukum & Kenotariatan</span>
                  <span className="text-xs text-ivory/60">
                    Akta autentik, ketelitian agraria (PPAT), dan mediasi profesional.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-burgundy-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Advokasi Aset Wakaf Umat</span>
                  <span className="text-xs text-ivory/60">
                    Berkhidmat bersama LWPNU Sumenep mengamankan tanah wakaf masyarakat.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
          <p>© {new Date().getFullYear()} Dr. Naghfir. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-ivory/40">Profil Personal Tokoh Publik</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-ivory/40 hover:text-white transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>CMS Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
