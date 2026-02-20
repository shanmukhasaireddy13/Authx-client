"use client";

import CustomSidebar from "@/components/ui/custom-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background">
            <CustomSidebar />
            <main className="flex-1 pl-64">
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
