import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Flame, Trophy, Target, Send,
  Bookmark, Bot, TrendingUp, Zap, Shield, Award, Wallet,
  ChevronRight, Star,
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useApp } from '@/lib/context';
import { mockBadges, mockOpportunities } from '@/lib/mockData';
import { mockNFTAchievements } from '@/lib/web3MockData';
import OpportunityCard from '@/components/OpportunityCard';
import XpBar from '@/components/XpBar';
import BadgeCard from '@/components/BadgeCard';
import WalletProfileCard from '@/components/WalletProfileCard';
import NFTAchievementCard from '@/components/NFTAchievementCard';
import { DashboardStatsSkeleton, OpportunityCardSkeleton } from '@/components/SkeletonLoaders';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const motivationalMessages = [
  "Let's make today count! 🚀",
  "Your next big opportunity awaits ✨",
  "Keep pushing, stay consistent 💪",
  "You're on a roll! Keep going 🔥",
  "The future belongs to builders 🌟",
];

export default function Dashboard() {
  const { user, applications, savedOpportunities } = useApp();
  const { connected } = useWallet();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [motivational] = useState(() => motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);

  // Simulate loading state for premium UX
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const displayName = user?.name?.split(' ')[0] || 'Explorer';
  const recommended = mockOpportunities.filter(o => o.featured).slice(0, 3);

  const quickStats = [
    { icon: Send, label: 'Applied', value: applications.length, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Bookmark, label: 'Saved', value: savedOpportunities.length, color: 'text-accent', bg: 'bg-accent/10' },
    { icon: Trophy, label: 'Badges', value: mockBadges.filter(b => b.earnedAt).length, color: 'text-warning', bg: 'bg-warning/10' },
    { icon: Flame, label: 'Streak', value: `${user?.streak || 0}d`, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 page-enter">

      {/* Greeting Header */}
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-0.5 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-warning" /> {motivational}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Hey, <span className="gradient-text">{displayName}</span> 👋
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/passport')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors touch-active"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span>Passport</span>
            </button>
            <button
              onClick={() => navigate('/ai-assistant')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 touch-active glow-primary"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Bot className="w-4 h-4" />
              <span>AI Mentor</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* === LEFT: Main Content === */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quick Stats */}
          {loading ? (
            <DashboardStatsSkeleton />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial="hidden" animate="visible" custom={i + 1} variants={fadeUp}
                  className="p-4 rounded-xl border border-border bg-card card-hover flex flex-col items-center justify-center text-center"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${stat.bg}`}>
                    <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* AI Recommended */}
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-primary" />
                AI Matched for You
              </h2>
              <button
                onClick={() => navigate('/opportunities')}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 touch-active"
              >
                See all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <OpportunityCardSkeleton />
                <OpportunityCardSkeleton />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {recommended.slice(0, 2).map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Actions - mobile shortcut strip */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Zap, label: 'Browse Hackathons', to: '/hackathons', color: 'from-violet-500 to-purple-600' },
                { icon: Award, label: 'View Scholarships', to: '/scholarships', color: 'from-blue-500 to-cyan-500' },
                { icon: Target, label: 'Explore Jobs', to: '/jobs', color: 'from-green-500 to-emerald-600' },
                { icon: TrendingUp, label: 'Leaderboard', to: '/leaderboard', color: 'from-amber-500 to-orange-500' },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.to)}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl border border-border bg-card hover:border-primary/30 transition-all text-left touch-active card-hover group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shrink-0`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{action.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* === RIGHT: Sidebar === */}
        <div className="space-y-5">

          {/* XP & Level Card */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="p-5 rounded-2xl border border-border bg-card overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10">
                  <TrendingUp className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Level {user?.level || 1}</p>
                  <p className="text-xs text-muted-foreground">{user?.xp || 0} XP</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/leaderboard')}
                className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors touch-active"
              >
                #124
              </button>
            </div>
            <XpBar xp={user?.xp || 0} level={user?.level || 1} size="md" />
            <p className="text-xs text-center text-muted-foreground mt-3">
              {(user?.xp || 0) < 3000
                ? `${3000 - (user?.xp || 0)} XP to Level ${(user?.level || 1) + 1}`
                : 'Max level reached! 🎉'}
            </p>
          </motion.div>

          {/* Wallet Card */}
          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
            {connected ? (
              <WalletProfileCard />
            ) : (
              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border border-accent/20 bg-accent/10 relative">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">Connect Wallet</h3>
                <p className="text-xs text-muted-foreground mb-4 max-w-[180px]">
                  Unlock your on-chain passport and NFT achievements
                </p>
                <button
                  onClick={() => navigate('/passport')}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-primary-foreground touch-active"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </motion.div>

          {/* Recent Achievements */}
          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Award className="w-4 h-4 text-warning" /> Recent Achievements
              </h3>
              <button onClick={() => navigate('/passport')} className="text-xs text-primary touch-active hover:underline">See all</button>
            </div>
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
