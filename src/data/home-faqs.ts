export interface HomeFaqItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: HomeFaqItem[] = [
  {
    question: 'What are unlisted shares in India?',
    answer:
      'Unlisted shares are equity shares of companies that are incorporated and legally compliant but are not yet listed on public recognized stock exchanges such as the National Stock Exchange (NSE) or Bombay Stock Exchange (BSE). These include early-stage enterprises, mature pre-IPO unicorns, established corporate subsidiaries, and institutional financial market institutions like stock exchanges, depositories, and power exchanges.',
  },
  {
    question: 'What is the unlisted share market and how does it function?',
    answer:
      'The unlisted share market is an over-the-counter (OTC) institutional network where existing shareholders (such as promoters, employees with ESOPs, angel investors, or venture capital funds) offer their equity parcels, and interested institutional or retail buyers can acquire them. Rather than automatic exchange order books, transactions occur via price negotiation, bilateral contract confirmation, and official off-market Demat settlement.',
  },
  {
    question: 'How does private share trading work through Unlisted Pond?',
    answer:
      'Unlisted Pond operates a concierge dealing desk model. You review indicative share prices and place a purchase or sale enquiry with your desired quantity. Our relationship managers verify current market depth and lock in rates with you. After completing verification and payment through registered corporate banking channels (NEFT/RTGS), shares are transferred directly into your CDSL or NSDL Demat account via legal off-market transfer (Delivery Instruction Slip / DIS) within 24 hours of settlement.',
  },
  {
    question: 'How can investors explore and evaluate shares of private companies?',
    answer:
      'On Unlisted Pond, investors can explore pre-IPO and unlisted shares using our Sector Screener, DRHP filing tracker, and company fundamentals directory. You can examine historical price trends, lot size requirements, balance sheet metrics, multi-year audited profit & loss statements, and equity shareholding patterns before connecting with our institutional desk for order execution.',
  },
  {
    question: 'What is the difference between listed and unlisted shares?',
    answer:
      'Listed shares trade continuously on public exchanges (NSE/BSE) with instant liquidity and automated order matching. Unlisted shares trade in private secondary markets with negotiated indicative pricing and lot-based transactions. Unlisted equities offer early entry into growing businesses before their initial public offering (IPO), but they carry higher holding period considerations, lower immediate liquidity, and mandatory 6-month SEBI post-listing lock-in periods upon IPO.',
  },
  {
    question: 'How to understand indicative unlisted share prices?',
    answer:
      'Because unlisted shares do not have continuous exchange tick-by-tick order books, published prices are "indicative" benchmark rates derived from recent verified institutional trades, private equity funding rounds, and off-market supply-demand balances. Indicative rates serve as reference points for consultation; final executed prices are confirmed directly by the dealing desk prior to transaction settlement.',
  },
];

