"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { User, Shield, Mail, KeySquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { apiUpdateProfile, apiChangePassword } from "@/lib/api";

export default function SettingsPage() {
    const { user, refreshUser } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMsg, setProfileMsg] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.username);
            setEmail(user.email);
        }
    }, [user]);

    const handleProfileSave = async () => {
        setProfileLoading(true);
        setProfileMsg("");
        try {
            await apiUpdateProfile({ username: name, email });
            await refreshUser();
            setProfileMsg("Profile updated successfully.");
        } catch (err: unknown) {
            setProfileMsg(err instanceof Error ? err.message : "Failed to update profile");
        } finally {
            setProfileLoading(false);
        }
    };

    const handleChangePassword = async () => {
        setPasswordLoading(true);
        setPasswordError("");
        setPasswordMsg("");
        try {
            const res = await apiChangePassword({ currentPassword, newPassword });
            setPasswordMsg(res.message || "Password changed successfully.");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err: unknown) {
            setPasswordError(err instanceof Error ? err.message : "Failed to change password");
        } finally {
            setPasswordLoading(false);
        }
    };

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    };

    return (
        <motion.div
            className="flex flex-col gap-8 w-full max-w-4xl animate-in fade-in duration-500"
            initial="hidden"
            animate="show"
            variants={container}
        >
            <motion.div variants={item} className="flex flex-col gap-2 pb-2">
                <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Settings</h1>
                <p className="text-gray-500">Manage your account settings, security, and preferences.</p>
            </motion.div>

            {/* Profile Section */}
            <motion.div variants={item} className="card-panel overflow-hidden">
                <div className="p-6 border-b border-[var(--border)] flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--input)] border border-[var(--border)] text-2xl font-bold text-gray-500">
                        {user?.username?.charAt(0)?.toUpperCase() || "A"}
                    </div>
                    <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-medium text-[var(--foreground)]">{user?.username || "User"}</h3>
                        <p className="text-sm text-gray-500">{user?.email || ""}</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {profileMsg && (
                        <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-4 py-3 rounded-lg border border-green-200 dark:border-green-800">
                            {profileMsg}
                        </div>
                    )}

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-[var(--foreground)] flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            Full Name
                        </label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} className="max-w-md input-field" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-[var(--foreground)] flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            Email Address
                        </label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} className="max-w-md input-field" />
                        <p className="text-xs text-gray-500 mt-1">This email will be used for account recovery and notifications.</p>
                    </div>

                    <Button className="btn-primary w-fit mt-2" onClick={handleProfileSave} disabled={profileLoading}>
                        {profileLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </motion.div>

            {/* Security Section */}
            <motion.div variants={item} className="card-panel overflow-hidden">
                <div className="px-6 py-5 border-b border-[var(--border)]">
                    <h3 className="text-lg font-medium text-[var(--foreground)] flex items-center gap-2">
                        <Shield className="h-5 w-5 text-gray-500" />
                        Security &amp; Authentication
                    </h3>
                </div>

                <div className="p-6 space-y-6">
                    {passwordError && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                            {passwordError}
                        </div>
                    )}
                    {passwordMsg && (
                        <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-4 py-3 rounded-lg border border-green-200 dark:border-green-800">
                            {passwordMsg}
                        </div>
                    )}

                    <div className="space-y-4 py-3 border-b border-[var(--border)]">
                        <h4 className="text-sm font-medium text-[var(--foreground)]">Change Password</h4>
                        <div className="grid gap-3 max-w-md">
                            <Input
                                type="password"
                                placeholder="Current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="input-field"
                            />
                            <Input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input-field"
                            />
                            <Button
                                variant="outline"
                                className="btn-secondary w-fit"
                                onClick={handleChangePassword}
                                disabled={passwordLoading || !currentPassword || !newPassword}
                            >
                                {passwordLoading ? "Changing..." : "Change Password"}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3">
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium text-[var(--foreground)]">Two-Factor Authentication (2FA)</h4>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                        </div>
                        <Button className="btn-primary" disabled>
                            Coming Soon
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* API Keys Section */}
            <motion.div variants={item} className="card-panel overflow-hidden mb-12">
                <div className="px-6 py-5 border-b border-[var(--border)] flex justify-between items-center">
                    <h3 className="text-lg font-medium text-[var(--foreground)] flex items-center gap-2">
                        <KeySquare className="h-5 w-5 text-gray-500" />
                        Management API Keys
                    </h3>
                    <Button className="btn-primary h-8 px-3 text-xs" disabled>Coming Soon</Button>
                </div>

                <div className="p-6 text-center text-sm text-gray-400">
                    API key management will be available in a future release.
                </div>
            </motion.div>
        </motion.div>
    );
}
