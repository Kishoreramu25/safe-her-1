
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Functions = () => {
    const navigate = useNavigate();

    const features = [
        {
            id: 'deepfake',
            title: 'Deepfake Detector',
            icon: 'face',
            color: 'bg-purple-500',
            path: '/functions/deepfake',
            desc: 'Analyze images to detect AI manipulation.'
        },
        {
            id: 'report',
            title: 'File Complaint',
            icon: 'report_problem',
            color: 'bg-red-500',
            path: '/report/step1',
            desc: 'Submit a new cybercrime report.'
        },
        // More placeholders for future
        {
            id: 'track',
            title: 'Track Status',
            icon: 'track_changes',
            color: 'bg-blue-500',
            path: '/dashboard', // redirects to dashboard for now
            desc: 'Check the progress of your cases.'
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-display pb-24">
            <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4">
                <h1 className="text-xl font-bold">Cyber Tools</h1>
            </header>

            <main className="p-4 grid grid-cols-1 gap-4">
                {features.map((feature) => (
                    <button
                        key={feature.id}
                        onClick={() => navigate(feature.path)}
                        className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-primary/50 transition-all text-left shadow-sm hover:shadow-md"
                    >
                        <div className={`size-14 rounded-full ${feature.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                            <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">{feature.title}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-tight">{feature.desc}</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 ml-auto">chevron_right</span>
                    </button>
                ))}
            </main>
        </div>
    );
}
export default Functions;
