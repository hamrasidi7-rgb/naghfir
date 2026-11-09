'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('naghfir2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Username atau password salah.');
      }
    } catch (err) {
      setError('Gagal menghubungi server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E9] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <span className="font-sans text-3xl font-black tracking-widest text-navy group-hover:text-burgundy transition-colors uppercase">
              NAGHFIR
            </span>
            <span className="block text-xs uppercase tracking-widest text-charcoal/60 mt-1 font-semibold">
              Content Management System (CMS)
            </span>
          </Link>
        </div>

        {/* Login Box */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-navy/10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-navy/10">
            <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-navy">Masuk Portal Admin</h1>
              <p className="text-xs text-charcoal/60">Kelola seluruh konten website resmi</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Nama Pengguna (Username)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                  placeholder="admin / editor"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy hover:bg-burgundy text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50"
            >
              <span>{loading ? 'Memeriksa Kredensial...' : 'Masuk ke Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Preset Helper Credentials */}
          <div className="mt-8 pt-6 border-t border-navy/10 text-xs text-charcoal/70 space-y-2 bg-ivory/60 p-4 rounded-xl">
            <span className="font-bold text-navy block text-[11px] uppercase tracking-wider">
              Kredensial Bawaan Sistem:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="font-bold text-burgundy block">1. Administrator</span>
                <span>User: <strong>admin</strong></span>
                <span className="block">Pass: <strong>naghfir2026</strong></span>
              </div>
              <div>
                <span className="font-bold text-navy block">2. Editor Konten</span>
                <span>User: <strong>editor</strong></span>
                <span className="block">Pass: <strong>editor2026</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs font-semibold text-charcoal/60 hover:text-navy transition-colors">
            ← Kembali ke Halaman Utama Website
          </Link>
        </div>

      </div>
    </div>
  );
}
