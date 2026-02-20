import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface Report {
    id: string;
    created_at: string;
    platform: string;
    category: string;
    status: string;
    risk_score: number;
}

const MyReports: React.FC = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyReports();
    }, []);

    const fetchMyReports = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await (supabase.auth as any).getUser();
            if (!user) {
                navigate('/auth');
                return;
            }

            const { data, error } = await supabase
                .from('reports')
                .select('*')
                .eq('reporter_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReports(data || []);
        } catch (error) {
            console.error('Error fetching my reports:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold">My Filed Reports</h1>
            </header>

            <main className="flex-1 p-4 space-y-4 pb-24">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-xs text-slate-500 mt-4 font-bold uppercase tracking-widest">Loading History...</p>
                    </div>
                ) : reports.length > 0 ? (
                    reports.map((report) => (
                        <div
                            key={report.id}
                            onClick={() => navigate(`/track/${report.id}`)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case ID</span>
                                    <h3 className="text-sm font-bold text-primary font-mono lowercase">#{report.id.slice(0, 8)}</h3>
                                </div>
                                <div className={cn(
                                    "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                                    report.status === 'new' ? "bg-blue-500/10 text-blue-500" :
                                        report.status === 'review' ? "bg-amber-500/10 text-amber-500" :
                                            "bg-emerald-500/10 text-emerald-500"
                                )}>
                                    {report.status}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 capitalize">{report.platform}</span>
                                <span className="text-slate-300 dark:text-slate-700">•</span>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 capitalize">{report.category}</span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px] text-slate-400">calendar_today</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                                        {new Date(report.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform">
                                    <span className="text-[10px] font-bold uppercase">Track Progress</span>
                                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                        <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-slate-300">description_off</span>
                        </div>
                        <h2 className="text-lg font-bold">No Reports Found</h2>
                        <p className="text-sm text-slate-500 mt-2">You haven't filed any cybercrime reports yet.</p>
                        <button
                            onClick={() => navigate('/report/step1')}
                            className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-bold transition-all active:scale-95"
                        >
                            File a Report
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyReports;
