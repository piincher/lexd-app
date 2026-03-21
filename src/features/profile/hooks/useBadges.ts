/**
 * Badge Hooks
 * TanStack Query hooks for badge data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { badgeApi } from "../api/badgeApi";

// ============================================
// QUERY KEYS
// ============================================

const QUERY_KEYS = {
  badges: "badges",
  myBadges: () => [QUERY_KEYS.badges, "me"] as const,
  allBadges: () => [QUERY_KEYS.badges, "all"] as const,
} as const;

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Hook to fetch current user's badges with progress
 */
export const useMyBadges = () => {
  return useQuery({
    queryKey: QUERY_KEYS.myBadges(),
    queryFn: () => badgeApi.getMyBadges(),
    select: (response) => response.data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch all badge definitions
 */
export const useAllBadges = () => {
  return useQuery({
    queryKey: QUERY_KEYS.allBadges(),
    queryFn: () => badgeApi.getAllBadges(),
    select: (response) => response.data.data,
    staleTime: 30 * 60 * 1000, // 30 minutes (definitions rarely change)
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Hook to trigger badge evaluation for the current user
 */
export const useCheckBadges = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => badgeApi.checkBadges(),
    onSuccess: () => {
      // Invalidate badge queries so they refetch with new data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myBadges() });
    },
  });
};
