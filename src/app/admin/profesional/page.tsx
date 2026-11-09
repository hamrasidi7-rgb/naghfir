'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProfessionalItem } from '@/data/initialData';

export default function AdminProfessionalPage() {
  const [items, setItems] = useState<ProfessionalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.professional || []);
        setLoading(false);
      });
  }, []);

  const handleAddItem = () => {
    const newItem: ProfessionalItem = {
      id: `prof-${Date.now()}`,
      title: 'Judul Profesi / Bidang',
      role: 'Peran Utama',
      badge: 'Status / Sertifikasi',
      description: 'Penjelasan integritas dan wewenang hukum',
      services: ['Layanan 1', 'Layanan 2'],
      order: items.length + 1,
    };
    setItems([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    if (confirm('Hapus entitas profesi ini?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleChange = (index: number, field: keyof ProfessionalItem, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    setItems(updated);
  };

  const handleServicesChange = (index: number, text: string) => {
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    handleChange(index, 'services', lines);
  };

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'professional',
          data: items,
          action: 'Pembaruan Pengalaman Profesional',
          detail: `Menyimpan ${items.length} pilar profesi hukum dan kenotariatan`,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Profil profesional berhasil diperbarui.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat data profesional...</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">5. Kelola Pengalaman Profesional</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Atur wewenang Notaris, PPAT, keahlian mediasi, dan konsultasi syariah
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddItem}
            className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-900 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Profesi</span>
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
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy">
                Profesi #{index + 1} · {item.title}
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
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Nama Jabatan / Profesi</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Peran / Spesialisasi</label>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => handleChange(index, 'role', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Badge Status</label>
                <input
                  type="text"
                  value={item.badge}
                  onChange={(e) => handleChange(index, 'badge', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">Deskripsi & Landasan Yuridis</label>
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">
                Ruang Lingkup Praktik (Satu per baris)
              </label>
              <textarea
                rows={3}
                value={item.services.join('\n')}
                onChange={(e) => handleServicesChange(index, e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy font-mono text-[11px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
