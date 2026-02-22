"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { getPublicApiBase } from "@/lib/runtime-config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center lg:text-left mb-4">
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Email Verification</h1>
                <p className="text-sm text-gray-500">
                    We are verifying your account for <strong className="font-medium text-[var(--foreground)]">{appName}</strong>
                </p>
                <p className="text-xs text-gray-500">
                    Having trouble?{" "}
                    <Link href="/support/user" className="underline underline-offset-4 hover:text-[var(--foreground)] transition-colors">
                        View support
                    </Link>
                </p>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm min-h-[300px]">
                {status === "loading" && (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 rounded-full bg-[var(--input)] border border-[var(--border)]">
                            <Loader2 className="w-8 h-8 text-[var(--foreground)] animate-spin" />
                        </div>
                        <h2 className="text-xl font-medium tracking-tight text-[var(--foreground)]">Validating Token...</h2>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="p-4 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h2 className="text-xl font-medium tracking-tight text-[var(--foreground)] mt-2">Verified Successfully</h2>
                        <p className="text-sm text-gray-500 max-w-sm">
                            {message}
                        </p>
                        <h2 className="text-sm text-gray-500">You can close this page now</h2>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="p-4 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                            <XCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-xl font-medium tracking-tight text-[var(--foreground)] mt-2">Verification Failed</h2>
                        <p className="text-sm text-gray-500 max-w-sm">
                            {message}
                        </p>
                        <div className="flex flex-col w-full gap-3 mt-4">
                           <h2 className="text-sm text-gray-500">If you think this is a mistake, please contact the support team.</h2>
                        </div>
                    </div>
                )}
            </div>

            <p className="px-8 text-center text-xs text-gray-500 lg:text-left lg:px-0">
                Secured by{" "}
                <Link href="/" className="font-semibold underline underline-offset-4 hover:text-[var(--foreground)] transition-colors">
                    AuthX Identity
                </Link>
            </p>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col space-y-2 text-center lg:text-left mb-4">
                        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Email Verification</h1>
                        <p className="text-sm text-gray-500">Loading secure environment...</p>
                    </div>
                </div>
            }
        >
            <VerifyContent />
        </Suspense>
    );
}
