'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Info,
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

const STEPS = [
  { label: 'Pilih layanan', hint: 'Notaris, PPAT, atau pertanahan' },
  { label: 'Cek dokumen', hint: 'Kesiapan berkas awal' },
  { label: 'Atur jadwal', hint: 'Tanggal, jam, dan cara konsultasi' },
  { label: 'Ringkasan', hint: 'Kirim ke kantor via WhatsApp' },
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
  const [checkedDocs, setCheckedDocs] = useState<number[]>([]);
  const [mode, setMode] = useState<ConsultModeId>('kantor');
  const [days, setDays] = useState<Date[]>([]);
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [ticket, setTicket] = useState('');

  const { category, service } = findService(categoryId, serviceId);
  const modeInfo = CONSULT_MODES.find((m) => m.id === mode)!;
  const chosenDay = dayIdx !== null ? days[dayIdx] : null;

  // Pastikan awal panel terlihat saat berpindah langkah (terutama di ponsel).
  useEffect(() => {
    const el = rootRef.current;
    if (el && step > 1 && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const selectService = (cat: CategoryId, srv: string) => {
    setCategoryId(cat);
    setServiceId(srv);
    setCheckedDocs([]);
    setMaxStep(1);
  };

  const toggleDoc = (idx: number) =>
    setCheckedDocs((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  const goTo = (target: number) => {
    if (target === 3 && days.length === 0) setDays(nextWorkingDays(6));
    if (target === 4) {
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
    setCheckedDocs([]);
    setDayIdx(null);
    setTime(null);
    setName('');
  };

  const canNext = step !== 3 || (dayIdx !== null && time !== null);

  const waMessage = [
    'Assalamu’alaikum Wr. Wb. Kantor Notaris & PPAT Dr. Naghfir.',
    'Saya ingin mengajukan konsultasi:',
    `• Layanan: ${category.label} — ${service.name}`,
    chosenDay && time ? `• Jadwal pilihan: ${fmt(chosenDay, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}, pukul ${time} WIB` : '',
    `• Cara konsultasi: ${modeInfo.label}`,
    `• Dokumen siap: ${checkedDocs.length} dari ${service.documents.length}`,
    `• Nama: ${name.trim() || '-'}`,
    ticket ? `(No. simulasi: ${ticket})` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div
      id="konsultasi"
      ref={rootRef}
      className="mt-16 scroll-mt-24 overflow-hidden rounded-2xl border border-line lg:mt-20 lg:grid lg:grid-cols-12"
    >
      {/* Panel kiri: judul & langkah */}
      <aside className="bg-ink px-6 py-8 text-white sm:px-10 lg:col-span-4 lg:flex lg:flex-col lg:py-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-brass-light/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brass-light">
          Prototipe · Data simulasi
        </span>
        <h3 className="mt-5 font-serif text-[26px] font-semibold leading-tight sm:text-[30px]">
          Simulasi Alur Konsultasi
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Empat langkah sederhana, dari memilih layanan hingga mengirim ringkasan konsultasi ke
          kantor.
        </p>

        {/* Stepper — desktop */}
        <ol className="relative mt-10 hidden space-y-7 lg:block">
          <span aria-hidden="true" className="absolute bottom-3 left-[15px] top-3 w-px bg-white/15" />
          {STEPS.map((s, i) => {
            const n = i + 1;
            const active = n === step;
            const done = n < step;
            const reachable = n <= maxStep && step !== 4;
            return (
              <li key={s.label} className="relative">
                <button
                  type="button"
                  disabled={!reachable || active}
                  onClick={() => goTo(n)}
                  className="flex items-start gap-4 text-left disabled:cursor-default"
                >
                  <span
                    className={`relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                      active
                        ? 'border-brass-light bg-brass-light text-ink'
                        : done
                          ? 'border-brass-light/60 bg-ink text-brass-light'
                          : 'border-white/20 bg-ink text-white/50'
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : n}
                  </span>
                  <span className="pt-1">
                    <span className={`block text-sm font-semibold ${active || done ? 'text-white' : 'text-white/50'}`}>
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/45">{s.hint}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Stepper — ponsel/tablet */}
        <div className="mt-7 lg:hidden">
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <span
                key={s.label}
                className={`h-1 flex-1 rounded-full ${i + 1 <= step ? 'bg-brass-light' : 'bg-white/15'}`}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-white/60">
            Langkah {step} dari 4 · <span className="font-semibold text-white">{STEPS[step - 1].label}</span>
          </p>
        </div>

        <p className="mt-auto hidden pt-10 text-xs leading-relaxed text-white/45 lg:block">
          Seluruh data pada simulasi ini adalah contoh dan tidak disimpan.
        </p>
      </aside>

      {/* Panel kanan: isi langkah */}
      <div className="flex min-h-[540px] flex-col bg-white px-6 py-8 sm:px-10 lg:col-span-8 lg:py-12">
        <div className="flex-1">
          {step === 1 && (
            <div>
              <StepTitle title="Layanan apa yang Anda butuhkan?" sub="Pilih kelompok layanan, lalu jenis layanannya." />
              <div role="tablist" aria-label="Kelompok layanan" className="mt-6 inline-flex rounded-full border border-line bg-paper p-1">
                {SERVICE_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={c.id === categoryId}
                    onClick={() => selectService(c.id, c.services[0].id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${
                      c.id === categoryId ? 'bg-ink text-white' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div role="radiogroup" aria-label="Jenis layanan" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {category.services.map((srv) => {
                  const selected = srv.id === service.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => selectService(category.id, srv.id)}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        selected ? 'border-ink bg-paper ring-1 ring-ink' : 'border-line hover:border-ink/40'
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-sm font-semibold text-ink">{srv.name}</span>
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                            selected ? 'border-ink bg-ink text-white' : 'border-ink/25'
                          }`}
                        >
                          {selected && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-xs leading-relaxed text-muted">{srv.summary}</span>
                      <span className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-brass-deep">
                        <Clock className="h-3 w-3" />
                        {srv.estimate}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <StepTitle
                title="Periksa kesiapan dokumen"
                sub={
                  <>
                    Centang dokumen yang sudah Anda miliki untuk{' '}
                    <strong className="font-semibold text-ink">{service.name}</strong>.
                  </>
                }
              />
              <div className="mt-6 flex items-center gap-4">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-deep">
                  <div
                    className="h-full rounded-full bg-brass transition-all duration-300"
                    style={{ width: `${(checkedDocs.length / service.documents.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-ink">
                  {checkedDocs.length}/{service.documents.length} siap
                </span>
              </div>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {service.documents.map((doc, idx) => {
                  const checked = checkedDocs.includes(idx);
                  return (
                    <li key={doc}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => toggleDoc(idx)}
                        className="flex w-full items-center gap-4 py-3.5 text-left"
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            checked ? 'border-ink bg-ink text-white' : 'border-ink/30'
                          }`}
                        >
                          {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        <span className={`text-sm ${checked ? 'text-ink' : 'text-ink/80'}`}>{doc}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 flex items-start gap-2.5 rounded-lg bg-paper px-4 py-3 text-xs leading-relaxed text-muted">
                <Info className="mt-px h-3.5 w-3.5 shrink-0 text-brass-deep" />
                Belum lengkap? Tidak masalah. Kekurangan berkas dapat dibahas pada konsultasi awal.
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <StepTitle title="Atur jadwal konsultasi" sub="Pilih cara konsultasi, tanggal, dan jam yang Anda inginkan." />

              <FieldLabel>Cara konsultasi</FieldLabel>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                      className={`flex items-center gap-3.5 rounded-xl border p-4 text-left transition-colors ${
                        selected ? 'border-ink bg-paper ring-1 ring-ink' : 'border-line hover:border-ink/40'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-brass-deep" strokeWidth={1.6} />
                      <span>
                        <span className="block text-sm font-semibold text-ink">{m.label}</span>
                        <span className="block text-xs text-muted">{m.detail}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <FieldLabel>Tanggal</FieldLabel>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
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
                      className={`w-[72px] shrink-0 rounded-xl border py-2.5 text-center transition-colors ${
                        selected ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:border-ink/40'
                      }`}
                    >
                      <span className={`block text-[11px] ${selected ? 'text-white/70' : 'text-muted'}`}>
                        {fmt(d, { weekday: 'short' })}
                      </span>
                      <span className="block font-serif text-xl font-semibold leading-tight">{d.getDate()}</span>
                      <span className={`block text-[11px] ${selected ? 'text-white/70' : 'text-muted'}`}>
                        {fmt(d, { month: 'short' })}
                      </span>
                    </button>
                  );
                })}
              </div>

              <FieldLabel>Jam (WIB)</FieldLabel>
              {dayIdx === null ? (
                <p className="text-xs text-muted">Pilih tanggal terlebih dahulu.</p>
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
                        className={`rounded-lg border py-2.5 text-sm font-semibold transition-colors ${
                          full
                            ? 'cursor-not-allowed border-line bg-paper text-ink/30'
                            : selected
                              ? 'border-ink bg-ink text-white'
                              : 'border-line text-ink hover:border-ink/40'
                        }`}
                      >
                        {full ? <span className="font-medium">Penuh</span> : t}
                      </button>
                    );
                  })}
                </div>
              )}

              <FieldLabel htmlFor="sim-nama">Nama Anda (opsional)</FieldLabel>
              <input
                id="sim-nama"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mis. Ahmad Fauzi"
                className="h-11 w-full rounded-lg border border-line bg-white px-4 text-sm text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none sm:max-w-sm"
              />
            </div>
          )}

          {step === 4 && chosenDay && time && (
            <div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-paper">
                  <CheckCircle2 className="h-5 w-5 text-brass-deep" />
                </span>
                <StepTitle title="Ringkasan konsultasi siap dikirim" sub="Periksa kembali, lalu kirim ke kantor melalui WhatsApp." />
              </div>

              <div className="mt-8 rounded-xl border border-line bg-paper">
                <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 sm:px-6">
                  <span className="text-xs text-muted">
                    No. simulasi <span className="ml-1 font-mono text-sm font-semibold text-ink">{ticket}</span>
                  </span>
                  <DummyTag className="text-brass-deep" />
                </div>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-5 px-5 py-6 sm:grid-cols-2 sm:px-6">
                  <SummaryItem label="Layanan" value={service.name} note={category.title} />
                  <SummaryItem
                    label="Jadwal"
                    value={`${fmt(chosenDay, { weekday: 'long', day: 'numeric', month: 'long' })}`}
                    note={`Pukul ${time} WIB`}
                  />
                  <SummaryItem label="Cara konsultasi" value={modeInfo.label} note={modeInfo.detail} />
                  <SummaryItem
                    label="Dokumen siap"
                    value={`${checkedDocs.length} dari ${service.documents.length}`}
                    note={
                      checkedDocs.length === service.documents.length
                        ? 'Berkas awal lengkap'
                        : `${service.documents.length - checkedDocs.length} dokumen perlu dilengkapi`
                    }
                  />
                  <SummaryItem label="Nama" value={name.trim() || '—'} />
                  <SummaryItem label="Estimasi proses" value={service.estimate} note="Estimasi contoh" />
                </dl>
              </div>

              <h5 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Tahapan setelah konsultasi
              </h5>
              <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2">
                {category.stages.map((stage, i) => (
                  <li key={stage} className="flex items-center gap-3 sm:block">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold sm:mb-2.5 ${
                        i === 0 ? 'bg-brass-light text-ink' : 'border border-line text-muted'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={`text-xs leading-snug ${i === 0 ? 'font-semibold text-ink' : 'text-muted'}`}>
                      {stage}
                      {i === 0 && <span className="block font-normal text-brass-deep">Anda di sini</span>}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWhatsAppUrl(waMessage, whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Kirim via WhatsApp
                </a>
                <button type="button" onClick={restart} className="btn btn-outline">
                  <RotateCcw className="h-4 w-4" />
                  Ulangi simulasi
                </button>
              </div>
              {isDummyWhatsAppNumber(whatsappNumber) && (
                <p className="mt-4 text-xs text-muted">
                  Catatan prototipe: nomor WhatsApp kantor masih dummy, pesan belum terkirim ke kantor.
                </p>
              )}
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className={`inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-ink ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
            <button type="button" disabled={!canNext} onClick={() => goTo(step + 1)} className="btn btn-ink">
              {step === 3 ? 'Lihat ringkasan' : 'Lanjut'}
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
      <h4 className="font-serif text-2xl font-semibold leading-snug text-ink">{title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{sub}</p>
    </div>
  );
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 mt-7 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"
    >
      {children}
    </label>
  );
}

function SummaryItem({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
      {note && <dd className="text-xs text-muted">{note}</dd>}
    </div>
  );
}
