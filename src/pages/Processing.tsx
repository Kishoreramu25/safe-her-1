import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Processing: React.FC = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const sequence = [
            { text: '> OCR_ENGINE_START... DONE', delay: 500 },
            { text: '> VECTORIZING_TEXT_STREAM... 1024KB', delay: 1500 },
            { text: '> SCANNING_METADATA_LAT: 34.0522 N, 118.2437 W', delay: 2500 },
            { text: '> MAPPING_THREAT_GRAPH_IDENTIFIERS...', delay: 3500 },
            { text: 'REDIRECTING...', delay: 4500 }
        ];

        let timeouts: number[] = [];

        sequence.forEach(({ text, delay }) => {
            const id = setTimeout(() => {
                if (text === 'REDIRECTING...') {
                    navigate('/report/review');
                } else {
                    setLogs(prev => [...prev, text]);
                }
            }, delay);
            timeouts.push(id);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [navigate]);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-6 pt-12 pb-4">
                <button className="flex items-center justify-center size-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50">
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-1 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse"></span> Live Analysis
                    </span>
                    <h1 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Report ID: #8821-X</h1>
                </div>
                <button className="flex items-center justify-center size-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50">
                    <span className="material-symbols-outlined text-xl">help</span>
                </button>
            </header>

            <main className="flex-1 px-6 flex flex-col items-center justify-center gap-8">
                {/* Central Visualizer */}
                <div className="relative size-64 flex items-center justify-center">
                    {/* Rotating Rings (Simulated) */}
                    <div className="absolute inset-0 border-2 border-primary/20 rounded-full border-dashed animate-spin-slow"></div>
                    <div className="absolute inset-4 border-2 border-primary/40 rounded-full animate-ping-slow"></div>
                    <div className="absolute inset-10 border border-primary/10 rounded-full"></div>

                    {/* Central Icon */}
                    <div className="relative z-10 size-24 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-md border border-primary/30">
                        <span className="material-symbols-outlined text-5xl text-primary">shield_with_heart</span>
                    </div>

                    {/* Floating Data Points */}
                    <div className="absolute top-0 right-10 size-3 bg-primary rounded-full blur-[2px] animate-pulse"></div>
                    <div className="absolute bottom-10 left-4 size-2 bg-primary/60 rounded-full animate-bounce"></div>
                </div>

                {/* Status Info */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Deep Analysis in Progress</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[280px] mx-auto leading-relaxed">
                        Our AI is currently auditing the submitted evidence for cyber threats and harassment patterns.
                    </p>
                </div>

                {/* Processing Cards Container */}
                <div className="w-full space-y-3 max-w-md">
                    {/* OCR Extraction */}
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary">document_scanner</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">OCR Extraction</span>
                                <span className="text-xs font-bold text-primary">COMPLETE</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Pattern Matching */}
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary">hub</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pattern Matching</span>
                                <span className="text-xs font-bold text-slate-100">65%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[65%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Log Stream (Mini) */}
                <div className="w-full max-w-md bg-black/20 dark:bg-black/40 rounded-lg p-3 font-mono text-[10px] text-primary/80 overflow-hidden h-20 border border-primary/5 flex flex-col justify-end">
                    {logs.map((log, i) => (
                        <p key={i}>{log}</p>
                    ))}
                </div>
            </main>

            {/* Footer Controls */}
            <footer className="p-6 pb-10 space-y-4 text-center">
                <p className="text-[11px] text-slate-500 dark:text-slate-500">
                    Analysis usually completes in under 30 seconds.
                </p>
                <button className="w-full h-12 text-slate-500 font-medium text-sm">
                    Cancel Analysis
                </button>
            </footer>
        </div>
    );
};

export default Processing;
