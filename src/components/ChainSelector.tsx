import React, { useState } from 'react';
import { Check, Lock, Zap } from 'lucide-react';
import { supportedChains } from '@/lib/web3MockData';

export default function ChainSelector() {
    const [selected, setSelected] = useState('solana');

    return (
        <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Chain Identity
                </h2>
                <span className="chain-badge">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    Solana Active
                </span>
            </div>

            <div className="space-y-2">
                {supportedChains.map(chain => {
                    const isActive = chain.status === 'active';
                    const isSelected = chain.id === selected;

                    return (
                        <button
                            key={chain.id}
                            onClick={() => isActive && setSelected(chain.id)}
                            disabled={!isActive}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${isSelected && isActive
                                    ? 'border-primary/30 bg-primary/5'
                                    : isActive
                                        ? 'border-border hover:border-primary/20 hover:bg-secondary/30'
                                        : 'border-border opacity-50 cursor-not-allowed'
                                }`}
                        >
                            <span className="text-lg" style={{ color: chain.color }}>{chain.icon}</span>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-medium text-foreground">{chain.name}</p>
                                <p className="text-[10px] text-muted-foreground">
                                    {isActive ? 'Identity verified' : 'Coming soon'}
                                </p>
                            </div>
                            {isSelected && isActive ? (
                                <Check className="w-4 h-4 text-primary" />
                            ) : !isActive ? (
                                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                            ) : null}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <p className="text-[11px] text-accent font-medium mb-1">Cross-Chain Identity (Coming Soon)</p>
                <p className="text-[10px] text-muted-foreground">
                    Powered by LI.FI — your reputation, badges, and credentials will be portable across chains.
                </p>
            </div>
        </div>
    );
}
