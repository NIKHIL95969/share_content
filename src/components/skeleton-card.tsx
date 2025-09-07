"use client";

import { Card } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden min-h-96 transition-transform duration-200 ease-in-out">
      {/* Header skeleton */}
      <div className="p-6 relative">
        {/* Title skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-muted rounded animate-pulse mb-2 w-16"></div>
        </div>

        {/* Code content skeleton */}
        <div className="min-h-72 max-h-72 rounded bg-muted/30 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          
          {/* Code lines skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-4/5"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/3"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-4/5"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/4"></div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-8 h-8 bg-muted rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-muted rounded animate-pulse"></div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="px-6 py-4 max-h-12 bg-muted/50 border-t flex items-center justify-between">
        <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
      </div>
    </Card>
  );
}
