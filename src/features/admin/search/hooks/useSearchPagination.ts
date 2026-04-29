/**
 * useSearchPagination - Hook for search pagination and sorting state
 */

import { useState, useCallback } from "react";
import { PaginationParams } from "../api/searchApi";

export const useSearchPagination = (
  initial: PaginationParams = { page: 1, limit: 20, sortBy: "createdAt", sortOrder: "desc" }
) => {
  const [pagination, setPagination] = useState<PaginationParams>(initial);

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handleSortChange = useCallback((sortBy: string, sortOrder: "asc" | "desc") => {
    setPagination((prev) => ({ ...prev, sortBy, sortOrder }));
  }, []);

  const resetPagination = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  return { pagination, setPagination, handlePageChange, handleSortChange, resetPagination };
};
