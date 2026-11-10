'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';
import { Monogram, WhatsAppIcon } from '@/components/beranda/ui';

const NAV_LINKS = [
  { id: 'layanan', label: 'Layanan' },
  { id: 'konsultasi', label: 'Konsultasi' },
  { id: 'tentang-saya', label: 'Tentang Saya' },
  { id: 'pengabdian', label: 'Pengabdian & Pemikiran' },
  { id: 'kontak', label: 'Kontak' },
];

// Urutan pemeriksaan: elemen bersarang (#konsultasi di dalam #layanan) diperiksa lebih dulu.
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'border-line bg-paper/95 backdrop-blur-md'
          : 'border-transparent bg-paper'
      }`}
    >
      <div className="page-container flex h-[68px] items-center justify-between gap-6">
        {/* Merek: monogram + nama + identitas kantor */}
        <Link href="/#beranda" className="flex shrink-0 items-center gap-3">
          <Monogram className="text-[34px]" />
          <span className="flex flex-col">
            <span className="font-serif text-lg font-semibold leading-tight text-ink">Dr. Naghfir</span>
            <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-brass-deep">
              Notaris &amp; PPAT
            </span>
          </span>
        </Link>

        {/* Navigasi desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((item) => {
            const active = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className={`relative py-1 text-[13px] font-semibold transition-colors ${
                  active ? 'text-ink' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-brass transition-all ${active ? 'w-full' : 'w-0'}`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi via WhatsApp"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-3 text-[13px] font-semibold text-white transition-colors hover:bg-ink-soft sm:px-4"
          >
            <WhatsAppIcon className="h-4 w-4 text-brass-light" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-paper-deep lg:hidden"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu ponsel */}
      {mobileMenuOpen && (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="page-container flex flex-col py-3" aria-label="Navigasi ponsel">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-line py-4 font-serif text-lg text-ink last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
