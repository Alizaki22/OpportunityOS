import React from 'react';
import {
    Rocket, User, Send, Code, Flame, GraduationCap, Globe, Bot,
} from 'lucide-react';
import type { Badge } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
    Rocket, User, Send, Code, Flame, GraduationCap, Globe, Bot,
};

const rarityColors: Record<string, { bg: string; border: string; text: string }> = {
    common: { bg: 'bg-secondary', border: 'border-border', text: 'text-muted-foreground' },
    rare: { bg: 'bg-info/10', border: 'border-info/30', text: 'text-info' },
    epic: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary' },
    legendary: { bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning' },
};

export default function BadgeCard({ badge }: { badge: Badge }) {
    const Icon = iconMap[badge.icon] || Rocket;
    const colors = rarityColors[badge.rarity];
    const earned = !!badge.earnedAt;

    return (
        <div
            className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${earned
                    ? `${colors.bg} ${colors.border} border`
                    : 'bg-secondary/30 border-border opacity-50'
                }`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${earned ? colors.bg : 'bg-secondary'}`}>
                <Icon className={`w-6 h-6 ${earned ? colors.text : 'text-muted-foreground'}`} />
            </div>
            <div className="text-center">
                <p className={`text-xs font-semibold ${earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {badge.name}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{badge.description}</p>
            </div>
            {earned && (
                <span className={`text-[9px] uppercase tracking-wider font-bold ${colors.text}`}>
                    {badge.rarity}
                </span>
            )}
            {!earned && (
                <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Locked</span>
            )}
        </div>
    );
}
