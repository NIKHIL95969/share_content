"use client";

import { CodeCard } from "@/components/card-code";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useCallback, memo } from "react";
import PaginationControls from "@/components/pagination-controls";
import { Share2, RefreshCw, Clock } from "lucide-react";

// Loading component with animated dots
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center py-20">
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground/80">Loading content...</h3>
        <p className="text-sm text-muted-foreground">Fetching your shared content from the database</p>
      </div>
      {/* Animated dots */}
      <div className="flex justify-center space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

// Separate dialog component to prevent re-renders of the main content
const ShareContentDialog = memo(({ 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  checked,
  setChecked
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (content: string) => void;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) => {
  const [dialogContent, setDialogContent] = useState("");

  const handleSubmit = useCallback(() => {
    if (!dialogContent.trim()) return;
    
    // Close dialog first
    onOpenChange(false);
    
    // Clear content and submit
    const contentToSubmit = dialogContent;
    setDialogContent("");
    
    // Submit content after dialog closes
    setTimeout(() => {
      onSubmit(contentToSubmit);
    }, 100);
  }, [dialogContent, onSubmit, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Share2 className="mr-2 h-4 w-4" />
          Share Something
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto border-0 shadow-2xl bg-gradient-to-br from-background to-muted/30">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Share Content
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground/80">Content</Label>
            <Textarea
              rows={12}
              className="resize-none min-h-[300px] border-2 focus:border-primary/50 transition-colors duration-200 shadow-sm"
              value={dialogContent}
              onChange={(e) => setDialogContent(e.target.value)}
              placeholder="Type your content here..."
            />
          </div>
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Input
                id="temp-checkbox-dialog"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                type="checkbox"
                name="temp"
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <label className="text-sm font-medium text-foreground/80 cursor-pointer" htmlFor="temp-checkbox-dialog">Temporary (24 hours)</label>
            </div>
            <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 hover:bg-muted/50 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!dialogContent.trim()}
              className="px-6 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Share Content
            </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

ShareContentDialog.displayName = "ShareContentDialog";

// Memoized content display component
const ContentDisplay = memo(({ allContent, isLoading }: { allContent: any[], isLoading: boolean }) => {
  // Show loader while loading
  if (isLoading) {
    return <LoadingSpinner />;
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
  
  const API_URL = checked ? `/api/sharecontent/getcontent?temp=true&page=${page}&limit=${limit}` : `/api/sharecontent/getcontent?page=${page}&limit=${limit}`;

  const handleDialogSubmit = useCallback(async (content: string) => {
          try {
        setIsLoading(true);
        const response = await axios.post(
          checked ? "/api/sharecontent/createcontent?temp=true" : "/api/sharecontent/createcontent",
          { content },
          {
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate"
            },
          }
        );

        if (response.status === 200) {
        console.log("After posting content", response);
        setAllContent(response.data.allpost);
      }

    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  }, [checked]);

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
  }, [checked, page]);

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
                <ShareContentDialog
                  isOpen={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  onSubmit={handleDialogSubmit}
                  checked={checked}
                  setChecked={setChecked}
                />
                <Button 
                  onClick={handleGetContent} 
                  variant="outline"
                  className="px-6 py-2 hover:bg-muted/50 transition-all duration-200"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button
                  onClick={() => setChecked(!checked)}
                  variant={checked ? "secondary" : "outline"}
                  className="px-4 py-2 transition-all duration-200"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  View Temporary
                </Button>
                <ModeToggle />
              </div>
            </header>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="max-w-8xl mx-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          {checked && (
            <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <h2 className="text-lg font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <span className="text-xl">⏰</span>
                Temporary share is available for 24 hours only
              </h2>
            </div>
          )}
          
          <ContentDisplay allContent={allContent} isLoading={isLoading} />
          <PaginationControls page={page} total={total} limit={limit} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
