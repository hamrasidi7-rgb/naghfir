import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getCurrentUser } from '@/lib/auth';
import { logAudit } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Tidak memiliki otorisasi.' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || '.jpg';
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}_${cleanName}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/images/uploads/${filename}`;
    logAudit(user.name, 'Unggah Berkas', `Mengunggah media: ${filename}`);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Gagal mengunggah berkas.' }, { status: 500 });
  }
}
