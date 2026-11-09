'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, FolderOpen, AlertCircle, FileImage } from 'lucide-react';

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    '/images/naghfir.webp',
  ]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setUploadedFiles([data.url, ...uploadedFiles]);
      } else {
        setError(data.error || 'Gagal mengunggah file.');
      }
    } catch (err) {
      setError('Gagal menghubungi server.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">13. Pustaka Media (Media Library)</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Unggah dan kelola foto portrait, arsip dokumentasi, dan aset visual website
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Dropzone */}
      <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-navy/20 text-center hover:border-burgundy/50 transition-colors">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-ivory text-burgundy flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm font-bold text-navy block">Unggah Gambar atau Dokumen</span>
            <span className="text-xs text-charcoal/60">
              Format didukung: WEBP, JPG, PNG, PDF (Maksimal 10MB)
            </span>
          </div>

          <label className="inline-block">
            <span className="px-5 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-all inline-flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span>{uploading ? 'Mengunggah...' : 'Pilih Berkas Komputer'}</span>
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
      </div>

      {/* Media Files Grid */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-navy mb-4">
          Aset Visual Tersimpan ({uploadedFiles.length})
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {uploadedFiles.map((url, idx) => (
            <div key={idx} className="bg-white p-3 rounded-2xl border border-navy/10 shadow-sm space-y-2 group">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-ivory border border-navy/5">
                <Image
                  src={url}
                  alt={`Media ${idx}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-charcoal/70 block truncate" title={url}>
                  {url}
                </span>

                <button
                  onClick={() => copyToClipboard(url)}
                  className="w-full py-1.5 px-2 rounded-lg bg-ivory hover:bg-navy hover:text-white text-[11px] font-semibold text-navy flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedUrl === url ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>URL Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Path URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
