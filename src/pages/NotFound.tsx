import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center">
                <p className="text-7xl font-display font-bold gradient-text mb-4">404</p>
                <h1 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h1>
                <p className="text-sm text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground"
                        style={{ background: 'var(--gradient-primary)' }}
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}
