export interface MediaAsset {
  id: string;
  url: string;
  title: string;
  category: 'Tokoh Utama' | 'Pesantren' | 'Akademik' | 'Hukum & Kenotariatan' | 'Organisasi & Wakaf' | 'Lanskap & Budaya';
  source: string;
  photographerOrPublisher: string;
  license: string;
  permissionStatus: 'Izin Resmi Terverifikasi' | 'Kandidat Foto Terverifikasi Pers' | 'Lisensi Terbuka (Unsplash/Commons)' | 'Menunggu Konfirmasi';
  altText: string;
  assignedTo?: string[];
}

export interface ProfileData {
  name: string;
  shortName: string;
  degrees: string;
  origin: string;
  tagline: string;
  headline: string;
  subheadline: string;
  heroImage: string;
  heroImageCredit?: string;
  officeAddress?: string;
  bphtbAward?: string;
  aboutIntro: string;
  aboutStory: string[];
  coreIdentities: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
  }[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  description: string;
  verificationStatus?: 'Terverifikasi' | 'Menunggu Konfirmasi Admin';
  notes?: string;
  order: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Pendidikan' | 'Pesantren' | 'Profesi' | 'Organisasi' | 'Pengabdian';
  image?: string;
  imageCredit?: string;
  order: number;
}

export interface ProfessionalItem {
  id: string;
  title: string;
  role: string;
  badge: string;
  description: string;
  services: string[];
  order: number;
}

export interface SocialContributionItem {
  id: string;
  title: string;
  role: string;
  organization: string;
  description: string;
  focusArea: string;
  highlights: string[];
  order: number;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  referenceSource?: string;
  status: 'published' | 'draft';
  featured: boolean;
  coverImage?: string;
  coverCredit?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: 'Akademik' | 'Profesi' | 'Organisasi' | 'Diskusi Publik' | 'Sosial';
  date: string;
  location: string;
  description: string;
  image?: string;
  imageCredit?: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
  credit?: string;
  date: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  type: 'Media Coverage' | 'Artikel Opini' | 'Jurnal Ilmiah' | 'Buku / Modul';
  source: string;
  author: string;
  date: string;
  url: string;
  excerpt: string;
  image?: string;
  isExternalVerified: boolean;
  notes?: string;
}

export interface ContactSettings {
  email: string;
  phoneNote: string;
  location: string;
  officeAddress: string;
  addressNote: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  authorName: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  detail: string;
}

export interface DatabaseSchema {
  profile: ProfileData;
  education: EducationItem[];
  timeline: TimelineItem[];
  professional: ProfessionalItem[];
  socialContribution: SocialContributionItem[];
  articles: ArticleItem[];
  activities: ActivityItem[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  publications: PublicationItem[];
  mediaAssets: MediaAsset[];
  contact: ContactSettings;
  messages: MessageItem[];
  seo: SeoSettings;
  auditLogs: AuditLogItem[];
}

export const initialData: DatabaseSchema = {
  profile: {
    name: "Dr. Naghfir, S.HI., S.H., M.Kn., CPM., CH., C.Ht.",
    shortName: "Dr. Naghfir",
    degrees: "S.HI., S.H., M.Kn., CPM., CH., C.Ht.",
    origin: "Sumenep, Madura, Indonesia",
    tagline: "Notaris & PPAT | Akademisi | Penggerak Sosial",
    headline: "Ilmu, Hukum, dan Pengabdian.",
    subheadline: "Membangun kepastian hukum, mengembangkan pemikiran, dan mengabdi kepada masyarakat.",
    heroImage: "/images/naghfir.webp",
    heroImageCredit: "Foto Resmi Dokumentasi Personal Dr. Naghfir",
    officeAddress: "Jl. Jokotole – Perum Griya Berkat Regency Gg. III No. 24 (Lingkar Barat), Kec. Batuan, Kab. Sumenep, Jawa Timur",
    bphtbAward: "Juara 1 Mitra Pembayar BPHTB Terbesar Kabupaten Sumenep (Bapenda Sumenep)",
    aboutIntro: "Perjalanan hidup Dr. Naghfir berakar dari ketulusan tradisi pesantren di Pasongsongan, ditempa melalui tangga keilmuan hukum dan ekonomi syariah hingga jenjang doktoral, serta diabdikan melalui tugas jabatan Notaris & PPAT dan khidmah perlindungan aset umat di Kabupaten Sumenep.",
    aboutStory: [
      "Tumbuh di Desa Campaka, Kecamatan Pasongsongan, Dr. Naghfir mengawali pembentukan karakternya di Pondok Pesantren Aqidah Usymuni Terate, Pandian, Sumenep. Nilai kejujuran, kecermatan, dan tanggung jawab moral terhadap sesama yang dipelajari di pesantren menjadi kompas dalam setiap langkah profesionalnya.",
      "Kecintaan pada ilmu membawanya menyelesaikan studi sarjana hukum syariah di UIN Maulana Malik Ibrahim Malang, pendidikan hukum positif, jenjang Magister Kenotariatan di Fakultas Hukum Universitas Brawijaya, hingga meraih gelar Doktor (S3) di bidang Ekonomi Syariah pada tahun 2025.",
      "Sebagai Notaris dan PPAT yang telah disumpah pada tahun 2021, Dr. Naghfir menjalankan wewenang jabatannya dengan komitmen ketertiban hukum dan pelayanan berintegritas. Di luar ruang kantor, beliau mendedikasikan waktu dan keahliannya di Lembaga Wakaf dan Pertanahan NU (LWPNU) Sumenep guna melindungi legalitas aset-aset wakaf demi kemaslahatan masyarakat."
    ],
    coreIdentities: [
      {
        number: "01",
        title: "Profesional Hukum",
        subtitle: "Notaris, PPAT, Pertanahan & Literasi Hukum",
        description: "Menjalankan wewenang pejabat umum pembuat akta autentik dan pejabat pembuat akta tanah berlandaskan Undang-Undang Jabatan Notaris dan kode etik profesi.",
        highlights: [
          "Notaris & PPAT resmi tersumpah di Sumenep (2021)",
          "Notaris Pembuat Akta Koperasi (NPAK) resmi Kemenkop UKM",
          "Juara 1 Mitra Pembayar BPHTB Terbesar se-Kabupaten Sumenep",
          "Sertifikasi Mediator Profesional (CPM) dari Mahkamah Agung RI"
        ]
      },
      {
        number: "02",
        title: "Akademisi",
        subtitle: "Doktoral, Riset Syariah & Pengembangan Pemikiran",
        description: "Mengembangkan riset di bidang regulasi ekonomi syariah, hukum perdata, instrumen wakaf produktif, serta aktif dalam forum ilmiah dan pembinaan generasi muda.",
        highlights: [
          "Doktor (Dr.) Ekonomi Syariah UIN Maulana Malik Ibrahim Malang",
          "Magister Kenotariatan (M.Kn.) Fakultas Hukum Universitas Brawijaya",
          "Sarjana Hukum Islam (S.HI.) dan Sarjana Hukum (S.H.)",
          "Narasumber seminar hukum agraria dan ekonomi muamalah"
        ]
      },
      {
        number: "03",
        title: "Penggerak Sosial",
        subtitle: "LWPNU Sumenep, Wakaf & Pengabdian Masyarakat",
        description: "Berkhidmat mendampingi umat melalui pendataan, mediasi riwayat tanah, dan pengurusan sertifikasi tanah wakaf masjid, madrasah, serta fasilitas keagamaan.",
        highlights: [
          "Pengurus Lembaga Wakaf dan Pertanahan NU (LWPNU) Sumenep",
          "Fasilitasi Akta Ikrar Wakaf (AIW) dan sertifikasi tanah umat di BPN",
          "Kader alumni Pergerakan Mahasiswa Islam Indonesia (PMII)",
          "Edukasi literasi hukum agraria bagi aparatur desa dan nadzir"
        ]
      }
    ]
  },
  education: [
    {
      id: "edu-1",
      institution: "Pondok Pesantren Aqidah Usymuni Terate",
      degree: "Pendidikan Pesantren",
      field: "Tafaqquh Fiddin & Pembentukan Karakter Santri",
      period: "Masa Pendidikan Pesantren",
      location: "Pandian, Sumenep, Madura",
      description: "Menempa fondasi keagamaan, kajian kitab kuning, adab penuntut ilmu, dan filosofi pengabdian kemasyarakatan.",
      verificationStatus: "Terverifikasi",
      order: 1
    },
    {
      id: "edu-2",
      institution: "Universitas Islam Negeri (UIN) Maulana Malik Ibrahim Malang",
      degree: "Sarjana Hukum Islam (S.HI.)",
      field: "Hukum Syariah",
      period: "Pendidikan Sarjana",
      location: "Malang, Jawa Timur",
      description: "Mendalami hukum perdata Islam, ushul fiqh, dan kaidah muamalah syariah serta aktif dalam kepemimpinan pergerakan mahasiswa.",
      verificationStatus: "Terverifikasi",
      order: 2
    },
    {
      id: "edu-3",
      institution: "Fakultas Hukum (Menunggu Konfirmasi Administratif Nama Kampus)",
      degree: "Sarjana Hukum (S.H.)",
      field: "Ilmu Hukum Positif",
      period: "Pendidikan Sarjana",
      location: "Jawa Timur",
      description: "Penguatan kompetensi ilmu hukum positif, hukum perdata, hukum perikatan bisnis, dan hukum tata negara. [Catatan CMS: Nama universitas penerbit ijazah S.H. ditandai untuk konfirmasi verifikasi admin].",
      verificationStatus: "Menunggu Konfirmasi Admin",
      order: 3
    },
    {
      id: "edu-4",
      institution: "Universitas Brawijaya (UB) Malang",
      degree: "Magister Kenotariatan (M.Kn.)",
      field: "Hukum Kenotariatan & Agraria",
      period: "Pendidikan Pascasarjana",
      location: "Malang, Jawa Timur",
      description: "Pendidikan spesialisasi pembuatan akta autentik, hukum perseroan terbatas, perikatan keperdataan, pendaftaran tanah, dan hukum jaminan fidusia/hak tanggungan.",
      verificationStatus: "Terverifikasi",
      order: 4
    },
    {
      id: "edu-5",
      institution: "Universitas Islam Negeri (UIN) Maulana Malik Ibrahim Malang",
      degree: "Doktor (Dr.)",
      field: "Ekonomi Syariah",
      period: "Lulus & Pengukuhan Oktober 2025",
      location: "Malang, Jawa Timur",
      description: "Riset doktoral strata tiga mengenai regulasi bisnis syariah, harmonisasi hukum muamalah dalam perundangan nasional, dan optimalisasi instrumen wakaf produktif.",
      verificationStatus: "Terverifikasi",
      order: 5
    }
  ],
  timeline: [
    {
      id: "time-1",
      year: "Akar Kehidupan",
      title: "Masa Kecil di Desa Campaka, Pasongsongan",
      subtitle: "Kabupaten Sumenep, Madura",
      description: "Tumbuh di lingkungan pedesaan pesisir utara Madura. Kesahajaan warga desa menanamkan kepekaan sosial dan komitmen untuk kembali mengabdi ke tanah kelahiran.",
      category: "Pesantren",
      image: "/images/context/lanskap-sumenep.webp",
      imageCredit: "Dokumentasi Lanskap Pesisir Pasongsongan Sumenep (Unsplash License)",
      order: 1
    },
    {
      id: "time-2",
      year: "Tempaan Santri",
      title: "Pendidikan Pesantren di Aqidah Usymuni Terate",
      subtitle: "Pandian, Sumenep",
      description: "Menempa adab dan ilmu agama di bawah bimbingan para kiai. Nilai ketawadukan dan kehati-hatian (ihtiyath) santri menjadi benteng moralitas utama.",
      category: "Pesantren",
      image: "/images/context/pesantren-santri.webp",
      imageCredit: "Tradisi & Nilai Keilmuan Pesantren Santri Madura (Unsplash License)",
      order: 2
    },
    {
      id: "time-3",
      year: "Jejak Sarjana",
      title: "Pendidikan Tinggi Hukum & Syariah",
      subtitle: "UIN Maulana Malik Ibrahim Malang",
      description: "Menempuh pendidikan sarjana hukum syariah dan ilmu hukum, memadukan tradisi penalaran teks fiqh klasik dengan metodologi yuridis positif modern.",
      category: "Pendidikan",
      image: "/images/context/pendidikan-kampus.webp",
      imageCredit: "Suasana Kampus & Pendidikan Tinggi (Unsplash License)",
      order: 3
    },
    {
      id: "time-4",
      year: "Kiprah Pergerakan",
      title: "Aktivitas Organisasi Mahasiswa PMII",
      subtitle: "Malang & Jawa Timur",
      description: "Aktif dalam wadah Pergerakan Mahasiswa Islam Indonesia (PMII), mengasah kepemimpinan, nalar kritis sosial, dan keterpanggilan membela hak masyarakat kecil.",
      category: "Organisasi",
      image: "/images/context/kegiatan-organisasi.webp",
      imageCredit: "Dokumentasi Forum Audiensi & Organisasi (Unsplash License)",
      order: 4
    },
    {
      id: "time-5",
      year: "Spesialisasi Akta",
      title: "Magister Kenotariatan Universitas Brawijaya",
      subtitle: "Fakultas Hukum UB Malang",
      description: "Menempuh pendidikan magister profesi kenotariatan, mendalami hukum pertanahan, teknik pembuatan akta perikatan bisnis, dan tata kelola kantor notaris.",
      category: "Pendidikan",
      image: "/images/context/diskusi-akademik.webp",
      imageCredit: "Diskusi & Riset Akademik Hukum Kenotariatan (Unsplash License)",
      order: 5
    },
    {
      id: "time-6",
      year: "2021",
      title: "Perjalanan Profesi Notaris dan PPAT",
      subtitle: "Pengangkatan & Sumpah Jabatan Resmi",
      description: "Lulus ujian keahlian dan diambil sumpah jabatan resmi sebagai Notaris dan PPAT pada tahun 2021 untuk melayani kepastian hukum warga Kabupaten Sumenep.",
      category: "Profesi",
      image: "/images/naghfir-matamaduranews.jpg",
      imageCredit: "Dokumentasi Redaksi Mata Madura News (Hambali Rasidi)",
      order: 6
    },
    {
      id: "time-7",
      year: "Oktober 2025",
      title: "Pendidikan Doktoral Ekonomi Syariah",
      subtitle: "Puncak Pencapaian Strata 3 UIN Malang",
      description: "Menyelesaikan riset disertasi regulasi ekonomi syariah dan tata kelola wakaf, resmi dikukuhkan sebagai Doktor (Dr.) dalam sidang senat terbuka.",
      category: "Pendidikan",
      image: "/images/naghfir.webp",
      imageCredit: "Foto Resmi Dr. Naghfir (Dokumentasi Personal)",
      order: 7
    },
    {
      id: "time-8",
      year: "Kini & Pengabdian",
      title: "Aktivitas Profesional & Khidmah Sosial",
      subtitle: "Membangun Sumenep Madura",
      description: "Menjalankan kantor Notaris-PPAT di Batuan Sumenep, meraih Juara 1 Pembayar BPHTB Terbesar, serta memimpin advokasi sertifikasi tanah wakaf di LWPNU Sumenep.",
      category: "Pengabdian",
      image: "/images/context/sosial-wakaf.webp",
      imageCredit: "Khidmah Perlindungan Aset Umat & Sarana Ibadah (Unsplash License)",
      order: 8
    }
  ],
  professional: [
    {
      id: "prof-1",
      title: "Notaris Kabupaten Sumenep",
      role: "Pejabat Umum Pembuat Akta Autentik",
      badge: "SK Resmi & Tersumpah 2021",
      description: "Mengemban wewenang jabatan kenotariatan untuk menjamin kepastian hukum dalam pembuatan akta pendirian badan hukum, perjanjian bisnis, dan perikatan keperdataan.",
      services: [
        "Pendirian Perseroan Terbatas (PT), CV, & Yayasan",
        "Notaris Pembuat Akta Koperasi (NPAK) Resmi",
        "Akta Perjanjian Bisnis, Kerjasama, & Sewa Menyewa",
        "Legalisasi & Waarmerking Dokumen Hukum",
        "Wasiat, Waris, & Kuasa Notariil Autentik"
      ],
      order: 1
    },
    {
      id: "prof-2",
      title: "Pejabat Pembuat Akta Tanah (PPAT)",
      role: "Pelayanan Hukum Agraria & Pendaftaran Tanah",
      badge: "PPAT Resmi Kabupaten Sumenep",
      description: "Melaksanakan tugas pembuatan akta autentik mengenai perbuatan hukum pemindahan hak atas tanah dan pembebanan hak tanggungan berdasar regulasi ATR/BPN.",
      services: [
        "Akta Jual Beli (AJB) Hak Atas Tanah",
        "Akta Hibah & Tukar Menukar Tanah",
        "Akta Pembagian Hak Bersama (APHB)",
        "Pemberian Hak Tanggungan & Surat Kuasa Membebankan Hak Tanggungan (SKMHT)",
        "Pengecekan Sertifikat & Pendaftaran Balik Nama"
      ],
      order: 2
    },
    {
      id: "prof-3",
      title: "Mediasi & Konsultasi Regulasi Syariah",
      role: "Kepastian Transaksi Bisnis & Wakaf",
      badge: "Sertifikasi Mediator Profesional (CPM)",
      description: "Menyediakan telaah kepatuhan syariah (sharia compliance) dalam akad muamalah serta mediasi penyelesaian sengketa keperdataan secara damai di luar pengadilan.",
      services: [
        "Penyusunan & Penelaahan Draf Akad Bisnis Syariah",
        "Tata Kelola Koperasi Simpan Pinjam Pembiayaan Syariah (KSPPS)",
        "Mediasi Perdata & Mediasi Sengketa Pertanahan (CPM)",
        "Pendampingan Administrasi Wakaf Produktif Umat"
      ],
      order: 3
    }
  ],
  socialContribution: [
    {
      id: "soc-1",
      title: "Lembaga Wakaf dan Pertanahan NU (LWPNU) Sumenep",
      role: "Jajaran Pengurus & Advokasi Pertanahan",
      organization: "PCNU Kabupaten Sumenep",
      description: "Memimpin ikhtiar pendampingan, pendataan, dan sertifikasi tanah wakaf masjid, musholla, madrasah, dan pemakaman umum di seluruh ranting NU Sumenep agar memiliki kepastian hukum mutlak dan aman dari gugatan sengketa.",
      focusArea: "Sertifikasi & Perlindungan Aset Wakaf Umat",
      highlights: [
        "Fasilitasi penerbitan Akta Ikrar Wakaf (AIW) di hadapan PPAIW/KUA",
        "Kerjasama percepatan sertifikasi tanah wakaf bersama Kantor Pertanahan (BPN) Sumenep",
        "Penyelesaian mediasi batas tanah dan sengketa waris aset keagamaan",
        "Edukasi nadzir desa tentang tata kelola aset wakaf produktif"
      ],
      order: 1
    },
    {
      id: "soc-2",
      title: "Literasi Hukum Kerakyatan & Penyuluhan Desa",
      role: "Inisiator Forum Edukasi Hukum Warga",
      organization: "Komunitas Sadar Hukum Sumenep",
      description: "Membuka ruang dialog berkala bagi masyarakat desa, aparatur pemerintahan desa, dan kelompok pemuda mengenai prosedur peralihan hak tanah, tertib administrasi waris, dan mitigasi risiko perkara perdata.",
      focusArea: "Penyuluhan Hak Tanah & Perikatan Usaha",
      highlights: [
        "Edukasi konversi tanah girik/letter C menjadi sertifikat hak milik",
        "Pencegahan sengketa perikatan jual beli bawah tangan",
        "Pemberdayaan melek hukum bagi pelaku UMKM pedesaan"
      ],
      order: 2
    },
    {
      id: "soc-3",
      title: "Kaderisasi Santri & Jejaring Alumni Pesantren",
      role: "Motivator & Mentor Akademik Generasi Muda",
      organization: "Jejaring Alumni Pesantren & PMII",
      description: "Mendorong generasi santri di Sumenep untuk berani menempuh pendidikan tinggi, menguasai ilmu hukum dan ekonomi modern, serta tetap berpegang teguh pada akhlakul karimah.",
      focusArea: "Pemberdayaan & Studi Lanjut Santri Madura",
      highlights: [
        "Mentoring beasiswa pascasarjana bagi alumni pesantren",
        "Penguatan integritas moral santri di ranah profesi formal",
        "Membangun sinergi intelektual santri untuk kemajuan daerah"
      ],
      order: 3
    }
  ],
  articles: [
    {
      id: "art-1",
      slug: "urgensi-sertifikasi-tanah-wakaf-madura",
      title: "Menyelamatkan Tanah Umat: Urgensi Sertifikasi dan Legalitas Tanah Wakaf di Madura",
      category: "Wakaf dan Aset Umat",
      summary: "Banyak aset wakaf di pedesaan Madura hanya berlandaskan ikrar lisan antargenerasi. Artikel ini membedah langkah legalitas konkret agar rumah ibadah dan madrasah aman dari sengketa.",
      coverImage: "/images/context/sosial-wakaf.webp",
      coverCredit: "Dokumentasi Aset Wakaf & Rumah Ibadah (Unsplash License)",
      referenceSource: "Disertasi Doktoral & Catatan Khidmah LWPNU Sumenep (Dr. Naghfir)",
      content: `Tanah wakaf di bumi Madura adalah bukti nyata kedermawanan dan ketulusan para leluhur yang mewakafkan hartanya demi kemaslahatan umat. Sebagian besar masjid, surau, langgar, pesantren, dan makam di pelosok desa berdiri di atas tanah wakaf.

Namun, di era modern di mana nilai tanah terus meningkat dan batas-batas wilayah semakin terstandardisasi, ketergantungan pada ikrar lisan tanpa Akta Ikrar Wakaf (AIW) resmi dan sertifikat tanah wakaf membuka celah sengketa hukum di masa depan, terutama ketika generasi pewakaf (wakif) dan penerima (nadzir) telah berganti.

### Mengapa Legalitas Wakaf Menjadi Mendesak?

1. **Kepastian Hukum Hak Kebendaan**: Tanpa sertifikat wakaf yang dikeluarkan oleh Badan Pertanahan Nasional (BPN), status tanah wakaf rawan digugat oleh ahli waris wakif yang mungkin tidak mengetahui riwayat perwakafan di masa lalu.
2. **Kekuatan Posisi Nadzir**: Nadzir yang memegang bukti otentik dapat leluasa mengelola, mengembangkan fasilitas ibadah, serta mengajukan bantuan pembangunan tanpa hambatan legalitas administrasi.
3. **Pencegahan Sengketa Antar-Warga**: Sengketa batas dan klaim kepemilikan atas fasilitas umum dapat memicu keretakan silaturahmi komunal di pedesaan.

### Sinergi Tiga Pilar: Nadzir, KUA, dan BPN

Gerakan penyelamatan aset wakaf membutuhkan kerja sama aktif antara Nadzir desa, Kantor Urusan Agama (KUA) selaku Pejabat Pembuat Akta Ikrar Wakaf (PPAIW), dan Kantor Pertanahan/BPN. Lembaga Wakaf dan Pertanahan NU (LWPNU) terus hadir di garis depan untuk memberikan asistensi administrasi, verifikasi berkas riwayat tanah, hingga proses sertifikasi terbit dengan tuntas.

Menjaga tanah wakaf adalah bagian dari menjaga marwah syiar Islam dan amanah leluhur. Legalitas bukan sekadar formalitas kertas, melainkan perisai keadilan bagi generasi penerus.`,
      date: "2026-08-14",
      readTime: "5 menit",
      author: "Dr. Naghfir, S.HI., S.H., M.Kn.",
      status: "published",
      featured: true,
      seoTitle: "Urgensi Sertifikasi Tanah Wakaf di Madura | Pemikiran Dr. Naghfir",
      seoDescription: "Telaah hukum dan strategi legalitas tanah wakaf di pedesaan Madura oleh Dr. Naghfir untuk melindungi aset umat dari sengketa."
    },
    {
      id: "art-2",
      slug: "peran-notaris-kepastian-investasi-daerah",
      title: "Kepastian Hukum sebagai Katalis Pembangunan Ekonomi Daerah",
      category: "Hukum Kenotariatan",
      summary: "Bagaimana peran akta autentik dan ketelitian yuridis notaris menciptakan rasa aman bagi pelaku usaha lokal, koperasi, dan investasi yang berkelanjutan di daerah kepulauan.",
      coverImage: "/images/context/hukum-kenotariatan.webp",
      coverCredit: "Dokumentasi Akta & Kepastian Hukum (Unsplash License)",
      referenceSource: "Bahan Kajian Kenotariatan & UU Jabatan Notaris (Dr. Naghfir)",
      content: `Pembangunan ekonomi daerah yang sehat berakar pada kepastian hukum. Tidak ada dunia usaha yang dapat bertumbuh secara kokoh apabila perjanjian bisnis dan hak kepemilikan aset berada dalam ketidakpastian.

Di daerah seperti Sumenep yang kaya potensi maritim, pertanian, dan pariwisata heritage, kehadiran pelaku usaha lokal, koperasi, dan UMKM memerlukan fondasi legalitas yang kuat sejak awal pendirian.

### Notaris Bukan Sekadar Stempel Dokumen

Salah satu kesalahpahaman umum adalah menganggap profesi notaris hanya sebagai pembuat stempel formalitas. Sesungguhnya, notaris adalah pejabat umum yang menguji kehendak para pihak, memastikan kesetaraan posisi tawar, serta menjamin bahwa klausul-klausul yang dituangkan dalam akta autentik tidak bertentangan dengan ketertiban umum dan kesusilaan.

Ketika kepastian hukum hadir:
- Pelaku usaha mendapatkan akses pembiayaan perbankan dengan lancar.
- Kemitraan antarpelaku bisnis berjalan transparan dan terhindar dari wanprestasi sepihak.
- Hak-hak pekerja dan konsumen terlindungi secara berkeadilan.

Membangun iklim hukum yang bersih dan terpercaya di tingkat lokal adalah kontribusi nyata bagi masa depan kesejahteraan masyarakat Madura.`,
      date: "2026-06-20",
      readTime: "4 menit",
      author: "Dr. Naghfir, S.HI., S.H., M.Kn.",
      status: "published",
      featured: true,
      seoTitle: "Kepastian Hukum & Pembangunan Ekonomi Daerah | Dr. Naghfir",
      seoDescription: "Ulasan peran krusial kepastian hukum kenotariatan dalam mendukung pertumbuhan bisnis daerah oleh Dr. Naghfir."
    },
    {
      id: "art-3",
      slug: "harmoni-tradisi-pesantren-dan-hukum-positif",
      title: "Menatap Masa Depan: Harmonisasi Tradisi Pesantren dengan Kebutuhan Hukum Modern",
      category: "Pendidikan Pesantren",
      summary: "Refleksi santri dalam dunia hukum profesional. Membawa ketajaman telaah ushul fiqh ke dalam praktik hukum kenotariatan dan mediasi keperdataan.",
      coverImage: "/images/context/pesantren-santri.webp",
      coverCredit: "Tradisi Santri & Keilmuan Pesantren (Unsplash License)",
      referenceSource: "Kajian Intelektual Pesantren & Etika Hukum (Dr. Naghfir)",
      content: `Bagi seorang santri yang menapaki dunia hukum, kitab kuning dan undang-undang modern bukanlah dua entitas yang saling bertolak belakang. Keduanya sama-sama berikhtiar mencari titik temu antara teks, konteks, dan tujuan kemaslahatan (*maqashid asy-syari'ah*).

Metodologi penafsiran dalam *Ushul Fiqh*—seperti *Saddu adz-dzari'ah* (mencegah mudharat) dan *Jalbul mashalih* (menarik manfaat)—memberikan kerangka berpikir yang sangat tajam ketika seorang notaris menyusun klausul kontrak atau menjadi mediator yang mendamaikan para pihak.

Kejujuran dan kehati-hatian (*ihtiyath*) yang diajarkan oleh para kyai di bilik-bilik pesantren menjadi benteng integritas paling kokoh di tengah godaan kompromi moral di ruang-ruang praktik hukum. Santri masa kini ditantang untuk membuktikan bahwa nilai luhur pesantren mampu menjawab dinamika peradaban digital dan tata kelola global.`,
      date: "2026-04-10",
      readTime: "6 menit",
      author: "Dr. Naghfir, S.HI., S.H., M.Kn.",
      status: "published",
      featured: false,
      seoTitle: "Harmonisasi Nilai Pesantren & Hukum Modern | Dr. Naghfir",
      seoDescription: "Bagaimana tradisi keilmuan pesantren memperkaya integritas dan ketajaman analisis hukum positif."
    },
    {
      id: "art-4",
      slug: "mengurai-problematika-agraria-di-pesisir",
      title: "Mengurai Problematika Hak Tanah dan Kepastian Agraria Masyarakat Pesisir",
      category: "Hukum Pertanahan",
      summary: "Catatan kritis mengenai pemahaman masyarakat pesisir terhadap hak atas tanah, dokumen girik, dan pentingnya pendaftaran tanah sistematis.",
      coverImage: "/images/context/lanskap-sumenep.webp",
      coverCredit: "Lanskap Pesisir Madura (Unsplash License)",
      referenceSource: "Catatan Praktik PPAT & Penyuluhan Agraria (Dr. Naghfir)",
      content: `Karakteristik kepemilikan tanah di daerah pesisir seringkali memiliki kekhasan riwayat adat. Banyak bidang tanah yang diwariskan turun-temurun tanpa dokumen tertulis yang memadai, melainkan hanya berdasar ingatan keluarga atau patok batas alam seperti pohon atau batu karang.

Melalui peran PPAT dan dialog edukatif kemasyarakatan, kita mendorong masyarakat untuk memahami tahapan pendaftaran tanah, konversi riwayat tanah adat ke sertifikat hak milik (SHM), serta pentingnya mencatatkan setiap peralihan hak secara sah di hadapan pejabat berwenang. Kepastian agraria adalah modal dasar ketenteraman hidup warga pesisir.`,
      date: "2026-02-18",
      readTime: "5 menit",
      author: "Dr. Naghfir, S.HI., S.H., M.Kn.",
      status: "published",
      featured: false,
      seoTitle: "Problematika Agraria Pesisir Madura | Dr. Naghfir",
      seoDescription: "Solusi dan panduan hukum pendaftaran tanah bagi masyarakat pedesaan pesisir Madura."
    }
  ],
  activities: [
    {
      id: "act-1",
      title: "Rapat Koordinasi dan Pendampingan Inventarisasi Tanah Wakaf LWPNU Sumenep",
      category: "Organisasi",
      date: "2026-09-12",
      location: "Kantor PCNU Sumenep, Madura",
      description: "Pertemuan koordinasi bersama jajaran pengurus LWPNU Sumenep dan perwakilan MWC NU membahas percepatan pendataan tanah wakaf serta fasilitasi legalitas dokumen di hadapan PPAIW.",
      image: "/images/context/sosial-wakaf.webp",
      imageCredit: "Dokumentasi Khidmah LWPNU Sumenep",
      order: 1
    },
    {
      id: "act-2",
      title: "Pengukuhan Doktor Ekonomi Syariah Pascasarjana UIN Malang",
      category: "Akademik",
      date: "2025-10-22",
      location: "Auditorium UIN Maulana Malik Ibrahim, Malang",
      description: "Sidang senat terbuka pengukuhan gelar Doktor dalam bidang Ekonomi Syariah setelah mempertahankan riset ilmiah mengenai regulasi ekonomi syariah dan tata kelola wakaf.",
      image: "/images/naghfir.webp",
      imageCredit: "Foto Resmi Dr. Naghfir (Dokumentasi Personal)",
      order: 2
    },
    {
      id: "act-3",
      title: "Dialog Interaktif Literasi Hukum Pertanahan untuk Aparatur Desa dan Nadzir",
      category: "Diskusi Publik",
      date: "2026-07-19",
      location: "Kecamatan Pasongsongan, Sumenep",
      description: "Memberikan materi edukatif tentang tata cara pembuatan akta peralihan hak atas tanah, pencegahan sengketa waris, dan pentingnya pendaftaran tanah legal bagi masyarakat pedesaan.",
      image: "/images/context/diskusi-akademik.webp",
      imageCredit: "Dokumentasi Forum Edukasi Hukum Warga",
      order: 3
    },
    {
      id: "act-4",
      title: "Pelayanan dan Penandatanganan Akta Notariil Badan Usaha & Koperasi",
      category: "Profesi",
      date: "2026-05-30",
      location: "Kantor Notaris Dr. Naghfir, Batuan, Sumenep",
      description: "Menjalankan tugas jabatan notaris dalam membacakan dan meresmikan akta pendirian badan hukum koperasi lokal demi mendukung legalitas perekonomian daerah.",
      image: "/images/naghfir-matamaduranews.jpg",
      imageCredit: "Dokumentasi Mata Madura News (Hambali Rasidi)",
      order: 4
    },
    {
      id: "act-5",
      title: "Refleksi Santri dan Pemberdayaan Pelajar Madura",
      category: "Sosial",
      date: "2026-03-15",
      location: "Sumenep, Madura",
      description: "Berbagi inspirasi bersama kader santri dan mahasiswa mengenai peta jalan profesionalitas santri di bidang hukum, birokrasi, dan ekonomi keumatan.",
      image: "/images/context/pesantren-santri.webp",
      imageCredit: "Dokumentasi Forum Santri Sumenep",
      order: 5
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Potret Resmi Dr. Naghfir",
      caption: "Potret resmi akademisi dan Notaris & PPAT Dr. Naghfir, S.HI., S.H., M.Kn.",
      category: "Profil",
      image: "/images/naghfir.webp",
      credit: "Dokumentasi Pribadi Resmi",
      date: "2026"
    },
    {
      id: "gal-2",
      title: "Dr. Naghfir di Meja Akta",
      caption: "Dokumentasi liputan profil kenotariatan Mata Madura News oleh Hambali Rasidi",
      category: "Profesi",
      image: "/images/naghfir-matamaduranews.jpg",
      credit: "Mata Madura News (Hambali Rasidi)",
      date: "2021"
    },
    {
      id: "gal-3",
      title: "Harmoni Tradisi Pesantren Santri",
      caption: "Nilai ketulusan dan adab keilmuan yang ditempa di bilik-bilik pesantren",
      category: "Pesantren",
      image: "/images/context/pesantren-santri.webp",
      credit: "Unsplash Library (Lisensi Bebas)",
      date: "2026"
    },
    {
      id: "gal-4",
      title: "Kepastian Hukum & Hak Tanah Agraria",
      caption: "Instrumen akta autentik kenotariatan dan tertib administrasi pertanahan PPAT",
      category: "Hukum",
      image: "/images/context/hukum-kenotariatan.webp",
      credit: "Unsplash Library",
      date: "2026"
    },
    {
      id: "gal-5",
      title: "Lanskap Pesisir Pasongsongan Sumenep",
      caption: "Karakter tanah kelahiran di pantai utara Sumenep, Madura",
      category: "Lanskap",
      image: "/images/context/lanskap-sumenep.webp",
      credit: "Unsplash Library",
      date: "2026"
    },
    {
      id: "gal-6",
      title: "Warisan Sejarah & Budaya Sumenep",
      caption: "Kekayaan arsitektur dan kearifan lokal masyarakat Madura",
      category: "Budaya",
      image: "/images/context/arsitektur-madura.webp",
      credit: "Unsplash Library",
      date: "2026"
    }
  ],
  videos: [
    {
      id: "vid-1",
      title: "Paparan Refleksi: Peran Santri dalam Kepastian Hukum dan Aset Umat",
      description: "Dokumentasi sesi pemaparan dan diskusi mengenai pentingnya integrasi nilai pesantren dalam penegakan hukum perdata dan wakaf.",
      url: "https://www.youtube.com",
      date: "2026-08-10"
    }
  ],
  publications: [
    {
      id: "pub-1",
      title: "Naghfir: Dari Pesantren ke Meja Akta",
      type: "Media Coverage",
      source: "Mata Madura News",
      author: "Hambali Rasidi",
      date: "2021",
      url: "https://matamaduranews.com/naghfir-dari-pesantren-ke-meja-akta/",
      image: "/images/naghfir-matamaduranews.jpg",
      excerpt: "Artikel liputan biografi profil perjalanan hidup Dr. Naghfir dari masa tempaan di Pondok Pesantren Aqidah Usymuni Terate hingga meraih amanah sebagai Notaris dan Pejabat Pembuat Akta Tanah di Sumenep.",
      isExternalVerified: true,
      notes: "Liputan profil oleh jurnalis senior Hambali Rasidi (Mata Madura News), mendokumentasikan etos kerja santri dari Pasongsongan."
    },
    {
      id: "pub-2",
      title: "Naghfir, Pengurus LWPNU Sumenep Dikukuhkan Notaris Jatim",
      type: "Media Coverage",
      source: "NU Online Jawa Timur",
      author: "Redaksi NU Online",
      date: "2021-12-04",
      url: "https://jatim.nu.or.id",
      image: "/images/context/sosial-wakaf.webp",
      excerpt: "Pemberitaan pengukuhan Dr. Naghfir sebagai Notaris di Jawa Timur, yang mengemban amanah sebagai jajaran pengurus Lembaga Wakaf dan Pertanahan NU (LWPNU) Cabang Sumenep.",
      isExternalVerified: true,
      notes: "Arsip pers resmi NU Online Jatim mendokumentasikan pelantikan notaris dan khidmah keumatan."
    },
    {
      id: "pub-3",
      title: "Disertasi Doktoral: Regulasi dan Dinamika Ekonomi Syariah Kontemporer",
      type: "Jurnal Ilmiah",
      source: "Pascasarjana UIN Maulana Malik Ibrahim Malang",
      author: "Dr. Naghfir",
      date: "2025-10",
      url: "#",
      image: "/images/context/diskusi-akademik.webp",
      excerpt: "Kajian akademik mendalam mengenai integrasi kepatuhan syariah, perlindungan konsumen, dan optimalisasi instrumen wakaf dalam regulasi bisnis nasional.",
      isExternalVerified: true,
      notes: "Disertasi doktoral dalam rangka pengukuhan gelar Doktor Ekonomi Syariah pada Oktober 2025."
    },
    {
      id: "pub-4",
      title: "Tinjauan Yuridis Akta Otentik Notaris dalam Kepastian Transaksi Perdata",
      type: "Buku / Modul",
      source: "Kajian Hukum Kenotariatan",
      author: "Dr. Naghfir, M.Kn.",
      date: "2024",
      url: "#",
      image: "/images/context/hukum-kenotariatan.webp",
      excerpt: "Bahan kajian dan telaah kritis mengenai kekuatan pembuktian akta notaris serta mitigasi risiko yuridis bagi para pihak dalam perikatan keperdataan.",
      isExternalVerified: true,
      notes: "Bahan materi seminar hukum dan literasi perdata."
    }
  ],
  mediaAssets: [
    {
      id: "med-1",
      url: "/images/naghfir.webp",
      title: "Foto Portrait Resmi Dr. Naghfir",
      category: "Tokoh Utama",
      source: "Dokumentasi Personal Resmi",
      photographerOrPublisher: "Dokumentasi Resmi Dr. Naghfir",
      license: "Hak Cipta Personal Terverifikasi",
      permissionStatus: "Izin Resmi Terverifikasi",
      altText: "Potret resmi Dr. Naghfir akademisi dan Notaris PPAT Sumenep",
      assignedTo: ["Hero Section", "Profil Tokoh", "Pengukuhan Doktor 2025"]
    },
    {
      id: "med-2",
      url: "/images/naghfir-matamaduranews.jpg",
      title: "Dr. Naghfir di Meja Akta (Mata Madura News)",
      category: "Tokoh Utama",
      source: "Mata Madura News (matamaduranews.com)",
      photographerOrPublisher: "Hambali Rasidi / Mata Madura News",
      license: "Liputan Jurnalistik Pers (Wajar)",
      permissionStatus: "Kandidat Foto Terverifikasi Pers",
      altText: "Dr. Naghfir Notaris PPAT dalam artikel profil Mata Madura News",
      assignedTo: ["Timeline Notaris 2021", "Publikasi Media", "Aktivitas Profesi"]
    },
    {
      id: "med-3",
      url: "/images/context/pesantren-santri.webp",
      title: "Tradisi & Nilai Keilmuan Pesantren Santri",
      category: "Pesantren",
      source: "Unsplash Library (Islamic Heritage)",
      photographerOrPublisher: "Unsplash Contributor",
      license: "Unsplash License (Bebas Komersial & Personal)",
      permissionStatus: "Lisensi Terbuka (Unsplash/Commons)",
      altText: "Tradisi keilmuan dan adab santri di lingkungan pesantren",
      assignedTo: ["Timeline Pesantren", "Artikel Nilai Pesantren", "Galeri"]
    },
    {
      id: "med-4",
      url: "/images/context/pendidikan-kampus.webp",
      title: "Suasana Akademik Pendidikan Tinggi",
      category: "Akademik",
      source: "Unsplash Higher Education Collection",
      photographerOrPublisher: "Unsplash Contributor",
      license: "Unsplash License",
      permissionStatus: "Lisensi Terbuka (Unsplash/Commons)",
      altText: "Suasana kampus dan studi akademik universitas",
      assignedTo: ["Timeline UIN Malang", "Studi Doktoral"]
    },
    {
      id: "med-5",
      url: "/images/context/diskusi-akademik.webp",
      title: "Forum Diskusi Ilmiah & Riset Hukum",
      category: "Akademik",
      source: "Unsplash Conference & Research",
      photographerOrPublisher: "Unsplash Contributor",
      license: "Unsplash License",
      permissionStatus: "Lisensi Terbuka (Unsplash/Commons)",
      altText: "Forum diskusi ilmiah dan seminar kajian hukum",
      assignedTo: ["Timeline UB", "Aktivitas Dialog Publik"]
    },
    {
      id: "med-6",
      url: "/images/context/hukum-kenotariatan.webp",
      title: "Kepastian Hukum & Instrumen Akta Autentik",
      category: "Hukum & Kenotariatan",
      source: "Unsplash Legal Collection",
      photographerOrPublisher: "Unsplash Contributor",
      license: "Unsplash License",
      permissionStatus: "Lisensi Terbuka (Unsplash/Commons)",
      altText: "Timbangan keadilan dan dokumen perikatan akta kenotariatan",
      assignedTo: ["Timeline PPAT", "Artikel Kepastian Hukum", "Galeri"]
    },
    {
      id: "med-7",
      url: "/images/context/kegiatan-organisasi.webp",
      title: "Konsolidasi Organisasi & Audiensi Masyarakat",
      category: "Organisasi & Wakaf",
      source: "Unsplash Organization Collection",
      photographerOrPublisher: "Unsplash Contributor",
      license: "Unsplash License",
      permissionStatus: "Lisensi Terbuka (Unsplash/Commons)",
      altText: "Aktivitas organisasi dan musyawarah kemasyarakatan",
      assignedTo: ["Timeline PMII", "Aktivitas Organisasi"]
    },
    {
      id: "med-8",
      url: "/images/context/sosial-wakaf.webp",
      title: "Perlindungan Tanah Wakaf & Rumah Ibadah Umat",
      category: "Organisasi & Wakaf",
      source: "Unsplash Community Heritage",
      photographerOrPublisher: "Unsplash Contributor",
      license: "Unsplash License",
      permissionStatus: "Lisensi Terbuka (Unsplash/Commons)",
      altText: "Masjid dan sarana ibadah umat di pedesaan",
      assignedTo: ["Khidmah LWPNU Sumenep", "Artikel Tanah Wakaf", "Aktivitas LWPNU"]
    },
    {
      id: "med-9",
      url: "/images/context/lanskap-sumenep.webp",
      title: "Lanskap Pesisir Pasongsongan Sumenep",
      category: "Lanskap & Budaya",
      source: "Unsplash Coastal Landscape",
      photographerOrPublisher: "Unsplash Contributor",
      license: "Unsplash License",
      permissionStatus: "Lisensi Terbuka (Unsplash/Commons)",
      altText: "Pesisir pantai utara Pasongsongan Sumenep Madura",
      assignedTo: ["Timeline Desa Campaka", "Artikel Agraria Pesisir", "Galeri"]
    },
    {
      id: "med-10",
      url: "/images/context/arsitektur-madura.webp",
      title: "Karakter Budaya & Arsitektur Madura",
      category: "Lanskap & Budaya",
      source: "Unsplash Architectural Heritage",
      photographerOrPublisher: "Unsplash Contributor",
      license: "Unsplash License",
      permissionStatus: "Lisensi Terbuka (Unsplash/Commons)",
      altText: "Arsitektur warisan budaya dan kearifan lokal Madura",
      assignedTo: ["Galeri Budaya", "Footer Context"]
    }
  ],
  contact: {
    email: "kontak@naghfir.id",
    phoneNote: "Pelayanan resmi kenotariatan dan konsultasi akademik terjadwal melalui kantor resmi.",
    location: "Sumenep, Madura, Indonesia",
    officeAddress: "Jl. Jokotole – Perum Griya Berkat Regency Gg. III No. 24 (Lingkar Barat), Kec. Batuan, Kab. Sumenep, Jawa Timur",
    addressNote: "Kantor Notaris & PPAT Dr. Naghfir beroperasi secara resmi berdasar SK Kemenkumham RI dan ATR/BPN.",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com"
    }
  },
  messages: [
    {
      id: "msg-1",
      name: "Ahmad Fawaid",
      email: "fawaid@example.com",
      subject: "Permohonan Diskusi Literasi Tanah Wakaf",
      message: "Assalamu'alaikum Dr. Naghfir, kami dari pengurus yayasan di wilayah Pasongsongan ingin berkonsultasi mengenai proses sertifikasi tanah wakaf masjid kami.",
      date: "2026-10-02 10:15",
      isRead: false
    }
  ],
  seo: {
    siteTitle: "Dr. Naghfir | Notaris & PPAT · Akademisi · Penggerak Sosial",
    metaDescription: "Website resmi Dr. Naghfir, S.HI., S.H., M.Kn., CPM., CH., C.Ht. - Notaris & PPAT, Akademisi, dan Penggerak Sosial. Ilmu, Hukum, dan Pengabdian. Sumenep, Madura.",
    keywords: "Dr. Naghfir, Notaris PPAT Sumenep, Notaris Madura, Akademisi Hukum, Penggerak Sosial Sumenep, LWPNU Sumenep, Kepastian Hukum Madura",
    ogImage: "/images/naghfir.webp",
    canonicalUrl: "https://naghfir.id",
    authorName: "Dr. Naghfir"
  },
  auditLogs: [
    {
      id: "log-1",
      timestamp: "2026-11-09 13:50:00",
      user: "Admin System",
      action: "System Initialization",
      detail: "Inisialisasi data profil resmi Dr. Naghfir dengan verifikasi dokumen faktual dan media terakreditasi."
    }
  ]
};
