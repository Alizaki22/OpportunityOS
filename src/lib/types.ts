export type OpportunityCategory =
  | 'scholarship'
  | 'job'
  | 'internship'
  | 'hackathon'
  | 'grant'
  | 'fellowship'
  | 'competition'
  | 'mentorship'
  | 'incubator';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  deadline: string;
  eligibility: string;
  location: string;
  description: string;
  tags: string[];
  amount?: string;
  url: string;
  featured: boolean;
  imageUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  educationLevel: string;
  university: string;
  country: string;
  skills: string[];
  interests: string[];
  careerGoals: string[];
  preferredIndustries: string[];
  preferredCountries: string[];
  bio: string;
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  walletAddress?: string;
  onboardingComplete: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: string;
}

export interface Application {
  id: string;
  opportunityId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  appliedAt: string;
  lastUpdated: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  xp: number;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar?: string;
  country: string;
  xp: number;
  badges: number;
  level: number;
}

export interface WalletTransaction {
  id: string;
  type: 'nft_mint' | 'badge_claim' | 'xp_reward' | 'credential_verify';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  signature?: string;
  amount?: string;
}

export interface NFTAchievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  mintAddress: string;
  earnedAt: string;
  attributes: { trait_type: string; value: string }[];
}

export interface VerifiedCredential {
  id: string;
  type: 'education' | 'skill' | 'participation' | 'employment';
  issuer: string;
  title: string;
  issuedAt: string;
  verified: boolean;
  txHash?: string;
}

export interface PassportData {
  walletAddress: string;
  reputationScore: number;
  totalXp: number;
  globalRank: number;
  joinDate: string;
}

export interface ChainInfo {
  id: string;
  name: string;
  icon: string;
  balance: string;
  symbol: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}