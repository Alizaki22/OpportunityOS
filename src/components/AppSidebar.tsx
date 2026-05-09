import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Search,
    GraduationCap,
    Briefcase,
    Code,
    Bot,
    User,
    Trophy,
    Settings,
    Shield,
    Bookmark,
    X,
    Sparkles,
    Wallet,
} from 'lucide-react';
import { useApp } from '@/lib/context';
import XpBar from './XpBar';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/opportunities', icon: Search, label: 'Explore' },
    { to: '/scholarships', icon: GraduationCap, label: 'Scholarships' },
    { to: '/jobs', icon: Briefcase, label: 'Jobs' },
    { to: '/hackathons', icon: Code, label: 'Hackathons' },
    { to: '/saved', icon: Bookmark, label: 'Saved' },
    { to: '/ai-assistant', icon: Bot, label: 'AI Copilot', badge: 'AI' },
    { to: '/passport', icon: Shield, label: 'Passport', badge: 'Web3' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function AppSidebar() {
    const { sidebarOpen, setSidebarOpen, user } = useApp();
    const location = useLocation();

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 border-r border-border bg-sidebar flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <NavLink to="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                            <Sparkles className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-display text-lg font-bold text-foreground">OpportunityOS</span>
                    </NavLink>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-secondary">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                    }`}
                            >
                                <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-primary' : ''}`} />
                                {item.label}
                                {item.badge && (
                                    <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${item.badge === 'Web3' ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {user && (
                    <div className="p-4 border-t border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold bg-primary/20 text-primary">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground">Level {user.level}</p>
                            </div>
                        </div>
                        <XpBar xp={user.xp} level={user.level} size="sm" showLabel={false} />
                    </div>
                )}
            </aside>
        </>
    );
}
