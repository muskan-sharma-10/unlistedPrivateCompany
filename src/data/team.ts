/**
 * Founders & Leadership Data for Unlisted Pond
 *
 * This file is the single source of truth for all leadership profiles and practice area services.
 * Real founder names, verified qualifications, photographs, and confirmed focus areas are maintained here.
 */

export type LeadershipGroup = 'founder' | 'partner' | 'co-founder';

export interface FounderProfile {
  id: string;
  founderNumber: string; // e.g. "01", "02", "03", "04", "05"
  name: string;
  designation: string; // e.g. "Founder" | "Partner" | "Co-Founder"
  group: LeadershipGroup;
  companyRole?: string;
  categoryLabel?: string;
  statusLabel?: string;
  roleBadge: string;
  qualifications: string[];
  isProvisional?: boolean;
  provisionalNote?: string;
  bio: string;
  expertise: string[];
  email?: string;
  imageUrl?: string; // Authentic portrait path when provided
  initials: string;
  summaryHighlights: string[];
}

// Backward compatibility alias
export type PartnerProfile = FounderProfile;

export interface TeamServiceOffering {
  id: string;
  title: string;
  category: string;
  description: string;
  keyDeliverables: string[];
  focusArea: string;
  iconName: 'calculator' | 'landmark' | 'trending-up' | 'briefcase';
}

/**
 * Leadership Team of Unlisted Pond
 *
 * 1. CA Akshay Biswal - Founder
 * 2. CA Rajat Goyal - Founder
 * 3. CA Sanket Agarwal - Partner
 * 4. CA Mohit Gupta - Partner
 * 5. CA Vaibhav Bansal - Partner
 * 6. Harish Mittal - Co-Founder (placed at the bottom)
 */
export const FOUNDER_PROFILES: FounderProfile[] = [
  {
    id: 'akshay-biswal',
    founderNumber: '01',
    name: 'CA Akshay Biswal',
    designation: 'Founder',
    group: 'founder',
    companyRole: 'Chartered Accountant · Founder, Unlisted Pond',
    categoryLabel: 'FOUNDER',
    statusLabel: 'Founder',
    roleBadge: 'Debt & Equity Finance',
    qualifications: ['Chartered Accountant (CA)'],
    bio: 'Chartered Accountant bringing professional expertise to debt financing, equity finance advisory, and structured corporate debt restructuring at Unlisted Pond.',
    expertise: [
      'Debt Finance',
      'Equity Finance',
      'Debt Restructuring',
      'Financial Advisory',
      'Financial Planning / Corporate Advisory',
      'Transaction Planning'
    ],
    email: 'info.biswal01@gmail.com',
    imageUrl: '/images/team/ca-akshay-biswal.jpg',
    initials: 'AB',
    summaryHighlights: [
      'Debt financing facilitation & borrowing advisory',
      'Equity finance & strategic capital planning',
      'Corporate debt restructuring frameworks'
    ]
  },
  {
    id: 'rajat-goyal',
    founderNumber: '02',
    name: 'CA Rajat Goyal',
    designation: 'Founder',
    group: 'founder',
    companyRole: 'Chartered Accountant · Founder, Unlisted Pond',
    categoryLabel: 'FOUNDER',
    statusLabel: 'Founder',
    roleBadge: 'Corporate Finance & Advisory',
    qualifications: ['Chartered Accountant (CA)'],
    bio: 'Chartered Accountant contributing professional financial and advisory expertise to corporate finance mandates and strategic business initiatives.',
    expertise: [
      'Corporate Finance',
      'Financial Advisory',
      'Business Funding',
      'Financial Planning & Analysis'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '',
    initials: 'RG',
    summaryHighlights: [
      'Corporate finance guidance',
      'Financial advisory & business funding',
      'Financial planning & analysis'
    ]
  },
  {
    id: 'sanket-agarwal',
    founderNumber: '03',
    name: 'CA Sanket Agarwal',
    designation: 'Partner',
    group: 'partner',
    companyRole: 'Fellow Chartered Accountant · Partner, Unlisted Pond',
    categoryLabel: 'PARTNER',
    statusLabel: 'Partner',
    roleBadge: 'Growth Capital & Private Equity',
    qualifications: [
      'Fellow Chartered Accountant (FCA)',
      'London Business School (LBS)'
    ],
    bio: 'Fellow Chartered Accountant (FCA) with executive management education from London Business School (LBS), bringing over 12 years of specialized leadership in private equity, capital markets, valuation, and growth-stage enterprise investments.',
    expertise: [
      'Private Equity',
      'Growth Capital',
      'Capital & Equity Markets',
      'Business Valuation',
      'Startup & Growth Investments',
      'Corporate Financial Strategy'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '/images/team/ca-sanket-agarwal.jpg',
    initials: 'SA',
    summaryHighlights: [
      'Private equity & growth-stage capital investment strategy',
      'Capital markets advisory & structured equity transactions',
      'Business valuation & growth enterprise consulting'
    ]
  },
  {
    id: 'mohit-gupta',
    founderNumber: '04',
    name: 'CA Mohit Gupta',
    designation: 'Partner',
    group: 'partner',
    companyRole: 'Chartered Accountant · Partner, Unlisted Pond',
    categoryLabel: 'PARTNER',
    statusLabel: 'Partner',
    roleBadge: 'Financial Structuring & Compliance',
    qualifications: ['Chartered Accountant (CA)'],
    bio: 'Chartered Accountant and Partner advising on financial structuring, statutory compliance, and corporate advisory frameworks.',
    expertise: [
      'Financial Structuring',
      'Corporate Advisory',
      'Statutory Compliance',
      'Financial Review'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '',
    initials: 'MG',
    summaryHighlights: [
      'Financial structuring & transaction advisory',
      'Statutory compliance & financial governance',
      'Corporate reporting & regulatory advisory'
    ]
  },
  {
    id: 'vaibhav-bansal',
    founderNumber: '05',
    name: 'CA Vaibhav Bansal',
    designation: 'Partner',
    group: 'partner',
    companyRole: 'Chartered Accountant · Partner, Unlisted Pond',
    categoryLabel: 'PARTNER',
    statusLabel: 'Partner',
    roleBadge: 'Corporate Advisory & Valuation',
    qualifications: ['Chartered Accountant (CA)'],
    bio: 'Chartered Accountant and Partner focusing on corporate advisory, business valuation, and financial analysis.',
    expertise: [
      'Corporate Advisory',
      'Business Valuation',
      'Financial Analysis',
      'Transaction Planning'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '/images/team/ca-vaibhav-bansal.jpg',
    initials: 'VB',
    summaryHighlights: [
      'Corporate financial advisory & planning',
      'Business valuation & financial analysis',
      'Transaction planning & analytical review'
    ]
  },
  {
    id: 'harish-mittal',
    founderNumber: '06',
    name: 'Harish Mittal',
    designation: 'Co-Founder',
    group: 'co-founder',
    companyRole: 'Co-Founder · Unlisted Pond',
    categoryLabel: 'CO-FOUNDER',
    statusLabel: 'Co-Founder',
    roleBadge: 'Strategic Leadership & Growth',
    qualifications: ['Strategic & Business Leadership'],
    bio: 'Co-Founder driving business strategy, market expansion, and strategic partnerships at Unlisted Pond.',
    expertise: [
      'Business Strategy',
      'Market Expansion',
      'Strategic Partnerships',
      'Corporate Growth'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '/images/team/harish-mittal.jpg',
    initials: 'HM',
    summaryHighlights: [
      'Business strategy & market development',
      'Strategic partnerships & enterprise relations',
      'Corporate growth & operational oversight'
    ]
  }
];

// Alias for backward compatibility
export const PARTNER_PROFILES = FOUNDER_PROFILES;

/**
 * Confirmed Practice Areas & Business Services (Section C)
 */
export const PRACTICE_SERVICES: TeamServiceOffering[] = [
  {
    id: 'ca-services',
    title: 'Chartered Accountancy Services',
    category: 'Statutory & Assurance',
    description: 'Comprehensive accounting, statutory compliance, tax advisory, and financial reporting delivered with rigorous precision and adherence to professional standards.',
    iconName: 'calculator',
    focusArea: 'Audit & Compliance',
    keyDeliverables: [
      'Statutory & Internal Audit Support',
      'Direct & Indirect Tax Planning & Compliance',
      'Financial Statement Preparation & Review',
      'Statutory Filings & Regulatory Reporting'
    ]
  },
  {
    id: 'business-loans',
    title: 'Business Loan Assistance',
    category: 'Credit & Capital',
    description: 'Strategic advisory and structured facilitation for business loans, working capital limits, term loans, and credit syndication through established lending channels.',
    iconName: 'landmark',
    focusArea: 'Debt Financing',
    keyDeliverables: [
      'Working Capital & CC/OD Facility Guidance',
      'Term Loans & Machinery Financing',
      'Financial Modeling for Credit Appraisal',
      'Lender Coordination & Documentation Support'
    ]
  },
  {
    id: 'corporate-finance',
    title: 'Corporate Finance',
    category: 'Capital Advisory',
    description: 'Strategic capital structure optimization, transaction modeling, due diligence reviews, and financial planning tailored for growing corporate entities.',
    iconName: 'trending-up',
    focusArea: 'Transaction & Capital Strategy',
    keyDeliverables: [
      'Capital Structure & Debt-Equity Optimization',
      'Financial Due Diligence & Health Assessments',
      'Enterprise Valuation Frameworks',
      'Transaction Advisory & Cash-Flow Modeling'
    ]
  },
  {
    id: 'business-advisory',
    title: 'Financial and Business Advisory',
    category: 'Strategy & Governance',
    description: 'Holistic consulting on corporate governance, statutory secretarial standards, enterprise expansion strategy, and private market navigation.',
    iconName: 'briefcase',
    focusArea: 'Strategic Growth',
    keyDeliverables: [
      'Enterprise Strategic Expansion Roadmaps',
      'Corporate Governance & Risk Frameworks',
      'Board Secretarial & Compliance Advisory',
      'Private Market Insights & Relationship Guidance'
    ]
  }
];
