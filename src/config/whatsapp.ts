/**
 * Konfigurasi Nomor WhatsApp Terpusat — Website Dr. Naghfir
 *
 * STATUS: PROTOTIPE.
 * Nomor di bawah adalah NOMOR DUMMY (sengaja tidak valid) agar tombol WhatsApp
 * dapat diuji tanpa mengirim pesan ke nomor milik siapa pun.
 *
 * Cara mengganti dengan nomor resmi (pilih salah satu):
 * 1. Isi variabel lingkungan NEXT_PUBLIC_WHATSAPP_NUMBER (mis. di .env.local), atau
 * 2. Isi "Nomor WhatsApp" pada CMS (/admin/kontak) — nilai CMS diprioritaskan.
 */

export const WHATSAPP_DUMMY_NUMBER = '6280000000000';

/** Placeholder lama yang mungkin masih tersimpan di data/CMS. */
const LEGACY_PLACEHOLDER = 'GANTI_DENGAN_NOMOR_RESMI';

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_DUMMY_NUMBER;

export const WHATSAPP_MESSAGES = {
  header:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, saya ingin menanyakan informasi layanan dan jadwal konsultasi.',
  hero:
    'Assalamu’alaikum Wr. Wb. Dr. Naghfir, saya ingin berkonsultasi mengenai layanan Notaris & PPAT di Kabupaten Sumenep.',
  notaris:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris Dr. Naghfir, saya ingin berkonsultasi mengenai Layanan Notaris.',
  ppat:
    'Assalamu’alaikum Wr. Wb. Kantor PPAT Dr. Naghfir, saya ingin berkonsultasi mengenai Layanan PPAT.',
  pertanahan:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, saya ingin berkonsultasi mengenai urusan pertanahan.',
  kontak:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, saya ingin menanyakan jadwal kunjungan dan konsultasi di kantor Batuan, Sumenep.',
  floating:
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir, mohon informasi jadwal konsultasi layanan Notaris & PPAT.',
} as const;

export type WhatsAppTopic = keyof typeof WHATSAPP_MESSAGES;

/**
 * Menormalkan nomor ke format internasional (62…).
 * Prioritas: nomor dari CMS → env NEXT_PUBLIC_WHATSAPP_NUMBER → nomor dummy.
 */
export function resolveWhatsAppNumber(customNumber?: string): string {
  const candidate = (customNumber && customNumber.trim()) || WHATSAPP_NUMBER;
  if (candidate === LEGACY_PLACEHOLDER) {
    return WHATSAPP_NUMBER === LEGACY_PLACEHOLDER ? WHATSAPP_DUMMY_NUMBER : WHATSAPP_NUMBER;
  }

  const digits = candidate.replace(/\D/g, '');
  if (!digits) return WHATSAPP_DUMMY_NUMBER;
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('62')) return digits;
  return `62${digits}`;
}

/** True bila tombol WhatsApp masih memakai nomor dummy prototipe. */
export function isDummyWhatsAppNumber(customNumber?: string): boolean {
  return resolveWhatsAppNumber(customNumber) === WHATSAPP_DUMMY_NUMBER;
}

/** Format tampilan, mis. 6281234567890 → +62 812-3456-7890 */
export function formatWhatsAppDisplay(customNumber?: string): string {
  const digits = resolveWhatsAppNumber(customNumber);
  const local = digits.slice(2);
  const parts = [local.slice(0, 3), local.slice(3, 7), local.slice(7)].filter(Boolean);
  return `+62 ${parts.join('-')}`;
}

/**
 * Menghasilkan tautan wa.me dengan pesan otomatis (encodeURIComponent).
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
 * Tautan wa.me dengan pesan spesifik berdasarkan layanan Notaris / PPAT yang dipilih.
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
