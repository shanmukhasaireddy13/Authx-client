import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
            <header className="border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-50">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[var(--foreground)] transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-6 py-20">
                <div className="mb-12">
                    <div className="inline-flex items-center justify-center p-3 rounded-xl bg-blue-500/10 text-blue-500 mb-6">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
                    <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:-mb-2 prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400">
                    <p>
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the AuthX platform operated by AuthX Inc ("us", "we", or "our").
                    </p>
                    <p>
                        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                    </p>

                    <h2>1. Accounts and Authentication</h2>
                    <p>
                        When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>
                    <p>
                        You are responsible for safeguarding the password and API keys that you use to access the Service and for any activities or actions under your credentials. You agree not to disclose your password or API keys to any third party.
                    </p>

                    <h2>2. API Usage and Rate Limiting</h2>
                    <p>
                        We grant you a limited, non-exclusive, non-transferable, revocable license to use the AuthX API solely to develop and operate applications that interoperate with our services.
                    </p>
                    <ul>
                        <li>You agree not to deliberately circumvent our rate limits or abuse our infrastructure.</li>
                        <li>We reserve the right to throttle or suspend API requests that exceed acceptable usage patterns or degrade system performance.</li>
                        <li>You may not use the API for any illegal or unauthorized purpose.</li>
                    </ul>

                    <h2>3. Data Privacy and Security</h2>
                    <p>
                        Our privacy practices are detailed in our <Link href="/privacy" className="text-blue-500 no-underline hover:underline">Privacy Policy</Link>. By using AuthX, you agree that we can collect and use data as described in that policy.
                    </p>
                    <p>
                        While we employ bank-grade security and industry standards to protect your application data and user identities, we cannot guarantee absolute security against advanced persistent threats.
                    </p>

                    <h2>4. Intellectual Property</h2>
                    <p>
                        The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of AuthX Inc and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AuthX.
                    </p>

                    <h2>5. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                    <p>
                        Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or delete your applications via the Developer Dashboard.
                    </p>

                    <h2>6. Limitation of Liability</h2>
                    <p>
                        In no event shall AuthX, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service.
                    </p>

                    <h2>7. Changes to Terms</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at <a href="mailto:legal@authx.dev" className="text-blue-500 no-underline hover:underline">legal@authx.dev</a>.
                    </p>
                </div>
            </main>

            <footer className="w-full border-t border-[var(--border)] py-8 px-6 mt-20 bg-[var(--background)]">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} AuthX Inc. All rights reserved.
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
