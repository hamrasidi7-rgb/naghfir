import React from 'react';
import Link from 'next/link';
import { getDatabase } from '@/lib/db';
import ContactSection from '@/components/home/ContactSection';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const db = getDatabase();
  return {
    title: `Kontak & Ruang Diskusi | ${db.profile.shortName}`,
    description: `Hubungi Dr. Naghfir untuk komunikasi resmi, undangan diskusi, seminar hukum, konsultasi akademik, dan kegiatan kemasyarakatan di Sumenep.`,
  };
}

export default function ContactPage() {
  const db = getDatabase();

  return (
    <div className="py-6 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brass mb-3">
          <Link href="/" className="hover:underline">Beranda</Link>
          <span>/</span>
          <span>Kontak & Ruang Diskusi</span>
        </div>
      </div>
      <ContactSection contact={db.contact} includeFooter={false} />
    </div>
  );
}
