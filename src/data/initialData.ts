export interface ProfileData {
  name: string;
  shortName: string;
  degrees: string;
  origin: string;
  tagline: string;
  headline: string;
  subheadline: string;
  heroImage: string;
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
  order: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Pendidikan' | 'Pesantren' | 'Profesi' | 'Organisasi' | 'Pengabdian';
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
  status: 'published' | 'draft';
  featured: boolean;
  coverImage?: string;
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
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
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
  isExternalVerified: boolean;
  notes?: string;
}

export interface ContactSettings {
  email: string;
  phoneNote: string;
  location: string;
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
    origin: "Desa Campaka, Kecamatan Pasongsongan, Kabupaten Sumenep, Madura",
    tagline: "Santri | Akademisi | Notaris | Penggerak Sosial",
    headline: "Dari Pesantren, Mengabdi untuk Masyarakat.",
    subheadline: "Berangkat dari tradisi pesantren, menempuh perjalanan akademik, mengembangkan profesi di bidang hukum, dan mengambil bagian dalam pengabdian masyarakat di tanah kelahiran, Sumenep.",
    heroImage: "/images/naghfir.webp",
    aboutIntro: "Perjalanan hidup Dr. Naghfir adalah kisah konsistensi seorang santri dari Pasongsongan yang menapaki dunia akademik hingga meraih gelar doktor, memegang amanah profesi kenotariatan, dan senantiasa berlabuh pada pengabdian sosial kemasyarakatan.",
    aboutStory: [
      "Lahir dan dibesarkan di Desa Campaka, Pasongsongan, Sumenep, Dr. Naghfir mengawali tempaan karakternya di lingkungan Pondok Pesantren Aqidah Usymuni Terate, Pandian. Nilai-nilai kesantrian—kejujuran, tawaduk, kecermatan, dan tanggung jawab terhadap umat—menjadi suluh utama dalam setiap tahapan hidupnya.",
      "Kecintaan pada ilmu membawanya menempuh pendidikan hukum syariah di UIN Maulana Malik Ibrahim Malang, disusul pendidikan hukum, Magister Kenotariatan di Universitas Brawijaya, hingga menyelesaikan studi doktoral di bidang Ekonomi Syariah di UIN Maulana Malik Ibrahim Malang (pengukuhan Oktober 2025).",
      "Sebagai Notaris dan PPAT yang telah disumpah pada tahun 2021, Dr. Naghfir menempatkan akta bukan sekadar dokumen administratif, melainkan instrumen kepastian hukum dan perlindungan keadilan masyarakat. Bersamaan dengan itu, kiprahnya sebagai akademisi dan aktivis pengelola aset wakaf NU di Sumenep menjadi wujud nyata baktinya pada tanah Madura."
    ],
    coreIdentities: [
      {
        number: "01",
        title: "Akademisi",
        subtitle: "Pendidikan & Pengembangan Keilmuan",
        description: "Menempuh pendidikan hingga jenjang Doktoral di bidang Ekonomi Syariah. Aktif dalam diskursus ilmiah, penulisan hukum, kajian kepatuhan syariah, serta berbagi ilmu dengan mahasiswa dan generasi muda.",
        highlights: [
          "Doktor Ekonomi Syariah UIN Maulana Malik Ibrahim Malang",
          "Magister Kenotariatan Fakultas Hukum Universitas Brawijaya",
          "Fokus riset regulasi ekonomi syariah, wakaf, dan hukum perdata",
          "Narasumber seminar hukum dan pelatihan kepemudaan"
        ]
      },
      {
        number: "02",
        title: "Profesional Hukum",
        subtitle: "Notaris & Pejabat Pembuat Akta Tanah (PPAT)",
        description: "Menjalankan profesi hukum dengan integritas tinggi, memberikan kepastian hukum yang adil dan dapat diandalkan bagi masyarakat, koperasi, perbankan, dan badan usaha.",
        highlights: [
          "Notaris & PPAT resmi tersumpah (2021)",
          "Pelayanan akta autentik, perikatan, dan pertanahan",
          "Sertifikasi Mediator Profesional (CPM)",
          "Advokasi legalitas badan hukum, koperasi, dan UMKM"
        ]
      },
      {
        number: "03",
        title: "Pengabdian Sosial",
        subtitle: "Aktivis Organisasi & Advokasi Aset Umat",
        description: "Mengakar kuat dalam tradisi kemasyarakatan Madura. Berkhidmat melalui Lembaga Wakaf dan Pertanahan NU (LWPNU) untuk melindungi dan melegalkan aset-aset wakaf demi kemaslahatan bersama.",
        highlights: [
          "Pengurus Lembaga Wakaf dan Pertanahan Nahdlatul Ulama (LWPNU) Sumenep",
          "Pendampingan inventarisasi dan legalitas sertifikasi tanah wakaf",
          "Kader dan alumni Pergerakan Mahasiswa Islam Indonesia (PMII)",
          "Penggerak literasi hukum dan pemberdayaan santri pedesaan"
        ]
      }
    ]
  },
  education: [
    {
      id: "edu-1",
      institution: "Pondok Pesantren Aqidah Usymuni Terate",
      degree: "Pendidikan Pesantren",
      field: "Tafaqquh Fiddin & Karakter Santri",
      period: "Masa Pendidikan Pesantren",
      location: "Pandian, Sumenep, Madura",
      description: "Fondasi keagamaan, pembentukan integritas, kajian kitab kuning, dan filosofi pengabdian umat.",
      order: 1
    },
    {
      id: "edu-2",
      institution: "Universitas Islam Negeri (UIN) Maulana Malik Ibrahim Malang",
      degree: "Sarjana Hukum Islam (S.HI.)",
      field: "Hukum Syariah",
      period: "Pendidikan Sarjana",
      location: "Malang, Jawa Timur",
      description: "Mendalami hukum perdata Islam, ushul fiqh, dan kaidah hukum syariat serta aktif dalam organisasi pergerakan mahasiswa.",
      order: 2
    },
    {
      id: "edu-3",
      institution: "Fakultas Hukum Universitas",
      degree: "Sarjana Hukum (S.H.)",
      field: "Ilmu Hukum",
      period: "Pendidikan Sarjana",
      location: "Jawa Timur",
      description: "Penguatan kompetensi ilmu hukum positif, hukum perdata, hukum perikatan, dan hukum agraria.",
      order: 3
    },
    {
      id: "edu-4",
      institution: "Universitas Brawijaya (UB)",
      degree: "Magister Kenotariatan (M.Kn.)",
      field: "Hukum Kenotariatan & Agraria",
      period: "Pendidikan Pascasarjana",
      location: "Malang, Jawa Timur",
      description: "Spesialisasi pembuatan akta autentik, hukum pertanahan, perikatan bisnis, dan tata kelola kenotariatan.",
      order: 4
    },
    {
      id: "edu-5",
      institution: "Universitas Islam Negeri (UIN) Maulana Malik Ibrahim Malang",
      degree: "Doktor (Dr.)",
      field: "Ekonomi Syariah",
      period: "Lulus & Pengukuhan Oktober 2025",
      location: "Malang, Jawa Timur",
      description: "Riset doktoral mendalam mengenai hukum dan regulasi ekonomi syariah, integrasi instrumen wakaf produktif, serta penguatan ekonomi berbasis kemaslahatan.",
      order: 5
    }
  ],
  timeline: [
    {
      id: "time-1",
      year: "Akar Kehidupan",
      title: "Masa Kecil di Desa Campaka",
      subtitle: "Pasongsongan, Sumenep",
      description: "Tumbuh di lingkungan pedesaan pantai utara Madura. Kehidupan bersahaja masyarakat pesisir dan pedesaan menanamkan empati sosial serta nilai ketulusan yang membekas kuat.",
      category: "Pesantren",
      order: 1
    },
    {
      id: "time-2",
      year: "Kawah Candradimuka",
      title: "Pendidikan Pesantren di Aqidah Usymuni",
      subtitle: "Terate, Pandian, Sumenep",
      description: "Menempa diri dengan ilmu agama, kedisiplinan santri, dan tata krama keilmuan. Lingkungan pesantren mengajarkan tanggung jawab moral seorang penuntut ilmu.",
      category: "Pesantren",
      order: 2
    },
    {
      id: "time-3",
      year: "Jejak Akademik",
      title: "Pendidikan Tinggi Hukum Syariah",
      subtitle: "UIN Maulana Malik Ibrahim Malang",
      description: "Melanjutkan studi ke kota Malang mendalami Hukum Syariah. Memadukan wawasan keagamaan tradisional pesantren dengan metodologi akademik modern.",
      category: "Pendidikan",
      order: 3
    },
    {
      id: "time-4",
      year: "Pengasahan Nalar",
      title: "Kiprah Pergerakan di PMII",
      subtitle: "Malang & Jawa Timur",
      description: "Terlibat aktif dalam Pergerakan Mahasiswa Islam Indonesia (PMII). Mengasah nalar kritis, wawasan kebangsaan, dan kepemimpinan dalam advokasi masyarakat.",
      category: "Organisasi",
      order: 4
    },
    {
      id: "time-5",
      year: "Spesialisasi",
      title: "Magister Kenotariatan di Universitas Brawijaya",
      subtitle: "Fakultas Hukum UB Malang",
      description: "Menempuh pendidikan profesi kenotariatan di salah satu kampus hukum terkemuka, menguasai hukum perikatan, akta pertanahan, dan hukum perseroan.",
      category: "Pendidikan",
      order: 5
    },
    {
      id: "time-6",
      year: "Kompetensi",
      title: "Perjalanan Profesi dan Ujian PPAT",
      subtitle: "Spesialisasi Hukum Pertanahan",
      description: "Menjalani tahapan verifikasi, ujian keahlian, dan pemenuhan kualifikasi Pejabat Pembuat Akta Tanah (PPAT) dengan komitmen ketelitian agraria.",
      category: "Profesi",
      order: 6
    },
    {
      id: "time-7",
      year: "2021",
      title: "Pengangkatan & Sumpah Jabatan Notaris",
      subtitle: "Resmi Mengemban Amanah Kenotariatan",
      description: "Berdasarkan verifikasi dokumen resmi, diambil sumpah jabatan sebagai Notaris pada tahun 2021 untuk melayani masyarakat dalam pembuatan akta autentik berkekuatan hukum.",
      category: "Profesi",
      order: 7
    },
    {
      id: "time-8",
      year: "Riset Lanjutan",
      title: "Studi Doktoral Ekonomi Syariah",
      subtitle: "Pascasarjana UIN Maliki Malang",
      description: "Memperdalam dialektika hukum bisnis syariah, tata kelola wakaf kontemporer, dan regulasi ekonomi berkeadilan di tingkat doktoral.",
      category: "Pendidikan",
      order: 8
    },
    {
      id: "time-9",
      year: "Oktober 2025",
      title: "Pengukuhan Gelar Doktor",
      subtitle: "Puncak Pencapaian Akademik Strata Tiga",
      description: "Sesuai verifikasi dokumen, resmi dikukuhkan sebagai Doktor dalam bidang Ekonomi Syariah setelah mempertahankan disertasi mengenai regulasi dan kemaslahatan ekonomi umat.",
      category: "Pendidikan",
      order: 9
    },
    {
      id: "time-10",
      year: "Kini & Masa Depan",
      title: "Dedikasi Profesional & Sosial di Sumenep",
      subtitle: "Membangun Tanah Kelahiran Madura",
      description: "Kembali ke Sumenep memadukan peran notaris, akademisi, dan penggerak perlindungan aset wakaf di LWPNU Sumenep demi kepastian hukum warga.",
      category: "Pengabdian",
      order: 10
    }
  ],
  professional: [
    {
      id: "prof-1",
      title: "Notaris",
      role: "Pejabat Umum Pembuat Akta Autentik",
      badge: "Tersumpah 2021",
      description: "Mengemban wewenang kenotariatan untuk membuat akta autentik mengenai semua perbuatan, perjanjian, dan ketetapan yang diharuskan oleh peraturan perundang-undangan.",
      services: [
        "Pendirian Perseroan Terbatas (PT), Yayasan, & Koperasi",
        "Akta Perjanjian Bisnis, Kerjasama, & Sewa Menyewa",
        "Legalisasi & Waarmerking Dokumen Hukum",
        "Wasiat, Waris, & Kuasa Notariil"
      ],
      order: 1
    },
    {
      id: "prof-2",
      title: "Pejabat Pembuat Akta Tanah (PPAT)",
      role: "Hukum Agraria & Pertanahan",
      badge: "PPAT Resmi",
      description: "Melaksanakan sebagian kegiatan pendaftaran tanah dengan membuat akta sebagai bukti telah dilakukannya perbuatan hukum tertentu mengenai hak atas tanah.",
      services: [
        "Akta Jual Beli (AJB) Hak Atas Tanah",
        "Akta Hibah & Tukar Menukar Tanah",
        "Akta Pembagian Hak Bersama (APHB)",
        "Pemberian Hak Tanggungan & Roya"
      ],
      order: 2
    },
    {
      id: "prof-3",
      title: "Konsultasi Legalitas & Ekonomi Syariah",
      role: "Kepastian Transaksi Syariah",
      badge: "Keahlian Doktoral",
      description: "Memberikan telaah kepatuhan syariah (sharia compliance) dalam kontrak bisnis, restrukturisasi akad, serta legalitas kelembagaan ekonomi umat.",
      services: [
        "Legal drafting akad-akad muamalah syariah",
        "Tata kelola hukum koperasi simpan pinjam syariah (KSPPS)",
        "Legalitas sertifikasi dan pengelolaan aset wakaf produktif",
        "Mediasi sengketa keperdataan bisnis (CPM)"
      ],
      order: 3
    }
  ],
  socialContribution: [
    {
      id: "soc-1",
      title: "Lembaga Wakaf dan Pertanahan NU (LWPNU) Sumenep",
      role: "Pengurus & Advokasi Aset Umat",
      organization: "PCNU Kabupaten Sumenep",
      description: "Terlibat aktif dalam gerakan pengamanan, pendataan, dan sertifikasi tanah wakaf masjid, musholla, madrasah, dan kuburan umum di seluruh penjuru Kabupaten Sumenep agar terlindungi dari sengketa.",
      focusArea: "Perlindungan & Sertifikasi Aset Wakaf",
      highlights: [
        "Sosialisasi pentingnya Akta Ikrar Wakaf (AIW) kepada nadzir desa",
        "Fasilitasi sinergi nadzir dengan Kementerian Agama dan BPN Sumenep",
        "Penyelesaian sengketa batas dan riwayat kepemilikan tanah wakaf",
        "Pemberdayaan kemandirian ekonomi nadzir berbasis aset produktif"
      ],
      order: 1
    },
    {
      id: "soc-2",
      title: "Literasi Hukum & Edukasi Masyarakat Desa",
      role: "Inisiator Diskusi Publik",
      organization: "Komunitas Literasi & Kepemudaan",
      description: "Membuka ruang dialog bagi warga desa, santri, dan kelompok pemuda mengenai pentingnya tertib hukum kepemilikan tanah dan perikatan usaha agar terhindar dari perkara perdata yang merugikan.",
      focusArea: "Penyuluhan Hukum Kerakyatan",
      highlights: [
        "Bedah regulasi pertanahan untuk aparat desa dan tokoh masyarakat",
        "Pencegahan sengketa waris dan tanah girik/letter C",
        "Mendorong generasi muda Madura sadar hukum dan melek legalitas"
      ],
      order: 2
    },
    {
      id: "soc-3",
      title: "Kaderisasi dan Jejaring Alumni Pesantren",
      role: "Motivator & Mentor Akademik",
      organization: "Alumni Pesantren & Jejaring Intelektual Santri",
      description: "Menjadi jembatan bagi santri-santri muda di Sumenep untuk melanjutkan pendidikan tinggi dan tidak ragu mengambil peran kepemimpinan profesional di tingkat nasional.",
      focusArea: "Pemberdayaan Santri Madura",
      highlights: [
        "Mentoring beasiswa dan studi lanjut bagi alumni pesantren",
        "Penguatan jejaring santri profesional di bidang hukum dan ekonomi",
        "Menanamkan etos kemandirian 'Santri Mengabdi untuk Negeri'"
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
      category: "Hukum dan Masyarakat",
      summary: "Bagaimana peran akta autentik dan ketelitian yuridis notaris menciptakan rasa aman bagi pelaku usaha lokal dan investasi yang berkelanjutan di daerah kepulauan.",
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
      category: "Pesantren dan Pendidikan",
      summary: "Refleksi santri dalam dunia hukum profesional. Membawa ketajaman telaah ushul fiqh ke dalam praktik hukum kenotariatan dan mediasi keperdataan.",
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
      category: "Hukum Agraria dan Pertanahan",
      summary: "Catatan kritis mengenai pemahaman masyarakat pesisir terhadap hak atas tanah, dokumen girik, dan pentingnya pendaftaran tanah sistematis.",
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
      order: 1
    },
    {
      id: "act-2",
      title: "Pengukuhan Doktor Ekonomi Syariah Pascasarjana UIN Malang",
      category: "Akademik",
      date: "2025-10-22",
      location: "Auditorium UIN Maulana Malik Ibrahim, Malang",
      description: "Sidang senat terbuka pengukuhan gelar Doktor dalam bidang Ekonomi Syariah setelah mempertahankan riset ilmiah mengenai regulasi ekonomi syariah dan tata kelola wakaf.",
      order: 2
    },
    {
      id: "act-3",
      title: "Dialog Interaktif Literasi Hukum Pertanahan untuk Aparatur Desa dan Nadzir",
      category: "Diskusi Publik",
      date: "2026-07-19",
      location: "Kecamatan Pasongsongan, Sumenep",
      description: "Memberikan materi edukatif tentang tata cara pembuatan akta peralihan hak atas tanah, pencegahan sengketa waris, dan pentingnya pendaftaran tanah legal bagi masyarakat pedesaan.",
      order: 3
    },
    {
      id: "act-4",
      title: "Pelayanan dan Penandatanganan Akta Notariil Badan Usaha & Yayasan",
      category: "Profesi",
      date: "2026-05-30",
      location: "Sumenep, Madura",
      description: "Menjalankan tugas jabatan notaris dalam membacakan dan meresmikan akta pendirian badan hukum koperasi lokal demi mendukung legalitas perekonomian daerah.",
      order: 4
    },
    {
      id: "act-5",
      title: "Diskusi Refleksi Santri dan Pergerakan Kepemudaan",
      category: "Sosial",
      date: "2026-03-15",
      location: "Sumenep, Madura",
      description: "Berbagi inspirasi bersama kader santri dan mahasiswa mengenai peta jalan profesionalitas santri di bidang hukum, birokrasi, dan ekonomi keumatan.",
      order: 5
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Portrait Resmi Dr. Naghfir",
      caption: "Potret resmi akademisi dan notaris Dr. Naghfir, S.HI., S.H., M.Kn.",
      category: "Profil",
      image: "/images/naghfir.webp",
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
      excerpt: "Artikel liputan biografi profil perjalanan hidup Dr. Naghfir dari masa tempaan di Pondok Pesantren Aqidah Usymuni Terate hingga meraih amanah sebagai Notaris dan Pejabat Pembuat Akta Tanah di Sumenep.",
      isExternalVerified: true,
      notes: "Liputan profil oleh jurnalis senior Hambali Rasidi (Mata Madura News), mendokumentasikan etos kerja santri dari Pasongsongan."
    },
    {
      id: "pub-2",
      title: "Disertasi Doktoral: Regulasi dan Dinamika Ekonomi Syariah Kontemporer",
      type: "Jurnal Ilmiah",
      source: "Pascasarjana UIN Maulana Malik Ibrahim Malang",
      author: "Dr. Naghfir",
      date: "2025-10",
      url: "#",
      excerpt: "Kajian akademik mendalam mengenai integrasi kepatuhan syariah, perlindungan konsumen, dan optimalisasi instrumen wakaf dalam regulasi bisnis nasional.",
      isExternalVerified: true,
      notes: "Disertasi doktoral dalam rangka pengukuhan gelar Doktor Ekonomi Syariah pada Oktober 2025."
    },
    {
      id: "pub-3",
      title: "Tinjauan Yuridis Akta Otentik Notaris dalam Kepastian Transaksi Perdata",
      type: "Buku / Modul",
      source: "Kajian Hukum Kenotariatan",
      author: "Dr. Naghfir, M.Kn.",
      date: "2024",
      url: "#",
      excerpt: "Bahan kajian dan telaah kritis mengenai kekuatan pembuktian akta notaris serta mitigasi risiko yuridis bagi para pihak dalam perikatan keperdataan.",
      isExternalVerified: true,
      notes: "Bahan materi seminar hukum dan literasi perdata."
    }
  ],
  contact: {
    email: "kontak@naghfir.id",
    phoneNote: "Pelayanan resmi kenotariatan dan konsultasi akademik terjadwal melalui kantor dan sekretariat.",
    location: "Kabupaten Sumenep, Madura, Jawa Timur",
    addressNote: "Informasi detail alamat dan kontak kantor resmi diverifikasi sesuai izin operasional kenotariatan.",
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
    siteTitle: "Dr. Naghfir | Santri, Akademisi, Notaris, Penggerak Sosial",
    metaDescription: "Website resmi Dr. Naghfir, S.HI., S.H., M.Kn., CPM., CH., C.Ht. - Dari Pesantren, Mengabdi untuk Masyarakat. Perjalanan hidup, pemikiran hukum, dan pengabdian sosial asal Sumenep, Madura.",
    keywords: "Dr. Naghfir, Notaris Sumenep, PPAT Sumenep, LWPNU Sumenep, Santri Notaris, Doktor Ekonomi Syariah, Pasongsongan Sumenep, Tokoh Madura",
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
      detail: "Inisialisasi data profil resmi Dr. Naghfir dengan verifikasi dokumen faktual."
    }
  ]
};
