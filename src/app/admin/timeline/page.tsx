'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { TimelineItem } from '@/data/initialData';

export default function AdminTimelinePage() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.timeline || []);
        setLoading(false);
      });
  }, []);

  const handleAddItem = () => {
    const newItem: TimelineItem = {
      id: `time-${Date.now()}`,
      year: 'Tahun / Masa',
      title: 'Judul Etape Perjalanan',
      subtitle: 'Keterangan Lokasi / Institusi',
      description: 'Penjelasan faktual mengenai babak perjalanan hidup',
      category: 'Pendidikan',
      order: items.length + 1,
    };
    setItems([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    if (confirm('Hapus babak perjalanan ini?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleChange = (index: number, field: keyof TimelineItem, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    setItems(updated);
  };

  const moveItem = (index: number, dir: 'up' | 'down') => {
    if ((dir === 'up' && index === 0) || (dir === 'down' && index === items.length - 1)) return;
    const target = dir === 'up' ? index - 1 : index + 1;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    // update order
    updated.forEach((it, idx) => {
      it.order = idx + 1;
    });
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
          module: 'timeline',
          data: items,
          action: 'Pembaruan Linimasa Perjalanan',
          detail: `Menyimpan ${items.length} etape perjalanan hidup`,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Linimasa perjalanan berhasil diperbarui.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat data linimasa...</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">4. Kelola Linimasa Perjalanan Hidup</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Susun 10 tahapan hidup dari Desa Campaka, Pesantren Aqidah Usymuni, Notaris 2021, hingga Doktor 2025
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddItem}
            className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-900 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Babak</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Linimasa'}</span>
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
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-xs font-bold text-navy">{item.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-charcoal/50 hover:text-navy disabled:opacity-30"
                  title="Naikkan"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === items.length - 1}
                  className="p-1 text-charcoal/50 hover:text-navy disabled:opacity-30"
                  title="Turunkan"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="p-1 text-red-500 hover:text-red-700 ml-2"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Tahun / Label Waktu</label>
                <input
                  type="text"
                  value={item.year}
                  onChange={(e) => handleChange(index, 'year', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Judul Babak</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Kategori</label>
                <select
                  value={item.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                >
                  <option value="Pesantren">Pesantren</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Profesi">Profesi</option>
                  <option value="Organisasi">Organisasi</option>
                  <option value="Pengabdian">Pengabdian</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">Subjudul / Lokasi</label>
              <input
                type="text"
                value={item.subtitle}
                onChange={(e) => handleChange(index, 'subtitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">Deskripsi Faktual</label>
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
