'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';
import { Monogram, WhatsAppIcon } from '@/components/beranda/ui';

const NAV_LINKS = [
  { id: 'layanan', label: 'Layanan' },
  { id: 'tentang-saya', label: 'Tentang Saya' },
  { id: 'pengabdian', label: 'Pengabdian & Pemikiran' },
  { id: 'kontak', label: 'Kontak' },
];

const TRACKED_SECTIONS = ['layanan', 'tentang-saya', 'pengabdian', 'kontak'];

interface HeaderProps {
  whatsappNumber?: string;
}

export default function Header({ whatsappNumber }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pantau scroll untuk active section & efek scroll header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
      let current = '';
      for (const id of TRACKED_SECTIONS) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top <= 120 && rect.bottom >= 120) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Tutup menu saat rute berpindah
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Kunci scroll halaman saat menu mobile terbuka & broadcast state ke floating WhatsApp
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { open: true } }));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { open: false } }));
    }
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { open: false } }));
    };
  }, [mobileMenuOpen]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl('header', whatsappNumber);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          mobileMenuOpen
            ? 'border-b border-line bg-paper'
            : isScrolled
            ? 'border-b border-line bg-paper/95 backdrop-blur-md shadow-xs'
            : 'border-b border-line/40 bg-paper/90 backdrop-blur-xs'
        }`}
      >
        <div className="page-container flex h-14 sm:h-16 lg:h-[68px] items-center justify-between gap-2.5 sm:gap-6">
          {/* Brand identity: Monogram + Nama + Jabatan Resmi */}
          <Link
            href="/#beranda"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex shrink-0 items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90"
          >
            <Monogram className="text-[26px] sm:text-[34px] transition-transform duration-200 group-hover:scale-105" />
            <span className="flex flex-col">
              <span className="font-serif text-[15px] sm:text-lg font-semibold leading-tight text-ink tracking-tight">
                Dr. Naghfir
              </span>
              <span className="text-[9px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brass">
                Notaris &amp; PPAT
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Navigasi utama">
            {NAV_LINKS.map((item) => {
              const active = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`relative py-1 text-[13px] font-semibold transition-colors duration-150 ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-brass transition-all duration-200 ${
                      active ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Controls: WhatsApp Desktop (Hidden di mobile) & Mobile Hamburger/X */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Tombol WhatsApp pill: HANYA tampil di desktop, HAPUS di mobile untuk hilangkan redundansi */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Konsultasi via WhatsApp"
              className="hidden lg:inline-flex h-9 sm:h-10 items-center justify-center gap-2 rounded-full bg-ink px-4 text-[13px] font-semibold text-text-on-dark transition-all duration-200 hover:bg-ink-soft hover:shadow-xs active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4 text-brass-light shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Tombol Menu Toggle Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-paper-muted transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu (Solid #FBF9F4, Kunci Scroll, Menutupi 100% Konten Belakang) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className="fixed inset-x-0 top-14 h-[calc(100dvh-3.5rem)] z-40 bg-[#FBF9F4] lg:hidden flex flex-col justify-between overflow-y-auto overscroll-contain animate-in fade-in duration-200"
        >
          <div className="page-container flex flex-col flex-1 justify-between py-6 sm:py-8 min-h-full">
            {/* Daftar Tautan Navigasi Editorial */}
            <nav aria-label="Navigasi menu utama" className="flex flex-col divide-y divide-line/70">
              {NAV_LINKS.map((item, idx) => {
                const active = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-4 text-ink transition-colors hover:text-brass"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-semibold text-brass">0{idx + 1}</span>
                      <span
                        className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight transition-transform group-hover:translate-x-1 ${
                          active ? 'text-brass' : 'text-ink'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper-card text-muted transition-colors group-hover:border-brass group-hover:text-brass shadow-2xs">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Bagian Bawah: Satu CTA WhatsApp Besar & Identitas Resmi */}
            <div className="pt-8 pb-4 border-t border-line/80 mt-auto">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted mb-3 text-center sm:text-left">
                Konsultasi Langsung
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-gold w-full justify-center py-4 text-sm font-semibold shadow-xs"
              >
                <WhatsAppIcon className="h-5 w-5 text-ink shrink-0" />
                <span>Konsultasi Langsung via WhatsApp</span>
              </a>
              <p className="mt-3 text-center text-xs text-muted">
                Kantor Notaris &amp; PPAT Dr. Naghfir · Batuan, Sumenep
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
