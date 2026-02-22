"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icons
import {
    Activity,
    ArrowLeft,
    Check,
    Copy,
    FileText,
    Key,
    Link as LinkIcon,
    RefreshCw,
    Settings,
    Users,
    ShieldAlert
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// API
import {
    apiGetApplicationById,
    apiGetApplicationUsers,
    apiRotateSecret,
    apiDeleteApplication,
    apiUpdateApplication,
    ApplicationResponse,
    ApplicationUserResponse,
} from "@/lib/api";

export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    // --- State ---
    const [loading, setLoading] = useState(true);
    const [app, setApp] = useState<ApplicationResponse | null>(null);
    const [users, setUsers] = useState<ApplicationUserResponse[]>([]);

    // UI Interaction State
    const [copied, setCopied] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<"rotate" | "delete" | null>(null);
    const [rotating, setRotating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [newSecret, setNewSecret] = useState<string | null>(null);

    // Settings State
    const [otpLength, setOtpLength] = useState<number>(6);
    const [otpType, setOtpType] = useState<"NUMERIC" | "ALPHANUMERIC">("NUMERIC");
    const [otpExpiryMinutes, setOtpExpiryMinutes] = useState<number>(15);
    const [magicLinkExpiryMinutes, setMagicLinkExpiryMinutes] = useState<number>(15);
    const [passwordResetStrategy, setPasswordResetStrategy] = useState<"OTP" | "MAGIC_LINK">("OTP");

    // --- Effects ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appData, usersData] = await Promise.all([
                    apiGetApplicationById(id),
                    apiGetApplicationUsers(id),
                ]);

                setApp(appData);
                setUsers(usersData);

                if (appData) {
                    setOtpLength(appData.otp_length || 6);
                    setOtpType(appData.otp_type || "NUMERIC");
                    setOtpExpiryMinutes(appData.otp_expiry_minutes || 15);
                    setMagicLinkExpiryMinutes(appData.magic_link_expiry_minutes || 15);
                    setPasswordResetStrategy(appData.password_reset_strategy || "OTP");
                }
            } catch (err) {
                console.error("Failed to load application:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // --- Handlers ---
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
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

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            const updatedApp = await apiUpdateApplication(id, {
                otp_length: otpLength,
                otp_type: otpType,
                otp_expiry_minutes: otpExpiryMinutes,
                magic_link_expiry_minutes: magicLinkExpiryMinutes,
                password_reset_strategy: passwordResetStrategy,
            });
            setApp(updatedApp);
            setCopied("saved");
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error("Failed to update settings:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateStr;
        }
    };

    // --- Renders ---
    if (loading) {
        return (
            <div className="mx-auto w-full max-w-5xl space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full max-w-md" />
                <Skeleton className="h-[320px] w-full" />
            </div>
        );
    }

    if (!app) {
        return (
            <div className="flex min-h-[280px] items-center justify-center">
                <p className="text-sm text-muted-foreground">Application not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl space-y-4 pb-8">
            {/* Header section */}
            <header className="space-y-3 border-b pb-4">
                <Link
                    href="/dashboard/applications"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Applications
                </Link>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/40">
                            <Key className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">{app.app_name}</h1>
                            <p className="text-xs text-muted-foreground">Client ID: {app.client_id}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium ${app.is_active
                                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400"
                                    : "border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                                }`}
                        >
                            <span className={`h-1.5 w-1.5 rounded-full ${app.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                            {app.is_active ? "Active" : "Inactive"}
                        </span>
                        <span className="rounded-md border px-2 py-1 text-xs text-muted-foreground">
                            Created {formatDate(app.created_at)}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content Tabs */}
            <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid h-10 w-full grid-cols-3 sm:w-auto">
                    <TabsTrigger value="users" className="text-xs sm:text-sm">
                        <Users className="mr-2 h-4 w-4" />
                        Users ({users.length})
                    </TabsTrigger>
                    <TabsTrigger value="logs" className="text-xs sm:text-sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Logs
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="text-xs sm:text-sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </TabsTrigger>
                </TabsList>

                {/* 1. USERS TAB */}
                <TabsContent value="users" className="mt-4">
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-base">Users</CardTitle>
                            <CardDescription>Accounts created under this application.</CardDescription>
                        </CardHeader>

                        {users.length === 0 ? (
                            <CardContent className="py-10">
                                <Empty className="border-none shadow-none">
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Users className="h-6 w-6" />
                                        </EmptyMedia>
                                        <EmptyTitle>No users yet</EmptyTitle>
                                        <EmptyDescription>
                                            Users will appear here after signup or login.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </CardContent>
                        ) : (
                            <>
                                <div className="hidden grid-cols-12 border-y bg-muted/20 px-6 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
                                    <div className="col-span-3">Username</div>
                                    <div className="col-span-5">Email</div>
                                    <div className="col-span-2">Status</div>
                                    <div className="col-span-2 text-right">Joined</div>
                                </div>
                                <div className="divide-y">
                                    {users.map((user, index) => (
                                        <div key={index} className="grid grid-cols-1 gap-2 px-6 py-3 text-sm sm:grid-cols-12 sm:gap-4">
                                            <div className="sm:col-span-3 font-medium">{user.username}</div>
                                            <div className="sm:col-span-5 font-mono text-xs text-muted-foreground sm:text-sm">
                                                {user.email}
                                            </div>
                                            <div className="sm:col-span-2">
                                                <span
                                                    className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-medium ${user.isEmailVerified
                                                            ? "border-green-200 bg-green-50 text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400"
                                                            : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                                                        }`}
                                                >
                                                    {user.isEmailVerified ? "Verified" : "Pending"}
                                                </span>
                                            </div>
                                            <div className="sm:col-span-2 text-left text-xs text-muted-foreground sm:text-right sm:text-sm">
                                                {user.createdAt ? formatDate(user.createdAt) : "-"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </Card>
                </TabsContent>

                {/* 2. LOGS TAB */}
                <TabsContent value="logs" className="mt-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <div>
                                <CardTitle className="text-base">Authentication Logs</CardTitle>
                                <CardDescription>Recent login and password reset activity.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" disabled>
                                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                            </Button>
                        </CardHeader>
                        <CardContent className="py-12">
                            <Empty className="border-none shadow-none">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Activity className="h-6 w-6" />
                                    </EmptyMedia>
                                    <EmptyTitle>Logs are coming soon</EmptyTitle>
                                    <EmptyDescription>
                                        Event streaming is not enabled yet for this application.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 3. SETTINGS TAB */}
                <TabsContent value="settings" className="mt-4 space-y-6">

                    {/* Settings Section: API Credentials */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">API Credentials</CardTitle>
                            <CardDescription>
                                These keys are used to authenticate your application with the API. Keep your client secret secure and never expose it in client-side code.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-xs uppercase text-muted-foreground font-semibold">Client ID</Label>
                                <div className="relative">
                                    <Input readOnly value={app.client_id} className="pr-10 font-mono text-sm" />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1 h-8 w-8"
                                        onClick={() => copyToClipboard(app.client_id, "clientId")}
                                    >
                                        {copied === "clientId" ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs uppercase text-muted-foreground font-semibold">Client Secret</Label>

                                {newSecret ? (
                                    <div className="space-y-3 rounded-md border border-amber-300 bg-amber-50 p-3 dark:border-amber-900/40 dark:bg-amber-900/10">
                                        <p className="text-xs font-medium text-amber-700 dark:text-amber-500">
                                            New secret generated. Copy it now, this is the only time it is shown.
                                        </p>
                                        <code className="block rounded border bg-background p-2 font-mono text-xs break-all">
                                            {newSecret}
                                        </code>
                                        <Button size="sm" onClick={() => copyToClipboard(newSecret, "newSecret")} className="w-full">
                                            {copied === "newSecret" ? (
                                                <Check className="mr-2 h-4 w-4" />
                                            ) : (
                                                <Copy className="mr-2 h-4 w-4" />
                                            )}
                                            {copied === "newSecret" ? "Copied" : "Copy Secret"}
                                        </Button>
                                    </div>
                                ) : (
                                    <Input readOnly value="••••••••••••••••••••••••••••••••" className="font-mono text-lg tracking-widest text-muted-foreground" />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/50 border-t px-6 py-4 justify-between">
                            <p className="text-sm text-muted-foreground">
                                Suspect a leak? Rotate your secret immediately.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={rotating}
                                onClick={() => setConfirmAction("rotate")}
                            >
                                <RefreshCw className={`mr-2 h-4 w-4 ${rotating ? "animate-spin" : ""}`} />
                                {rotating ? "Rotating..." : "Rotate Secret"}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Settings Section: Password Reset */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Authentication Preferences</CardTitle>
                            <CardDescription>Configure how users recover their accounts and log in securely.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">

                            {/* Strategy Toggle */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Password Reset Strategy</Label>
                                    <p className="text-sm text-muted-foreground mb-3">Choose the primary method for user password recovery.</p>
                                </div>
                                <RadioGroup
                                    value={passwordResetStrategy}
                                    onValueChange={(value) => setPasswordResetStrategy(value as "OTP" | "MAGIC_LINK")}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                >
                                    <Label
                                        htmlFor="strategy-otp"
                                        className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition-all ${passwordResetStrategy === "OTP"
                                                ? "border-primary bg-primary/5"
                                                : "border-muted hover:border-primary/50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <RadioGroupItem id="strategy-otp" value="OTP" />
                                            <span className="font-semibold text-sm">One-Time Password (OTP)</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground pl-6">
                                            Sends a short code to the user's email that they must manually enter.
                                        </p>
                                    </Label>

                                    <Label
                                        htmlFor="strategy-magic-link"
                                        className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition-all ${passwordResetStrategy === "MAGIC_LINK"
                                                ? "border-primary bg-primary/5"
                                                : "border-muted hover:border-primary/50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <RadioGroupItem id="strategy-magic-link" value="MAGIC_LINK" />
                                            <span className="font-semibold text-sm">Magic Link</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground pl-6">
                                            Sends a secure, one-time clickable link directly to their inbox.
                                        </p>
                                    </Label>
                                </RadioGroup>
                            </div>

                            {/* Dynamic Configuration based on Strategy */}
                            <div className="rounded-lg border bg-card p-4 space-y-4 shadow-sm">
                                <h4 className="text-sm font-medium border-b pb-2">
                                    {passwordResetStrategy === "OTP" ? "OTP Configuration" : "Magic Link Configuration"}
                                </h4>

                                {passwordResetStrategy === "OTP" ? (
                                    <div className="grid gap-6 sm:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-semibold text-muted-foreground uppercase">Length</Label>
                                            <Input
                                                type="number"
                                                min={4}
                                                max={8}
                                                value={otpLength}
                                                onChange={(e) => setOtpLength(Number(e.target.value) || 6)}
                                            />
                                            <p className="text-[11px] text-muted-foreground">Between 4-8 characters.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-semibold text-muted-foreground uppercase">Format</Label>
                                            <Select
                                                value={otpType}
                                                onValueChange={(value) => setOtpType(value as "NUMERIC" | "ALPHANUMERIC")}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="NUMERIC">Numeric Only</SelectItem>
                                                    <SelectItem value="ALPHANUMERIC">Alphanumeric</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <p className="text-[11px] text-muted-foreground">Numbers or mixed characters.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-semibold text-muted-foreground uppercase">Expiry Time</Label>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    max={60}
                                                    value={otpExpiryMinutes}
                                                    onChange={(e) => setOtpExpiryMinutes(Number(e.target.value) || 15)}
                                                    className="pr-12"
                                                />
                                                <span className="absolute right-3 top-2.5 text-xs text-muted-foreground pointer-events-none">min</span>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground">How long the code is valid.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="max-w-sm space-y-2">
                                        <Label className="text-xs font-semibold text-muted-foreground uppercase">Link Expiry Time</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                min={5}
                                                max={1440}
                                                value={magicLinkExpiryMinutes}
                                                onChange={(e) => setMagicLinkExpiryMinutes(Number(e.target.value) || 15)}
                                                className="pr-12"
                                            />
                                            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground pointer-events-none">min</span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground">Time before the link becomes inactive (max 24 hours).</p>
                                    </div>
                                )}
                            </div>

                        </CardContent>
                        <CardFooter className="bg-muted/50 border-t px-6 py-4 justify-between">
                            <p className="text-sm text-muted-foreground">Settings take effect immediately for new requests.</p>
                            <Button onClick={handleSaveSettings} disabled={isSaving}>
                                {isSaving ? "Saving..." : copied === "saved" ? "Saved Successfully!" : "Save Preferences"}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Settings Section: Danger Zone */}
                    <Card className="border-red-200 dark:border-red-900/50 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base text-red-600 flex items-center gap-2">
                                <ShieldAlert className="h-5 w-5" />
                                Danger Zone
                            </CardTitle>
                            <CardDescription>Irreversible and destructive actions for this application.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-red-100 bg-red-50/50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                                <div>
                                    <h4 className="font-medium text-sm text-foreground">Delete this application</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Once you delete an application, there is no going back. All users and logs will be permanently removed.
                                    </p>
                                </div>
                                <Button variant="destructive" onClick={() => setConfirmAction("delete")} className="shrink-0">
                                    Delete Application
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Dialogs */}
            <AlertDialog
                open={confirmAction === "rotate"}
                onOpenChange={(open) => {
                    if (!open) setConfirmAction(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Rotate Client Secret</AlertDialogTitle>
                        <AlertDialogDescription>
                            Rotating invalidates the existing secret immediately. Clients using it will fail until updated.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRotateSecret}>Rotate Secret</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
                open={confirmAction === "delete"}
                onOpenChange={(open) => {
                    if (!open) setConfirmAction(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Application</AlertDialogTitle>
                        <AlertDialogDescription>
                            This permanently deletes the application and associated users. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}