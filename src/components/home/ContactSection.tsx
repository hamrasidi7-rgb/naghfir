'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ContactSettings } from '@/data/initialData';
import {
  Send,
  CheckCircle2,
  MapPin,
  Mail,
  MessageCircle,
  FileText,
  Calendar,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/config/whatsapp';

interface ContactSectionProps {
  contact: ContactSettings;
  includeFooter?: boolean;
}

export default function ContactSection({
  contact,
  includeFooter = true,
}: ContactSectionProps) {
  const [showOfficeForm, setShowOfficeForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappHref = getWhatsAppUrl('kontak', contact.whatsappNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Terjadi kesalahan saat mengirim pesan.');
      }
    } catch {
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="bg-[#FAF7F0] pt-4 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Navy "Butuh Konsultasi Notaris & PPAT?" Sesuai Mockup */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#111E30] via-[#17283F] to-[#111E30] text-white px-6 py-8 sm:px-10 sm:py-9 shadow-xl border border-[#2A3B54]">
          {/* Dekorasi Garis Gelombang Emas Halus di Kanan */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-full w-72 text-[#C5A059]/20"
            viewBox="0 0 300 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M120 200C160 130 220 110 300 40"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M150 200C190 140 240 120 300 65"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M180 200C215 155 255 135 300 90"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Kolom Kiri (2 Kolom): Ikon Timbangan Keadilan Emas */}
            <div className="lg:col-span-2 flex justify-center lg:border-r lg:border-white/15 lg:pr-6">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 text-[#D5B05C]"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F1D99A" />
                    <stop offset="50%" stopColor="#C89D46" />
                    <stop offset="100%" stopColor="#8F6820" />
                  </linearGradient>
                </defs>
                {/* Tiang & Dasar Timbangan */}
                <path
                  d="M48 16V76M32 76H64M26 82H70"
                  stroke="url(#goldGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Puncak Timbangan */}
                <circle cx="48" cy="14" r="4" fill="url(#goldGrad)" />
                {/* Lengan Horizontal */}
                <path
                  d="M18 28C30 24 38 24 48 24C58 24 66 24 78 28"
                  stroke="url(#goldGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Rantai Kiri */}
                <path
                  d="M20 28L12 52M20 28L28 52"
                  stroke="url(#goldGrad)"
                  strokeWidth="1.8"
                />
                {/* Piringan Kiri */}
                <path
                  d="M10 52H30C29 58 25 61 20 61C15 61 11 58 10 52Z"
                  fill="url(#goldGrad)"
                />
                {/* Rantai Kanan */}
                <path
                  d="M76 28L68 52M76 28L84 52"
                  stroke="url(#goldGrad)"
                  strokeWidth="1.8"
                />
                {/* Piringan Kanan */}
                <path
                  d="M66 52H86C85 58 81 61 76 61C71 61 67 58 66 52Z"
                  fill="url(#goldGrad)"
                />
              </svg>
            </div>

            {/* Kolom Tengah (5 Kolom): Judul & Subjudul */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-tight">
                Butuh Konsultasi
                <br className="hidden sm:inline" /> Notaris &amp; PPAT?
              </h2>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-md mx-auto lg:mx-0">
                Hubungi kami melalui WhatsApp untuk informasi layanan, persyaratan, dan penjadwalan.
              </p>
            </div>

            {/* Kolom Kanan (5 Kolom): Tombol Emas WhatsApp + 3 Indikator Layanan */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-w-[270px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-b from-[#E7CB86] via-[#CFA550] to-[#B48631] hover:from-[#EED596] hover:to-[#C0923B] text-[#142134] font-bold text-sm sm:text-base shadow-lg border border-[#F3DFA8]/50 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-[#142134] shrink-0" />
                <span>Hubungi via WhatsApp</span>
              </a>

              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-5 gap-y-2 text-[11px] sm:text-xs text-white/90">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#E4C77F]" />
                  <span>Konsultasi Awal</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E4C77F]" />
                  <span>Jadwal Pelayanan</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E4C77F]" />
                  <span>Aman &amp; Terpercaya</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tautan Lipat Informasi Alamat Kantor & Form Pesan Resmi */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/70">
            <span className="flex items-center gap-1.5 text-center sm:text-left">
              <MapPin className="w-3.5 h-3.5 text-[#E4C77F] shrink-0" />
              <span>
                Kantor: {contact.officeAddress || 'Jl. Jokotole – Perum Griya Berkat Regency Gg. III No. 24 (Lingkar Barat), Batuan, Sumenep'}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setShowOfficeForm(!showOfficeForm)}
              className="inline-flex items-center gap-1 text-[#E4C77F] hover:text-white font-semibold shrink-0 transition-colors"
            >
              <span>{showOfficeForm ? 'Tutup Formulir Pesan' : 'Formulir Pesan & Detail Kantor'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  showOfficeForm ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Panel Ekspansi Opsional: Detail Kantor & Formulir Korespondensi */}
        {showOfficeForm && (
          <div className="mt-6 rounded-2xl bg-white border border-[#D8CEBE] p-6 sm:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4 text-xs sm:text-sm text-[#374151]">
              <h3 className="font-serif text-xl font-bold text-[#142134]">
                Kantor Notaris &amp; PPAT Dr. Naghfir
              </h3>
              <p className="leading-relaxed">
                {contact.phoneNote ||
                  'Pelayanan resmi kenotariatan, pengurusan akta tanah (PPAT), advokasi wakaf, dan undangan diskusi akademik terjadwal melalui kantor resmi.'}
              </p>
              <div className="space-y-3 pt-2 border-t border-[#E6DFCE]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8B6526] shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-[#142134] block">Alamat Kantor:</span>
                    <span>{contact.officeAddress}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#8B6526] shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-[#142134] block">Surel Resmi:</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[#8B6526] hover:underline font-semibold"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h4 className="font-serif text-lg font-bold text-[#142134] mb-3">
                Kirim Pesan Resmi / Permohonan Jadwal
              </h4>
              {success ? (
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#C5A059] text-[#142134] space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#8B6526]" />
                    <span>Pesan Berhasil Terkirim</span>
                  </div>
                  <p className="text-xs text-[#374151]">
                    Terima kasih, pesan Anda telah tercatat di sistem korespondensi Kantor Dr. Naghfir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {errorMsg && (
                    <p className="text-xs text-red-700 font-semibold">{errorMsg}</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Nama Lengkap *"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F0] border border-[#D8CEBE] text-xs sm:text-sm focus:outline-none focus:border-[#8B6526]"
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Alamat Email *"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F0] border border-[#D8CEBE] text-xs sm:text-sm focus:outline-none focus:border-[#8B6526]"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Perihal Layanan (Notaris / PPAT / Wakaf / Akademik) *"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F0] border border-[#D8CEBE] text-xs sm:text-sm focus:outline-none focus:border-[#8B6526]"
                  />
                  <textarea
                    required
                    rows={2}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tuliskan pesan atau keperluan Anda..."
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F0] border border-[#D8CEBE] text-xs sm:text-sm focus:outline-none focus:border-[#8B6526]"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#142134] hover:bg-[#1E314D] text-[#E4C77F] font-bold text-xs transition-colors"
                  >
                    <span>{submitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Baris Footer Bawah Sesuai Mockup */}
        {includeFooter && (
          <footer className="pt-7 mt-6 border-t border-[#E5DEC9] flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-[#374151]">
            {/* Kiri: Monogram Emas N + Nama & Gelar Lengkap */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span
                aria-hidden="true"
                className="font-serif italic text-3xl font-bold bg-gradient-to-b from-[#D5B05C] via-[#B88B34] to-[#8F6820] bg-clip-text text-transparent select-none leading-none"
              >
                N
              </span>
              <div>
                <p className="font-serif font-bold text-xs sm:text-sm text-[#142134]">
                  Dr. Naghfir, S.HI., S.H., M.Kn., CPM., CH., C.Ht.
                </p>
                <p className="text-[11px] text-[#4B5563]">
                  Notaris &amp; PPAT | Akademisi | Penggerak Sosial
                </p>
              </div>
            </div>

            {/* Tengah: Menu Navigasi */}
            <nav
              aria-label="Navigasi Footer"
              className="flex flex-wrap items-center justify-center gap-5 font-semibold text-[#142134]"
            >
              <Link href="/#beranda" className="hover:text-[#8B6526] transition-colors">
                Beranda
              </Link>
              <Link href="/#tentang-saya" className="hover:text-[#8B6526] transition-colors">
                Tentang Saya
              </Link>
              <Link href="/#layanan" className="hover:text-[#8B6526] transition-colors">
                Layanan
              </Link>
              <Link href="/#pengabdian" className="hover:text-[#8B6526] transition-colors">
                Pengabdian
              </Link>
              <Link href="/#pemikiran" className="hover:text-[#8B6526] transition-colors">
                Pemikiran
              </Link>
            </nav>

            {/* Kanan: Ikon Sosial Media | Copyright */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-[#142134]">
              <div className="flex items-center gap-2.5">
                {/* YouTube Icon */}
                <a
                  href={contact.socials?.youtube || '#kontak'}
                  target={contact.socials?.youtube ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-[#142134] hover:text-[#8B6526] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* Instagram Icon */}
                <a
                  href={contact.socials?.instagram || '#kontak'}
                  target={contact.socials?.instagram ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[#142134] hover:text-[#8B6526] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Facebook Icon */}
                <a
                  href={contact.socials?.facebook || '#kontak'}
                  target={contact.socials?.facebook ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-[#142134] hover:text-[#8B6526] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>

              <span className="text-[#C5A059]">|</span>

              <span className="text-[#4B5563]">
                © 2025 Dr. Naghfir. All rights reserved.
              </span>
            </div>
          </footer>
        )}
      </div>
    </section>
  );
}
