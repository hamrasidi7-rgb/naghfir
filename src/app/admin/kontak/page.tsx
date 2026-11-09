'use client';

import React, { useState, useEffect } from 'react';
import { Save, Mail, CheckCircle2, AlertCircle, Trash2, Check, MessageSquare } from 'lucide-react';
import { ContactSettings, MessageItem } from '@/data/initialData';

export default function AdminContactPage() {
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'inbox' | 'settings'>('inbox');

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setContact(data.contact);
        setMessages(data.messages || []);
        setLoading(false);
      });
  }, []);

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'contact',
          data: contact,
          action: 'Pembaruan Saluran Kontak',
          detail: 'Memperbarui informasi surel resmi dan wilayah pengabdian',
        }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Pengaturan kontak berhasil disimpan.' });
      } else {
        setFeedback({ type: 'error', message: 'Gagal memperbarui pengaturan kontak.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleRead = async (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m));
    setMessages(updated);
    await syncMessages(updated, 'Mengubah status baca pesan');
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Hapus pesan ini dari arsip?')) return;
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    await syncMessages(updated, 'Menghapus pesan dari inbox');
  };

  const syncMessages = async (updated: MessageItem[], detail: string) => {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module: 'messages',
        data: updated,
        action: 'Pengelolaan Pesan Masuk',
        detail,
      }),
    });
  };

  if (loading || !contact) return <div className="p-8 text-center text-sm">Memuat data kontak...</div>;

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-2xl font-black text-navy">12. Kontak & Pesan Masuk (Inbox)</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Kelola saluran komunikasi resmi serta kelola pesan dan undangan diskusi yang masuk
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-ivory border border-navy/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'inbox' ? 'bg-navy text-white shadow-sm' : 'text-charcoal hover:text-navy'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Pesan Masuk</span>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-burgundy text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'settings' ? 'bg-navy text-white shadow-sm' : 'text-charcoal hover:text-navy'
            }`}
          >
            Pengaturan Kontak
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

      {/* Tab: Inbox */}
      {activeTab === 'inbox' && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-navy/10 text-charcoal/60">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="font-semibold text-navy">Kotak Masuk Kosong</p>
              <p className="text-xs mt-1">Belum ada pesan dari pengunjung website.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-6 rounded-2xl border transition-all ${
                  msg.isRead
                    ? 'bg-white border-navy/10 shadow-sm'
                    : 'bg-[#FAF5F5] border-burgundy/30 shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy/10 pb-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy text-base">{msg.name}</span>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-burgundy text-white text-[10px] font-bold uppercase tracking-wider">
                          Baru
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-charcoal/60">{msg.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-charcoal/50 font-mono">{msg.date}</span>
                    <button
                      onClick={() => handleToggleRead(msg.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                        msg.isRead
                          ? 'bg-ivory text-charcoal hover:bg-navy hover:text-white'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{msg.isRead ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-navy text-sm mb-2">{msg.subject}</h3>
                <p className="text-xs sm:text-sm text-charcoal/80 whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveContact} className="bg-white p-6 sm:p-8 rounded-2xl border border-navy/10 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Alamat Surel Resmi *
              </label>
              <input
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Wilayah Pengabdian & Kantor *
              </label>
              <input
                type="text"
                required
                value={contact.location}
                onChange={(e) => setContact({ ...contact, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy mb-1.5">
              Catatan Alamat & Izin Operasional
            </label>
            <input
              type="text"
              value={contact.addressNote}
              onChange={(e) => setContact({ ...contact, addressNote: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy mb-1.5">
              Catatan Prosedur Pelayanan Hukum
            </label>
            <textarea
              rows={2}
              value={contact.phoneNote}
              onChange={(e) => setContact({ ...contact, phoneNote: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/15 text-sm"
            />
          </div>

          <div className="pt-4 border-t border-navy/10 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
