'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/perjalanan', label: 'Perjalanan' },
  { href: '/pemikiran', label: 'Pemikiran' },
  { href: '/aktivitas', label: 'Aktivitas' },
  { href: '/publikasi', label: 'Publikasi' },
  { href: '/kontak', label: 'Kontak' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) {
    return null; // Admin has its own dedicated shell
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFCFB]/95 backdrop-blur-md shadow-sm border-b border-navy/10 py-3.5'
          : 'bg-[#FDFCFB] py-5 border-b border-navy/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Wordmark Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-sans text-2xl font-black tracking-widest text-navy group-hover:text-burgundy transition-colors uppercase">
              NAGHFIR
            </span>
            <span className="text-[10px] uppercase tracking-wider text-charcoal/60 font-medium">
              Santri · Akademisi · Notaris
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-burgundy text-white shadow-sm'
                      : 'text-charcoal/80 hover:text-burgundy hover:bg-ivory'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy bg-ivory hover:bg-burgundy hover:text-white rounded-full transition-all border border-navy/10"
            >
              <span>Ruang Diskusi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-charcoal hover:text-burgundy hover:bg-ivory focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-navy/10 bg-[#FDFCFB] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-burgundy text-white'
                      : 'text-charcoal hover:bg-ivory hover:text-burgundy'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-navy/10">
              <Link
                href="/kontak"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-navy text-white hover:bg-burgundy transition-colors"
              >
                <span>Terhubung & Berdiskusi</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
