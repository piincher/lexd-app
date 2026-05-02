import { useState, useMemo } from "react";
import type { Goods } from "../../../goods/types";

export type SortField = "goodsId" | "description" | "actualCBM" | "weight" | "quantity";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export const usePackingListSort = (goods: Goods[], sortable = true) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: "goodsId", direction: "asc" });

  const handleSort = (field: SortField) => {
    setSortConfig((current) => ({
      field,
      direction: current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedGoods = useMemo(() => {
    if (!sortable) return goods;
    return [...goods].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      const aStr = String(aValue || "").toLowerCase();
      const bStr = String(bValue || "").toLowerCase();
      return sortConfig.direction === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [goods, sortConfig, sortable]);

  return { sortConfig, handleSort, sortedGoods };
};
