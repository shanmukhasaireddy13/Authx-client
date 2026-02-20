import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex justify-between items-center bg-[var(--background)] p-6 rounded-lg border border-[var(--border)]">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-lg" />
                    <div>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-40 rounded-md" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="card-panel p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                        <Skeleton className="h-8 w-1/3 mb-2" />
                        <Skeleton className="h-3 w-2/3" />
                    </div>
                ))}
            </div>

            <div className="card-panel p-6">
                <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-5 w-20" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-48" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
