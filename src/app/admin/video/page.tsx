'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, CheckCircle2, AlertCircle, Video } from 'lucide-react';
import { VideoItem } from '@/data/initialData';

export default function AdminVideoPage() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.videos || []);
        setLoading(false);
      });
  }, []);

  const handleAddItem = () => {
    const newItem: VideoItem = {
      id: `vid-${Date.now()}`,
      title: 'Judul Video / Diskusi',
      description: 'Ringkasan isi video rekaman forum',
      url: 'https://youtube.com',
      date: '2026',
    };
    setItems([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    if (confirm('Hapus video ini?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleChange = (index: number, field: keyof VideoItem, val: any) => {
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
          module: 'videos',
          data: items,
          action: 'Pembaruan Video',
          detail: `Menyimpan ${items.length} tautan video dokumentasi`,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Tautan video berhasil disimpan.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat data video...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">10. Kelola Video & Diskusi Audio-Visual</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Daftar tautan rekaman seminar, pemaparan makalah hukum, dan refleksi santri
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddItem}
            className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-900 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Video</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Video'}</span>
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
                <Video className="w-4 h-4" />
                Video #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Judul Video</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Tautan / URL Video</label>
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => handleChange(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-mono"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">Deskripsi Singkat</label>
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
