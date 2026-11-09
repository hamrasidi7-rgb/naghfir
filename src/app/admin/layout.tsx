'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Milestone,
  Briefcase,
  Users,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  Video,
  Newspaper,
  Mail,
  FolderOpen,
  Search,
  Shield,
  LogOut,
  ExternalLink,
  Menu,
  X,
  History,
} from 'lucide-react';

const ADMIN_MENUS = [
  { href: '/admin', label: '1. Dashboard', icon: LayoutDashboard },
  { href: '/admin/profil', label: '2. Profil', icon: User },
  { href: '/admin/pendidikan', label: '3. Pendidikan', icon: GraduationCap },
  { href: '/admin/timeline', label: '4. Timeline Perjalanan', icon: Milestone },
  { href: '/admin/profesional', label: '5. Pengalaman Profesional', icon: Briefcase },
  { href: '/admin/organisasi', label: '6. Organisasi & Pengabdian', icon: Users },
  { href: '/admin/artikel', label: '7. Pemikiran & Artikel', icon: BookOpen },
  { href: '/admin/aktivitas', label: '8. Aktivitas', icon: Calendar },
  { href: '/admin/galeri', label: '9. Galeri Foto', icon: ImageIcon },
  { href: '/admin/video', label: '10. Video', icon: Video },
  { href: '/admin/publikasi', label: '11. Publikasi Media', icon: Newspaper },
  { href: '/admin/kontak', label: '12. Kontak & Pesan', icon: Mail },
  { href: '/admin/media', label: '13. Media Library', icon: FolderOpen },
  { href: '/admin/seo', label: '14. SEO Settings', icon: Search },
  { href: '/admin/audit', label: 'Audit Log', icon: History },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // If we are on /admin/login, render without sidebar
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setCurrentUser(data.user);
            setCheckingAuth(false);
            return;
          }
        }
        router.push('/admin/login');
      } catch (err) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      router.push('/admin/login');
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F5F1E9] flex items-center justify-center text-sm font-medium text-charcoal">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-burgundy border-t-transparent rounded-full animate-spin" />
          <span>Memverifikasi otorisasi sesi...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex text-charcoal">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-navy text-ivory z-50 transform transition-transform duration-300 flex flex-col border-r border-navy/30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="group">
            <span className="font-sans text-xl font-black tracking-widest text-white group-hover:text-burgundy-200 transition-colors uppercase">
              NAGHFIR CMS
            </span>
            <span className="block text-[10px] uppercase tracking-wider text-ivory/60 font-medium">
              Control Panel Terpadu
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded text-ivory/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info Pill */}
        <div className="px-6 py-4 bg-navy-900 border-b border-white/5 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white block">{currentUser?.name || 'Administrator'}</span>
            <span className="text-[11px] text-ivory/60 capitalize font-mono">
              Role: {currentUser?.role || 'admin'}
            </span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" title="Aktif" />
        </div>

        {/* Menu Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {ADMIN_MENUS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-burgundy text-white shadow-sm'
                    : 'text-ivory/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-ivory/80 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website Utama</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-300 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-navy/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-ivory"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs">
              <span className="text-charcoal/50">CMS</span> / <span className="font-bold text-navy">{pathname}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory border border-navy/10 text-navy font-semibold">
              <Shield className="w-3.5 h-3.5 text-burgundy" />
              <span>Sesi Aman</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy hover:underline"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
