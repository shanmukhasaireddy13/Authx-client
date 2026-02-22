"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, MailCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiAdminForgotPassword } from "@/lib/api";

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Failed to send reset instructions.";
}

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await apiAdminForgotPassword({ email });
            setMessage(response.message || "If your account exists, reset instructions have been sent.");
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center lg:text-left mb-4">
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                    Forgot password
                </h1>
                <p className="text-sm text-gray-500">
                    Enter your account email. We&apos;ll send both an OTP code and a magic reset link.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
                        <div className="flex items-start gap-2">
                            <MailCheck className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{message}</span>
                        </div>
                    </div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[var(--foreground)]">
                        Account Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        required
                        className="input-field"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <Button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? "Sending..." : "Send Reset Instructions"}
                </Button>
            </form>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-gray-500">
                <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 mt-0.5 shrink-0 text-blue-500" />
                    <p>
                        For security reasons, we always return a generic success response, even if no account exists for
                        this email.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    Already have OTP or magic link? Reset password now
                </Link>
                <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--foreground)] transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                </Link>
            </div>
        </div>
    );
}
