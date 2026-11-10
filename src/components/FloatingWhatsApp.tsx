'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getWhatsAppUrl } from '@/config/whatsapp';
import { WhatsAppIcon } from '@/components/beranda/ui';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

/**
 * Tombol WhatsApp melayang:
 * - Muncul saat membaca konten halaman.
 * - Otomatis tersembunyi saat menu mobile terbuka (mencegah tumpuk).
 * - Otomatis tersembunyi saat CTA WhatsApp di footer terlihat (mencegah redundansi bertumpuk).
 */
export default function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Pantau state buka/tutup menu mobile dari Header
  useEffect(() => {
    const handleMenuState = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      if (customEvent.detail) {
        setIsMenuOpen(customEvent.detail.open);
      }
    };
    window.addEventListener('mobile-menu-state', handleMenuState);
    return () => window.removeEventListener('mobile-menu-state', handleMenuState);
  }, []);

  // Pantau apakah tombol WhatsApp di footer sedang terlihat di viewport
  useEffect(() => {
    const target =
      document.getElementById('footer-whatsapp-cta') || document.getElementById('kontak');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const shouldShow = !isMenuOpen && !isFooterVisible;

  return (
    <a
      href={getWhatsAppUrl('floating', whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      title="Konsultasi via WhatsApp"
      aria-hidden={!shouldShow}
      tabIndex={shouldShow ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgba(20,33,52,0.55)] ring-4 ring-white transition-all duration-300 hover:scale-110 active:scale-95 sm:bottom-7 sm:right-7 ${
        shouldShow
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-6 opacity-0 pointer-events-none'
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
