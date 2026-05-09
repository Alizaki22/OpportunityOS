import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, GraduationCap, Briefcase, Wallet, Edit,
  Flame, Trophy, Copy, Shield, Award, CheckCircle2, Zap,
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useApp } from '@/lib/context';
import { mockBadges } from '@/lib/mockData';
import { mockPassportData } from '@/lib/web3MockData';
import XpBar from '@/components/XpBar';
import BadgeCard from '@/components/BadgeCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Profile() {
  const { user } = useApp();
  const { publicKey, connected } = useWallet();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const walletAddress = publicKey?.toBase58() || mockPassportData.walletAddress;

  const copyAddr = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!user) return null;

  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 page-enter">

      {/* Hero Card */}
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <div className="relative p-6 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 blur-[80px]"
            style={{ backgroundColor: 'hsl(258 90% 66%)' }} />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
              style={{ background: 'var(--gradient-primary)', color: 'white' }}
            >
              {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{user.bio}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{user.country}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />{user.university}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />{user.careerGoals[0]}
                </span>
              </div>
            </div>

            {/* Edit button */}
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors touch-active shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit
            </button>
          </div>

          {/* XP Row */}
          <div className="relative z-10 mt-5 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">
                Level {user.level} · {user.xp} XP
              </span>
              <button
                onClick={() => navigate('/leaderboard')}
                className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors touch-active"
              >
                Rank #124
              </button>
            </div>
            <XpBar xp={user.xp} level={user.level} size="sm" />
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="md:col-span-2 space-y-5">

          {/* Skills & Interests */}
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="p-5 rounded-2xl border border-border bg-card"
          >
            <h2 className="text-base font-semibold text-foreground mb-4">Skills & Interests</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Top Skills</p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <span key={interest} className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Career Goals</p>
                <div className="flex flex-wrap gap-2">
                  {user.careerGoals.map(goal => (
                    <span key={goal} className="px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
                      🎯 {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Web3 Identity */}
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="p-5 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Wallet className="w-4.5 h-4.5 text-primary" /> Web3 Identity
              </h2>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                connected ? 'bg-success/10 text-success border border-success/20' : 'bg-secondary text-muted-foreground'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-success' : 'bg-muted-foreground'}`} />
                {connected ? 'Connected' : 'Not Connected'}
              </span>
            </div>

            {connected ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border">
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">Wallet Address</p>
                    <p className="text-sm font-mono text-foreground truncate">{walletAddress}</p>
                  </div>
                  <button onClick={copyAddr} className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors shrink-0 touch-active">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={() => navigate('/passport')}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-primary-foreground touch-active"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Shield className="w-4 h-4 inline mr-2" />View Full Passport
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
                  Connect your Solana wallet to unlock your decentralized student passport and on-chain achievements.
                </p>
                <div className="flex justify-center">
                  <WalletMultiButton
                    style={{
                      background: 'var(--gradient-primary)',
                      borderRadius: '0.75rem',
                      height: '44px',
                      padding: '0 24px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">

          {/* Activity Stats */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="p-5 rounded-2xl border border-border bg-card"
          >
            <h2 className="text-base font-semibold text-foreground mb-4">Activity</h2>
            <div className="space-y-2.5">
              {[
                { icon: Flame, label: 'Streak', value: `${user.streak} days`, color: 'text-destructive', bg: 'bg-destructive/10' },
                { icon: Trophy, label: 'Badges', value: `${mockBadges.filter(b => b.earnedAt).length} earned`, color: 'text-warning', bg: 'bg-warning/10' },
                { icon: Zap, label: 'XP Total', value: `${user.xp} XP`, color: 'text-primary', bg: 'bg-primary/10' },
                { icon: Award, label: 'Level', value: `Level ${user.level}`, color: 'text-accent', bg: 'bg-accent/10' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg}`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Badges */}
          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}
            className="p-5 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Top Badges</h2>
              <button
                onClick={() => navigate('/passport')}
                className="text-xs text-primary hover:underline touch-active"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {mockBadges.filter(b => b.earnedAt).slice(0, 3).map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
