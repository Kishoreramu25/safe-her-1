import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const ComplaintStep1: React.FC = () => {
    const navigate = useNavigate();
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [category, setCategory] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const togglePlatform = (id: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };

    const handleContinue = async () => {
        if (selectedPlatforms.length === 0 || !category) {
            alert('Please select at least one platform and a category.');
            return;
        }

        setLoading(true);
        try {
            const uploadedUrls: string[] = [];

            // 1. Upload files to Supabase Storage
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('evidence')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('evidence')
                    .getPublicUrl(filePath);

                uploadedUrls.push(publicUrl);
            }

            // 2. Save Step 1 data to session storage
            const step1Data = {
                platforms: selectedPlatforms,
                category: category,
                evidence_count: files.length,
                evidence_urls: uploadedUrls
            };
            sessionStorage.setItem('report_step_1', JSON.stringify(step1Data));
            navigate('/report/step2');
        } catch (error: any) {
            console.error('File upload failed:', error);
            alert(`Upload failed: ${error.message || 'Please ensure you have created an "evidence" bucket in Supabase.'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Top App Bar Component */}
            <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto">
                    <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Report an Incident</h1>
                </div>

                {/* Progress Bar Component */}
                <div className="px-4 pb-4 max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Step 1 of 4</p>
                        <p className="text-sm font-bold text-primary">25% Complete</p>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '25%' }}></div>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto p-4 space-y-8 pb-32 w-full flex-1">
                {/* Section: Platform Selection */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Where did this happen?</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Select all platforms where the incident occurred.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'facebook', name: 'Facebook', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx6zQeUAWAnsGmncUvYthxz0rTTWPeTI0qG2w2yRf4yDFQ8KCTbyMPWEwRqCqHl9zgW-2AYjLOJeEzS3vEdytnqof9lcGBZ2LVDSwjQI4BzNNEVb7tT_AqZg9lXJVkIkXAHR_-lRO-AZFljvlWosdG7TQnNyR7XGTuXRkau1aAvJZHyOHhj-6qS-jNjRnxQSqtfn6DsvIuqyh1jq7__FJ_7UpyqYzUzcozFtrNNNSaPymJMNe2jDpxGnCcSGaYRa3fbhRX7dhbBiU' },
                            { id: 'whatsapp', name: 'WhatsApp', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuque9PNZRsdOk157czp25Gw_19d6ZCkxmq40MEVehi8EvFtU33OhkKmT3PL7NOlha0iXItOC853dgxM7SOgG_m0jr5OjJ5U7oQonpBv1PjcXry6KKqqt0uyyQ4ng_B09CQhjOpmR0ec9dnUS2rjJ1IrNWl-Y35r1qWUWmFa0yVHGNLm9n1VFzENZguMWqyagyPAG2QcbehczrPK0k5UE2j-oRb9JuRYLvwdlhmXwUh6-fBGP3JSrAeQM31gsAAF_9SfCeMouhWVg' },
                            { id: 'instagram', name: 'Instagram', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqDmOMehXoJXP_tG9tOkVPwpbN9wIR5EREiVS4CtEO0geNHFrLE-ftqSV-fw1O07kQ9WTzGEBt9qS5tHWb10RW6mDdQlqxuyIwGxoTJ_T2KyIiaZZPFkAAQkJlQc5l59tcgRYFqWbk4qAhPZ5TEjdAMXCS-HNG1CulgccJoB2CdoOid8CfrfW2CsSSbzdKdobjQnkCDZ0yhtsi4qLddkTkebKd4Lon9vQKz84JxdnZMlsAOFvpOaeboOrBRVKjEiw8fA57cjUviV4' }
                        ].map((platform) => (
                            <button
                                key={platform.id}
                                onClick={() => togglePlatform(platform.id)}
                                className={cn(
                                    "group relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                                    selectedPlatforms.includes(platform.id) ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary",
                                    "bg-slate-100 dark:bg-slate-800"
                                )}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8)), url("${platform.url}")` }}
                                ></div>
                                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                    <span className="text-white font-bold text-sm">{platform.name}</span>
                                </div>
                                {selectedPlatforms.includes(platform.id) && (
                                    <div className="absolute top-2 right-2 bg-primary rounded-full">
                                        <span className="material-symbols-outlined text-white text-lg font-bold p-0.5">check</span>
                                    </div>
                                )}
                            </button>
                        ))}

                        <button
                            onClick={() => togglePlatform('other')}
                            className={cn(
                                "group relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                                selectedPlatforms.includes('other') ? "border-primary bg-primary/10 dark:bg-primary/20" : "border-transparent bg-slate-100 dark:bg-slate-800 hover:border-primary"
                            )}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-primary text-3xl">more_horiz</span>
                                <span className="text-primary font-bold text-sm">Other Platform</span>
                            </div>
                            {selectedPlatforms.includes('other') && (
                                <div className="absolute top-2 right-2 bg-primary rounded-full">
                                    <span className="material-symbols-outlined text-white text-lg font-bold p-0.5">check</span>
                                </div>
                            )}
                        </button>
                    </div>
                </section>

                {/* Section: Incident Category */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Incident Category</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">What type of cyber crime are you reporting?</p>
                    </div>
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full h-14 pl-4 pr-10 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary appearance-none font-medium"
                        >
                            <option disabled value="">Select a category</option>
                            <option value="financial">Financial Fraud / Online Scam</option>
                            <option value="harassment">Cyber Bullying / Harassment</option>
                            <option value="identity">Identity Theft / Impersonation</option>
                            <option value="hacking">Hacking / Unauthorized Access</option>
                            <option value="child">Child Safety Related</option>
                            <option value="misleading">Misleading Content / Fake News</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <span className="material-symbols-outlined text-slate-500">expand_more</span>
                        </div>
                    </div>
                </section>

                {/* Section: Evidence Upload */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Upload Evidence</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Attach screenshots, chat logs, or documents.</p>
                    </div>
                    <div className="w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="p-3 bg-primary/10 rounded-full mb-3">
                                    <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                                </div>
                                <p className="mb-1 text-sm font-semibold">Tap to upload files</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">JPG, PNG, PDF, or MP4 (Max 20MB)</p>
                            </div>
                            <input type="file" className="hidden" multiple onChange={handleFileChange} />
                        </label>
                    </div>

                    {/* File Preview */}
                    {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center gap-2 bg-primary/10 border border-primary/20 p-2 rounded-lg">
                                    <span className="material-symbols-outlined text-primary text-sm">description</span>
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 max-w-[150px] truncate">{file.name}</span>
                                    <button className="material-symbols-outlined text-slate-400 hover:text-red-500 text-sm" onClick={() => setFiles(files.filter((_, i) => i !== index))}>close</button>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Static Preview based on design if no files selected (optional, skipping for logic) */}
                    {files.length === 0 && (
                        <div className="mt-4 flex flex-col items-center justify-center py-6 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/20">
                            <span className="material-symbols-outlined text-slate-300 text-3xl mb-1">attachment</span>
                            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">No evidence uploaded yet</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Bottom Navigation Component */}
            <footer className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 p-4 pb-8">
                <div className="max-w-md mx-auto flex gap-4">
                    <button
                        onClick={handleContinue}
                        disabled={loading}
                        className={cn(
                            "flex-1 py-4 px-6 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20",
                            loading ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
                        )}
                    >
                        {loading ? 'Uploading Evidence...' : 'Continue to Details'}
                        {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ComplaintStep1;
