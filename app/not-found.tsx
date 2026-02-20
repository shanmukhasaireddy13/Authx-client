"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LayoutDashboard, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="card-panel flex flex-col items-center justify-center text-center p-12 max-w-lg shadow-sm"
            >
                <div className="mb-6 rounded-full bg-[var(--input)] p-4 border border-[var(--border)]">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-btn)]"
                    >
                        <span className="h-4 w-4 bg-[var(--primary-btn-text)] rounded-full"></span>
                    </motion.div>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-2">
                    404
                </h1>
                <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mb-8 max-w-sm">
                    The requested page could not be found or you do not have permission to access it.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link href="/dashboard" className="w-full sm:w-auto">
                        <Button className="btn-primary w-full shadow-sm">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Return to Dashboard
                        </Button>
                    </Link>
                    <Link href="/" className="w-full sm:w-auto">
                        <Button variant="outline" className="btn-secondary w-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go to Homepage
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
