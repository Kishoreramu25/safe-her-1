import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Theme, ThemeConfig } from '@/lib/themes';
import { themes } from '@/lib/themes';

interface ThemeContextType {
    activeTheme: Theme;
    setTheme: (theme: Theme) => void;
    themeConfig: ThemeConfig;
    mode: 'light' | 'dark';
    toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeTheme, setActiveTheme] = useState<Theme>('guardian');
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const themeConfig = themes[activeTheme];

    useEffect(() => {
        const root = document.documentElement;

        // Toggle Dark Mode Class
        if (mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Set Colors
        root.style.setProperty('--color-primary', themeConfig.colors.primary);
        root.style.setProperty('--color-secondary', themeConfig.colors.secondary);
        root.style.setProperty('--color-background-light', themeConfig.colors.backgroundLight);
        root.style.setProperty('--color-background-dark', themeConfig.colors.backgroundDark);
        root.style.setProperty('--color-surface-dark', themeConfig.colors.surfaceDark);

        // Set Fonts
        root.style.setProperty('--font-heading', themeConfig.fonts.heading);
        root.style.setProperty('--font-body', themeConfig.fonts.body);

    }, [activeTheme, themeConfig, mode]);

    const toggleMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ activeTheme, setTheme: setActiveTheme, themeConfig, mode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
