'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Mail, MessageCircle, Shield } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';

interface FooterProps {
  whatsappNumber?: string;
}

export default function Footer({ whatsappNumber }: FooterProps) {
  const pathname = usePathname();

  // Di halaman utama (/), Kontak & Footer sudah digabung dalam ContactFooterSection
  if (pathname === '/' || pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl('kontak', whatsappNumber);

  return (
    <footer className="bg-ink text-text-on-dark pt-12 pb-8 border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          <div className="md:col-span-6 space-y-3">
            <span className="font-serif text-2xl font-bold tracking-wider text-white block">
              DR. NAGHFIR
            </span>
            <p className="text-xs font-semibold text-brass-light">
              Dr. Naghfir, S.HI., S.H., M.Kn., CPM., CH., C.Ht.
            </p>
            <p className="text-sm font-serif italic text-text-on-dark/90">
              &ldquo;Ilmu, Hukum, dan Pengabdian.&rdquo;
            </p>
            <p className="text-xs text-text-on-dark/70 flex items-start gap-2 pt-1 max-w-md">
              <MapPin className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
              <span>
                Jl. Jokotole – Perum Griya Berkat Regency Gg. III No. 24 (Lingkar Barat), Kec. Batuan, Kab. Sumenep, Jawa Timur
              </span>
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <h4 className="font-bold uppercase tracking-widest text-brass-light">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-text-on-dark/80">
              <li><Link href="/#beranda" className="hover:text-brass-light transition-colors">Beranda</Link></li>
              <li><Link href="/#layanan" className="hover:text-brass-light transition-colors">Layanan</Link></li>
              <li><Link href="/#konsultasi" className="hover:text-brass-light transition-colors">Konsultasi</Link></li>
              <li><Link href="/#tentang-saya" className="hover:text-brass-light transition-colors">Tentang Saya</Link></li>
              <li><Link href="/#pengabdian" className="hover:text-brass-light transition-colors">Pengabdian</Link></li>
              <li><Link href="/#pemikiran" className="hover:text-brass-light transition-colors">Pemikiran</Link></li>
              <li><Link href="/#kontak" className="hover:text-brass-light transition-colors">Kontak</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-widest text-brass-light">
              Saluran Resmi
            </h4>
            <p className="text-text-on-dark/80 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brass-light" />
              <a href="mailto:kontak@naghfir.id" className="hover:text-brass-light transition-colors">
                kontak@naghfir.id
              </a>
            </p>
            <div className="pt-1">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brass-btn text-ink font-bold uppercase tracking-wider hover:bg-[#A87E2E] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-on-dark/60 gap-4">
          <p>© {new Date().getFullYear()} Dr. Naghfir, S.HI., S.H., M.Kn. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-5">
            <span>Kabupaten Sumenep · Madura · Indonesia</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-text-on-dark/50 hover:text-brass-light transition-colors"
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
