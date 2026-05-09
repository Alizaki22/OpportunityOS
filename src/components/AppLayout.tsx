import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AppSidebar from './AppSidebar';
import BottomNav from './BottomNav';
import TopBar from './TopBar';
import FloatingAIAssistant from './FloatingAIAssistant';
import PWAInstallBanner from './PWAInstallBanner';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

export default function AppLayout() {
  const location = useLocation();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <AppSidebar />

      {/* Main content area */}
      <div className="lg:pl-64">
        <TopBar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pb-24 lg:pb-8 min-h-[calc(100dvh-56px)]"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />

      {/* Floating AI Assistant (hidden on AI page) */}
      {location.pathname !== '/ai-assistant' && <FloatingAIAssistant />}

      {/* PWA Install Banner */}
      <PWAInstallBanner />
    </div>
  );
}
