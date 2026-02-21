import Link from "next/link";
import { ArrowLeft, Database, LockKeyhole, ScrollText, Shield, UserRoundCheck } from "lucide-react";

const EFFECTIVE_DATE = "February 20, 2026";

const sections = [
    {
        id: "collect",
        title: "Information We Collect",
        body: "We collect account, operational, and security data required to deliver authentication services and developer tooling.",
        points: [
            "Developer account data such as name, email, and workspace metadata.",
            "Authentication event logs for security, fraud prevention, and troubleshooting.",
            "Technical usage data such as IP address, browser metadata, and device signals.",
        ],
    },
    {
        id: "use",
        title: "How We Use Data",
        body: "Collected information is used to operate, secure, and improve AuthX services while maintaining tenant isolation and access controls.",
        points: [
            "Provision and maintain authentication APIs and dashboard features.",
            "Send security notifications, service alerts, and account-critical updates.",
            "Detect abuse, enforce platform limits, and maintain service reliability.",
        ],
    },
    {
        id: "sharing",
        title: "Data Sharing and Processors",
        body: "We use trusted subprocessors to run infrastructure, communications, and monitoring. Data access is scoped to the minimum required for each provider.",
        points: [
            "Service providers are contractually required to protect data.",
            "We do not sell personal data or share end-user data for advertising.",
            "Subprocessor access is limited to operational support functions.",
        ],
    },
    {
        id: "retention",
        title: "Retention and Deletion",
        body: "Data is retained only for legitimate business, legal, and security purposes. Deletion timelines are enforced through platform and operational controls.",
        points: [
            "Account holders can request deletion of account-level personal data.",
            "Security logs may be retained for abuse prevention and compliance needs.",
            "Backups are lifecycle-managed and removed under retention schedules.",
        ],
    },
    {
        id: "rights",
        title: "Your Privacy Rights",
        body: "Depending on region, you may have rights to access, correct, export, or delete your personal data. We support rights requests through support and privacy channels.",
        points: [
            "Right to know what personal data we process.",
            "Right to request correction or deletion where applicable.",
            "Right to object or restrict certain processing activities.",
        ],
    },
    {
        id: "security",
        title: "Security Controls",
        body: "AuthX applies layered safeguards, including encryption, credential hashing, role-based access, and continuous monitoring to protect platform data.",
        points: [
            "Encryption in transit using modern TLS standards.",
            "Strong password hashing and secure credential handling.",
            "Access controls and auditability for sensitive operations.",
        ],
    },
];

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.10),transparent_35%)]" />

            <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-[var(--foreground)]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 text-sm">
                        <Link href="/terms" className="rounded-md border border-[var(--border)] px-3 py-1.5 text-gray-600 transition-colors hover:text-[var(--foreground)]">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                <section className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        <ScrollText className="h-3.5 w-3.5" />
                        Privacy Notice
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Privacy Policy</h1>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                        This policy explains what information AuthX collects, how we use it, and the controls available to developers and end users.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="rounded-full border border-[var(--border)] px-3 py-1">Effective date: {EFFECTIVE_DATE}</span>
                        <span className="rounded-full border border-[var(--border)] px-3 py-1">Applies to dashboard and APIs</span>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1fr_280px]">
                    <article className="space-y-5">
                        {sections.map((section, index) => (
                            <section key={section.id} id={section.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-xl font-semibold">{section.title}</h2>
                                </div>
                                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{section.body}</p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    {section.points.map((point) => (
                                        <li key={point} className="flex items-start gap-2">
                                            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </article>

                    <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
                        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                <Database className="h-4 w-4 text-emerald-500" />
                                Policy Overview
                            </h2>
                            <nav className="space-y-2 text-sm">
                                {sections.map((section, index) => (
                                    <a key={section.id} href={`#${section.id}`} className="block rounded-md px-2 py-1 text-gray-600 transition-colors hover:bg-zinc-100 hover:text-[var(--foreground)] dark:hover:bg-zinc-900">
                                        {index + 1}. {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                <UserRoundCheck className="h-4 w-4 text-emerald-500" />
                                Privacy Requests
                            </h3>
                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">Submit requests or questions:</p>
                            <a href="mailto:privacy@authx.dev" className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                                privacy@authx.dev
                            </a>
                        </div>

                        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                <LockKeyhole className="h-4 w-4 text-emerald-500" />
                                Related Terms
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Use of AuthX is also governed by our{" "}
                                <Link href="/terms" className="font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                                    Terms of Service
                                </Link>
                                .
                            </p>
                        </div>
                    </aside>
                </section>
            </main>

            <footer className="border-t border-[var(--border)] bg-[var(--background)]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-500 md:flex-row">
                    <p>© {new Date().getFullYear()} AuthX Inc. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/terms" className="transition-colors hover:text-[var(--foreground)]">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
