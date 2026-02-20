import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const Tracker: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchReport();
    }, [id]);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('reports')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setReport(data);
        } catch (error) {
            console.error('Error fetching report:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="size-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">Retrieving Status...</p>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                <h2 className="text-xl font-bold">Case Not Found</h2>
                <p className="text-sm text-slate-500 mt-2">We couldn't find a report matching this ID.</p>
                <button onClick={() => navigate(-1)} className="mt-8 px-6 py-3 bg-primary text-white rounded-xl font-bold">Go Back</button>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col font-display">
            {/* Header / Navigation Bar (iOS Style) */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-4 h-16">
                    <button onClick={() => navigate(-1)} className="flex items-center text-primary">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                        <span className="text-lg font-medium">Back</span>
                    </button>
                    <h1 className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">Case Status</h1>
                    <button className="text-primary">
                        <span className="material-symbols-outlined">info</span>
                    </button>
                </div>
            </header>

            <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-32 flex-1 w-full no-scrollbar overflow-y-auto">
                {/* Case ID & Main Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case ID</span>
                            <h2 className="text-2xl font-bold mt-1 text-primary">#{report.id.slice(0, 8).toUpperCase()}</h2>
                        </div>
                        <div className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            report.status === 'new' ? "bg-blue-500/10 text-blue-500" :
                                report.status === 'review' ? "bg-amber-500/10 text-amber-500" :
                                    "bg-emerald-500/10 text-emerald-500"
                        )}>
                            {report.status}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">
                                {report.status === 'new' ? 'pending_actions' : 'model_training'}
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Stage</p>
                            <p className="text-lg font-bold italic">
                                {report.status === 'new' ? 'Under AI Audit' :
                                    report.status === 'review' ? 'Official Investigation' : 'Case Resolved'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vertical Timeline Section */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">Case Timeline</h3>
                    <div className="relative px-2">
                        {/* Timeline Line */}
                        <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-slate-800"></div>

                        {/* Steps */}
                        <div className="space-y-8">
                            {/* Step 3: Resolution (Conditional) */}
                            {report.status === 'escalated' && (
                                <div className="relative flex gap-6">
                                    <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white ring-8 ring-background-light dark:ring-background-dark">
                                        <span className="material-symbols-outlined text-xl">verified</span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <h4 className="text-base font-bold text-emerald-600">Action Taken</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Official has escalated this case to relevant authorities.</p>
                                        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Day 2 • 10:45 AM</p>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Under Review */}
                            {(report.status === 'review' || report.status === 'escalated') && (
                                <div className="relative flex gap-6">
                                    <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white ring-8 ring-background-light dark:ring-background-dark">
                                        <span className="material-symbols-outlined text-xl">visibility</span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <h4 className="text-base font-bold text-amber-600">Official Review</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">A cyber official is analyzing the evidence and AI risk score.</p>
                                        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Day 1 • 02:15 PM</p>
                                    </div>
                                </div>
                            )}

                            {/* Step 1: Created */}
                            <div className="relative flex gap-6">
                                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white ring-8 ring-background-light dark:ring-background-dark">
                                    <span className="material-symbols-outlined text-xl">description</span>
                                </div>
                                <div className="flex flex-col pt-1">
                                    <h4 className="text-base font-bold text-blue-600">Report Submitted</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Case registered on {report.platform} under category {report.category.replace('_', ' ')}.</p>
                                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">
                                        {new Date(report.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Share Section */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">share</span>
                        <h3 className="text-base font-bold italic">Share Track Link</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 px-4">Keep this ID private. Only share with authorized legal representatives.</p>
                    <div className="bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 flex items-center justify-between group">
                        <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{window.location.href}</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(window.location.href)}
                            className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors border border-primary/20"
                        >
                            <span className="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Tracker;
