import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Plus, Users, Eye, Star, Pencil, Trash2, Search,
  BarChart3, TrendingUp, ArrowUpRight,
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { categoryConfig, mockLeaderboard } from '@/lib/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

export default function Admin() {
  const { opportunities } = useApp();
  const [tab, setTab] = useState<'overview' | 'opportunities' | 'users'>('overview');
  const [search, setSearch] = useState('');

  const filteredOpps = opportunities.filter(o =>
    !search || o.title.toLowerCase().includes(search.toLowerCase()) ||
    o.organization.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { icon: Eye, label: 'Total Views', value: '45.2K', change: '+12.5%', color: 'text-primary' },
    { icon: Users, label: 'Total Users', value: '15,342', change: '+8.3%', color: 'text-accent' },
    { icon: Star, label: 'Applications', value: '3,891', change: '+22.1%', color: 'text-warning' },
    { icon: TrendingUp, label: 'Conversion', value: '25.3%', change: '+4.7%', color: 'text-success' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage opportunities, users, and content</p>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Plus className="w-4 h-4" />
          Add Opportunity
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-0">
        {(['overview', 'opportunities', 'users'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
              tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial="hidden" animate="visible" custom={i} variants={fadeUp} className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-background border border-border ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                <p className="font-display text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === 'opportunities' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
            />
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {filteredOpps.map((opp, i) => (
              <div key={opp.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{opp.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${categoryConfig[opp.category]?.color.replace('text-', 'border-').replace('text-', 'bg-').replace('text-', 'bg-opacity-10 ')}`}>
                      {categoryConfig[opp.category]?.label || opp.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{opp.organization} • {opp.location}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-8 text-center text-muted-foreground text-sm">
                User management features are coming soon.
            </div>
        </div>
      )}
    </div>
  );
}
