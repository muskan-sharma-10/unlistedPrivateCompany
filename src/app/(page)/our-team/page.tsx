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
  title: 'Our Founders | The People Behind Unlisted Pond',
  description:
    'Meet the three founders behind Unlisted Pond. Chartered Accountants bringing specialized professional expertise to corporate finance, debt restructuring, borrowing advisory, and statutory consultation.',
  alternates: {
    canonical: 'https://www.unlistedpond.com/our-team',
  },
  openGraph: {
    title: 'Our Founders | The People Behind Unlisted Pond',
    description:
      'Meet the three founders behind Unlisted Pond. Chartered Accountants bringing professional expertise to corporate finance and advisory activities.',
    url: 'https://www.unlistedpond.com/our-team',
    siteName: 'Unlisted Pond',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Founders | The People Behind Unlisted Pond',
    description:
      'Meet the three founders behind Unlisted Pond. Built on Expertise. Driven by Vision.',
  },
};

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-primary selection:text-white">
      {/* 1. Top Ticker & Compliance Banner */}
      <TopTicker />

      {/* 2. Primary Navigation Header (Displays "Our Founders" linking to /our-team) */}
      <Navbar />

      {/* 3. Main Content Landmark */}
      <main id="main-content" className="flex-1 w-full">
        {/* Section A: Hero with Animated Headline & Tagline */}
        <TeamHero />

        {/* Section B: Three Founder Profiles with Staggered Scroll Reveal */}
        <PartnerGrid />

        {/* Section C: Confirmed Business Services & Practice Areas */}
        <ExpertiseSection />

        {/* Section D: Direct Founder Consultation Call to Action */}
        <TeamCTA />
      </main>

      {/* 4. Institutional Footer with Regulatory Disclosures */}
      <Footer />
    </div>
  );
}
