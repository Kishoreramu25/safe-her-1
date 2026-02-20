import { useNavigate, useLocation } from 'react-router-dom';

const Success: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const reportId = (location.state as { reportId: string })?.reportId || 'PENDING';

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* iOS Top Bar Simulation */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4">
                <button onClick={() => navigate('/dashboard')} className="text-slate-900 dark:text-slate-100 flex items-center justify-center p-2 rounded-full bg-slate-200 dark:bg-primary/10">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight">Success</h1>
                <div className="w-10"></div> {/* Spacer for symmetry */}
            </div>

            <main className="flex-1 flex flex-col items-center px-6 pb-12 max-w-md mx-auto w-full">
                {/* Success Animation/Icon Area */}
                <div className="mt-8 mb-10 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-24 h-24 bg-primary/20 rounded-full animate-pulse"></div>
                        <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-white text-4xl font-bold">check</span>
                        </div>
                    </div>
                    <h2 className="mt-8 text-2xl font-bold text-center">Submission Successful</h2>
                    <p className="mt-3 text-slate-500 dark:text-slate-400 text-center text-sm leading-relaxed max-w-xs">
                        Your cyber complaint has been filed. A secure, encrypted notification has been sent to relevant officials.
                    </p>
                </div>

                {/* Complaint Details Card */}
                <div className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 mb-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Complaint ID</p>
                            <p className="text-lg font-bold text-primary tracking-tight">#{reportId.slice(0, 8).toUpperCase()}</p>
                        </div>
                        <button
                            className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                            onClick={() => navigator.clipboard.writeText(reportId)}
                        >
                            <span className="material-symbols-outlined text-sm">content_copy</span>
                            <span className="text-xs font-bold uppercase tracking-wide">Copy</span>
                        </button>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-700/50 w-full my-4"></div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Submitted On</span>
                            <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                <span className="text-sm font-medium">Pending Review</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Security</span>
                            <div className="flex items-center gap-1.5 text-emerald-500">
                                <span className="material-symbols-outlined text-sm">encrypted</span>
                                <span className="text-sm font-medium">Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="w-full flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">verified_user</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-primary mb-0.5">Notification Dispatched</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                            A secure receipt has been sent to your registered email for your records.
                        </p>
                    </div>
                </div>

                {/* Sticky Bottom Actions */}
                <div className="mt-auto w-full space-y-3">
                    <button className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined">download</span>
                        Download Receipt
                    </button>
                    <button onClick={() => navigate(`/track/${reportId}`)} className="w-full h-14 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined">dashboard</span>
                        Track Status
                    </button>
                </div>

                {/* Support Info */}
                <p className="mt-6 text-[11px] text-slate-400 dark:text-slate-500 text-center uppercase tracking-widest font-medium">
                    24/7 Support: 1-800-CYBER-SAFE
                </p>
            </main>

            {/* iOS Home Indicator Simulation */}
            <div className="h-1.5 w-32 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-2"></div>
        </div>
    );
};

export default Success;
