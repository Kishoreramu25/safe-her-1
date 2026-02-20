import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface Report {
    id: string;
    created_at: string;
    platform: string;
    category: string;
    incident_description: string;
    status: string;
    risk_score: number;
}

const OfficialDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'new' | 'review' | 'escalated'>('new');
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, [filter]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('reports')
                .select('*')
                .eq('status', filter)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReports(data || []);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Header Section */}
            <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBozBmZBh0AET3qFVvUpXdQnOutUuBB5WcfAEP1t_EHLy24nndE1eIX_UsiVnVD78zFecs1b8UhHOgL5vdXcR8HSePGW7dE0dInSmThRtiPf2MKvqJLxlP7-y5LLplSXLVb8XMLQVL1ng6y7kwm6hmT4O4SPwR6_6zTgMGjlMc7JJaVgHUPbk911gjv6yY3HFTax1nJiCrfG4dboSCV80hIZC2IIo8csPSHQZb2kSE9maAG7cZH7EPzthSW4hAavPh1_ngeRC_N1Qs"
                                alt="Official Profile"
                                className="size-10 rounded-full border-2 border-primary object-cover"
                            />
                            <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-background-dark rounded-full"></span>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold leading-tight">Cyber Officer</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Cyber Crimes Unit</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Scrollable Area */}
            <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                {/* Summary Stats Horizontal Scroll */}
                <div className="flex gap-3 overflow-x-auto px-4 py-4 no-scrollbar">
                    <div className="flex min-w-[140px] flex-col gap-1 rounded-xl p-4 bg-primary/10 border border-primary/20">
                        <p className="text-primary text-[11px] font-bold uppercase tracking-wider">Pending</p>
                        <p className="text-2xl font-bold">{reports.filter(r => r.status === 'new').length}</p>
                    </div>
                    <div className="flex min-w-[140px] flex-col gap-1 rounded-xl p-4 bg-red-500/10 border border-red-500/20">
                        <p className="text-red-500 text-[11px] font-bold uppercase tracking-wider">High Risk</p>
                        <p className="text-2xl font-bold">{reports.filter(r => r.risk_score > 70).length}</p>
                    </div>
                    <div className="flex min-w-[140px] flex-col gap-1 rounded-xl p-4 bg-green-500/10 border border-green-500/20">
                        <p className="text-green-500 text-[11px] font-bold uppercase tracking-wider">Resolved</p>
                        <p className="text-2xl font-bold">{reports.filter(r => r.status === 'resolved').length}</p>
                    </div>
                </div>

                {/* Segmented Control Filter */}
                <div className="px-4 py-2">
                    <div className="flex h-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark p-1 border border-slate-200 dark:border-border-dark">
                        {['new', 'review', 'resolved'].map((f) => (
                            <label key={f} className={cn(
                                "flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all capitalize",
                                filter === (f === 'resolved' ? 'escalated' : f) ? "bg-white dark:bg-background-dark shadow-sm text-primary" : "text-slate-500 dark:text-slate-400"
                            )}>
                                <span>{f}</span>
                                <input
                                    type="radio"
                                    name="status-filter"
                                    className="hidden"
                                    checked={filter === (f === 'resolved' ? 'escalated' : f)}
                                    onChange={() => setFilter((f === 'resolved' ? 'escalated' : f) as any)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Complaint List */}
                <div className="px-4 space-y-4 mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            {filter === 'new' ? 'New Reports' : filter === 'review' ? 'In Review' : 'Resolved Case History'}
                        </h3>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-xs text-slate-500 mt-4 font-medium uppercase tracking-widest">Fetching Encrypted Data...</p>
                        </div>
                    ) : reports.length > 0 ? (
                        reports.map((report) => (
                            <div
                                key={report.id}
                                onClick={() => navigate(`/case/${report.id}`)}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-lg">description</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Case ID</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">#{report.id.slice(0, 8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "px-2 py-1 rounded-md text-[10px] font-bold uppercase",
                                        report.risk_score > 70 ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                                    )}>
                                        ROI: {report.risk_score}%
                                    </div>
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1 mb-1 capitalize">
                                    {report.category.replace('_', ' ')} on {report.platform}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                    {report.incident_description}
                                </p>
                                <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <span className="material-symbols-outlined text-xs">schedule</span>
                                        <span className="text-[10px] font-medium">{new Date(report.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Review Case &rarr;</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                            <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400 text-3xl">inbox</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-slate-100">No reports found</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">There are no reports matching this filter.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <button className="fixed right-6 bottom-32 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center z-30 active:scale-95 transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-[28px]">add</span>
            </button>
        </div>
    );
};

export default OfficialDashboard;
