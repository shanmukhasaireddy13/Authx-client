"use client";

import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen font-sans bg-white dark:bg-black selection:bg-zinc-100 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Split screen layout for desktop */}
            <div className="flex w-full z-10">
                <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[var(--sidebar-bg)] p-12 border-r border-[var(--border)] relative overflow-hidden">
                    {/* Abstract background blobs for the left panel */}
                    <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[100px]"></div>

                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight z-10 text-[var(--foreground)]">
                        <span className="flex h-7 w-7 rounded bg-[var(--primary-btn)] items-center justify-center">
                            <span className="h-2 w-2 bg-[var(--primary-btn-text)] rounded-full"></span>
                        </span>
                        AuthX
                    </div>

                    <div className="z-10 mb-20 max-w-lg">
                        <h2 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] mb-6 leading-tight">
                            Start building with a robust authentication system.
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                            Manage API keys, generate JWTs, and secure your endpoints with a few clicks. The ultimate developer panel.
                        </p>
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
