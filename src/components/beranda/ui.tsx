import React from 'react';

/** Monogram "N" emas — identitas visual personal Dr. Naghfir. */
export function Monogram({ className = 'text-[34px]' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`select-none bg-gradient-to-b from-[#D5B05C] via-[#B88B34] to-[#8F6820] bg-clip-text pr-0.5 font-serif font-bold italic leading-none text-transparent ${className}`}
    >
      N
    </span>
  );
}

/** Ikon WhatsApp (glyph) agar tombol langsung dikenali. */
export function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.34 9.34 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.4 9.4zm8-17.41A11.27 11.27 0 0 0 12.04.75C5.8.75.72 5.82.72 12.06c0 2 .52 3.94 1.51 5.65L.62 23.6l6.02-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.24 0 11.31-5.08 11.32-11.32 0-3.02-1.18-5.87-3.32-8z" />
    </svg>
  );
}

/** Label kecil penanda data dummy pada prototipe. */
export function DummyTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed border-current px-2 py-px text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70 ${className}`}
    >
      Contoh
    </span>
  );
}
