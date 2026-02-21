import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const DeepfakeDetector: React.FC = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        label: string;
        confidence: number;
        probabilities: { real: number; fake: number };
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Assuming the python backend is running on localhost:5000
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to analyze image. Ensure backend is running.');
            }

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            console.error('Deepfake analysis error:', err);
            if (err.message.includes('Failed to fetch')) {
                setError('Could not connect to the AI analysis server. Please ensure the Python backend (api.py) is running on port 5000.');
            } else {
                setError(err.message || 'An error occurred during analysis.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-display pb-20">
            <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4 flex items-center gap-3">
                <button onClick={() => navigate('/functions')} className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold">Deepfake Detector</h1>
            </header>

            <main className="p-4 max-w-lg mx-auto space-y-6">
                {/* Upload Section */}
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="deepfake-upload"
                    />

                    {!previewUrl ? (
                        <label htmlFor="deepfake-upload" className="cursor-pointer flex flex-col items-center gap-4 py-8">
                            <div className="size-20 bg-primary/5 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-4xl">add_photo_alternate</span>
                            </div>
                            <div>
                                <p className="font-bold text-lg">Upload Image</p>
                                <p className="text-sm text-slate-500">JPG, PNG supported</p>
                            </div>
                        </label>
                    ) : (
                        <div className="relative">
                            <img src={previewUrl} alt="Preview" className="w-full rounded-lg max-h-80 object-contain mx-auto" />
                            <button
                                onClick={() => { setSelectedFile(null); setPreviewUrl(null); setResult(null); }}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                {selectedFile && !result && (
                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin material-symbols-outlined">progress_activity</span>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">search_check</span>
                                Analyze Authenticity
                            </>
                        )}
                    </button>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 flex items-center gap-3">
                        <span className="material-symbols-outlined">error</span>
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                {/* Results Section */}
                {result && (
                    <div className={cn(
                        "p-6 rounded-xl border-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-500",
                        result.label === 'Real'
                            ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300"
                            : "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-300"
                    )}>
                        <div className="size-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-white dark:bg-slate-900/50">
                            <span className="material-symbols-outlined text-4xl">
                                {result.label === 'Real' ? 'verified_user' : 'warning'}
                            </span>
                        </div>

                        <h2 className="text-3xl font-black uppercase tracking-wider mb-2">{result.label}</h2>
                        <div className="text-sm font-medium opacity-80 mb-6">
                            Confidence: {(result.confidence * 100).toFixed(2)}%
                        </div>

                        {/* Probability Bar */}
                        <div className="bg-white/50 dark:bg-black/20 rounded-full h-4 w-full overflow-hidden flex relative">
                            <div
                                className="h-full bg-green-500 transition-all duration-1000"
                                style={{ width: `${result.probabilities.real * 100}%` }}
                            />
                            <div
                                className="h-full bg-red-500 transition-all duration-1000"
                                style={{ width: `${result.probabilities.fake * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs mt-2 font-bold opacity-70">
                            <span>Real: {(result.probabilities.real * 100).toFixed(1)}%</span>
                            <span>Fake: {(result.probabilities.fake * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default DeepfakeDetector;
