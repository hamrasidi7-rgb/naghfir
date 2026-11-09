'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Mail,
  GraduationCap,
  Briefcase,
  Users,
  Eye,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20 text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-burgundy border-t-transparent rounded-full animate-spin" />
          <span>Memuat ringkasan dashboard...</span>
        </div>
      </div>
    );
  }

  const unreadMessages = data.messages?.filter((m: any) => !m.isRead).length || 0;
  const publishedArticles = data.articles?.filter((a: any) => a.status === 'published').length || 0;
  const totalActivities = data.activities?.length || 0;
  const totalPublications = data.publications?.length || 0;

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome Hero */}
      <div className="bg-white p-8 rounded-2xl border border-navy/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy/10 text-burgundy text-xs font-bold uppercase tracking-wider mb-2">
            <span>Sistem CMS Aktif</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy">
            Selamat Datang di Portal CMS Dr. Naghfir
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
            Kelola data profil, linimasa perjalanan hidup, karya pemikiran, dokumentasi aktivitas kemasyarakatan, serta pesan masuk secara terpusat.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/artikel"
            className="px-4 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-700 text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            + Tulis Pemikiran Baru
          </Link>
          <Link
            href="/admin/kontak"
            className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <span>Pesan Masuk</span>
            {unreadMessages > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadMessages}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50 block mb-1">
              Artikel & Pemikiran
            </span>
            <span className="text-3xl font-black text-navy">{publishedArticles}</span>
            <span className="text-xs text-emerald-600 font-medium block mt-1">Diterbitkan</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ivory text-burgundy flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50 block mb-1">
              Catatan Aktivitas
            </span>
            <span className="text-3xl font-black text-navy">{totalActivities}</span>
            <span className="text-xs text-charcoal/60 font-medium block mt-1">Terdokumentasi</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ivory text-navy flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50 block mb-1">
              Publikasi Media
            </span>
            <span className="text-3xl font-black text-navy">{totalPublications}</span>
            <span className="text-xs text-charcoal/60 font-medium block mt-1">Arsip Terverifikasi</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ivory text-burgundy flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50 block mb-1">
              Pesan Pengunjung
            </span>
            <span className="text-3xl font-black text-navy">{data.messages?.length || 0}</span>
            <span className="text-xs text-burgundy font-medium block mt-1">
              {unreadMessages} Belum Dibaca
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ivory text-navy flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Columns: Recent Messages & Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Messages */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-navy/10 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
            <div>
              <h2 className="text-lg font-bold text-navy">Pesan & Diskusi Terbaru</h2>
              <p className="text-xs text-charcoal/60">Pesan yang dikirimkan oleh audiens melalui formulir</p>
            </div>
            <Link
              href="/admin/kontak"
              className="text-xs font-bold text-burgundy hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {(!data.messages || data.messages.length === 0) ? (
              <p className="text-xs text-charcoal/60 text-center py-6">Belum ada pesan masuk.</p>
            ) : (
              data.messages.slice(0, 4).map((msg: any) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border text-xs space-y-1 transition-all ${
                    msg.isRead ? 'bg-[#FAF7F2] border-navy/5' : 'bg-burgundy/5 border-burgundy/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy text-sm">{msg.name}</span>
                    <span className="text-charcoal/50">{msg.date}</span>
                  </div>
                  <p className="font-semibold text-burgundy">{msg.subject}</p>
                  <p className="text-charcoal/70 line-clamp-2">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Audit Logs */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-navy/10 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
            <div>
              <h2 className="text-lg font-bold text-navy">Aktivitas Audit Log</h2>
              <p className="text-xs text-charcoal/60">Riwayat perubahan & operasi sistem</p>
            </div>
            <Link
              href="/admin/audit"
              className="text-xs font-bold text-burgundy hover:underline"
            >
              Log Lengkap
            </Link>
          </div>

          <div className="space-y-3">
            {(!data.auditLogs || data.auditLogs.length === 0) ? (
              <p className="text-xs text-charcoal/60 text-center py-6">Belum ada riwayat aktivitas.</p>
            ) : (
              data.auditLogs.slice(0, 5).map((log: any) => (
                <div key={log.id} className="p-3 rounded-lg bg-ivory/50 border border-navy/5 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-navy">{log.action}</span>
                    <span className="text-[10px] text-charcoal/50 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-charcoal/70">{log.detail}</p>
                  <span className="text-[10px] text-charcoal/50 block mt-1">Oleh: {log.user}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
