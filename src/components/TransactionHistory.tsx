import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Award, Zap, Shield, ExternalLink, Clock } from 'lucide-react';
import { mockWalletTransactions } from '@/lib/web3MockData';

const typeIcons: Record<string, React.ElementType> = {
    nft_mint: Award,
    badge_claim: Award,
    xp_reward: Zap,
    credential_verify: Shield,
    transfer: ArrowDownLeft,
};

const typeColors: Record<string, string> = {
    nft_mint: 'bg-primary/10 text-primary',
    badge_claim: 'bg-warning/10 text-warning',
    xp_reward: 'bg-accent/10 text-accent',
    credential_verify: 'bg-success/10 text-success',
    transfer: 'bg-info/10 text-info',
};

function timeAgo(timestamp: string): string {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return `${Math.floor(days / 7)}w ago`;
}

export default function TransactionHistory({ limit = 5 }: { limit?: number }) {
    const transactions = mockWalletTransactions.slice(0, limit);

    return (
        <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Transaction History
                </h2>
                <span className="text-[10px] text-muted-foreground">{mockWalletTransactions.length} total</span>
            </div>

            <div className="space-y-2">
                {transactions.map(tx => {
                    const Icon = typeIcons[tx.type] || ArrowUpRight;
                    const colors = typeColors[tx.type] || 'bg-secondary text-muted-foreground';

                    return (
                        <div key={tx.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/30 transition-colors group">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors} shrink-0`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{tx.title}</p>
                                <p className="text-[10px] text-muted-foreground">{tx.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                                {tx.amount && (
                                    <p className="text-xs font-semibold text-foreground">{tx.amount}</p>
                                )}
                                <div className="flex items-center gap-1">
                                    <span className={`text-[9px] px-1 py-0.5 rounded ${tx.status === 'confirmed' ? 'text-success' : tx.status === 'pending' ? 'text-warning' : 'text-destructive'
                                        }`}>
                                        {tx.status}
                                    </span>
                                    <span className="text-[9px] text-muted-foreground">{timeAgo(tx.timestamp)}</span>
                                </div>
                            </div>
                            <a
                                href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-secondary transition-all"
                            >
                                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
