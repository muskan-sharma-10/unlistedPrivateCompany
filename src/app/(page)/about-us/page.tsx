import type { Metadata } from 'next';
import React from 'react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import AboutHero from '@/components/about/about-hero';
import WhoWeAre from '@/components/about/who-we-are';
import MarketOpportunity from '@/components/about/market-opportunity';
import WhatWeDo from '@/components/about/what-we-do';
import OurApproach from '@/components/about/our-approach';
import OurJourney from '@/components/about/our-journey';
import WhyUnlistedPond from '@/components/about/why-unlisted-pond';
import VisionMission from '@/components/about/vision-mission';
import FutureDirection from '@/components/about/future-direction';
import AboutCTA from '@/components/about/about-cta';

export const metadata: Metadata = {
  title: 'About Us | Unlisted Pond — India’s Private Market Intelligence Platform',
  description:
    'Discover Unlisted Pond: India’s dedicated research, discovery, and information platform for unlisted shares, pre-IPO enterprises, DRHP tracking, and ESOP equity.',
  alternates: {
    canonical: 'https://www.unlistedpond.com/about-us',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.unlistedpond.com/about-us',
    siteName: 'Unlisted Pond',
    title: 'About Us | Unlisted Pond — India’s Private Market Intelligence Platform',
    description:
      'Bringing India’s private markets closer to informed investors through structured company data, audited financials, DRHP tracking, and indicative reference pricing.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Pond – Private Market Information Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Unlisted Pond — India’s Private Market Intelligence Platform',
    description:
      'Bringing India’s private markets closer to informed investors through structured company data, audited financials, DRHP tracking, and indicative reference pricing.',
    images: ['https://www.unlistedpond.com/icon-192.png'],
  },
};

export default function AboutUsPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Unlisted Pond',
    description:
      'Unlisted Pond is India’s dedicated research, information, and discovery platform for unlisted equities, pre-IPO enterprises, and ESOP shares.',
    url: 'https://www.unlistedpond.com/about-us',
    publisher: {
      '@type': 'Organization',
      name: 'Unlisted Pond',
      url: 'https://www.unlistedpond.com',
      logo: 'https://www.unlistedpond.com/icon-192.png',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-primary selection:text-white">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* 1. Top Ticker & Compliance Banner */}
      <TopTicker />

      {/* 2. Primary Navigation Header */}
      <Navbar />

      {/* 3. Main Content Landmark */}
      <main id="main-content" className="flex-1 w-full">
        {/* Section 1: Hero Section */}
        <AboutHero />

        {/* Section 2: Who We Are */}
        <WhoWeAre />

        {/* Section 3: The Market Opportunity */}
        <MarketOpportunity />

        {/* Section 4: What We Do (8 Capability Cards) */}
        <WhatWeDo />

        {/* Section 5: Our Approach (4 Pillars) */}
        <OurApproach />

        {/* Section 6: Our Journey (Verified Milestones) */}
        <OurJourney />

        {/* Section 7: Why Unlisted Pond (Platform Capabilities) */}
        <WhyUnlistedPond />

        {/* Section 8: Our Vision & Mission */}
        <VisionMission />

        {/* Section 9: Our Future Direction */}
        <FutureDirection />

        {/* Section 10: Call to Action */}
        <AboutCTA />
      </main>

      {/* 4. Institutional Footer with Regulatory Disclosures */}
      <Footer />
    </div>
  );
}
