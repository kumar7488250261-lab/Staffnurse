export type Category = 'UR' | 'BC' | 'EBC' | 'SC' | 'ST' | 'EWS' | 'WBC' | 'UR-Female' | 'EWS-UR';

export interface Candidate {
  id: string;
  srNo: number;
  applicationNo: string;
  name: string;
  fatherName: string;
  dob: string;
  meritNo: number;
  category: string;
  selectionCategory: string;
  homeDistrict: string;
  postingPlace: string;
  postingDistrict: string;
  phone?: string;
  whatsapp?: string;
  notes?: string;
  isRegistered?: boolean;
  preferredDistricts?: string[];
  swapStatus?: 'open' | 'request_pending' | 'swapped';
}

export interface MutualMatch {
  candidateA: Candidate;
  candidateB: Candidate;
  matchType: 'direct' | 'preferred' | 'adjacent';
  matchScore: number; // 100 for exact mutual home district, 80-90 for adjacent/preferred
  reason: string;
}

export interface ThreeWayMatch {
  id: string;
  candidateA: Candidate; // Posted in X, wants Y
  candidateB: Candidate; // Posted in Y, wants Z
  candidateC: Candidate; // Posted in Z, wants X
  chainText: string;
}

export interface SwapRequest {
  id: string;
  fromCandidateId: string;
  toCandidateId: string;
  fromCandidateName: string;
  fromApplicationNo: string;
  fromHomeDistrict: string;
  fromPostingPlace: string;
  fromPhone: string;
  fromWhatsapp: string;
  toCandidateName: string;
  toApplicationNo: string;
  toHomeDistrict: string;
  toPostingPlace: string;
  toPhone?: string;
  status: 'pending' | 'accepted' | 'declined';
  message: string;
  createdAt: string;
}

export interface DistrictData {
  name: string;
  nameHindi: string;
  division: string;
  divisionHindi: string;
  adjacent: string[];
  isBihar: boolean;
}
