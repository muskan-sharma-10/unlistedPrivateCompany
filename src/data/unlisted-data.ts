export interface FinancialRow {
  particulars: string;
  fy23: string;
  fy24: string;
  fy25: string;
  fy26: string;
  yoyChange?: string;
  isPositive?: boolean;
}

export interface ShareholdingItem {
  category: string;
  percentage: number;
}

export interface FundRaiseItem {
  date: string;
  amount: string;
  price: string;
  type: string;
  instrument: string;
}

export interface LeaderItem {
  name: string;
  role: string;
  experience: string;
  initials: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PriceHistoryRecord {
  price: number;
  date: string; // ISO 8601 string
  note?: string;
}

export interface StockItem {
  id: string;
  name: string;
  ticker?: string;
  category: 'Popular' | 'Recently Updated' | 'Pre-IPO' | 'DRHP Filed';
  sector: string;
  price: number;
  change: string;
  changeType: 'up' | 'down';
  change6M?: string;
  logo?: string;
  lastUpdated: string;
  description: string;
  minLot?: number;
  marketCap?: string;
  peRatio?: string;
  pbRatio?: string;
  sparkline: number[];
  priceHistory?: PriceHistoryRecord[];
  drhpStatus?: string;
  isin?: string;
  cin?: string;
  pan?: string;
  high52?: string;
  low52?: string;
  bookValue?: string;
  faceValue?: string;
  sharesOutstanding?: string;
  debtToEquity?: string;
  roe?: string;
  aboutRich?: string[];
  financials?: FinancialRow[];
  shareholding?: ShareholdingItem[];
  fundRaises?: FundRaiseItem[];
  leadership?: LeaderItem[];
  faqs?: FAQItem[];
}

export const STOCKS_DATA: StockItem[] = [
  {
    id: 'msei',
    name: 'Metropolitan Stock Exchange (MSEI)',
    ticker: 'MSEI',
    category: 'Popular',
    sector: 'Financial Services',
    price: 6.95,
    change: '+4.2%',
    changeType: 'up',
    change6M: '+43.2%',
    lastUpdated: '10 Oct 2026',
    description: 'Full-service nationwide stock exchange offering trading in Capital Market, Futures & Options, and Currency Derivatives.',
    minLot: 10000,
    marketCap: '₹ 7,645 Cr',
    peRatio: 'N/A',
    pbRatio: '5.6',
    sparkline: [5.2, 5.5, 5.8, 6.1, 6.4, 6.7, 6.95],
    drhpStatus: 'Active SEBI Exchange License',
    isin: 'INE312K01010',
    cin: 'U65999MH2008PLC185856',
    pan: 'AAFCM6942F',
    high52: '₹ 7.75',
    low52: '₹ 2.75',
    bookValue: '₹ 1.24',
    faceValue: '₹ 1.00',
    sharesOutstanding: '1,100 Cr',
    debtToEquity: '0.00',
    roe: '-1.89%',
    aboutRich: [
      'Metropolitan Stock Exchange of India Limited (MSEI) is a full-service national-level stock exchange recognized by SEBI. It operates across multiple asset classes including Equity, Equity Derivatives, Currency Derivatives, and Debt segments.',
      'In 2025, MSEI completed major private placement rounds raising over ₹1,238 Crore from marquee institutional brokers and technology funds including Peak XV Partners, Share India Securities, Billionbrains Garage Ventures (Groww), and Rainmatter Investments (Zerodha founders fund).',
      'The exchange holds vital strategic value in Indian financial market infrastructure as the third national stock exchange alongside NSE and BSE.'
    ],
    financials: [
      { particulars: 'Revenue (₹ Cr)', fy23: '9.0', fy24: '7.0', fy25: '4.3', fy26: '3.4', yoyChange: '-21%', isPositive: false },
      { particulars: 'EBITDA (₹ Cr)', fy23: '-49.0', fy24: '-54.0', fy25: '-41.7', fy26: '-67.6', yoyChange: '-62%', isPositive: false },
      { particulars: 'PBT (₹ Cr)', fy23: '-20.0', fy24: '-48.0', fy25: '-35.0', fy26: '-25.8', yoyChange: '+26%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '-18.7', fy24: '-49.0', fy25: '-34.0', fy26: '-25.8', yoyChange: '+24%', isPositive: true },
      { particulars: 'EPS (₹)', fy23: '-0.04', fy24: '-0.10', fy25: '-0.06', fy26: '-0.02', yoyChange: '+67%', isPositive: true }
    ],
    shareholding: [
      { category: 'Financial Institutions / Banks', percentage: 11.98 },
      { category: 'Bodies Corporate (Brokers & Funds)', percentage: 29.96 },
      { category: 'Public & Retail Individuals', percentage: 48.92 },
      { category: 'Promoters & Others', percentage: 9.14 }
    ],
    fundRaises: [
      { date: '13 Aug 2025', amount: '₹ 1,000 Cr', price: '₹ 2.00 (₹1 FV + ₹1 Premium)', type: 'Private Placement', instrument: 'Equity Shares' },
      { date: '22 Jan 2025', amount: '₹ 238 Cr', price: '₹ 2.00 (₹1 FV + ₹1 Premium)', type: 'Private Placement', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'Dinesh C. Patwari', role: 'Chairman', experience: '36 yrs experience', initials: 'DC' },
      { name: 'Ms. Latika S. Kundu', role: 'MD & CEO', experience: '25 yrs experience', initials: 'LK' },
      { name: 'Ms. Trishna Guha', role: 'Public Interest Director', experience: '20+ yrs experience', initials: 'TG' }
    ],
    faqs: [
      {
        question: 'How to buy MSEI Unlisted Shares on Private Market?',
        answer: 'You confirm booking with our relationship desk at the indicative price. Submit your Client Master Report (CMR) and PAN card. Fund transfer is made directly to our registered corporate account via NEFT/RTGS. Shares are credited into your Demat account within 24 hours of settlement.'
      },
      {
        question: 'Is buying and selling MSEI unlisted shares legal in India?',
        answer: 'Yes, buying and selling unlisted shares in India is 100% legal and recognized under SEBI regulations and Depository Acts. All transfers happen via demat off-market transactions (DIS/Easiest).'
      },
      {
        question: 'What is the SEBI lock-in period for pre-IPO shares?',
        answer: 'As per SEBI guidelines revised in August 2021, the lock-in period for pre-IPO shares is 6 months from the date of the IPO listing (reduced from 1 year earlier).'
      },
      {
        question: 'How are capital gains taxed on unlisted shares?',
        answer: 'Under the revised Budget 2024 regulations, long-term capital gains (holding period > 2 years) on unlisted shares are taxed at a flat rate of 12.5%. Short-term capital gains (holding period < 2 years) are taxed as per your applicable income tax slab rate.'
      }
    ]
  },
  {
    id: 'nse-india',
    name: 'National Stock Exchange (NSE India)',
    ticker: 'NSE',
    category: 'Popular',
    sector: 'Financial Services',
    price: 2095,
    change: '+2.4%',
    changeType: 'up',
    change6M: '+31.5%',
    lastUpdated: '10 Oct 2026',
    description: 'National Stock Exchange of India, the world’s largest derivatives exchange by contract volume and flagship stock exchange in India.',
    minLot: 25,
    marketCap: '₹ 1,04,500 Cr',
    peRatio: '32.4',
    pbRatio: '11.2',
    sparkline: [1950, 1980, 2010, 2000, 2045, 2070, 2095],
    drhpStatus: 'IPO Approved by Board / SEBI NOC in Process',
    isin: 'INE118H01025',
    cin: 'U67120MH1992PLC069769',
    pan: 'AAACN1234F',
    high52: '₹ 2,240',
    low52: '₹ 1,480',
    bookValue: '₹ 188.00',
    faceValue: '₹ 1.00',
    sharesOutstanding: '49.5 Cr',
    debtToEquity: '0.00',
    roe: '34.2%',
    aboutRich: [
      'National Stock Exchange of India (NSE) is the premier stock exchange in India, operating round-the-clock trading across Cash Equities, Futures & Options, Currency, Debt, and Commodity derivatives.',
      'NSE consistently ranks as the world’s largest derivatives exchange by trading volume. Its benchmark index, NIFTY 50, is widely used by global institutional and domestic investors to gauge the Indian economy.',
      'The company has exceptional cash flow generation, industry-leading operating profit margins exceeding 70%, and near-monopoly market share in Indian equity derivatives.'
    ],
    financials: [
      { particulars: 'Revenue (₹ Cr)', fy23: '11,856', fy24: '14,780', fy25: '18,450', fy26: '22,100', yoyChange: '+20%', isPositive: true },
      { particulars: 'EBITDA (₹ Cr)', fy23: '8,410', fy24: '10,950', fy25: '14,100', fy26: '17,200', yoyChange: '+22%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '7,356', fy24: '8,306', fy25: '9,980', fy26: '12,450', yoyChange: '+25%', isPositive: true },
      { particulars: 'EPS (₹)', fy23: '148.6', fy24: '167.8', fy25: '201.6', fy26: '251.5', yoyChange: '+25%', isPositive: true }
    ],
    shareholding: [
      { category: 'Domestic Institutional Investors (LIC, Banks)', percentage: 44.20 },
      { category: 'Foreign Portfolio Investors (Temasek, Tiger)', percentage: 28.10 },
      { category: 'Public / Non-Promoter Corporates', percentage: 27.70 }
    ],
    fundRaises: [
      { date: '15 Dec 2021', amount: 'Secondary', price: '₹ 3,400 (Pre-split)', type: 'Institutional Block', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'Ashishkumar Chauhan', role: 'MD & CEO', experience: '30+ yrs in exchanges', initials: 'AC' },
      { name: 'Girindramohan Mallik', role: 'Chief Financial Officer', experience: '22 yrs experience', initials: 'GM' }
    ],
    faqs: [
      {
        question: 'When is the NSE IPO expected?',
        answer: 'NSE has submitted its application seeking a No-Objection Certificate (NOC) from SEBI for its proposed IPO. Following SEBI clearance, the DRHP will be refiled for public subscription.'
      },
      {
        question: 'What is the minimum investment for NSE unlisted shares?',
        answer: 'The minimum lot size on Private Market is typically 25 shares, making the starting ticket size approximately ₹52,000 to ₹55,000.'
      }
    ]
  },
  {
    id: 'sbi-mutual-fund',
    name: 'SBI Mutual Fund (SBI Funds Management)',
    ticker: 'SBIMF',
    category: 'Popular',
    sector: 'Financial Services',
    price: 575,
    change: '+1.8%',
    changeType: 'up',
    change6M: '+18.4%',
    lastUpdated: '10 Oct 2026',
    description: 'SBI Funds Management, India’s largest asset management company managing over ₹9.5 lakh crore in assets.',
    minLot: 100,
    marketCap: '₹ 28,750 Cr',
    peRatio: '38.2',
    pbRatio: '8.4',
    sparkline: [540, 545, 555, 550, 562, 570, 575],
    drhpStatus: 'IPO Expected in FY27',
    isin: 'INE091J01019',
    cin: 'U65990MH1992PLC065204',
    pan: 'AAACS1902E',
    high52: '₹ 620',
    low52: '₹ 450',
    bookValue: '₹ 68.00',
    faceValue: '₹ 1.00',
    sharesOutstanding: '50.0 Cr',
    debtToEquity: '0.00',
    roe: '28.5%',
    aboutRich: [
      'SBI Funds Management Limited is a joint venture between State Bank of India (India’s largest commercial bank) and Amundi (Europe’s largest asset manager).',
      'It has maintained its dominant rank as the largest AMC in India for over 5 consecutive years, commanding over 17% market share of total industry average AUM.',
      'With the phenomenal rise of systematic investment plans (SIPs) in India, SBI MF generates high recurring fee revenue with virtually zero credit risk.'
    ],
    financials: [
      { particulars: 'Revenue (₹ Cr)', fy23: '1,890', fy24: '2,240', fy25: '2,810', fy26: '3,450', yoyChange: '+23%', isPositive: true },
      { particulars: 'Operating Profit (₹ Cr)', fy23: '1,210', fy24: '1,490', fy25: '1,920', fy26: '2,380', yoyChange: '+24%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '860', fy24: '1,120', fy25: '1,450', fy26: '1,820', yoyChange: '+25%', isPositive: true },
      { particulars: 'EPS (₹)', fy23: '17.2', fy24: '22.4', fy25: '29.0', fy26: '36.4', yoyChange: '+25%', isPositive: true }
    ],
    shareholding: [
      { category: 'State Bank of India (SBI)', percentage: 62.53 },
      { category: 'Amundi Asset Management', percentage: 36.73 },
      { category: 'Employee Trust & Others', percentage: 0.74 }
    ],
    fundRaises: [
      { date: '10 Feb 2022', amount: 'Secondary', price: '₹ 450', type: 'Sponsor Divestment Prep', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'Shamsher Singh', role: 'MD & CEO', experience: '32 yrs banking', initials: 'SS' },
      { name: 'Navneet Munot', role: 'Ex-CIO (Advisory)', experience: '28 yrs asset mgmt', initials: 'NM' }
    ],
    faqs: [
      {
        question: 'Who are the shareholders of SBI Mutual Fund?',
        answer: 'SBI holds 62.5% stake and France-based Amundi holds 36.7%. Both partners are planning an Offer For Sale (OFS) in the upcoming mega IPO.'
      }
    ]
  },
  {
    id: 'zepto',
    name: 'Zepto (Kiranakart Technologies)',
    ticker: 'ZEPTO',
    category: 'Pre-IPO',
    sector: 'Consumer Services',
    price: 39,
    change: '+3.2%',
    changeType: 'up',
    change6M: '+48.0%',
    lastUpdated: '09 Oct 2026',
    description: 'Fastest growing quick-commerce delivery platform in India, revolutionizing 10-minute grocery and retail logistics.',
    minLot: 500,
    marketCap: '₹ 41,200 Cr',
    peRatio: 'N/A (Hypergrowth)',
    pbRatio: '6.2',
    sparkline: [32, 33, 35, 36, 37, 38, 39],
    drhpStatus: 'Series G Closed / Pre-IPO Inbound',
    isin: 'INE902Z01014',
    cin: 'U72900MH2020PTC348912',
    pan: 'AAECK8912M',
    high52: '₹ 45.00',
    low52: '₹ 24.00',
    bookValue: '₹ 6.20',
    faceValue: '₹ 1.00',
    sharesOutstanding: '1,050 Cr',
    debtToEquity: '0.05',
    roe: 'N/A',
    aboutRich: [
      'Zepto is India’s foremost 10-minute quick-commerce delivery unicorn, co-founded by Aadit Palicha and Kaivalya Vohra. It operates a nationwide network of optimized dark stores in top metropolitan cities.',
      'In recent funding rounds, Zepto secured investments from StepStone Group, Nexus Venture Partners, Glade Brook Capital, DST Global, and Motilal Oswal Private Wealth.',
      'The company is expanding rapidly into non-grocery retail delivery including electronics, apparel, personal care, and toys, achieving store-level EBITDA profitability across mature dark stores.'
    ],
    financials: [
      { particulars: 'GMV (₹ Cr)', fy23: '2,000', fy24: '4,500', fy25: '10,200', fy26: '18,500', yoyChange: '+81%', isPositive: true },
      { particulars: 'Operating Revenue (₹ Cr)', fy23: '530', fy24: '2,024', fy25: '4,850', fy26: '8,900', yoyChange: '+83%', isPositive: true },
      { particulars: 'EBITDA (₹ Cr)', fy23: '-390', fy24: '-580', fy25: '-410', fy26: '-120', yoyChange: '+70%', isPositive: true }
    ],
    shareholding: [
      { category: 'Founders (Aadit & Kaivalya)', percentage: 22.40 },
      { category: 'Institutional Funds (Nexus, StepStone)', percentage: 61.20 },
      { category: 'ESOP Pool & Angels', percentage: 16.40 }
    ],
    fundRaises: [
      { date: '21 Jun 2024', amount: '₹ 5,500 Cr ($665M)', price: '₹ 30.50', type: 'Series F', instrument: 'CCPS / Equity' },
      { date: '12 Sep 2024', amount: '₹ 2,800 Cr ($340M)', price: '₹ 38.00', type: 'Pre-IPO', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'Aadit Palicha', role: 'Co-founder & CEO', experience: 'Tech Entrepreneur', initials: 'AP' },
      { name: 'Kaivalya Vohra', role: 'Co-founder & CTO', experience: 'Engineering Architect', initials: 'KV' }
    ],
    faqs: [
      {
        question: 'When is Zepto preparing to list on Indian bourses?',
        answer: 'Zepto is redomiciling its parent holding back to India and has formally stated plans to file for an IPO within the next 12–18 months.'
      }
    ]
  },
  {
    id: 'hyundai-motor-india',
    name: 'Hyundai Motor India Limited',
    ticker: 'HYUNDAI',
    category: 'DRHP Filed',
    sector: 'Automobile',
    price: 1960,
    change: '-0.6%',
    changeType: 'down',
    change6M: '+12.5%',
    lastUpdated: '09 Oct 2026',
    description: 'India’s second-largest passenger automobile manufacturer and subsidiary of South Korea’s Hyundai Motor Company.',
    minLot: 10,
    marketCap: '₹ 1,58,000 Cr',
    peRatio: '26.8',
    pbRatio: '7.8',
    sparkline: [1990, 1985, 1970, 1975, 1965, 1962, 1960],
    drhpStatus: 'DRHP Cleared by SEBI / Listing Imminent',
    isin: 'INE802V01012',
    cin: 'U29309TN1996PLC035377',
    pan: 'AAACH8901L',
    high52: '₹ 2,050',
    low52: '₹ 1,650',
    bookValue: '₹ 251.00',
    faceValue: '₹ 10.00',
    sharesOutstanding: '81.2 Cr',
    debtToEquity: '0.02',
    roe: '31.2%',
    aboutRich: [
      'Hyundai Motor India Limited is the Indian passenger vehicle giant behind iconic models such as Creta, Venue, i20, and Verna. It commands over 14.5% market share in the domestic PV market.',
      'The company operates world-class manufacturing mega-plants in Sriperumbudur, Tamil Nadu, and acquired General Motors’ Talegaon plant to scale production capacity towards 1 million vehicles per annum.',
      'Its parent Hyundai Motor Company of South Korea has filed for a landmark ₹25,000 Crore Offer For Sale (OFS) in India’s biggest-ever public offering.'
    ],
    financials: [
      { particulars: 'Revenue (₹ Cr)', fy23: '60,307', fy24: '69,829', fy25: '78,400', fy26: '86,200', yoyChange: '+10%', isPositive: true },
      { particulars: 'EBITDA (₹ Cr)', fy23: '7,520', fy24: '9,150', fy25: '10,900', fy26: '12,450', yoyChange: '+14%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '4,653', fy24: '6,060', fy25: '7,150', fy26: '8,200', yoyChange: '+15%', isPositive: true },
      { particulars: 'EPS (₹)', fy23: '57.3', fy24: '74.6', fy25: '88.0', fy26: '101.0', yoyChange: '+15%', isPositive: true }
    ],
    shareholding: [
      { category: 'Hyundai Motor Company (South Korea)', percentage: 100.00 }
    ],
    fundRaises: [
      { date: '15 Jun 2024', amount: '₹ 25,000 Cr', price: '₹ 1,960 (Indicative Band)', type: 'Mega OFS IPO Filing', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'Unsoo Kim', role: 'Managing Director & CEO', experience: '30 yrs auto veteran', initials: 'UK' },
      { name: 'Tarun Garg', role: 'Chief Operating Officer', experience: '28 yrs PV industry', initials: 'TG' }
    ],
    faqs: [
      {
        question: 'What is the issue size of Hyundai Motor India IPO?',
        answer: 'The issue is an entirely 100% Offer For Sale (OFS) of 14,21,94,700 shares by the promoter Hyundai Motor Company, seeking to raise around ₹25,000 Crore.'
      }
    ]
  },
  {
    id: 'hpx-india',
    name: 'Hindustan Power Exchange (HPX)',
    ticker: 'HPX',
    category: 'Recently Updated',
    sector: 'Energy & Power',
    price: 24,
    change: '+2.1%',
    changeType: 'up',
    change6M: '+22.5%',
    lastUpdated: '09 Oct 2026',
    description: 'CERC regulated power exchange backed by PTC India, BSE, and ICICI Bank transforming energy contracts.',
    minLot: 1000,
    marketCap: '₹ 1,280 Cr',
    peRatio: '22.1',
    pbRatio: '3.8',
    sparkline: [21, 21.5, 22, 22.8, 23.2, 23.6, 24],
    drhpStatus: 'CERC Regulated Utility',
    isin: 'INE0H6N01016',
    cin: 'U74999DL2018PLC335431',
    pan: 'AAECH3341P',
    high52: '₹ 28.00',
    low52: '₹ 17.50',
    bookValue: '₹ 6.30',
    faceValue: '₹ 1.00',
    sharesOutstanding: '53.3 Cr',
    debtToEquity: '0.00',
    roe: '16.4%',
    aboutRich: [
      'Hindustan Power Exchange (HPX) is India’s third power exchange, promoted by PTC India, Bombay Stock Exchange (BSE), and ICICI Bank.',
      'HPX offers advanced trading mechanisms in Day Ahead Market (DAM), Real Time Market (RTM), Green Day Ahead Market (GDAM), and Renewable Energy Certificates (REC).',
      'With power sector reforms moving toward market coupling, HPX is well-positioned to claim significant market share in traded power volumes.'
    ],
    financials: [
      { particulars: 'Traded Volume (BUs)', fy23: '2.5', fy24: '4.8', fy25: '8.2', fy26: '12.6', yoyChange: '+53%', isPositive: true },
      { particulars: 'Revenue (₹ Cr)', fy23: '14.2', fy24: '26.8', fy25: '48.0', fy26: '68.5', yoyChange: '+42%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '4.1', fy24: '9.8', fy25: '21.5', fy26: '34.2', yoyChange: '+59%', isPositive: true }
    ],
    shareholding: [
      { category: 'BSE Investments Limited', percentage: 22.60 },
      { category: 'PTC India Limited', percentage: 22.60 },
      { category: 'ICICI Bank Limited', percentage: 9.90 },
      { category: 'Other Corporate Stakeholders', percentage: 44.90 }
    ],
    fundRaises: [
      { date: '18 Nov 2023', amount: '₹ 75 Cr', price: '₹ 18.00', type: 'Rights Issue', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'Naveen Singh', role: 'Vice President & Business Head', experience: '18 yrs power markets', initials: 'NS' }
    ]
  },
  {
    id: 'onix-renewable',
    name: 'Onix Renewable Limited',
    ticker: 'ONIX',
    category: 'Recently Updated',
    sector: 'Renewable Energy',
    price: 47,
    change: '+5.1%',
    changeType: 'up',
    change6M: '+36.0%',
    lastUpdated: '09 Oct 2026',
    description: 'Leading green energy solution provider engaged in solar EPC, wind development, and battery storage solutions.',
    minLot: 500,
    marketCap: '₹ 980 Cr',
    peRatio: '18.4',
    pbRatio: '4.1',
    sparkline: [38, 40, 42, 44, 45, 46, 47],
    drhpStatus: 'Pre-IPO Growth Phase',
    isin: 'INE091O01018',
    cin: 'U40106GJ2022PLC131498',
    pan: 'AAECO8129M',
    high52: '₹ 52.00',
    low52: '₹ 29.00',
    bookValue: '₹ 11.40',
    faceValue: '₹ 2.00',
    sharesOutstanding: '20.8 Cr',
    debtToEquity: '0.35',
    roe: '22.8%',
    aboutRich: [
      'Onix Renewable Limited specializes in EPC execution for solar parks, hybrid wind-solar projects, and commercial rooftop solar installations across Gujarat, Maharashtra, and Rajasthan.',
      'The company benefits directly from national green energy targets and state solar subsidies, with an active execution orderbook exceeding 1.2 GW.'
    ],
    financials: [
      { particulars: 'Revenue (₹ Cr)', fy23: '185', fy24: '340', fy25: '520', fy26: '740', yoyChange: '+42%', isPositive: true },
      { particulars: 'EBITDA (₹ Cr)', fy23: '26', fy24: '54', fy25: '88', fy26: '132', yoyChange: '+50%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '14', fy24: '32', fy25: '55', fy26: '84', yoyChange: '+52%', isPositive: true }
    ],
    shareholding: [
      { category: 'Promoters & Family', percentage: 68.50 },
      { category: 'Strategic Pre-IPO Investors', percentage: 31.50 }
    ],
    fundRaises: [
      { date: '14 Dec 2024', amount: '₹ 120 Cr', price: '₹ 38.00', type: 'Pre-IPO Placement', instrument: 'Equity Shares' }
    ]
  },
  {
    id: 'gfcl-ev',
    name: 'GFCL EV Products Limited',
    ticker: 'GFCLEV',
    category: 'Recently Updated',
    sector: 'Automotive',
    price: 42,
    change: '+1.5%',
    changeType: 'up',
    change6M: '+28.0%',
    lastUpdated: '08 Oct 2026',
    description: 'Pioneering manufacturer of advanced battery chemicals, electrolytes, and cathode additives for EV battery ecosystems.',
    minLot: 400,
    marketCap: '₹ 2,400 Cr',
    peRatio: '27.5',
    pbRatio: '5.2',
    sparkline: [36, 37, 39, 40, 41, 41.5, 42],
    drhpStatus: 'Gujarat Fluorochemicals Demerged Unit',
    isin: 'INE097G01015',
    cin: 'U24100GJ2021PLC127814',
    pan: 'AAECG7814K',
    high52: '₹ 48.00',
    low52: '₹ 28.00',
    bookValue: '₹ 8.10',
    faceValue: '₹ 1.00',
    sharesOutstanding: '57.1 Cr',
    debtToEquity: '0.12',
    roe: '19.5%',
    aboutRich: [
      'GFCL EV Products Limited is the battery chemicals arm incubated by Gujarat Fluorochemicals Limited (GFL).',
      'It manufactures high-performance electrolyte salts like LiPF6, specialized battery binders like PVDF, and cathode active additive formulations for lithium-ion and sodium-ion electric vehicle cells.'
    ],
    financials: [
      { particulars: 'Revenue (₹ Cr)', fy23: '120', fy24: '280', fy25: '480', fy26: '720', yoyChange: '+50%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '18', fy24: '45', fy25: '82', fy26: '128', yoyChange: '+56%', isPositive: true }
    ],
    shareholding: [
      { category: 'GFL Promoters & Parent Entity', percentage: 74.00 },
      { category: 'Institutional & Public Shareholders', percentage: 26.00 }
    ],
    fundRaises: [
      { date: '10 Feb 2025', amount: '₹ 350 Cr', price: '₹ 35.00', type: 'Private Placement', instrument: 'Equity Shares' }
    ]
  },
  {
    id: 'swiggy',
    name: 'Swiggy Limited',
    ticker: 'SWIGGY',
    category: 'DRHP Filed',
    sector: 'Consumer Services',
    price: 485,
    change: '+2.9%',
    changeType: 'up',
    change6M: '+34.0%',
    lastUpdated: '08 Oct 2026',
    description: 'One of India’s leading on-demand convenience platforms delivering food, groceries via Instamart, and dining experiences.',
    minLot: 100,
    marketCap: '₹ 1,02,000 Cr',
    peRatio: 'N/A',
    pbRatio: '7.5',
    sparkline: [430, 445, 455, 460, 470, 480, 485],
    drhpStatus: 'DRHP Cleared by SEBI / IPO Issue Opening Soon',
    isin: 'INE00H001014',
    cin: 'U74110KA2013PLC096530',
    pan: 'AABCS9653K',
    high52: '₹ 510',
    low52: '₹ 340',
    bookValue: '₹ 64.50',
    faceValue: '₹ 1.00',
    sharesOutstanding: '210.3 Cr',
    debtToEquity: '0.04',
    roe: 'N/A',
    aboutRich: [
      'Swiggy is one of India’s foremost tech unicorns, pioneering hyperlocal food delivery, Instamart quick grocery delivery, Dineout reservations, and Genie parcel services.',
      'The company filed its updated prospectus with SEBI for a ₹10,000+ Crore public listing, supported by Prosus, SoftBank, Accel, and Elevation Capital.'
    ],
    financials: [
      { particulars: 'Gross Order Value (₹ Cr)', fy23: '22,400', fy24: '35,000', fy25: '48,000', fy26: '64,000', yoyChange: '+33%', isPositive: true },
      { particulars: 'Operating Revenue (₹ Cr)', fy23: '8,265', fy24: '11,247', fy25: '15,600', fy26: '20,800', yoyChange: '+33%', isPositive: true },
      { particulars: 'Adjusted EBITDA (₹ Cr)', fy23: '-3,200', fy24: '-1,480', fy25: '-620', fy26: '+140', yoyChange: '+122%', isPositive: true }
    ],
    shareholding: [
      { category: 'Prosus / MIH Internet', percentage: 32.50 },
      { category: 'SoftBank Vision Fund', percentage: 7.80 },
      { category: 'Accel & Elevation Capital', percentage: 12.40 },
      { category: 'Founders & Management (Sriharsha Majety)', percentage: 6.90 },
      { category: 'Public / Other Financial Investors', percentage: 40.40 }
    ],
    fundRaises: [
      { date: '26 Apr 2024', amount: 'Confidential Filing', price: '₹ 390.00', type: 'SEBI Pre-Filing', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'Sriharsha Majety', role: 'Group CEO & Managing Director', experience: 'Founder Leader', initials: 'SM' },
      { name: 'Rohit Kapoor', role: 'CEO - Food Marketplace', experience: 'Ex-Oyo Global CEO', initials: 'RK' }
    ]
  },
  {
    id: 'inox-air-products',
    name: 'Inox Air Products Limited',
    ticker: 'INOXAIR',
    category: 'DRHP Filed',
    sector: 'Manufacturing',
    price: 850,
    change: '+3.5%',
    changeType: 'up',
    change6M: '+26.0%',
    lastUpdated: '07 Oct 2026',
    description: 'India’s largest industrial and medical gases manufacturer, a 50:50 joint venture with Air Products USA.',
    minLot: 50,
    marketCap: '₹ 38,000 Cr',
    peRatio: '34.0',
    pbRatio: '6.8',
    sparkline: [780, 795, 810, 825, 835, 845, 850],
    drhpStatus: 'DRHP Filed for 100% OFS of 7.72 Cr Shares',
    isin: 'INE091I01011',
    cin: 'U24111MH1963PLC012586',
    pan: 'AAACI2586L',
    high52: '₹ 890',
    low52: '₹ 620',
    bookValue: '₹ 125.00',
    faceValue: '₹ 2.00',
    sharesOutstanding: '44.7 Cr',
    debtToEquity: '0.08',
    roe: '24.5%',
    aboutRich: [
      'INOX Air Products is India’s largest manufacturer of industrial and medical gases, serving healthcare, steel, automotive, semiconductor, and petrochemical sectors.',
      'Operating 45+ cryogenic air separation units across the country with a 50:50 joint ownership between Air Products (USA) and INOX Group (Jain family).',
      'The company filed its 689-page Draft Red Herring Prospectus with SEBI for a 100% Offer For Sale.'
    ],
    financials: [
      { particulars: 'Revenue (₹ Cr)', fy23: '2,640', fy24: '3,180', fy25: '3,920', fy26: '4,650', yoyChange: '+18%', isPositive: true },
      { particulars: 'EBITDA (₹ Cr)', fy23: '980', fy24: '1,240', fy25: '1,590', fy26: '1,940', yoyChange: '+22%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '610', fy24: '780', fy25: '1,010', fy26: '1,260', yoyChange: '+24%', isPositive: true }
    ],
    shareholding: [
      { category: 'Air Products Inc. (USA)', percentage: 50.00 },
      { category: 'INOX Group (Jain Family)', percentage: 50.00 }
    ],
    fundRaises: [
      { date: '01 Oct 2026', amount: '₹ 6,500 Cr', price: '₹ 850 (DRHP)', type: 'OFS Public Issue', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'Pavan Jain', role: 'Chairman', experience: '40 yrs industry veteran', initials: 'PJ' },
      { name: 'Siddharth Jain', role: 'Managing Director', experience: '22 yrs executive leader', initials: 'SJ' }
    ]
  },
  {
    id: 'hdb-financial',
    name: 'HDB Financial Services',
    ticker: 'HDBFS',
    category: 'Popular',
    sector: 'Financial Services',
    price: 1380,
    change: '+1.2%',
    changeType: 'up',
    change6M: '+21.0%',
    lastUpdated: '07 Oct 2026',
    description: 'Leading diversified retail NBFC subsidiary of HDFC Bank offering vehicle, mortgage, and personal financing.',
    minLot: 50,
    marketCap: '₹ 1,09,000 Cr',
    peRatio: '42.1',
    pbRatio: '6.4',
    sparkline: [1310, 1325, 1340, 1350, 1365, 1375, 1380],
    drhpStatus: 'Board Approved ₹12,500 Cr IPO Filing',
    isin: 'INE756I01020',
    cin: 'U65993GJ2007PLC051028',
    pan: 'AABCH5102G',
    high52: '₹ 1,450',
    low52: '₹ 980',
    bookValue: '₹ 215.00',
    faceValue: '₹ 10.00',
    sharesOutstanding: '79.0 Cr',
    debtToEquity: '5.20',
    roe: '16.8%',
    aboutRich: [
      'HDB Financial Services is an Upper-Layer NBFC promoted by HDFC Bank (holding 94.6% equity). It operates across 1,600+ branches in 1,000+ towns.',
      'RBI regulations require Upper-Layer NBFCs to be publicly listed within three years of designation, prompting HDFC Bank board approval for a ₹12,500 Crore IPO.'
    ],
    financials: [
      { particulars: 'Total Income (₹ Cr)', fy23: '12,403', fy24: '14,171', fy25: '17,200', fy26: '20,400', yoyChange: '+18%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '1,959', fy24: '2,461', fy25: '3,050', fy26: '3,780', yoyChange: '+23%', isPositive: true },
      { particulars: 'Gross NPA (%)', fy23: '2.73', fy24: '1.90', fy25: '1.75', fy26: '1.60', yoyChange: '-15 bps', isPositive: true }
    ],
    shareholding: [
      { category: 'HDFC Bank Limited', percentage: 94.64 },
      { category: 'Key Personnel & Employees', percentage: 2.16 },
      { category: 'Public Shareholders', percentage: 3.20 }
    ],
    fundRaises: [
      { date: '20 Sep 2024', amount: '₹ 12,500 Cr (Approved)', price: '₹ 1,350', type: 'Fresh + OFS IPO', instrument: 'Equity Shares' }
    ],
    leadership: [
      { name: 'G. Ramesh', role: 'Managing Director & CEO', experience: '30 yrs financial services', initials: 'GR' }
    ]
  },
  {
    id: 'boat-imagine-marketing',
    name: 'Imagine Marketing (boAt)',
    ticker: 'BOAT',
    category: 'Pre-IPO',
    sector: 'Consumer Services',
    price: 640,
    change: '+0.8%',
    changeType: 'up',
    change6M: '+15.2%',
    lastUpdated: '06 Oct 2026',
    description: 'Market leader in wearable audio, smartwatches, and lifestyle consumer tech products in India.',
    minLot: 75,
    marketCap: '₹ 9,500 Cr',
    peRatio: '39.4',
    pbRatio: '8.1',
    sparkline: [610, 615, 620, 628, 632, 638, 640],
    drhpStatus: 'Warburg Pincus & Malabar Backed',
    isin: 'INE0H6501018',
    cin: 'U52300MH2013PLC249758',
    pan: 'AABCI4975F',
    high52: '₹ 720',
    low52: '₹ 510',
    bookValue: '₹ 79.00',
    faceValue: '₹ 1.00',
    sharesOutstanding: '14.8 Cr',
    debtToEquity: '0.15',
    roe: '21.0%',
    aboutRich: [
      'Imagine Marketing Limited (boAt) is India’s #1 wearable audio and smartwatch lifestyle brand, co-founded by Aman Gupta and Sameer Mehta.',
      'The company accounts for nearly 30% of India’s True Wireless Stereo (TWS) market volume, successfully shifting production to domestic plants in collaboration with Dixon Technologies.'
    ],
    financials: [
      { particulars: 'Revenue (₹ Cr)', fy23: '3,377', fy24: '3,120', fy25: '4,100', fy26: '4,950', yoyChange: '+20%', isPositive: true },
      { particulars: 'EBITDA (₹ Cr)', fy23: '85', fy24: '145', fy25: '290', fy26: '410', yoyChange: '+41%', isPositive: true },
      { particulars: 'PAT (₹ Cr)', fy23: '-129', fy24: '45', fy25: '160', fy26: '255', yoyChange: '+59%', isPositive: true }
    ],
    shareholding: [
      { category: 'Aman Gupta & Sameer Mehta (Founders)', percentage: 56.40 },
      { category: 'Warburg Pincus (South Lake)', percentage: 25.60 },
      { category: 'Qualcomm Ventures & Malabar Fund', percentage: 18.00 }
    ],
    fundRaises: [
      { date: '28 Oct 2022', amount: '₹ 500 Cr ($60M)', price: '₹ 550.00', type: 'Convertible Preferred', instrument: 'CCPS' }
    ],
    leadership: [
      { name: 'Aman Gupta', role: 'Co-founder & CMO', experience: 'Entrepreneur & Shark Tank India Judge', initials: 'AG' },
      { name: 'Sameer Mehta', role: 'Co-founder & CEO', experience: 'Manufacturing & Tech Veteran', initials: 'SM' }
    ]
  }
];

export const SECTORS_DATA = [
  { name: 'Financial Services', count: 38, icon: 'landmark' },
  { name: 'Energy & Power', count: 24, icon: 'zap' },
  { name: 'Consumer Services', count: 29, icon: 'shopping-bag' },
  { name: 'Automobile & EV', count: 18, icon: 'car' },
  { name: 'Renewable Energy', count: 21, icon: 'sun' },
  { name: 'Manufacturing & Eng.', count: 32, icon: 'factory' },
  { name: 'Technology & AI', count: 42, icon: 'cpu' },
  { name: 'Aviation & Defence', count: 12, icon: 'shield' },
  { name: 'Building Materials', count: 16, icon: 'layers' },
  { name: 'Agriculture & Chemicals', count: 14, icon: 'sprout' },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Speak to our team',
    desc: 'Tell our dedicated relationship manager what you want to buy or sell. They share transparent indicative market prices and guide you through the stock details.',
    icon: 'message'
  },
  {
    step: 2,
    title: 'Transparent Settlement',
    desc: 'On agreed terms, payment is made strictly to our registered corporate bank account with complete legal invoice and digital documentation.',
    icon: 'file-check'
  },
  {
    step: 3,
    title: 'Shares Delivered in Demat',
    desc: 'Once settled, unlisted shares are directly transferred to your CDSL/NSDL demat account within 24 hours. We never route shares through third-party accounts.',
    icon: 'shield-check'
  }
];

export const REVIEWS_DATA = [
  {
    name: 'Gopinath Damodaran',
    role: 'Long-term Investor',
    initials: 'GD',
    rating: 5,
    review: 'Lightning fast. Shares were credited to my demat within hours of settlement, and the reasonable minimum lot sizes they offer made it smooth to start.'
  },
  {
    name: 'Nilesh Dahiwalkar',
    role: 'Equity Investor',
    initials: 'ND',
    rating: 5,
    review: 'Excellent and highly trustworthy. My experience buying private equity unlisted shares was transparent end-to-end. Thorough research papers provided.'
  },
  {
    name: 'Rahul Gupta',
    role: 'Private-market Investor',
    initials: 'RG',
    rating: 5,
    review: 'The promoters and relationship managers are genuine and very professional. Prompt with regulatory documents and transfer slips. Highly recommended.'
  }
];

export const INSIGHTS_DATA = [
  {
    id: 'inox-air',
    title: "INOX Air Products Files DRHP: Linde India's Biggest Rival Is Going Public",
    date: '01 Oct 2026',
    tag: 'Research Report',
    summary: 'A deep dive into the 689-page draft prospectus, evaluating market share, hospital oxygen margins, and valuation multiples.',
    readTime: '6 min read'
  },
  {
    id: 'inox-clean',
    title: 'Inox Clean Energy: Decoding the ₹10,000 Crore Mega IPO',
    date: '30 Sept 2026',
    tag: 'Valuation Note',
    summary: 'Analyzing the 9.29 GW power portfolio expansion and whether unlisted valuations leave money on the table for retail buyers.',
    readTime: '5 min read'
  },
  {
    id: 'maverick-sim',
    title: "Maverick's ₹125 Crore Bet on AI Surgical Simulation",
    date: '30 Sept 2026',
    tag: 'Company Analysis',
    summary: 'Exploring how Delhi-based medical robotics maker is expanding globally with Voxel-Man acquisition and high-margin ARR.',
    readTime: '4 min read'
  }
];

export const VIDEOS_DATA = [
  {
    id: 'igx-contracts',
    title: 'IGX Gets a BIG Approval! 1–2 Year Gas Contracts Before IPO?',
    tag: 'Market Move',
    date: '25 Sept 2026',
    duration: '8:45'
  },
  {
    id: 'old-monk',
    title: 'Old Monk (Mohan Meakin) FY26 Results & Hidden Balance Sheet Treasures',
    tag: 'Financial Breakdown',
    date: '25 Sept 2026',
    duration: '11:20'
  },
  {
    id: 'khagantak-defence',
    title: 'Khagantak-243: The Precision Glide Bomb Built by India’s Defence Startup',
    tag: 'Defence Tech',
    date: '11 Sept 2026',
    duration: '9:15'
  }
];
