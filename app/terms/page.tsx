import Link from "next/link";
import { ArrowLeft, BookOpenText, CircleHelp, FileCheck2, Scale, ShieldCheck } from "lucide-react";

const LAST_UPDATED = "February 20, 2026";

const sections = [
    {
        id: "accounts",
        title: "Accounts and Eligibility",
        body: "You are responsible for maintaining accurate account information and securing your credentials. Access to the platform is granted only to users who can form a legally binding agreement.",
        points: [
            "Provide accurate registration data and keep it current.",
            "Protect your password, API credentials, and account access.",
            "You are responsible for actions performed under your account.",
        ],
    },
    {
        id: "acceptable-use",
        title: "Acceptable Use",
        body: "Your use of AuthX must comply with applicable law and fair use standards. We reserve the right to suspend abusive, disruptive, or unauthorized usage.",
        points: [
            "Do not attempt to bypass security controls or rate limits.",
            "Do not use the service for unlawful, fraudulent, or abusive activities.",
            "Do not interfere with platform stability, reliability, or availability.",
        ],
    },
    {
        id: "api-license",
        title: "API License and Restrictions",
        body: "AuthX grants a limited, revocable, non-transferable license to integrate our API for lawful business use. This license does not transfer intellectual property ownership.",
        points: [
            "Use the API only for authorized applications and workloads.",
            "Do not resell, sublicense, or reverse engineer proprietary platform components.",
            "We may enforce quotas and technical safeguards to protect service integrity.",
        ],
    },
    {
        id: "data-security",
        title: "Data and Security",
        body: "We implement technical and organizational measures to protect account and authentication data. You remain responsible for secure use of your own systems and integrations.",
        points: [
            "Security controls are detailed in our Privacy Policy.",
            "No online system can guarantee absolute security at all times.",
            "You must promptly report suspected unauthorized access or incidents.",
        ],
    },
    {
        id: "fees-termination",
        title: "Service Changes and Termination",
        body: "We may modify, suspend, or discontinue features to maintain platform quality and security. We may also suspend accounts that breach these terms or create operational risk.",
        points: [
            "Material updates may be communicated before taking effect.",
            "You may stop using the service at any time.",
            "Upon termination, platform access and related licenses end immediately.",
        ],
    },
    {
        id: "liability",
        title: "Disclaimers and Liability Limits",
        body: "The service is provided on an as-available basis. To the maximum extent permitted by law, AuthX is not liable for indirect, incidental, or consequential damages arising from service use.",
        points: [
            "No guarantee of uninterrupted or error-free service.",
            "You are responsible for maintaining your own backups and contingency plans.",
            "Liability limitations apply to all claims connected to service usage.",
        ],
    },
];

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.10),transparent_35%)]" />

            <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-[var(--foreground)]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 text-sm">
                        <Link href="/privacy" className="rounded-md border border-[var(--border)] px-3 py-1.5 text-gray-600 transition-colors hover:text-[var(--foreground)]">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                <section className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                        <FileCheck2 className="h-3.5 w-3.5" />
                        Legal Agreement
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Terms of Service</h1>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                        These Terms of Service govern access to and use of the AuthX platform. By creating an account or using AuthX services, you agree to these terms.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="rounded-full border border-[var(--border)] px-3 py-1">Last updated: {LAST_UPDATED}</span>
                        <span className="rounded-full border border-[var(--border)] px-3 py-1">Applies to all AuthX users</span>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[260px_1fr]">
                    <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
                        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                <BookOpenText className="h-4 w-4 text-blue-500" />
                                Quick Navigation
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
                                <CircleHelp className="h-4 w-4 text-blue-500" />
                                Contact
                            </h3>
                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">Questions about these terms:</p>
                            <a href="mailto:legal@authx.dev" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                                legal@authx.dev
                            </a>
                        </div>
                    </aside>

                    <article className="space-y-5">
                        {sections.map((section, index) => (
                            <section key={section.id} id={section.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-700 dark:text-blue-300">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-xl font-semibold">{section.title}</h2>
                                </div>
                                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{section.body}</p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    {section.points.map((point) => (
                                        <li key={point} className="flex items-start gap-2">
                                            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                            <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                                <ShieldCheck className="h-5 w-5 text-blue-500" />
                                Related Policies
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Our data handling practices are detailed in the{" "}
                                <Link href="/privacy" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </section>
                    </article>
                </section>
            </main>

            <footer className="border-t border-[var(--border)] bg-[var(--background)]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-500 md:flex-row">
                    <p>© {new Date().getFullYear()} AuthX Inc. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="transition-colors hover:text-[var(--foreground)]">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
