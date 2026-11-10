/**
 * DATA DUMMY — PROTOTIPE DESAIN
 *
 * Katalog layanan, daftar dokumen, estimasi waktu, jam layanan, dan slot jadwal
 * di file ini hanya contoh untuk menyimulasikan alur konsultasi di beranda.
 * Belum diverifikasi oleh Kantor Notaris & PPAT Dr. Naghfir dan BUKAN konten final.
 */

export type CategoryId = 'notaris' | 'ppat' | 'pertanahan';

export interface ConsultService {
  id: string;
  name: string;
  summary: string;
  documents: string[];
  /** Estimasi contoh, bukan janji layanan. */
  estimate: string;
}

export interface ServiceCategory {
  id: CategoryId;
  number: string;
  label: string;
  title: string;
  tagline: string;
  /** Tahapan proses setelah konsultasi awal (contoh). */
  stages: string[];
  services: ConsultService[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'notaris',
    number: '01',
    label: 'Notaris',
    title: 'Layanan Notaris',
    tagline: 'Akta autentik, badan usaha, perjanjian, dan legalisasi dokumen.',
    stages: [
      'Konsultasi awal',
      'Verifikasi data & berkas',
      'Penyusunan draf akta',
      'Pembacaan & penandatanganan',
      'Pengesahan & salinan akta',
    ],
    services: [
      {
        id: 'pendirian-pt-cv',
        name: 'Pendirian PT & CV',
        summary: 'Akta pendirian, anggaran dasar, hingga pengesahan badan usaha.',
        estimate: '± 5–10 hari kerja',
        documents: [
          'KTP & NPWP para pendiri dan pengurus',
          'Usulan nama badan usaha (3 alternatif)',
          'Alamat domisili usaha',
          'Susunan modal dan pemegang saham / sekutu',
          'Bidang usaha (kode KBLI)',
        ],
      },
      {
        id: 'yayasan',
        name: 'Pendirian Yayasan & Perkumpulan',
        summary: 'Akta pendirian beserta susunan organ yayasan atau perkumpulan.',
        estimate: '± 7–14 hari kerja',
        documents: [
          'KTP pendiri, pembina, pengurus, dan pengawas',
          'Nama serta maksud dan tujuan yayasan',
          'Alamat domisili',
          'Kekayaan awal yang dipisahkan',
        ],
      },
      {
        id: 'koperasi',
        name: 'Akta Koperasi (NPAK)',
        summary: 'Akta pendirian dan perubahan anggaran dasar koperasi.',
        estimate: '± 7–14 hari kerja',
        documents: [
          'Berita acara rapat pendirian',
          'Daftar hadir dan KTP anggota pendiri',
          'Rancangan anggaran dasar',
          'Susunan pengurus dan pengawas',
          'Bukti setoran modal awal',
        ],
      },
      {
        id: 'perjanjian-kuasa',
        name: 'Akta Perjanjian & Kuasa',
        summary: 'Perjanjian kerja sama, sewa-menyewa, utang-piutang, dan kuasa.',
        estimate: '± 2–5 hari kerja',
        documents: [
          'KTP para pihak',
          'Pokok-pokok kesepakatan atau draf perjanjian',
          'Dokumen terkait objek perjanjian',
          'Persetujuan pasangan (bila diperlukan)',
        ],
      },
      {
        id: 'legalisasi',
        name: 'Legalisasi & Waarmerking',
        summary: 'Pengesahan tanda tangan dan pendaftaran surat di bawah tangan.',
        estimate: '± 1 hari kerja',
        documents: [
          'Dokumen asli yang akan dilegalisasi / didaftarkan',
          'KTP penanda tangan',
          'Kehadiran para pihak (khusus legalisasi)',
        ],
      },
    ],
  },
  {
    id: 'ppat',
    number: '02',
    label: 'PPAT',
    title: 'Layanan PPAT',
    tagline: 'Peralihan dan pembebanan hak atas tanah serta bangunan.',
    stages: [
      'Konsultasi awal',
      'Pengecekan sertifikat di BPN',
      'Validasi pajak (PPh & BPHTB)',
      'Penandatanganan akta',
      'Pendaftaran ke Kantor Pertanahan',
    ],
    services: [
      {
        id: 'ajb',
        name: 'Akta Jual Beli (AJB)',
        summary: 'Peralihan hak atas tanah dan bangunan melalui jual beli.',
        estimate: '± 14–30 hari kerja',
        documents: [
          'Sertifikat asli (SHM / SHGB)',
          'KTP & KK penjual dan pembeli',
          'Akta nikah / persetujuan pasangan penjual',
          'SPPT PBB tahun berjalan dan bukti lunas',
          'NPWP para pihak',
        ],
      },
      {
        id: 'hibah',
        name: 'Akta Hibah',
        summary: 'Pemberian hak atas tanah kepada keluarga atau pihak lain.',
        estimate: '± 14–30 hari kerja',
        documents: [
          'Sertifikat asli',
          'KTP & KK pemberi dan penerima hibah',
          'Surat keterangan hubungan keluarga',
          'SPPT PBB dan bukti lunas',
          'Persetujuan pasangan / ahli waris',
        ],
      },
      {
        id: 'aphb',
        name: 'Pembagian Hak Bersama (APHB)',
        summary: 'Pembagian tanah warisan atau milik bersama kepada para pihak.',
        estimate: '± 14–30 hari kerja',
        documents: [
          'Sertifikat asli',
          'Surat keterangan waris',
          'KTP & KK seluruh ahli waris',
          'Kesepakatan pembagian',
          'SPPT PBB dan bukti lunas',
        ],
      },
      {
        id: 'apht',
        name: 'Hak Tanggungan (APHT)',
        summary: 'Pembebanan hak tanggungan untuk jaminan kredit.',
        estimate: '± 7–14 hari kerja',
        documents: [
          'Sertifikat asli',
          'Perjanjian kredit dari bank',
          'KTP & KK debitur dan pasangan',
          'SPPT PBB tahun berjalan',
        ],
      },
    ],
  },
  {
    id: 'pertanahan',
    number: '03',
    label: 'Pertanahan',
    title: 'Urusan Pertanahan',
    tagline: 'Pengecekan, balik nama, wakaf, dan penelusuran riwayat tanah.',
    stages: [
      'Konsultasi awal',
      'Penelusuran dokumen & riwayat',
      'Pengajuan ke Kantor Pertanahan',
      'Pemantauan proses',
      'Penyerahan hasil',
    ],
    services: [
      {
        id: 'cek-sertifikat',
        name: 'Pengecekan Sertifikat',
        summary: 'Memastikan keabsahan dan status sertifikat di Kantor Pertanahan.',
        estimate: '± 1–3 hari kerja',
        documents: [
          'Sertifikat asli atau salinan',
          'KTP pemilik',
          'Surat kuasa (bila diwakilkan)',
        ],
      },
      {
        id: 'balik-nama',
        name: 'Balik Nama Sertifikat',
        summary: 'Pendaftaran peralihan hak agar sertifikat atas nama pemilik baru.',
        estimate: '± 14–30 hari kerja',
        documents: [
          'Akta PPAT (AJB / hibah / APHB)',
          'Sertifikat asli',
          'Bukti pembayaran BPHTB dan PPh',
          'KTP penerima hak',
        ],
      },
      {
        id: 'wakaf',
        name: 'Pendampingan Tanah Wakaf',
        summary: 'Pendampingan administrasi sertifikasi tanah wakaf.',
        estimate: 'Menyesuaikan kelengkapan berkas',
        documents: [
          'Akta Ikrar Wakaf (AIW) atau surat keterangan wakaf',
          'Data dan identitas nadzir',
          'Bukti riwayat tanah',
          'Surat keterangan dari desa',
        ],
      },
      {
        id: 'riwayat-sengketa',
        name: 'Konsultasi Riwayat & Sengketa Tanah',
        summary: 'Telaah dokumen girik / letter C dan langkah penyelesaian.',
        estimate: 'Menyesuaikan kasus',
        documents: [
          'Dokumen kepemilikan yang ada (girik / letter C / sertifikat)',
          'Kronologi singkat',
          'Identitas para pihak terkait',
        ],
      },
    ],
  },
];

export const CONSULT_MODES = [
  {
    id: 'kantor',
    label: 'Datang ke kantor',
    detail: 'Batuan, Kabupaten Sumenep',
  },
  {
    id: 'daring',
    label: 'Konsultasi daring',
    detail: 'WhatsApp atau panggilan video',
  },
] as const;

export type ConsultModeId = (typeof CONSULT_MODES)[number]['id'];

/** Jam layanan contoh (dummy). */
export const OFFICE_HOURS_DUMMY = [
  { days: 'Senin – Jumat', hours: '08.00 – 16.00 WIB' },
  { days: 'Sabtu', hours: '08.00 – 12.00 WIB' },
];

export const TIME_SLOTS = ['09.00', '10.30', '13.00', '14.30'];

/** Slot "penuh" dibuat deterministik agar simulasi terasa nyata. */
export function isSlotFull(dayIndex: number, slotIndex: number): boolean {
  return (dayIndex * 3 + slotIndex) % 5 === 1;
}

export function findService(categoryId: CategoryId, serviceId: string) {
  const category = SERVICE_CATEGORIES.find((c) => c.id === categoryId)!;
  const service = category.services.find((s) => s.id === serviceId) ?? category.services[0];
  return { category, service };
}
