import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet, Copy, ExternalLink, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function WalletStatusBadge({ onClick }: { onClick?: () => void }) {
    const { publicKey, connected, disconnect } = useWallet();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const address = publicKey?.toBase58() || '';
    const short = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '';

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const copyAddress = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    if (!connected) return null;

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border hover:border-primary/30 transition-all"
            >
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-mono font-medium text-foreground">{short}</span>
                <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl glass-strong border border-border shadow-elevated z-50 overflow-hidden animate-scale-in">
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                                <Wallet className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground">Phantom Wallet</p>
                                <p className="text-xs font-mono text-muted-foreground truncate">{address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                            <div className="w-2 h-2 rounded-full bg-success" />
                            <span className="text-[10px] text-muted-foreground">Solana Devnet</span>
                            <span className="ml-auto text-[10px] font-semibold text-foreground">12.45 SOL</span>
                        </div>
                    </div>

                    <div className="p-2">
                        <button
                            onClick={copyAddress}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary/50 transition-colors"
                        >
                            <Copy className="w-4 h-4 text-muted-foreground" />
                            {copied ? 'Copied!' : 'Copy Address'}
                        </button>
                        <a
                            href={`https://explorer.solana.com/address/${address}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary/50 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                            View on Explorer
                        </a>
                        <button
                            onClick={() => { disconnect(); setOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/5 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Disconnect
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
