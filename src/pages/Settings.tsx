import React, { useState, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import type { Theme } from '@/lib/themes';
import { themes } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Settings: React.FC = () => {
    const { activeTheme, setTheme, mode, toggleMode } = useTheme();
    const navigate = useNavigate();
    const [sosKeyword, setSosKeyword] = useState('Help Me');
    const [emergencyEmail, setEmergencyEmail] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'listening'>('success');
    const recognitionRef = useRef<any>(null);

    // Initial Fetch
    React.useEffect(() => {
        const fetchSettings = async () => {
            const { data: { user } } = await (supabase.auth as any).getUser();
            if (user) {
                setUserId(user.id);
                const { data } = await supabase
                    .from('profiles')
                    .select('sos_keyword, emergency_email')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setSosKeyword(data.sos_keyword || 'Help Me');
                    setEmergencyEmail(data.emergency_email || '');
                    // Sync local storage for offline voice/SOS access
                    localStorage.setItem('sos_keyword', data.sos_keyword || 'Help Me');
                    localStorage.setItem('emergency_email', data.emergency_email || '');
                }
            }
        };
        fetchSettings();
    }, []);

    // Helper to update Supabase
    const updateProfile = async (field: 'sos_keyword' | 'emergency_email', value: string) => {
        if (!userId) return;
        const { error } = await supabase
            .from('profiles')
            .update({ [field]: value })
            .eq('id', userId);

        if (error) {
            console.error('Error updating profile:', error);
        } else {
            // Show success toast
            setToastMessage('Saved to Database');
            setToastType('success');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const startRecording = () => {
        if (isRecording) return;

        // START RECORDING
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognitionRef.current = recognition;

        // Start Listening UI
        setIsRecording(true);
        setToastMessage('Listening... Click stop to save.');
        setToastType('listening');
        setShowToast(true);

        // Audio Feedback
        const speakFeedback = () => {
            const text = "Mic is on, start speaking";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;

            // Try to find a clear English Female voice (e.g., Microsoft Zira, Google US English)
            const voices = window.speechSynthesis.getVoices();
            const femaleVoice = voices.find(v =>
            (v.name.toLowerCase().includes('female') ||
                v.name.includes('Zira') ||
                v.name.includes('Google US English'))
            );

            if (femaleVoice) {
                utterance.voice = femaleVoice;
            }

            window.speechSynthesis.speak(utterance);
        };

        // Ensure voices are loaded
        if (window.speechSynthesis.getVoices().length > 0) {
            speakFeedback();
        } else {
            window.speechSynthesis.onvoiceschanged = speakFeedback;
        }

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSosKeyword(transcript);
            localStorage.setItem('sos_keyword', transcript);
            updateProfile('sos_keyword', transcript);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setIsRecording(false);
        };

        recognition.onerror = (event: any) => {
            console.error(event.error);
            setIsRecording(false);
            setShowToast(false);
        };

        recognition.onend = () => {
            setIsRecording(false);
            setShowToast(false);
        };

        recognition.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
        setShowToast(false);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-24 font-display">
            <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4">
                <h1 className="text-xl font-bold">Settings</h1>
            </header>

            <main className="px-4 py-6 space-y-8">
                {/* Mode Toggle Section */}
                <section className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Dark Mode</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Switch between light and dark appearance.</p>
                    </div>
                    <button
                        onClick={toggleMode}
                        className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                            mode === 'dark' ? "bg-primary" : "bg-slate-200"
                        )}
                    >
                        <span className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                            mode === 'dark' ? "translate-x-6" : "translate-x-1"
                        )} />
                    </button>
                </section>

                {/* Theme Selection Section */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Appearance Theme</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {(Object.keys(themes) as Theme[]).map((themeKey) => {
                            const theme = themes[themeKey];
                            const isSelected = activeTheme === themeKey;

                            return (
                                <button
                                    key={themeKey}
                                    onClick={() => setTheme(themeKey)}
                                    className={cn(
                                        "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                                        isSelected
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-primary/50"
                                    )}
                                >
                                    {/* Theme Preview Swatch */}
                                    <div className="flex -space-x-2 shrink-0">
                                        <div className="size-8 rounded-full border-2 border-white dark:border-slate-900" style={{ backgroundColor: theme.colors.primary }}></div>
                                        <div className="size-8 rounded-full border-2 border-white dark:border-slate-900" style={{ backgroundColor: theme.colors.backgroundLight }}></div>
                                        <div className="size-8 rounded-full border-2 border-white dark:border-slate-900" style={{ backgroundColor: theme.colors.backgroundDark }}></div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-sm">{theme.name}</h3>
                                            {isSelected && <span className="material-symbols-outlined text-primary text-lg">check_circle</span>}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* SOS Configuration Section */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">SOS Configuration</h2>
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Voice Trigger Phrase</label>
                            <div className="flex gap-2 mt-1.5">
                                <input
                                    type="text"
                                    value={sosKeyword}
                                    onChange={(e) => {
                                        setSosKeyword(e.target.value);
                                        localStorage.setItem('sos_keyword', e.target.value);
                                    }}
                                    onBlur={(e) => updateProfile('sos_keyword', e.target.value)}
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm font-medium"
                                    placeholder="e.g. Help Me"
                                />
                                {/* Start Button */}
                                <button
                                    onClick={startRecording}
                                    disabled={isRecording}
                                    className={cn(
                                        "p-2 rounded-lg transition-all",
                                        isRecording
                                            ? "opacity-30 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
                                            : "bg-primary/10 text-primary hover:bg-primary/20 active:scale-95"
                                    )}
                                    title="Start Recording"
                                >
                                    <span className="material-symbols-outlined">mic</span>
                                </button>

                                {/* Stop Button */}
                                <button
                                    onClick={stopRecording}
                                    disabled={!isRecording}
                                    className={cn(
                                        "p-2 rounded-lg transition-all",
                                        !isRecording
                                            ? "opacity-30 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
                                            : "bg-red-500 text-white shadow-md animate-pulse active:scale-95"
                                    )}
                                    title="Stop & Save"
                                >
                                    <span className="material-symbols-outlined">stop_circle</span>
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1 italic">
                                {isRecording ? "Listening... Click stop to save." : "Click Start to record phrase."}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <label className="text-xs font-bold text-slate-500 uppercase">Helper Mail</label>
                            <input
                                type="email"
                                value={emergencyEmail}
                                onChange={(e) => {
                                    setEmergencyEmail(e.target.value);
                                    localStorage.setItem('emergency_email', e.target.value);
                                }}
                                onBlur={(e) => updateProfile('emergency_email', e.target.value)}
                                className="w-full mt-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm font-medium"
                                placeholder="family@example.com"
                            />
                            <p className="text-[10px] text-slate-400 mt-1">
                                Location will be shared to this email when alarm triggers.
                            </p>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={() => navigate('/sos')}
                                className="w-full py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-bold text-sm transition-colors border border-red-500/20"
                            >
                                Test SOS Alarm
                            </button>
                        </div>
                    </div>
                </section>

                {/* Case Management Section */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Case Management</h2>
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
                        <button
                            onClick={() => navigate('/my-reports')}
                            className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors group"
                        >
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-primary">history</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Track Past Cases</h3>
                                <p className="text-xs text-slate-500">View progress of your filed reports</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>
                        </button>
                    </div>
                </section>

                {/* App Actions Section */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">App Actions</h2>
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
                        <button
                            onClick={() => window.open('https://safe-her-2.vercel.app/', '_blank')}
                            className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors group text-primary font-bold"
                        >
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined">rocket_launch</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm">Take Action</h3>
                                <p className="text-xs text-slate-500 font-medium tracking-normal">Trigger immediate safety protocols</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-lg">open_in_new</span>
                        </button>
                    </div>
                </section>

                {/* Account Actions */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Account</h2>
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors group"
                        >
                            <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
                                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:text-red-500">logout</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Log Out</h3>
                                <p className="text-xs text-slate-500">Sign out of your account</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>
                        </button>
                    </div>
                </section>
            </main>

            {/* Toast Notification */}
            <div className={cn(
                "fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 transition-all duration-300 z-50",
                showToast ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
                toastType === 'listening'
                    ? "bg-primary text-white animate-pulse"
                    : "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
            )}>
                <span className="material-symbols-outlined text-xl">
                    {toastType === 'listening' ? 'mic' : 'check_circle'}
                </span>
                <span className="text-sm font-bold tracking-wide">{toastMessage}</span>
            </div>
        </div>
    );
};

export default Settings;
