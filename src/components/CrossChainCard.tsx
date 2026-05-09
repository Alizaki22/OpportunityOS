import React, { useState } from 'react';
import { Globe, ArrowRight, Shield, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function CrossChainCard() {
    const [bridging, setBridging] = useState(false);
    const [bridged, setBridged] = useState(false);

    const handleBridge = () => {
        setBridging(true);
        setTimeout(() => {
            setBridging(false);
            setBridged(true);
            setTimeout(() => setBridged(false), 3000);
        }, 2000);
    };
    return (
        <div className="relative rounded-xl overflow-hidden border border-border">
            {/* Background gradient */}
            <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-[60px]" style={{ backgroundColor: 'hsl(199 89% 48%)' }} />

            <div className="relative z-10 p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                        <Globe className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Cross-Chain Identity</h3>
                        <p className="text-[10px] text-muted-foreground">Powered by LI.FI Protocol</p>
                    </div>
                </div>

                <p className="text-xs text-secondary-foreground/70 mb-4 leading-relaxed">
                    Your student passport, reputation score, and achievement NFTs will be portable across multiple blockchains. One identity, every chain.
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                        { label: 'Chains', value: '5+', icon: Globe },
                        { label: 'Portable NFTs', value: 'Yes', icon: Sparkles },
                        { label: 'Unified Rep', value: 'Score', icon: Shield },
                    ].map(stat => (
                        <div key={stat.label} className="p-2.5 rounded-lg bg-secondary/30 text-center border border-border">
                            <stat.icon className="w-3.5 h-3.5 text-primary mx-auto mb-1" />
                            <p className="text-xs font-bold text-foreground">{stat.value}</p>
                            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {['◎ Solana', 'Ξ Ethereum', '⬡ Polygon', '◆ Arbitrum'].map(chain => (
                        <span key={chain} className="chain-badge text-[10px]">{chain}</span>
                    ))}
                </div>

                <button 
                    onClick={handleBridge}
                    disabled={bridging || bridged}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-primary/20 text-xs font-medium text-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
                >
                    {bridging ? (
                        <><RefreshCw className="w-3 h-3 animate-spin" /> Bridging via LI.FI...</>
                    ) : bridged ? (
                        <><CheckCircle2 className="w-3 h-3 text-success" /> Identity Bridged!</>
                    ) : (
                        <>Bridge Passport to Polygon <ArrowRight className="w-3 h-3" /></>
                    )}
                </button>
            </div>
        </div>
    );
}
