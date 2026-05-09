import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Compass, Sparkles, X } from 'lucide-react';
import { useApp } from '@/lib/context';
import { categoryConfig } from '@/lib/mockData';
import type { OpportunityCategory } from '@/lib/types';
import OpportunityCard from '@/components/OpportunityCard';

export default function Opportunities() {
  const { opportunities } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<OpportunityCategory | 'all'>('all');

  const categories = ['all', ...Object.keys(categoryConfig)] as (OpportunityCategory | 'all')[];

  const filtered = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) || 
                            opp.organization.toLowerCase().includes(search.toLowerCase()) ||
                            opp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || opp.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [opportunities, search, activeCategory]);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
            <Compass className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Explore</h1>
            <p className="text-sm text-muted-foreground">Discover your next big opportunity</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors">
          <Sparkles className="w-4 h-4" />
          AI Match
        </button>
      </div>

      {/* Search and Filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scholarships, hackathons, internships..." 
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:border-primary/50 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          const config = categoryConfig[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${isActive 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-card text-muted-foreground hover:border-primary/30'
              }`}
            >
              {cat === 'all' ? 'All' : config?.label || cat}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{filtered.length} opportunities found</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((opp, i) => (
          <motion.div 
            key={opp.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <OpportunityCard opportunity={opp} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No opportunities match your search.</p>
        </div>
      )}
    </div>
  );
}
