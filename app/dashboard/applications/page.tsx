"use client";

import { useEffect, useState } from "react";
import { Plus, Search, MoreHorizontal, Key, CalendarClock, Activity, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateApplicationDialog } from "@/components/create-application-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { apiGetApplications, apiDeleteApplication, ApplicationResponse } from "@/lib/api";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export default function ApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [apps, setApps] = useState<ApplicationResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const fetchApps = async () => {
        try {
            const data = await apiGetApplications();
            setApps(data);
        } catch (err) {
            console.error("Failed to fetch applications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await apiDeleteApplication(deleteTarget);
            setApps((prev) => prev.filter((a) => a.id !== deleteTarget));
        } catch (err) {
            console.error("Failed to delete:", err);
        } finally {
            setDeleteTarget(null);
        }
    };

    const filteredApps = apps.filter(app =>
        app.app_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        } catch { return dateStr; }
    };

    return (
        <motion.div
            className="flex flex-col gap-8 w-full animate-in fade-in duration-500"
            initial="hidden"
            animate="show"
            variants={container}
        >
            <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Applications</h1>
                    <p className="text-gray-500 mt-2">Manage applications and configure their JWT token lifetimes.</p>
                </div>
                <CreateApplicationDialog onCreated={fetchApps}>
                    <Button className="btn-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Application
                    </Button>
                </CreateApplicationDialog>
            </motion.div>

            <motion.div variants={item} className="card-panel overflow-hidden">
                {/* Header Controls */}
                <div className="p-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--background)]">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search applications..."
                            className="pl-9 bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] h-9 focus-visible:ring-1 focus-visible:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[var(--border)] bg-[var(--background)] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-4">Application Name</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-2">Token Expiry</div>
                    <div className="col-span-2">Created</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {/* Applications List */}
                <div className="divide-y divide-[var(--border)] bg-[var(--card)]">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 py-4 items-center">
                                <div className="col-span-4 flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-48" />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <Skeleton className="h-6 w-20 rounded-md" />
                                </div>
                                <div className="col-span-2">
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <div className="col-span-2">
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <Skeleton className="h-8 w-8 rounded-md" />
                                </div>
                            </div>
                        ))
                    ) : filteredApps.length > 0 ? (
                        filteredApps.map((app) => (
                            <Link href={`/dashboard/applications/${app.id}`} key={app.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[var(--input)] transition-colors cursor-pointer">
                                <div className="col-span-1 sm:col-span-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)]">
                                        <Key className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--foreground)]">{app.app_name}</p>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">{app.client_id.substring(0, 16)}...</p>
                                    </div>
                                </div>
                                <div className="col-span-1 sm:col-span-3 flex items-center">
                                    <span className={`inline-flex items-center font-medium px-2 py-0.5 rounded-md border text-xs gap-1.5 ${app.is_active
                                        ? 'text-green-700 bg-green-50/50 border-green-200 dark:text-green-400 dark:bg-green-500/10 dark:border-green-500/20'
                                        : 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700'
                                        }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${app.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                        {app.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <div className="col-span-1 sm:col-span-2 flex items-center text-sm text-gray-500">
                                    <CalendarClock className="h-3.5 w-3.5 mr-1.5" />
                                    {app.jwt_expiry_minutes}m
                                </div>
                                <div className="col-span-1 sm:col-span-2 flex items-center text-sm text-gray-500">
                                    {formatDate(app.created_at)}
                                </div>
                                <div className="col-span-1 sm:col-span-1 flex items-center justify-end">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDeleteTarget(app.id); }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <Empty className="py-20 border-none bg-transparent">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    {searchQuery ? <Search className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                                </EmptyMedia>
                                <EmptyTitle>{searchQuery ? "No matching applications" : "No applications yet"}</EmptyTitle>
                                <EmptyDescription>
                                    {searchQuery
                                        ? `We couldn't find any results for "${searchQuery}". Try a different search term.`
                                        : "Create your first application to get started with AuthX."}
                                </EmptyDescription>
                            </EmptyHeader>
                            {searchQuery ? (
                                <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
                                    Clear search
                                </Button>
                            ) : (
                                <CreateApplicationDialog onCreated={fetchApps}>
                                    <Button variant="outline" size="sm">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create First App
                                    </Button>
                                </CreateApplicationDialog>
                            )}
                        </Empty>
                    )}
                </div>
            </motion.div>
            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
                <AlertDialogContent className="bg-[var(--background)] border-[var(--border)]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[var(--foreground)]">Delete Application</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500">
                            Are you sure you want to delete this application? This action cannot be undone and will revoke all active sessions.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="btn-secondary">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    );
}
