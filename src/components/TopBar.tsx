import React, { useState } from 'react';
import { Menu, Flame, Wallet } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useApp } from '@/lib/context';
import WalletStatusBadge from './WalletStatusBadge';
import { NotificationBell, NotificationCenter } from './NotificationCenter';
import MobileWalletModal from './MobileWalletModal';

export default function TopBar() {
  const { setSidebarOpen, user } = useApp();
  const { connected } = useWallet();
  const [notifOpen, setNotifOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 glass-strong border-b border-border" style={{ paddingTop: 'var(--safe-area-top)' }}>
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-secondary lg:hidden touch-active transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg hidden sm:flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <span className="text-white text-xs font-black">O</span>
              </div>
              <h1 className="font-display text-base font-bold text-foreground hidden sm:block">
                Opportunity<span className="gradient-text">OS</span>
              </h1>
            </div>
          </div>

          {/* Right: Streak + Notif + Wallet */}
          <div className="flex items-center gap-1.5">
            {/* Streak badge */}
            {user && user.streak > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-warning/10 border border-warning/20 mr-1">
                <Flame className="w-3.5 h-3.5 text-warning" />
                <span className="text-xs font-semibold text-warning">{user.streak}d</span>
              </div>
            )}

            {/* Notification bell */}
            <NotificationBell onClick={() => setNotifOpen(true)} />

            {/* Wallet */}
            {connected ? (
              <button onClick={() => setWalletOpen(true)} className="touch-active">
                <WalletStatusBadge onClick={() => setWalletOpen(true)} />
              </button>
            ) : (
              <button
                onClick={() => setWalletOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-primary-foreground touch-active shadow-lg shadow-primary/20"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Connect</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Notification Center */}
      <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* Mobile Wallet Modal */}
      <MobileWalletModal isOpen={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  );
}
