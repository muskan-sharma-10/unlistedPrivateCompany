import React from 'react';
import type { Metadata } from 'next';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import TeamHero from '@/components/team/team-hero';
import PartnerGrid from '@/components/team/partner-grid';
import ExpertiseSection from '@/components/team/expertise-section';
import TeamCTA from '@/components/team/team-cta';

export const metadata: Metadata = {
  title: 'Our Leadership Team | The People Behind Unlisted Pond',
  description:
    'Meet the professionals bringing expertise, insight and dedication to every business relationship. Explore partner profiles, verified qualifications, corporate finance, chartered accountancy, and business advisory services.',
  alternates: {
    canonical: 'https://www.unlistedpond.com/our-team',
  },
  openGraph: {
    title: 'Our Leadership Team | Unlisted Pond',
    description:
      'Meet the professionals bringing expertise, insight and dedication to every business relationship at Unlisted Pond.',
    url: 'https://www.unlistedpond.com/our-team',
    siteName: 'Unlisted Pond',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Leadership Team | Unlisted Pond',
    description:
      'Meet the leadership team behind Unlisted Pond. Chartered accountancy, business loans, corporate finance, and enterprise advisory.',
  },
};

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-primary selection:text-white">
      {/* 1. Top Ticker & Compliance Banner */}
      <TopTicker />

      {/* 2. Primary Navigation Header */}
      <Navbar />

      {/* 3. Main Content Landmark */}
      <main id="main-content" className="flex-1 w-full">
        {/* Section A: Hero */}
        <TeamHero />

        {/* Section B: Three Partner Profiles */}
        <PartnerGrid />

        {/* Section C: Confirmed Business Services & Practice Areas */}
        <ExpertiseSection />

        {/* Section D: Direct Consultation Call to Action */}
        <TeamCTA />
      </main>

      {/* 4. Institutional Footer with Regulatory Disclosures */}
      <Footer />
    </div>
  );
}
