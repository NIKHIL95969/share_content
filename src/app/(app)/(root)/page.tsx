"use client";

import { CodeCard } from "@/components/card-code";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ShareContentDialog } from "@/components/share-content-dialog";
import { useEffect, useState, useCallback, memo } from "react";
import PaginationControls from "@/components/pagination-controls";
import { SkeletonGrid } from "@/components/skeleton-grid";
import { Share2, RefreshCw, Clock } from "lucide-react";
import { ModeSwitcher } from "@/components/mode-switcher";
import { useRouter } from "next/navigation";


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
  const router = useRouter();
  
  const API_URL = `/api/sharecontent/getcontent?temp=false&page=${page}&limit=${limit}`;

  // Handler when new content is created through dialog
  const handleContentCreated = useCallback((newContent: any) => {
    // Only add non-temporary content to main page
    if (!newContent.temp) {
      setAllContent(prevContent => [newContent, ...prevContent]);
      setTotal(prevTotal => prevTotal + 1);
    }
  }, []);

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
      {/* Enhanced Header with gradient background */}
      <div className="w-full bg-gradient-to-r from-background via-muted/20 to-background border-b border-border/50 shadow-sm">
        <div className="max-w-8xl mx-auto">
          <div className="py-6 lg:px-8 mx-4 lg:mx-8">
            <header className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Tasky Now
                </h1>
              </div>
              <div className="flex items-center flex-wrap gap-3 mt-4 sm:mt-0">
                <ShareContentDialog onContentCreated={handleContentCreated} />
                <Button 
                  onClick={handleGetContent} 
                  variant="outline"
                  className="px-6 py-2 hover:bg-muted/50 transition-all duration-200"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button
                  onClick={() => router.push('/temp')}
                  variant="outline"
                  className="px-4 py-2 transition-all duration-200"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  View Temporary
                </Button>
                <ModeSwitcher/>
              </div>
            </header>
          </div>
        </div>
      </div>

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
