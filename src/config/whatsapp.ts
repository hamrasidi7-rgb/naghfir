/**
 * Konfigurasi Nomor WhatsApp Terpusat — Website Resmi Dr. Naghfir
 *
 * ATURAN PENTING:
 * - Gunakan satu konfigurasi nomor WhatsApp terpusat.
 * - Jangan mengarang nomor.
 * - Gunakan tautan wa.me dan encodeURIComponent.
 */

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 'GANTI_DENGAN_NOMOR_RESMI';

export const WHATSAPP_MESSAGES = {
  header:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, saya ingin menghubungi kantor untuk informasi layanan dan jadwal konsultasi.',
  hero:
    'Assalamu’alaikum Wr. Wb. Dr. Naghfir, saya ingin berkonsultasi mengenai layanan Notaris & PPAT di Kabupaten Sumenep.',
  notaris:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris Dr. Naghfir, saya ingin berkonsultasi mengenai Layanan Notaris (Pembuatan Akta Autentik / Pendirian Badan Usaha & Koperasi / Perjanjian).',
  ppat:
    'Assalamu’alaikum Wr. Wb. Kantor PPAT Dr. Naghfir, saya ingin berkonsultasi mengenai Layanan PPAT & Pertanahan (AJB / Hibah / APHB Waris / Pengecekan & Balik Nama Sertifikat).',
  kontak:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, saya ingin menanyakan jadwal kunjungan dan konsultasi di kantor Batuan, Sumenep.',
  floating:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, mohon informasi jadwal konsultasi layanan Notaris & PPAT.',
} as const;

export type WhatsAppTopic = keyof typeof WHATSAPP_MESSAGES;

/**
 * Menormalkan nomor telepon apabila sudah diisi dengan nomor resmi,
 * atau mempertahankan placeholder "GANTI_DENGAN_NOMOR_RESMI" jika belum diganti.
 */
export function resolveWhatsAppNumber(customNumber?: string): string {
  const candidate = (customNumber && customNumber.trim()) || WHATSAPP_NUMBER;

  if (candidate === 'GANTI_DENGAN_NOMOR_RESMI') {
    return WHATSAPP_NUMBER;
  }

  const digits = candidate.replace(/\D/g, '');
  if (!digits) {
    return WHATSAPP_NUMBER;
  }

  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`;
  }
  if (digits.startsWith('62')) {
    return digits;
  }
  return `62${digits}`;
}

/**
 * Menghasilkan tautan wa.me dengan pesan otomatis yang menyesuaikan layanan yang dipilih
 * menggunakan encodeURIComponent.
 */
export function getWhatsAppUrl(
  topicOrCustomMessage: WhatsAppTopic | string = 'floating',
  customNumber?: string
): string {
  const number = resolveWhatsAppNumber(customNumber);
  const message =
    topicOrCustomMessage in WHATSAPP_MESSAGES
      ? WHATSAPP_MESSAGES[topicOrCustomMessage as WhatsAppTopic]
      : topicOrCustomMessage;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Menghasilkan tautan wa.me dengan pesan otomatis spesifik berdasarkan nama layanan Notaris / PPAT yang dipilih.
 */
export function getServiceWhatsAppUrl(
  group: 'Notaris' | 'PPAT',
  serviceName?: string,
  customNumber?: string
): string {
  if (!serviceName) {
    return getWhatsAppUrl(group === 'Notaris' ? 'notaris' : 'ppat', customNumber);
  }

  const customMessage = `Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, saya ingin berkonsultasi mengenai Layanan ${group}: "${serviceName}". Mohon informasi persyaratan dan jadwal konsultasinya.`;
  return getWhatsAppUrl(customMessage, customNumber);
}
