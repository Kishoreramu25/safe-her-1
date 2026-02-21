import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const RoleSelection: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<'public' | 'official'>('public');

    const handleContinue = () => {
        // Navigate to Landing if public, or Auth if official
        if (selectedRole === 'public') {
            navigate('/landing');
        } else {
            navigate('/auth', { state: { role: selectedRole } });
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden font-display">
            {/* Status Bar Spacer */}
            <div className="h-12 w-full"></div>

            {/* Header */}
            <header className="px-6 pt-4 pb-8 flex flex-col items-center text-center">
                <div className="mb-6">
                    <img src="/logo.png" alt="SafeHer India Logo" className="w-40 h-auto drop-shadow-xl" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 uppercase">SAFE HER INDIA</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[300px] leading-relaxed">
                    From Fear to Freedom — Protecting Every Mother. Empowering Every Girl.
                </p>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-6 flex flex-col gap-6">
                <div className="mb-2">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Who are you?</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Select your profile to continue to the dashboard.</p>
                </div>

                <div className="space-y-4">
                    <label
                        className={cn(
                            "relative flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 group",
                            selectedRole === 'public'
                                ? "border-primary bg-primary/5"
                                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                        )}
                        onClick={() => setSelectedRole('public')}
                    >
                        <input type="radio" name="role" value="public" className="hidden" checked={selectedRole === 'public'} readOnly />
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "size-12 rounded-lg flex items-center justify-center transition-colors",
                                selectedRole === 'public' ? "bg-primary/20 text-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            )}>
                                <span className="material-symbols-outlined text-3xl">person</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">Public User</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">Report crimes & access resources</span>
                            </div>
                        </div>
                        <div className={cn(
                            "size-6 rounded-full border-2 flex items-center justify-center transition-all",
                            selectedRole === 'public' ? "border-primary bg-primary" : "border-slate-300 dark:border-slate-700"
                        )}>
                            <span className={cn("material-symbols-outlined text-white text-sm transition-transform", selectedRole === 'public' ? "scale-100" : "scale-0")}>check</span>
                        </div>
                    </label>

                    <label
                        className={cn(
                            "relative flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 group",
                            selectedRole === 'official'
                                ? "border-primary bg-primary/5"
                                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                        )}
                        onClick={() => setSelectedRole('official')}
                    >
                        <input type="radio" name="role" value="official" className="hidden" checked={selectedRole === 'official'} readOnly />
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "size-12 rounded-lg flex items-center justify-center transition-colors",
                                selectedRole === 'official' ? "bg-primary/20 text-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            )}>
                                <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">Cyber Official</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">Investigate reports & manage cases</span>
                            </div>
                        </div>
                        <div className={cn(
                            "size-6 rounded-full border-2 flex items-center justify-center transition-all",
                            selectedRole === 'official' ? "border-primary bg-primary" : "border-slate-300 dark:border-slate-700"
                        )}>
                            <span className={cn("material-symbols-outlined text-white text-sm transition-transform", selectedRole === 'official' ? "scale-100" : "scale-0")}>check</span>
                        </div>
                    </label>
                </div>

                {/* Decorative Element */}
                <div className="mt-4 rounded-2xl overflow-hidden relative h-32 w-full">
                    {/* Gradient Overlay for visual consistency */}
                    <div className="absolute inset-0 bg-slate-900/20 z-10 pointer-events-none mix-blend-overlay"></div>
                    <video
                        src="/cyber_bg.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="p-6 pb-10 flex flex-col items-center gap-4">
                <button
                    onClick={handleContinue}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                    Get Started
                </button>
                <div className="flex gap-6 mt-2">
                    <a href="#" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Help Center</a>
                    <div className="w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
                    <a href="#" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">App Language: Your Mothertongue</a>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-2 text-center">
                    By continuing, you agree to the CyberShield <br />
                    <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
                </p>
            </footer>

            {/* Indicator */}
            <div className="h-1.5 w-32 bg-slate-300 dark:bg-slate-800 rounded-full mx-auto mb-2"></div>
        </div>
    );
};

export default RoleSelection;
