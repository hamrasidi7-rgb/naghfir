'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export default function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const href = getWhatsAppUrl('floating', whatsappNumber);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi WhatsApp Kantor Notaris & PPAT Dr. Naghfir"
        title="Konsultasi WhatsApp Kantor Notaris & PPAT Dr. Naghfir"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white border-[3px] border-white shadow-xl flex items-center justify-center transition-transform hover:scale-105"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
