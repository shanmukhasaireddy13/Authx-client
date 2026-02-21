import { ApplicationResponse, DashboardStatsResponse } from "@/lib/api";
import { serverGetApplications, serverGetDashboardStats } from "@/lib/server-api";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
    let apps: ApplicationResponse[] = [];
    let stats: DashboardStatsResponse | null = null;

    try {
        [apps, stats] = await Promise.all([
            serverGetApplications(),
            serverGetDashboardStats(),
        ]);
    } catch (err) {
        console.error("Failed to fetch dashboard data server-side:", err);
    }

    return <DashboardClient apps={apps} stats={stats} />;
}
