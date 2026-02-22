import { getPublicApiBase } from "./runtime-config";

const API_BASE = getPublicApiBase();

// ====== Types ======

export interface AdminMeResponse {
    id: string;
    username: string;
    email: string;
    is_email_verified: boolean;
    created_at: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface ApplicationResponse {
    id: string;
    app_name: string;
    client_id: string;
    jwt_expiry_minutes: number;
    otp_length: number;
    otp_type: "NUMERIC" | "ALPHANUMERIC";
    otp_expiry_minutes: number;
    magic_link_expiry_minutes: number;
    password_reset_strategy: "OTP" | "MAGIC_LINK";
    is_active: boolean;
    created_at: string;
}

export interface ApplicationCreateResponse {
    app_name: string;
    client_id: string;
    client_secret: string;
    message: string;
}

export interface DashboardStatsResponse {
    total_apps: number;
    total_users: number;
    active_apps: number;
    inactive_apps: number;
}

export interface ApplicationUserResponse {
    email: string;
    username: string;
    isEmailVerified: boolean;
    createdAt: string;
}

export interface ApiResponse {
    message: string;
}

export interface ApiErrorPayload {
    status?: number;
    code?: string;
    message?: string;
    path?: string;
    details?: Record<string, string>;
}

export class ApiError extends Error {
    status: number;
    code?: string;
    path?: string;
    details?: Record<string, string>;

    constructor(message: string, payload?: ApiErrorPayload) {
        super(message);
        this.name = "ApiError";
        this.status = payload?.status ?? 0;
        this.code = payload?.code;
        this.path = payload?.path;
        this.details = payload?.details;
    }
}

// ====== Helpers ======

function getToken(): string | null {
    if (typeof window === "undefined") return null;
    const match = document.cookie.match(new RegExp('(^| )authx_token=([^;]+)'));
    if (match) return match[2];
    return null;
}

export function setToken(token: string) {
    if (typeof window === "undefined") return;
    const maxAge = 7 * 24 * 60 * 60; // 7 days
    document.cookie = `authx_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
}

export function removeToken() {
    if (typeof window === "undefined") return;
    document.cookie = "authx_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function isLoggedIn(): boolean {
    return !!getToken();
}

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
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
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({} as ApiErrorPayload));
            const fallbackMessage = `HTTP ${res.status}`;
            throw new ApiError(error.message || fallbackMessage, {
                status: res.status,
                code: error.code,
                path: error.path,
                details: error.details,
            });
        }

        // Handle 204 No Content
        if (res.status === 204) return {} as T;

        return res.json();
    } catch (error) {
        // `fetch` only throws a TypeError when a network error occurs (e.g., connection refused, DNS lookup failed).
        // It does not throw on HTTP error statuses (4xx, 5xx), which are handled above.
        if (error instanceof TypeError) {
            if (typeof window !== "undefined") {
                // Redirect user to the network error page
                window.location.href = "/network-error";
            }
        }
        throw error;
    }
}

// ====== Auth APIs ======

export async function apiRegister(data: {
    username: string;
    email: string;
    password: string;
}): Promise<ApiResponse> {
    return request<ApiResponse>("/admin/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function apiLogin(data: {
    email: string;
    password: string;
}): Promise<TokenResponse> {
    return request<TokenResponse>("/admin/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function apiGetMe(): Promise<AdminMeResponse> {
    return request<AdminMeResponse>("/admin/me");
}

// ====== Application APIs ======

export async function apiGetApplications(): Promise<ApplicationResponse[]> {
    return request<ApplicationResponse[]>("/admin/applications");
}

export async function apiCreateApplication(data: {
    appName: string;
    jwtExpiryMinutes: number;
}): Promise<ApplicationCreateResponse> {
    return request<ApplicationCreateResponse>("/admin/applications", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function apiGetApplicationById(
    id: string
): Promise<ApplicationResponse> {
    return request<ApplicationResponse>(`/admin/applications/${id}`);
}

export async function apiUpdateApplication(
    id: string,
    data: {
        app_name?: string;
        jwt_expiry_minutes?: number;
        is_active?: boolean;
        otp_length?: number;
        otp_type?: string;
        otp_expiry_minutes?: number;
        magic_link_expiry_minutes?: number;
        password_reset_strategy?: string;
    }
): Promise<ApplicationResponse> {
    return request<ApplicationResponse>(`/admin/applications/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function apiDeleteApplication(id: string): Promise<ApiResponse> {
    return request<ApiResponse>(`/admin/applications/${id}`, {
        method: "DELETE",
    });
}

export async function apiRotateSecret(
    clientId: string
): Promise<ApplicationCreateResponse> {
    return request<ApplicationCreateResponse>(
        `/admin/applications/${clientId}/rotate-secret`,
        { method: "POST" }
    );
}

export async function apiGetApplicationUsers(
    id: string
): Promise<ApplicationUserResponse[]> {
    return request<ApplicationUserResponse[]>(
        `/admin/applications/${id}/users`
    );
}

// ====== Dashboard APIs ======

export async function apiGetDashboardStats(): Promise<DashboardStatsResponse> {
    return request<DashboardStatsResponse>("/admin/dashboard/stats");
}

// ====== Profile APIs ======

export async function apiUpdateProfile(data: {
    username?: string;
    email?: string;
}): Promise<AdminMeResponse> {
    return request<AdminMeResponse>("/admin/profile", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function apiChangePassword(data: {
    currentPassword: string;
    newPassword: string;
}): Promise<ApiResponse> {
    return request<ApiResponse>("/admin/change-password", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function apiAdminForgotPassword(data: {
    email: string;
}): Promise<ApiResponse> {
    return request<ApiResponse>("/admin/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
    });
}



export async function apiAdminResetPasswordWithMagicLink(data: {
    token: string;
    newPassword: string;
}): Promise<ApiResponse> {
    return request<ApiResponse>("/admin/reset-password/magic-link", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

// ====== End-User Auth APIs ======

export async function apiForgotPassword(clientId: string, data: {
    identifier: string;
}): Promise<ApiResponse> {
    return request<ApiResponse>("/auth/forgot-password", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${btoa(`${clientId}:`)}`
        },
        body: JSON.stringify(data),
    });
}

export async function apiResetPasswordWithOtp(data: {
    identifier: string;
    otp: string;
    newPassword: string;
}): Promise<ApiResponse> {
    return request<ApiResponse>("/auth/reset-password/otp", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function apiResetPasswordWithMagicLink(data: {
    token: string;
    newPassword: string;
}): Promise<ApiResponse> {
    return request<ApiResponse>("/auth/reset-password/magic-link", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
