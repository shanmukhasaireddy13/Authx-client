import Link from "next/link";
import React from "react";

export function SiteFooter() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--background)] py-12 w-full mt-auto">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-4">
                <div className="md:col-span-2">
                    <p className="text-sm font-semibold">AuthX</p>
                    <p className="mt-2 max-w-md text-sm text-gray-500">
                        Authentication infrastructure for modern engineering teams. Fast to integrate and stable in production.
                    </p>
                    <Link href="/status" className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-[var(--input)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        All systems operational
                    </Link>
                    <p className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} AuthX Inc.</p>
                </div>

                <div>
                    <p className="text-sm font-semibold">Product</p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-500">
                        <li><Link href="/auth/signup" className="transition-colors hover:text-[var(--foreground)]">Sign Up</Link></li>
                        <li><Link href="/auth/login" className="transition-colors hover:text-[var(--foreground)]">Log In</Link></li>
                        <li><Link href="/docs" className="transition-colors hover:text-[var(--foreground)]">Documentation</Link></li>
                        <li><Link href="/status" className="transition-colors hover:text-[var(--foreground)]">System Status</Link></li>
                    </ul>
                </div>

                <div>
                    <p className="text-sm font-semibold">Legal</p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-500">
                        <li><Link href="/terms" className="transition-colors hover:text-[var(--foreground)]">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="transition-colors hover:text-[var(--foreground)]">Privacy Policy</Link></li>
                        <li><a href="mailto:support@authx.dev" className="transition-colors hover:text-[var(--foreground)]">Contact Support</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
