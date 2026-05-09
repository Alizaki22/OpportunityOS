import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, Shield, CheckCircle2, Loader2, Smartphone,
  ExternalLink, Copy, AlertCircle, Zap,
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useToast } from '@/hooks/use-toast';

type WalletStep = 'select' | 'connecting' | 'confirm' | 'success';

interface MobileWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const walletOptions = [
  {
    name: 'Phantom',
    icon: '👻',
    description: 'Most popular Solana wallet',
    deepLink: 'https://phantom.app/ul/v1/connect',
    available: true,
  },
  {
    name: 'Solflare',
    icon: '🔥',
    description: 'Mobile-native Solana wallet',
    deepLink: 'solflare://wallet/connect',
    available: true,
  },
  {
    name: 'Backpack',
    icon: '🎒',
    description: 'Next-gen multi-chain wallet',
    deepLink: 'backpack://connect',
    available: true,
  },
];

export default function MobileWalletModal({ isOpen, onClose }: MobileWalletModalProps) {
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const { toast } = useToast();
  const [step, setStep] = useState<WalletStep>('select');
  const [copied, setCopied] = useState(false);

  const address = publicKey?.toBase58() || '';
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const handlePhantomDeepLink = () => {
    const dappUrl = encodeURIComponent(window.location.origin);
    const redirectLink = encodeURIComponent(`${window.location.origin}/dashboard`);
    const phantomUrl = `https://phantom.app/ul/v1/connect?app_url=${dappUrl}&redirect_link=${redirectLink}&cluster=devnet`;
    window.open(phantomUrl, '_blank');
    toast({ title: '🔗 Opening Phantom', description: 'Complete connection in Phantom app' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copied!', description: 'Wallet address copied to clipboard' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[85] rounded-t-3xl glass-strong border-t border-border"
          >
            <div className="p-6 max-h-[90dvh] overflow-y-auto scrollbar-hide">
              {/* Handle */}
              <div className="w-12 h-1.5 rounded-full bg-border mx-auto mb-6" />

              {connected && publicKey ? (
                /* Connected State */
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-success/10 border border-success/20">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-foreground">Wallet Connected</h2>
                    <p className="text-sm text-muted-foreground mt-1">Solana Devnet</p>
                  </div>

                  {/* Address Card */}
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Wallet Address</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-sm text-foreground font-medium break-all">{shortAddress}</p>
                      <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-muted transition-colors touch-active shrink-0">
                        {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Network', value: 'Devnet', color: 'text-accent' },
                      { label: 'NFTs', value: '3', color: 'text-warning' },
                      { label: 'XP Tokens', value: '2.4K', color: 'text-primary' },
                    ].map(stat => (
                      <div key={stat.label} className="p-3 rounded-xl bg-card border border-border text-center">
                        <p className={`font-bold text-base ${stat.color}`}>{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`https://explorer.solana.com/address/${address}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:bg-secondary transition-colors touch-active"
                  >
                    View on Solana Explorer <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => { disconnect(); onClose(); }}
                    className="w-full py-3 rounded-xl text-sm font-medium border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors touch-active"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                /* Connection State */
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                      style={{ background: 'var(--gradient-primary)' }}>
                      <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-foreground">Connect Wallet</h2>
                    <p className="text-sm text-muted-foreground mt-1">Choose your Solana mobile wallet</p>
                  </div>

                  {/* Mobile Wallets */}
                  <div className="lg:hidden">
                    <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" /> Mobile Wallets
                    </p>
                    <div className="space-y-2">
                      {wallets.map((wallet) => (
                        <button
                          key={wallet.adapter.name}
                          onClick={() => {
                            const isPhantom = wallet.adapter.name === 'Phantom';
                            const isAndroid = /Android/i.test(navigator.userAgent);
                            const dappUrl = encodeURIComponent(window.location.origin);
                            const redirectLink = encodeURIComponent(`${window.location.origin}/dashboard`);

                            if (wallet.readyState === 'Installed') {
                              wallet.adapter.connect().catch(() => {
                                toast({ title: 'Connection Failed', description: 'Failed to connect to wallet.', variant: 'destructive' });
                              });
                            } else {
                              if (isPhantom && isAndroid) {
                                // Use strict Android Intent to force opening the installed app, avoiding download page redirect
                                const intentUrl = `intent://v1/connect?app_url=${dappUrl}&redirect_link=${redirectLink}&cluster=devnet#Intent;scheme=phantom;package=app.phantom;end;`;
                                window.location.href = intentUrl;
                                
                                // Fallback timeout if app is truly not installed
                                setTimeout(() => {
                                  toast({ title: 'Phantom not found', description: 'Please install Phantom wallet.', variant: 'destructive' });
                                }, 2500);
                              } else {
                                // Default deep link or adapter connect for iOS/others
                                wallet.adapter.connect().catch(() => {
                                  if (isPhantom) {
                                    window.location.href = `https://phantom.app/ul/v1/connect?app_url=${dappUrl}&redirect_link=${redirectLink}&cluster=devnet`;
                                  }
                                });
                              }
                            }
                            onClose();
                          }}
                          className="w-full flex items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-secondary/30 transition-all touch-active"
                        >
                          <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-8 h-8 rounded-lg" />
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-sm text-foreground">{wallet.adapter.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {wallet.readyState === 'Installed' ? 'Detected' : 'Connect via app'}
                            </p>
                          </div>
                          {wallet.readyState === 'Installed' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-semibold">Installed</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Standard Wallet Adapter (Desktop) */}
                  <div className="space-y-3 hidden lg:block">
                    {connecting && (
                      <div className="flex items-center justify-center gap-3 py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Connecting to wallet...</span>
                      </div>
                    )}
                    <div className="flex justify-center">
                      <WalletMultiButton
                        style={{
                          background: 'var(--gradient-primary)',
                          borderRadius: '1rem',
                          fontSize: '0.9rem',
                          height: '52px',
                          padding: '0 28px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          width: '100%',
                          justifyContent: 'center',
                        }}
                      />
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border">
                    <Shield className="w-4 h-4 text-success shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Non-custodial · Your keys, your crypto · Solana Mobile Stack compatible
                    </p>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-warning/5 border border-warning/20">
                    <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      This app runs on <span className="text-warning font-semibold">Devnet</span> — no real SOL is used.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
