/**
 * Milestone Hooks
 * TanStack Query hooks for milestone progress data fetching
 */

import { useQuery } from "@tanstack/react-query";
import { milestoneApi } from "../api/milestoneApi";

// ============================================
// QUERY KEYS
// ============================================

const QUERY_KEYS = {
  milestones: "milestones",
  progress: () => [QUERY_KEYS.milestones, "progress"] as const,
} as const;

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Hook to fetch milestone progress data
 */
export const useMilestoneProgress = () => {
  return useQuery({
    queryKey: QUERY_KEYS.progress(),
    queryFn: () => milestoneApi.getProgress(),
    select: (response) => response.data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
