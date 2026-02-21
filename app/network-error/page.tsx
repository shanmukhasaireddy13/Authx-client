"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WifiOff, AlertCircle, RefreshCcw, ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function NetworkErrorPage() {
    const router = useRouter();
    const [retrying, setRetrying] = useState(false);

    // Auto-retry effect simulating an attempt
    const handleRetry = () => {
        setRetrying(true);
        setTimeout(() => {
            // Small visual delay before navigating back to the previous path or home
            router.back();
            // Reset retrying state if push/back is instantaneous but page isn't unmounted immediately
            setTimeout(() => setRetrying(false), 500);
        }, 800);
    };

    useEffect(() => {
        // Optional: could automatically silently ping backend to see if it's back up 
        // and push them back. But manual retry is sufficient and explicit.
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-8">
            {/* Navbar branding to feel like a real page within AuthX */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-zinc-400" />
                <span className="font-semibold text-zinc-400 tracking-tight">AuthX</span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-lg flex flex-col items-center text-center space-y-8"
            >
                <div className="relative">
                    {/* Background pulsating glow */}
                    <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl w-32 h-32 mx-auto animate-pulse-glow" />

                    <div className="bg-red-50 dark:bg-red-500/10 text-red-500 p-6 rounded-3xl border border-red-500/20 relative z-10 shadow-sm">
                        <WifiOff className="w-16 h-16" strokeWidth={1.5} />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Server Unreachable
                    </h1>
                    <p className="text-muted-foreground max-w-sm mx-auto text-base">
                        We're having trouble connecting to the AuthX backend. Please check your network connection or try again later.
                    </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-4 flex items-start text-left gap-3 w-full max-w-sm">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 dark:text-amber-400/90 leading-relaxed">
                        If you are self-hosting, ensure your backend server is running and accessible from this client network.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                    <button
                        onClick={handleRetry}
                        disabled={retrying}
                        className="btn-primary w-full sm:w-auto h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:active:scale-100"
                    >
                        {retrying ? (
                            <RefreshCcw className="w-5 h-5 animate-spin mx-2" />
                        ) : (
                            <>
                                <RefreshCcw className="w-4 h-4 mr-2" />
                                Try Again
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => router.push("/")}
                        disabled={retrying}
                        className="btn-secondary w-full sm:w-auto h-12 px-6 text-base rounded-full border-border bg-transparent hover:bg-secondary/80 transition-all text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
