import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Flame, Trophy, Target, Send,
  Bookmark, Bot, TrendingUp, Zap, Clock, Shield, Award, Wallet,
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useApp } from '@/lib/context';
import { mockBadges, mockAchievements, mockOpportunities } from '@/lib/mockData';
import { mockNFTAchievements, mockPassportData } from '@/lib/web3MockData';
import OpportunityCard from '@/components/OpportunityCard';
import XpBar from '@/components/XpBar';
import BadgeCard from '@/components/BadgeCard';
import WalletProfileCard from '@/components/WalletProfileCard';
import NFTAchievementCard from '@/components/NFTAchievementCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Dashboard() {
  const { user, applications, savedOpportunities } = useApp();
  const { connected } = useWallet();
  const navigate = useNavigate();
  const displayName = user?.name?.split(' ')[0] || 'Explorer';
  const recommended = mockOpportunities.filter(o => o.featured).slice(0, 3);

  const quickStats = [
    { icon: Send, label: 'Applied', value: applications.length, color: 'text-primary' },
    { icon: Bookmark, label: 'Saved', value: savedOpportunities.length, color: 'text-accent' },
    { icon: Trophy, label: 'Badges', value: mockBadges.filter(b => b.earnedAt).length, color: 'text-warning' },
    { icon: Flame, label: 'Streak', value: `${user?.streak || 0}d`, color: 'text-destructive' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 page-enter">
      {/* Greeting */}
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Welcome back, <span className="gradient-text">{displayName}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Here's what's new for you today.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/passport')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors touch-active"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">Web3 Passport</span>
            </button>
            <button
              onClick={() => navigate('/ai-assistant')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 touch-active glow-primary"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden" animate="visible" custom={i + 1} variants={fadeUp}
                className="p-4 rounded-xl border border-border bg-card card-hover flex flex-col items-center justify-center text-center"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-background border border-border mb-2 ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Recommended Opportunities */}
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Recommended Matches
              </h2>
              <button 
                onClick={() => navigate('/opportunities')}
                className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommended.slice(0, 2).map((opp, i) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column (Sidebar Content) */}
        <div className="space-y-6">
          
          {/* Level & XP Progress */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Level {user?.level || 1}</p>
                  <p className="text-xs text-muted-foreground">{user?.xp || 0} XP Total</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/leaderboard')}
                className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                Rank #124
              </button>
            </div>
            <XpBar xp={user?.xp || 0} level={user?.level || 1} size="md" />
            <p className="text-xs text-center text-muted-foreground mt-3">
              {(user?.levelProgress || 0) < 100 ? `${3000 - (user?.xp || 0)} XP needed for next level` : 'Max level reached!'}
            </p>
          </motion.div>

          {/* Connected Wallet Profile OR Prompt */}
          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
            {connected ? (
              <WalletProfileCard />
            ) : (
              <div className="p-5 rounded-xl border border-border bg-card flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 mb-3 border border-accent/20">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Connect Your Wallet</h3>
                <p className="text-xs text-muted-foreground mb-4">Connect to unlock your on-chain student passport and claim NFTs.</p>
                <button
                   className="w-full py-2.5 rounded-xl text-sm font-semibold border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  Connect Solana Wallet
                </button>
              </div>
            )}
          </motion.div>

          {/* Recent Badges & NFTs */}
          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp} className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 px-1">
              <Award className="w-4 h-4 text-warning" />
              Recent Achievements
            </h3>
            <div className="flex flex-col gap-3">
              {mockNFTAchievements.slice(0, 1).map(nft => (
                <NFTAchievementCard key={nft.id} nft={nft} compact />
              ))}
              {mockBadges.filter(b => b.earnedAt).slice(0, 2).map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
