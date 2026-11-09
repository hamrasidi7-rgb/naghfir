import { NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';
import { logAudit } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan kata sandi wajib diisi.' },
        { status: 400 }
      );
    }

    const user = verifyCredentials(username, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Username atau kata sandi tidak cocok.' },
        { status: 401 }
      );
    }

    const token = createSessionToken(user);
    logAudit(user.name, 'Admin Login', `Pengguna masuk dengan hak akses ${user.role}`);

    const res = NextResponse.json({ success: true, user });
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Gagal masuk ke sistem.' },
      { status: 500 }
    );
  }
}
