"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, MailCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import {
    apiAdminResetPasswordWithMagicLink,
    ApiError,
} from "@/lib/api";

function buildErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        if (error.details && Object.keys(error.details).length > 0) {
            return Object.values(error.details).join(" ");
        }
        return error.message;
    }
    return error instanceof Error ? error.message : "Unable to reset password.";
}

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const queryToken = searchParams.get("token") ?? "";

    const [magicToken, setMagicToken] = useState(queryToken);
    const [magicNewPassword, setMagicNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!queryToken) return;
        setMagicToken(queryToken);
    }, [queryToken]);

    const resetStatus = () => {
        setError("");
        setSuccess("");
    };

    const handleMagicLinkReset = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        resetStatus();

        try {
            const response = await apiAdminResetPasswordWithMagicLink({
                token: magicToken,
                newPassword: magicNewPassword,
            });
            setSuccess(response.message || "Password reset successful.");
            setMagicNewPassword("");
        } catch (error: unknown) {
            setError(buildErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center lg:text-left mb-2">
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                    Reset Password
                </h1>
                <p className="text-sm text-gray-500">
                    Complete your password reset with your magic-link token.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                    {error}
                </div>
            )}
            {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
                    <div className="flex items-start gap-2">
                        <MailCheck className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{success}</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleMagicLinkReset} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="magic-token">Magic Link Token</Label>
                    <Input
                        id="magic-token"
                        placeholder="Paste token from reset link"
                        className="input-field"
                        required
                        value={magicToken}
                        onChange={(event) => setMagicToken(event.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="magic-password">New Password</Label>
                    <PasswordInput
                        id="magic-password"
                        required
                        minLength={8}
                        className="input-field"
                        value={magicNewPassword}
                        onChange={(event) => setMagicNewPassword(event.target.value)}
                    />
                </div>
                <Button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>
            </form>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-gray-500">
                <div className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-blue-500" />
                    <p>Reset tokens expire quickly. If this fails, request a fresh reset email.</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    Need a new reset link? Request again
                </Link>
                <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--foreground)] transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                </Link>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="text-sm text-gray-500">Loading reset flow...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
