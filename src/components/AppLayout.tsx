import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import BottomNav from './BottomNav';
import TopBar from './TopBar';

export default function AppLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background">
            <AppSidebar />
            <div className="lg:pl-64">
                <TopBar />
                <main className="pb-20 lg:pb-6" key={location.pathname}>
                    <Outlet />
                </main>
            </div>
            <BottomNav />
        </div>
    );
}
