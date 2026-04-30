import { useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementApi } from "../api/announcementApi";
import type { Announcement } from "../types";
import { announcementQueryKeys } from "./useActiveAnnouncements";

export const useAnnouncementActions = () => {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: announcementQueryKeys.active });

  const markRead = useMutation({
    mutationFn: announcementApi.markRead,
    onSuccess: refresh,
  });

  const dismiss = useMutation({
    mutationFn: announcementApi.dismiss,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: announcementQueryKeys.active });
      const previous = queryClient.getQueryData<Announcement[]>(announcementQueryKeys.active);
      queryClient.setQueryData<Announcement[]>(announcementQueryKeys.active, (current = []) =>
        current.filter((announcement) => announcement._id !== id)
      );
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(announcementQueryKeys.active, context.previous);
      }
    },
    onSuccess: refresh,
  });

  const acknowledge = useMutation({
    mutationFn: announcementApi.acknowledge,
    onSuccess: refresh,
  });

  return { markRead, dismiss, acknowledge };
};
