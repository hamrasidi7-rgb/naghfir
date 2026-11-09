import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, logAudit } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nama, email, dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const newMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || 'Pesan Melalui Website').trim(),
      message: String(message).trim(),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isRead: false,
    };

    db.messages = [newMessage, ...(db.messages || [])];
    saveDatabase(db);
    logAudit('Website Visitor', 'Pesan Masuk Baru', `Dari: ${name} (${email}) - ${subject}`);

    return NextResponse.json({ success: true, message: 'Pesan berhasil terkirim.' });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Gagal menyimpan pesan.' },
      { status: 500 }
    );
  }
}
