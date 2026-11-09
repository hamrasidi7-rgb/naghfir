'use client';

import React, { useState } from 'react';
import { ContactSettings } from '@/data/initialData';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  contact: ContactSettings;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Kolom Kiri (5 Kolom): Alamat Kantor Batuan & Korespondensi Bersih */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burgundy block mb-2">
                Kantor & Korespondensi
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight mb-4">
                Terhubung dan Berdiskusi
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                Terbuka untuk undangan diskusi akademik, kajian regulasi ekonomi syariah dan pertanahan, advokasi wakaf, serta silaturahmi keilmuan.
              </p>
            </div>

            <div className="pt-6 border-t border-[#252525]/15 space-y-6 text-sm">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal/50 block mb-1">
                  Kantor Resmi Notaris & PPAT
                </span>
                <p className="font-semibold text-navy leading-relaxed">
                  {contact.addressNote}
                </p>
                <p className="text-xs text-charcoal/65 mt-1">
                  Wilayah Kerja: {contact.location}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal/50 block mb-1">
                  Surel Resmi
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-base font-bold text-burgundy hover:text-navy underline underline-offset-4 transition-colors"
                >
                  {contact.email}
                </a>
              </div>

              <div className="pt-4 border-t border-[#252525]/15">
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  *Situs ini dikelola sebagai ruang dokumentasi pemikiran dan pengabdian publik Dr. Naghfir, mematuhi sepenuhnya Kode Etik Notaris & UUJN.
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan (7 Kolom): Formulir Korespondensi Minimalis */}
          <div className="lg:col-span-7 lg:pl-10 lg:border-l border-[#252525]/15">
            <h3 className="text-xl font-serif font-bold text-navy mb-6">
              Kirim Pesan atau Undangan
            </h3>

            {success ? (
              <div className="py-8 border-t border-b border-emerald-600/30 text-emerald-900 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span className="font-bold text-sm">Pesan Berhasil Terkirim</span>
                </div>
                <p className="text-xs leading-relaxed text-charcoal/80">
                  Terima kasih telah menghubungi Dr. Naghfir. Pesan Anda telah tercatat dan akan ditindaklanjuti.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs text-burgundy underline font-bold uppercase tracking-wider pt-2 block"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <p className="text-xs text-red-700 font-medium">{errorMsg}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#252525]/20 focus:border-burgundy focus:outline-none text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@domain.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#252525]/20 focus:border-burgundy focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">
                    Perihal / Subjek *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Undangan Diskusi / Kajian Akademik / Advokasi Wakaf"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#252525]/20 focus:border-burgundy focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">
                    Isi Pesan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pesan Anda secara ringkas dan jelas..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#252525]/20 focus:border-burgundy focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-navy hover:bg-burgundy text-white font-semibold text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
                  >
                    <span>{submitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
