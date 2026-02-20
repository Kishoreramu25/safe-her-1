import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SOSButton from '@/components/SOSButton';

const SideNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', label: 'Home', icon: 'home' },
        { path: '/my-reports', label: 'My Reports', icon: 'history' },
        { path: '/functions', label: 'Functions', icon: 'grid_view' },
        { path: '/settings', label: 'Settings', icon: 'settings' },
    ];

    return (
        <>
            {/* Backdrop for closing menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Navigation Menu (Dropdown/Up from button) */}
            <div className={cn(
                "fixed bottom-24 right-6 z-50 flex flex-col gap-3 transition-all duration-300 origin-bottom-right",
                isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none"
            )}>
                {/* Menu Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-2xl min-w-[180px] flex flex-col gap-1">

                    {/* Standard Items */}
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                                isActive(item.path)
                                    ? "bg-primary/10 text-primary font-bold"
                                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                            )}
                        >
                            <span className="material-symbols-outlined" style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                {item.icon}
                            </span>
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}

                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>

                    {/* Delete Action */}
                    <button
                        onClick={() => {
                            alert("Delete Post Triggered");
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 font-medium transition-all text-left"
                    >
                        <span className="material-symbols-outlined">delete</span>
                        <span className="text-sm">Delete content</span>
                    </button>

                    {/* SOS Section */}
                    <div className="p-2 flex justify-center border-t border-slate-100 dark:border-slate-800 mt-1">
                        <SOSButton />
                    </div>
                </div>
            </div>

            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 size-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 active:scale-90",
                    isOpen
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 rotate-90"
                        : "bg-primary text-white hover:bg-primary/90"
                )}
            >
                <span className="material-symbols-outlined text-[28px]">
                    {isOpen ? 'close' : 'menu'}
                </span>
            </button>
        </>
    );
};

export default SideNav;
