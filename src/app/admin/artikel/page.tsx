'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Save, X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { ArticleItem } from '@/data/initialData';

const CATEGORIES = [
  'Hukum dan Masyarakat',
  'Hukum Agraria dan Pertanahan',
  'Ekonomi Syariah',
  'Pesantren dan Pendidikan',
  'Wakaf dan Aset Umat',
  'Kepemudaan',
  'Pembangunan Sumenep',
];

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      });
  }, []);

  const handleCreateNew = () => {
    const newArt: ArticleItem = {
      id: `art-${Date.now()}`,
      slug: `tulisan-${Date.now().toString().slice(-4)}`,
      title: '',
      category: 'Hukum dan Masyarakat',
      summary: '',
      content: '',
      date: new Date().toISOString().substring(0, 10),
      readTime: '5 menit',
      author: 'Dr. Naghfir, S.HI., S.H., M.Kn.',
      status: 'published',
      featured: false,
      seoTitle: '',
      seoDescription: '',
    };
    setEditingArticle(newArt);
    setIsNew(true);
  };

  const handleEdit = (article: ArticleItem) => {
    setEditingArticle({ ...article });
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    await syncToDatabase(updated, 'Menghapus artikel pemikiran');
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    setSaving(true);
    setFeedback(null);

    let updated: ArticleItem[];
    if (isNew) {
      updated = [editingArticle, ...articles];
    } else {
      updated = articles.map((a) => (a.id === editingArticle.id ? editingArticle : a));
    }

    setArticles(updated);
    await syncToDatabase(
      updated,
      isNew ? `Menulis artikel baru: ${editingArticle.title}` : `Memperbarui artikel: ${editingArticle.title}`
    );
    setSaving(false);
    setEditingArticle(null);
  };

  const syncToDatabase = async (newArticlesList: ArticleItem[], detail: string) => {
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'articles',
          data: newArticlesList,
          action: 'Kelola Artikel Pemikiran',
          detail,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Perubahan artikel berhasil disimpan ke sistem.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal memperbarui artikel.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Kesalahan koneksi ke server.' });
    }
  };

  // Helper to generate slug from title
  const handleTitleChange = (val: string) => {
    if (!editingArticle) return;
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setEditingArticle({
      ...editingArticle,
      title: val,
      slug: isNew ? slug : editingArticle.slug,
      seoTitle: isNew ? `${val} | Dr. Naghfir` : editingArticle.seoTitle,
    });
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat artikel...</div>;

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">7. Kelola Pemikiran & Artikel</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Publikasikan gagasan hukum agraria, telaah ekonomi syariah, dan opini kemasyarakatan
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
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

      {/* Article Editor Modal / Sheet */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-navy/15 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-navy/10 mb-6">
              <h2 className="text-lg font-bold text-navy">
                {isNew ? 'Tulis Gagasan Baru' : 'Edit Artikel Pemikiran'}
              </h2>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-1 rounded-lg text-charcoal/50 hover:bg-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Contoh: Menyelamatkan Tanah Umat: Urgensi Sertifikasi Wakaf"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm font-semibold focus:ring-2 focus:ring-burgundy/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Slug URL *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Kategori</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Status Publikasi</label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-semibold"
                  >
                    <option value="published">Diterbitkan (Published)</option>
                    <option value="draft">Draf (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Tanggal Terbit</label>
                  <input
                    type="date"
                    required
                    value={editingArticle.date}
                    onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Estimasi Baca</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-navy">
                    <input
                      type="checkbox"
                      checked={editingArticle.featured}
                      onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                      className="rounded border-navy/20 text-burgundy focus:ring-burgundy w-4 h-4"
                    />
                    <span>Tampilkan sebagai Sorotan (Featured)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Ringkasan Editorial *</label>
                <textarea
                  rows={2}
                  required
                  value={editingArticle.summary}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  placeholder="Ringkasan singkat isi tulisan untuk tampilan kartu..."
                  className="w-full px-4 py-2 rounded-xl border border-navy/15 text-xs focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">
                  Konten Lengkap Artikel (Format Teks & Markdown) *
                </label>
                <textarea
                  rows={10}
                  required
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="Gunakan baris ganda untuk paragraf baru. Subheading gunakan ### Judul..."
                  className="w-full px-4 py-3 rounded-xl border border-navy/15 text-sm font-sans focus:ring-2 focus:ring-burgundy/40"
                />
              </div>

              <div className="p-4 rounded-xl bg-ivory/60 border border-navy/10 space-y-3">
                <span className="text-xs font-bold uppercase text-navy block">Optimasi Mesin Pencari (SEO)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal/70 mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={editingArticle.seoTitle || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, seoTitle: e.target.value })}
                      placeholder="Judul spesifik untuk Google Search"
                      className="w-full px-3 py-1.5 rounded-lg border border-navy/15 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal/70 mb-1">SEO Description</label>
                    <input
                      type="text"
                      value={editingArticle.seoDescription || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, seoDescription: e.target.value })}
                      placeholder="Meta deskripsi untuk Google"
                      className="w-full px-3 py-1.5 rounded-lg border border-navy/15 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-5 py-2.5 rounded-xl border border-navy/15 text-xs font-bold uppercase text-charcoal hover:bg-ivory"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan & Publikasikan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-navy/10 uppercase tracking-wider text-charcoal/60 font-bold">
              <tr>
                <th className="py-3.5 px-4">Judul & Kategori</th>
                <th className="py-3.5 px-4">Tanggal</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Sorotan</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-ivory/40 transition-colors">
                  <td className="py-4 px-4 max-w-md">
                    <span className="font-bold text-navy block text-sm mb-0.5 line-clamp-1">{art.title}</span>
                    <span className="text-[11px] font-semibold text-burgundy">{art.category}</span>
                  </td>
                  <td className="py-4 px-4 text-charcoal/70 whitespace-nowrap">{art.date}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        art.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {art.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {art.featured ? (
                      <span className="px-2 py-0.5 rounded bg-burgundy/10 text-burgundy font-bold text-[10px]">
                        ★ Utama
                      </span>
                    ) : (
                      <span className="text-charcoal/30">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(art)}
                        className="p-1.5 rounded-lg text-navy hover:bg-ivory"
                        title="Edit Tulisan"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        title="Hapus Tulisan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
