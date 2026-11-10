'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  RotateCcw,
  Video,
} from 'lucide-react';
import {
  CONSULT_MODES,
  CategoryId,
  ConsultModeId,
  SERVICE_CATEGORIES,
  TIME_SLOTS,
  findService,
  isSlotFull,
} from '@/data/prototype/consultation';
import { getWhatsAppUrl, isDummyWhatsAppNumber } from '@/config/whatsapp';
import { DummyTag, WhatsAppIcon } from './ui';

export interface SimulatorSelection {
  categoryId: CategoryId;
  serviceId: string;
  nonce: number;
}

interface ConsultationSimulatorProps {
  initial: SimulatorSelection;
  whatsappNumber?: string;
}

const STEPS_3 = [
  { label: 'Pilih Layanan', hint: 'Kelompok & jenis layanan' },
  { label: 'Waktu & Media', hint: 'Jadwal tatap muka atau daring' },
  { label: 'Konfirmasi', hint: 'Kirim ringkasan via WhatsApp' },
];

/** 6 hari kerja berikutnya (Senin–Sabtu), dimulai besok. */
function nextWorkingDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(new Date(d));
  }
  return days;
}

const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) => d.toLocaleDateString('id-ID', opts);

export default function ConsultationSimulator({ initial, whatsappNumber }: ConsultationSimulatorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [categoryId, setCategoryId] = useState<CategoryId>(initial.categoryId);
  const [serviceId, setServiceId] = useState(initial.serviceId);
  const [mode, setMode] = useState<ConsultModeId>('kantor');
  const [days, setDays] = useState<Date[]>([]);
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [ticket, setTicket] = useState('');

  const { category, service } = findService(categoryId, serviceId);
  const modeInfo = CONSULT_MODES.find((m) => m.id === mode)!;
  const chosenDay = dayIdx !== null && days[dayIdx] ? days[dayIdx] : null;

  useEffect(() => {
    if (days.length === 0) {
      setDays(nextWorkingDays(6));
    }
  }, [days.length]);

  // Gulir ke awal simulator saat berpindah langkah di layar kecil
  useEffect(() => {
    const el = rootRef.current;
    if (el && step > 1 && el.getBoundingClientRect().top < 70) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const selectService = (cat: CategoryId, srv: string) => {
    setCategoryId(cat);
    setServiceId(srv);
    setMaxStep(1);
  };

  const goTo = (target: number) => {
    if (target === 3 && !ticket) {
      const now = new Date();
      const code = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}`;
      setTicket(`KNP-${code}-${Math.floor(1000 + Math.random() * 9000)}`);
    }
    setStep(target);
    setMaxStep((m) => Math.max(m, target));
  };

  const restart = () => {
    setStep(1);
    setMaxStep(1);
    setDayIdx(null);
    setTime(null);
    setName('');
    setNotes('');
  };

  const canNext = step !== 2 || (dayIdx !== null && time !== null);

  const waMessage = [
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir.',
    'Saya ingin mengajukan jadwal konsultasi:',
    `• Bidang: ${category.label}`,
    `• Layanan: ${service.name}`,
    chosenDay && time
      ? `• Jadwal Pilihan: ${fmt(chosenDay, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}, pukul ${time} WIB`
      : '',
    `• Media Konsultasi: ${modeInfo.label}`,
    name.trim() ? `• Nama: ${name.trim()}` : '',
    notes.trim() ? `• Catatan/Kebutuhan: ${notes.trim()}` : '',
    ticket ? `(Ref. Simulasi: ${ticket})` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div
      id="konsultasi"
      ref={rootRef}
      className="mt-12 sm:mt-16 scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-paper-card shadow-sm"
    >
      {/* Header Editorial Bersih (Tanpa sidebar gelap masif) */}
      <div className="border-b border-line bg-paper px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-paper-muted px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brass-deep">
            Simulasi Konsultasi
          </span>
          <DummyTag className="text-brass-deep" />
        </div>

        <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">
          Konsultasi Notaris &amp; PPAT
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl leading-relaxed">
          Sampaikan kebutuhan akta atau urusan pertanahan Anda dalam 3 langkah mudah sebelum terhubung langsung ke WhatsApp resmi kantor.
        </p>

        {/* Indikator Horizontal 3 Tahap Ramping */}
        <div className="mt-6 sm:mt-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {STEPS_3.map((s, i) => {
              const n = i + 1;
              const active = n === step;
              const done = n < step;
              const reachable = n <= maxStep;

              return (
                <button
                  key={s.label}
                  type="button"
                  disabled={!reachable}
                  onClick={() => goTo(n)}
                  className={`flex flex-1 items-center gap-2.5 sm:gap-3 text-left transition-opacity ${
                    active ? 'opacity-100' : done ? 'opacity-85' : 'opacity-40'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                      active
                        ? 'bg-ink text-white shadow-xs ring-2 ring-brass/40'
                        : done
                        ? 'bg-brass text-white'
                        : 'border border-line bg-paper-card text-muted'
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : n}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-ink leading-none">
                      {s.label}
                    </span>
                    <span className="hidden sm:block text-[11px] text-muted truncate mt-0.5">
                      {s.hint}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Label Aktif di Mobile */}
          <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-2.5 text-xs text-muted sm:hidden">
            <span>Tahap {step} dari 3:</span>
            <span className="font-semibold text-ink">{STEPS_3[step - 1].label}</span>
          </div>
        </div>
      </div>

      {/* Konten Formulir Interaktif */}
      <div className="p-5 sm:p-8 lg:p-10">
        {step === 1 && (
          <div>
            <StepTitle
              title="Layanan apa yang Anda butuhkan?"
              sub="Pilih bidang hukum, lalu tentukan jenis akta atau layanan yang spesifik."
            />

            {/* Pilihan Bidang Hukum */}
            <div
              role="tablist"
              aria-label="Kelompok layanan"
              className="mt-5 flex w-full gap-1 rounded-xl border border-line bg-paper p-1 sm:inline-flex sm:w-auto"
            >
              {SERVICE_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={c.id === categoryId}
                  onClick={() => selectService(c.id, c.services[0].id)}
                  className={`flex-1 rounded-lg py-2 text-center text-xs sm:text-sm font-semibold transition-all ${
                    c.id === categoryId
                      ? 'bg-ink text-white shadow-xs'
                      : 'text-ink/70 hover:text-ink hover:bg-paper-muted/50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Grid Pilihan Layanan Spesifik */}
            <div
              role="radiogroup"
              aria-label="Jenis layanan"
              className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              {category.services.map((srv) => {
                const selected = srv.id === service.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => selectService(category.id, srv.id)}
                    className={`rounded-xl border p-3.5 sm:p-4 text-left transition-all ${
                      selected
                        ? 'border-brass bg-paper ring-1 ring-brass/60 shadow-xs'
                        : 'border-line hover:border-line-dark hover:bg-paper/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                        {srv.name}
                      </span>
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          selected ? 'border-brass bg-brass text-white' : 'border-line'
                        }`}
                      >
                        {selected && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                      </span>
                    </div>
                    <span className="mt-1 block text-[11px] sm:text-xs leading-relaxed text-muted">
                      {srv.summary}
                    </span>
                    <span className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-brass-deep">
                      <Clock className="h-3 w-3 shrink-0" />
                      Estimasi: {srv.estimate}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dokumen Rujukan Awal */}
            <div className="mt-6 rounded-xl border border-line bg-paper/60 p-4">
              <p className="text-xs font-semibold text-ink">Dokumen rujukan awal untuk {service.name}:</p>
              <ul className="mt-2 space-y-1 text-xs text-muted">
                {service.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brass/70" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <StepTitle
              title="Atur waktu & media konsultasi"
              sub="Tentukan cara pertemuan, tanggal, dan jam kerja yang sesuai dengan jadwal Anda."
            />

            <FieldLabel>Cara Konsultasi</FieldLabel>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {CONSULT_MODES.map((m) => {
                const Icon = m.id === 'kantor' ? Building2 : Video;
                const selected = m.id === mode;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setMode(m.id)}
                    className={`flex items-center gap-3 rounded-xl border p-3.5 sm:p-4 text-left transition-all ${
                      selected
                        ? 'border-brass bg-paper ring-1 ring-brass/60 shadow-xs'
                        : 'border-line hover:border-line-dark hover:bg-paper/40'
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-paper-muted">
                      <Icon className="h-5 w-5 text-brass-deep" strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-ink">{m.label}</span>
                      <span className="block text-[11px] text-muted">{m.detail}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <FieldLabel>Pilih Tanggal</FieldLabel>
            <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-1.5">
              {days.map((d, i) => {
                const selected = i === dayIdx;
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => {
                      setDayIdx(i);
                      if (time && isSlotFull(i, TIME_SLOTS.indexOf(time))) setTime(null);
                    }}
                    className={`w-[68px] sm:w-[74px] shrink-0 rounded-xl border py-2.5 text-center transition-all ${
                      selected
                        ? 'border-ink bg-ink text-white shadow-xs'
                        : 'border-line text-ink hover:border-ink/40 bg-paper-card'
                    }`}
                  >
                    <span className={`block text-[10px] ${selected ? 'text-white/70' : 'text-muted'}`}>
                      {fmt(d, { weekday: 'short' })}
                    </span>
                    <span className="block font-serif text-lg sm:text-xl font-semibold leading-tight my-0.5">
                      {d.getDate()}
                    </span>
                    <span className={`block text-[10px] ${selected ? 'text-white/70' : 'text-muted'}`}>
                      {fmt(d, { month: 'short' })}
                    </span>
                  </button>
                );
              })}
            </div>

            <FieldLabel>Pilih Jam (WIB)</FieldLabel>
            {dayIdx === null ? (
              <p className="text-xs text-muted">Pilih tanggal di atas terlebih dahulu.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TIME_SLOTS.map((t, si) => {
                  const full = isSlotFull(dayIdx, si);
                  const selected = t === time;
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={full}
                      onClick={() => setTime(t)}
                      className={`h-11 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${
                        full
                          ? 'cursor-not-allowed border-line bg-paper text-ink/30'
                          : selected
                          ? 'border-ink bg-ink text-white shadow-xs'
                          : 'border-line text-ink hover:border-ink/40 bg-paper-card'
                      }`}
                    >
                      {full ? <span className="font-normal text-muted">Penuh</span> : t}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="sim-nama">Nama Anda (Opsional)</FieldLabel>
                <input
                  id="sim-nama"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ahmad Fauzi"
                  className="h-11 w-full rounded-lg border border-line bg-white px-3.5 text-xs sm:text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
                />
              </div>
              <div>
                <FieldLabel htmlFor="sim-notes">Uraian Kebutuhan Singkat (Opsional)</FieldLabel>
                <input
                  id="sim-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Pembuatan akta jual beli tanah waris"
                  className="h-11 w-full rounded-lg border border-line bg-white px-3.5 text-xs sm:text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && chosenDay && time && (
          <div>
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-paper">
                <CheckCircle2 className="h-5 w-5 text-brass-deep" />
              </span>
              <StepTitle
                title="Ringkasan konsultasi siap dikirim"
                sub="Periksa kembali jadwal dan detail kebutuhan Anda, lalu lanjutkan ke WhatsApp resmi kantor."
              />
            </div>

            <div className="mt-6 rounded-xl border border-line bg-paper">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
                <span className="text-xs text-muted">
                  No. Simulasi <span className="ml-1 font-mono text-xs sm:text-sm font-semibold text-ink">{ticket}</span>
                </span>
                <span className="text-xs font-semibold text-brass-deep">{category.label}</span>
              </div>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 p-4 sm:grid-cols-2 sm:p-6">
                <SummaryItem label="Layanan" value={service.name} note={category.title} />
                <SummaryItem
                  label="Jadwal Pilihan"
                  value={`${fmt(chosenDay, { weekday: 'long', day: 'numeric', month: 'long' })}`}
                  note={`Pukul ${time} WIB`}
                />
                <SummaryItem label="Media Konsultasi" value={modeInfo.label} note={modeInfo.detail} />
                <SummaryItem label="Nama Pemohon" value={name.trim() || '—'} />
                {notes.trim() && <SummaryItem label="Uraian" value={notes.trim()} />}
                <SummaryItem label="Estimasi Pengerjaan" value={service.estimate} note="Estimasi contoh" />
              </dl>
            </div>

            {/* Tombol Kirim WhatsApp yang Menonjol */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl(waMessage, whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold justify-center py-3.5 sm:py-3 text-xs sm:text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Kirim Jadwal via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={restart}
                className="btn btn-outline justify-center py-3.5 sm:py-3 text-xs sm:text-sm"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Atur Ulang Konsultasi</span>
              </button>
            </div>

            {isDummyWhatsAppNumber(whatsappNumber) && (
              <p className="mt-4 text-xs text-muted">
                Catatan: nomor WhatsApp kantor masih dummy di konfigurasi.
              </p>
            )}
          </div>
        )}

        {/* Kontrol Navigasi Stepper */}
        {step < 3 && (
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink/70 hover:text-ink ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => goTo(step + 1)}
              className="btn btn-ink text-xs sm:text-sm py-2.5 px-5"
            >
              <span>{step === 2 ? 'Lihat Ringkasan' : 'Lanjutkan'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepTitle({ title, sub }: { title: string; sub: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-serif text-xl sm:text-2xl font-semibold leading-snug text-ink">{title}</h4>
      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted">{sub}</p>
    </div>
  );
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 mt-5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
    >
      {children}
    </label>
  );
}

function SummaryItem({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-0.5 text-xs sm:text-sm font-semibold text-ink">{value}</dd>
      {note && <dd className="text-[11px] text-muted">{note}</dd>}
    </div>
  );
}
