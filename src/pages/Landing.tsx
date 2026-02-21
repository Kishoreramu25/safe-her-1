import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Header */}
            <header className="py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <img src="/logo.png" alt="SafeHer India Logo" className="h-16 w-auto" />
            </header>

            <main className="max-w-4xl mx-auto px-6 py-20">
                {/* Hero section */}
                <section className="text-center space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-4">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Premium Cyber Protection</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Create Your Case
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Take control and protect your privacy today. Our AI-powered system helps you identify and request removal of unauthorized content.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
                        <button
                            onClick={() => navigate('/auth', { state: { role: 'public', redirectTo: '/takedown-tracker' } })}
                            className="w-full md:w-auto px-10 py-5 bg-primary text-white text-xl font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
                        >
                            Request Deletion
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full md:w-auto px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xl font-bold rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all active:scale-[0.98]"
                        >
                            Track Status
                        </button>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary/30 transition-colors">
                        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-3xl">shield</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Privacy First</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Your data and evidence are encrypted with bank-grade security before investigation.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary/30 transition-colors">
                        <div className="size-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
                            <span className="material-symbols-outlined text-3xl">bolt</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Rapid Response</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Automated takedown requests sent within minutes of case verification.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary/30 transition-colors">
                        <div className="size-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                            <span className="material-symbols-outlined text-3xl">support_agent</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Legal Advisory</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Access automated legal mapping aligned with Indian IT Acts and Cyber Laws.
                        </p>
                    </div>
                </section>

                {/* Requirements / Criteria */}
                <section className="bg-slate-900 rounded-[40px] p-8 md:p-16 text-white text-center">
                    <h2 className="text-3xl font-bold mb-6">Who can use SafeHer?</h2>
                    <p className="text-slate-400 mb-12 max-w-xl mx-auto">
                        SafeHer India is a free tool designed to support victims of cyber harassment and unauthorized image sharing.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                        {[
                            "Victims of Non-Consensual Intimate Image abuse",
                            "Individuals facing online harassment",
                            "Citizens identifying deepfake manipulation",
                            "Minor girls and women seeking safety"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                                <span className="text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-2">SafeHer India Official</p>
                <p className="text-xs text-slate-400">© 2026 SafeHer. Government Compliant. Secure. Free.</p>
            </footer>
        </div>
    );
};

export default Landing;
