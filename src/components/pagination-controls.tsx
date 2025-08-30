"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";

const PaginationControls = memo(({ page, total, limit, setPage }: { page: number, total: number, limit: number, setPage: (page: number) => void }) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        variant="outline"
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
});

PaginationControls.displayName = "PaginationControls";

export default PaginationControls;
