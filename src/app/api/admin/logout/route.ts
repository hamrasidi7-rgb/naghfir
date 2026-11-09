import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, getCurrentUser } from '@/lib/auth';
import { logAudit } from '@/lib/db';

export async function POST() {
  const user = getCurrentUser();
  if (user) {
    logAudit(user.name, 'Admin Logout', 'Pengguna keluar dari sistem');
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return res;
}
