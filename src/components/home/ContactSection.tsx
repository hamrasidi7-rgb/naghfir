'use client';

import React, { useState } from 'react';
import { ContactSettings } from '@/data/initialData';
import { Mail, MapPin, Send, CheckCircle2, ShieldCheck, MessageSquare } from 'lucide-react';

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
    <section id="kontak" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <span>Komunikasi & Kolaborasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-4">
            Terhubung dan Berdiskusi
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            Membuka pintu dialog untuk undangan diskusi keilmuan, kajian regulasi syariah, advokasi kemasyarakatan, serta silaturahmi intelektual.
          </p>
        </div>

        {/* 2-Column Layout: Info Left & Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-white border border-navy/10 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-navy">
                Saluran Kontak Resmi
              </h3>
              
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ivory text-burgundy flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-navy block">Surel Korespondensi</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-burgundy hover:underline text-sm font-medium"
                    >
                      {contact.email}
                    </a>
                    <p className="text-xs text-charcoal/60 mt-0.5">
                      Untuk undangan seminar, konsultasi akademik, dan kegiatan sosial.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ivory text-burgundy flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-navy block">Wilayah Pengabdian</span>
                    <p className="text-charcoal font-medium">{contact.location}</p>
                    <p className="text-xs text-charcoal/60 mt-0.5">
                      {contact.addressNote}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ivory text-burgundy flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-navy block">Prosedur Pelayanan Hukum</span>
                    <p className="text-xs text-charcoal/70 leading-relaxed mt-0.5">
                      {contact.phoneNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Factual disclaimer */}
            <div className="p-6 rounded-2xl bg-navy text-white text-xs leading-relaxed space-y-2">
              <span className="font-bold text-burgundy-200 block text-sm">Prinsip Komunikasi:</span>
              <p className="text-ivory/80">
                Semua surat atau pesan yang masuk melalui portal ini akan ditinjau secara berkala untuk keperluan akademik, pengabdian masyarakat di Sumenep, dan kemaslahatan umat.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-navy/10 shadow-sm">
              <h3 className="text-2xl font-bold text-navy mb-2">
                Kirim Pesan atau Undangan Diskusi
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70 mb-6">
                Silakan lengkapi formulir di bawah ini dengan jelas. Pesan Anda akan langsung terdata dalam sistem.
              </p>

              {success ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm">Pesan Berhasil Terkirim!</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Terima kasih telah menghubungi Dr. Naghfir. Pesan Anda telah tersimpan dan akan ditindaklanjuti.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs text-emerald-700 underline font-semibold mt-2 block"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Ahmad Baihaki"
                        className="w-full px-4 py-3 rounded-xl border border-navy/15 focus:outline-none focus:ring-2 focus:ring-burgundy/40 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-navy/15 focus:outline-none focus:ring-2 focus:ring-burgundy/40 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                      Perihal / Subjek Diskusi *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Contoh: Undangan Seminar Fiqh Muamalah / Konsultasi Wakaf"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 focus:outline-none focus:ring-2 focus:ring-burgundy/40 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                      Isi Pesan *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pokok bahasan atau pesan yang ingin disampaikan..."
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 focus:outline-none focus:ring-2 focus:ring-burgundy/40 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-burgundy hover:bg-burgundy-700 text-white font-medium text-sm transition-all shadow-md disabled:opacity-50"
                  >
                    <span>{submitting ? 'Mengirim Pesan...' : 'Kirim Pesan'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
