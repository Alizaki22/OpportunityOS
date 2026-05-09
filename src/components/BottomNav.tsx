import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Bot, Shield, User } from 'lucide-react';

const items = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/opportunities', icon: Search, label: 'Explore' },
    { to: '/ai-assistant', icon: Bot, label: 'AI' },
    { to: '/passport', icon: Shield, label: 'Passport' },
    { to: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border lg:hidden safe-area-bottom">
            <div className="flex items-center justify-around py-1.5 px-1">
                {items.map((item) => {
                    const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors touch-active"
                        >
                            <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-primary/15' : ''}`}>
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>
                            <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
