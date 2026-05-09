import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {
  Bookmark, BookmarkCheck, ExternalLink, MapPin, Calendar,
  Volume2, Loader2, X, Check, Sparkles, Coins, Tag,
  GraduationCap, Briefcase, Building2, Code, Award, Trophy, Rocket, Users,
} from 'lucide-react';
import type { Opportunity } from '@/lib/types';
import { categoryConfig } from '@/lib/mockData';
import { useApp } from '@/lib/context';
import { generateSpeech } from '@/lib/elevenlabs';
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Briefcase, Building2, Code, Coins, Award, Trophy, Users, Rocket,
};

interface SwipeCardProps {
  opportunity: Opportunity;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isTop: boolean;
  zIndex: number;
  offset: number;
}

function SwipeCard({ opportunity, onSwipeLeft, onSwipeRight, isTop, zIndex, offset }: SwipeCardProps) {
  const { savedOpportunities, saveOpportunity, unsaveOpportunity, addApplication, applications } = useApp();
  const { toast } = useToast();
  const isSaved = savedOpportunities.includes(opportunity.id);
  const isApplied = applications.some(a => a.opportunityId === opportunity.id);
  const [isPlaying, setIsPlaying] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const config = categoryConfig[opportunity.category];
  const IconComp = iconMap[config?.icon] || Briefcase;

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!isTop) return;
    if (info.offset.x > 100) {
      onSwipeRight();
      if (!isSaved) saveOpportunity(opportunity.id);
      toast({ title: '📌 Saved!', description: opportunity.title });
    } else if (info.offset.x < -100) {
      onSwipeLeft();
    }
  };

  const handlePlaySummary = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      const text = `${opportunity.title} by ${opportunity.organization}. ${opportunity.description}`;
      const audio = await generateSpeech(text);
      audio.onended = () => setIsPlaying(false);
      await audio.play();
    } catch (err) {
      toast({ title: 'Voice unavailable', variant: 'destructive' });
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        zIndex,
        scale: isTop ? 1 : 1 - offset * 0.04,
        y: isTop ? 0 : offset * 12,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 swipe-card cursor-grab active:cursor-grabbing"
    >
      <div className="relative h-full rounded-2xl border border-border bg-card overflow-hidden">
        {/* Swipe indicators */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-6 left-6 z-10 px-3 py-1.5 rounded-xl border-2 border-success text-success font-bold text-lg rotate-[-15deg]"
            >
              SAVE ❤️
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-6 right-6 z-10 px-3 py-1.5 rounded-xl border-2 border-destructive text-destructive font-bold text-lg rotate-[15deg]"
            >
              SKIP 👋
            </motion.div>
          </>
        )}

        {/* Gradient top accent */}
        <div
          className="h-1 w-full"
          style={{ background: `${config?.color || 'hsl(var(--primary))'}` }}
        />

        <div className="p-5 h-full flex flex-col overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: (config?.color || '#7c3aed') + '25' }}
              >
                <IconComp className="w-6 h-6" style={{ color: config?.color || 'hsl(var(--primary))' }} />
              </div>
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: (config?.color || '#7c3aed') + '20', color: config?.color || 'hsl(var(--primary))' }}
                >
                  {config?.label || opportunity.category}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">{opportunity.organization}</p>
              </div>
            </div>
            <button
              onClick={() => isSaved ? unsaveOpportunity(opportunity.id) : saveOpportunity(opportunity.id)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors touch-active"
            >
              {isSaved
                ? <BookmarkCheck className="w-5 h-5 text-primary" />
                : <Bookmark className="w-5 h-5 text-muted-foreground" />
              }
            </button>
          </div>

          {/* Title */}
          <h2 className="font-display text-xl font-bold text-foreground mb-2 leading-snug">
            {opportunity.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {opportunity.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {opportunity.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {opportunity.deadline}
            </span>
            {opportunity.amount && (
              <span className="flex items-center gap-1.5 text-success font-semibold">
                <Coins className="w-3.5 h-3.5" /> {opportunity.amount}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {opportunity.tags.slice(0, 4).map(tag => (
              <span key={tag} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto space-y-3">
            {/* AI Voice Explain */}
            <button
              onClick={handlePlaySummary}
              disabled={isPlaying}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border border-primary/30 text-primary bg-primary/10 hover:bg-primary/20 transition-colors touch-active"
            >
              {isPlaying
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Playing summary...</>
                : <><Volume2 className="w-4 h-4" /><Sparkles className="w-3.5 h-3.5" /> AI Voice Explain</>
              }
            </button>

            {/* Apply CTA */}
            {isApplied ? (
              <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-success/10 text-success border border-success/20">
                <Check className="w-4 h-4" /> Applied Successfully
              </div>
            ) : (
              <button
                onClick={() => {
                  addApplication(opportunity.id);
                  toast({ title: '🚀 Applied!', description: `Application sent to ${opportunity.organization}` });
                }}
                className="w-full py-3 rounded-xl text-sm font-bold text-primary-foreground touch-active glow-primary"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Apply Now →
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface OpportunitySwipeFeedProps {
  opportunities: Opportunity[];
}

export default function OpportunitySwipeFeed({ opportunities }: OpportunitySwipeFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null);

  const visibleCards = opportunities.slice(currentIndex, currentIndex + 3);
  const remaining = opportunities.length - currentIndex;

  const handleSkip = () => {
    setExitDir('left');
    setTimeout(() => { setCurrentIndex(i => i + 1); setExitDir(null); }, 300);
  };

  const handleSave = () => {
    setExitDir('right');
    setTimeout(() => { setCurrentIndex(i => i + 1); setExitDir(null); }, 300);
  };

  if (remaining === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">You've seen them all!</h3>
        <p className="text-sm text-muted-foreground mb-6">Check back soon for fresh opportunities tailored to you.</p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground touch-active"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Counter */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{remaining}</span> opportunities left
        </p>
        <div className="flex gap-1">
          {opportunities.slice(0, Math.min(5, opportunities.length)).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i < currentIndex ? 'w-2 bg-primary/30' : i === currentIndex ? 'w-4 bg-primary' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card stack */}
      <div className="relative h-[480px] sm:h-[520px]">
        <AnimatePresence>
          {visibleCards.map((opp, i) => (
            <SwipeCard
              key={opp.id}
              opportunity={opp}
              onSwipeLeft={handleSkip}
              onSwipeRight={handleSave}
              isTop={i === 0}
              zIndex={visibleCards.length - i}
              offset={i}
            />
          )).reverse()}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 py-2">
        <button
          onClick={handleSkip}
          className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center shadow-lg hover:bg-destructive/10 hover:border-destructive/30 transition-colors touch-active"
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
        <p className="text-xs text-muted-foreground">
          Swipe <span className="text-success font-medium">right</span> to save ·{' '}
          <span className="text-destructive font-medium">left</span> to skip
        </p>
        <button
          onClick={handleSave}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg touch-active"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Bookmark className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
