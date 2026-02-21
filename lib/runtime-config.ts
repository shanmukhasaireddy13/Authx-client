const DEFAULT_API_ORIGIN = "http://localhost:8080";

function trimTrailingSlash(value: string): string {
    return value.replace(/\/+$/, "");
}

export function getPublicApiBase(): string {
    const raw = process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_API_ORIGIN;
    const normalized = trimTrailingSlash(raw);

    if (normalized.endsWith("/api/v1")) {
        return normalized;
    }

    return `${normalized}/api/v1`;
}
