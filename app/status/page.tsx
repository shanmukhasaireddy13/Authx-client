"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle2,
    Activity,
    AlertCircle,
    XCircle,
    Info,
    RefreshCw,
    Clock,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiGetSystemStatus, ServiceStatusDto, ResponseTimeDto } from "@/lib/api";
import { SiteFooter } from "@/components/site-footer";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Status Configs ---
const statusColors = {
    operational: {
        text: "is operational",
        bg: "bg-emerald-500",
        textCol: "text-emerald-500",
        border: "border-emerald-500/20",
        icon: CheckCircle2,
        bgSoft: "bg-emerald-500/10",
        badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    degraded: {
        text: "is degraded",
        bg: "bg-amber-500",
        textCol: "text-amber-500",
        border: "border-amber-500/20",
        icon: AlertCircle,
        bgSoft: "bg-amber-500/10",
        badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    outage: {
        text: "is down",
        bg: "bg-red-500",
        textCol: "text-red-500",
        border: "border-red-500/20",
        icon: XCircle,
        bgSoft: "bg-red-500/10",
        badge: "bg-red-500/10 text-red-600 border-red-500/20",
    },
    paused: {
        text: "is paused",
        bg: "bg-zinc-500",
        textCol: "text-zinc-500",
        border: "border-zinc-500/20",
        icon: Info,
        bgSoft: "bg-zinc-500/10",
        badge: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    },
};

// --- Uptime Bar Graphic ---
function UptimeBar({ history }: { history: any[] }) {
    // Generate an array of exactly 90 days for consistent layout width.
    // If we have less data, we fill the beginning with 'unknown' state.
    const maxDays = 90;
    const paddingCount = Math.max(0, maxDays - (history?.length || 0));
    const paddedHistory = [
        ...Array(paddingCount).fill({ status: "unknown" }),
        ...(history || []).slice(-maxDays)
    ];

    // Tooltip State (Optional, but adds to the polished feel)
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <div className="w-full mt-8 mb-6 relative">
            <div className="flex h-10 w-full items-end gap-1 overflow-hidden relative" onMouseLeave={() => setHoveredIdx(null)}>
                {paddedHistory.map((day, idx) => {
                    let bgColor = "bg-zinc-200 dark:bg-zinc-800"; // unknown/no-data
                    if (day.status === "operational") bgColor = "bg-emerald-500";
                    else if (day.status === "degraded") bgColor = "bg-amber-500";
                    else if (day.status === "outage") bgColor = "bg-red-500";
                    else if (day.status === "paused") bgColor = "bg-zinc-400";

                    return (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            className={cn(
                                "h-full flex-grow rounded-[2px] opacity-80 hover:opacity-100 transition-opacity cursor-crosshair",
                                bgColor
                            )}
                        />
                    );
                })}
            </div>

            {/* Simple X-Axis Legend */}
            <div className="flex items-center justify-between mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>90 days ago</span>
                {hoveredIdx !== null ? (
                    <span className="text-foreground absolute left-1/2 -translate-x-1/2">
                        {paddedHistory[hoveredIdx].status === "unknown" ? "No Data" : paddedHistory[hoveredIdx].status}
                    </span>
                ) : (
                    <span className="absolute left-1/2 -translate-x-1/2">100% Uptime</span>
                )}
                <span>Today</span>
            </div>
        </div>
    );
}

// Determine status based on UptimeRobot logic
function getServiceStatus(dayHistory: any[]): keyof typeof statusColors {
    if (!dayHistory || dayHistory.length === 0) return "operational";
    const today = dayHistory[dayHistory.length - 1];
    if (today.status === "outage") return "outage";
    if (today.status === "degraded") return "degraded";
    return "operational";
}

function calculateResponseStats(data: ResponseTimeDto[]) {
    if (!data || data.length === 0) return { avg: 0, max: 0, min: 0 };
    const values = data.map((d) => d.value);
    const sum = values.reduce((a, b) => a + b, 0);
    return {
        avg: Math.round(sum / values.length),
        max: Math.max(...values),
        min: Math.min(...values),
    };
}

// Custom SVG Line Chart
function ResponseTimeChart({ data }: { data: ResponseTimeDto[] }) {
    if (!data || data.length === 0)
        return (
            <div className="h-40 flex items-center justify-center text-sm text-gray-500 border border-dashed rounded-xl">
                No response time data available for this monitor.
            </div>
        );

    const values = data.map((d) => d.value);
    const min = Math.max(0, Math.min(...values) - 100); // 100ms padding
    const max = Math.max(...values) + 100;

    const width = 800; // Will scale via css
    const height = 180;
    const paddingX = 10;
    const paddingY = 20;

    const scaleX = (width - paddingX * 2) / Math.max(data.length - 1, 1);
    const scaleY = (height - paddingY * 2) / (max - min || 1);

    const points = data
        .map((d, i) => {
            const x = paddingX + i * scaleX;
            const y = height - paddingY - (d.value - min) * scaleY;
            return `${x},${y}`;
        })
        .join(" ");

    const areaPoints = `${paddingX},${height} ${points} ${width - paddingX},${height}`;

    return (
        <div className="w-full relative rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 overflow-hidden group">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto max-h-[160px] overflow-visible"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points={areaPoints} fill="url(#chart-gradient)" className="transition-all duration-700" />
                <polyline
                    points={points}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-700 hover:stroke-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
            </svg>
        </div>
    );
}

// --- Main Page Component ---
export default function StatusPage() {
    const [mounted, setMounted] = useState(false);
    const [services, setServices] = useState<ServiceStatusDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const loadStatus = async (isManualRefresh = false) => {
        if (isManualRefresh) setIsRefreshing(true);
        try {
            const response = await apiGetSystemStatus();
            setServices(response.services);
            setLastUpdated(new Date());

            // If they have only 1 service, automatically open it
            if (response.services.length === 1 && !selectedServiceId) {
                setSelectedServiceId(response.services[0].id);
            }
        } catch (error) {
            console.error("Failed to load UptimeRobot status", error);
        } finally {
            if (isManualRefresh) setIsRefreshing(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        setMounted(true);
        loadStatus();
        // REMOVED AUTO POLL PER USER REQUEST
    }, []);

    if (!mounted || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // --- RENDER LIST VIEW ---
    if (!selectedServiceId) {
        return (
            <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground selection:bg-primary/20 flex flex-col">
                <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-12 md:py-20 lg:px-12">
                    <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                                <Activity className="w-8 h-8 text-blue-500" /> AuthX Status
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Real-time and historical data on system performance.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground hidden sm:inline-block">
                                Last updated: {lastUpdated ? format(lastUpdated, "HH:mm:ss") : "--:--:--"}
                            </span>
                            <button
                                onClick={() => loadStatus(true)}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                                Refresh Status
                            </button>
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 border border-border bg-card rounded-md text-sm font-medium hover:bg-accent transition-colors hidden sm:inline-block"
                            >
                                Return to Dashboard
                            </Link>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.length === 0 ? (
                            <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-[var(--border)] text-muted-foreground bg-[var(--background)] text-sm">
                                No monitors currently tracked or the API connection is offline.
                            </div>
                        ) : (
                            services.map((svc) => {
                                const st = getServiceStatus(svc.history);
                                const conf = statusColors[st];
                                return (
                                    <button
                                        key={svc.id}
                                        onClick={() => setSelectedServiceId(svc.id)}
                                        className="w-full text-left group flex flex-col justify-between p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all shadow-sm hover:shadow-md gap-6 h-full"
                                    >
                                        <div className="flex items-start justify-between w-full">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={cn(
                                                        "w-4 h-4 rounded-full shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.1)]",
                                                        conf.bg
                                                    )}
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-xl text-foreground">
                                                        {svc.name}
                                                    </h3>
                                                    <p
                                                        className={cn(
                                                            "text-xs font-bold uppercase tracking-wider mt-1",
                                                            conf.textCol
                                                        )}
                                                    >
                                                        {st}
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <div className="flex flex-col gap-1 w-full border-t border-[var(--border)] pt-4 mt-auto">
                                            <p className="font-bold text-3xl text-foreground">
                                                {svc.uptime90.toFixed(3)}%
                                            </p>
                                            <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                                                90-Day Uptime
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                <SiteFooter />
            </main>
        );
    }

    // --- RENDER DETAIL VIEW (UptimeRobot Clone - Full Width) ---
    const svc = services.find((s) => s.id === selectedServiceId)!;
    if (!svc) {
        setSelectedServiceId(null);
        return null;
    }

    const st = getServiceStatus(svc.history);
    const conf = statusColors[st];
    const stats = calculateResponseStats(svc.responseTimes || []);

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground selection:bg-primary/20 flex flex-col">
            <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8 md:py-12 lg:px-12">

                {/* Header & Breadcrumbs */}
                <header className="mb-10 border-b border-border pb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3 mb-2">
                                <Activity className="w-6 h-6 text-blue-500" /> AuthX Status
                            </h1>
                            <button
                                onClick={() => setSelectedServiceId(null)}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to systems list
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground hidden sm:inline-flex items-center gap-2 font-medium">
                                <Clock className="w-4 h-4" />
                                Last updated: {lastUpdated ? format(lastUpdated, "HH:mm:ss") : "--:--:--"}
                            </span>
                            <button
                                onClick={() => loadStatus(true)}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] hover:bg-accent border border-border text-foreground rounded-md text-sm font-medium transition-colors disabled:opacity-50 shadow-sm"
                            >
                                <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                                Refresh Status
                            </button>
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </header>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">

                    {/* Live Status Banner */}
                    <section
                        className={cn(
                            "p-6 md:p-10 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors shadow-sm",
                            conf.bgSoft,
                            conf.border
                        )}
                    >
                        <div className="flex items-center gap-6">
                            <conf.icon className={cn("w-12 h-12", conf.textCol)} />
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 text-foreground">
                                    {svc.name}
                                </h2>
                                <p className={cn("text-lg font-medium", conf.textCol)}>
                                    Service {conf.text}
                                </p>
                            </div>
                        </div>
                        <div className="bg-background/80 backdrop-blur-sm border border-border px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-muted-foreground shadow-sm flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", conf.bg)}></span>
                                <span className={cn("relative inline-flex rounded-full h-3 w-3", conf.bg)}></span>
                            </span>
                            Live Monitoring
                        </div>
                    </section>

                    {/* TWO COLUMN WIDE LAYOUT FOR METRICS AND LOGS */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* LEFT COLUMN - Metrics & Charts (Wider) */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Uptime Blocks */}
                            <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[var(--border)] pb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">
                                            Historical Uptime
                                        </h3>
                                        <p className="text-sm text-muted-foreground">System availability over various timeframes.</p>
                                    </div>
                                    <div className="text-left sm:text-right mt-4 sm:mt-0">
                                        <span
                                            className={cn(
                                                "text-4xl md:text-5xl font-extrabold tracking-tight block",
                                                conf.textCol
                                            )}
                                        >
                                            {svc.uptime90.toFixed(3)}%
                                        </span>
                                        <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground mt-1">
                                            90-Day Aggregate
                                        </p>
                                    </div>
                                </div>

                                <UptimeBar history={svc.history || []} />

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
                                    {[
                                        { label: "Last 24 hours", val: svc.uptime1d },
                                        { label: "Last 7 days", val: svc.uptime7d },
                                        { label: "Last 30 days", val: svc.uptime30d },
                                        { label: "Last 90 days", val: svc.uptime90 },
                                    ].map((interval) => (
                                        <div
                                            key={interval.label}
                                            className="bg-[var(--background)] border border-[var(--border)] p-5 rounded-xl flex flex-col gap-1.5"
                                        >
                                            <span className="text-2xl md:text-3xl font-bold text-foreground">
                                                {interval.val === 100 ? "100.00" : interval.val.toFixed(2)}%
                                            </span>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                                {interval.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Response Time Chart */}
                            <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-[var(--border)] pb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">
                                            Response Time
                                        </h3>
                                        <p className="text-sm font-medium text-muted-foreground">Rolling 48-hour latency metrics.</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 md:gap-8">
                                        <div className="bg-[var(--background)] px-4 py-2 rounded-lg border border-[var(--border)] min-w-[120px]">
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">{stats.avg}ms</p>
                                            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">Average</p>
                                        </div>
                                        <div className="bg-[var(--background)] px-4 py-2 rounded-lg border border-[var(--border)] min-w-[120px]">
                                            <p className="text-2xl font-bold text-amber-600 dark:text-amber-500">{stats.max}ms</p>
                                            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">Maximum</p>
                                        </div>
                                        <div className="bg-[var(--background)] px-4 py-2 rounded-lg border border-[var(--border)] min-w-[120px]">
                                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">{stats.min}ms</p>
                                            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">Minimum</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <ResponseTimeChart data={svc.responseTimes || []} />
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN - Recent Events Logs (Narrower) */}
                        <div className="lg:col-span-4">
                            <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-6 border-b border-[var(--border)] pb-6">
                                    Incident Timeline
                                </h3>

                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-0">
                                    {!svc.events || svc.events.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <CheckCircle2 className="w-12 h-12 text-emerald-500/50 mb-4" />
                                            <p className="text-foreground font-semibold text-lg">Clean Record</p>
                                            <p className="text-muted-foreground text-sm mt-1">No incidents logged within the retention period.</p>
                                        </div>
                                    ) : (
                                        <div className="relative border-l-2 border-[var(--border)] ml-3 space-y-8 pb-4">
                                            {svc.events.map((ev, i) => {
                                                const eventDate = new Date(ev.datetime * 1000);
                                                const isUp = ev.type === "up";
                                                const isDown = ev.type === "down";

                                                return (
                                                    <div key={i} className="relative group pl-8">
                                                        {/* Timeline Dot */}
                                                        <div className={cn(
                                                            "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[var(--card)] z-10 transition-transform group-hover:scale-125",
                                                            isUp ? "bg-emerald-500" : isDown ? "bg-red-500" : "bg-blue-500"
                                                        )} />

                                                        {/* Event Content */}
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-1 xl:gap-4 mb-1">
                                                                <h4 className={cn(
                                                                    "text-base font-bold tracking-tight",
                                                                    isUp ? "text-emerald-600 dark:text-emerald-400" : isDown ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-500"
                                                                )}>
                                                                    {ev.title}
                                                                </h4>
                                                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                                                                    <Clock className="w-3.5 h-3.5" />
                                                                    {format(eventDate, "MMM d, HH:mm")}
                                                                </span>
                                                            </div>

                                                            {ev.detail && ev.detail !== "" && (
                                                                <div className="bg-[var(--background)] p-3.5 rounded-xl border border-[var(--border)] text-sm text-foreground/90 font-medium leading-relaxed shadow-sm">
                                                                    {ev.detail}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <div className="relative pt-6 pl-8">
                                                <div className="absolute -left-[29px] md:-left-[37px] top-[22px] w-1.5 h-1.5 rounded-full bg-[var(--border)]"></div>
                                                <div className="text-gray-400 dark:text-zinc-600 text-xs font-semibold uppercase tracking-wider">
                                                    Start of record
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>

            <SiteFooter />
        </main>
    );
}
