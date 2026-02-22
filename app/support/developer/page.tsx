"use client";

import Link from "next/link";
import { Code, Mail, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeveloperSupportPage() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center lg:text-left mb-4">
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Developer Support</h1>
                <p className="text-sm text-gray-500">
                    Get help integrating AuthX into your applications.
                </p>
            </div>

            <div className="grid gap-4">
                <Link href="/docs" className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--input)] transition-colors group">
                    <div className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5 text-[var(--foreground)]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-[var(--foreground)]">Documentation</h3>
                        <p className="text-xs text-gray-500 mt-1">Read guides, API references, and SDK integrations.</p>
                    </div>
                </Link>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                        <Mail className="w-5 h-5 text-[var(--foreground)]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-[var(--foreground)]">Email Support</h3>
                        <p className="text-xs text-gray-500 mt-1">Reach out to our technical team at <strong>support@authx.com</strong></p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                        <MessageSquare className="w-5 h-5 text-[var(--foreground)]" />
                    </div>
                    <div className="w-full">
                        <h3 className="text-sm font-medium text-[var(--foreground)]">Community Discord</h3>
                        <p className="text-xs text-gray-500 mt-1 mb-3">Join other developers building with AuthX.</p>
                        <Button variant="outline" size="sm" className="w-full btn-secondary text-xs">
                            Join Discord
                        </Button>
                    </div>
                </div>
            </div>

            <p className="px-8 text-center text-xs text-gray-500 mt-6 lg:text-left lg:px-0">
                Need more help?{" "}
                <Link href="/support/sales" className="underline underline-offset-4 hover:text-[var(--foreground)] transition-colors">
                    Contact Sales
                </Link>
            </p>
        </div>
    );
}
