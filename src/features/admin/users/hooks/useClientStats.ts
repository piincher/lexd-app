import { useMemo } from "react";
import { userData } from "@src/constants/types";

interface ClientStats {
  total: number;
  active: number;
  blocked: number;
}

/**
 * Hook to calculate client statistics
 */
export const useClientStats = (clients: userData[]): ClientStats => {
  return useMemo(() => ({
    total: clients.length,
    active: clients.filter(c => !c.blocked?.isBlocked).length,
    blocked: clients.filter(c => c.blocked?.isBlocked).length,
  }), [clients]);
};
