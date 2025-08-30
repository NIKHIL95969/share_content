"use client";

import { memo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PaginationControls = memo(({ page, total, limit, setPage }: { page: number, total: number, limit: number, setPage: (page: number) => void }) => {
  const totalPages = Math.ceil(total / limit);
  const [pageInput, setPageInput] = useState(page.toString());

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let newPage = parseInt(pageInput, 10);
      if (newPage < 1) {
        newPage = 1;
      } else if (newPage > totalPages) {
        newPage = totalPages;
      }
      setPage(newPage);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        variant="outline"
      >
        Previous
      </Button>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={pageInput}
          onChange={handlePageInputChange}
          onKeyDown={handlePageInputKeyDown}
          className="w-12 text-center"
        />
        <span className="text-sm text-muted-foreground">
          of {totalPages}
        </span>
      </div>
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
