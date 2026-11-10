'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';
import { Monogram, WhatsAppIcon } from '@/components/beranda/ui';

const NAV_LINKS = [
  { id: 'layanan', label: 'Layanan' },
  { id: 'konsultasi', label: 'Konsultasi' },
  { id: 'tentang-saya', label: 'Tentang Saya' },
  { id: 'pengabdian', label: 'Pengabdian & Pemikiran' },
  { id: 'kontak', label: 'Kontak' },
];

const TRACKED_SECTIONS = ['konsultasi', 'layanan', 'tentang-saya', 'pengabdian', 'kontak'];

interface HeaderProps {
  whatsappNumber?: string;
}

export default function Header({ whatsappNumber }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl('header', whatsappNumber);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'border-b border-line bg-paper/95 backdrop-blur-md shadow-xs'
          : 'border-b border-line/40 bg-paper/80 backdrop-blur-xs'
      }`}
    >
      <div className="page-container flex h-14 sm:h-16 lg:h-[68px] items-center justify-between gap-2.5 sm:gap-6">
        {/* Brand identity: Monogram + Nama + Jabatan Resmi */}
        <Link
          href="/#beranda"
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

        {/* Action Controls: WhatsApp & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi via WhatsApp"
            className="inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-ink px-2.5 sm:px-4 text-[11.5px] sm:text-[13px] font-semibold text-text-on-dark transition-all duration-200 hover:bg-ink-soft hover:shadow-xs active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4 text-brass-light shrink-0" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-ink hover:bg-paper-muted transition-colors lg:hidden"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-line bg-paper lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="page-container flex flex-col py-3" aria-label="Navigasi ponsel">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-line py-3.5 font-serif text-base font-medium text-ink transition-colors hover:text-brass last:border-b-0"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-brass/70" />
              </Link>
            ))}

            <div className="pt-4 pb-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-gold w-full text-xs font-semibold shadow-xs"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Konsultasi Langsung via WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
