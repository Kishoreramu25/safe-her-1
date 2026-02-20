import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TakedownItem {
    platform: string;
    icon: string;
    status: 'removed' | 'found' | 'pending';
    details: string;
}

const TakedownTracker: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<'initiating' | 'monitoring'>('initiating');

    const items: TakedownItem[] = [
        {
            platform: 'Google Search',
            icon: 'search',
            status: 'removed',
            details: 'Content de-indexed from global search results.'
        },
        {
            platform: 'Instagram',
            icon: 'photo_camera',
            status: 'removed',
            details: 'Reported under Meta safety guidelines. Post removed.'
        },
        {
            platform: 'WhatsApp',
            icon: 'chat',
            status: 'found',
            details: 'Active search query found matches in metadata.'
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setPhase('monitoring');
            const interval = setInterval(() => {
                setProgress(prev => (prev < 100 ? prev + 1 : 100));
            }, 50);
            return () => clearInterval(interval);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 px-4 h-16">
                    <button onClick={() => navigate(-1)} className="text-primary p-2">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <h1 className="text-lg font-bold">Content Takedown</h1>
                </div>
            </header>

            <main className="flex-1 p-6 space-y-8">
                {/* Status Hero */}
                <div className="text-center space-y-4 py-6">
                    <div className="relative inline-block">
                        <div className="size-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
                            <span className="material-symbols-outlined text-4xl">
                                {phase === 'initiating' ? 'sync' : 'verified_user'}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            {phase === 'initiating' ? 'Initiating Takedown Requests...' : 'Active Monitoring'}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                            Tracking legal removal requests across global platforms.
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        <span>Analysis Coverage</span>
                        <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Takedown List */}
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex gap-4 transition-all hover:border-primary/50 group"
                        >
                            <div className="size-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-base">{item.platform}</h3>
                                    {item.status === 'removed' ? (
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-[11px] font-bold uppercase">Removed</span>
                                            <span className="material-symbols-outlined text-base">check_circle</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <span className="text-[11px] font-bold uppercase">Search Found</span>
                                            <span className="material-symbols-outlined text-base">info</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                    {item.details}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legal Advisory */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/20 flex gap-3">
                    <span className="material-symbols-outlined text-amber-500 shrink-0">gavel</span>
                    <p className="text-[12px] text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                        Requests are processed under the Information Technology Rules, 2021. Final removal timings depend on platform-specific audit cycles.
                    </p>
                </div>
            </main>

            {/* Bottom Action */}
            <div className="p-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky bottom-0">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
};

export default TakedownTracker;
