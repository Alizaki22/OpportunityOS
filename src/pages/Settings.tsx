import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon, Bell, Globe, Shield, LogOut, Moon, Mail, Smartphone, ChevronRight
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

export default function Settings() {
  const { logout, user } = useApp();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deadlines: true,
    recommendations: true,
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6 page-enter">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Account Settings */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="p-4 rounded-xl border border-border bg-card">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Account
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'Not set'}</p>
              </div>
              <button className="text-xs text-primary font-medium hover:underline">Change</button>
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Password</p>
                <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
              </div>
              <button className="text-xs text-primary font-medium hover:underline">Update</button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="p-4 rounded-xl border border-border bg-card">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-accent" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Weekly digests and important updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifications.email} onChange={() => setNotifications(s => ({ ...s, email: !s.email }))} />
                <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Real-time alerts for deadlines</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifications.push} onChange={() => setNotifications(s => ({ ...s, push: !s.push }))} />
                <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="p-4 rounded-xl border border-border bg-card">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <SettingsIcon className="w-4 h-4 text-success" />
            Preferences
          </h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-2 text-left group">
              <div className="flex items-center gap-3">
                <Moon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Appearance</p>
                  <p className="text-xs text-muted-foreground">Dark mode enabled</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
            <div className="border-t border-border" />
            <button className="w-full flex items-center justify-between py-2 text-left group">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Language & Region</p>
                  <p className="text-xs text-muted-foreground">English (US)</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </motion.div>
        
        {/* Actions */}
        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
          <button 
            onClick={handleLogout}
            className="w-full py-3 rounded-xl border border-destructive/20 text-destructive font-medium hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
