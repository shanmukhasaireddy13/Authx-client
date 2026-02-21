"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  Radar,
  Server,
  Shield,
  Sparkles,
  Star,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function StorySection({
  eyebrow,
  title,
  description,
  bullets,
  code,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  code: string;
  reverse?: boolean;
}) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 35%"],
  });

  // Apple-like scrubbed values tied directly to scroll position
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.5, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const sectionFilter = useTransform(scrollYProgress, [0, 1], ["blur(12px)", "blur(0px)"]);

  const contentX = useTransform(scrollYProgress, [0, 1], [reverse ? 60 : -60, 0]);
  const panelX = useTransform(scrollYProgress, [0, 1], [reverse ? -60 : 60, 0]);

  // 3D rotation for the code block
  const rotateY = useTransform(scrollYProgress, [0, 1], [reverse ? -35 : 35, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: sectionOpacity, scale: sectionScale, filter: sectionFilter }}
      className="border-y border-[var(--border)] bg-[var(--card)]/35 py-24 overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div style={{ x: contentX }} className={reverse ? "lg:order-2" : ""}>
          <p className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {eyebrow}
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
            {description}
          </p>
          <div className="mt-8 space-y-4">
            {bullets.map((b, i) => {
              // Subtle stagger tied EXACTLY to scroll progress
              const bulletOpacity = useTransform(
                scrollYProgress,
                [0.4 + i * 0.1, 0.7 + i * 0.1],
                [0, 1]
              );
              const bulletX = useTransform(
                scrollYProgress,
                [0.4 + i * 0.1, 0.7 + i * 0.1],
                [-15, 0]
              );

              return (
                <motion.div key={b} style={{ opacity: bulletOpacity, x: bulletX }} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{b}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          style={{ x: panelX, rotateY, rotateX, perspective: 1200 }}
          className={reverse ? "lg:order-1" : ""}
        >
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl before:absolute before:inset-0 before:-z-10 before:-translate-x-4 before:translate-y-4 before:rounded-2xl before:bg-blue-500/10 before:blur-xl transition-all">
            <div className="mb-3 flex items-center gap-2 px-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs leading-6 text-zinc-300">
              <code>{code}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [activeHero, setActiveHero] = useState(0);
  const heroSlides = [
    {
      id: "auth-pipeline",
      title: "Authentication Pipeline",
      subtitle: "Frontend -> Backend -> AuthX",
      stat: "Median auth request under 50ms",
      points: [
        "Server-side credential handling",
        "Deterministic login and token issuance",
        "Clear data boundaries for compliance",
      ],
      code: `POST /auth/login
Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)
Content-Type: application/json

{
  "identifier": "jane@example.com",
  "password": "Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢"
}`,
    },
    {
      id: "token-security",
      title: "Token Security Controls",
      subtitle: "Issue, introspect, enforce",
      stat: "99.9% reliability target",
      points: [
        "Short-lived access tokens",
        "Protected endpoint introspection",
        "Consistent backend authorization checks",
      ],
      code: `POST /auth/introspect
Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)
Content-Type: application/json

{ "token": "eyJhbGciOi..." }`,
    },
    {
      id: "ops-readiness",
      title: "Operational Readiness",
      subtitle: "Built for production teams",
      stat: "24/7 monitoring and support model",
      points: [
        "Safe failure handling patterns",
        "Audit-friendly access boundaries",
        "Backend-first onboarding model",
      ],
      code: `AUTHX_CLIENT_ID=app_xxxx
AUTHX_CLIENT_SECRET=sk_xxxx
AUTHX_BASE_URL=https://api.authx.dev

# Keep secrets on backend only`,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 5200);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start 10%", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  // Stratical (parallax) effects for hero inner elements
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const statsLeftY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const statsRightY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const networkScaleOffset = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[130px]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--primary-btn)]">
              <span className="h-2 w-2 rounded-full bg-[var(--primary-btn-text)]" />
            </span>
            AuthX
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-[var(--foreground)]">
              <Terminal className="h-4 w-4" />
              Docs
            </Link>
            <Link href="/auth/login" className="text-gray-500 transition-colors hover:text-[var(--foreground)]">
              Log in
            </Link>
            <Link href="/auth/signup" className="btn-primary h-9 px-4">
              Start Free
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center pt-16 px-4 pb-20 overflow-x-hidden">
        <motion.section
          ref={heroRef as React.RefObject<HTMLElement>}
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="w-full flex-grow flex flex-col items-center"
        >
          <motion.div style={{ y: textY }} className="text-center max-w-3xl mx-auto mb-16 relative z-20 py-20 px-4 mt-10 md:mt-24">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
              Secure Backend-to-Backend<br />Authentication
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
              AuthX provides a plug-and-play API for your backend to verify logins instantly, making development faster and more secure without the complexity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium text-base shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5">
                Get started
              </Link>
              <Link href="/docs" className="bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-8 py-3.5 rounded-full font-medium text-base hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all shadow-sm">
                View documentation
              </Link>
            </div>
          </motion.div>

          {/* Floating Stat - Left */}
          <motion.div style={{ y: statsLeftY }} className="absolute left-4 lg:left-12 xl:left-32 top-1/4 mt-16 hidden lg:flex flex-col gap-4 animate-float z-20">
            <div className="bg-white dark:bg-zinc-900 px-5 py-4 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-800 w-64">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-slate-800 dark:text-white">8</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] leading-[8px] text-slate-400 font-bold">*</span>
                    <span className="text-[10px] leading-[8px] text-slate-400 font-bold">%</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-500 mr-auto ml-3">Without AuthX</span>
                <div className="h-5 w-9 bg-slate-200 dark:bg-slate-700 rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full shadow-sm transition-all"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-blue-600">75</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] leading-[8px] text-blue-400 font-bold">*</span>
                    <span className="text-[10px] leading-[8px] text-blue-400 font-bold">%</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-500 mr-auto ml-3">With AuthX</span>
                <div className="h-5 w-9 bg-green-500 rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full shadow-sm transition-all"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Stat - Right */}
          <motion.div style={{ y: statsRightY }} className="absolute right-4 lg:right-12 xl:right-32 top-1/4 mt-10 hidden lg:flex flex-col gap-4 animate-float-delayed z-20">
            <div className="bg-white dark:bg-zinc-900 px-4 py-5 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-800 w-56 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent opacity-100"></div>
              <div className="flex items-center gap-1.5 mb-6 justify-center">
                <Shield className="text-green-500 w-3.5 h-3.5" />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Secured Proxy Protection</span>
              </div>
              <div className="flex justify-center py-2 relative">
                <div className="absolute inset-0 grid grid-cols-7 grid-rows-5 gap-1.5 opacity-20 mx-auto w-32">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="bg-green-500 rounded-full w-0.5 h-0.5 mx-auto"></div>
                  ))}
                </div>
                <div className="w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center relative mt-1 z-10">
                  <div className="absolute inset-0 border border-green-200 dark:border-green-800 rounded-full animate-ping opacity-20"></div>
                  <div className="w-9 h-9 bg-[#10b981] rounded-full flex items-center justify-center shadow-lg shadow-green-500/40">
                    <CheckCircle2 className="text-white w-4 h-4 fill-white text-[#10b981]" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Background Connecting Lines */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none">
              {/* Left Line */}
              <path className="dark:stroke-slate-800" d="M0,500 H200 Q250,500 250,450 V200 Q250,150 300,150 H450" stroke="#CBD5E1" strokeDasharray="4 4" strokeWidth="1"></path>
              <circle cx="250" cy="150" r="3" fill="#94A3B8" />
              <path d="M250,150 L245,160 L255,160 Z" fill="#94A3B8" />

              {/* Right Line */}
              <path className="dark:stroke-slate-800" d="M1200,450 H1000 Q950,450 950,500 V650 Q950,700 900,700 H800" stroke="#CBD5E1" strokeDasharray="4 4" strokeWidth="1"></path>
              <circle cx="950" cy="700" r="3" fill="#94A3B8" />
              <path d="M950,700 L945,690 L955,690 Z" fill="#94A3B8" />

              {/* Center Line */}
              <path className="dark:stroke-slate-800" d="M600,0 V100" stroke="#CBD5E1" strokeWidth="1"></path>
              <path className="dark:stroke-slate-800" d="M600,800 V900" stroke="#CBD5E1" strokeWidth="1"></path>
            </svg>
          </div>

          {/* Network Diagram */}
          <motion.div style={{ scale: networkScaleOffset }} className="w-full max-w-7xl mx-auto mt-20 relative z-20">

            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 pt-10 pb-20">
              {/* Customers Node */}
              <div className="relative group">
                <div className="absolute -top-10 left-0 text-sm font-semibold text-slate-800 dark:text-slate-200">Your Customers</div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 w-80 h-80 flex flex-col justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden"></div>
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                      <Image alt="User" fill className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyFVlU_wt7-mCiPtLJ95gPkmm6Vu6y2bi-PlPSbUz63hQ-WA3mlEycLI_AgPS9lYdDMBmMDpNThTV1UHOH6zpneUpEkEUuOmXqVCyfl55adQcBTmbd_IknF_WXqs6tEOUjyp3iVz7DPJELG2B5S_Me5qmJdKHI02UHpSGIYStnHD6k4G7aB7qus_4_fpmSDaAuP4nbB9GQA1tE-qBOccoZTnUPDzA6mvw-Eh1U11QP6YafMw7hg8PAMuZOfihD1A2yAN8AJcZSHeU3" />
                    </div>
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden relative"></div>
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                      <Image alt="User" fill className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw5rdWS7f8GrzpaLvXV1IeeEk7qj_S0ejdwpqtPCTIyEWBbiQERPZOaLaNSD1uPNqteUCEksjldoVGnJ4qThuOFPs6540SyBFBJvh3cfY4-_BRX4ICaIvJygVmm1SOkwMhrxHKMkQ0FcAZjWmgNisU1joYEfuWn58jFtBC94KzEjZSViwWNK5Sza0XS_5M05uebP08aZhh6kFNG77iW07Kkm-f_GE_-CU014jUqbYXBIkCYr4dkldE_pa-fHuE_Q2Em4WVLlcyn6JB" />
                    </div>
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden relative"></div>
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                      <Image alt="User" fill className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVqNPkoFDQKR159PJ0E0ZjSOF-bOny1FjZPKj8AT4r9Lj9LYrRU2V1HZTHa5Rv-7Sn7_LTvkgz-lhPAyFsdQDNTgxSWBwq0vMV-FzAHzEuWAmgqPuw2vjxZU4TgWUTUw8LEjvI57sXYRFC6TAHeql_QgXoAxztdVF8ns6tfDxgHgGg5ve51O_c6PzRTWsv1HGOPZfGme1vqFRY5Lsw7MyR4ch9acGQ9SuxcosaS_werVNKezJM8Ih8J0t0uB4efkUKzOgidIi2VdnC" />
                    </div>
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden relative"></div>
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                      <Image alt="User" fill className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4-wfXAB5kY-tqu5_WS-WwZg1oosP3b6LwOdt1tyQS9pu47s1Bfyv8C4he7kvVxBVdvDOfY8CTQA3glbZdzlyzlfU5FZ3zBGyUrB99jw4Hk2qrVuKH0MU2-NuU2nvEurEpkVlCwfY9rDCgmIIR0LPPAqyzk85dYh4N4qijr-I70m0BXPEk8eUx94V--ccLQHMpNwi0usqODfenhXoUDGzQv-E0visqLDIbg_MMV6ggB3VO1ksKGfJg-K-49tJPCVSl5Us8zC8Df5LW" />
                    </div>
                    <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden"></div>
                  </div>
                </div>
              </div>

              {/* Center Connectors & AuthX Node */}
              <div className="relative z-10 flex flex-col items-center justify-center py-10 w-full max-w-sm mx-auto">
                <div className="flex items-center gap-4 relative w-full justify-center">

                  {/* Left Connector Line */}
                  <div className="absolute left-0 right-1/2 h-[1px] bg-slate-200 dark:bg-slate-700 top-1/2 -z-10"></div>
                  {/* Right Connector Line */}
                  <div className="absolute right-0 left-1/2 h-[1px] bg-slate-200 dark:bg-slate-700 top-1/2 -z-10"></div>

                  <div className="flex flex-col gap-3 relative -left-8">
                    <div className="w-8 h-8 bg-white dark:bg-zinc-800 rounded-full shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-800">
                      <div className="w-4 h-4 rounded-full border-[3px] border-red-500 border-t-transparent rotation-animation"></div>
                    </div>
                    <div className="w-8 h-8 bg-white dark:bg-zinc-800 rounded-full shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-800 -ml-4">
                      <BookOpen className="text-teal-600 w-3.5 h-3.5 transform -rotate-12" />
                    </div>
                    <div className="w-8 h-8 bg-white dark:bg-zinc-800 rounded-full shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-800">
                      <div className="grid grid-cols-2 gap-[1px]">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Center Node AuthX */}
                  <div className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 rounded-full px-6 py-2.5 flex items-center gap-2 relative z-20 cursor-pointer">
                    <Shield className="text-white w-4 h-4" />
                    <span className="text-white font-medium text-sm">AuthX</span>
                  </div>

                  <div className="flex items-center gap-1 relative -right-8">
                    <div className="w-6 h-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center border border-yellow-100 dark:border-yellow-800/50">
                      <Zap className="text-yellow-500 w-3 h-3 fill-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend Team Node */}
              <div className="relative group">
                <div className="absolute -top-12 right-0 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 shadow-sm flex items-center gap-2">
                  <Star className="text-orange-400 w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Backend Team</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 w-96 h-80 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center border border-orange-100 dark:border-orange-800 shadow-sm relative">
                      <div className="absolute -top-2 -right-2 bg-white dark:bg-zinc-800 rounded-full p-1 shadow-sm">
                        <Star className="text-orange-400 w-3 h-3" />
                      </div>
                      <Terminal className="text-orange-400 w-10 h-10" />
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="absolute top-8 left-8 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800 shadow-md overflow-hidden relative">
                      <Image alt="Dev" fill className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSdOs86sohyorXtpKr7PhQoJmLnPAq5RwP72CsAiLjfhSueZsrwLOlgImHNzdm9eVrU3g5OPw8UncbQOp4EEKxiRBH7XMo4eEdQUnYkZZAJZbVJEpNejwYLRMlcLatI9hyh9Yecpv6FzXFC-oLK9zsDFARGYaigZwx2-52vidgiM4HjAVCrOScumLLe6Aj1jKJGexE5eyZ82Ij7HlUf1O77C2kUVKUzBINcFghBliYfsRqF0GMhfs13B-U2iIrEBP7iz1kJfSkOQmL" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Dev 1</span>
                  </div>

                  <div className="absolute top-12 right-10 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800 shadow-md overflow-hidden relative">
                      <Image alt="Dev" fill className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvKKHG_hEd0eaz_64Q24FzHb0cmI3MQ1i7XD3CrwZS9KJfZrZ-t8JNjeur2Hu9J2yxcG8GmqJa8b9gikLH4Qe1vPIaTlakbXj98S3PckVu4fdL70vfkcyyh_rs-WyOD7Hqph-VvPMaXR-bbbR5bc4Lq3MJUhnhB5jRDFYu4upG28NIjf4_BOs74VqPxTP_a6E4ngRY-41m3iMOQ5O7eoVz7uK0R2DKbyf6l3S0IlUFgIUnFjXh3JtdHRnR6RTEFtzzm5m_XIdyM31g" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Dev 2</span>
                  </div>

                  <div className="absolute bottom-10 left-12 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl border border-slate-100 dark:border-slate-800 shadow-md flex items-center justify-center">
                      <Radar className="text-purple-500 w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">AI Bot</span>
                  </div>

                  <div className="absolute bottom-8 right-12 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800 shadow-md overflow-hidden relative">
                      <Image alt="Lead" fill className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy9BhNF0GDEiv6gSUOjC2djY5w4AeqhZtPGFzZnHlnjQ6RmTI6SFxKSqVBVj4XOqmgACLhFYkTbpd1rF0hH3WZfKGV81tspmpe5o_teX6LOUx2wofqbiG1njjb45RfxZR44og9eN1pvemF3CSHg3-InFDXywRNvrtaXIFcfZ5IHOs3QSGllvr_mUNtUZJtPJ-FO_Q8xrnO2uuDv2Ew9RTw6dOg7vwScVpJh4sUk5EyJea73c_BgUsFBnIS53xEaa6_N_XNG-XqVMXK" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Lead</span>
                  </div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-30">
                    <path d="M70,70 L140,110" stroke="#CBD5E1" strokeDasharray="2 2"></path>
                    <path d="M300,80 L220,110" stroke="#CBD5E1" strokeDasharray="2 2"></path>
                    <path d="M100,240 L160,200" stroke="#CBD5E1" strokeDasharray="2 2"></path>
                    <path d="M280,240 L220,200" stroke="#CBD5E1" strokeDasharray="2 2"></path>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.section>

        <section className="mx-auto w-full max-w-7xl px-6 pb-20">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { value: "< 50ms", label: "Avg auth latency" },
              { value: "99.9%", label: "Availability target" },
              { value: "24/7", label: "Security monitoring" },
              { value: "SOC-ready", label: "Operational controls" },
            ].map((s) => (
              <motion.article
                key={s.label}
                className="card-panel p-6 text-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">{s.label}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <StorySection
          eyebrow="Flow"
          title="Backend-first architecture"
          description="Your frontend never handles sensitive auth credentials. Requests pass through your backend where you control data boundaries and enforcement logic."
          bullets={[
            "Frontend sends signup/login payload to your backend.",
            "Backend stores product-specific data in your database.",
            "Backend forwards only auth fields to AuthX.",
          ]}
          code={`POST /auth/signup\nAuthorization: Basic base64(CLIENT_ID:CLIENT_SECRET)\nContent-Type: application/json\n\n{\n  "email": "user@example.com",\n  "username": "jane",\n  "password": "secure-password"\n}`}
        />

        <StorySection
          eyebrow="Security"
          title="Token lifecycle with explicit control"
          description="Issue and validate tokens through clean endpoints so every protected request has deterministic authentication outcomes."
          bullets={[
            "Short-lived access tokens by default.",
            "Server-side introspection for protected routes.",
            "Clear failure handling for expired or invalid tokens.",
          ]}
          reverse
          code={`POST /auth/introspect\nAuthorization: Basic base64(CLIENT_ID:CLIENT_SECRET)\nContent-Type: application/json\n\n{ "token": "eyJhbGciOi..." }\n\n{\n  "active": true,\n  "sub": "user-id",\n  "exp": 1708444800\n}`}
        />

        <StorySection
          eyebrow="Operations"
          title="Production visibility and governance"
          description="Run authentication with policies and observability that make audits, incident response, and scaling less painful."
          bullets={[
            "Event visibility for security-sensitive auth flows.",
            "Separation between auth state and app business data.",
            "Governance-friendly control points for compliance-driven teams.",
          ]}
          code={`# Suggested backend env\nAUTHX_CLIENT_ID=app_xxxx\nAUTHX_CLIENT_SECRET=sk_xxxx\nAUTHX_BASE_URL=https://api.authx.dev\n\n# Keep secrets server-only`}
        />

        <section className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Capabilities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Designed for modern product teams</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, title: "Hardened auth primitives", desc: "Strong defaults for credential safety and identity workflows." },
              { icon: Lock, title: "Predictable token handling", desc: "Issue, validate, and enforce with consistent backend behavior." },
              { icon: Server, title: "Server-native integration", desc: "Built for backend systems that need clear security boundaries." },
              { icon: Radar, title: "Operational awareness", desc: "Observe auth traffic and detect suspicious patterns faster." },
              { icon: Workflow, title: "Clean architecture model", desc: "Frontend -> Backend -> AuthX keeps implementation sane." },
              { icon: Zap, title: "Low-friction rollout", desc: "Short path from prototype to production with stable APIs." },
            ].map((f) => (
              <motion.article
                key={f.title}
                className="card-panel p-6"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.4 }}
              >
                <f.icon className="mb-4 h-5 w-5 text-blue-500" />
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-500">{f.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--input)]/30 py-24">
          <div className="mx-auto w-full max-w-5xl px-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Ship authentication with confidence</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
              Start free, integrate quickly, and keep full control of your product data and backend enforcement logic.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
              <Link href="/auth/signup" className="btn-primary h-12 px-8 text-base">
                Start Building
              </Link>
              <Link href="/docs" className="btn-secondary h-12 px-8 text-base">
                Explore Docs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--background)] py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-sm font-semibold">AuthX</p>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              Authentication infrastructure for modern engineering teams. Fast to integrate and stable in production.
            </p>
            <p className="mt-4 text-xs text-gray-500">© {new Date().getFullYear()} AuthX Inc.</p>
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
    </div>
  );
}

