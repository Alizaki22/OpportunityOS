import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useApp } from '@/lib/context';
import OpportunityCard from '@/components/OpportunityCard';

export default function Scholarships() {
    const { opportunities } = useApp();
    const scholarships = opportunities.filter(o => o.category === 'scholarship');

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                    <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">Scholarships</h1>
                    <p className="text-sm text-muted-foreground">{scholarships.length} scholarships available</p>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {scholarships.map((opp, i) => (
                    <motion.div key={opp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <OpportunityCard opportunity={opp} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
