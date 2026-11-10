import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Mail, MapPin, Shield } from 'lucide-react';
import { ContactSettings } from '@/data/initialData';
import { OFFICE_HOURS_DUMMY } from '@/data/prototype/consultation';
import { formatWhatsAppDisplay, getWhatsAppUrl, isDummyWhatsAppNumber } from '@/config/whatsapp';
import { DummyTag, Monogram, WhatsAppIcon } from './ui';

interface ContactFooterSectionProps {
  contact: ContactSettings;
  fullName: string;
}

const NAV = [
  { href: '#layanan', label: 'Layanan' },
  { href: '#tentang-saya', label: 'Tentang Saya' },
  { href: '#pengabdian', label: 'Pengabdian & Pemikiran' },
  { href: '#kontak', label: 'Kontak' },
];

const SOCIAL_PATHS: Record<string, string> = {
  instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  youtube:
    'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  facebook:
    'M22.68 0H1.32C.59 0 0 .59 0 1.32v21.36C0 23.4.59 24 1.32 24h11.5v-9.29H9.7v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.8.14v3.24h-1.92c-1.5 0-1.8.72-1.8 1.76v2.31h3.59l-.47 3.62h-3.12V24h6.12c.73 0 1.32-.6 1.32-1.32V1.32C24 .59 23.4 0 22.68 0z',
};

export default function ContactFooterSection({ contact, fullName }: ContactFooterSectionProps) {
  const waHref = getWhatsAppUrl('kontak', contact.whatsappNumber);
  const dummyWa = isDummyWhatsAppNumber(contact.whatsappNumber);
  const socials = (['instagram', 'youtube', 'facebook'] as const).filter((k) => contact.socials?.[k]);

  return (
    <section id="kontak" className="relative scroll-mt-20 bg-ink text-white">
      {/* Target anchor konsultasi yang mengarah langsung ke kontak */}
      <div id="konsultasi" className="absolute -top-16 left-0 pointer-events-none" />
      <div className="page-container pb-8 pt-12 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Ajakan konsultasi */}
          <div className="lg:col-span-7">
            <p className="eyebrow text-brass-light before:bg-brass-light">Kontak</p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              Butuh Konsultasi
              <br className="hidden sm:block" /> Notaris &amp; PPAT?
            </h2>
            <p className="mt-3 sm:mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-white/70">
              Sampaikan kebutuhan Anda melalui WhatsApp. Kantor akan membantu informasi layanan,
              persyaratan, dan penjadwalan konsultasi.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <a
                id="footer-whatsapp-cta"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold justify-center py-3 text-xs sm:text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Hubungi via WhatsApp</span>
              </a>
              <a href="#konsultasi" className="btn btn-outline-light justify-center py-3 text-xs sm:text-sm">
                <span>Simulasi Konsultasi</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Detail kantor */}
          <dl className="space-y-5 border-t border-white/10 pt-6 text-xs sm:text-sm lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-1">
            <ContactRow icon={<MapPin className="h-4 w-4" />} label="Kantor Notaris & PPAT">
              {contact.officeAddress}
            </ContactRow>
            <ContactRow
              icon={<Clock className="h-4 w-4" />}
              label="Jam Layanan"
              tag={<DummyTag className="text-brass-light" />}
            >
              {OFFICE_HOURS_DUMMY.map((row) => (
                <span key={row.days} className="flex justify-between gap-6 sm:max-w-[16rem]">
                  <span>{row.days}</span>
                  <span className="text-white/60">{row.hours}</span>
                </span>
              ))}
            </ContactRow>
            <ContactRow
              icon={<WhatsAppIcon className="h-4 w-4" />}
              label="WhatsApp Resmi"
              tag={dummyWa ? <DummyTag className="text-brass-light" /> : undefined}
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-brass-light font-semibold">
                {formatWhatsAppDisplay(contact.whatsappNumber)}
              </a>
            </ContactRow>
            <ContactRow icon={<Mail className="h-4 w-4" />} label="Surel">
              <a href={`mailto:${contact.email}`} className="hover:text-brass-light">
                {contact.email}
              </a>
            </ContactRow>
          </dl>
        </div>

        {/* Footer Ringkas & Elegan */}
        <footer className="mt-12 sm:mt-16 border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Monogram className="text-[32px] sm:text-[36px]" />
              <div>
                <p className="font-serif text-sm sm:text-base font-semibold">Dr. Naghfir</p>
                <p className="text-[11px] sm:text-xs text-white/55">Notaris &amp; PPAT · Akademisi · Penggerak Sosial</p>
              </div>
            </div>

            {/* Desktop Navigation Link (Hidden di mobile agar footer ringkas) */}
            <nav aria-label="Navigasi footer" className="hidden lg:flex flex-wrap gap-x-7 gap-y-3 text-xs sm:text-sm text-white/70">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-4 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {fullName}. Seluruh hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-5">
              {socials.map((key) => (
                <a
                  key={key}
                  href={contact.socials[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="text-white/55 transition-colors hover:text-brass-light"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d={SOCIAL_PATHS[key]} />
                  </svg>
                </a>
              ))}
              <Link href="/admin/login" className="inline-flex items-center gap-1 transition-colors hover:text-brass-light">
                <Shield className="h-3 w-3" /> CMS
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  tag,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  tag?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1.25rem_1fr] gap-4">
      <span className="mt-0.5 text-brass-light">{icon}</span>
      <div>
        <dt className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
          {label}
          {tag}
        </dt>
        <dd className="mt-1.5 space-y-1 leading-relaxed text-white/90">{children}</dd>
      </div>
    </div>
  );
}
