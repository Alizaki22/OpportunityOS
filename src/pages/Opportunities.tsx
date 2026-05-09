import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Compass, Sparkles, Grid3X3, Layers } from 'lucide-react';
import { useApp } from '@/lib/context';
import { categoryConfig } from '@/lib/mockData';
import type { OpportunityCategory } from '@/lib/types';
import OpportunityCard from '@/components/OpportunityCard';
import OpportunitySwipeFeed from '@/components/OpportunitySwipeFeed';

type ViewMode = 'grid' | 'swipe';

export default function Opportunities() {
  const { opportunities } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<OpportunityCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const categories = ['all', ...Object.keys(categoryConfig)] as (OpportunityCategory | 'all')[];

  const filtered = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch =
        opp.title.toLowerCase().includes(search.toLowerCase()) ||
        opp.organization.toLowerCase().includes(search.toLowerCase()) ||
        opp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || opp.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [opportunities, search, activeCategory]);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-5 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Explore</h1>
            <p className="text-xs text-muted-foreground">Find your next opportunity</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors touch-active">
            <Sparkles className="w-3.5 h-3.5" />
            AI Match
          </button>

          {/* View mode toggle */}
          <div className="flex items-center bg-secondary rounded-xl p-1 border border-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all touch-active ${viewMode === 'grid' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('swipe')}
              className={`p-1.5 rounded-lg transition-all touch-active ${viewMode === 'swipe' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scholarships, hackathons, internships..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 touch-active">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          const config = categoryConfig[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all touch-active ${
                isActive
                  ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/20'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/30'
              }`}
            >
              {cat === 'all' ? '✦ All' : config?.label || cat}
            </button>
          );
        })}
      </div>

      {/* Results count + view label */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> opportunities
        </span>
        <span className="text-xs text-muted-foreground">
          {viewMode === 'swipe' ? '👆 Swipe to save or skip' : 'Tap a card to apply'}
        </span>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'swipe' ? (
          <motion.div
            key="swipe"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <OpportunitySwipeFeed opportunities={filtered} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((opp, i) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <OpportunityCard opportunity={opp} />
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-sm text-muted-foreground">No opportunities match your filters.</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('all'); }}
                  className="mt-4 text-xs text-primary font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
