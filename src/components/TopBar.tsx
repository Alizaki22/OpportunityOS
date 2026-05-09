import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useApp } from '@/lib/context';
import WalletStatusBadge from './WalletStatusBadge';

export default function TopBar() {
    const { setSidebarOpen, user } = useApp();
    const { connected } = useWallet();

    return (
        <header className="sticky top-0 z-30 glass-strong border-b border-border">
            <div className="flex items-center justify-between h-14 px-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-secondary lg:hidden touch-active"
                    >
                        <Menu className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <h1 className="font-display text-base font-semibold text-foreground hidden sm:block">
                        OpportunityOS
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    {user && (
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 mr-2">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-xs font-medium text-muted-foreground">
                                {user.streak} day streak
                            </span>
                        </div>
                    )}
                    <button className="p-2 rounded-lg hover:bg-secondary relative touch-active">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
                    </button>

                    {connected ? (
                        <WalletStatusBadge />
                    ) : (
                        <WalletMultiButton
                            style={{
                                background: 'var(--gradient-primary)',
                                borderRadius: 'var(--radius)',
                                fontSize: '0.8125rem',
                                height: '36px',
                                padding: '0 14px',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                            }}
                        />
                    )}
                </div>
            </div>
        </header>
    );
}
