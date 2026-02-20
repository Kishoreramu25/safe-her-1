import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { supabase } from '@/lib/supabase';

const AnalysisReview: React.FC = () => {
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [analysisStatus, setAnalysisStatus] = useState<'scanning' | 'complete'>('scanning');
    const [score, setScore] = useState(0);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        // Load data from session storage
        const step2Details = sessionStorage.getItem('report_step_2');

        const details = step2Details ? JSON.parse(step2Details) : {};
        setSummary(details.incident_description || "No description provided.");

        // Simulate AI scanning delay
        const timer = setTimeout(() => {
            setAnalysisStatus('complete');
            setScore(85); // Simulated high risk score
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async () => {
        if (!verified || loading) return;

        setLoading(true);
        try {
            // 1. Retrieve data from Step 1 and Step 2
            const step1Raw = sessionStorage.getItem('report_step_1');
            const step2Raw = sessionStorage.getItem('report_step_2');

            const step1 = step1Raw ? JSON.parse(step1Raw) : {};
            const step2 = step2Raw ? JSON.parse(step2Raw) : {};

            // 2. Get current user ID
            const { data: { user } } = await (supabase.auth as any).getUser();
            if (!user) throw new Error("You must be logged in to file a report.");

            // 3. Prepare report data for insertion
            const reportData = {
                reporter_id: user.id,
                platform: step1.platforms?.join(', ') || step1.platform || 'unknown',
                category: step1.category || 'general',
                evidence_urls: step1.evidence_urls || [],
                incident_description: step2.incident_description || '',
                victim_details: step2.victim_details || {},
                suspect_info: {
                    ...(step2.suspect_info || {}),
                    platform_links: step2.platform_links || {}
                },
                risk_score: score, // Use the simulated score
                status: 'new'
            };

            // 4. Insert into 'reports' table and get returned ID
            const { data: insertedData, error: insertError } = await (supabase as any)
                .from('reports')
                .insert([reportData])
                .select();

            if (insertError) throw insertError;

            // Clear session storage after success
            sessionStorage.removeItem('report_step_1');
            sessionStorage.removeItem('report_step_2');

            // 5. Navigate to success with the actual report ID
            const reportId = insertedData?.[0]?.id || 'PENDING';
            navigate('/report/success', { state: { reportId } });
        } catch (error: any) {
            console.error('Submission failed:', error);
            alert(`Error: ${error.message || 'Failed to submit report. Please try again.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">arrow_back_ios</span>
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-sm font-bold uppercase tracking-widest text-primary">Step 3 of 3</h1>
                    <p className="text-lg font-bold">Review AI Analysis</p>
                </div>
                <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">info</span>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32 no-scrollbar">
                {/* Progress Steps Indicator */}
                <div className="flex w-full flex-row items-center justify-center gap-3">
                    <div className="h-1.5 w-8 rounded-full bg-primary/30"></div>
                    <div className="h-1.5 w-8 rounded-full bg-primary/30"></div>
                    <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_8px_rgba(19,91,236,0.6)]"></div>
                </div>

                {/* Risk Score Section */}
                <section className="bg-slate-100 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center relative overflow-hidden">
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">AI Risk Evaluation</h3>
                    <div className="relative flex items-center justify-center py-4">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle className="text-slate-200 dark:text-slate-800" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                            <circle
                                className="text-primary transition-all duration-1000 ease-out"
                                cx="64" cy="64" fill="transparent" r="58" stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray="364.4"
                                strokeDashoffset={364.4 - (364.4 * score) / 100}
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={cn(
                                "text-4xl font-bold transition-all duration-500",
                                analysisStatus === 'scanning' ? "text-slate-300 animate-pulse" : "text-primary"
                            )}>
                                {analysisStatus === 'scanning' ? '--' : score}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Score</span>
                        </div>
                    </div>
                    <p className={cn(
                        "mt-4 font-bold text-lg transition-all",
                        analysisStatus === 'scanning' ? "text-slate-400 italic" : "text-red-500"
                    )}>
                        {analysisStatus === 'scanning' ? 'Scanning Context...' : 'HIGH RISK DETECTED'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {analysisStatus === 'scanning'
                            ? 'Our AI is auditing your evidence and description...'
                            : 'This incident matches patterns of severe cyber harassment.'}
                    </p>
                </section>

                {/* Incident Summary Snippet */}
                <section className="space-y-2">
                    <div className="flex justify-between items-end px-1">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Incident Context</h3>
                        <button className="text-primary text-[10px] font-bold uppercase tracking-widest">View Full</button>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <p className={cn(
                            "text-sm leading-relaxed",
                            analysisStatus === 'scanning' ? "italic text-slate-400" : "text-slate-700 dark:text-slate-300"
                        )}>
                            {analysisStatus === 'scanning' ? "Extracting insights from your report..." : `"${summary}"`}
                        </p>
                    </div>
                </section>

                {/* AI Model & Detection Method */}
                <section className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 px-1">AI Model & Detection</h3>
                    <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500/10 p-2 rounded-lg shrink-0">
                                <span className="material-symbols-outlined text-blue-500">model_training</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Model Architecture</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Ensemble Deep Learning Model combining <span className="font-semibold text-slate-700 dark:text-slate-300">MesoNet</span> for artifact detection and <span className="font-semibold text-slate-700 dark:text-slate-300">Xception</span> for feature extraction.
                                </p>
                            </div>
                        </div>
                        <div className="h-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-500/10 p-2 rounded-lg shrink-0">
                                <span className="material-symbols-outlined text-purple-500">query_stats</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Detection Method</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Multi-modal analysis utilizing <span className="font-semibold text-slate-700 dark:text-slate-300">Natural Language Processing (NLP)</span> for text pattern recognition and <span className="font-semibold text-slate-700 dark:text-slate-300">Frequency Domain Analysis</span> for media integrity verification.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">#MesoNet</span>
                            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">#Xception</span>
                            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">#NLP</span>
                        </div>
                    </div>
                </section>

                {/* Legal Mapping List */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 px-1">Proposed Legal Framework</h3>
                    {/* Legal Card 1 */}
                    <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-4 flex items-start gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <span className="material-symbols-outlined text-primary">gavel</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Section 66D, IT Act 2000</h4>
                                    <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Punishment for cheating by personation by using computer resource.</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase">AI Match: 98%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Legal Card 2 */}
                    <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-4 flex items-start gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <span className="material-symbols-outlined text-primary">policy</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Section 420, IPC</h4>
                                    <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cheating and dishonestly inducing delivery of property.</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase">AI Match: 92%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Flag Suggestion */}
                    <button className="w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">flag</span>
                        Report Incorrect Legal Mapping
                    </button>
                </section>

                {/* Confirmation Toggle */}
                <section className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20 cursor-pointer" onClick={() => setVerified(!verified)}>
                    <input
                        type="checkbox"
                        id="verify"
                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary bg-transparent"
                        checked={verified}
                        onChange={(e) => setVerified(e.target.checked)}
                    />
                    <label htmlFor="verify" className="text-xs leading-tight text-slate-600 dark:text-slate-300 pointer-events-none">
                        I have reviewed the AI-suggested legal mappings and verify that the incident details are accurate to my knowledge.
                    </label>
                </section>
            </main>

            {/* Fixed Action Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-4 pb-8 space-y-4">
                <div className="flex gap-3 max-w-md mx-auto">
                    <button className="flex-1 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold py-3.5 rounded-xl transition-all active:scale-95">
                        Edit Details
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!verified}
                        className={cn(
                            "flex-[2] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95",
                            verified ? "bg-primary shadow-primary/30" : "bg-slate-400 cursor-not-allowed shadow-none"
                        )}
                    >
                        Final Submit
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AnalysisReview;
