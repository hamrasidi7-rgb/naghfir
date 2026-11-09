'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { GalleryItem } from '@/data/initialData';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.gallery || []);
        setLoading(false);
      });
  }, []);

  const handleAddItem = () => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: 'Judul Foto Dokumentasi',
      caption: 'Keterangan dokumentasi resmi',
      category: 'Dokumentasi',
      image: '/images/naghfir.webp',
      date: '2026',
    };
    setItems([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    if (confirm('Hapus foto dari galeri?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleChange = (index: number, field: keyof GalleryItem, val: any) => {
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
          module: 'gallery',
          data: items,
          action: 'Pembaruan Galeri Foto',
          detail: `Menyimpan ${items.length} foto dokumentasi resmi`,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Galeri foto berhasil disimpan.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat galeri foto...</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">9. Kelola Galeri Foto</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Koleksi arsip fotografi dokumenter resmi Dr. Naghfir
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddItem}
            className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-900 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Foto</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Galeri'}</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy">
                Foto #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-ivory border border-navy/10">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Path / URL Gambar</label>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) => handleChange(index, 'image', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Judul Foto</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Keterangan / Caption</label>
                <input
                  type="text"
                  value={item.caption}
                  onChange={(e) => handleChange(index, 'caption', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
