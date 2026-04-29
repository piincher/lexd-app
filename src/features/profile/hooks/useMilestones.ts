/**
 * Milestone Hooks
 * TanStack Query hooks for milestone progress data fetching
 */

import { useQuery } from "@tanstack/react-query";
import { milestoneApi, MilestoneProgress } from "../api/milestoneApi";

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
 * Returns milestone progress with error handling and automatic retries
 */
export const useMilestoneProgress = () => {
  return useQuery<MilestoneProgress, Error>({
    queryKey: QUERY_KEYS.progress(),
    queryFn: async () => {
      try {
        const response = await milestoneApi.getProgress();
        
        // Debug logging for development
        if (__DEV__) {
          console.log("[useMilestoneProgress] API Response:", {
            success: response.data?.success,
            hasData: !!response.data?.data,
            dataKeys: response.data?.data ? Object.keys(response.data.data) : null,
            milestoneCount: response.data?.data?.allMilestones?.length,
          });
        }
        
        // Handle API error response
        if (!response.data?.success) {
          throw new Error(response.data?.message || "Failed to fetch milestone progress");
        }
        
        // Validate data structure
        const data = response.data.data;
        if (!data || !Array.isArray(data.allMilestones)) {
          throw new Error("Invalid milestone data structure received");
        }
        
        return data;
      } catch (error) {
        if (__DEV__) {
          console.error("[useMilestoneProgress] Error:", error);
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Use global retry config
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};
