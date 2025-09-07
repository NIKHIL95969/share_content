"use client";

import { SkeletonCard } from "@/components/skeleton-card";
import { memo } from "react";

interface SkeletonGridProps {
  count?: number;
}

export const SkeletonGrid = memo(({ count = 6 }: SkeletonGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
});

SkeletonGrid.displayName = "SkeletonGrid";
