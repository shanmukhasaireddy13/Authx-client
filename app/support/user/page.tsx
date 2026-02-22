"use client";

import Link from "next/link";
import { HelpCircle } from "lucide-react";

export default function UserSupportPage() {
    return (
        <div className="flex min-h-screen font-sans bg-[var(--background)] selection:bg-zinc-100 flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="z-10 w-full max-w-md flex flex-col items-center space-y-6">
                <div className="flex flex-col space-y-2 text-center items-center mb-4">
                    <div className="p-4 rounded-full bg-[var(--input)] border border-[var(--border)] mb-4">
                        <HelpCircle className="w-8 h-8 text-[var(--foreground)]" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Account Support</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Information regarding your account access.
                    </p>
                </div>

                <div className="flex flex-col p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm w-full text-center space-y-4">
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">
                        AuthX is an identity provider used by the application you are trying to access.
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        If you are experiencing issues logging in, verifying your email, or resetting your password, <strong>please reach out to the support team of the specific application you are using.</strong>
                    </p>
                    <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--border)] mt-4">
                        <p className="text-xs text-gray-500">
                            For security reasons, AuthX cannot directly manage, modify, or recover user accounts on behalf of our customers.
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6 lg:text-left lg:px-0">
                    Secured by{" "}
                    <span className="font-semibold transition-colors">
                        AuthX Identity
                    </span>
                </p>
            </div>
        </div>
    );
}
