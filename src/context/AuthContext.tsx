import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    role: 'public' | 'official' | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<'public' | 'official' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current session
        const fetchSession = async () => {
            const { data: { session } } = await (supabase.auth as any).getSession();
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                // Fetch basic role from metadata if available, or fetch profile
                // For now, rely on metadata
                const userRole = session.user.user_metadata.role as 'public' | 'official';
                setRole(userRole || 'public');
            }
            setLoading(false);
        };

        fetchSession();

        // Listen for changes
        const { data: { subscription } } = (supabase.auth as any).onAuthStateChange((_event: any, session: any) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                const userRole = session.user.user_metadata.role as 'public' | 'official';
                setRole(userRole || 'public');
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await (supabase.auth as any).signOut();
        setRole(null);
        setUser(null);
        setSession(null);
    };

    const value = {
        session,
        user,
        role,
        loading,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
