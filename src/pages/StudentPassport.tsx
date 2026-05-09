import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet, Shield, Zap, Trophy, Star, Award, Globe, ExternalLink,
  Copy, CheckCircle2, GraduationCap, Code, Users, Sparkles, Lock,
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useApp } from '@/lib/context';
import { mockBadges } from '@/lib/mockData';
import {
  mockPassportData,
  mockNFTAchievements,
  mockCredentials,
  mockWalletTransactions,
} from '@/lib/web3MockData';
import XpBar from '@/components/XpBar';
import NFTAchievementCard from '@/components/NFTAchievementCard';
import MilestoneTracker from '@/components/MilestoneTracker';
import TransactionHistory from '@/components/TransactionHistory';
import ChainSelector from '@/components/ChainSelector';
import CrossChainCard from '@/components/CrossChainCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const credTypeIcons: Record<string, React.ElementType> = {
  education: GraduationCap,
  skill: Zap,
  participation: Code,
  employment: Users,
};

const credTypeColors: Record<string, string> = {
  education: 'bg-primary/10 text-primary',
  skill: 'bg-accent/10 text-accent',
  participation: 'bg-warning/10 text-warning',
  employment: 'bg-success/10 text-success',
};

type TabType = 'overview' | 'nfts' | 'credentials' | 'activity';

export default function StudentPassport() {
  const { user } = useApp();
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copied, setCopied] = useState(false);

  const walletAddress = publicKey?.toBase58() || mockPassportData.walletAddress;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!connected) {
    return (
      <div className="p-4 sm:p-6 max-w-4xl mx-auto h-[calc(100vh-theme(spacing.24))] flex flex-col items-center justify-center text-center page-enter">
        <div className="w-20 h-20 rounded-3xl bg-secondary/50 border border-border flex items-center justify-center mb-6">
          <Shield className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">On-Chain Student Passport</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Connect your Solana wallet to unlock your decentralized identity, view your verified achievements, and start building your immutable reputation.
        </p>
        <WalletMultiButton className="!bg-primary hover:!bg-primary/90 !transition-colors !rounded-xl !h-12 !px-8 !font-semibold !text-base shadow-lg shadow-primary/20" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 page-enter">
      {/* Header Profile Section */}
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="relative rounded-2xl border border-border bg-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50" />
        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full md:w-auto">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <h1 className="font-display text-2xl font-bold text-foreground">Web3 Passport</h1>
                <Sparkles className="w-4 h-4 text-warning" />
              </div>
              <p className="text-muted-foreground text-sm flex items-center justify-center sm:justify-start gap-2 mb-3">
                {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                <button onClick={handleCopy} className="hover:text-foreground transition-colors">
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  Global Rank #{mockPassportData.globalRank}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-success/10 text-success border border-success/20">
                  Reputation: {mockPassportData.reputationScore}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2 bg-secondary/50 p-4 rounded-xl border border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Passport Level</span>
              <span className="font-bold text-foreground">{user?.level || 1}</span>
            </div>
            <XpBar currentXp={mockPassportData.totalXp} nextLevelXp={3000} size="sm" />
            <div className="text-right text-xs text-muted-foreground">
              {mockPassportData.totalXp} / 3000 XP
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide border-b border-border pb-px">
        {(['overview', 'nfts', 'credentials', 'activity'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-semibold capitalize whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {tab === 'nfts' ? 'NFT Achievements' : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
                <h3 className="text-lg font-semibold text-foreground mb-4">Milestones</h3>
                <MilestoneTracker />
              </motion.div>
              
              <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Recent NFTs</h3>
                  <button onClick={() => setActiveTab('nfts')} className="text-sm text-primary hover:underline">View All</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {mockNFTAchievements.slice(0, 2).map(nft => (
                    <NFTAchievementCard key={nft.id} achievement={nft} />
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
                <h3 className="text-lg font-semibold text-foreground mb-4">Cross-Chain Identity</h3>
                <CrossChainCard />
              </motion.div>
              
              <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="text-sm font-semibold text-foreground mb-4">Network Settings</h3>
                <ChainSelector />
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'nfts' && (
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTAchievements.map(nft => (
                <NFTAchievementCard key={nft.id} achievement={nft} />
              ))}
              
              {/* Mint Placeholder */}
              <div className="border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[300px] opacity-70 hover:opacity-100 hover:bg-secondary/30 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">More NFTs locked</p>
                <p className="text-xs text-muted-foreground">Complete opportunities to earn more on-chain achievements.</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'credentials' && (
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Verified Credentials</h4>
                <p className="text-xs text-muted-foreground">These credentials have been cryptographically verified by the issuer and stored on the blockchain.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {mockCredentials.map((cred) => {
                const Icon = credTypeIcons[cred.type] || Award;
                const colorClass = credTypeColors[cred.type] || 'bg-secondary text-foreground';
                
                return (
                  <div key={cred.id} className="p-5 rounded-xl border border-border bg-card card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {cred.verified && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-success bg-success/10 px-2 py-1 rounded-md">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground leading-tight mb-1">{cred.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4">Issued by <span className="text-foreground font-medium">{cred.issuer}</span></p>
                    
                    <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Issued: {cred.issuedAt}</span>
                      {cred.txHash && (
                        <a href="#" className="flex items-center gap-1 text-primary hover:underline">
                          View Tx <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="max-w-2xl">
            <TransactionHistory transactions={mockWalletTransactions} />
          </motion.div>
        )}

      </div>
    </div>
  );
}
