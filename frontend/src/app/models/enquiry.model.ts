export interface ContactInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
}

export interface BusinessProfile {
  industry: string;
  companySize: string;
  businessStage: string;
}

export interface DigitalPresence {
  websiteUrl?: string;
  appUrl?: string;
  competitorUrl?: string;
  fileName?: string;
}

export interface SolutionBlueprint {
  packageTitle: string;
  packageDesc?: string;
  direction: string;
  modules: string[];
  impacts?: { title: string; desc: string }[];
}

export interface SalesNote {
  date: string;
  author: string;
  text: string;
}

export interface EnquiryRecord {
  id?: string;
  createdAt?: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';
  priority?: 'High' | 'Medium' | 'Normal';
  contact: ContactInfo;
  category: string;
  categoryName?: string;
  goals: string[];
  situation: string;
  profile: BusinessProfile;
  successVision: string;
  investment: string;
  currency: string;
  timeline: string;
  digitalPresence?: DigitalPresence;
  solutionBlueprint?: SolutionBlueprint;
  assignedTo?: string;
  notes?: SalesNote[];
}

export interface CrmStats {
  total: number;
  newLeads: number;
  contacted: number;
  qualified: number;
  proposals: number;
  won: number;
  highPriority: number;
  conversionRate: string;
  byIndustry: Record<string, number>;
  byCategory: Record<string, number>;
}
