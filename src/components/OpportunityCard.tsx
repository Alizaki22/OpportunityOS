import React from 'react';
import {
    Bookmark,
    BookmarkCheck,
    ExternalLink,
    MapPin,
    Calendar,
    Users,
    Volume2,
    Loader2,
    GraduationCap,
    Briefcase,
    Building2,
    Code,
    Coins,
    Award,
    Trophy,
    Rocket,
} from 'lucide-react';
import type { Opportunity } from '@/lib/types';
import { categoryConfig } from '@/lib/mockData';
import { useApp } from '@/lib/context';

const iconMap: Record<string, React.ElementType> = {
    GraduationCap, Briefcase, Building2, Code, Coins, Award, Trophy, Users, Rocket,
};

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
    const { savedOpportunities, saveOpportunity, unsaveOpportunity, addApplication, applications } = useApp();
    const isSaved = savedOpportunities.includes(opportunity.id);
    const isApplied = applications.some(a => a.opportunityId === opportunity.id);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const config = categoryConfig[opportunity.category];
    const IconComp = iconMap[config?.icon] || Briefcase;

    return (
        <div className="group rounded-xl border border-border bg-card p-4 card-hover">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: config?.color + '20', color: config?.color }}
                    >
                        <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                        <span
                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: config?.color + '15', color: config?.color }}
                        >
                            {config?.label}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => isSaved ? unsaveOpportunity(opportunity.id) : saveOpportunity(opportunity.id)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                >
                    {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-primary" />
                    ) : (
                        <Bookmark className="w-4 h-4 text-muted-foreground" />
                    )}
                </button>
            </div>

            <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors flex-1">
                    {opportunity.title}
                </h3>
                <button 
                    onClick={() => {
                        setIsPlaying(true);
                        setTimeout(() => setIsPlaying(false), 2000);
                        console.log(`[ElevenLabs Mock] Playing summary for ${opportunity.id}`);
                    }}
                    className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                        isPlaying 
                            ? 'bg-primary/10 border-primary/20 text-primary' 
                            : 'bg-card border-border text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                    title="Listen to summary"
                >
                    {isPlaying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{opportunity.organization}</p>

            <p className="text-xs text-secondary-foreground/70 line-clamp-2 mb-3">{opportunity.description}</p>

            <div className="flex flex-wrap gap-2 mb-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {opportunity.location}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {opportunity.deadline}
                </span>
                {opportunity.amount && (
                    <span className="flex items-center gap-1 text-success">
                        <Coins className="w-3 h-3" />
                        {opportunity.amount}
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
                {opportunity.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-2">
                {isApplied ? (
                    <span className="flex-1 text-center py-2 rounded-lg text-xs font-medium bg-success/10 text-success">
                        Applied
                    </span>
                ) : (
                    <button
                        onClick={() => addApplication(opportunity.id)}
                        className="flex-1 py-2 rounded-lg text-xs font-semibold text-primary-foreground transition-all hover:opacity-90"
                        style={{ background: 'var(--gradient-primary)' }}
                    >
                        Apply Now
                    </button>
                )}
                <a
                    href={opportunity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
            </div>
        </div>
    );
}
