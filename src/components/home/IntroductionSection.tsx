import React from 'react';
import { BookOpen, Scale, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { ProfileData } from '@/data/initialData';

interface IntroductionSectionProps {
  profile: ProfileData;
}

export default function IntroductionSection({ profile }: IntroductionSectionProps) {
  const icons = [BookOpen, Scale, HeartHandshake];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-navy/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy mb-3">
            <span>Pilar Karakter & Pengabdian</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight mb-6">
            Lebih dari Sekadar Profesi
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            {profile.aboutIntro}
          </p>
        </div>

        {/* Asymmetrical 3-Card Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profile.coreIdentities.map((item, index) => {
            const Icon = icons[index % icons.length];
            const isFeatured = index === 1; // Middle card slightly elevated

            return (
              <div
                key={item.number}
                className={`relative flex flex-col justify-between p-8 rounded-2xl transition-all duration-300 border ${
                  isFeatured
                    ? 'bg-navy text-white shadow-xl border-navy translate-y-0 md:-translate-y-2'
                    : 'bg-white text-charcoal shadow-sm hover:shadow-md border-navy/10'
                }`}
              >
                {/* Header Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`text-4xl font-black tracking-tighter ${
                        isFeatured ? 'text-burgundy-300' : 'text-burgundy'
                      }`}
                    >
                      {item.number}
                    </span>
                    <div
                      className={`p-3 rounded-xl ${
                        isFeatured ? 'bg-white/10 text-ivory' : 'bg-ivory text-navy'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-2 tracking-tight ${
                      isFeatured ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                      isFeatured ? 'text-burgundy-200' : 'text-burgundy'
                    }`}
                  >
                    {item.subtitle}
                  </p>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isFeatured ? 'text-ivory/80' : 'text-charcoal/70'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div
                  className={`pt-6 border-t ${
                    isFeatured ? 'border-white/15' : 'border-navy/10'
                  }`}
                >
                  <ul className="space-y-2.5">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-snug">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isFeatured ? 'text-burgundy-300' : 'text-burgundy'
                          }`}
                        />
                        <span className={isFeatured ? 'text-ivory/90' : 'text-charcoal/80'}>
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Narrative Block Quote */}
        <div className="mt-16 p-8 lg:p-10 rounded-2xl bg-white border border-navy/10 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="space-y-2 max-w-3xl">
            <h4 className="text-lg font-bold text-navy">
              Komitmen Pengabdian untuk Sumenep
            </h4>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              &ldquo;Bagi santri, ilmu hukum bukan sekadar instrumen profesi, melainkan jalan pengabdian untuk menghadirkan rasa keadilan dan menjaga martabat masyarakat.&rdquo;
            </p>
          </div>
          <div className="shrink-0">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-md bg-ivory text-navy border border-navy/10">
              Desa Campaka, Pasongsongan
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
