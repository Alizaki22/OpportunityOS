import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, Shield, Sparkles, RefreshCw, AlertCircle, Coins } from 'lucide-react';
import { getLifiRoute, LIFI_CHAINS, SOL_TOKENS, POLYGON_TOKENS } from '@/lib/lifi';
import type { Route } from '@lifi/sdk';

export default function CrossChainCard() {
    const [route, setRoute] = useState<Route | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRoute = async () => {
        setLoading(true);
        setError(null);
        try {
            // Example: Fetch route for 0.1 SOL on Solana to USDC on Polygon
            const bestRoute = await getLifiRoute(
                LIFI_CHAINS.SOLANA,
                LIFI_CHAINS.POLYGON,
                SOL_TOKENS.SOL,
                POLYGON_TOKENS.USDC,
                '100000000' // 0.1 SOL (Solana uses 9 decimals)
            );
            setRoute(bestRoute);
        } catch (err) {
            setError('Failed to fetch LI.FI routes. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoute();
    }, []);

    return (
        <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-sm">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-[60px] bg-primary" />
            
            <div className="relative z-10 p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">Bridge Identity</h3>
                            <p className="text-[10px] text-muted-foreground">Powered by LI.FI Protocol</p>
                        </div>
                    </div>
                    <button 
                        onClick={fetchRoute}
                        disabled={loading}
                        className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground"
                        title="Refresh route"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {loading ? (
                    <div className="py-8 flex flex-col items-center justify-center text-center">
                        <RefreshCw className="w-6 h-6 text-primary animate-spin mb-2" />
                        <p className="text-xs text-muted-foreground font-medium">Finding best cross-chain route...</p>
                    </div>
                ) : error ? (
                    <div className="py-6 flex flex-col items-center justify-center text-center text-destructive">
                        <AlertCircle className="w-6 h-6 mb-2" />
                        <p className="text-xs font-medium">{error}</p>
                        <button onClick={fetchRoute} className="mt-2 text-[10px] underline">Try again</button>
                    </div>
                ) : route ? (
                    <div className="space-y-4">
                        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Best Route Found</span>
                                <span className="text-[10px] font-semibold text-success bg-success/10 px-1.5 py-0.5 rounded">
                                    ~{route.steps[0].estimate.executionDuration}s
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1">
                                    <p className="text-[10px] text-muted-foreground mb-0.5">You send</p>
                                    <p className="text-xs font-bold text-foreground">0.1 SOL</p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                                <div className="flex-1 text-right">
                                    <p className="text-[10px] text-muted-foreground mb-0.5">You receive</p>
                                    <p className="text-xs font-bold text-foreground">
                                        {(Number(route.toAmount) / 10**route.toToken.decimals).toFixed(2)} {route.toToken.symbol}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 rounded-lg border border-border bg-background/50">
                                <p className="text-[9px] text-muted-foreground mb-0.5">Gas Estimate</p>
                                <p className="text-xs font-semibold text-foreground">${route.steps[0].estimate.gasCosts?.[0]?.amountUsd || '0.00'}</p>
                            </div>
                            <div className="p-2 rounded-lg border border-border bg-background/50">
                                <p className="text-[9px] text-muted-foreground mb-0.5">Protocol</p>
                                <p className="text-xs font-semibold text-foreground uppercase">{route.steps[0].tool}</p>
                            </div>
                        </div>

                        <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            Bridge Passport via {route.steps[0].tool}
                        </button>
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-xs text-muted-foreground">Click refresh to fetch routes.</p>
                    </div>
                )}

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                        {['◎', 'Ξ', '⬡', '◆'].map((c, i) => (
                            <div key={i} className="w-5 h-5 rounded-full bg-secondary border border-card flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                {c}
                            </div>
                        ))}
                    </div>
                    <p className="text-[9px] text-muted-foreground">Reputation portal active across 14+ chains</p>
                </div>
            </div>
        </div>
    );
}
