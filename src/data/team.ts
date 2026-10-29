/**
 * Founders & Leadership Data for Unlisted Pond
 *
 * This file is the single source of truth for all founder profiles and practice area services.
 * Real founder names, verified qualifications, photographs, and confirmed focus areas are maintained here.
 */

export interface FounderProfile {
  id: string;
  founderNumber: string; // e.g. "01", "02", "03", "04", "05"
  name: string;
  designation: string;
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
 * Founders of Unlisted Pond
 */
export const FOUNDER_PROFILES: FounderProfile[] = [
  {
    id: 'akshay-biswal',
    founderNumber: '01',
    name: 'CA Akshay Biswal',
    designation: 'Chartered Accountant',
    roleBadge: 'Debt & Equity Finance',
    qualifications: ['Chartered Accountant (CA)'],
    isProvisional: false,
    bio: 'Chartered Accountant bringing professional expertise to debt financing, equity finance advisory, and structured corporate debt restructuring at Unlisted Pond.',
    expertise: [
      'Debt Finance',
      'Equity Finance',
      'Debt Restructuring'
    ],
    email: 'info.biswal01@gmail.com',
    imageUrl: '', // Authentic portrait path when provided
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
    designation: 'Chartered Accountant',
    roleBadge: 'Corporate Finance & Advisory',
    qualifications: ['Chartered Accountant (CA)'],
    isProvisional: true,
    provisionalNote: 'Provisional focus areas — subject to founder confirmation',
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
      'Corporate finance guidance (Provisional)',
      'Financial advisory & business funding (Provisional)',
      'Financial planning & analysis (Provisional)'
    ]
  },
  {
    id: 'harish-mittal',
    founderNumber: '03',
    name: 'Harish Mittal',
    designation: 'Co-Founder',
    roleBadge: 'Strategic Leadership & Growth',
    qualifications: ['Strategic & Business Leadership'],
    isProvisional: true,
    provisionalNote: 'Provisional focus areas — subject to founder confirmation',
    bio: 'Co-Founder driving business strategy, market expansion, and strategic partnerships at Unlisted Pond.',
    expertise: [
      'Business Strategy',
      'Market Expansion',
      'Strategic Partnerships',
      'Corporate Growth'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '',
    initials: 'HM',
    summaryHighlights: [
      'Business strategy & market development (Provisional)',
      'Strategic partnerships & enterprise relations (Provisional)',
      'Corporate growth & operational oversight (Provisional)'
    ]
  },
  {
    id: 'mohit-gupta',
    founderNumber: '04',
    name: 'CA Mohit Gupta',
    designation: 'Chartered Accountant',
    roleBadge: 'Financial Structuring & Compliance',
    qualifications: ['Chartered Accountant (CA)'],
    isProvisional: true,
    provisionalNote: 'Provisional focus areas — subject to founder confirmation',
    bio: 'Chartered Accountant advising on financial structuring, statutory compliance, and corporate advisory frameworks.',
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
      'Financial structuring & transaction advisory (Provisional)',
      'Statutory compliance & financial governance (Provisional)',
      'Corporate reporting & regulatory advisory (Provisional)'
    ]
  },
  {
    id: 'vaibhav-bansal',
    founderNumber: '05',
    name: 'CA Vaibhav Bansal',
    designation: 'Chartered Accountant',
    roleBadge: 'Corporate Advisory & Valuation',
    qualifications: ['Chartered Accountant (CA)'],
    isProvisional: true,
    provisionalNote: 'Provisional focus areas — subject to founder confirmation',
    bio: 'Chartered Accountant focusing on corporate advisory, business valuation, and financial analysis.',
    expertise: [
      'Corporate Advisory',
      'Business Valuation',
      'Financial Analysis',
      'Transaction Planning'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '',
    initials: 'VB',
    summaryHighlights: [
      'Corporate financial advisory & planning (Provisional)',
      'Business valuation & financial analysis (Provisional)',
      'Transaction planning & analytical review (Provisional)'
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
