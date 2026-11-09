'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'profile',
          data: profile,
          action: 'Pembaruan Profil',
          detail: 'Memperbarui informasi profil, gelar, headline, dan biografi tokoh',
        }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', message: 'Profil Dr. Naghfir berhasil diperbarui.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return <div className="p-8 text-center text-sm">Memuat editor profil...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">2. Pengaturan Profil Tokoh</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Kelola nama lengkap, gelar akademik & profesi, headline, asal daerah, serta narasi biografi
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

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-navy/10 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Nama Lengkap & Gelar *
            </label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Nama Panggilan / Singkat *
            </label>
            <input
              type="text"
              required
              value={profile.shortName}
              onChange={(e) => setProfile({ ...profile, shortName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Urutan Gelar Resmi *
            </label>
            <input
              type="text"
              required
              value={profile.degrees}
              onChange={(e) => setProfile({ ...profile, degrees: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Asal Daerah (Kelahiran) *
            </label>
            <input
              type="text"
              required
              value={profile.origin}
              onChange={(e) => setProfile({ ...profile, origin: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Tagline Identitas *
          </label>
          <input
            type="text"
            required
            value={profile.tagline}
            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Headline Utama Website *
          </label>
          <input
            type="text"
            required
            value={profile.headline}
            onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Sub-Deskripsi Narasi Hero *
          </label>
          <textarea
            rows={3}
            required
            value={profile.subheadline}
            onChange={(e) => setProfile({ ...profile, subheadline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Path Berkas Foto Hero
          </label>
          <input
            type="text"
            value={profile.heroImage}
            onChange={(e) => setProfile({ ...profile, heroImage: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40 font-mono text-xs"
          />
          <p className="text-[11px] text-charcoal/50 mt-1">
            Gunakan berkas di direktori publik (contoh: <code>/images/naghfir.webp</code>) atau unggah dari tab Media Library.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Pengantar Biografi & Nilai *
          </label>
          <textarea
            rows={3}
            required
            value={profile.aboutIntro}
            onChange={(e) => setProfile({ ...profile, aboutIntro: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
          />
        </div>

        <div className="pt-4 border-t border-navy/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
