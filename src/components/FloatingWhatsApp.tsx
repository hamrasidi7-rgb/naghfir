'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { getWhatsAppUrl } from '@/config/whatsapp';
import { WhatsAppIcon } from '@/components/beranda/ui';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

/** Tombol WhatsApp melayang — selalu tampil langsung dari bagian paling atas halaman. */
export default function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const pathname = usePathname();

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
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgba(20,33,52,0.55)] ring-4 ring-white transition-all duration-300 hover:scale-110 active:scale-95 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
