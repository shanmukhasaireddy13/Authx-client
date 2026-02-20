"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center text-center p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-sm"
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10 mb-6">
                    <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                    Something went wrong
                </h2>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm">
                    An unexpected error occurred. We have been notified and are looking into it. Please try again or return to the dashboard.
                </p>

                <div className="flex flex-col sm:flex-row w-full gap-3">
                    <Button
                        onClick={() => reset()}
                        className="flex-1 btn-primary"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                    </Button>
                    <Link href="/dashboard" className="flex-1">
                        <Button variant="outline" className="w-full border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
