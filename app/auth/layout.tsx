"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck, Lock, Sparkles, UserPlus, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    let heading = "Start building with a robust authentication system.";
    let description = "Manage API keys, generate JWTs, and secure your endpoints with a few clicks. The ultimate developer panel.";
    let Icon = ShieldCheck;
    let highlightText = "Developer Platform";
    let blobColor1 = "bg-blue-500/10";
    let blobColor2 = "bg-orange-500/10";

    if (pathname === "/auth/signup") {
        heading = "Join the next generation of identity management.";
        description = "Create your free account today and start securing your applications with enterprise-grade authentication in minutes.";
        Icon = UserPlus;
        highlightText = "Get Started Free";
        blobColor1 = "bg-purple-500/10";
        blobColor2 = "bg-pink-500/10";
    } else if (pathname === "/auth/login") {
        heading = "Welcome back to your command center.";
        description = "Sign in to manage your applications, monitor authentication logs, and configure security settings for your environments.";
        Icon = Lock;
        highlightText = "Secure Access";
        blobColor1 = "bg-blue-500/10";
        blobColor2 = "bg-cyan-500/10";
    } else if (pathname?.startsWith("/reset-password") || pathname === "/auth/forgot-password") {
        heading = "Recover your account securely.";
        description = "Your credentials are protected by industry-leading encryption. Reset your password safely to regain access to your services.";
        Icon = Lock;
        highlightText = "Enterprise-Grade Security";
        blobColor1 = "bg-indigo-500/10";
        blobColor2 = "bg-blue-500/10";
    } else if (pathname?.startsWith("/verify")) {
        heading = "Verifying your digital identity.";
        description = "Ensure your account is securely linked to your email address to unlock full access across all your services.";
        Icon = Sparkles;
        highlightText = "Secure Verification";
        blobColor1 = "bg-emerald-500/10";
        blobColor2 = "bg-teal-500/10";
    } else if (pathname?.startsWith("/support/developer")) {
        heading = "We're here to help you build.";
        description = "Reach out to our developer support team, read our extensive documentation, or join the community Discord.";
        Icon = FileText;
        highlightText = "Developer Support";
        blobColor1 = "bg-amber-500/10";
        blobColor2 = "bg-orange-500/10";
    }

    return (
        <div className="flex min-h-screen font-sans bg-white dark:bg-black selection:bg-zinc-100 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Split screen layout for desktop */}
            <div className="flex w-full z-10">
                <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[var(--sidebar-bg)] p-12 border-r border-[var(--border)] relative overflow-hidden">
                    {/* Abstract background blobs for the left panel */}
                    <div className={`absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full ${blobColor1} blur-[100px] transition-colors duration-1000`}></div>
                    <div className={`absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full ${blobColor2} blur-[100px] transition-colors duration-1000`}></div>

                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight z-10 text-[var(--foreground)]">
                        <span className="flex h-7 w-7 rounded bg-[var(--primary-btn)] items-center justify-center">
                            <span className="h-2 w-2 bg-[var(--primary-btn-text)] rounded-full"></span>
                        </span>
                        AuthX
                    </div>

                    <div className="z-10 mb-20 max-w-lg">
                        <motion.div
                            key={highlightText}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-gray-500 mb-6 shadow-sm"
                        >
                            <Icon className="h-3.5 w-3.5" />
                            {highlightText}
                        </motion.div>
                        <motion.h2
                            key={heading}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl font-semibold tracking-tight text-[var(--foreground)] mb-6 leading-tight"
                        >
                            {heading}
                        </motion.h2>
                        <motion.p
                            key={description}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-zinc-600 dark:text-zinc-400 text-lg"
                        >
                            {description}
                        </motion.p>
                    </div>

                    <div className="z-10 text-sm text-zinc-500 dark:text-zinc-500">
                        © {new Date().getFullYear()} AuthX Inc.
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative h-screen overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                        className="w-full max-w-md"
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
