import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Search, Sparkles, Shield, User } from 'lucide-react';

const items = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/opportunities', icon: Search, label: 'Explore' },
  { to: '/ai-assistant', icon: Sparkles, label: 'AI Mentor', isPrimary: true },
  { to: '/passport', icon: Shield, label: 'Passport' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border lg:hidden">
      {/* Safe area padding */}
      <div className="flex items-center justify-around px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),8px)]">
        {items.map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');

          if (item.isPrimary) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1 touch-active -mt-4"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 relative"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl pulse-ring" style={{ background: 'var(--gradient-primary)' }} />
                  )}
                  <item.icon className="w-6 h-6 text-white relative z-10" />
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 px-3 py-1 relative touch-active"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative p-1.5">
                <item.icon
                  className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                />
                {isActive && (
                  <motion.div
                    layoutId={`dot-${item.to}`}
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}
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
