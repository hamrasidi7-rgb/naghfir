import React from 'react';
import { getDatabase } from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import IntroductionSection from '@/components/home/IntroductionSection';
import JourneySection from '@/components/home/JourneySection';
import AcademicSection from '@/components/home/AcademicSection';
import ProfessionalSection from '@/components/home/ProfessionalSection';
import SocialSection from '@/components/home/SocialSection';
import ThoughtsSection from '@/components/home/ThoughtsSection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import PublicationsSection from '@/components/home/PublicationsSection';
import ContactSection from '@/components/home/ContactSection';

export const revalidate = 0; // Dynamic server rendering to reflect CMS changes immediately

export default function HomePage() {
  const db = getDatabase();

  return (
    <div className="flex flex-col">
      {/* B. Hero Section */}
      <HeroSection profile={db.profile} />

      {/* C. Personal Introduction */}
      <IntroductionSection profile={db.profile} />

      {/* D. Journey / Perjalanan Hidup */}
      <JourneySection timeline={db.timeline} />

      {/* E. Academic Profile */}
      <AcademicSection education={db.education} />

      {/* F. Professional Profile */}
      <ProfessionalSection professional={db.professional} />

      {/* G. Social Contribution */}
      <SocialSection socialContribution={db.socialContribution} />

      {/* H. Thoughts & Ideas */}
      <ThoughtsSection articles={db.articles} />

      {/* I. Activities & Documentation */}
      <ActivitiesSection activities={db.activities} />

      {/* J. Publications & Media */}
      <PublicationsSection publications={db.publications} />

      {/* K. Contact & Discussion */}
      <ContactSection contact={db.contact} />
    </div>
  );
}
