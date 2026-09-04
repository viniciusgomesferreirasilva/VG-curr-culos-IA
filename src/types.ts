export type TemplateStyle = 
  | 'modern_executive' 
  | 'clean_minimal' 
  | 'ats_classic' 
  | 'senior_strategic' 
  | 'tech_creative';

export type FontFamily = 
  | 'plus_jakarta' 
  | 'carlito' 
  | 'roboto' 
  | 'open_sans' 
  | 'lato' 
  | 'montserrat';

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente' | 'Nativo';
}

export interface PersonalInfo {
  fullName: string;
  targetTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  photoUrl?: string;
}

export interface ResumeData {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  certifications: Certification[];
  languages: LanguageItem[];
  coverLetter?: string;
  targetJobDescription?: string;
  templateStyle: TemplateStyle;
  fontFamily: FontFamily;
  primaryColor?: string;
  isDemo?: boolean;
}

export interface AtsAudit {
  overallScore: number;
  atsCompatibility: number;
  contentImpact: number;
  clarityAndReadability: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  summaryFeedback: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'recruiter' | 'candidate';
  text: string;
  timestamp: string;
}

export interface InterviewEvaluation {
  overallScore: number;
  communicationScore: number;
  clarityScore: number;
  confidenceScore: number;
  preparationScore: number;
  strengths: string[];
  improvements: string[];
  starTechniqueFeedback?: string;
  finalFeedback: string;
}

export interface CareerChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
