const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

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

// ====== Helpers ======

function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authx_token");
}

export function setToken(token: string) {
    localStorage.setItem("authx_token", token);
}

export function removeToken() {
    localStorage.removeItem("authx_token");
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

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || error.error || `HTTP ${res.status}`);
    }

    // Handle 204 No Content
    if (res.status === 204) return {} as T;

    return res.json();
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
    data: { app_name?: string; jwt_expiry_minutes?: number; is_active?: boolean }
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
