import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
    return (
        <div className="space-y-6 mt-4 animate-pulse">
            {/* Profile Section */}
            <div className="card-panel p-6">
                <div className="mb-6">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>

                <div className="flex items-start gap-6 mb-8">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-4 flex-1">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-32 rounded-md" />
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="card-panel p-6">
                <div className="mb-6">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>

                <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-32 rounded-md mt-6" />
                </div>
            </div>

            {/* API Keys Section */}
            <div className="card-panel p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>

                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex justify-between items-center p-4 border border-[var(--border)] rounded-md">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-9 w-20 rounded-md" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
