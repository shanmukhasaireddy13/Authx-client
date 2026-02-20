"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Shield } from "lucide-react";

const API_BASE = "http://localhost:8080/api/v1";

function VerifyContent() {
    const searchParams = useSearchParams();
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

        const verify = async () => {
            try {
                const res = await fetch(`${API_BASE}/auth/verify-email`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                const data = await res.json();

                if (res.ok) {
                    setStatus("success");
                    setMessage(data.message || "Email verified successfully!");
                } else {
                    setStatus("error");
                    setMessage(data.message || "Verification failed.");
                }
            } catch {
                setStatus("error");
                setMessage("Something went wrong. Please try again.");
            }
        };

        verify();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-8 md:p-10">
                    <div className="flex flex-col items-center text-center space-y-6">

                        {status === "loading" && (
                            <>
                                <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-full">
                                    <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verifying your email...</h1>
                                    <p className="text-gray-500 mt-2 text-sm">Please wait while we verify your account.</p>
                                </div>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-full">
                                    <CheckCircle2 className="w-14 h-14 text-green-500" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Verified!</h1>
                                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                                        Thank you for verifying your email for <strong className="text-gray-900 dark:text-white">{appName}</strong>.
                                        Your account is now active and ready to use.
                                    </p>
                                </div>
                                <div className="w-full p-4 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 mt-2">
                                    <p className="text-sm text-gray-600 dark:text-zinc-400">
                                        You can now close this page and return to <strong className="text-gray-900 dark:text-white">{appName}</strong> to log in.
                                    </p>
                                </div>
                            </>
                        )}

                        {status === "error" && (
                            <>
                                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full">
                                    <XCircle className="w-14 h-14 text-red-500" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Failed</h1>
                                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">{message}</p>
                                </div>
                                <div className="w-full p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 mt-2">
                                    <p className="text-sm text-amber-700 dark:text-amber-400">
                                        The verification link may have expired or already been used. Please try signing up again on <strong>{appName}</strong>.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Powered by AuthX footer */}
                <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 dark:text-zinc-600">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Powered by AuthX</span>
                </div>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-10 flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
                        <p className="text-gray-500 text-sm">Loading...</p>
                    </div>
                </div>
            }
        >
            <VerifyContent />
        </Suspense>
    );
}
