import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { AppProvider } from '@/lib/context';

import AppLayout from '@/components/AppLayout';
import Landing from '@/pages/Landing';
import Onboarding from '@/pages/Onboarding';
import Dashboard from '@/pages/Dashboard';
import Opportunities from '@/pages/Opportunities';
import Scholarships from '@/pages/Scholarships';
import Jobs from '@/pages/Jobs';
import Hackathons from '@/pages/Hackathons';
import AiAssistant from '@/pages/AiAssistant';
import Profile from '@/pages/Profile';
import Leaderboard from '@/pages/Leaderboard';
import Settings from '@/pages/Settings';
import Saved from '@/pages/Saved';
import Admin from '@/pages/Admin';
import StudentPassport from '@/pages/StudentPassport';
import NotFound from '@/pages/NotFound';

import '@solana/wallet-adapter-react-ui/styles.css';

const App = () => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <AppProvider>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Landing />} />
                            <Route path="/onboarding" element={<Onboarding />} />

                            {/* App routes with sidebar layout */}
                            <Route element={<AppLayout />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/opportunities" element={<Opportunities />} />
                                <Route path="/scholarships" element={<Scholarships />} />
                                <Route path="/jobs" element={<Jobs />} />
                                <Route path="/hackathons" element={<Hackathons />} />
                                <Route path="/saved" element={<Saved />} />
                                <Route path="/ai-assistant" element={<AiAssistant />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/passport" element={<StudentPassport />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Toaster />
                    </AppProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;