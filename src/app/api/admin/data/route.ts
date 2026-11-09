import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, logAudit } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const db = getDatabase();
  return NextResponse.json(db);
}

export async function POST(req: Request) {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  try {
    const { module, data, action, detail } = await req.json();

    if (!module) {
      return NextResponse.json({ error: 'Nama modul wajib disertakan.' }, { status: 400 });
    }

    const db = getDatabase();

    switch (module) {
      case 'profile':
        db.profile = { ...db.profile, ...data };
        break;
      case 'education':
        db.education = data;
        break;
      case 'timeline':
        db.timeline = data;
        break;
      case 'professional':
        db.professional = data;
        break;
      case 'socialContribution':
        db.socialContribution = data;
        break;
      case 'articles':
        db.articles = data;
        break;
      case 'activities':
        db.activities = data;
        break;
      case 'gallery':
        db.gallery = data;
        break;
      case 'videos':
        db.videos = data;
        break;
      case 'publications':
        db.publications = data;
        break;
      case 'contact':
        db.contact = { ...db.contact, ...data };
        break;
      case 'seo':
        db.seo = { ...db.seo, ...data };
        break;
      case 'mediaAssets':
        db.mediaAssets = data;
        break;
      case 'messages':
        db.messages = data;
        break;
      default:
        return NextResponse.json({ error: `Modul '${module}' tidak dikenali.` }, { status: 400 });
    }

    saveDatabase(db);
    logAudit(user.name, action || `Pembaruan ${module}`, detail || `Menyimpan perubahan pada modul ${module}`);

    return NextResponse.json({ success: true, message: `Data ${module} berhasil diperbarui.` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Gagal menyimpan data.' }, { status: 500 });
  }
}
