import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { useApp } from '@/lib/context';
import OpportunityCard from '@/components/OpportunityCard';

export default function Hackathons() {
    const { opportunities } = useApp();
    const hackathons = opportunities.filter(o => o.category === 'hackathon');

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent/10">
                    <Code className="w-5 h-5 text-accent" />
                </div>
                <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">Hackathons</h1>
                    <p className="text-sm text-muted-foreground">{hackathons.length} hackathons available</p>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hackathons.map((opp, i) => (
                    <motion.div key={opp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <OpportunityCard opportunity={opp} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
