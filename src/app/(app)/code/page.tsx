"use client";

import { CodeCard } from "@/components/card-code";
import { useEffect, useState, useCallback, memo } from "react";
import PaginationControls from "@/components/pagination-controls";
import { SkeletonGrid } from "@/components/skeleton-grid";


// Memoized content display component
const ContentDisplay = memo(({ allContent, isLoading, limit }: { allContent: any[], isLoading: boolean, limit?: number }) => {
  // Show skeleton loader while loading
  if (isLoading) {
    return <SkeletonGrid count={limit || 6} />;
  }

  // Show empty state when no content
  if (!allContent || allContent.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center space-y-4">
          <div className="text-8xl opacity-20">🔗</div>
          <h1 className="text-4xl font-bold text-muted-foreground">No content yet</h1>
          <p className="text-muted-foreground">Start sharing your first piece of content!</p>
        </div>
      </div>
    );
  }

  // Show content grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {allContent.map((content) => (
        <CodeCard 
          key={content.id || Math.random()} 
          code={content.content} 
          createdAt={new Date(
            content.createdAt || "2024-03-02"
          ).toLocaleDateString()} 
          title="Content" 
        />
      ))}
    </div>
  );
});

ContentDisplay.displayName = "ContentDisplay";

export default function Home() {
  const [allContent, setAllContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
    
  const API_URL = `/api/sharecontent/getcontent?temp=false&page=${page}&limit=${limit}`;

  const handleGetContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fetch(API_URL, {
        cache: 'no-store',
        method: 'POST'
      });

      const response = await result.json();

      if (response) {
        setAllContent(response.data);
        setTotal(response.total);
        console.log("Content successfully fetched!", response);
      } else {
        console.error("Unexpected response status:", response.status);
      }

    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    handleGetContent();
  }, [page]);

  return (
    <>

      {/* Enhanced Main Content */}
      <div className="">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <ContentDisplay allContent={allContent} isLoading={isLoading} />
          <PaginationControls page={page} total={total} limit={limit} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
