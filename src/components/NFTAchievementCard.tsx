import React, { useState } from 'react';
import { Sparkles, ExternalLink, Loader2 } from 'lucide-react';
import type { NFTAchievement } from '@/lib/types';
import { mockMintNFT } from '@/lib/web3MockData';
import { useWallet } from '@solana/wallet-adapter-react';

const rarityGradients: Record<string, string> = {
    common: 'from-secondary to-muted',
    rare: 'from-info/20 to-accent/10',
    epic: 'from-primary/20 to-accent/10',
    legendary: 'from-warning/20 to-primary/10',
};

const rarityBorders: Record<string, string> = {
    common: 'border-border',
    rare: 'border-info/30',
    epic: 'border-primary/30',
    legendary: 'border-warning/30',
};

const rarityColors: Record<string, string> = {
    common: 'text-muted-foreground',
    rare: 'text-info',
    epic: 'text-primary',
    legendary: 'text-warning',
};

const categoryIcons: Record<string, string> = {
    hackathon: '⚡',
    skill: '🎯',
    milestone: '🏆',
    community: '🤝',
    education: '🎓',
};

export default function NFTAchievementCard({ nft, compact = false }: { nft: NFTAchievement, compact?: boolean }) {
    if (!nft) return null;

    const { connected } = useWallet();
    const [minting, setMinting] = useState(false);
    const [minted, setMinted] = useState(!!nft.mintedAt);

    const handleMint = async () => {
        if (!connected || minted) return;
        setMinting(true);
        try {
            const result = await mockMintNFT(nft.id);
            if (result.success) setMinted(true);
        } catch (error) {
            console.error('Mint failed:', error);
        } finally {
            setMinting(false);
        }
    };

    return (
        <div className={`nft-card group ${rarityBorders[nft.rarity]} ${compact ? 'flex items-center gap-3 p-2' : ''}`}>
            {/* Visual header */}
            <div className={`${compact ? 'w-16 h-16 rounded-lg' : 'h-32'} relative bg-gradient-to-br ${rarityGradients[nft.rarity]} overflow-hidden shrink-0`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`${compact ? 'text-2xl' : 'text-5xl'} opacity-50 group-hover:opacity-80 transition-opacity group-hover:scale-110 transform duration-300`}>
                        {categoryIcons[nft.category]}
                    </span>
                </div>
                {nft.rarity === 'legendary' && (
                    <div className="absolute top-2 right-2">
                        <Sparkles className="w-4 h-4 text-warning animate-pulse" />
                    </div>
                )}
                <div className="absolute bottom-2 left-2">
                    <span className={`text-[9px] uppercase font-bold tracking-wider ${rarityColors[nft.rarity]}`}>
                        {nft.rarity}
                    </span>
                </div>
                {nft.tokenId && (
                    <div className="absolute bottom-2 right-2">
                        <span className="text-[9px] font-mono text-muted-foreground bg-background/60 px-1.5 py-0.5 rounded">
                            {nft.tokenId}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`${compact ? 'flex-1 py-1' : 'p-3'}`}>
                <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-foreground leading-tight mb-1`}>{nft.name}</h3>
                {!compact && <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{nft.description}</p>}

                {/* Attributes */}
                {!compact && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {nft.attributes.slice(0, 2).map(attr => (
                            <span key={attr.trait_type} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                                {attr.value}
                            </span>
                        ))}
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                            +{nft.xpReward} XP
                        </span>
                    </div>
                )}

                {/* Action */}
                {minted ? (
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] text-success font-semibold">Minted</span>
                        <button className="p-1 rounded hover:bg-secondary">
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleMint}
                        disabled={!connected || minting}
                        className={`${compact ? 'px-3 py-1' : 'w-full py-2'} rounded-lg text-xs font-semibold text-primary-foreground disabled:opacity-50 transition-all`}
                        style={{ background: 'var(--gradient-primary)' }}
                    >
                        {minting ? (
                            <span className="flex items-center justify-center gap-1.5">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                {!compact && 'Minting...'}
                            </span>
                        ) : connected ? (
                            'Mint'
                        ) : (
                            'Connect'
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
