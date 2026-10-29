/**
 * Team & Leadership Data for Unlisted Pond
 *
 * This file is the single source of truth for all leadership profiles and practice area services.
 * Real partner names, verified qualifications, photographs, and confirmed focus areas are maintained here.
 */

export interface PartnerProfile {
  id: string;
  name: string;
  designation: string;
  roleBadge: string;
  qualifications: string[];
  isProvisional?: boolean;
  provisionalNote?: string;
  bio: string;
  expertise: string[];
  email?: string;
  imageUrl?: string; // e.g. '/images/team/partner1.jpg' when available
  initials: string;
  summaryHighlights: string[];
}

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
 * Three Partners of Unlisted Pond
 * Exactly 3 partner profiles with factual Chartered Accountancy designations.
 */
export const PARTNER_PROFILES: PartnerProfile[] = [
  {
    id: 'akshay-biswal',
    name: 'CA Akshay Biswal',
    designation: 'Chartered Accountant',
    roleBadge: 'Debt & Equity Finance',
    qualifications: ['Chartered Accountant (CA)'],
    isProvisional: false,
    bio: 'Chartered Accountant specializing in debt financing, equity finance advisory, and structured debt restructuring solutions for corporate entities and growing enterprises.',
    expertise: [
      'Debt Finance',
      'Equity Finance',
      'Debt Restructuring'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '', // Portrait image path when provided
    initials: 'AB',
    summaryHighlights: [
      'Debt finance facilitation & borrowing advisory',
      'Equity finance advisory & capital planning',
      'Debt restructuring frameworks for corporate requirements'
    ]
  },
  {
    id: 'rajat-goyal',
    name: 'CA Rajat Goyal',
    designation: 'Chartered Accountant',
    roleBadge: 'Corporate Finance & Advisory',
    qualifications: ['Chartered Accountant (CA)'],
    isProvisional: true,
    provisionalNote: 'Provisional focus areas — subject to final partner confirmation',
    bio: 'Chartered Accountant advising on corporate finance mandates, financial advisory frameworks, business funding coordination, and financial planning and analysis.',
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
      'Corporate finance and strategic planning (Provisional)',
      'Financial advisory and business funding guidance (Provisional)',
      'Financial planning and analytical review (Provisional)'
    ]
  },
  {
    id: 'sachin-bahl',
    name: 'CA Sachin Bahl',
    designation: 'Chartered Accountant',
    roleBadge: 'Financial Advisory & Structuring',
    qualifications: ['Chartered Accountant (CA)'],
    isProvisional: true,
    provisionalNote: 'Provisional focus areas — subject to final partner confirmation',
    bio: 'Chartered Accountant focusing on financial advisory, business finance structuring, corporate transactions, and financial modeling.',
    expertise: [
      'Financial Advisory',
      'Business Finance',
      'Corporate Transactions',
      'Financial Structuring'
    ],
    email: 'dealing@unlistedpond.com',
    imageUrl: '',
    initials: 'SB',
    summaryHighlights: [
      'Financial advisory and business finance structuring (Provisional)',
      'Corporate transaction coordination and review (Provisional)',
      'Financial structuring guidance for corporate mandates (Provisional)'
    ]
  }
];

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
