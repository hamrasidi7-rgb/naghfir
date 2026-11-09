'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, CheckCircle2, AlertCircle, Newspaper, ExternalLink } from 'lucide-react';
import { PublicationItem } from '@/data/initialData';

export default function AdminPublicationsPage() {
  const [items, setItems] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.publications || []);
        setLoading(false);
      });
  }, []);

  const handleAddItem = () => {
    const newItem: PublicationItem = {
      id: `pub-${Date.now()}`,
      title: 'Judul Publikasi / Liputan Media',
      type: 'Media Coverage',
      source: 'Nama Media / Institusi',
      author: 'Nama Penulis',
      date: '2026',
      url: 'https://',
      excerpt: 'Kutipan inti atau ringkasan isi tulisan',
      isExternalVerified: true,
      notes: 'Catatan verifikasi sumber',
    };
    setItems([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    if (confirm('Hapus publikasi ini?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleChange = (index: number, field: keyof PublicationItem, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    setItems(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'publications',
          data: items,
          action: 'Pembaruan Publikasi Media',
          detail: `Menyimpan ${items.length} arsip publikasi & media`,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Publikasi media berhasil diperbarui.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat publikasi media...</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">11. Kelola Publikasi Media & Karya Ilmiah</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Daftar liputan pers (Mata Madura News), disertasi doktoral, jurnal ilmiah, dan modul
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddItem}
            className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-900 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Publikasi</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Semua'}</span>
          </button>
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

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy flex items-center gap-1.5">
                <Newspaper className="w-4 h-4" />
                Publikasi #{index + 1} · {item.source}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Judul Karya / Berita</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Jenis Publikasi</label>
                <select
                  value={item.type}
                  onChange={(e) => handleChange(index, 'type', e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                >
                  <option value="Media Coverage">Media Coverage / Pers</option>
                  <option value="Artikel Opini">Artikel Opini</option>
                  <option value="Jurnal Ilmiah">Jurnal Ilmiah / Disertasi</option>
                  <option value="Buku / Modul">Buku / Modul</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Media / Penerbit</label>
                <input
                  type="text"
                  value={item.source}
                  onChange={(e) => handleChange(index, 'source', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Nama Penulis</label>
                <input
                  type="text"
                  value={item.author}
                  onChange={(e) => handleChange(index, 'author', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Tahun / Tanggal</label>
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) => handleChange(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">Tautan URL</label>
              <input
                type="text"
                value={item.url}
                onChange={(e) => handleChange(index, 'url', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-mono"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">Kutipan / Excerpt</label>
              <textarea
                rows={2}
                value={item.excerpt}
                onChange={(e) => handleChange(index, 'excerpt', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">Catatan Sumber / Atribusi Hak Cipta</label>
              <input
                type="text"
                value={item.notes || ''}
                onChange={(e) => handleChange(index, 'notes', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
