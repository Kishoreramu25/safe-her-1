import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const AIAssistant: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [aiName, setAiName] = useState<string>('Aegis AI');
    const [isNamingMode, setIsNamingMode] = useState(false);
    const [tempName, setTempName] = useState('');
    const [isLoadingName, setIsLoadingName] = useState(true);

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial Fetch: Get custom AI name from DB
    useEffect(() => {
        const fetchAiName = async () => {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('ai_name')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (data?.ai_name) {
                    setAiName(data.ai_name);
                    setMessages([
                        {
                            id: 1,
                            text: `Hello! I am ${data.ai_name}, your personalized AI Cyber Safety Assistant. How can I help you today?`,
                            sender: 'ai',
                            timestamp: new Date()
                        }
                    ]);
                } else {
                    setIsNamingMode(true);
                }
            } catch (err) {
                console.error('Error fetching AI name:', err);
                setIsNamingMode(true);
            } finally {
                setIsLoadingName(false);
            }
        };

        fetchAiName();
    }, [user]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSaveName = async () => {
        if (!tempName.trim() || !user) return;

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ ai_name: tempName })
                .eq('id', user.id);

            if (error) throw error;

            setAiName(tempName);
            setIsNamingMode(false);
            setMessages([
                {
                    id: 1,
                    text: `Hello! I am ${tempName}, your personalized AI Cyber Safety Assistant. How can I help you stay secure today?`,
                    sender: 'ai',
                    timestamp: new Date()
                }
            ]);
        } catch (err) {
            console.error('Error saving AI name:', err);
            alert("Failed to save AI name. Please try again.");
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        if (!import.meta.env.VITE_GROQ_API_KEY) {
            const warningMsg: Message = {
                id: Date.now(),
                text: "API Key not detected. Please stop your 'npm run dev' and start it again to reload the configuration.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, warningMsg]);
            return;
        }

        const userMsg: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: `You are ${aiName}, a premium AI Virtual Assistant for the 'Safe-Her' cyber security application. Your tone is empathetic, professional, and security-focused. Guide users on cyber harassment, deepfake detection, and using app features like SOS and filing reports. Keep responses concise and practical. If asked about technical settings, refer to the 'Settings' page. For deepfake analysis, refer to the 'Deepfake Detector' in 'Functions'.`
                        },
                        ...messages.map(m => ({
                            role: m.sender === 'user' ? 'user' : 'assistant',
                            content: m.text
                        })),
                        {
                            role: "user",
                            content: inputValue
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Groq API Error:', data);
                throw new Error(data.error?.message || 'API request failed');
            }

            const aiText = data.choices?.[0]?.message?.content || "I'm having trouble understanding. Please rephrase.";

            const aiMsg: Message = {
                id: Date.now() + 1,
                text: aiText,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error: any) {
            console.error('AI Error:', error);
            const errorMsg: Message = {
                id: Date.now() + 1,
                text: `Connection Error: ${error.message || "Unknown error"}. Check your API key and internet connection.`,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    if (isLoadingName) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
                <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Naming Overlay */}
            {isNamingMode && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-4xl">edit_note</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Name Your Assistant</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                            Give your personal cyber safety AI a unique name that resonates with you.
                        </p>
                        <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            placeholder="e.g. Guardian, Aegis, Sentinel..."
                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-4 px-4 text-base font-medium focus:ring-2 focus:ring-primary/20 transition-all mb-6"
                            autoFocus
                        />
                        <button
                            onClick={handleSaveName}
                            disabled={!tempName.trim()}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
                        >
                            Set Assistant Name
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 px-4 h-16">
                    <button onClick={() => navigate(-1)} className="text-primary p-1">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary relative">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <h1 className="text-base font-bold">{aiName}</h1>
                                <span className="material-symbols-outlined text-primary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </div>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active Assistant</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-32"
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex w-full group",
                            msg.sender === 'user' ? "justify-end" : "justify-start"
                        )}
                    >
                        <div className={cn(
                            "max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                            msg.sender === 'user'
                                ? "bg-primary text-white rounded-tr-none"
                                : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-tl-none text-slate-700 dark:text-slate-300"
                        )}>
                            {msg.text}
                            <div className={cn(
                                "text-[10px] mt-2 opacity-50 font-medium",
                                msg.sender === 'user' ? "text-right" : "text-left"
                            )}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
                            <div className="size-1.5 bg-slate-300 dark:bg-slate-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="size-1.5 bg-slate-300 dark:bg-slate-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="size-1.5 bg-slate-100 dark:bg-slate-800 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
            </main>

            {/* Input Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-40">
                <div className="max-w-xl mx-auto flex gap-3 items-center">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={`Ask ${aiName} something...`}
                            className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-4 pr-12 text-sm shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isTyping}
                            className="absolute right-2 top-1.5 p-2 bg-primary text-white rounded-xl shadow-md disabled:opacity-50 disabled:bg-slate-400 transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>
                </div>
                {/* Safe area padding for iPhones */}
                <div className="h-6"></div>
            </div>
        </div>
    );
};

export default AIAssistant;
