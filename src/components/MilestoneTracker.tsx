import React from 'react';
import { CheckCircle2, Circle, Zap, Trophy, Target, Code, Users, Star } from 'lucide-react';

interface Milestone {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    completed: boolean;
    icon: React.ElementType;
}

const milestones: Milestone[] = [
    { id: '1', title: 'Create Account', description: 'Join OpportunityOS', xpReward: 50, completed: true, icon: Star },
    { id: '2', title: 'Connect Wallet', description: 'Link your Solana wallet', xpReward: 100, completed: true, icon: Zap },
    { id: '3', title: 'Complete Profile', description: 'Fill in all profile fields', xpReward: 100, completed: true, icon: Target },
    { id: '4', title: 'First Application', description: 'Submit your first application', xpReward: 150, completed: true, icon: Trophy },
    { id: '5', title: 'Hackathon Entry', description: 'Enter your first hackathon', xpReward: 200, completed: false, icon: Code },
    { id: '6', title: 'Community Mentor', description: 'Help 10 students', xpReward: 300, completed: false, icon: Users },
];

export default function MilestoneTracker() {
    const completedCount = milestones.filter(m => m.completed).length;

    return (
        <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    Milestones
                </h2>
                <span className="text-xs text-muted-foreground">
                    {completedCount}/{milestones.length} complete
                </span>
            </div>

            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" />

                <div className="space-y-4">
                    {milestones.map((milestone, i) => {
                        const Icon = milestone.icon;
                        return (
                            <div key={milestone.id} className="flex items-start gap-3 relative">
                                <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0 z-10 ${milestone.completed
                                        ? 'bg-primary/20'
                                        : 'bg-secondary border border-border'
                                    }`}>
                                    {milestone.completed ? (
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    ) : (
                                        <Circle className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm font-medium ${milestone.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {milestone.title}
                                        </p>
                                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${milestone.completed ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                                            }`}>
                                            +{milestone.xpReward} XP
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">{milestone.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
