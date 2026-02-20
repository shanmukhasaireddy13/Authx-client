"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Gamepad2, Settings, User, Moon, Sun, LogOut, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function CustomSidebar() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Applications", href: "/dashboard/applications", icon: Gamepad2 },
        { name: "Docs", href: "/dashboard/docs", icon: BookOpen },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    if (!mounted) {
        return <aside className="w-64 border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] h-screen fixed inset-y-0 left-0 hidden lg:block" />;
    }

    return (
        <aside className="w-64 border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] flex flex-col h-screen fixed inset-y-0 left-0 z-50 transition-colors duration-300">
            <div className="h-16 flex items-center px-6 border-b border-[var(--sidebar-border)]">
                <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-[var(--foreground)]">
                    <div className="flex h-6 w-6 rounded bg-[var(--primary-btn)] items-center justify-center">
                        <span className="h-2 w-2 bg-[var(--primary-btn-text)] rounded-full"></span>
                    </div>
                    AuthX
                </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group",
                                isActive
                                    ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-fg)]"
                                    : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-active-bg)] hover:text-[var(--sidebar-active-fg)]"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={clsx(
                                    "w-4 h-4 transition-colors",
                                    isActive
                                        ? "text-[var(--sidebar-active-fg)]"
                                        : "text-[var(--sidebar-foreground)] group-hover:text-[var(--sidebar-active-fg)]"
                                )} />
                                <span>{item.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[var(--sidebar-border)] space-y-4">
                <button
                    onClick={toggleTheme}
                    className="w-full h-9 flex items-center justify-between px-3 text-sm font-medium text-[var(--sidebar-foreground)] rounded-md hover:bg-[var(--sidebar-active-bg)] hover:text-[var(--sidebar-active-fg)] transition-colors border border-transparent hover:border-[var(--border)]"
                >
                    <span className="flex items-center gap-2">
                        {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                </button>

                <div className="flex items-center gap-3 px-1 py-1">
                    <div className="w-8 h-8 rounded-full bg-[var(--input)] flex items-center justify-center border border-[var(--border)]">
                        {user ? (
                            <span className="text-xs font-bold text-[var(--sidebar-foreground)]">
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <User className="w-4 h-4 text-[var(--sidebar-foreground)]" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--foreground)] truncate">
                            {user?.email || "Loading..."}
                        </p>
                        <p className="text-xs text-gray-500 truncate capitalize">
                            {user?.username || "Developer"}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
