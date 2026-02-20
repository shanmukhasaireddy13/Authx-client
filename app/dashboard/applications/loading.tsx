import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationsLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>

            <div className="card-panel p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <Skeleton className="h-10 w-full sm:w-72 rounded-md" />
                    <Skeleton className="h-10 w-full sm:w-40 rounded-md" />
                </div>

                <div className="rounded-md border border-[var(--border)] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center p-4 bg-[var(--input)] border-b border-[var(--border)]">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                    {/* Rows */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center p-4 border-b border-[var(--border)] last:border-0">
                            <div className="w-1/4 flex items-center gap-3">
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="w-1/4">
                                <Skeleton className="h-5 w-16" />
                            </div>
                            <div className="w-1/4">
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="w-1/4 flex items-center justify-end gap-2">
                                <Skeleton className="h-8 w-16 rounded-md" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
