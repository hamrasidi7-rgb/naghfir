'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { ActivityItem } from '@/data/initialData';

const ACTIVITY_CATEGORIES = ['Akademik', 'Profesi', 'Organisasi', 'Diskusi Publik', 'Sosial'] as const;

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ActivityItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setActivities(data.activities || []);
        setLoading(false);
      });
  }, []);

  const handleCreateNew = () => {
    const newItem: ActivityItem = {
      id: `act-${Date.now()}`,
      title: '',
      category: 'Akademik',
      date: new Date().toISOString().substring(0, 10),
      location: 'Kabupaten Sumenep, Madura',
      description: '',
      order: activities.length + 1,
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleEdit = (item: ActivityItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus aktivitas ini?')) return;
    const updated = activities.filter((a) => a.id !== id);
    setActivities(updated);
    await syncToDatabase(updated, 'Menghapus catatan aktivitas');
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setFeedback(null);

    let updated: ActivityItem[];
    if (isNew) {
      updated = [editingItem, ...activities];
    } else {
      updated = activities.map((a) => (a.id === editingItem.id ? editingItem : a));
    }

    setActivities(updated);
    await syncToDatabase(
      updated,
      isNew ? `Menambah aktivitas: ${editingItem.title}` : `Memperbarui aktivitas: ${editingItem.title}`
    );
    setSaving(false);
    setEditingItem(null);
  };

  const syncToDatabase = async (newList: ActivityItem[], detail: string) => {
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'activities',
          data: newList,
          action: 'Kelola Catatan Aktivitas',
          detail,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Aktivitas berhasil disimpan ke sistem.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal memperbarui aktivitas.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Kesalahan koneksi ke server.' });
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat aktivitas...</div>;

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">8. Catatan Aktivitas</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Dokumentasikan agenda akademik, pelayanan kenotariatan, pertemuan LWPNU, dan forum diskusi
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Aktivitas</span>
        </button>
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

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-navy/15 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-navy/10 mb-6">
              <h2 className="text-lg font-bold text-navy">
                {isNew ? 'Tambah Agenda Aktivitas' : 'Edit Catatan Aktivitas'}
              </h2>
              <button onClick={() => setEditingItem(null)} className="p-1 rounded-lg text-charcoal/50 hover:bg-ivory">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Nama Kegiatan *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Contoh: Rapat Koordinasi Inventarisasi Tanah Wakaf LWPNU"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Kategori Aktivitas</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                  >
                    {ACTIVITY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Tanggal Pelaksanaan *</label>
                  <input
                    type="date"
                    required
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Lokasi Kegiatan *</label>
                <input
                  type="text"
                  required
                  value={editingItem.location}
                  onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                  placeholder="Contoh: Kantor PCNU Sumenep / Pasongsongan"
                  className="w-full px-4 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Uraian Ringkasan *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Tuliskan pokok kegiatan, pembahasan materi, dan peran nyata..."
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div className="pt-4 border-t border-navy/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-navy/15 text-xs font-bold uppercase text-charcoal"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Aktivitas'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase text-burgundy text-[11px] px-2.5 py-0.5 rounded-full bg-burgundy/10">
                  {item.category}
                </span>
                <span className="text-charcoal/50">{item.date}</span>
              </div>
              <h3 className="text-base font-bold text-navy mb-1.5">{item.title}</h3>
              <p className="text-xs text-charcoal/60 mb-3">{item.location}</p>
              <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-3">{item.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="p-1.5 rounded-lg text-navy hover:bg-ivory"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
