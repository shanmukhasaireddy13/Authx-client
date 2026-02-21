import { ApplicationResponse } from "@/lib/api";
import { serverGetApplications } from "@/lib/server-api";
import { ApplicationsClient } from "./applications-client";

export default async function ApplicationsPage() {
    let apps: ApplicationResponse[] = [];

    try {
        apps = await serverGetApplications();
    } catch (err) {
        console.error("Failed to fetch applications server-side:", err);
    }

    return <ApplicationsClient initialApps={apps} />;
}
