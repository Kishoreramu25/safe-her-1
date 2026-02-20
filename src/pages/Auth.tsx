import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Default to 'public' if not accessed from RoleSelection
    const role = (location.state as { role: 'public' | 'official' })?.role || 'public';

    // Auth State
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLoginMode) {
                // LOGIN LOGIC
                const { error: signInError } = await (supabase.auth as any).signInWithPassword({
                    email: formData.email,
                    password: formData.password
                });

                if (signInError) throw signInError;

                // Navigate based on role (check session metadata or just use passed role logic for now, 
                // but real app should check db profile). Assuming success:
                if (role === 'official') {
                    navigate('/dashboard');
                } else {
                    navigate('/report/step1');
                }

            } else {
                // SIGN UP LOGIC
                const { error: signUpError } = await (supabase.auth as any).signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.name,
                            role: role, // KEY: This triggers the SQL trigger to create proper profile
                            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
                        }
                    }
                });

                if (signUpError) throw signUpError;

                alert("Account created! Please check your email/login automatically.");
                if (role === 'official') {
                    navigate('/dashboard');
                } else {
                    navigate('/report/step1');
                }
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col items-center justify-start overflow-x-hidden font-display relative">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-all z-20"
                title="Back to Home"
            >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>

            <main className="w-full max-w-[430px] flex flex-col px-6 pt-12 pb-12">
                {/* Header / Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                        <span className="material-symbols-outlined text-primary text-5xl relative z-10">shield_lock</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                        {isLoginMode ? 'Welcome Back' : 'Secure Access'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-center text-sm leading-relaxed max-w-[280px]">
                        {isLoginMode
                            ? `Log in to your ${role} account.`
                            : `Create your ${role} digital safety account.`
                        }
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                        <span className="material-symbols-outlined text-red-500 text-xl mt-0.5">error</span>
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Form Section */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Full Name Input (Only for Signup) */}
                    {!isLoginMode && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    placeholder="Enter your legal name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required={!isLoginMode}
                                />
                            </div>
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">alternate_email</span>
                            </div>
                            <input
                                type="email"
                                className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="block w-full pl-11 pr-12 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                placeholder="Min. 8 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Primary Action */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span>{isLoginMode ? 'Log In' : 'Create Account'}</span>
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Secondary Actions */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type="button"
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="text-primary font-bold hover:underline ml-1"
                        >
                            {isLoginMode ? "Create Account" : "Log In"}
                        </button>
                    </p>
                    <div className="flex items-center gap-4 w-full py-4">
                        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or Secure with</span>
                        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-xl">face</span>
                            <span className="text-sm font-semibold">FaceID</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-xl">fingerprint</span>
                            <span className="text-sm font-semibold">TouchID</span>
                        </button>
                    </div>
                </div>

                {/* Footer Info */}
                <footer className="mt-auto pt-10 text-center">
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed px-4">
                        By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>. Your data is processed in accordance with national cyber security standards.
                    </p>
                    <div className="mt-6 flex justify-center gap-6 grayscale opacity-50">
                        <span className="material-symbols-outlined text-2xl" title="ISO Certified">verified_user</span>
                        <span className="material-symbols-outlined text-2xl" title="Gov Cloud">cloud_done</span>
                        <span className="material-symbols-outlined text-2xl" title="Secure Network">lan</span>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Auth;
