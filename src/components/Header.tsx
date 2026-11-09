'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';

const NAV_LINKS = [
  { href: '/#beranda', label: 'Beranda', id: 'beranda' },
  { href: '/#tentang-saya', label: 'Tentang Saya', id: 'tentang-saya' },
  { href: '/#layanan', label: 'Layanan', id: 'layanan' },
  { href: '/#pengabdian', label: 'Pengabdian', id: 'pengabdian' },
  { href: '/#pemikiran', label: 'Pemikiran', id: 'pemikiran' },
];

interface HeaderProps {
  whatsappNumber?: string;
}

export default function Header({ whatsappNumber }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      const sections = ['beranda', 'layanan', 'tentang-saya', 'pengabdian', 'pemikiran', 'kontak'];
      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl('header', whatsappNumber);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-xs border-b border-[#E5DEC9] py-3'
          : 'bg-[#FAF7F0] py-4 border-b border-[#E5DEC9]/60'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo: Gold Monogram N + Dr. Naghfir */}
          <Link href="/#beranda" className="group flex items-center gap-3 shrink-0">
            <span
              aria-hidden="true"
              className="font-serif italic text-3xl sm:text-4xl font-bold bg-gradient-to-b from-[#D5B05C] via-[#B88B34] to-[#8F6820] bg-clip-text text-transparent select-none leading-none pr-0.5"
            >
              N
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold text-[#142134] leading-tight">
                Dr. Naghfir
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#4B5563] font-medium leading-tight">
                Notaris &amp; PPAT | Akademisi | Penggerak Sosial
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigasi Utama">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative py-1.5 text-xs xl:text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#142134] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#B88938] after:rounded-full'
                      : 'text-[#374151] hover:text-[#142134]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header WhatsApp CTA: WhatsApp Konsultasi / Hubungi Kami */}
          <div className="hidden sm:flex items-center shrink-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              title="Hubungi Kami via WhatsApp"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#142134] bg-gradient-to-b from-[#E4C77F] via-[#CCA350] to-[#B38632] hover:from-[#EAD08E] hover:to-[#BE913B] rounded-lg transition-all border border-[#9E7425]/40 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#142134]" />
              <span>WhatsApp Konsultasi</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-md text-[#142134] hover:bg-[#EFE8D8] focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E5DEC9] bg-[#FAF7F0] px-4 pt-3 pb-5 shadow-lg">
          <nav className="flex flex-col divide-y divide-[#E5DEC9]">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="py-3 text-sm font-semibold text-[#142134] hover:text-[#9E7425] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 mt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold rounded-lg bg-gradient-to-b from-[#E4C77F] via-[#CCA350] to-[#B38632] text-[#142134] border border-[#9E7425]/40 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Konsultasi</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
