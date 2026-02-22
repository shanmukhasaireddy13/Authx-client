"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { KeyRound, Link as LinkIcon, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import {
    apiResetPasswordWithMagicLink,
    apiResetPasswordWithOtp,
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

function EndUserResetPasswordContent() {
    const searchParams = useSearchParams();
    const queryToken = searchParams.get("token") ?? "";

    const [mode, setMode] = useState<"magic" | "otp">(queryToken ? "magic" : "otp");
    const [magicToken, setMagicToken] = useState(queryToken);
    const [magicNewPassword, setMagicNewPassword] = useState("");

    const [otpIdentifier, setOtpIdentifier] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [otpNewPassword, setOtpNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (queryToken) setMagicToken(queryToken);
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
            const response = await apiResetPasswordWithMagicLink({
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

    const handleOtpReset = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        resetStatus();

        try {
            const response = await apiResetPasswordWithOtp({
                identifier: otpIdentifier,
                otp: otpCode,
                newPassword: otpNewPassword,
            });
            setSuccess(response.message || "Password reset successful.");
            setOtpCode("");
            setOtpNewPassword("");
        } catch (error: unknown) {
            setError(buildErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center lg:text-left mb-4">
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Complete Reset</h1>
                <p className="text-sm text-gray-500">
                    Choose how to reset your password and secure your account.
                </p>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-1 mb-2">
                <div className="grid grid-cols-2 gap-1">
                    <Button
                        type="button"
                        variant={mode === "magic" ? "default" : "ghost"}
                        className={mode === "magic" ? "btn-primary shadow-sm" : "hover:bg-[var(--input)] text-gray-500"}
                        onClick={() => {
                            setMode("magic");
                            resetStatus();
                        }}
                    >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Magic Link
                    </Button>
                    <Button
                        type="button"
                        variant={mode === "otp" ? "default" : "ghost"}
                        className={mode === "otp" ? "btn-primary shadow-sm" : "hover:bg-[var(--input)] text-gray-500"}
                        onClick={() => {
                            setMode("otp");
                            resetStatus();
                        }}
                    >
                        <KeyRound className="h-4 w-4 mr-2" />
                        OTP Code
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300 flex items-start gap-2">
                    <MailCheck className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{success}</span>
                </div>
            )}

            {mode === "magic" ? (
                <form onSubmit={handleMagicLinkReset} className="grid gap-5 mt-2">
                    <div className="grid gap-2">
                        <Label htmlFor="magic-token" className="text-[var(--foreground)]">Magic Link Token</Label>
                        <Input
                            id="magic-token"
                            placeholder="Paste token from link"
                            className="input-field font-mono"
                            required
                            value={magicToken}
                            onChange={(event) => setMagicToken(event.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="magic-password" className="text-[var(--foreground)]">New Password</Label>
                        <PasswordInput
                            id="magic-password"
                            required
                            minLength={8}
                            className="input-field"
                            value={magicNewPassword}
                            onChange={(event) => setMagicNewPassword(event.target.value)}
                        />
                        <p className="text-xs text-gray-500">Use at least 8 characters.</p>
                    </div>
                    <Button type="submit" disabled={loading} className="btn-primary w-full shadow-sm transition-transform active:scale-[0.98]">
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleOtpReset} className="grid gap-5 mt-2">
                    <div className="grid gap-2">
                        <Label htmlFor="otp-email" className="text-[var(--foreground)]">Email Address</Label>
                        <Input
                            id="otp-email"
                            type="email"
                            autoComplete="email"
                            required
                            className="input-field"
                            value={otpIdentifier}
                            onChange={(event) => setOtpIdentifier(event.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="otp-code" className="text-[var(--foreground)]">OTP Code</Label>
                        <Input
                            id="otp-code"
                            placeholder="Enter your OTP"
                            required
                            className="input-field tracking-widest text-center text-lg uppercase"
                            value={otpCode}
                            onChange={(event) => setOtpCode(event.target.value.trim())}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="otp-password" className="text-[var(--foreground)]">New Password</Label>
                        <PasswordInput
                            id="otp-password"
                            required
                            minLength={8}
                            className="input-field"
                            value={otpNewPassword}
                            onChange={(event) => setOtpNewPassword(event.target.value)}
                        />
                        <p className="text-xs text-gray-500">Use at least 8 characters.</p>
                    </div>
                    <Button type="submit" disabled={loading} className="btn-primary w-full shadow-sm transition-transform active:scale-[0.98]">
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            )}

            <p className="px-8 text-center text-xs text-gray-500 mt-6 lg:text-left lg:px-0">
                Secured by{" "}
                <Link href="/" className="font-semibold underline underline-offset-4 hover:text-[var(--foreground)] transition-colors">
                    AuthX Identity
                </Link>
            </p>
        </div>
    );
}

export default function EndUserResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2 text-center lg:text-left mb-4">
                    <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Complete Reset</h1>
                    <p className="text-sm text-gray-500">Loading secure environment...</p>
                </div>
            </div>
        }>
            <EndUserResetPasswordContent />
        </Suspense>
    );
}
