'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { EducationItem } from '@/data/initialData';

export default function AdminEducationPage() {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.education || []);
        setLoading(false);
      });
  }, []);

  const handleAddItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: 'Nama Lembaga / Kampus',
      degree: 'Jenjang / Gelar',
      field: 'Konsentrasi Keilmuan',
      period: 'Periode Kelulusan',
      location: 'Kota / Lokasi',
      description: 'Uraian pencapaian akademik',
      order: items.length + 1,
    };
    setItems([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    if (confirm('Yakin ingin menghapus riwayat pendidikan ini?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleChange = (index: number, field: keyof EducationItem, val: any) => {
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
          module: 'education',
          data: items,
          action: 'Pembaruan Riwayat Pendidikan',
          detail: `Menyimpan ${items.length} riwayat pendidikan dan gelar`,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Riwayat pendidikan berhasil diperbarui.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat data pendidikan...</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">3. Kelola Riwayat Pendidikan</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Daftar jenjang pesantren, kesarjanaan, magister kenotariatan, hingga pengukuhan doktor
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddItem}
            className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-900 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Riwayat</span>
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
                Tingkat #{index + 1} · {item.degree}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Gelar / Tingkat</label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Institusi / Kampus</label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => handleChange(index, 'institution', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Bidang Studi</label>
                <input
                  type="text"
                  value={item.field}
                  onChange={(e) => handleChange(index, 'field', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Periode Kelulusan</label>
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => handleChange(index, 'period', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy mb-1">Lokasi Kampus</label>
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-navy mb-1">Uraian & Catatan</label>
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
