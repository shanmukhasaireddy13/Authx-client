"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Shield, ArrowRight } from "lucide-react";
import { getPublicApiBase } from "@/lib/runtime-config";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = getPublicApiBase();

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const appName = searchParams.get("app") || "the service";

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("No verification token provided.");
            return;
        }

        let isMounted = true;

        const verify = async () => {
            try {
                const res = await fetch(`${API_BASE}/auth/verify-email`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                if (!isMounted) return;

                const data = await res.json();

                if (res.ok) {
                    setStatus("success");
                    setMessage(data.message || "Email verified successfully!");
                } else {
                    setStatus("error");
                    setMessage(data.message || "Verification failed.");
                }
            } catch (error) {
                if (!isMounted) return;

                // Network error catch
                if (error instanceof TypeError) {
                    if (typeof window !== "undefined") {
                        router.push("/network-error");
                        return;
                    }
                }
                setStatus("error");
                setMessage("Something went wrong. Please try again.");
            }
        };

        verify();

        return () => {
            isMounted = false;
        };
    }, [token, router]);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* Header / Nav Area */}
            <header className="absolute top-0 inset-x-0 h-20 flex items-center px-6 lg:px-12 z-10 w-full max-w-7xl mx-auto">
                <Link href="/" className="font-bold text-xl flex items-center gap-2 group">
                    <Shield className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        AuthX
                    </span>
                </Link>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-4 w-full relative">
                {/* Background ambient accents */}
                <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-100 mix-blend-multiply dark:mix-blend-lighten" />
                <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent opacity-100" />

                <div className="w-full max-w-2xl px-6 py-12 flex flex-col items-center text-center">
                    <AnimatePresence mode="wait">
                        {status === "loading" && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="flex flex-col items-center space-y-8 w-full"
                            >
                                <div className="relative flex items-center justify-center w-24 h-24">
                                    <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping opacity-70" />
                                    <div className="w-full h-full bg-primary/5 dark:bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-sm">
                                        <Loader2 className="w-10 h-10 text-primary animate-spin" strokeWidth={1.5} />
                                    </div>
                                </div>
                                <div className="space-y-3 px-4">
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                                        Validating Token
                                    </h1>
                                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                                        We're securely verifying your email address with the backend. This should only take a moment.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {status === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center space-y-8 w-full"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-2xl w-24 h-24 mx-auto animate-pulse-glow" />
                                    <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 flex items-center justify-center relative z-10 shadow-sm">
                                        <CheckCircle2 className="w-12 h-12" strokeWidth={2} />
                                    </div>
                                </div>

                                <div className="space-y-4 px-4 pb-4">
                                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:leading-[1.1]">
                                        Email Verified
                                    </h1>
                                    <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                                        Perfect! Your email has been successfully linked and verified for <strong className="text-foreground">{appName}</strong>. Your account is entirely active.
                                    </p>
                                </div>

                                <div className="p-5 w-full bg-secondary/50 border border-border rounded-xl mt-4">
                                    <p className="text-foreground text-sm font-medium">You can now safely close this window and proceed to log in.</p>
                                </div>
                            </motion.div>
                        )}

                        {status === "error" && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center space-y-8 w-full"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-2xl w-24 h-24 mx-auto" />
                                    <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full border border-red-500/20 flex items-center justify-center relative z-10 shadow-sm">
                                        <XCircle className="w-12 h-12" strokeWidth={2} />
                                    </div>
                                </div>

                                <div className="space-y-4 px-4 pb-2">
                                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:leading-[1.1]">
                                        Verification Failed
                                    </h1>
                                    <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                                        {message}
                                    </p>
                                </div>

                                <div className="p-5 w-full bg-amber-50 dark:bg-amber-500/5 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 rounded-2xl flex flex-col items-center gap-3">
                                    <p className="text-sm font-medium leading-relaxed max-w-sm">
                                        The verification link may have expired or was already used. Please request a new verification email from <strong className="font-bold">{appName}</strong>.
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group">
                                        Return to AuthX platform <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex flex-col bg-background text-foreground items-center justify-center p-4">
                    <div className="relative flex items-center justify-center w-20 h-20 mb-8">
                        <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping opacity-70" />
                        <div className="w-full h-full bg-primary/5 dark:bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-sm">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
                        </div>
                    </div>
                    <p className="text-muted-foreground font-medium text-lg animate-pulse">Initializing request...</p>
                </div>
            }
        >
            <VerifyContent />
        </Suspense>
    );
}
