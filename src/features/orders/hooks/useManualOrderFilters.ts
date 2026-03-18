import { useState, useCallback } from "react";

export interface ManualOrderFilters {
  status?: "PREBOOKING" | "AWAITING_GOODS" | "LINKED" | "CONVERTED";
  search?: string;
  startDate?: string; // ISO date string
  endDate?: string;
  minCbm?: number;
  maxCbm?: number;
  clientId?: string;
  sortBy?: "createdAt" | "clientName" | "estimatedCbm" | "calculatedCBM";
  sortOrder?: "asc" | "desc";
}

export const useManualOrderFilters = (initialFilters: ManualOrderFilters = {}) => {
  const [filters, setFilters] = useState<ManualOrderFilters>(initialFilters);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const updateFilter = useCallback(<K extends keyof ManualOrderFilters>(
    key: K,
    value: ManualOrderFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const removeFilter = useCallback((key: keyof ManualOrderFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const toggleSort = useCallback((field: ManualOrderFilters["sortBy"]) => {
    setFilters((prev) => {
      if (prev.sortBy === field) {
        // Toggle order
        return {
          ...prev,
          sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
        };
      }
      // Set new sort field
      return { ...prev, sortBy: field, sortOrder: "desc" };
    });
  }, []);

  const activeFilterCount = Object.keys(filters).filter(
    (key) => filters[key as keyof ManualOrderFilters] !== undefined
  ).length;

  return {
    filters,
    updateFilter,
    removeFilter,
    clearFilters,
    toggleSort,
    activeFilterCount,
    isFilterModalVisible,
    setIsFilterModalVisible,
  };
};
