'use client';

import React, { useState, useEffect } from 'react';
import { History, Shield, User, Clock, Search } from 'lucide-react';
import { AuditLogItem } from '@/data/initialData';

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.auditLogs || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-sm">Memuat catatan log audit...</div>;

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-navy/10 gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy flex items-center gap-2">
            <History className="w-6 h-6 text-burgundy" />
            <span>Audit Log Sistem & Aktivitas CMS</span>
          </h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Merekam seluruh operasi login, pembaruan konten, publikasi artikel, dan perubahan konfigurasi
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari aktivitas log..."
            className="pl-9 pr-4 py-2 rounded-xl border border-navy/15 text-xs bg-white w-64 focus:outline-none focus:ring-1 focus:ring-burgundy"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-navy/10 uppercase tracking-wider text-charcoal/60 font-bold">
              <tr>
                <th className="py-3.5 px-4">Waktu (WIB)</th>
                <th className="py-3.5 px-4">Pengguna</th>
                <th className="py-3.5 px-4">Tindakan (Action)</th>
                <th className="py-3.5 px-4">Rincian Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-charcoal/50">
                    Tidak ditemukan data log audit yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-ivory/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-charcoal/60 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-navy whitespace-nowrap">
                      {log.user}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-burgundy whitespace-nowrap">
                      {log.action}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal/80">
                      {log.detail}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
