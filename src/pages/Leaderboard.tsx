import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
import { mockLeaderboard } from '@/lib/mockData';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

export default function Leaderboard() {
    const top3 = mockLeaderboard.slice(0, 3);
    const rest = mockLeaderboard.slice(3);

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Leaderboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Top students by XP this month</p>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[top3[1], top3[0], top3[2]].map((entry, i) => {
                    const order = [2, 1, 3];
                    const rank = order[i];
                    const heights = ['h-28', 'h-36', 'h-24'];
                    const colors = ['text-info', 'text-warning', 'text-primary'];
                    const icons = [Medal, Crown, Medal];
                    const Icon = icons[i];

                    return (
                        <motion.div
                            key={entry.rank}
                            initial="hidden" animate="visible" custom={i} variants={fadeUp}
                            className="flex flex-col items-center"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-sm font-bold bg-primary/20 text-primary mb-2">
                                {entry.avatar}
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-foreground text-center truncate max-w-full">{entry.name}</p>
                            <p className="text-[10px] text-muted-foreground">{entry.xp} XP</p>
                            <div className={`w-full ${heights[i]} mt-3 rounded-t-xl flex items-start justify-center pt-3`} style={{ background: 'var(--gradient-glow)' }}>
                                <Icon className={`w-6 h-6 ${colors[i]}`} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Rank Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="grid grid-cols-[3rem_1fr_4rem_4rem] sm:grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-2 px-4 py-3 bg-secondary/50 text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>#</span>
                    <span>Student</span>
                    <span className="text-right">XP</span>
                    <span className="text-right hidden sm:block">Badges</span>
                    <span className="text-right">Level</span>
                </div>
                {rest.map((entry, i) => (
                    <motion.div
                        key={entry.rank}
                        initial="hidden" animate="visible" custom={i + 3} variants={fadeUp}
                        className="grid grid-cols-[3rem_1fr_4rem_4rem] sm:grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-2 px-4 py-3 border-t border-border hover:bg-secondary/30 transition-colors items-center"
                    >
                        <span className="text-sm font-semibold text-muted-foreground">{entry.rank}</span>
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold bg-primary/10 text-primary shrink-0">
                                {entry.avatar}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{entry.name}</p>
                                <p className="text-[10px] text-muted-foreground">{entry.country}</p>
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-foreground text-right">{entry.xp.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground text-right hidden sm:block">{entry.badges}</span>
                        <span className="text-sm text-muted-foreground text-right">{entry.level}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
