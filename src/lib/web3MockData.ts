import type {
  WalletTransaction,
  NFTAchievement,
  VerifiedCredential,
  PassportData,
  ChainInfo,
} from './types';

export const mockWalletTransactions: WalletTransaction[] = [
  {
    id: '1',
    type: 'nft_mint',
    title: 'Hackathon Hero NFT Minted',
    description: 'Solana Hyperdrive participation badge',
    timestamp: '2025-04-28T14:30:00Z',
    status: 'confirmed',
    signature: '5KtPn1LGuxhFiwjxErkxTb3XwEsSJBTMRi9ULajr8GnEb4NDe2F...',
    amount: '0.00 SOL',
  },
  {
    id: '2',
    type: 'badge_claim',
    title: 'Early Adopter Badge Claimed',
    description: 'Joined OpportunityOS in launch week',
    timestamp: '2025-04-15T10:00:00Z',
    status: 'confirmed',
    signature: '3MhJvNUDfWxDkRb6fJRQeN6pYvSUW5TZB3vxKJLqHxR4T9UEz...',
  },
  {
    id: '3',
    type: 'xp_reward',
    title: 'XP Reward: Profile Completed',
    description: '+100 XP credited on-chain',
    timestamp: '2025-04-14T08:45:00Z',
    status: 'confirmed',
    signature: '2KJhxZeNQw8RDHF5vQpJixnYTWz9yDCAb8E3sMgRnAhk...',
    amount: '+100 XP',
  },
  {
    id: '4',
    type: 'credential_verify',
    title: 'MIT Enrollment Verified',
    description: 'Education credential verified on-chain',
    timestamp: '2025-04-10T16:20:00Z',
    status: 'confirmed',
    signature: '4RtYuIoPaS3dFgHjKlZxCvBnM6qWeRtYuIoPaSdFgH...',
  },
  {
    id: '5',
    type: 'nft_mint',
    title: 'Streak Master NFT',
    description: '7-day streak achievement minted',
    timestamp: '2025-04-08T12:00:00Z',
    status: 'confirmed',
    signature: '7FgHjKlZxCvBnMqWeRtYuIoPaSdFgHjKlZxCvBnM...',
    amount: '0.00 SOL',
  }
];

export const mockMintNFT = async (nftId: string) => {
  return new Promise<{ success: boolean; txHash: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        txHash: `mock_tx_${Date.now()}_${nftId}`,
      });
    }, 1500);
  });
};

export const mockNFTAchievements: NFTAchievement[] = [
  {
    id: 'nft-1',
    title: 'Hackathon Hero',
    description: 'Participated in the Solana Hyperdrive Hackathon 2024.',
    imageUrl: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=500&q=80',
    mintAddress: '8yF8XzJqZ3w...',
    earnedAt: '2024-03-05',
    attributes: [
      { trait_type: 'Event', value: 'Solana Hyperdrive' },
      { trait_type: 'Role', value: 'Developer' },
      { trait_type: 'Rarity', value: 'Epic' }
    ]
  },
  {
    id: 'nft-2',
    title: 'Early Adopter',
    description: 'One of the first 10,000 students on OpportunityOS.',
    imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500&q=80',
    mintAddress: '2aB4Cd5eF...',
    earnedAt: '2024-01-15',
    attributes: [
      { trait_type: 'Generation', value: 'Genesis' },
      { trait_type: 'Rarity', value: 'Legendary' }
    ]
  }
];

export const mockCredentials: VerifiedCredential[] = [
  {
    id: 'cred-1',
    type: 'education',
    issuer: 'Massachusetts Institute of Technology',
    title: 'B.S. Computer Science (In Progress)',
    issuedAt: '2022-09-01',
    verified: true,
    txHash: '4RtYuIoPaS3...'
  },
  {
    id: 'cred-2',
    type: 'skill',
    issuer: 'Solana Foundation',
    title: 'Solana Developer Bootcamp Graduate',
    issuedAt: '2023-11-15',
    verified: true,
    txHash: '9GhJkLzXcVb...'
  }
];

export const mockPassportData: PassportData = {
  walletAddress: '8yF8XzJqZ3w8yF8XzJqZ3w8yF8XzJqZ3w8yF8XzJqZ3w',
  reputationScore: 845,
  totalXp: 2450,
  globalRank: 124,
  joinDate: '2024-01-10'
};

export const mockChains: ChainInfo[] = [
  { id: 'solana', name: 'Solana', icon: 'solana-logo', balance: '2.45', symbol: 'SOL' },
  { id: 'ethereum', name: 'Ethereum', icon: 'eth-logo', balance: '0.12', symbol: 'ETH' },
  { id: 'polygon', name: 'Polygon', icon: 'polygon-logo', balance: '145.2', symbol: 'MATIC' },
];
