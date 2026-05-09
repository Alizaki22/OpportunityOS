import React, { useEffect, useState } from 'react';
import { Wallet, Shield, Zap, ExternalLink, Copy, Send, Loader2 } from 'lucide-react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { mockPassportData } from '@/lib/web3MockData';
import { getSolBalance, sendTestTransaction } from '@/lib/solana';
import { useToast } from '@/hooks/use-toast';

export default function WalletProfileCard() {
    const { connection } = useConnection();
    const { publicKey, connected, sendTransaction } = useWallet();
    const { toast } = useToast();
    
    const [copied, setCopied] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [txSig, setTxSig] = useState<string | null>(null);

    const address = publicKey?.toBase58() || mockPassportData.walletAddress;

    useEffect(() => {
        if (connected && publicKey) {
            getSolBalance(connection, publicKey).then(setBalance);
        } else {
            setBalance(null);
        }
    }, [connected, publicKey, connection]);

    const copyAddr = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleSendTest = async () => {
        if (!publicKey || !sendTransaction) return;
        
        setLoading(true);
        setTxSig(null);
        
        try {
            const signature = await sendTestTransaction(connection, publicKey, sendTransaction);
            setTxSig(signature);
            // Refresh balance
            const newBalance = await getSolBalance(connection, publicKey);
            setBalance(newBalance);
            
            toast({
                title: "Transaction Successful",
                description: "0.001 SOL sent back to your wallet as a test.",
            });
        } catch (error) {
            toast({
                title: "Transaction Failed",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
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
                                        <span className="text-[10px] text-muted-foreground">Balance</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-bold text-foreground">
                                            {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
                                        </span>
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

                            <button
                                onClick={handleSendTest}
                                disabled={loading}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <><Loader2 className="w-3 h-3 animate-spin" /> Processing...</>
                                ) : (
                                    <><Send className="w-3 h-3" /> Send Test 0.001 SOL</>
                                )}
                            </button>

                            {txSig && (
                                <div className="mt-2 p-2 rounded bg-success/5 border border-success/10">
                                    <p className="text-[9px] text-success font-medium mb-1">Last Signature:</p>
                                    <a
                                        href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[9px] text-muted-foreground hover:text-primary break-all flex items-center gap-1"
                                    >
                                        {txSig.slice(0, 20)}... <ExternalLink className="w-2 h-2" />
                                    </a>
                                </div>
                            )}
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
