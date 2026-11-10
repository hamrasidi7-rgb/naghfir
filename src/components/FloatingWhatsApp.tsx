'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getWhatsAppUrl } from '@/config/whatsapp';
import { WhatsAppIcon } from '@/components/beranda/ui';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

/** Tombol WhatsApp melayang — muncul setelah pengunjung melewati hero. */
export default function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <a
      href={getWhatsAppUrl('floating', whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      title="Konsultasi via WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgba(20,33,52,0.55)] ring-4 ring-white transition-all duration-300 hover:scale-105 sm:bottom-7 sm:right-7 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
