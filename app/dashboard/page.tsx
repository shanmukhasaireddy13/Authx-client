"use client";

import { useEffect, useState } from "react";
import { Plus, Key, Users, Activity, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateApplicationDialog } from "@/components/create-application-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { apiGetApplications, apiGetDashboardStats, ApplicationResponse, DashboardStatsResponse } from "@/lib/api";

export default function DashboardPage() {
    const [apps, setApps] = useState<ApplicationResponse[]>([]);
    const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [appsData, statsData] = await Promise.all([
                apiGetApplications(),
                apiGetDashboardStats(),
            ]);
            setApps(appsData);
            setStats(statsData);
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const statCards = [
        { name: 'Total Apps', value: stats?.total_apps?.toString() ?? '0', icon: Key },
        { name: 'Total Users', value: stats?.total_users?.toString() ?? '0', icon: Users },
        { name: 'Active Apps', value: stats?.active_apps?.toString() ?? '0', icon: Activity },
        { name: 'Inactive Apps', value: stats?.inactive_apps?.toString() ?? '0', icon: ShieldAlert }
    ];

    return (
        <motion.div
            className="flex flex-col gap-8 w-full animate-in fade-in duration-500"
            initial="hidden"
            animate="show"
            variants={container}
        >
            <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Overview</h1>
                    <p className="text-gray-500 mt-2">Welcome back to your AuthX dashboard.</p>
                </div>
                <CreateApplicationDialog onCreated={fetchData}>
                    <Button className="btn-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Application
                    </Button>
                </CreateApplicationDialog>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                    <motion.div variants={item} key={stat.name} className="card-panel p-6 hover:shadow-md transition-shadow group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-500 group-hover:text-[var(--foreground)] transition-colors">{stat.name}</span>
                            <stat.icon className="w-4 h-4 text-gray-400 group-hover:text-[var(--foreground)] transition-colors" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            {loading ? (
                                <Skeleton className="h-8 w-16" />
                            ) : (
                                <span className="text-2xl font-bold text-[var(--foreground)]">
                                    {stat.value}
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Active Applications + Traffic */}
            <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={item} className="card-panel p-6 min-h-[400px] flex flex-col">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-base font-semibold text-[var(--foreground)]">Active Applications</h3>
                            <p className="text-sm text-gray-500">Your provisioned JWT endpoints.</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-md" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-48" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            ))
                        ) : apps.length === 0 ? (
                            <Empty className="flex-1">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Key className="h-5 w-5" />
                                    </EmptyMedia>
                                    <EmptyTitle>No applications</EmptyTitle>
                                    <EmptyDescription>
                                        Create your first application to start issuing JWT tokens.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <CreateApplicationDialog onCreated={fetchData}>
                                    <Button size="sm" variant="outline" className="mt-4">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create First App
                                    </Button>
                                </CreateApplicationDialog>
                            </Empty>
                        ) : (
                            apps.slice(0, 5).map((app) => (
                                <Link href={`/dashboard/applications/${app.id}`} key={app.id} className="group flex flex-row items-center justify-between p-4 border border-[var(--border)] rounded-lg bg-[var(--background)] hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--input)] text-gray-500 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                                            <Key className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-[var(--foreground)] group-hover:text-primary transition-colors">{app.app_name}</h3>
                                            <p className="text-xs text-gray-500">{app.jwt_expiry_minutes} mins expiry • {app.is_active ? "Active" : "Inactive"}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-gray-400 group-hover:text-[var(--foreground)] transition-colors pointer-events-none">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            ))
                        )}
                    </div>
                </motion.div>

                <motion.div variants={item} className="card-panel p-6 min-h-[400px] flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-[var(--foreground)]">Auth Traffic</h3>
                        <p className="text-sm text-gray-500">Authentication requests (last 24h).</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-[var(--border)] rounded-xl bg-[var(--input)]/20 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                                <path d="M0,150 Q50,130 100,160 T200,140 T300,170 T400,130" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M0,120 Q50,100 100,130 T200,110 T300,140 T400,100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <Activity className="w-10 h-10 text-gray-300 mb-4 animate-pulse" />
                        <h4 className="text-sm font-medium text-[var(--foreground)]">Insights Pending</h4>
                        <p className="text-xs text-gray-400 mt-1 max-w-[200px] text-center">Integrating with the AuthX streaming engine to show real-time metrics.</p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
