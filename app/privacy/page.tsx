import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicy() {
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
                    <div className="inline-flex items-center justify-center p-3 rounded-xl bg-green-500/10 text-green-500 mb-6">
                        <Shield className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
                    <p className="text-gray-500">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:-mb-2 prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400">
                    <p>
                        AuthX Inc. ("us", "we", or "our") operates the AuthX platform. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                    </p>
                    <p>
                        We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect several different types of information for various purposes to provide and improve our Service to you.
                    </p>

                    <h3>For Developers (You)</h3>
                    <ul>
                        <li><strong>Personal Data:</strong> Email address, first name, last name, and billing information (if applicable).</li>
                        <li><strong>Usage Data:</strong> Information on how the Developer Dashboard is accessed and used, IP addresses, browser types, and diagnostic data.</li>
                    </ul>

                    <h3>For Your Users (End-Users)</h3>
                    <p>
                        As an authentication provider, AuthX acts as a processor for your applications. We securely store:
                    </p>
                    <ul>
                        <li>Email addresses and usernames.</li>
                        <li>Strongly hashed passwords (using industry-standard algorithms).</li>
                        <li>Authentication metadata (login timestamps, IP addresses for security logging).</li>
                    </ul>
                    <p>We do not use end-user data for marketing, profiling, or sharing with third-party networks. It belongs entirely to your application tenant.</p>

                    <h2>2. How We Use Data</h2>
                    <p>
                        AuthX Inc. uses the collected data for various purposes:
                    </p>
                    <ul>
                        <li>To provide and maintain the Service, including the core Authentication API.</li>
                        <li>To notify you about changes to our Service, rotating keys, or service outages.</li>
                        <li>To provide customer care and support.</li>
                        <li>To detect, prevent and address technical issues or anomalous sign-in attempts (fraud prevention).</li>
                    </ul>

                    <h2>3. Data Security and Infrastructure</h2>
                    <p>
                        The security of your data is paramount. AuthX utilizes modern cloud architecture to ensure data separation.
                    </p>
                    <ul>
                        <li>All data is encrypted in transit using TLS 1.3.</li>
                        <li>Secrets and passwords are cryptographically hashed; we cannot decrypt them.</li>
                        <li>We do not store plain-text Developer API Secrets. They are generated once and hashed before storage.</li>
                    </ul>
                    <p>
                        However, no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>

                    <h2>4. Service Providers</h2>
                    <p>
                        We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, or to assist us in analyzing how our Service is used.
                    </p>
                    <p>
                        These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Examples include cloud hosting providers, email delivery services (e.g., Brevo), and error tracking tools.
                    </p>

                    <h2>5. Your Rights (GDPR / CCPA)</h2>
                    <p>
                        Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or restrict its use. You can exercise these rights through your Developer Dashboard or by contacting our Data Protection Officer.
                    </p>

                    <h2>6. Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy or wish to file a data request, please contact us by email at <a href="mailto:privacy@authx.dev" className="text-blue-500 no-underline hover:underline">privacy@authx.dev</a>.
                    </p>
                </div>
            </main>

            <footer className="w-full border-t border-[var(--border)] py-8 px-6 mt-20 bg-[var(--background)]">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} AuthX Inc. All rights reserved.
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
