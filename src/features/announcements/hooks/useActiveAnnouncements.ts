import { useQuery } from "@tanstack/react-query";
import { AppState } from "react-native";
import { useEffect, useRef } from "react";
import { runForegroundTask } from "@src/shared/lib/foregroundTasks";
import { announcementApi } from "../api/announcementApi";

export const announcementQueryKeys = {
  active: ["announcements", "active"] as const,
};

export const useActiveAnnouncements = () => {
  const query = useQuery({
    queryKey: announcementQueryKeys.active,
    queryFn: announcementApi.getActive,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    // Use global retry config (1 retry, skip network errors)
  });

  // Stable ref to avoid re-subscribing on every render
  const refetchRef = useRef(query.refetch);
  refetchRef.current = query.refetch;

  useEffect(() => {
    const REFETCH_COOLDOWN = 30 * 1000; // 30s cooldown

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        void runForegroundTask("announcements:active-refresh", REFETCH_COOLDOWN, () => {
          void refetchRef.current();
        });
      }
    });

    return () => subscription.remove();
  }, []);

  return query;
};
