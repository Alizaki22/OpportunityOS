import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, Shield, Zap, Trophy, Star, Award, Globe, ExternalLink,
  Copy, CheckCircle2, GraduationCap, Code, Users, Sparkles, Lock,
  Fingerprint, ChevronRight,
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useApp } from '@/lib/context';
import { mockBadges } from '@/lib/mockData';
import {
  mockPassportData, mockNFTAchievements, mockCredentials, mockWalletTransactions,
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
  education: GraduationCap, skill: Zap, participation: Code, employment: Users,
};

const credTypeColors: Record<string, string> = {
  education: 'bg-primary/10 text-primary',
  skill: 'bg-accent/10 text-accent',
  participation: 'bg-warning/10 text-warning',
  employment: 'bg-success/10 text-success',
};

type TabType = 'overview' | 'nfts' | 'credentials' | 'activity';

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: Shield },
  { id: 'nfts', label: 'NFTs', icon: Award },
  { id: 'credentials', label: 'Credentials', icon: CheckCircle2 },
  { id: 'activity', label: 'Activity', icon: Zap },
];

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
      <div className="p-6 max-w-lg mx-auto h-[calc(100dvh-80px)] flex flex-col items-center justify-center text-center page-enter">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          className="w-24 h-24 rounded-3xl mb-6 flex items-center justify-center float"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Fingerprint className="w-12 h-12 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display text-2xl font-bold text-foreground mb-3"
        >
          Your Web3 Passport
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm mb-8 max-w-sm"
        >
          Connect your Solana wallet to unlock your decentralized identity, view NFT achievements, and build your on-chain reputation.
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full space-y-2.5 mb-8"
        >
          {[
            { icon: Shield, label: 'Verified on-chain credentials', color: 'text-primary' },
            { icon: Award, label: 'NFT achievement badges', color: 'text-warning' },
            { icon: Globe, label: 'Cross-chain identity', color: 'text-accent' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border text-left">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                <f.icon className={`w-4 h-4 ${f.color}`} />
              </div>
              <p className="text-sm font-medium text-foreground">{f.label}</p>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <WalletMultiButton
            style={{
              background: 'var(--gradient-primary)',
              borderRadius: '1rem',
              fontSize: '0.9rem',
              height: '52px',
              padding: '0 36px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-6 page-enter">
      {/* Hero Header - full bleed gradient */}
      <div className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        <div className="relative p-5 sm:p-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-5 items-start sm:items-center"
          >
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-20 h-20 rounded-2xl p-0.5 shrink-0"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <div className="w-full h-full rounded-[14px] bg-background flex items-center justify-center">
                  <Shield className="w-9 h-9 text-primary" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success border-2 border-background flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-success-foreground" />
              </div>
            </div>

            {/* Identity */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="font-display text-xl font-bold text-foreground">
                  {user?.name || 'Student Passport'}
                </h1>
                <Sparkles className="w-4 h-4 text-warning" />
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2 touch-active"
              >
                <span className="font-mono">{walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}</span>
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/25">
                  🏆 Global #{mockPassportData.globalRank}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-success/10 text-success border border-success/25">
                  ⭐ Rep {mockPassportData.reputationScore}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-accent/10 text-accent border border-accent/25">
                  Lv.{user?.level || 1}
                </span>
              </div>
            </div>

            {/* XP mini bar */}
            <div className="w-full sm:w-56 bg-secondary/50 border border-border rounded-xl p-3">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground font-medium">Passport XP</span>
                <span className="font-bold text-foreground">{mockPassportData.totalXp} / 3000</span>
              </div>
              <XpBar xp={mockPassportData.totalXp} level={user?.level || 1} size="sm" />
            </div>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-3 gap-3 mt-5"
          >
            {[
              { label: 'NFTs Earned', value: mockNFTAchievements.length, icon: Award, color: 'text-warning' },
              { label: 'Credentials', value: mockCredentials.length, icon: CheckCircle2, color: 'text-success' },
              { label: 'Transactions', value: mockWalletTransactions.length, icon: Zap, color: 'text-primary' },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-xl p-3 text-center">
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-14 z-20 glass-strong border-b border-border">
        <div className="flex overflow-x-auto scrollbar-hide max-w-5xl mx-auto px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all touch-active ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-5"
            >
              <div className="md:col-span-2 space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" /> Milestones
                  </h3>
                  <MilestoneTracker />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Award className="w-4 h-4 text-warning" /> Recent NFTs
                    </h3>
                    <button onClick={() => setActiveTab('nfts')} className="text-xs text-primary hover:underline touch-active">View all →</button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mockNFTAchievements.slice(0, 2).map(nft => (
                      <NFTAchievementCard key={nft.id} nft={nft} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-accent" /> Cross-Chain Identity
                  </h3>
                  <CrossChainCard />
                </div>
                <div className="p-4 rounded-xl border border-border bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Network</h3>
                  <ChainSelector />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'nfts' && (
            <motion.div key="nfts" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {mockNFTAchievements.map(nft => (
                  <NFTAchievementCard key={nft.id} nft={nft} />
                ))}
                {/* Locked slot */}
                <div className="border border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <Lock className="w-8 h-8 text-muted-foreground mb-3" />
                  <p className="text-sm font-semibold text-foreground mb-1">More coming</p>
                  <p className="text-xs text-muted-foreground">Complete opportunities to earn on-chain achievements</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'credentials' && (
            <motion.div key="credentials" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Verified Credentials</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Cryptographically verified and stored on-chain by issuers.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {mockCredentials.map((cred) => {
                  const Icon = credTypeIcons[cred.type] || Award;
                  const colorClass = credTypeColors[cred.type] || 'bg-secondary text-foreground';
                  return (
                    <motion.div
                      key={cred.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl border border-border bg-card card-hover"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {cred.verified && (
                          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-success bg-success/10 px-2 py-1 rounded-lg">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground leading-tight mb-1">{cred.title}</h3>
                      <p className="text-xs text-muted-foreground mb-4">Issued by <span className="text-foreground font-medium">{cred.issuer}</span></p>
                      <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{cred.issuedAt}</span>
                        {cred.txHash && (
                          <a href="#" className="flex items-center gap-1 text-primary hover:underline">
                            View Tx <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div key="activity" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl">
              <TransactionHistory transactions={mockWalletTransactions} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
