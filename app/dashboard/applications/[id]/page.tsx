"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Key, Users, FileText, Copy, RefreshCw, Eye, EyeOff, Settings, Plus, Activity, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
    apiGetApplicationById,
    apiGetApplicationUsers,
    apiRotateSecret,
    apiDeleteApplication,
    ApplicationResponse,
    ApplicationUserResponse,
} from "@/lib/api";
import { useRouter } from "next/navigation";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const router = useRouter();

    const [app, setApp] = useState<ApplicationResponse | null>(null);
    const [users, setUsers] = useState<ApplicationUserResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showSecret, setShowSecret] = useState(false);
    const [newSecret, setNewSecret] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [rotating, setRotating] = useState(false);
    const [confirmAction, setConfirmAction] = useState<"rotate" | "delete" | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appData, usersData] = await Promise.all([
                    apiGetApplicationById(id),
                    apiGetApplicationUsers(id),
                ]);
                setApp(appData);
                setUsers(usersData);
            } catch (err) {
                console.error("Failed to load application:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
        // Auto-dismiss rotated secret banner after copying
        if (label === "newSecret") {
            setTimeout(() => setNewSecret(null), 2000);
        }
    };

    const handleRotateSecret = async () => {
        if (!app) return;
        setConfirmAction(null);
        setRotating(true);
        try {
            const res = await apiRotateSecret(app.client_id);
            setNewSecret(res.client_secret);
        } catch (err) {
            console.error("Failed to rotate secret:", err);
        } finally {
            setRotating(false);
        }
    };

    const handleDelete = async () => {
        setConfirmAction(null);
        try {
            await apiDeleteApplication(id);
            router.push("/dashboard/applications");
        } catch (err) {
            console.error("Failed to delete:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-12 w-full max-w-md rounded-xl" />
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (!app) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-400">Application not found.</p>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
        } catch { return dateStr; }
    };

    return (
        <motion.div
            className="flex flex-col gap-8 w-full animate-in fade-in duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
                <div>
                    <Link href="/dashboard/applications" className="text-sm text-gray-500 hover:text-[var(--foreground)] flex items-center gap-2 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Applications
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--input)] text-primary">
                            <Key className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{app.app_name}</h1>
                            <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm">
                                <span className={`flex h-2 w-2 rounded-full ${app.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                {app.is_active ? "Active" : "Inactive"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="users" className="w-full">
                <TabsList className="mb-8 p-1 bg-[var(--background)] border border-[var(--border)] rounded-xl inline-flex h-12">
                    <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-[var(--input)] data-[state=active]:text-[var(--foreground)] px-6 py-2">
                        <Users className="w-4 h-4 mr-2" />
                        Users ({users.length})
                    </TabsTrigger>
                    <TabsTrigger value="logs" className="rounded-lg data-[state=active]:bg-[var(--input)] data-[state=active]:text-[var(--foreground)] px-6 py-2">
                        <FileText className="w-4 h-4 mr-2" />
                        Logs
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-[var(--input)] data-[state=active]:text-[var(--foreground)] px-6 py-2">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </TabsTrigger>
                </TabsList>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                    <div className="card-panel p-6 border border-[var(--border)] bg-[var(--background)] rounded-xl">
                        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">API Credentials</h3>

                        <div className="space-y-8">
                            {/* Client ID */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 mb-2 block">Client ID</label>
                                <div className="flex group relative">
                                    <input
                                        type="text"
                                        readOnly
                                        value={app.client_id}
                                        className="flex h-11 w-full rounded-md border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary font-mono pr-12 transition-all"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-1 top-1.5 h-8 w-8 p-0 text-gray-400 hover:text-[var(--foreground)]"
                                        onClick={() => copyToClipboard(app.client_id, "clientId")}
                                    >
                                        {copied === "clientId" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Public identifier for this application.</p>
                            </div>

                            {/* Client Secret */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 mb-2 block">Client Secret</label>
                                {newSecret ? (
                                    <div className="space-y-3">
                                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                            <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-2">New secret generated! Copy it now — it will not be shown again.</p>
                                            <code className="block p-3 bg-white dark:bg-black/30 rounded-md text-sm font-mono text-[var(--foreground)] break-all border border-amber-200 dark:border-amber-700">
                                                {newSecret}
                                            </code>
                                            <Button
                                                size="sm"
                                                className="mt-3 btn-primary"
                                                onClick={() => copyToClipboard(newSecret, "newSecret")}
                                            >
                                                {copied === "newSecret" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                                {copied === "newSecret" ? "Copied!" : "Copy Secret"}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex group relative">
                                        <input
                                            type={showSecret ? "text" : "password"}
                                            readOnly
                                            value="••••••••••••••••••••••••••••••••"
                                            className="flex h-11 w-full rounded-md border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none font-mono pr-20 transition-all font-bold tracking-widest"
                                        />
                                        <div className="absolute right-1 top-1.5 flex items-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-400 hover:text-[var(--foreground)]"
                                                onClick={() => setShowSecret(!showSecret)}
                                            >
                                                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center justify-between mt-3 bg-[var(--input)] p-3 rounded-lg border border-[var(--border)]">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-[var(--foreground)]">Key Rotation</span>
                                        <span className="text-xs text-gray-500">Keep this secret safe. Rotate if compromised.</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs flex items-center gap-2 border-[var(--border)] hover:bg-[var(--background)]"
                                        onClick={() => setConfirmAction("rotate")}
                                        disabled={rotating}
                                    >
                                        <RefreshCw className={`h-3 w-3 ${rotating ? 'animate-spin' : ''}`} />
                                        {rotating ? "Rotating..." : "Rotate Secret"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="card-panel p-6 border border-red-900/20 dark:border-red-900/30 bg-[var(--background)] rounded-xl">
                        <h3 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h3>
                        <p className="text-sm text-gray-500 mb-6">Irreversible and destructive actions.</p>
                        <div className="flex sm:flex-row flex-col sm:items-center justify-between p-4 border border-red-900/20 rounded-lg bg-red-500/5">
                            <div className="mb-4 sm:mb-0">
                                <h4 className="text-sm font-medium text-[var(--foreground)]">Delete Application</h4>
                                <p className="text-xs text-gray-500 mt-1 max-w-sm">Permanently remove this application, revoking all active sessions and user data associated with it.</p>
                            </div>
                            <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 text-white whitespace-nowrap" onClick={() => setConfirmAction("delete")}>
                                Delete App
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                {/* AlertDialogs for confirmation */}
                <AlertDialog open={confirmAction === "rotate"} onOpenChange={(open) => { if (!open) setConfirmAction(null); }}>
                    <AlertDialogContent className="bg-[var(--background)] border-[var(--border)]">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-[var(--foreground)]">Rotate Client Secret</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-500">
                                Are you sure? The current secret will be <strong>permanently invalidated</strong>. Any applications using it will stop working.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="btn-secondary">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="btn-primary" onClick={handleRotateSecret}>Rotate Secret</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={confirmAction === "delete"} onOpenChange={(open) => { if (!open) setConfirmAction(null); }}>
                    <AlertDialogContent className="bg-[var(--background)] border-[var(--border)]">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-[var(--foreground)]">Delete Application</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-500">
                                This will <strong>permanently delete</strong> this application and all its users. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="btn-secondary">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Users Tab */}
                <TabsContent value="users" className="outline-none">
                    {users.length === 0 ? (
                        <Empty className="min-h-[400px] border border-[var(--border)] bg-[var(--background)] rounded-xl">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Users className="h-6 w-6" />
                                </EmptyMedia>
                                <EmptyTitle>No users yet</EmptyTitle>
                                <EmptyDescription>
                                    As soon as users register or log in via your app, they'll appear here.
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    ) : (
                        <div className="card-panel overflow-hidden border border-[var(--border)] bg-[var(--background)] rounded-xl">
                            {/* Table Header */}
                            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[var(--border)] bg-[var(--background)] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <div className="col-span-4">Username</div>
                                <div className="col-span-4">Email</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-2 text-right">Joined</div>
                            </div>
                            <div className="divide-y divide-[var(--border)]">
                                {users.map((user, i) => (
                                    <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[var(--input)] transition-colors">
                                        <div className="col-span-4 text-sm font-medium text-[var(--foreground)]">{user.username}</div>
                                        <div className="col-span-4 text-sm text-gray-500 font-mono">{user.email}</div>
                                        <div className="col-span-2">
                                            <span className={`inline-flex items-center font-medium px-2 py-0.5 rounded-md border text-xs gap-1.5 ${user.isEmailVerified
                                                ? 'text-green-700 bg-green-50/50 border-green-200 dark:text-green-400 dark:bg-green-500/10 dark:border-green-500/20'
                                                : 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-800'
                                                }`}>
                                                {user.isEmailVerified ? "Verified" : "Pending"}
                                            </span>
                                        </div>
                                        <div className="col-span-2 text-sm text-gray-500 text-right">
                                            {user.createdAt ? formatDate(user.createdAt) : "—"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* Logs Tab */}
                <TabsContent value="logs" className="outline-none">
                    <div className="card-panel p-6 min-h-[500px] flex flex-col border border-[var(--border)] bg-[var(--background)] rounded-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-[var(--foreground)]">Authentication Logs</h3>
                                <p className="text-sm text-gray-500 mt-1">Recent authentication and authorization events.</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-[var(--border)] hover:bg-[var(--input)]">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                                <Button variant="outline" size="sm" className="border-[var(--border)] hover:bg-[var(--input)]">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        {/* Log Table Header */}
                        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-[var(--border)] text-sm font-medium text-gray-500 px-4">
                            <div className="col-span-3">Timestamp</div>
                            <div className="col-span-2">Event</div>
                            <div className="col-span-4">User / IP</div>
                            <div className="col-span-3 text-right">Status</div>
                        </div>

                        <Empty className="flex-1 mt-4">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Activity className="h-6 w-6" />
                                </EmptyMedia>
                                <EmptyTitle>Live Logs Coming in v1.1</EmptyTitle>
                                <EmptyDescription>
                                    We're building an advanced streaming engine to show you authentication events in real-time. Stay tuned!
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    </div>
                </TabsContent>
            </Tabs>
        </motion.div>
    );
}
