"use client";

import Link from "next/link";
import { ArrowRight, Shield, Zap, Key, Layers, Github, CheckCircle2, Terminal, Code2, Globe, Star, Users, Activity, Search } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function LandingPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] font-sans relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-[0.10] blur-[100px]"></div>

      {/* Navbar */}
      <header className="fixed top-0 w-full border-b border-[var(--border)] bg-[var(--background)] z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="flex h-6 w-6 rounded bg-[var(--primary-btn)] items-center justify-center">
              <span className="h-2 w-2 bg-[var(--primary-btn-text)] rounded-full"></span>
            </span>
            AuthX
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard/docs" className="text-sm font-medium text-gray-400 hover:text-[var(--foreground)] transition-colors flex items-center gap-1.5">
              <Terminal className="h-4 w-4" />
              Docs
            </Link>
            <div className="h-4 w-px bg-[var(--border)]"></div>
            <Link href="/auth/login" className="text-sm font-medium text-gray-500 hover:text-[var(--foreground)] transition-colors">
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary h-9 px-4 rounded-md"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex w-full flex-col items-center pt-32 pb-20 z-10">
        <motion.div
          className="mx-auto flex max-w-[800px] flex-col items-center text-center px-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-8 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--input)] px-3 py-1 text-sm font-medium text-[var(--foreground)] shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            Introducing Developer Panel v2.0
          </motion.div>

          <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] mb-6">
            Authentication infrastructure <br className="hidden md:block" /> for modern teams
          </motion.h1>

          <motion.p variants={item} className="max-w-2xl text-lg md:text-xl text-gray-500 mb-10 leading-relaxed">
            A complete identity solution that drops into your app in minutes. Manage users, issue API keys, and protect your applications with enterprise-grade security.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/auth/signup"
              className="btn-primary h-12 px-8 text-base shadow-lg transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Start Building for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#documentation"
              className="btn-secondary h-12 px-8 text-base w-full sm:w-auto"
            >
              <Github className="mr-2 h-4 w-4" />
              View Documentation
            </Link>
          </motion.div>
        </motion.div>

        {/* Technical Stack / Social Proof */}
        <div className="w-full max-w-7xl px-6 mt-20 mb-10">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">
            Natively supported technologies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 transition-all duration-300 hover:opacity-100">
            {['Node.js', 'React', 'Next.js', 'Python', 'Java Spring', 'Express'].map((tech, i) => (
              <span key={i} className="text-lg md:text-xl font-bold tracking-tight text-[var(--foreground)] bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Integration Preview Section */}
        <section className="w-full relative py-32 mt-20 border-y border-[var(--border)] bg-[var(--input)]/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div
                className="flex-1 space-y-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={container}
              >
                <motion.div variants={item}>
                  <div className="inline-flex items-center rounded-full bg-blue-500/10 text-blue-500 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                    Developer Experience
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                    Build faster with <br className="hidden md:block" />
                    <span className="text-blue-500">production-ready SDKs</span>
                  </h2>
                  <p className="text-lg text-gray-500 leading-relaxed">
                    Integrate AuthX into your stack in minutes. We provide native SDKs for all major languages, ensuring your authentication logic is clean, safe, and lightning fast.
                  </p>
                </motion.div>

                <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Native SDKs", desc: "Optimized for Node, Python, and Java." },
                    { title: "Auto Refresh", desc: "JWT rotation handled automatically." },
                    { title: "SSO Support", desc: "Enterprise readiness built-in." },
                    { title: "Type Safe", desc: "Full TypeScript & Javadoc support." }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">{feature.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={item} className="pt-4">
                  <Link href="/dashboard/docs" className="inline-flex items-center text-blue-500 font-semibold hover:gap-2 transition-all">
                    Read the full documentation <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex-1 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[#1e1e1e] shadow-2xl relative">
                  <div className="flex items-center px-4 py-3 bg-[#252526] border-b border-[#2d2d2d] justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Tabs defaultValue="nodejs" className="w-full">
                      <TabsList className="bg-transparent border-b border-[#2d2d2d] rounded-none px-4 w-full justify-start gap-4 h-10">
                        <TabsTrigger value="nodejs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none h-10 text-gray-400">Node.js</TabsTrigger>
                        <TabsTrigger value="python" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none h-10 text-gray-400">Python</TabsTrigger>
                        <TabsTrigger value="java" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none h-10 text-gray-400">Java</TabsTrigger>
                      </TabsList>

                      <TabsContent value="nodejs" className="p-6 text-sm font-mono leading-relaxed overflow-x-auto min-h-[300px]">
                        <pre><code className="text-gray-300">
                          <span className="text-gray-500">// Install: npm install @authx/node</span><br />
                          <span className="text-purple-400">import</span> {"{ "}AuthXClient{" }"} <span className="text-purple-400">from</span> <span className="text-green-300">'@authx/node'</span>;<br /><br />
                          <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-blue-400">AuthXClient</span>({"{"}<br />
                          {"  "}clientId: <span className="text-green-300">'APP_ID'</span>,<br />
                          {"  "}clientSecret: <span className="text-green-300">'SECRET'</span><br />
                          {"}"});<br /><br />
                          <span className="text-purple-400">const</span> user = <span className="text-purple-400">await</span> client.<span className="text-blue-400">login</span>({"{"}<br />
                          {"  "}identifier: <span className="text-green-300">'jane@example.com'</span>,<br />
                          {"  "}password: <span className="text-green-300">'secure-pass'</span><br />
                          {"}"});
                        </code></pre>
                      </TabsContent>

                      <TabsContent value="python" className="p-6 text-sm font-mono leading-relaxed overflow-x-auto min-h-[300px]">
                        <pre><code className="text-gray-300">
                          <span className="text-gray-500"># Install: pip install authx-sdk</span><br />
                          <span className="text-purple-400">from</span> authx_sdk <span className="text-purple-400">import</span> AuthXClient<br /><br />
                          client = <span className="text-blue-400">AuthXClient</span>(<br />
                          {"  "}client_id=<span className="text-green-300">"APP_ID"</span>,<br />
                          {"  "}client_secret=<span className="text-green-300">"SECRET"</span><br />
                          )<br /><br />
                          <span className="text-gray-500"># Universal login (email or username)</span><br />
                          user = client.<span className="text-blue-400">login</span>(<br />
                          {"  "}identifier=<span className="text-green-300">"jane_doe"</span>,<br />
                          {"  "}password=<span className="text-green-300">"secure-pass"</span><br />
                          )
                        </code></pre>
                      </TabsContent>

                      <TabsContent value="java" className="p-6 text-sm font-mono leading-relaxed overflow-x-auto min-h-[300px]">
                        <pre><code className="text-gray-300">
                          <span className="text-purple-400">import</span> com.authx.sdk.AuthXClient;<br /><br />
                          <span className="text-blue-400">AuthXClient</span> client = <span className="text-purple-400">new</span> <span className="text-blue-400">AuthXClient</span>(<br />
                          {"  "}<span className="text-green-300">"APP_ID"</span>, <span className="text-green-300">"SECRET"</span><br />
                          );<br /><br />
                          <span className="text-blue-400">LoginResponse</span> res = client.<span className="text-blue-400">login</span>(<br />
                          {"  "}<span className="text-green-300">"jane@example.com"</span>, <br />
                          {"  "}<span className="text-green-300">"secure-pass"</span><br />
                          );
                        </code></pre>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* How it Works Section */}
        <section className="w-full relative py-40 border-t border-[var(--border)] bg-gradient-to-b from-[var(--background)] to-[var(--input)]/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Go live in three simple steps</h2>
              <p className="text-lg text-gray-500">No complex configurations. No weeks of reading documentation. Just pure developer velocity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0"></div>

              {[
                {
                  step: "01",
                  title: "Create App",
                  description: "Register your application in the developer portal to get your client credentials and keys."
                },
                {
                  step: "02",
                  title: "Install SDK",
                  description: "Drop in the AuthX UI components or use our server-side REST APIs directly."
                },
                {
                  step: "03",
                  title: "Launch",
                  description: "Your users can now securely sign in with Enterprise SSO, OAuth, or Passkeys."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="flex flex-col items-center text-center relative z-10"
                >
                  <div className="w-24 h-24 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center mb-6 shadow-xl relative">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 max-w-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Value Props Grid */}
        <section className="w-full max-w-7xl px-6 py-40">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to scale</h2>
            <p className="text-lg text-gray-500">A robust suite of tools engineered for high performance and strict security standards.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            {[
              {
                icon: <Shield className="h-6 w-6 text-blue-500" />,
                title: "Bank-grade Security",
                description: "Built on industry standards with automatic threat detection and mitigation built right into the core."
              },
              {
                icon: <Zap className="h-6 w-6 text-orange-500" />,
                title: "Edge Optimized",
                description: "Global latency under 50ms. Authentication that never slows down your application's time-to-first-byte."
              },
              {
                icon: <Key className="h-6 w-6 text-green-500" />,
                title: "JWT Management",
                description: "Seamlessly create and configure API keys and JWT expirations via our beautifully crafted dashboard."
              },
              {
                icon: <Terminal className="h-6 w-6 text-purple-500" />,
                title: "Developer First",
                description: "Extensive APIs, webhooks, and modern SDKs designed for developers by developers."
              },
              {
                icon: <Globe className="h-6 w-6 text-indigo-500" />,
                title: "SSO Ready",
                description: "Integrate with Google, GitHub, SAML, and other enterprise identity providers out of the box."
              },
              {
                icon: <Users className="h-6 w-6 text-pink-500" />,
                title: "Role Management",
                description: "Granular RBAC (Role-Based Access Control) to manage permissions and protect your resources."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={item}
                className="flex flex-col p-8 card-panel transition-shadow hover:shadow-md border border-[var(--border)] group"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--input)] border border-[var(--border)] group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-32 mt-20 border-y border-[var(--border)] bg-[var(--input)]/30 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-3xl bg-[var(--background)] border border-[var(--border)] p-10 md:p-16 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
                <Star className="w-64 h-64 text-yellow-500" />
              </div>
              <div className="relative z-10 max-w-3xl">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-4xl font-medium leading-tight mb-8">
                  "AuthX completely transformed how we handle user identity. What used to take our engineering team sprints to build and maintain was done in an afternoon. Truly game-changing DX."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                  <div>
                    <div className="font-bold text-[var(--foreground)]">Sarah Jenkins</div>
                    <div className="text-sm text-gray-500">CTO at TechFlow</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-5xl px-6 py-40 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="flex flex-col items-center"
          >
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold mb-6">
              Ready to secure your application?
            </motion.h2>
            <motion.p variants={item} className="text-xl text-gray-500 mb-10 max-w-2xl">
              Join thousands of developers building fast, secure, and reliable applications with AuthX.
            </motion.p>
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/auth/signup"
                className="btn-primary h-14 px-10 text-lg shadow-xl shadow-blue-500/20 transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Create your free account
              </Link>
              <Link
                href="/contact"
                className="btn-secondary h-14 px-10 text-lg w-full sm:w-auto"
              >
                Talk to Sales
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--border)] py-16 px-6 mt-auto z-10 bg-[var(--background)]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-bold tracking-tight text-[var(--foreground)] mb-4">
              <span className="flex h-5 w-5 rounded bg-[var(--primary-btn)] items-center justify-center">
                <span className="h-1.5 w-1.5 bg-[var(--primary-btn-text)] rounded-full"></span>
              </span>
              AuthX
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Authentication infrastructure for modern teams. Secure, fast, and remarkably easy to integrate.
            </p>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} AuthX Inc.
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/auth/signup" className="hover:text-[var(--foreground)] transition-colors">Sign Up</Link></li>
              <li><Link href="/auth/login" className="hover:text-[var(--foreground)] transition-colors">Log In</Link></li>
              <li><Link href="#documentation" className="hover:text-[var(--foreground)] transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/dashboard/docs" className="hover:text-[var(--foreground)] transition-colors">Documentation</Link></li>
              <li><a href="#" className="hover:text-[var(--foreground)] transition-colors">GitHub Repository</a></li>
              <li><Link href="/dashboard/docs#api-reference" className="hover:text-[var(--foreground)] transition-colors">API Reference</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</Link></li>
              <li><a href="mailto:support@authx.dev" className="hover:text-[var(--foreground)] transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
