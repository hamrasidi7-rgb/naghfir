'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Upload,
  Copy,
  Check,
  FolderOpen,
  AlertCircle,
  CheckCircle2,
  Tag,
  Shield,
  Camera,
  ExternalLink,
  Save,
  Filter,
} from 'lucide-react';
import { MediaAsset } from '@/data/initialData';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [saving, setSaving] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setMediaList(data.mediaAssets || []);
        setLoading(false);
      });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        const newAsset: MediaAsset = {
          id: `med-${Date.now()}`,
          url: data.url,
          title: file.name.replace(/\.[^/.]+$/, ''),
          category: 'Tokoh Utama',
          source: 'Unggahan Admin Lokal',
          photographerOrPublisher: 'Dokumentasi Resmi',
          license: 'Hak Cipta Internal',
          permissionStatus: 'Izin Resmi Terverifikasi',
          altText: `Foto ${file.name}`,
          assignedTo: ['Media Library'],
        };
        const updated = [newAsset, ...mediaList];
        setMediaList(updated);
        await syncMediaAssets(updated, `Mengunggah media baru: ${file.name}`);
        setFeedback({ type: 'success', message: 'Foto berhasil diunggah dan ditambahkan ke pustaka media.' });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Gagal mengunggah berkas.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Gagal menghubungi server pengunggahan.' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSaveAssetMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;
    setSaving(true);
    setFeedback(null);

    const updated = mediaList.map((m) => (m.id === selectedAsset.id ? selectedAsset : m));
    setMediaList(updated);
    await syncMediaAssets(updated, `Memperbarui metadata foto: ${selectedAsset.title}`);
    setSaving(false);
    setSelectedAsset(null);
    setFeedback({ type: 'success', message: 'Metadata dan status lisensi foto berhasil disimpan.' });
  };

  const handleAssignToHero = async (asset: MediaAsset) => {
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'profile',
          data: { heroImage: asset.url, heroImageCredit: asset.photographerOrPublisher },
          action: 'Ganti Foto Hero',
          detail: `Mengganti foto hero utama menjadi ${asset.title}`,
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: `Foto "${asset.title}" berhasil ditugaskan sebagai Foto Hero Utama!` });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Gagal menugaskan foto ke Hero.' });
    }
  };

  const syncMediaAssets = async (assets: MediaAsset[], detail: string) => {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module: 'mediaAssets',
        data: assets,
        action: 'Kelola Pustaka Media',
        detail,
      }),
    });
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  if (loading) return <div className="p-8 text-center text-sm">Memuat pustaka media...</div>;

  const categories = ['Semua', 'Tokoh Utama', 'Pesantren', 'Akademik', 'Hukum & Kenotariatan', 'Organisasi & Wakaf', 'Lanskap & Budaya'];

  const filteredMedia = filterCategory === 'Semua' ? mediaList : mediaList.filter((m) => m.category === filterCategory);

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-navy/10 gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy flex items-center gap-2">
            <Camera className="w-6 h-6 text-burgundy" />
            <span>13. Pustaka Media, Hak Cipta & Penugasan Visual</span>
          </h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Kelola foto tokoh, foto kontekstual, kredit fotografer, status izin penggunaan, dan penugasan ke section website
          </p>
        </div>

        {/* Upload Trigger */}
        <label className="shrink-0 cursor-pointer">
          <span className="px-5 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Mengunggah...' : '+ Unggah Foto Baru'}</span>
          </span>
          <input
            type="file"
            accept="image/*,.pdf"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
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

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterCategory === cat
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-navy hover:bg-ivory border border-navy/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-2xl border border-navy/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
          >
            {/* Image Preview */}
            <div className="relative h-48 w-full bg-navy/10 overflow-hidden">
              <Image
                src={asset.url}
                alt={asset.altText || asset.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy/90 text-white shadow-sm">
                {asset.category}
              </span>
              <span
                className={`absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  asset.permissionStatus.includes('Resmi') || asset.permissionStatus.includes('Terbuka')
                    ? 'bg-emerald-600/90 text-white'
                    : 'bg-amber-600/90 text-white'
                }`}
              >
                {asset.permissionStatus}
              </span>
            </div>

            {/* Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-navy text-sm mb-1 leading-snug">
                  {asset.title}
                </h3>
                <p className="text-[11px] text-charcoal/70 space-y-0.5">
                  <span className="block"><strong>Kredit:</strong> {asset.photographerOrPublisher}</span>
                  <span className="block"><strong>Sumber:</strong> {asset.source}</span>
                  <span className="block text-charcoal/50"><strong>Lisensi:</strong> {asset.license}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-navy/10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAssignToHero(asset)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-burgundy hover:bg-burgundy-700 text-white text-[11px] font-bold transition-colors text-center"
                  >
                    Tugaskan ke Hero
                  </button>
                  <button
                    onClick={() => setSelectedAsset({ ...asset })}
                    className="py-1.5 px-3 rounded-lg bg-ivory hover:bg-navy hover:text-white text-[11px] font-bold text-navy transition-colors border border-navy/10"
                  >
                    Edit Metadata
                  </button>
                </div>

                <button
                  onClick={() => copyToClipboard(asset.url)}
                  className="w-full py-1 px-2 rounded-lg text-[10px] text-charcoal/60 hover:text-navy hover:bg-ivory flex items-center justify-center gap-1 font-mono transition-colors"
                >
                  {copiedUrl === asset.url ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>URL Path Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="truncate">{asset.url}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Metadata Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-navy/15 my-8">
            <h2 className="text-lg font-bold text-navy mb-4">
              Edit Metadata & Hak Cipta Foto
            </h2>

            <form onSubmit={handleSaveAssetMetadata} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Judul / Keterangan Foto</label>
                <input
                  type="text"
                  required
                  value={selectedAsset.title}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Kategori</label>
                  <select
                    value={selectedAsset.category}
                    onChange={(e) => setSelectedAsset({ ...selectedAsset, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                  >
                    {categories.filter((c) => c !== 'Semua').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1">Status Izin Penggunaan</label>
                  <select
                    value={selectedAsset.permissionStatus}
                    onChange={(e) => setSelectedAsset({ ...selectedAsset, permissionStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs font-semibold"
                  >
                    <option value="Izin Resmi Terverifikasi">Izin Resmi Terverifikasi</option>
                    <option value="Kandidat Foto Terverifikasi Pers">Kandidat Foto Terverifikasi Pers</option>
                    <option value="Lisensi Terbuka (Unsplash/Commons)">Lisensi Terbuka (Unsplash/Commons)</option>
                    <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Fotografer / Penerbit Asli</label>
                <input
                  type="text"
                  required
                  value={selectedAsset.photographerOrPublisher}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, photographerOrPublisher: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Sumber Media / Platform</label>
                <input
                  type="text"
                  required
                  value={selectedAsset.source}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, source: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Jenis Lisensi</label>
                <input
                  type="text"
                  required
                  value={selectedAsset.license}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, license: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1">Deskripsi Alt Text</label>
                <input
                  type="text"
                  value={selectedAsset.altText}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, altText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-navy/15 text-xs"
                />
              </div>

              <div className="pt-4 border-t border-navy/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="px-4 py-2 rounded-xl border border-navy/15 text-xs font-bold uppercase text-charcoal hover:bg-ivory"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Metadata'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
