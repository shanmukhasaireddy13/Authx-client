import { cookies } from "next/headers";
import { getPublicApiBase } from "./runtime-config";
import {
    ApplicationResponse,
    DashboardStatsResponse,
    AdminMeResponse,
} from "./api";

const API_BASE = getPublicApiBase();

export async function getServerToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("authx_token");
    return token?.value || null;
}

export async function serverRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = await getServerToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
            cache: "no-store",
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: "Request failed" }));
            throw new Error(error.message || error.error || `HTTP ${res.status}`);
        }

        if (res.status === 204) return {} as T;

        return res.json();
    } catch (error) {
        // If a request fails on the server, we just throw it so the component can handle it (or let error.tsx catch it).
        throw error;
    }
}

export async function serverGetApplications(): Promise<ApplicationResponse[]> {
    return serverRequest<ApplicationResponse[]>("/admin/applications");
}

export async function serverGetDashboardStats(): Promise<DashboardStatsResponse> {
    return serverRequest<DashboardStatsResponse>("/admin/dashboard/stats");
}

export async function serverGetMe(): Promise<AdminMeResponse> {
    return serverRequest<AdminMeResponse>("/admin/me");
}
