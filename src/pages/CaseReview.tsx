import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const CaseReview: React.FC = () => {
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
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">Decrypting Case File...</p>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                <h2 className="text-xl font-bold">Case Not Found</h2>
                <p className="text-sm text-slate-500 mt-2">The case you are looking for does not exist or has been archived.</p>
                <button onClick={() => navigate(-1)} className="mt-8 px-6 py-3 bg-primary text-white rounded-xl font-bold">Go Back</button>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display min-h-screen flex flex-col">
            {/* Top Navigation / Status Bar Space */}
            <div className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="text-primary cursor-pointer hover:bg-primary/10 rounded-full p-1 transition-colors">
                            <span className="material-symbols-outlined">arrow_back_ios</span>
                        </button>
                        <div>
                            <h1 className="text-lg font-bold leading-tight uppercase tracking-tighter">Case #{report.id.slice(0, 8).toUpperCase()}</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic capitalize">{report.status.replace('_', ' ')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="pb-32 flex-1 overflow-y-auto no-scrollbar">
                {/* Top Metrics / Risk Score */}
                <div className="px-4 pt-6 grid grid-cols-2 gap-4">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wide">AI Risk Score</span>
                            <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{report.risk_score}<span className="text-sm text-slate-500 dark:text-slate-400">/100</span></div>
                            <div className="flex items-center gap-1 mt-1">
                                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${report.risk_score}%` }}></div>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium mt-2">Analyzed {new Date(report.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Priority</span>
                            <span className="material-symbols-outlined text-slate-400 text-sm">priority_high</span>
                        </div>
                        <div>
                            <div className={cn(
                                "text-2xl font-bold tracking-tight leading-tight italic",
                                report.risk_score > 70 ? "text-red-500" : "text-amber-500"
                            )}>
                                {report.risk_score > 70 ? 'CRITICAL' : 'ELEVATED'}
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">SOP Level 1</p>
                        </div>
                    </div>
                </div>

                {/* Case Overview Section */}
                <section className="mt-8 px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Complaint Details</h2>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                        <div className="flex gap-4">
                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary">person</span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Victim Alias</p>
                                <p className="text-base font-semibold italic text-slate-900 dark:text-slate-100 tracking-tight">
                                    {report.victim_details?.alias || 'Anonymous'}
                                </p>
                                <p className="text-[11px] text-slate-400">Relation: {report.victim_details?.relation || 'Self'}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <p className="text-xs text-slate-500 font-medium mb-1">Incident Summary</p>
                            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                {report.incident_description || 'No summary available.'}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Platform</p>
                                <p className="text-xs font-bold capitalize">{report.platform}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Category</p>
                                <p className="text-xs font-bold capitalize">{report.category.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Evidence Gallery */}
                <section className="mt-8">
                    <div className="px-4 flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Evidence ({report.evidence_urls?.length || 0})
                        </h2>
                    </div>
                    <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar pb-2">
                        {report.evidence_urls && report.evidence_urls.length > 0 ? (
                            report.evidence_urls.map((url: string, idx: number) => (
                                <div key={idx} className="shrink-0 w-32 group">
                                    <div className="h-32 w-32 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                                        {/* If it's an image, show it. Otherwise show icon. */}
                                        {url.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                            <img src={url} alt={`Evidence ${idx}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800">
                                                <span className="material-symbols-outlined text-slate-400 text-3xl">description</span>
                                                <span className="text-[10px] text-slate-400 mt-2 font-bold">FILE</span>
                                            </div>
                                        )}
                                    </div>
                                    <a href={url} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-primary mt-2 flex items-center gap-1 justify-center uppercase">
                                        View Full <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="shrink-0 w-full px-4">
                                <div className="h-20 w-full rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">No Evidence Attached</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Timeline / Audit Trail */}
                <section className="mt-8 px-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Case History</h2>
                    <div className="bg-slate-50 dark:bg-slate-800/10 p-4 rounded-lg flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-sm">event_note</span>
                        <p className="text-[10px] text-slate-500 font-medium">Auto-Registered {new Date(report.created_at).toLocaleString()}</p>
                    </div>
                </section>
            </main>

            {/* Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 pb-8">
                <div className="max-w-md mx-auto grid grid-cols-2 gap-3 mb-3">
                    <button className="flex items-center justify-center gap-2 h-12 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 rounded-xl font-bold text-sm transition-colors">
                        <span className="material-symbols-outlined text-sm">help</span>
                        Request Info
                    </button>
                    <button className="flex items-center justify-center gap-2 h-12 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 rounded-xl font-bold text-sm transition-colors">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        Escalate
                    </button>
                </div>
                <div className="max-w-md mx-auto grid grid-cols-4 gap-3">
                    <button className="col-span-3 flex items-center justify-center gap-2 h-14 bg-primary text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
                        <span className="material-symbols-outlined">assignment_turned_in</span>
                        Mark Under Review
                    </button>
                    <button className="col-span-1 flex items-center justify-center h-14 bg-red-500/10 text-red-500 rounded-xl font-bold transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CaseReview;
