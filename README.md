# Website Personal Premium: Dr. Naghfir
## Professional Personal Branding & Public Profile — Sumenep, Madura

Website resmi dan portal editorial intelektual untuk:
**Dr. Naghfir, S.HI., S.H., M.Kn., CPM., CH., C.Ht.**  
*Tokoh profesional asal Desa Campaka, Pasongsongan, Kabupaten Sumenep, Madura.*

---

## 1. Konsep & Filosofi Branding

- **Tema Utama:** *"Dari Pesantren, Mengabdi untuk Masyarakat."*
- **Pendekatan:** Editorial modern, intelektual publik, berwibawa, dan berkarakter lokal Madura.
- **Nilai Karakter:** Santri & alumni pesantren, akademisi doktor ekonomi syariah, praktisi hukum terpercaya (Notaris & PPAT sejak 2021), serta pejuang legalitas aset umat & wakaf (LWPNU Sumenep).

---

## 2. Palet Warna & Tipografi

- **Deep Burgundy:** `#762B30`
- **Deep Navy:** `#17243A`
- **Warm Ivory:** `#F5F1E9` / `#FAF7F2`
- **White:** `#FFFFFF`
- **Charcoal:** `#252525`
- **Typography:** Manrope (Clean editorial modern hierarchy)

---

## 3. Struktur Website Publik

1. **Beranda (`/`):**
   - **Header:** Sticky wordmark `NAGHFIR`, navigasi responsif, mobile drawer.
   - **Hero Section:** Nama, gelar resmi, headline, deskripsi, foto portrait asli (`/images/naghfir.webp`), pilar metrik terverifikasi.
   - **Personal Introduction:** *"Lebih dari Sekadar Profesi"* (01. Akademisi, 02. Profesional Hukum, 03. Pengabdian Sosial).
   - **Journey / Perjalanan Hidup:** 10 babak linimasa faktual (Campaka -> Ponpes Aqidah Usymuni -> UIN Malang Hukum Syariah -> PMII -> M.Kn UB -> PPAT -> Notaris 2021 -> Doktoral Ekonomi Syariah -> Doktor Okt 2025 -> Pengabdian Sumenep).
   - **Academic Profile:** *"Ilmu sebagai Fondasi Pengabdian"*, rekam jejak pendidikan tinggi & sertifikasi (CPM, CH, C.Ht.).
   - **Professional Profile:** *"Hukum, Legalitas, dan Kepastian"*, wewenang Notaris & PPAT, kepatuhan kode etik I.N.I.
   - **Social Contribution:** *"Pengabdian yang Tumbuh dari Akar Masyarakat"*, khidmah LWPNU Sumenep, inventarisasi sertifikasi tanah wakaf.
   - **Thoughts & Ideas:** *"Pemikiran dan Gagasan"*, format majalah digital multi-kategori.
   - **Activities & Documentation:** *"Catatan Aktivitas"*, tata letak asimetris foto besar-kecil.
   - **Publication & Media:** *"Publikasi dan Media"*, memuat liputan profil Mata Madura News (*"Naghfir: Dari Pesantren ke Meja Akta"* oleh Hambali Rasidi) dan kajian ilmiah.
   - **Contact & Discussion:** *"Terhubung dan Berdiskusi"*, form kirim pesan langsung terhubung ke database CMS.
   - **Footer:** Wordmark `NAGHFIR`, narasi *"Ilmu, profesi, dan pengabdian untuk masyarakat."*
2. **Profil Lengkap (`/profil`):** Biografi terperinci dan tiga matra pengabdian.
3. **Perjalanan Hidup (`/perjalanan`):** Linimasa vertikal lengkap 10 etape dengan verifikasi faktual.
4. **Pemikiran & Gagasan (`/pemikiran` & `/pemikiran/[slug]`):** Arsip artikel majalah dengan filter 8 kategori, estimasi baca, dan pembaca artikel editorial.
5. **Catatan Aktivitas (`/aktivitas`):** Dokumentasi kegiatan per kategori (Akademik, Profesi, Organisasi, Diskusi Publik, Sosial).
6. **Publikasi & Media (`/publikasi`):** Arsip pers resmi dan modul telaah hukum.
7. **Kontak (`/kontak`):** Portal korespondensi dan ruang diskusi.
8. **SEO & Metadata:** JSON-LD `Person` & `Article`, OpenGraph, `sitemap.xml`, `robots.txt`.

---

## 4. Backend CMS & Admin Control Panel

Akses admin tersedia di `/admin` dengan 14 modul pengelolaan penuh:
1. **Dashboard (`/admin`):** Ringkasan statistik artikel, pesan masuk, aktivitas, dan riwayat audit.
2. **Profil (`/admin/profil`):** Pengaturan nama, gelar, headline, bio, dan foto hero.
3. **Pendidikan (`/admin/pendidikan`):** CRUD riwayat pendidikan dan sertifikasi keahlian.
4. **Timeline Perjalanan (`/admin/timeline`):** CRUD dan reorder 10 milestone perjalanan hidup.
5. **Pengalaman Profesional (`/admin/profesional`):** Kelola wewenang Notaris, PPAT, dan mediasi.
6. **Organisasi & Pengabdian (`/admin/organisasi`):** Kelola program LWPNU, wakaf, dan advokasi masyarakat.
7. **Pemikiran & Artikel (`/admin/artikel`):** Editor artikel, slug otomatis, kategori, tanggal, status draft/published, featured toggle, dan SEO meta.
8. **Aktivitas (`/admin/aktivitas`):** CRUD agenda kegiatan, tanggal, dan lokasi.
9. **Galeri Foto (`/admin/galeri`):** CRUD arsip foto dokumentasi.
10. **Video (`/admin/video`):** Kelola tautan rekaman audio-visual forum/seminar.
11. **Publikasi Media (`/admin/publikasi`):** Arsip liputan pers, atribusi jurnalis, dan karya ilmiah.
12. **Kontak & Pesan Masuk (`/admin/kontak`):** Pengaturan surel & inbox pesan pengunjung website.
13. **Media Library (`/admin/media`):** Upload manager langsung ke `/public/images/uploads/`.
14. **SEO Settings (`/admin/seo`):** Title tag, meta deskripsi, canonical URL, OG image, dan Google Search preview simulator.
15. **Audit Log (`/admin/audit`):** Log aktivitas seluruh perubahan data oleh admin/editor.

### Kredensial Bawaan CMS:
- **Administrator:** Username: `admin` | Password: `naghfir2026`
- **Editor:** Username: `editor` | Password: `editor2026`

---

## 5. Cara Menjalankan

### Mode Pengembangan (Development)
```bash
npm run dev
```
Buka browser di: `http://localhost:3000`

### Mode Produksi (Production Build & Run)
```bash
npm run build
npm run start
```
