"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiCreateApplication } from "@/lib/api";

export function CreateApplicationDialog({ children, onCreated }: { children: React.ReactNode; onCreated?: () => void }) {
    const [open, setOpen] = useState(false);
    const [appName, setAppName] = useState("");
    const [expiry, setExpiry] = useState("60");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<{ client_id: string; client_secret: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await apiCreateApplication({
                appName,
                jwtExpiryMinutes: parseInt(expiry) || 60,
            });
            setResult({ client_id: res.client_id, client_secret: res.client_secret });
            onCreated?.();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to create application");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setResult(null);
        setAppName("");
        setExpiry("60");
        setError("");
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] bg-[var(--background)] border-[var(--border)]">
                {result ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-[var(--foreground)] font-bold">Application Created!</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                Save your client secret now. It will not be shown again.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid gap-2">
                                <Label className="text-[var(--foreground)] font-medium">Client ID</Label>
                                <code className="block p-3 bg-[var(--input)] border border-[var(--border)] rounded-md text-sm font-mono text-[var(--foreground)] break-all">
                                    {result.client_id}
                                </code>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[var(--foreground)] font-medium text-amber-600 dark:text-amber-400">Client Secret (copy now!)</Label>
                                <code className="block p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md text-sm font-mono text-[var(--foreground)] break-all">
                                    {result.client_secret}
                                </code>
                            </div>
                        </div>
                        <DialogFooter className="flex gap-2">
                            <Button
                                variant="outline"
                                className="btn-secondary"
                                onClick={() => {
                                    navigator.clipboard.writeText(result.client_secret);
                                    setTimeout(handleClose, 1500);
                                }}
                            >
                                Copy Secret & Close
                            </Button>
                            <Button onClick={handleClose} className="btn-primary">Done</Button>
                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-[var(--foreground)] font-bold">Create Application</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                Add a new application to generate and manage its JWT tokens.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                                        {error}
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-[var(--foreground)] font-medium">Application Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. My Next.js Setup"
                                        required
                                        className="input-field"
                                        value={appName}
                                        onChange={(e) => setAppName(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="expiry" className="text-[var(--foreground)] font-medium">JWT Expiry (Minutes)</Label>
                                    <Input
                                        id="expiry"
                                        type="number"
                                        min="1"
                                        required
                                        className="input-field"
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClose}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="btn-primary">
                                    {loading ? "Creating..." : "Create"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
