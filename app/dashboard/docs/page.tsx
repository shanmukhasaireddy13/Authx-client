"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  KeyRound,
  Rocket,
  Server,
  Shield,
  Terminal,
} from "lucide-react";
import { getPublicApiBase } from "@/lib/runtime-config";

function CopyBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{title}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="text-[11px] text-zinc-400 transition-colors hover:text-zinc-200"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DocSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-gray-500">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function DocsPage() {
  const apiBase = getPublicApiBase();

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "prerequisites", label: "Prerequisites" },
    { id: "credentials", label: "Credentials" },
    { id: "signup", label: "Signup Flow" },
    { id: "login", label: "Login Flow" },
    { id: "password-reset", label: "Password Reset" },
    { id: "introspect", label: "Token Validation" },
    { id: "errors", label: "Error Handling" },
    { id: "go-live", label: "Go Live Checklist" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-7xl px-6 pb-16 pt-2"
    >
      <header className="relative mb-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--input)] p-8 md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
            <BookOpen className="h-3.5 w-3.5" />
            Developer Documentation
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">AuthX Integration Guide</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500 md:text-base">
            A production-first integration model: your frontend talks to your backend, and your backend talks to AuthX.
            Keep business data in your database and auth state in AuthX.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a href="#credentials" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[var(--input)]">Get Credentials</a>
            <a href="#signup" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[var(--input)]">Start Signup Flow</a>
            <a href="#go-live" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[var(--input)]">Go Live Checklist</a>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">On this page</p>
            <nav className="space-y-1">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="block rounded-md px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-[var(--input)] hover:text-[var(--foreground)] dark:text-gray-300">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <p className="text-sm font-semibold">Need help?</p>
            <p className="mt-2 text-xs leading-6 text-gray-500">Share your backend stack and failing request/response payloads with support.</p>
            <a href="mailto:support@authx.dev" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              support@authx.dev
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </aside>

        <div className="space-y-5">
          <DocSection id="overview" title="Overview" description="AuthX is designed for backend-to-backend authentication. This keeps your architecture explicit and secure.">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { icon: Server, title: "Backend-first", desc: "No client-side secret exposure." },
                { icon: Shield, title: "Secure defaults", desc: "Strong auth primitives and token validation." },
                { icon: KeyRound, title: "Simple API", desc: "Clear endpoint contract for auth lifecycle." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                  <item.icon className="h-4 w-4 text-blue-500" />
                  <p className="mt-2 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection id="prerequisites" title="Prerequisites" description="Before integration, ensure your environment and backend are ready.">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />A backend service (Node, Python, Java, etc.)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />Secure secret storage for environment variables</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />Server-side HTTP client for AuthX endpoint calls</li>
            </ul>
          </DocSection>

          <DocSection id="credentials" title="Credentials" description="Create an application in your AuthX dashboard and store credentials server-side only.">
            <CopyBlock
              title=".env"
              code={`AUTHX_CLIENT_ID=app_xxxxx\nAUTHX_CLIENT_SECRET=sk_xxxxx\nAUTHX_BASE_URL=${apiBase}`}
            />
          </DocSection>

          <DocSection id="signup" title="Signup Flow" description="Your backend receives full form data, stores business fields locally, then calls AuthX with auth fields only.">
            <CopyBlock
              title="POST /auth/signup"
              code={`POST ${apiBase}/auth/signup\nAuthorization: Basic base64(CLIENT_ID:CLIENT_SECRET)\nContent-Type: application/json\n\n{\n  "email": "user@example.com",\n  "username": "jane",\n  "password": "strong-password"\n}`}
            />
          </DocSection>

          <DocSection id="login" title="Login Flow" description="Authenticate identifier + password and return token data to your frontend session layer.">
            <div className="space-y-4">
              <CopyBlock
                title="POST /auth/login"
                code={`POST ${apiBase}/auth/login\nAuthorization: Basic base64(CLIENT_ID:CLIENT_SECRET)\nContent-Type: application/json\n\n{\n  "identifier": "user@example.com",\n  "password": "strong-password"\n}`}
              />
              <CopyBlock
                title="Success response"
                code={`{\n  "access_token": "eyJhbGciOiJIUzI1NiJ9...",\n  "token_type": "Bearer",\n  "expires_in": 3600\n}`}
              />
            </div>
          </DocSection>

          <DocSection id="password-reset" title="Password Reset Flows" description="Allow users to retrieve their accounts safely with OTP or magic links.">
            <div className="space-y-5">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Step 1: Initiate Reset</h3>
                <CopyBlock
                  title="POST /auth/forgot-password"
                  code={`POST ${apiBase}/auth/forgot-password\nAuthorization: Basic base64(CLIENT_ID:CLIENT_SECRET)\nContent-Type: application/json\n\n{\n  "identifier": "user@example.com"\n}`}
                />
              </div>

              <div className="pt-2">
                <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Step 2: Complete via Magic Link</h3>
                <CopyBlock
                  title="POST /auth/reset-password/magic-link"
                  code={`POST ${apiBase}/auth/reset-password/magic-link\nContent-Type: application/json\n\n{\n  "token": "secret-token-from-email",\n  "newPassword": "new-strong-password"\n}`}
                />
              </div>

              <div className="pt-2">
                <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Step 2: Complete via OTP (Alternative)</h3>
                <CopyBlock
                  title="POST /auth/reset-password/otp"
                  code={`POST ${apiBase}/auth/reset-password/otp\nContent-Type: application/json\n\n{\n  "identifier": "user@example.com",\n  "otp": "123456",\n  "newPassword": "new-strong-password"\n}`}
                />
              </div>
            </div>
          </DocSection>

          <DocSection id="introspect" title="Token Validation" description="Protect backend routes by introspecting received Bearer tokens before serving sensitive data.">
            <CopyBlock
              title="POST /auth/introspect"
              code={`POST ${apiBase}/auth/introspect\nAuthorization: Basic base64(CLIENT_ID:CLIENT_SECRET)\nContent-Type: application/json\n\n{ "token": "eyJhbGciOi..." }\n\n{\n  "active": true,\n  "sub": "user-id",\n  "email": "user@example.com",\n  "exp": 1708444800\n}`}
            />
          </DocSection>

          <DocSection id="errors" title="Error Handling" description="Handle API failures consistently to keep auth UX reliable.">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                Recommended practice
              </p>
              <ul className="mt-3 space-y-2 text-sm text-amber-700/90 dark:text-amber-300">
                <li>Return generic login failure messages to clients.</li>
                <li>Log full upstream error details only on the backend.</li>
                <li>Handle token expiry by prompting controlled re-authentication.</li>
              </ul>
            </div>
          </DocSection>

          <DocSection id="go-live" title="Go Live Checklist" description="Final checks before moving traffic to production.">
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {[
                "AuthX credentials are stored only in backend environment variables.",
                "All protected API routes validate Bearer tokens.",
                "Login and signup errors are handled with safe client messages.",
                "Monitoring/alerts are configured for auth endpoint failures.",
                "Terms and privacy links are visible in auth flows.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/auth/signup" className="btn-primary h-10 px-4 text-sm">
                Launch with AuthX
                <Rocket className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="btn-secondary h-10 px-4 text-sm">
                Open Dashboard
              </Link>
            </div>
          </DocSection>
        </div>
      </div>
    </motion.div>
  );
}
