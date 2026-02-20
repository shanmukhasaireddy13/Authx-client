"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiGetMe, removeToken, setToken, isLoggedIn, AdminMeResponse } from "@/lib/api";

interface AuthContextType {
    user: AdminMeResponse | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminMeResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const fetchUser = useCallback(async () => {
        if (!isLoggedIn()) {
            setUser(null);
            setLoading(false);
            return;
        }
        try {
            const me = await apiGetMe();
            setUser(me);
        } catch {
            removeToken();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // Redirect logic: if on dashboard without auth, go to login
    useEffect(() => {
        if (loading) return;
        const isDashboard = pathname.startsWith("/dashboard");
        if (isDashboard && !user) {
            router.replace("/auth/login");
        }
    }, [loading, user, pathname, router]);

    const login = async (token: string) => {
        setToken(token);
        await fetchUser();
        router.push("/dashboard");
    };

    const logout = () => {
        removeToken();
        setUser(null);
        router.push("/auth/login");
    };

    const refreshUser = async () => {
        await fetchUser();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
