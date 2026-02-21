"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublicApiBase } from "@/lib/runtime-config";

const API_BASE = getPublicApiBase();

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

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
                const res = await fetch(`${API_BASE}/admin/verify-email`, {
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
        <div className="flex flex-col items-center text-center space-y-6">
            {status === "loading" && (
                <>
                    <div className="bg-[var(--input)] p-6 rounded-full">
                        <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Verifying your email...</h1>
                        <p className="text-gray-500 mt-2">Please wait while we verify your account.</p>
                    </div>
                </>
            )}

            {status === "success" && (
                <>
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-full">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Email Verified!</h1>
                        <p className="text-gray-500 mt-2">{message}</p>
                    </div>
                    <Link href="/auth/login">
                        <Button className="btn-primary mt-4">
                            Continue to Login
                        </Button>
                    </Link>
                </>
            )}

            {status === "error" && (
                <>
                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full">
                        <XCircle className="w-12 h-12 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Verification Failed</h1>
                        <p className="text-gray-500 mt-2">{message}</p>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <Link href="/auth/signup">
                            <Button variant="outline" className="btn-secondary">
                                Sign Up Again
                            </Button>
                        </Link>
                        <Link href="/auth/login">
                            <Button className="btn-primary">
                                Go to Login
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="bg-[var(--input)] p-6 rounded-full">
                    <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
                </div>
                <p className="text-gray-500">Loading...</p>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
