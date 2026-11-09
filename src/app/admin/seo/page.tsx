'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Globe } from 'lucide-react';
import { SeoSettings } from '@/data/initialData';

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setSeo(data.seo);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seo) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'seo',
          data: seo,
          action: 'Pembaruan Metadata SEO',
          detail: 'Memperbarui meta deskripsi, judul situs, dan kata kunci penelusuran Google',
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Pengaturan SEO berhasil diperbarui.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal memperbarui pengaturan SEO.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !seo) return <div className="p-8 text-center text-sm">Memuat pengaturan SEO...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">14. Pengaturan Mesin Pencari (SEO) & Metadata</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Konfigurasi judul situs, meta deskripsi, kata kunci penelusuran, Open Graph, dan Canonical URL
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Google Search Result Preview Simulator */}
      <div className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50 flex items-center gap-1.5 mb-2">
          <Globe className="w-4 h-4 text-burgundy" />
          Pratinjau Hasil Pencarian Google
        </span>
        <div className="border border-navy/10 p-4 rounded-xl bg-[#FAF7F2]/60 font-sans max-w-2xl">
          <span className="text-xs text-emerald-700 block mb-0.5">https://naghfir.id</span>
          <h3 className="text-base text-blue-800 font-semibold hover:underline cursor-pointer leading-snug">
            {seo.siteTitle}
          </h3>
          <p className="text-xs text-charcoal/80 leading-relaxed mt-1">
            {seo.metaDescription}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-navy/10 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase text-navy mb-1.5">
            Judul Situs Utama (Site Title) *
          </label>
          <input
            type="text"
            required
            value={seo.siteTitle}
            onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-navy mb-1.5">
            Meta Deskripsi Global (Maksimal ~160 Karakter Disarankan) *
          </label>
          <textarea
            rows={3}
            required
            value={seo.metaDescription}
            onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm"
          />
          <span className="text-[11px] text-charcoal/50 block mt-1">
            Panjang karakter saat ini: {seo.metaDescription.length} karakter
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-navy mb-1.5">
            Kata Kunci Penelusuran (Keywords - Dipisahkan dengan koma)
          </label>
          <input
            type="text"
            value={seo.keywords}
            onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase text-navy mb-1.5">
              Canonical URL
            </label>
            <input
              type="text"
              value={seo.canonicalUrl}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy mb-1.5">
              OpenGraph Preview Image
            </label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm font-mono text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-navy/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Konfigurasi SEO'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
