/**
 * Mobile Wallet Adapter Service
 * Abstraction layer for Solana Mobile Stack & standard wallet adapters
 * Compatible with: Phantom, Solflare, Backpack, Saga Mobile Wallet
 */

import type { Connection, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export type WalletNetwork = 'mainnet-beta' | 'devnet' | 'testnet';

export interface WalletSession {
  publicKey: string;
  walletName: string;
  network: WalletNetwork;
  connectedAt: string;
}

export interface TransactionRequest {
  transaction: Transaction | VersionedTransaction;
  description: string;
  feePayer?: PublicKey;
}

export interface TransactionResult {
  signature: string;
  confirmed: boolean;
  error?: string;
}

// ─── Session Persistence ─────────────────────────────────────────────────────

const SESSION_KEY = 'opos_wallet_session';

export function saveWalletSession(session: WalletSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    console.log('[WalletService] Session saved:', session.publicKey.slice(0, 8) + '...');
  } catch (err) {
    console.warn('[WalletService] Could not persist session:', err);
  }
}

export function loadWalletSession(): WalletSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as WalletSession;
    console.log('[WalletService] Session restored:', session.publicKey.slice(0, 8) + '...');
    return session;
  } catch {
    return null;
  }
}

export function clearWalletSession(): void {
  localStorage.removeItem(SESSION_KEY);
  console.log('[WalletService] Session cleared');
}

// ─── Phantom Mobile Deep Link Builder ────────────────────────────────────────

export interface PhantomDeepLinkConfig {
  dappUrl: string;
  cluster: WalletNetwork;
  redirectPath?: string;
}

export function buildPhantomConnectDeepLink(config: PhantomDeepLinkConfig): string {
  const params = new URLSearchParams({
    app_url: encodeURIComponent(config.dappUrl),
    redirect_link: encodeURIComponent(`${config.dappUrl}${config.redirectPath || '/dashboard'}`),
    cluster: config.cluster,
  });
  return `https://phantom.app/ul/v1/connect?${params}`;
}

export function buildPhantomSignDeepLink(config: {
  dappUrl: string;
  transaction: string; // base58 encoded
  cluster: WalletNetwork;
}): string {
  const params = new URLSearchParams({
    app_url: encodeURIComponent(config.dappUrl),
    redirect_link: encodeURIComponent(`${config.dappUrl}/dashboard?txResult=1`),
    cluster: config.cluster,
    transaction: config.transaction,
  });
  return `https://phantom.app/ul/v1/signAndSendTransaction?${params}`;
}

// ─── Device Detection ─────────────────────────────────────────────────────────

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function isPhantomInstalled(): boolean {
  return typeof window !== 'undefined' && !!(window as any).phantom?.solana?.isPhantom;
}

export function isSolanaSnapAvailable(): boolean {
  return typeof window !== 'undefined' && !!(window as any).ethereum?.isMetaMask;
}

export function isAndroidDevice(): boolean {
  return /Android/i.test(navigator.userAgent);
}

export function isSagaPhone(): boolean {
  // Saga has a custom UA or MWA capabilities
  return isAndroidDevice() && typeof (window as any).__mwa !== 'undefined';
}

// ─── Mock Transaction Builder ─────────────────────────────────────────────────
// Used for devnet demos without real SOL

export interface MockXpTransaction {
  type: 'mint_xp' | 'claim_nft' | 'verify_credential' | 'submit_application';
  amount?: number;
  recipientAddress: string;
  description: string;
}

export function buildMockTransaction(req: MockXpTransaction): string {
  const mock = {
    type: req.type,
    amount: req.amount || 100,
    recipient: req.recipientAddress,
    timestamp: Date.now(),
    network: 'devnet',
    programId: 'OPOS11111111111111111111111111111111111111',
    description: req.description,
  };
  console.log('[WalletService] Mock transaction built:', mock);
  // Return a fake base58 signature for demo
  return `mock_sig_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// ─── Transaction Confirmation ─────────────────────────────────────────────────

export async function confirmMockTransaction(signature: string): Promise<TransactionResult> {
  // Simulate network confirmation delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('[WalletService] Transaction confirmed (mock):', signature);
  return {
    signature,
    confirmed: true,
  };
}

// ─── XP Reward System ─────────────────────────────────────────────────────────

export interface XpReward {
  action: string;
  amount: number;
  description: string;
}

export const XP_REWARDS: Record<string, XpReward> = {
  apply: { action: 'apply', amount: 50, description: 'Applied to an opportunity' },
  save: { action: 'save', amount: 10, description: 'Saved an opportunity' },
  ai_chat: { action: 'ai_chat', amount: 5, description: 'Used AI mentor' },
  daily_login: { action: 'daily_login', amount: 20, description: 'Daily login streak' },
  wallet_connect: { action: 'wallet_connect', amount: 100, description: 'Connected Solana wallet' },
  profile_complete: { action: 'profile_complete', amount: 150, description: 'Completed profile' },
  hackathon_apply: { action: 'hackathon_apply', amount: 75, description: 'Applied to hackathon' },
  nft_claim: { action: 'nft_claim', amount: 200, description: 'Claimed NFT achievement' },
};

export function getXpReward(action: keyof typeof XP_REWARDS): XpReward {
  return XP_REWARDS[action] || { action, amount: 10, description: 'Completed action' };
}
