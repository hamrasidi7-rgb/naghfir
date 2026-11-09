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

  // Di halaman utama (/), Kontak & Footer sudah digabung dalam Section 6 (ContactSection)
  if (pathname === '/' || pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl('kontak', whatsappNumber);

  return (
    <footer className="bg-navy text-ivory pt-12 pb-8 border-t border-gold/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          <div className="md:col-span-6 space-y-3">
            <span className="font-serif text-2xl font-bold tracking-wider text-white block">
              DR. NAGHFIR
            </span>
            <p className="text-xs font-semibold text-gold-300">
              Dr. Naghfir, S.HI., S.H., M.Kn., CPM., CH., C.Ht.
            </p>
            <p className="text-sm font-serif italic text-ivory/90">
              &ldquo;Ilmu, Hukum, dan Pengabdian.&rdquo;
            </p>
            <p className="text-xs text-ivory/70 flex items-start gap-2 pt-1 max-w-md">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>
                Jl. Jokotole – Perum Griya Berkat Regency Gg. III No. 24 (Lingkar Barat), Kec. Batuan, Kab. Sumenep, Jawa Timur
              </span>
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <h4 className="font-bold uppercase tracking-widest text-gold-300">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-ivory/80">
              <li><Link href="/#beranda" className="hover:text-gold transition-colors">Beranda</Link></li>
              <li><Link href="/#tentang-saya" className="hover:text-gold transition-colors">Tentang Saya</Link></li>
              <li><Link href="/#layanan" className="hover:text-gold transition-colors">Layanan</Link></li>
              <li><Link href="/#pengabdian" className="hover:text-gold transition-colors">Pengabdian</Link></li>
              <li><Link href="/#pemikiran" className="hover:text-gold transition-colors">Pemikiran</Link></li>
              <li><Link href="/#kontak" className="hover:text-gold transition-colors">Kontak</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-widest text-gold-300">
              Saluran Resmi
            </h4>
            <p className="text-ivory/80 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <a href="mailto:kontak@naghfir.id" className="hover:text-gold transition-colors">
                kontak@naghfir.id
              </a>
            </p>
            <div className="pt-1">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-navy font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
          <p>© {new Date().getFullYear()} Dr. Naghfir, S.HI., S.H., M.Kn. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-5">
            <span>Kabupaten Sumenep · Madura · Indonesia</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-ivory/50 hover:text-gold transition-colors"
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
