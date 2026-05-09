import type {
  Opportunity,
  UserProfile,
  Badge,
  Application,
  Achievement,
  LeaderboardEntry,
} from './types';

export const mockUser: UserProfile = {
  id: '1',
  name: 'Alex Rivera',
  email: 'alex@university.edu',
  educationLevel: 'Undergraduate',
  university: 'MIT',
  country: 'United States',
  skills: ['React', 'Python', 'Machine Learning', 'UI/UX Design', 'Solidity'],
  interests: ['AI/ML', 'Web3', 'Climate Tech', 'EdTech'],
  careerGoals: ['AI Engineer', 'Startup Founder'],
  preferredIndustries: ['Technology', 'Finance', 'Healthcare'],
  preferredCountries: ['United States', 'United Kingdom', 'Singapore', 'Germany'],
  bio: 'CS student passionate about AI and Web3. Building the future one project at a time.',
  xp: 2450,
  level: 12,
  streak: 7,
  badges: [],
  onboardingComplete: true,
};

export const mockBadges: Badge[] = [
  { id: '1', name: 'Early Adopter', description: 'Joined OpportunityOS in the first week', icon: 'Rocket', rarity: 'legendary', earnedAt: '2024-01-15' },
  { id: '2', name: 'Profile Pro', description: 'Completed 100% of your profile', icon: 'User', rarity: 'common', earnedAt: '2024-01-16' },
  { id: '3', name: 'First Application', description: 'Submitted your first application', icon: 'Send', rarity: 'common', earnedAt: '2024-01-20' },
  { id: '4', name: 'Hackathon Hero', description: 'Applied to 5 hackathons', icon: 'Code', rarity: 'rare', earnedAt: '2024-02-01' },
  { id: '5', name: 'Streak Master', description: 'Maintained a 7-day streak', icon: 'Flame', rarity: 'rare', earnedAt: '2024-02-10' },
  { id: '6', name: 'Scholar', description: 'Applied to 10 scholarships', icon: 'GraduationCap', rarity: 'epic', earnedAt: '2024-02-20' },
  { id: '7', name: 'Global Explorer', description: 'Explored opportunities in 5+ countries', icon: 'Globe', rarity: 'epic' },
  { id: '8', name: 'AI Whisperer', description: 'Used AI assistant 50 times', icon: 'Bot', rarity: 'legendary' },
];

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Google Summer of Code 2025',
    organization: 'Google',
    category: 'internship',
    deadline: '2025-04-15',
    eligibility: 'University students 18+',
    location: 'Remote',
    description: 'Contribute to open source projects with Google mentors. Stipend provided.',
    tags: ['Open Source', 'Coding', 'Remote', 'Paid'],
    amount: '$3,000 - $6,600',
    url: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'Chevening Scholarship',
    organization: 'UK Government',
    category: 'scholarship',
    deadline: '2024-11-05',
    eligibility: 'Undergraduate degree, 2 years work experience',
    location: 'United Kingdom',
    description: 'Fully-funded master\'s degree in any subject at any UK university.',
    tags: ['Fully Funded', 'Masters', 'Global', 'Prestigious'],
    amount: 'Full Tuition + Stipend',
    url: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'Solana Hyperdrive Hackathon',
    organization: 'Solana Foundation',
    category: 'hackathon',
    deadline: '2024-10-15',
    eligibility: 'Open to everyone',
    location: 'Online',
    description: 'Global online hackathon with $1M in prizes. Build the future of Web3.',
    tags: ['Web3', 'Crypto', 'Prize Money', 'Global'],
    amount: 'Up to $50,000',
    url: '#',
    featured: true,
  },
  {
    id: '4',
    title: 'Microsoft Explore Program',
    organization: 'Microsoft',
    category: 'internship',
    deadline: '2024-12-01',
    eligibility: 'First and second-year college students',
    location: 'Redmond, WA',
    description: '12-week summer internship program designed specifically for college freshmen and sophomores.',
    tags: ['Big Tech', 'Summer 2025', 'Paid', 'Mentorship'],
    amount: '$7,500/month',
    url: '#',
    featured: false,
  },
  {
    id: '5',
    title: 'Y Combinator Summer 2025',
    organization: 'Y Combinator',
    category: 'incubator',
    deadline: '2025-02-15',
    eligibility: 'Founders with an idea or early-stage startup',
    location: 'San Francisco, CA (Hybrid)',
    description: 'The premier startup accelerator program. $500k investment for 7% equity.',
    tags: ['Startups', 'Funding', 'Network', 'Silicon Valley'],
    amount: '$500,000',
    url: '#',
    featured: true,
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    opportunityId: '1',
    status: 'under_review',
    appliedAt: '2024-03-01T10:00:00Z',
    lastUpdated: '2024-03-10T14:30:00Z',
  },
  {
    id: 'app-2',
    opportunityId: '3',
    status: 'accepted',
    appliedAt: '2024-02-15T09:00:00Z',
    lastUpdated: '2024-03-05T11:20:00Z',
  }
];

export const mockAchievements: Achievement[] = [
  { id: '1', title: 'Profile Setup', description: 'Completed onboarding', date: '2024-01-10', xp: 50 },
  { id: '2', title: 'First Application', description: 'Applied to GSoC', date: '2024-03-01', xp: 100 },
  { id: '3', title: 'Hackathon Winner', description: 'Top 10 in Solana Hyperdrive', date: '2024-03-05', xp: 500 },
];

export const categoryConfig: Record<string, { label: string; color: string }> = {
  scholarship: { label: 'Scholarships', color: 'text-primary' },
  job: { label: 'Jobs', color: 'text-success' },
  internship: { label: 'Internships', color: 'text-info' },
  hackathon: { label: 'Hackathons', color: 'text-accent' },
  grant: { label: 'Grants', color: 'text-warning' },
  fellowship: { label: 'Fellowships', color: 'text-primary' },
  competition: { label: 'Competitions', color: 'text-destructive' },
  incubator: { label: 'Incubators', color: 'text-secondary' },
};

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, id: 'u1', name: 'Sarah Chen', avatar: 'SC', country: 'Singapore', xp: 15420, badges: 24, level: 32 },
  { rank: 2, id: 'u2', name: 'David Kumar', avatar: 'DK', country: 'India', xp: 14850, badges: 21, level: 31 },
  { rank: 3, id: 'u3', name: 'Alex Rivera', avatar: 'AR', country: 'United States', xp: 14200, badges: 19, level: 30 },
  { rank: 4, id: 'u4', name: 'Elena Rossi', avatar: 'ER', country: 'Italy', xp: 13900, badges: 18, level: 29 },
  { rank: 5, id: 'u5', name: 'James Wilson', avatar: 'JW', country: 'UK', xp: 12500, badges: 15, level: 28 },
  { rank: 6, id: 'u6', name: 'Yuki Tanaka', avatar: 'YT', country: 'Japan', xp: 11800, badges: 14, level: 27 },
  { rank: 7, id: 'u7', name: 'Maria Garcia', avatar: 'MG', country: 'Spain', xp: 10950, badges: 12, level: 26 },
  { rank: 8, id: 'u8', name: 'Ahmed Hassan', avatar: 'AH', country: 'Egypt', xp: 9800, badges: 10, level: 24 },
];

export const getLevelProgress = (xp: number, level: number) => {
  // Simple calculation: 1000 XP per level
  const xpInCurrentLevel = xp % 1000;
  return (xpInCurrentLevel / 1000) * 100;
};
