"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Database,
    Globe,
    Server,
    Shield,
    XCircle,
    Clock,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { format, subDays } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Types ---
type ServiceStatus = "operational" | "degraded" | "outage";

interface DayStatus {
    date: Date;
    status: ServiceStatus;
    uptime: number;
}

interface Service {
    id: string;
    name: string;
    icon: React.ReactNode;
    uptime90: number;
    history: DayStatus[];
}

interface IncidentUpdate {
    time: Date;
    message: string;
}

interface Incident {
    id: string;
    title: string;
    status: "investigating" | "identified" | "monitoring" | "resolved";
    date: Date;
    updates: IncidentUpdate[];
    impactedServices: string[];
}

// --- Mock Data Generation ---
const NUM_DAYS = 60;

const generateHistory = (seed: number): DayStatus[] => {
    const pseudoRandom = (curSeed: number) => {
        let x = Math.sin(curSeed++) * 10000;
        return x - Math.floor(x);
    };

    return Array.from({ length: NUM_DAYS })
        .map((_, i) => {
            const date = subDays(new Date(), NUM_DAYS - 1 - i);
            const rand = pseudoRandom(seed + i);

            let status: ServiceStatus = "operational";
            let uptime = 100;

            if (rand > 0.98) {
                status = "outage";
                uptime = 100 - (pseudoRandom(seed + i + 100) * 5 + 1);
            } else if (rand > 0.95) {
                status = "degraded";
                uptime = 100 - (pseudoRandom(seed + i + 200) * 1 + 0.1);
            }

            // Ensure recent days look good globally
            if (i > NUM_DAYS - 8) {
                status = "operational";
                uptime = 100;
            }

            return { date, status, uptime };
        });
};

const mockServices: Service[] = [
    {
        id: "api",
        name: "Authentication API",
        icon: <Server className="w-5 h-5 text-blue-500" />,
        uptime90: 99.98,
        history: generateHistory(123),
    },
    {
        id: "db",
        name: "Core Databases",
        icon: <Database className="w-5 h-5 text-purple-500" />,
        uptime90: 99.95,
        history: generateHistory(456),
    },
    {
        id: "dash",
        name: "Admin Dashboard",
        icon: <Globe className="w-5 h-5 text-emerald-500" />,
        uptime90: 99.99,
        history: generateHistory(789),
    },
    {
        id: "edge",
        name: "Edge Network",
        icon: <Activity className="w-5 h-5 text-amber-500" />,
        uptime90: 100.0,
        history: generateHistory(999), // Stable seed yielding no errors
    },
];

const mockIncidents: Incident[] = [
    {
        id: "inc-1",
        title: "Elevated Latency on Authentication API",
        status: "resolved",
        date: subDays(new Date(), 12),
        impactedServices: ["Authentication API"],
        updates: [
            {
                time: subDays(new Date(), 12),
                message:
                    "We are currently investigating reports of elevated latency affecting the Authentication API in the US-East region. Initial metrics show a 15% increase in response times.",
            },
            {
                time: new Date(subDays(new Date(), 12).getTime() + 1000 * 60 * 45), // + 45 mins
                message:
                    "The issue has been identified. A recent deployment caused unexpected database locks. We are rolling back the update now.",
            },
            {
                time: new Date(subDays(new Date(), 12).getTime() + 1000 * 60 * 120), // + 2 hrs
                message:
                    "The rollback is complete, and API latency has returned to normal baseline levels. We will continue monitoring the situation.",
            },
        ],
    },
    {
        id: "inc-2",
        title: "Brief Database Failover Window",
        status: "resolved",
        date: subDays(new Date(), 28),
        impactedServices: ["Core Databases"],
        updates: [
            {
                time: subDays(new Date(), 28),
                message:
                    "A scheduled primary-replica database failover took longer than anticipated. Some users may have experienced brief connection timeouts during this 3-minute window.",
            },
            {
                time: new Date(subDays(new Date(), 28).getTime() + 1000 * 60 * 15), // + 15 mins
                message:
                    "Failover successfully completed. All database operations are normal and verified. No data loss occurred.",
            },
        ],
    },
];

// --- Helpers ---
const globalStatusConfig = {
    operational: {
        text: "All Systems Operational",
        icon: CheckCircle2,
        bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
        border: "border-emerald-500/20",
        textCol: "text-emerald-700 dark:text-emerald-400",
        iconCol: "text-emerald-600 dark:text-emerald-400",
    },
    degraded: {
        text: "Partial System Degradation",
        icon: AlertCircle,
        bg: "bg-amber-500/10 dark:bg-amber-500/10",
        border: "border-amber-500/20",
        textCol: "text-amber-700 dark:text-amber-400",
        iconCol: "text-amber-600 dark:text-amber-400",
    },
    outage: {
        text: "Major Service Outage",
        icon: XCircle,
        bg: "bg-red-500/10 dark:bg-red-500/10",
        border: "border-red-500/20",
        textCol: "text-red-700 dark:text-red-400",
        iconCol: "text-red-600 dark:text-red-400",
    },
};

const getGlobalStatus = (services: Service[]) => {
    const latest = services.map((s) => s.history[s.history.length - 1]);
    if (latest.some((l) => l.status === "outage")) return "outage";
    if (latest.some((l) => l.status === "degraded")) return "degraded";
    return "operational";
};

// --- Animations ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// --- Main Page ---
export default function StatusPage() {
    const [mounted, setMounted] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [globalStatus, setGlobalStatus] = useState<ServiceStatus>("operational");

    // Tooltip State
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        data: DayStatus;
        serviceName: string;
    } | null>(null);

    useEffect(() => {
        setServices(mockServices);
        setGlobalStatus(getGlobalStatus(mockServices));
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const GlobalStatusIcon = globalStatusConfig[globalStatus].icon;

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* Tooltip Overlay */}
            <AnimatePresence>
                {tooltip && (
                    <div
                        style={{ left: tooltip.x, top: tooltip.y }}
                        className="fixed z-50 -translate-x-1/2 -translate-y-[calc(100%+12px)] pointer-events-none"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 3, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="bg-zinc-950/90 backdrop-blur border border-zinc-800 text-white shadow-2xl rounded-xl p-3.5 text-sm min-w-[200px]"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-zinc-100">
                                    {format(tooltip.data.date, "MMM d, yyyy")}
                                </span>
                                <span
                                    className={cn(
                                        "px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider",
                                        tooltip.data.status === "operational"
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : tooltip.data.status === "degraded"
                                                ? "bg-amber-500/20 text-amber-400"
                                                : "bg-red-500/20 text-red-400"
                                    )}
                                >
                                    {tooltip.data.status}
                                </span>
                            </div>
                            <div className="text-zinc-400 text-xs flex justify-between items-center bg-white/5 p-2 rounded-lg">
                                <span className="font-medium">{tooltip.serviceName}</span>
                                <span className="text-zinc-200">{tooltip.data.uptime.toFixed(2)}%</span>
                            </div>
                            {/* Tooltip Arrow */}
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950/90 border-r border-b border-zinc-800 rotate-45"></div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Navbar */}
            <header className="fixed top-0 inset-x-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-40 flex items-center px-6">
                <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
                    <Link href="/" className="font-bold text-lg flex items-center gap-2 group">
                        <Shield className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            AuthX Status
                        </span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Go to Dashboard
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-28 pb-20 px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl mx-auto space-y-12"
                >
                    {/* Global Status Banner */}
                    <motion.div
                        variants={itemVariants}
                        className={cn(
                            "p-6 md:p-8 rounded-2xl border transition-colors duration-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden relative group",
                            globalStatusConfig[globalStatus].bg,
                            globalStatusConfig[globalStatus].border
                        )}
                    >
                        {/* Background Glow */}
                        <div
                            className={cn(
                                "absolute -inset-1 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity",
                                globalStatus === "operational" ? "bg-emerald-500" : globalStatus === "degraded" ? "bg-amber-500" : "bg-red-500"
                            )}
                        />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className={cn("p-3 rounded-full bg-background/50 backdrop-blur border border-white/10 dark:border-black/10 shadow-sm")}>
                                <GlobalStatusIcon
                                    className={cn("w-8 h-8", globalStatusConfig[globalStatus].iconCol)}
                                />
                            </div>
                            <div>
                                <h1
                                    className={cn(
                                        "text-2xl md:text-3xl font-bold tracking-tight",
                                        globalStatusConfig[globalStatus].textCol
                                    )}
                                >
                                    {globalStatusConfig[globalStatus].text}
                                </h1>
                                <p className="text-muted-foreground mt-1 text-sm font-medium">
                                    Last updated {format(new Date(), "MMMM d, yyyy 'at' HH:mm")}
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 shrink-0 self-start sm:self-auto bg-background/50 border border-border backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm flex items-center gap-3">
                            <div className="text-sm">
                                <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Uptime</div>
                                <div className="font-bold text-lg">99.98%</div>
                            </div>
                            <div className="w-px h-8 bg-border"></div>
                            <div className="text-sm">
                                <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Region</div>
                                <div className="font-bold text-lg">Global</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Service List */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h2 className="text-xl font-semibold tracking-tight">System Metrics</h2>
                        <div className="grid gap-4">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="card-panel p-5 md:p-6 rounded-2xl hover:shadow-md transition-shadow"
                                >
                                    {/* Service Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-secondary border border-border">
                                                {service.icon}
                                            </div>
                                            <h3 className="text-lg font-medium">{service.name}</h3>
                                            <Link href="#" className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-foreground text-lg">
                                                {service.uptime90.toFixed(2)}%
                                            </p>
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                                                uptime
                                            </p>
                                        </div>
                                    </div>

                                    {/* Service Uptime Visualizer */}
                                    <div>
                                        <div className="flex items-center w-full h-10 gap-1 md:gap-[3px]">
                                            {service.history.map((day, i) => (
                                                <div
                                                    key={i}
                                                    onMouseEnter={(e) => {
                                                        const rect = e.currentTarget.getBoundingClientRect();
                                                        setTooltip({
                                                            x: rect.left + rect.width / 2,
                                                            y: rect.top,
                                                            data: day,
                                                            serviceName: service.name,
                                                        });
                                                    }}
                                                    onMouseLeave={() => setTooltip(null)}
                                                    className={cn(
                                                        "flex-1 h-full rounded-[2px] cursor-pointer transition-all hover:opacity-70 hover:scale-[1.1]",
                                                        day.status === "operational"
                                                            ? "bg-emerald-500"
                                                            : day.status === "degraded"
                                                                ? "bg-amber-500"
                                                                : "bg-red-500"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                            <span>{NUM_DAYS} days ago</span>
                                            <div className="flex-1 mx-4 border-b border-border border-dashed h-0 opacity-50"></div>
                                            <span>{Math.round(service.uptime90)}% uptime</span>
                                            <div className="flex-1 mx-4 border-b border-border border-dashed h-0 opacity-50"></div>
                                            <span>Today</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Past Incidents Timeline */}
                    <motion.div variants={itemVariants} className="space-y-6 pt-6">
                        <h2 className="text-xl font-semibold tracking-tight">Past Incidents</h2>
                        <div className="relative border-l-2 border-border/60 ml-3 pl-8 md:pl-10 space-y-12 pb-8">
                            {mockIncidents.map((incident) => (
                                <div key={incident.id} className="relative group">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[41px] md:-left-[49px] top-1.5 w-5 h-5 rounded-full bg-background border-[3px] border-border group-hover:border-primary/50 transition-colors flex items-center justify-center z-10 box-content">
                                        {incident.status === "resolved" && (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-semibold tracking-tight mb-2">
                                                {incident.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                                <span
                                                    className={cn(
                                                        "inline-flex font-semibold tracking-wider uppercase text-[10px] px-2.5 py-1 rounded-full",
                                                        incident.status === "resolved"
                                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                                    )}
                                                >
                                                    {incident.status}
                                                </span>
                                                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {format(incident.date, "MMMM d, yyyy")}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-6 mt-6 pt-2">
                                            {incident.updates.map((update, idx) => (
                                                <div key={idx} className="relative">
                                                    <div className="text-sm font-bold mb-1.5 text-foreground flex items-center gap-2">
                                                        {format(update.time, "MMM d, HH:mm zzz")}
                                                    </div>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {update.message}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* End of timeline indicator */}
                            <div className="relative">
                                <div className="absolute -left-[35px] md:-left-[43px] top-0.5 w-2 h-2 rounded-full bg-border"></div>
                                <div className="text-muted-foreground text-sm font-medium">
                                    No more incidents reported in the past {NUM_DAYS} days.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
