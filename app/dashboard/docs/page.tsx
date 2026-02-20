"use client";

import { motion, Variants } from "framer-motion";
import { BookOpen, Copy, Check, Terminal, Shield, Zap, ArrowRight, Code2, Globe, KeyRound, Server, Monitor, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function CopyBlock({ code, lang = "" }: { code: string; lang?: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="relative group rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
            {lang && (
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                    <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">{lang}</span>
                    <button
                        className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
                        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    >
                        {copied ? <><Check className="h-3 w-3 text-green-400" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                    </button>
                </div>
            )}
            <pre className="p-4 text-[13px] font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{code}</code>
            </pre>
            {!lang && (
                <button
                    className="absolute top-3 right-3 flex items-center gap-1 text-[11px] text-zinc-600 hover:text-zinc-300 transition-all opacity-0 group-hover:opacity-100 bg-zinc-800/80 backdrop-blur-sm px-2 py-1 rounded-md border border-zinc-700/50"
                    onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                >
                    {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                </button>
            )}
        </div>
    );
}

export default function DocsPage() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.06 } },
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
    };

    return (
        <motion.div
            className="flex flex-col gap-10 w-full max-w-4xl pb-16"
            initial="hidden"
            animate="show"
            variants={container}
        >
            {/* Hero Header */}
            <motion.div variants={item} className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--input)] p-8 md:p-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium mb-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        Integration Guide
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-3">
                        Plug & Play Authentication
                    </h1>
                    <p className="text-gray-500 text-base max-w-xl leading-relaxed">
                        AuthX is a <strong className="text-[var(--foreground)]">backend-to-backend</strong> authentication service. Your server talks to our API — we handle password hashing, JWT generation, and email verification. You stay in control of your user data.
                    </p>
                </div>

                {/* Quick nav pills */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                    {[
                        { label: "Backend-to-Backend", icon: Server },
                        { label: "Collect Any Data", icon: Globe },
                        { label: "We Handle Auth", icon: Shield },
                        { label: "You Get JWTs", icon: Zap },
                    ].map((p) => (
                        <span key={p.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-xs font-medium text-[var(--foreground)]">
                            <p.icon className="w-3 h-3 text-gray-500" />
                            {p.label}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Architecture: The Real Flow */}
            <motion.div variants={item} className="card-panel p-6 md:p-8">
                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">How it works</h2>
                <p className="text-sm text-gray-500 mb-6">
                    AuthX is <strong className="text-[var(--foreground)]">not</strong> called from your frontend. Your backend acts as the middleman — collect whatever user data you need, then forward only the auth-relevant fields to AuthX.
                </p>

                {/* Vertical Flow Diagram */}
                <div className="flex flex-col items-center gap-3">
                    {/* Step A: User's Frontend */}
                    <div className="w-full max-w-md p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-500 mb-3">
                            <Monitor className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-semibold text-[var(--foreground)]">Your Frontend</h3>
                        <p className="text-xs text-gray-500 mt-1">User fills out your signup/login form with any fields you want — name, phone, address, avatar, etc.</p>
                    </div>

                    <ArrowDown className="w-5 h-5 text-gray-300 dark:text-zinc-600" />

                    {/* Step B: Developer's Backend */}
                    <div className="w-full max-w-md p-5 rounded-xl border-2 border-blue-500/30 bg-blue-500/5 text-center relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold tracking-wider uppercase">Your Server</div>
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-3 mt-2">
                            <Server className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-semibold text-[var(--foreground)]">Your Backend</h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Saves the extra data (phone, address, etc.) in <strong>your database</strong>.<br />
                            Forwards only <code className="px-1 py-0.5 text-[11px] rounded bg-[var(--input)] border border-[var(--border)]">email</code> + <code className="px-1 py-0.5 text-[11px] rounded bg-[var(--input)] border border-[var(--border)]">password</code> to AuthX.
                        </p>
                    </div>

                    <ArrowDown className="w-5 h-5 text-gray-300 dark:text-zinc-600" />

                    {/* Step C: AuthX API */}
                    <div className="w-full max-w-md p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-3">
                            <Shield className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-semibold text-[var(--foreground)]">AuthX API</h3>
                        <p className="text-xs text-gray-500 mt-1">Hashes passwords, verifies emails, issues JWTs. Returns tokens to your backend, which forwards them to the user.</p>
                    </div>
                </div>

                {/* Key Takeaway */}
                <div className="mt-6 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
                    <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">You own the user data</p>
                        <p className="text-xs text-gray-500 mt-0.5">AuthX only stores email, username, and password hash. You keep everything else (profile, preferences, billing) in your own database.</p>
                    </div>
                </div>
            </motion.div>

            {/* Step 1: Setup */}
            <motion.div variants={item} className="card-panel overflow-hidden">
                <div className="flex items-center gap-4 p-6 md:p-8 border-b border-[var(--border)]">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-bold shrink-0">1</span>
                    <div>
                        <h2 className="text-base font-semibold text-[var(--foreground)]">Get your API credentials</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Create an application from the dashboard to get your keys.</p>
                    </div>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-[var(--input)] border border-[var(--border)]">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Client ID</p>
                            <code className="text-sm font-mono text-[var(--foreground)]">app_a1b2c3d4e5f6g7h8</code>
                            <p className="text-xs text-gray-400 mt-2">Public identifier for your app</p>
                        </div>
                        <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                            <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">Client Secret</p>
                            <code className="text-sm font-mono text-[var(--foreground)]">sk_••••••••••••••••••••</code>
                            <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-2">Keep this on your server — never in frontend code</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">
                        Go to <strong>Applications → Create Application</strong>. The secret is shown only once — store it in your environment variables.
                    </p>
                    <CopyBlock lang="env" code={`# .env (your backend)
AUTHX_CLIENT_ID=app_a1b2c3d4e5f6g7h8
AUTHX_CLIENT_SECRET=sk_your_secret_here`} />
                </div>
            </motion.div>

            {/* Step 2: Signup Flow */}
            <motion.div variants={item} className="card-panel overflow-hidden">
                <div className="flex items-center gap-4 p-6 md:p-8 border-b border-[var(--border)]">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-bold shrink-0">2</span>
                    <div>
                        <h2 className="text-base font-semibold text-[var(--foreground)]">Forward signup & login from your backend</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Your backend collects user data, stores what it needs, and sends auth fields to AuthX.</p>
                    </div>
                </div>
                <div className="p-6 md:p-8">
                    {/* The Flow Explained */}
                    <div className="mb-6 p-4 rounded-lg bg-[var(--input)] border border-[var(--border)] space-y-3">
                        <p className="text-sm font-medium text-[var(--foreground)]">Example: A signup for a food delivery app</p>
                        <div className="flex flex-col gap-2 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center text-[10px] font-bold">1</span>
                                User submits: name, email, password, phone, address, food preferences
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-[10px] font-bold">2</span>
                                Your backend saves phone, address, preferences → <strong>your database</strong>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-bold">3</span>
                                Your backend sends email + password + username → <strong>AuthX API</strong>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-[10px] font-bold">4</span>
                                AuthX hashes the password + sends verification email → returns success
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="signup" className="w-full">
                        <TabsList className="mb-5 p-1 bg-[var(--input)] border border-[var(--border)] rounded-lg inline-flex h-10">
                            <TabsTrigger value="signup" className="rounded-md px-4 py-1.5 text-xs data-[state=active]:bg-[var(--background)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow-sm">
                                Signup
                            </TabsTrigger>
                            <TabsTrigger value="login" className="rounded-md px-4 py-1.5 text-xs data-[state=active]:bg-[var(--background)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow-sm">
                                Login
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="signup" className="space-y-4">
                            <p className="text-xs text-gray-500">Your backend receives the full form, saves your custom fields, then calls AuthX:</p>
                            <CopyBlock lang="your backend → authx" code={`POST ${process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.authx.com/v1"}/auth/signup
Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword123"
}

// AuthX hashes the password, stores the user,
// and sends a verification email automatically.`} />
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                                <Zap className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <p className="text-xs text-emerald-700 dark:text-emerald-400">AuthX automatically sends a verification email to the user. No setup needed on your end.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="login" className="space-y-4">
                            <p className="text-xs text-gray-500">User logs in through your UI → your backend verifies with AuthX → returns the JWT to the user:</p>
                            <CopyBlock lang="your backend → authx" code={`POST ${process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.authx.com/v1"}/auth/login
Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)
Content-Type: application/json

{
  "identifier": "user@example.com",
  "password": "securepassword123"
}`} />
                            <p className="text-xs text-gray-500 font-medium">AuthX responds with a JWT:</p>
                            <CopyBlock lang="response → your backend → your user" code={`{
  "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2...",
  "token_type": "Bearer",
  "expires_in": 3600
}

// Your backend forwards this token to the user.
// The user stores it (localStorage, cookie, etc.)
// and sends it with every request to YOUR backend.`} />
                        </TabsContent>
                    </Tabs>
                </div>
            </motion.div>

            {/* Step 3: Validate Tokens */}
            <motion.div variants={item} className="card-panel overflow-hidden">
                <div className="flex items-center gap-4 p-6 md:p-8 border-b border-[var(--border)]">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-bold shrink-0">3</span>
                    <div>
                        <h2 className="text-base font-semibold text-[var(--foreground)]">Protect your routes with token validation</h2>
                        <p className="text-sm text-gray-500 mt-0.5">When a user makes a request to your API, verify their JWT with AuthX before responding.</p>
                    </div>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                    <div className="mb-4 p-4 rounded-lg bg-[var(--input)] border border-[var(--border)] space-y-2">
                        <p className="text-sm font-medium text-[var(--foreground)]">The validation flow</p>
                        <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center text-[10px] font-bold">1</span>
                                User sends request to <strong>your API</strong> with <code className="px-1 py-0.5 text-[11px] rounded bg-[var(--background)] border border-[var(--border)]">Authorization: Bearer jwt_token</code>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-[10px] font-bold">2</span>
                                Your backend extracts the token and calls AuthX introspect endpoint
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-bold">3</span>
                                AuthX tells you if the token is valid + who the user is
                            </div>
                        </div>
                    </div>

                    <CopyBlock lang="your backend → authx" code={`POST ${process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.authx.com/v1"}/auth/introspect
Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)
Content-Type: application/json

{ "token": "eyJhbGciOiJIUzI1NiJ9..." }`} />
                    <p className="text-xs text-gray-500 font-medium">Response:</p>
                    <CopyBlock lang="json" code={`{
  "active": true,
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "exp": 1708444800
}`} />
                </div>
            </motion.div>

            {/* SDK Integration — Install & Use */}
            <motion.div variants={item} className="card-panel overflow-hidden">
                <div className="flex items-center gap-4 p-6 md:p-8 border-b border-[var(--border)]">
                    <Code2 className="w-5 h-5 text-gray-500 shrink-0" />
                    <div>
                        <h2 className="text-base font-semibold text-[var(--foreground)]">Install the SDK</h2>
                        <p className="text-sm text-gray-500 mt-0.5">One-line install. Handles auth headers, error parsing, and middleware for you.</p>
                    </div>
                </div>
                <div className="p-6 md:p-8">
                    <Tabs defaultValue="node" className="w-full">
                        <TabsList className="mb-5 p-1 bg-[var(--input)] border border-[var(--border)] rounded-lg inline-flex h-10">
                            <TabsTrigger value="node" className="rounded-md px-4 py-1.5 text-xs data-[state=active]:bg-[var(--background)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow-sm">
                                Node.js
                            </TabsTrigger>
                            <TabsTrigger value="python" className="rounded-md px-4 py-1.5 text-xs data-[state=active]:bg-[var(--background)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow-sm">
                                Python
                            </TabsTrigger>
                            <TabsTrigger value="java" className="rounded-md px-4 py-1.5 text-xs data-[state=active]:bg-[var(--background)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow-sm">
                                Java
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="node" className="space-y-4">
                            <CopyBlock lang="install" code={`npm install authx-sdk`} />
                            <CopyBlock lang="javascript — server.js" code={`const { AuthXClient, authMiddleware } = require('authx-sdk');

const authx = new AuthXClient({
  clientId: process.env.AUTHX_CLIENT_ID,
  clientSecret: process.env.AUTHX_CLIENT_SECRET,
});

// ── Signup ──
app.post('/api/signup', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  await db.users.create({ name, phone, address }); // YOUR data → YOUR db
  await authx.signup({ email, username: name, password }); // auth → AuthX
  res.json({ message: 'Account created!' });
});

// ── Login ──
app.post('/api/login', async (req, res) => {
  const result = await authx.login({ identifier: req.body.identifier, password: req.body.password });
  res.json(result); // { access_token, token_type, expires_in }
});

// ── Protect any route (one-liner) ──
const protect = authMiddleware(authx);

app.get('/api/me', protect, (req, res) => {
  res.json({ email: req.user.email, id: req.user.sub });
});`} />
                        </TabsContent>

                        <TabsContent value="python" className="space-y-4">
                            <CopyBlock lang="install" code={`pip install authx-sdk`} />
                            <CopyBlock lang="python — app.py" code={`from authx_sdk import AuthXClient, require_auth
from flask import Flask, request, jsonify, g
import os

app = Flask(__name__)
authx = AuthXClient(
    client_id=os.environ["AUTHX_CLIENT_ID"],
    client_secret=os.environ["AUTHX_CLIENT_SECRET"],
)

# ── Signup ──
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    db.users.create(name=data["name"], phone=data["phone"])  # YOUR data
    authx.signup(email=data["email"], username=data["name"], password=data["password"])
    return jsonify({"message": "Account created!"})

# ── Login ──
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    result = authx.login(identifier=data["identifier"], password=data["password"])
    return jsonify(result)

# ── Protect any route (decorator) ──
@app.route("/api/me")
@require_auth(authx)
def me():
    return jsonify({"email": g.user["email"], "id": g.user["sub"]})`} />
                        </TabsContent>

                        <TabsContent value="java" className="space-y-4">
                            <CopyBlock lang="maven" code={`<dependency>
  <groupId>com.authx</groupId>
  <artifactId>authx-sdk</artifactId>
  <version>1.0.0</version>
</dependency>`} />
                            <CopyBlock lang="java — Application.java" code={`import com.authx.sdk.AuthXClient;
import com.authx.sdk.AuthXFilter;

// Initialize (once, e.g. in @Configuration)
AuthXClient authx = new AuthXClient(
    System.getenv("AUTHX_CLIENT_ID"),
    System.getenv("AUTHX_CLIENT_SECRET")
);

// ── Signup ──
@PostMapping("/api/signup")
public ResponseEntity<?> signup(@RequestBody SignupForm form) {
    userRepo.save(new User(form.getName(), form.getPhone())); // YOUR data
    authx.signup(form.getEmail(), form.getName(), form.getPassword());
    return ResponseEntity.ok(Map.of("message", "Account created!"));
}

// ── Login ──
@PostMapping("/api/login")
public ResponseEntity<?> login(@RequestBody LoginForm form) {
    var result = authx.login(form.getIdentifier(), form.getPassword());
    return ResponseEntity.ok(Map.of("access_token", result.getAccessToken()));
}

// ── Protect routes (filter) ──
@Bean
public FilterRegistrationBean<AuthXFilter> authFilter() {
    var reg = new FilterRegistrationBean<>(new AuthXFilter(authx));
    reg.addUrlPatterns("/api/*");
    return reg;
}

// Access user info in protected routes:
// request.getAttribute("authx.user.email")`} />
                        </TabsContent>
                    </Tabs>
                </div>
            </motion.div>

            {/* API Reference */}
            <motion.div variants={item} className="card-panel overflow-hidden">
                <div className="flex items-center gap-4 p-6 md:p-8 border-b border-[var(--border)]">
                    <Terminal className="w-5 h-5 text-gray-500 shrink-0" />
                    <div>
                        <h2 className="text-base font-semibold text-[var(--foreground)]">API Reference</h2>
                        <p className="text-sm text-gray-500 mt-0.5">All endpoints use Basic Auth with <code className="px-1.5 py-0.5 rounded bg-[var(--input)] text-xs font-mono">client_id:client_secret</code></p>
                    </div>
                </div>
                <div className="divide-y divide-[var(--border)]">
                    {[
                        { method: "POST", path: "/api/v1/auth/signup", desc: "Register a new end-user", auth: "Basic" },
                        { method: "POST", path: "/api/v1/auth/login", desc: "Authenticate user → returns JWT", auth: "Basic" },
                        { method: "POST", path: "/api/v1/auth/verify-email", desc: "Verify user email address", auth: "Public" },
                        { method: "POST", path: "/api/v1/auth/introspect", desc: "Validate a JWT token", auth: "Basic" },
                    ].map((endpoint, i) => (
                        <div key={i} className="flex items-center gap-4 px-6 md:px-8 py-4 hover:bg-[var(--input)] transition-colors">
                            <span className={`shrink-0 inline-flex items-center justify-center w-14 py-1 rounded-md text-[11px] font-bold tracking-wider ${endpoint.method === "POST" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"}`}>
                                {endpoint.method}
                            </span>
                            <code className="text-sm font-mono text-[var(--foreground)] flex-1 min-w-0 truncate">{endpoint.path}</code>
                            <span className="hidden sm:inline text-sm text-gray-500 shrink-0">{endpoint.desc}</span>
                            <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full font-medium ${endpoint.auth === "Public" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400"}`}>
                                {endpoint.auth}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
