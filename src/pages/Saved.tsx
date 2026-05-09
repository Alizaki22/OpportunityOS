import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useApp } from '@/lib/context';
import OpportunityCard from '@/components/OpportunityCard';

export default function Saved() {
    const { opportunities, savedOpportunities } = useApp();
    const saved = opportunities.filter(o => savedOpportunities.includes(o.id));

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                    <Bookmark className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">Saved</h1>
                    <p className="text-sm text-muted-foreground">{saved.length} opportunities saved</p>
                </div>
            </div>
            {saved.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {saved.map((opp, i) => (
                        <motion.div key={opp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <OpportunityCard opportunity={opp} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <Bookmark className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No saved opportunities yet. Start exploring!</p>
                </div>
            )}
        </div>
    );
}
