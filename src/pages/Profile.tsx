import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, MapPin, GraduationCap, Briefcase, Wallet, Edit,
  Zap, Flame, Trophy, ExternalLink, Copy, Shield, ArrowRight, Award,
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useApp } from '@/lib/context';
import { mockBadges } from '@/lib/mockData';
import { mockPassportData } from '@/lib/web3MockData';
import XpBar from '@/components/XpBar';
import BadgeCard from '@/components/BadgeCard';
import TransactionHistory from '@/components/TransactionHistory';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
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

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 page-enter">
      {/* Hero Card */}
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <div className="relative p-6 rounded-2xl border border-border overflow-hidden" style={{ background: 'var(--gradient-glow)' }}>
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full opacity-20 blur-[80px]" style={{ backgroundColor: 'hsl(258 90% 66%)' }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold bg-primary/20 text-primary">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{user.country}</span>
                <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{user.university}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{user.careerGoals[0]}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => navigate('/settings')}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors"
              >
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Skills & Interests */}
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="p-5 rounded-xl border border-border bg-card">
            <h2 className="text-base font-semibold text-foreground mb-4">Skills & Interests</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Top Skills</p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <span key={interest} className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Wallet Profile */}
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Web3 Identity
              </h2>
              {connected ? (
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-success/10 text-success flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-success"></div> Connected
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground flex items-center gap-1">
                  Not Connected
                </span>
              )}
            </div>

            {connected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                  <div className="truncate pr-4">
                    <p className="text-xs text-muted-foreground mb-1">Primary Wallet</p>
                    <p className="text-sm font-mono text-foreground truncate">{walletAddress}</p>
                  </div>
                  <button onClick={copyAddr} className="p-2 hover:bg-secondary rounded-md text-muted-foreground transition-colors shrink-0">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <button onClick={() => navigate('/passport')} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" /> View Full Passport
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-4">Connect your Solana wallet to unlock your decentralized student passport and claim achievements.</p>
                <div className="flex justify-center">
                  <WalletMultiButton className="!bg-primary hover:!bg-primary/90 !transition-colors !rounded-xl !h-11 !px-6" />
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Stats */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="p-5 rounded-xl border border-border bg-card">
            <h2 className="text-base font-semibold text-foreground mb-4">Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-destructive/10">
                    <Flame className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Current Streak</span>
                </div>
                <span className="text-sm font-bold text-foreground">{user.streak} days</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-warning/10">
                    <Trophy className="w-4 h-4 text-warning" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Badges Earned</span>
                </div>
                <span className="text-sm font-bold text-foreground">{mockBadges.filter(b => b.earnedAt).length}</span>
              </div>
            </div>
          </motion.div>

          {/* Badges Preview */}
          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Top Badges</h2>
              <button className="text-xs text-primary hover:underline">View All</button>
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
