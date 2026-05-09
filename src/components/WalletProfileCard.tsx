import React from 'react';
import { Wallet, Shield, Zap, ExternalLink, Copy } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { mockPassportData } from '@/lib/web3MockData';
import { useState } from 'react';

export default function WalletProfileCard() {
    const { publicKey, connected } = useWallet();
    const [copied, setCopied] = useState(false);
    const address = publicKey?.toBase58() || mockPassportData.walletAddress;

    const copyAddr = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Header gradient */}
            <div className="h-20 relative" style={{ background: 'var(--gradient-primary)' }}>
                <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 30% 50%, hsl(199 89% 48% / 0.4), transparent 60%)' }} />
            </div>

            <div className="px-4 pb-4 -mt-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-card" style={{ background: 'var(--gradient-glow)' }}>
                    <Wallet className="w-7 h-7 text-primary" />
                </div>

                <div className="mt-3">
                    <h3 className="text-sm font-semibold text-foreground">Solana Identity</h3>
                    {connected ? (
                        <>
                            <div className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-secondary/50">
                                <div className="w-2 h-2 rounded-full bg-success" />
                                <span className="text-xs font-mono text-foreground truncate flex-1">{address}</span>
                                <button onClick={copyAddr} className="p-1 rounded hover:bg-secondary">
                                    <Copy className="w-3 h-3 text-muted-foreground" />
                                </button>
                                <a
                                    href={`https://explorer.solana.com/address/${address}?cluster=devnet`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded hover:bg-secondary"
                                >
                                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                </a>
                            </div>
                            {copied && <p className="text-[10px] text-success mt-1">Address copied!</p>}

                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Shield className="w-3 h-3 text-primary" />
                                        <span className="text-[10px] text-muted-foreground">Reputation</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-lg font-bold text-foreground">{mockPassportData.reputationScore}</span>
                                        <span className="text-[10px] text-success">+15</span>
                                    </div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-accent/5 border border-accent/10">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Zap className="w-3 h-3 text-accent" />
                                        <span className="text-[10px] text-muted-foreground">On-chain XP</span>
                                    </div>
                                    <span className="text-lg font-bold text-foreground">{mockPassportData.totalXp}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mt-3">
                            <p className="text-xs text-muted-foreground mb-3">
                                Connect your Phantom wallet to enable Web3 features, achievement NFTs, and on-chain reputation.
                            </p>
                            <WalletMultiButton
                                style={{
                                    background: 'var(--gradient-primary)',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '0.8125rem',
                                    height: '36px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 600,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
