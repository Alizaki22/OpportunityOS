import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Bell, Zap, Trophy, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export type NotificationType = 'deadline' | 'xp' | 'ai' | 'hackathon' | 'application';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const typeConfig: Record<NotificationType, { icon: React.ElementType; color: string; bg: string }> = {
  deadline: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  xp: { icon: Zap, color: 'text-accent', bg: 'bg-accent/10' },
  ai: { icon: Sparkles, color: 'text-primary', bg: 'bg-primary/10' },
  hackathon: { icon: Trophy, color: 'text-success', bg: 'bg-success/10' },
  application: { icon: CheckCircle2, color: 'text-info', bg: 'bg-info/10' },
};

const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'ai',
    title: 'AI Match Found! 🎯',
    body: 'Solana Hyperdrive Hackathon matches your Web3 skills — deadline in 3 days!',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
    actionUrl: '/opportunities',
  },
  {
    id: 'n2',
    type: 'xp',
    title: '+150 XP Earned',
    body: 'You leveled up to Level 13! Keep the momentum going.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'deadline',
    title: 'Deadline Reminder',
    body: 'Google Summer of Code 2025 closes in 48 hours. Don\'t miss it!',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: true,
    actionUrl: '/opportunities',
  },
  {
    id: 'n4',
    type: 'hackathon',
    title: 'New Hackathon Alert',
    body: 'ETH Global Bangkok just launched — $100k in prizes!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
  },
  {
    id: 'n5',
    type: 'application',
    title: 'Application Updated',
    body: 'Your Chevening Scholarship application moved to "Under Review" ✅',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[70] lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[75] w-full max-w-sm glass-strong border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-foreground" />
                <h2 className="font-semibold text-foreground">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-primary font-medium hover:underline touch-active"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-secondary transition-colors touch-active"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {notifications.map(n => {
                const { icon: Icon, color, bg } = typeConfig[n.type];
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => markRead(n.id)}
                    className={`p-4 flex gap-3 cursor-pointer hover:bg-secondary/30 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                      <Icon className={`w-4.5 h-4.5 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-medium leading-snug ${n.read ? 'text-foreground' : 'text-foreground'}`}>
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.body}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1.5">{timeAgo(n.timestamp)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-4 border-t border-border safe-area-bottom">
              <p className="text-xs text-center text-muted-foreground">
                Showing recent 30 days · <button className="text-primary hover:underline">Manage preferences</button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Notification Bell for TopBar
interface NotificationBellProps {
  onClick: () => void;
}
export function NotificationBell({ onClick }: NotificationBellProps) {
  const unread = mockNotifications.filter(n => !n.read).length;
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg hover:bg-secondary transition-colors touch-active"
    >
      <Bell className="w-5 h-5 text-muted-foreground" />
      {unread > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
          {unread}
        </span>
      )}
    </button>
  );
}
