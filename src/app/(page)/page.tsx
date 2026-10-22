'use client';

import React, { useState } from 'react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import HeroSection from '@/components/home/hero-section';
import QuickAccess from '@/components/home/quick-access';
import SharesTable from '@/components/home/shares-table';
import ValueProps from '@/components/home/value-props';
import DRHPSection from '@/components/home/drhp-section';
import SectorsGrid from '@/components/home/sectors-grid';
import HowItWorks from '@/components/home/how-it-works';
import ReviewsSection from '@/components/home/reviews-section';
import ResearchSection from '@/components/home/research-section';
import AppBanner from '@/components/home/app-banner';
import Footer from '@/components/footer';
import StockDetailModal from '@/components/ui/stock-detail-modal';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { StockItem } from '@/data/unlisted-data';

export default function HomePage() {
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleStockClick = (stock: StockItem) => {
    setSelectedStock(stock);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const sharesEl = document.getElementById('shares');
    if (sharesEl) {
      sharesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* 1. Top Ticker & Market Status */}
      <TopTicker />

      {/* 2. Navigation Header with Live Search */}
      <Navbar
        onSelectStock={handleStockClick}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      {/* 3. Hero Section matching uploaded reference */}
      <HeroSection
        onSelectStock={handleStockClick}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      {/* 4. Quick Access Category Cards */}
      <QuickAccess onCategoryClick={handleCategoryClick} />

      {/* 5. Popular Unlisted Shares Table */}
      <SharesTable
        onSelectStock={handleStockClick}
        selectedCategory={selectedCategory}
      />

      {/* 6. Why UnlistedZone / Value Pillars */}
      <ValueProps />

      {/* 7. DRHP Filed Companies for Upcoming IPOs */}
      <DRHPSection onSelectStock={handleStockClick} />

      {/* 8. Top Sectors in Unlisted Space */}
      <SectorsGrid
        onSectorSelect={(sec) => {
          setSelectedCategory('All');
          const sharesEl = document.getElementById('shares');
          if (sharesEl) sharesEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 9. Concierge 3-Step Process */}
      <HowItWorks onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* 10. Investor Voices (4.9 Rating) */}
      <div id="reviews">
        <ReviewsSection />
      </div>

      {/* 11. Knowledge Centre: Research Reports & Videos */}
      <ResearchSection />

      {/* 12. Mobile App Download Promo */}
      <AppBanner />

      {/* 13. Institutional Footer with SEBI Disclosure */}
      <Footer />

      {/* Interactive Stock Detail Modal */}
      <StockDetailModal
        stock={selectedStock}
        onClose={() => setSelectedStock(null)}
        onEnquire={(stock, shares) => {
          alert(`Inquiry sent for ${shares} shares of ${stock.name}. Our relationship manager will reach out within 2 hours.`);
        }}
      />

      {/* Interactive Enquiry / Contact Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}