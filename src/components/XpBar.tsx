import React from 'react';
import { getLevelProgress } from '@/lib/mockData';

interface XpBarProps {
    xp: number;
    level: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export default function XpBar({ xp, level, size = 'md', showLabel = true }: XpBarProps) {
    const progress = getLevelProgress(xp, level);
    const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' };

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-foreground">Level {level}</span>
                    <span className="text-[10px] text-muted-foreground">{xp} XP</span>
                </div>
            )}
            <div className={`w-full ${heights[size]} rounded-full bg-secondary overflow-hidden`}>
                <div
                    className={`${heights[size]} rounded-full transition-all duration-700 ease-out`}
                    style={{
                        width: `${progress}%`,
                        background: 'var(--gradient-primary)',
                    }}
                />
            </div>
        </div>
    );
}
