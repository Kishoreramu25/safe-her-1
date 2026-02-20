import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SOSButton from '@/components/SOSButton';

const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe">
            <div className="flex items-end justify-between h-16 pb-2 max-w-lg mx-auto relative px-6">
                {/* 1. Home */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className={cn("flex flex-col items-center justify-center gap-1 transition-colors w-14", isActive('/dashboard') ? "text-primary" : "text-slate-400 dark:text-slate-500")}
                >
                    <span className="material-symbols-outlined text-[24px]" style={isActive('/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
                    <span className="text-[10px] font-medium">Home</span>
                </button>

                {/* 2. Functions */}
                <button
                    onClick={() => navigate('/functions')}
                    className={cn("flex flex-col items-center justify-center gap-1 transition-colors w-14", isActive('/functions') ? "text-primary" : "text-slate-400 dark:text-slate-500")}
                >
                    <span className="material-symbols-outlined text-[24px]" style={isActive('/functions') ? { fontVariationSettings: "'FILL' 1" } : {}}>grid_view</span>
                    <span className="text-[10px] font-medium">Functions</span>
                </button>

                {/* 3. SOS (Center, Raised) */}
                <div className="relative -top-6">
                    <SOSButton />
                </div>

                {/* 4. Delete (Right of SOS) */}
                <button
                    onClick={() => alert("Delete functionality would trigger here.")}
                    className={cn("flex flex-col items-center justify-center gap-1 transition-colors w-14 text-slate-400 dark:text-slate-500 hover:text-red-500")}
                    title="Request Content Takedown"
                >
                    <span className="material-symbols-outlined text-[24px]">delete</span>
                    <span className="text-[10px] font-medium">Delete</span>
                </button>

                {/* 5. Settings */}
                <button
                    onClick={() => navigate('/settings')}
                    className={cn("flex flex-col items-center justify-center gap-1 transition-colors w-14", isActive('/settings') ? "text-primary" : "text-slate-400 dark:text-slate-500")}
                >
                    <span className="material-symbols-outlined text-[24px]" style={isActive('/settings') ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
                    <span className="text-[10px] font-medium">Settings</span>
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
